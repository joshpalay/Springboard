/*
  Giphy Party — behavior.

  What this script does, in order:
    1. Remembers the API key, the search URL, and the elements on the page.
    2. Listens for three things:
         - submit on the form  -> ask Giphy for GIFs and append one
         - click on Remove     -> delete every GIF
         - typing in the field -> clear an old "please enter a term" error
    3. On submit:
         - stops the browser from reloading the page
         - ignores a blank or spaces-only search
         - cancels a previous search if one is still running
         - calls the Giphy search endpoint with axios
         - picks one GIF from the returned array and appends it
    4. On Remove, empties the list. GIFs are only in the DOM. Refresh and they are gone.

  The response shape this file depends on, from the Giphy docs and the readme:

    response.data            the JSON body axios parsed for us
    response.data.data       the array of GIF objects
    response.data.data[i].images.downsized.url    a smaller GIF file
    response.data.data[i].title                   text for the image alt

  axios itself wraps that body. The HTTP status and headers live on
  response.status and response.headers. The GIF array is one level deeper,
  at response.data.data, because Giphy's JSON also has a "data" property.
*/

"use strict";

// ---------------------------------------------------------------------------
// 1. Setup
// ---------------------------------------------------------------------------

// Public demo key from the starter. Giphy can revoke it; a new one is free
// at https://developers.giphy.com/docs/api/#quick-start-guide
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

// Search endpoint. The query string (api_key, q, rating) is added by axios
// from the params object below, so we don't hand-build the URL.
const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search";

// Looked up once, at startup, and reused. "#" means id.
// These elements are the ones marked with ids in index.html.
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const removeBtn = document.querySelector("#remove-btn");
const gifList = document.querySelector("#gif-list");
const statusEl = document.querySelector("#status");

// The request that is in flight right now, or null if we are idle.
// Held onto so a newer search, or Remove, can cancel it.
let currentSearch = null;

// "submit" fires for the Search button and for Enter in the text field.
searchForm.addEventListener("submit", searchGiphy);

// "click" on Remove. This button is type="button", so it does not submit.
removeBtn.addEventListener("click", removeGifs);

// As soon as the user types, drop any custom "missing term" message.
// A custom validity message stays on the field until we clear it, so without
// this the field would stay invalid after the user started typing.
searchInput.addEventListener("input", () => {
  searchInput.setCustomValidity("");
});

// ---------------------------------------------------------------------------
// 2. Search
// ---------------------------------------------------------------------------

// Ask Giphy for GIFs matching the form, then append exactly one of them.
// Each submit adds another GIF. Nothing here removes the previous ones.
async function searchGiphy(event) {
  // A form submit reloads the page by default. preventDefault keeps us on
  // this page so the GIFs we already appended are not wiped out.
  event.preventDefault();

  // "  cats  " becomes "cats". "   " becomes "", which we treat as missing.
  // Write the trimmed text back so checkValidity sees the same string we do.
  const term = searchInput.value.trim();
  searchInput.value = term;

  // setCustomValidity("") means valid. A non-empty string means invalid,
  // and that string is what the browser shows in its error bubble.
  // The HTML required attribute only catches a fully empty field, not spaces.
  searchInput.setCustomValidity(term ? "" : "Please enter a search term.");

  // checkValidity looks at required, the custom message, and anything else
  // on the fields. reportValidity shows the bubble next to the first problem.
  if (!searchForm.checkValidity()) {
    searchForm.reportValidity();
    return;
  }

  // If a search is already running, abort it. Otherwise a slow response
  // for an old term can arrive last and append the wrong GIF.
  // The ?. only calls abort when currentSearch is not null.
  currentSearch?.abort();

  // AbortController gives us a signal we can pass to axios. Calling abort()
  // rejects the axios promise instead of letting it finish.
  const controller = new AbortController();
  currentSearch = controller;

  // Disable the button while we wait so a double click is less likely.
  // The stylesheet changes the cursor and fades the button in this state.
  searchBtn.disabled = true;
  setStatus("Searching…");

  try {
    // axios.get returns a Promise. await pauses this function until the
    // response arrives, or until the request fails or is aborted.
    // params are encoded and appended to the URL for us:
    //   ?api_key=...&q=cats&rating=g
    // rating=g keeps the results to G-rated GIFs.
    const response = await axios.get(GIPHY_SEARCH_URL, {
      params: {
        api_key: giphyApiKey,
        q: term,
        rating: "g",
      },
      signal: controller.signal,
    });

    // response.data is the parsed JSON. Giphy puts the GIF array on the
    // "data" property of that JSON, so the array is response.data.data.
    const gifs = response.data.data;

    if (!gifs.length) {
      setStatus(`No GIFs found for "${term}".`);
      return;
    }

    // One GIF per submit, chosen at random so the same search can show
    // a different image next time. Math.random() is 0 up to but not
    // including 1, so the index lands inside the array.
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    // appendGif returns false if this object has no usable image URL.
    if (!appendGif(gif, term)) {
      setStatus("Giphy sent a result without an image URL.");
      return;
    }

    setStatus(`Added a GIF for "${term}".`);
  } catch (err) {
    // Aborting is not a failure the user needs to see. The newer search,
    // or Remove, is what they asked for. Stay quiet and leave the page as it is.
    if (isCanceled(err)) return;

    // Anything else: network down, bad key, Giphy error. Log the real
    // error for debugging, and show a plain sentence on the page.
    console.error(err);
    setStatus("Could not reach Giphy. Check your connection and try again.");
  } finally {
    // finally runs after try or catch, including after a return inside them.
    // Only the request that is still "the current one" may re-enable the
    // button. An older request that just got aborted must not flip the
    // button back on while a newer search is still running.
    if (currentSearch === controller) {
      currentSearch = null;
      searchBtn.disabled = false;
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Add one GIF to the list
// ---------------------------------------------------------------------------

// Builds one <li><img></li> and appends it. Returns false if there is no URL.
// Called once per successful search. It does not clear older items.
function appendGif(gif, term) {
  // Giphy nests several sizes under gif.images. Prefer the smaller
  // "downsized" file. If that size is missing, try fixed_height, then original.
  // ?. yields undefined instead of throwing when images itself is missing.
  const image = gif.images?.downsized || gif.images?.fixed_height || gif.images?.original;
  if (!image?.url) return false;

  // A list item, so it belongs inside the <ul id="gif-list">.
  // className is the CSS hook (.gif-item). There is no inline style here.
  const item = document.createElement("li");
  item.className = "gif-item";

  const img = document.createElement("img");
  img.className = "gif";
  img.src = image.url;

  // alt is what a screen reader reads, and what shows if the file fails.
  // gif.title comes from Giphy. If it is blank, fall back to the search term.
  img.alt = gif.title || `${term} GIF`;

  // lazy: the browser can wait to download GIFs that are below the fold.
  // async: decode the image off the main thread so the page stays responsive.
  img.loading = "lazy";
  img.decoding = "async";

  // Copy the real pixel size onto the <img>. CSS then uses height: auto
  // so the box keeps the right shape before the file has finished loading.
  if (image.width) img.width = Number(image.width);
  if (image.height) img.height = Number(image.height);

  item.append(img);

  // append, not replace. The previous GIFs stay where they are.
  gifList.append(item);
  return true;
}

// ---------------------------------------------------------------------------
// 4. Remove every GIF
// ---------------------------------------------------------------------------

function removeGifs() {
  // A response that arrives after the user hit Remove would append a GIF
  // onto a list they just cleared. Abort stops that.
  currentSearch?.abort();
  currentSearch = null;
  searchBtn.disabled = false;

  // Announce the clear only if there was something to clear.
  // replaceChildren() with no arguments deletes every child of the list.
  const hadGifs = gifList.childElementCount > 0;
  gifList.replaceChildren();
  setStatus(hadGifs ? "Removed all GIFs." : "");
}

// ---------------------------------------------------------------------------
// 5. Small helpers
// ---------------------------------------------------------------------------

// Write the status line. textContent treats the message as plain text, so a
// search term cannot inject HTML into the page.
function setStatus(message) {
  statusEl.textContent = message;
}

// axios rejects with this shape when the AbortController cancels the request.
// Different axios versions use either code or name, so accept both.
function isCanceled(err) {
  return err?.code === "ERR_CANCELED" || err?.name === "CanceledError";
}
