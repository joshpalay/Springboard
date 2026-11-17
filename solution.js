// Task 1: Use innerText to change the content of the paragraph.
document.getElementById("task1").innerText = "This content was changed with innerText.";

// Task 2: Use innerHTML to add a submit button.
document.getElementById("task2").innerHTML = '<button type="submit">Submit</button>';

// Task 3: Change the page background color to #232323.
document.body.style.backgroundColor = "#232323";

// Task 4: Give every element with class "item" a border.
const items = document.querySelectorAll(".item");
items.forEach(function (item) {
	item.style.border = "1px solid black";
});

// Task 5: Change the link's href to Springboard.
document.getElementById("task5").href = "https://www.springboard.com/";

// Task 6: Set the input value to "DOM Master".
document.getElementById("task6").value = "DOM Master";

// Task 7: Use classList to add "new-class".
document.getElementById("task7").classList.add("new-class");

// Task 8: Append a new button inside the task 8 element.
const button = document.createElement("button");
button.innerText = "New Button";
document.getElementById("task8").appendChild(button);

// Task 9: Remove the task 9 element.
document.getElementById("task9").remove();
