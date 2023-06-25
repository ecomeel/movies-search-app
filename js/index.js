const MOVIE_NOT_FOUND_ERROR = 'Movie not found!';
const BIG_TEXT_CLASSNAME = 'big-text';
const BODY_OVERFLOW_HIDE_CLASSNAME = "body-fixed";
const OPEN_ABOUT_MOVIE_WINDOW_CLASSNAME = "about-movie_active";

const searchMovieInputNode = document.getElementById("searchMovieInput");
const searchMovieBtnNode = document.getElementById("searchMovieBtn");
const searchResultNode = document.getElementById("searchResult");
const aboutMovieNode = document.getElementById("aboutMovie");
const bodyNode = document.body;

const isSearchEmpty = (result) => {
    return result ? false : true;
};

const getSearchEntry = () => {
    return searchMovieInputNode.value;
};

const renderNotFoundMovies = () => {
    searchResultNode.innerText = MOVIE_NOT_FOUND_ERROR;
    searchResultNode.classList.add(BIG_TEXT_CLASSNAME);
};

const renderMovies = (movies) => {
    let moviesHTML = "";
    movies.forEach((movie) => {
        const posterLink = movie.Poster;
        const title = movie.Title;
        const year = movie.Year;
        const type = movie.Type;
        const imdbID = movie.imdbID;

        moviesHTML =
            moviesHTML +
            `
                        <div class="movie" imdbID="${imdbID}">
                            <img class="movie__poster" src=${posterLink} alt="poster">
                            <div class="description">
                                <h2 class="movie__title">${title}</h2>
                                <p class="movie__year">${year}</p>
                                <p class="movie__type">${type}</p>
                            </div>
                        </div>
                    `;
        searchResultNode.innerHTML = moviesHTML;
    });
};

const closeWndHandler = () => {
    aboutMovieNode.classList.remove(OPEN_ABOUT_MOVIE_WINDOW_CLASSNAME);
    bodyNode.classList.remove(BODY_OVERFLOW_HIDE_CLASSNAME);
};

const openWnd = () => {
    aboutMovieNode.classList.add(OPEN_ABOUT_MOVIE_WINDOW_CLASSNAME);
    bodyNode.classList.add(BODY_OVERFLOW_HIDE_CLASSNAME);
};

const renderAboutMovie = (res) => {
    const movieHTML = `
            <button class="about-movie__to-start-page big-text" id="toStartPage"><- Back to search</button>
            <div class="about-movie__info info">
                <img id="infoPoster" class="info__poster" src=${res.Poster} alt="poster">
                <div class="info__description">
                    <h2 class="info__name">${res.Title}</h2>
                    <p class="info__year">Year: <span>${res.Year}</span></p>
                    <p class="info__rating">Rating: <span>${res.Rated}</span></p>
                    <p class="info__release-date">Release date: <span>${res.Released}</span></p>
                    <p class="info__duration">Duration: <span>${res.Runtime}</span></p>
                    <p class="info__genre">Genre: <span>${res.Genre}</span></p>
                    <p class="info__producer">Producers: <span>${res.Director}</span></p>
                    <p class="info__screenwriters">Screenwriters: <span>${res.Writer}</span></p>
                    <p class="info__actors">Actors: <span>${res.Actors}</span></p>
                </div>
            </div>
            <p class="info__plot">${res.Plot}</p>
            `;
    aboutMovieNode.innerHTML = movieHTML;
};

const openAboutMovie = (event) => {
    const movieNode = event.target.closest(".movie");
    const movId = movieNode.getAttribute("imdbID");

    fetch(`https://www.omdbapi.com/?apikey=f0bbff55&i=${movId}`)
        .then((response) => response.json())
        .then((res) => {
            openWnd();
            renderAboutMovie(res);
            const toStartPageNode = document.getElementById("toStartPage");
            toStartPageNode.addEventListener("click", closeWndHandler);
        });
};

const findMovies = (searchEntry) => {
    fetch(`https://www.omdbapi.com/?apikey=f0bbff55&s=${searchEntry}`)
        .then((response) => response.json())
        .then((res) => {
            if ((res.Response == "False") & (res.Error == MOVIE_NOT_FOUND_ERROR)) {
                renderNotFoundMovies();
            } else {
                const movies = res.Search;
                searchMovieBtnNode.style.backgroundColor = 'black';
                renderMovies(movies);
                searchResultNode.addEventListener("click", openAboutMovie);
            }
        });
};

const searchMovieHandler = () => {
    const searchEntry = getSearchEntry();
    if (isSearchEmpty(searchEntry)) return;
    findMovies(searchEntry);
};

searchMovieBtnNode.addEventListener("click", searchMovieHandler);
