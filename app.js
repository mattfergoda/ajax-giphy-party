"use strict";

const NUM_GIFS_REQUESTED = 20;
// TODO: put endpoint and api key here. Split endpoint into base URL and everything else.

/**
 * Gets the user's search words and calls Giphy API with those search words.
 * Returns the response from the Giphy API as an object.
 */
async function searchGiphyAPI() {
  const searchWords = $("#search-words").val();

  if (searchWords === '') throw new Error("Empty search string.");

  const endpoint = 'https://api.giphy.com/v1/gifs/search';
  const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';

  const params = new URLSearchParams({
    api_key: apiKey,
    q: searchWords,
    limit: NUM_GIFS_REQUESTED,
  });

  const response = await fetch(`${endpoint}?${params}`);
  const data = await response.json();

  console.log("getGif response=", response, "data=", data);

  return data.data.map(); // TODO:
}

/**
 * Takes a Giphy API response in the form of an object, picks
 * a random GIF from the object, and displays it in the DOM.
 */
function displayRandomGif(data) {
  const randomInt = Math.floor(Math.random() * NUM_GIFS_REQUESTED); // TODO: Could refactor this

  console.log("data: ", data[randomInt]);
  const randomGifUrl = data[randomInt].images.original.url;
  const gifImgElement = $('<img>').attr('src', randomGifUrl);
  $('#gif-gallery').append(gifImgElement);
}

/**
 * Handles the user submitting a Giphy search.
 */
async function handleSubmit(evt) {
  evt.preventDefault();
  try {
    const data = await searchGiphyAPI();
    displayRandomGif(data.data);
  } catch(err) {
    console.warn(err);
    return;
  }
}

/**
 * Removes all GIFs from the gallery.
 */
function removeAllGifs(evt) {
  evt.preventDefault();
  $('#gif-gallery').empty();
}

$('#submit-button').on("click", handleSubmit);
$('#remove-button').on("click", removeAllGifs);