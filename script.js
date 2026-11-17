// Wait until the HTML is fully parsed before touching the DOM.
// script.js is loaded in the <head>, so the elements below don't exist yet
// when this file first runs.
window.addEventListener("DOMContentLoaded", () => {
	// Grab the elements we need from index.html.
	// The container that holds all the boxes.
	const boxContainer = document.getElementById("box-container");
	// The button that adds a new box when clicked.
	const newBoxButton = document.getElementById("new-box-button");
	// The form with the color input and submit button.
	const colorForm = document.getElementById("color-form");
	// The text input where the user types a color (e.g. "red", "#000000").
	const colorInput = document.getElementById("color-input");

	// The color that new boxes will use. Starts empty, meaning no color is set yet.
	let boxColor = "";
	// The ID given to the next box. Starts at 1 and goes up by one for each box.
	let boxId = 1;

	// When the color form is submitted (Enter key or the "Set as New Color" button)...
	colorForm.addEventListener("submit", (event) => {
		// Stop the browser from reloading the page, which is the default form behavior.
		event.preventDefault();

		// Read the color the user typed in.
		const newColor = colorInput.value;

		// Find every existing box on the page.
		const boxes = document.querySelectorAll(".box");

		// Apply the new color to each of those boxes.
		boxes.forEach((box) => {
			box.style.backgroundColor = newColor;
		});

		// Clear the input so the user can type a new color.
		colorInput.value = "";

		// Remember this color so that boxes created later use it too.
		boxColor = newColor;
	});

	// Creates a new box and adds it to the container.
	// This is called by the New Box button and by the N key.
	const addNewBox = () => {
		// Make a new <div> element for the box.
		const box = document.createElement("div");

		// Show the box's ID as its text.
		box.textContent = boxId;
		// Give it the "box" class so the CSS styles it and the event listeners can find it.
		box.className = "box";
		// Apply the currently chosen color (empty string means the default color).
		box.style.backgroundColor = boxColor;
		// Store the ID in a data attribute (data-id).
		// The mouseout handler reads it later to restore the ID text.
		box.dataset.id = boxId;

		// Increase the counter so the next box gets a different ID.
		boxId += 1;

		// Add the box to the container so it appears on the page.
		boxContainer.appendChild(box);
	};

	// Clicking the New Box button adds a box.
	newBoxButton.addEventListener("click", addNewBox);

	// Double-clicking a box removes it.
	// The listener is on the whole document (event delegation), so it also
	// works for boxes created after this code runs.
	document.addEventListener("dblclick", (event) => {
		// Only act if the thing that was double-clicked is a box.
		if (event.target.classList.contains("box")) {
			// Remove the box from the page.
			event.target.remove();
		}
	});

	// When the mouse moves over a box, show its page coordinates instead of its ID.
	document.addEventListener("mouseover", (event) => {
		// Only act if the mouse entered a box.
		if (event.target.classList.contains("box")) {
			// pageX and pageY are the mouse position relative to the whole page
			// (not just the visible window), so they include any scrolling.
			event.target.textContent = `${event.pageX}, ${event.pageY}`;
		}
	});

	// When the mouse leaves a box, put its ID back as the text.
	document.addEventListener("mouseout", (event) => {
		// Only act if the mouse left a box.
		if (event.target.classList.contains("box")) {
			// Read the ID we saved in data-id and show it again.
			event.target.textContent = event.target.dataset.id;
		}
	});

	// Pressing a key anywhere on the page.
	document.addEventListener("keydown", (event) => {
		// If the user is typing in the color input, ignore the key.
		// Otherwise typing an "n" in a color name would create a box.
		if (event.target === colorInput) {
			return;
		}

		// Accept both lowercase "n" and uppercase "N" (uppercase happens when Shift is held).
		if (event.key === "n" || event.key === "N") {
			// Add a new box.
			addNewBox();
		}
	});
});
