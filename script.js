// Base URL from the ReqRes docs. Login and list users both hang off this.
const API_URL = "https://reqres.in/api";

// Sent with the list request as the delay query parameter, in seconds.
const LIST_DELAY_SECONDS = 1;

// Holds the login token. null means we are logged out and must not list users.
let token = null;

// Form and button elements from index.html.
const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");
const intelligenceForm = document.getElementById("intelligence-form");

// Places where results are written onto the page.
const systemMessage = document.getElementById("system-message");
const hackersContainer = document.getElementById("hackers");

// Values the user can change before submitting.
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const pageNumberInput = document.getElementById("page-number-input");

// LOGIN - SUCCESSFUL. POST the email and password, then show the token or the error.
loginForm.addEventListener("submit", async (event) => {
	// Keep the browser from reloading the page on submit.
	event.preventDefault();

	const email = emailInput.value.trim();
	const password = passwordInput.value;

	systemMessage.textContent = "Infiltrating...";

	try {
		// Successful pair from the docs: eve.holt@reqres.in / cityslicka.
		const response = await axios.post(`${API_URL}/login`, {
			email,
			password,
		});

		// Save the token so the list request can check that we are still inside.
		token = response.data.token;
		systemMessage.textContent = `Access granted. Token: ${token}`;
	} catch (error) {
		// A failed login must not leave an old token behind.
		token = null;

		// ReqRes puts the reason on error.response.data.error, for example "Missing password".
		const message = error.response?.data?.error || "Login failed. Check the email and password.";
		systemMessage.textContent = `Access denied. Error: ${message}`;
	}
});

// Logout does not call the API. Clearing the token is enough to "sneak away".
logoutButton.addEventListener("click", () => {
	token = null;
	systemMessage.textContent = "You sneaked away. Token cleared.";
	hackersContainer.textContent = "...";
});

// LIST USERS. One GET that includes both the page and delay query parameters.
intelligenceForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	// If logout already cleared the token, refuse to list anyone.
	if (!token) {
		hackersContainer.textContent = "Access denied. Infiltrate the system before listing hackers.";
		return;
	}

	const page = Number(pageNumberInput.value);

	// The API expects a page number of 1 or higher.
	if (!Number.isInteger(page) || page < 1) {
		hackersContainer.textContent = "Enter a page number of 1 or higher.";
		return;
	}

	hackersContainer.textContent = "Gathering intelligence...";

	try {
		// params builds ?page=2&delay=1 (or whatever page was typed) as a single request.
		const response = await axios.get(`${API_URL}/users`, {
			params: {
				page,
				delay: LIST_DELAY_SECONDS,
			},
		});

		// The user records live on response.data.data.
		const users = response.data.data;

		if (!users.length) {
			hackersContainer.textContent = "No hackers found on this page.";
			return;
		}

		// Wipe the previous list before drawing the new page.
		hackersContainer.replaceChildren();

		users.forEach((user) => {
			// Each person gets a card. The look of .hacker lives in style.css.
			const card = document.createElement("article");
			card.className = "hacker";

			const avatar = document.createElement("img");
			avatar.src = user.avatar;
			avatar.alt = `${user.first_name} ${user.last_name}`;

			const name = document.createElement("h3");
			name.textContent = `${user.first_name} ${user.last_name}`;

			const email = document.createElement("p");
			email.textContent = user.email;

			card.append(avatar, name, email);
			hackersContainer.append(card);
		});
	} catch (error) {
		const message = error.response?.data?.error || error.message || "Could not list hackers.";
		hackersContainer.textContent = `Error: ${message}`;
	}
});
