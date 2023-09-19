"use strict";

async function getGif(evt) {
  evt.preventDefault();

  const searchWords = $("#search-words").val();
  const endpoint = 'https://api.giphy.com/v1/gifs/search';
  const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';

  const params = new URLSearchParams({
    api_key: apiKey,
    q: searchWords,
    limit: 20,
  });

  const response = await fetch(`${endpoint}?${params}`);
  const data = await response.json();

  console.log("getGif response=", response, "data=", data);
  displayRandomGif(data.data)

}

function displayRandomGif(data) {
  const randomGifUrl = data[0].url;
  const gifImgElement = $('<img>').attr('src', randomGifUrl);
  $('#gif-gallery').append(gifImgElement);
}

$('#submit-button').on("click", getGif);