const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
        const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
        const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

        const main = $('#main');
        const form = $('#form');
        const search = $('#search');

        // Get initial movies
        getMovies(API_URL);

        function getMovies(url) {
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
        }

        function showMovies(movies) {
            main.empty();

            $.each(movies, function(index, movie) {
                const { title, poster_path, vote_average, overview } = movie;

                const movieEl = $('<div class="movie"></div>');

                movieEl.html(`
                    <img src="${IMG_PATH + poster_path}" alt="${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                    </div>
                `);

                main.append(movieEl);
            });
        }

        function getClassByRate(vote) {
            if (vote >= 8) {
                return 'green';
            } else if (vote >= 5) {
                return 'orange';
            } else {
                return 'red';
            }
        }

        form.submit(function(e) {
            e.preventDefault();

            const searchTerm = search.val();

            if (searchTerm && searchTerm !== '') {
                getMovies(SEARCH_API + searchTerm);

                search.val('');
            } else {
                location.reload();
            }
        });