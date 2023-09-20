"use strict";

const NUM_GIFS_REQUESTED = 20;
const BASE_URL = 'https://api.giphy.com/v1';
const API_KEY = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';


/**
 * Takes the user's search words and calls Giphy API with those search words.
 * Returns an array of urls of GIFs.
 */
async function searchGiphyAPI(searchWords) {
  if (searchWords === '') throw new Error("Empty search string.");

  const endpoint = "/gifs/search";

  const params = new URLSearchParams({
    api_key: API_KEY,
    q: searchWords,
    limit: NUM_GIFS_REQUESTED,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
  const data = await response.json();

  console.log("getGif response=", response, "data=", data);

  return data.data.map(function(gifObj){
    return gifObj.images.original.url;
  });
}

function getSearchWords(){
  const searchWords = $("#search-words").val();
  return searchWords;
}

/**
 * Takes a Giphy API response in the form of an object, picks
 * a random GIF from the object, and displays it in the DOM.
 */
function displayRandomGif(urls) {
  const randomInt = getRandomInt(NUM_GIFS_REQUESTED);

  const $gifImgElement = $('<img>').attr('src', urls[randomInt]);
  $('#gif-gallery').append($gifImgElement);
}

/**Takes an upper limit and gets a random integer between 0 and upper limit */
function getRandomInt(upperLimit){
  return Math.floor(Math.random() * upperLimit);
}

/**
 * Handles the user submitting a Giphy search.
 */
async function handleSubmit(evt) {
  evt.preventDefault();
  try {
    const searchWords = getSearchWords();
    const urls = await searchGiphyAPI(searchWords);
    displayRandomGif(urls);
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