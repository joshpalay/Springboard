/*
  I CAN HAZ MEMEZ? - behavior

  What this script does, in order:
    1. Finds the form, the gallery, and the three inputs on the page.
    2. Listens for the form being submitted. On submit it:
         - stops the browser's default page reload,
         - trims the typed text and checks that nothing is blank,
         - adds a new meme to the gallery if everything is valid,
         - clears the form for the next meme.
    3. Listens for clicks inside the gallery. A click on a meme's delete
       button removes that meme.

  The page has no other logic. Memes live only in the page's DOM: refresh and they are gone.
*/

// ---------------------------------------------------------------------------
// 1. Grab the elements we need. These are looked up once, at startup, and
//    reused. querySelector takes a CSS selector: "#" means id, "." means class.
// ---------------------------------------------------------------------------

// The <form id="meme-form">. We listen for its submit event.
const form = document.querySelector("#meme-form");

// The <section id="meme-gallery">. New memes are appended inside it.
const gallery = document.querySelector("#meme-gallery");

// The three text/URL inputs. We read their values and set validation messages on them.
const imageUrlInput = document.querySelector("#image-url");
const topTextInput = document.querySelector("#top-text");
const bottomTextInput = document.querySelector("#bottom-text");

// ---------------------------------------------------------------------------
// 2. Handle form submission.
// ---------------------------------------------------------------------------

// "submit" fires when the button is clicked or Enter is pressed in a field.
form.addEventListener("submit", (event) => {
  // By default a form submit reloads the page and sends the data to a server.
  // We want neither: we build the meme in place. preventDefault() cancels the reload.
  event.preventDefault();

  // Read each value and remove leading/trailing spaces. "   " becomes "",
  // so spaces-only input is treated as missing.
  const imageUrl = imageUrlInput.value.trim();
  const topText = topTextInput.value.trim();
  const bottomText = bottomTextInput.value.trim();

  // Write the trimmed text back before the browser checks the fields.
  // checkValidity() looks at the inputs themselves, not these variables.
  // A real link with a stray space would otherwise fail the URL check.
  imageUrlInput.value = imageUrl;
  topTextInput.value = topText;
  bottomTextInput.value = bottomText;

  // Give each field a custom validation message when it is blank.
  // The HTML `required` attribute only catches a field that is completely empty.
  // This also catches fields that contain only spaces.
  // setMissingMessage (defined further down) sets the message, or clears it if the value is fine.
  setMissingMessage(imageUrlInput, imageUrl, "Please enter an image link.");
  setMissingMessage(topTextInput, topText, "Please enter top text.");
  setMissingMessage(bottomTextInput, bottomText, "Please enter bottom text.");

  // checkValidity() returns false if any field is invalid. That covers:
  //   - empty fields (required),
  //   - a badly formatted URL (type="url"),
  //   - the custom messages set above.
  if (!form.checkValidity()) {
    // reportValidity() shows the browser's bubble next to the first bad field,
    // then we stop. Nothing is added to the gallery.
    form.reportValidity();
    return;
  }

  // Everything is valid. Build a meme element and add it to the end of the gallery.
  gallery.append(createMeme(imageUrl, topText, bottomText));

  // Clear all three fields so the user can type the next meme.
  form.reset();
});

// ---------------------------------------------------------------------------
// 3. Clear the custom messages as the user types.
// ---------------------------------------------------------------------------

// Once a field has a custom "missing" message, the field stays invalid until
// we clear that message. This loop attaches a listener to each input so that
// typing anything clears the message right away. The next submit then
// re-checks the value from scratch.
[imageUrlInput, topTextInput, bottomTextInput].forEach((input) => {
  input.addEventListener("input", () => {
    // An empty string means "no custom error", which lets the field be valid again.
    input.setCustomValidity("");
  });
});

// ---------------------------------------------------------------------------
// 4. Delete memes.
//
// Each delete button is created later, after the page has loaded, so we cannot
// attach a listener to each one directly. Instead we listen once on the whole
// gallery. Click events "bubble up" from the element that was clicked to its
// parents, so the gallery sees every click that happens inside it. This pattern
// is called event delegation.
// ---------------------------------------------------------------------------

gallery.addEventListener("click", (event) => {
  // event.target is the exact element that was clicked (it could be the image or
  // the text). closest(".delete-btn") walks up from there and returns the delete
  // button if the click was on it or inside it, and null otherwise.
  const deleteButton = event.target.closest(".delete-btn");

  // The click was somewhere else in the gallery (on an image, for example). Ignore it.
  if (!deleteButton) {
    return;
  }

  // The button sits inside its meme's <div class="meme">. Find that wrapper and remove it.
  deleteButton.closest(".meme").remove();
});

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

// Sets a custom validation message on an input.
// An empty message means the input is valid. A non-empty message makes it invalid
// and that text is shown to the user.
//   input:   the <input> element
//   value:   the trimmed text that was typed
//   message: what to say if the value is empty
function setMissingMessage(input, value, message) {
  // If there is a value, pass "" (valid). If it is empty, pass the message (invalid).
  input.setCustomValidity(value ? "" : message);
}

// Builds the DOM for one meme and returns it. Nothing is added to the page here;
// the caller decides where it goes.
//
// The structure this builds is:
//   <div class="meme">
//     <img>                      the picture
//     <p class="meme-text-top">  top caption
//     <p class="meme-text-bottom">  bottom caption
//     <button class="delete-btn"> the hover X that removes the meme
//   </div>
function createMeme(imageUrl, topText, bottomText) {
  // The outer wrapper. styles.css gives it the frame, tilt, and shadow.
  const meme = document.createElement("div");
  meme.className = "meme";

  // The picture. The URL is set as src, so the browser downloads the image from there.
  const image = document.createElement("img");
  image.src = imageUrl;

  // alt text is read by screen readers and shown if the image fails to load.
  // Here we use both captions as a description.
  image.alt = `${topText} ${bottomText}`;

  // Top caption. Set with textContent (not innerHTML), so anything the user types
  // is shown as plain text. A caption like "<b>hi</b>" stays literal and cannot
  // inject HTML into the page.
  const top = document.createElement("p");
  top.className = "meme-text meme-text-top";
  top.textContent = topText;

  // Bottom caption. Same approach as the top caption.
  const bottom = document.createElement("p");
  bottom.className = "meme-text meme-text-bottom";
  bottom.textContent = bottomText;

  // The delete button. type="button" keeps it from acting as a submit button for the form.
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";

  // aria-label gives screen readers a clear name for this button, since its
  // visible content is just an "X".
  deleteButton.setAttribute("aria-label", `Delete meme: ${topText}`);
  deleteButton.textContent = "X";

  // append() adds several children at once, in the order given.
  // The image is first, so the captions and the button sit on top of it
  // (CSS positions them absolutely over the image).
  meme.append(image, top, bottom, deleteButton);

  return meme;
}
