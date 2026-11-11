// Rich Bank
// Each account has an id (positive integer), an owner (non-empty string),
// and a balance (non-negative number).

const accounts = [
  { id: 1, owner: "Alice", balance: 500 },
  { id: 2, owner: "Bob", balance: 300 },
];

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isPositiveAmount(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

// Look up an account by id. Strict equality keeps the string "1"
// from matching the number 1.
function getAccountById(id) {
  for (const account of accounts) {
    if (account.id === id) {
      return account;
    }
  }
}

function createAccount(newAccountId, newAccountOwner) {
  if (!isPositiveInteger(newAccountId)) {
    throw new Error("Account id must be a positive integer.");
  }

  if (!isNonEmptyString(newAccountOwner)) {
    throw new Error("Account owner must be a non-empty string.");
  }

  if (getAccountById(newAccountId)) {
    throw new Error("An account with this id already exists.");
  }

  const account = {
    id: newAccountId,
    owner: newAccountOwner.trim(),
    balance: 0,
  };

  accounts.push(account);
  return account;
}

function depositMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found.");
  }

  if (!isPositiveAmount(amount)) {
    throw new Error("Deposit amount must be greater than 0.");
  }

  account.balance += amount;
  return account;
}

function withdrawMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found.");
  }

  if (!isPositiveAmount(amount)) {
    throw new Error("Withdrawal amount must be greater than 0.");
  }

  if (account.balance < amount) {
    throw new Error("Insufficient funds.");
  }

  account.balance -= amount;
  return account;
}

function transferMoney(fromAccountId, toAccountId, amount) {
  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);

  if (!fromAccount) {
    throw new Error("Source account not found.");
  }

  if (!toAccount) {
    throw new Error("Destination account not found.");
  }

  if (fromAccountId === toAccountId) {
    throw new Error("Cannot transfer money to the same account.");
  }

  if (!isPositiveAmount(amount)) {
    throw new Error("Transfer amount must be greater than 0.");
  }

  if (fromAccount.balance < amount) {
    throw new Error("Insufficient funds.");
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;
  return { fromAccount, toAccount };
}

// Hint calls from the exercise. Each one points at a rule above.
// Invalid calls throw, and the balances stay as they were.
function show(label, action) {
  try {
    const result = action();
    console.log(label, result ?? "no account");
  } catch (error) {
    console.log(label, "Error:", error.message);
  }
}

show("View account 1", () => getAccountById(1));
show('View id "1" (string does not match number)', () => getAccountById("1"));

show("Duplicate id", () => createAccount(1, "Alice"));
show("Id is a string", () => createAccount("3", "Charlie"));
show("Id is zero", () => createAccount(0, "Charlie"));
show("Id is negative", () => createAccount(-3, "Charlie"));
show("Id is not an integer", () => createAccount(3.5, "Charlie"));
show("Owner is empty", () => createAccount(3, ""));
show("Owner is only spaces", () => createAccount(3, "   "));
show("Owner is not a string", () => createAccount(3, 42));
show("Create Charlie", () => createAccount(3, "Charlie"));

show("Deposit a string", () => depositMoney(1, "200"));
show("Deposit zero", () => depositMoney(1, 0));
show("Deposit a negative amount", () => depositMoney(1, -10));
show("Deposit to a missing account", () => depositMoney(99, 10));
show("Deposit 50 to Alice", () => depositMoney(1, 50));

show("Withdraw a string", () => withdrawMoney(1, "10"));
show("Withdraw zero", () => withdrawMoney(1, 0));
show("Withdraw a negative amount", () => withdrawMoney(1, -10));
show("Withdraw more than the balance", () => withdrawMoney(1, 10000));
show("Withdraw 25 from Alice", () => withdrawMoney(1, 25));

show("Transfer zero", () => transferMoney(1, 2, 0));
show("Transfer a negative amount", () => transferMoney(1, 2, -10));
show("Transfer to a missing account", () => transferMoney(1, 4, 10));
show("Transfer to the same account", () => transferMoney(1, 1, 10));
show("Transfer more than the balance", () => transferMoney(1, 2, 10000));
show("Transfer 100 from Alice to Bob", () => transferMoney(1, 2, 100));

console.log("Accounts:", accounts);
