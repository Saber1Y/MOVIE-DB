$(document).ready(function () {
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


const main =  $('#main');
const search = $('#search');
const form  = $('#form');

getMovies('API_URL');
$.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        showMovies(data.results);
    },
    error: function(error) {
        console.error(error);
    }
});
});