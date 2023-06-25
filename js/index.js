// const params = new URLSearchParams(location.search);
// console.log(params)
// const id = params.get('id')
// console.log(id)

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then(response => response.json())
//     .then(res => console.log(res))

const searchMovieInputNode = document.getElementById("searchMovieInput");
const searchMovieBtnNode = document.getElementById("searchMovieBtn");
const searchResultNode = document.getElementById("searchResult");
const aboutMovieNode = document.getElementById('aboutMovie');
const bodyNode = document.body;


const isSearchEmpty = (result) => {
    return result ? false : true;
};

const getSearchEntry = () => {
    return searchMovieInputNode.value;
};

const renderNotFoundMovies = () => {
    searchResultNode.innerText = "Movies not found";
    searchResultNode.classList.add("big-text");
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

const closeBtnHandler = () => {
    aboutMovieNode.classList.remove('about-movie_active')
    bodyNode.classList.remove('body-fixed');
}

const openAboutMovie = (event) => {
    const movieNode = event.target.closest('.movie');
    const movId = movieNode.getAttribute('imdbID');
    const API = `https://www.omdbapi.com/?apikey=f0bbff55&i=${movId}`
    fetch(API)
        .then(response => response.json())
        .then(res => {
            aboutMovieNode.classList.add('about-movie_active');
            bodyNode.classList.add('body-fixed');
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

            const toStartPageNode = document.getElementById('toStartPage');
            toStartPageNode.addEventListener('click', closeBtnHandler)
        })
    
}

const findMovies = (searchEntry) => {
    const API = `https://www.omdbapi.com/?apikey=f0bbff55&s=${searchEntry}`;
    fetch(API)
        .then((response) => response.json())
        .then((res) => {
            if ((res.Response == "False") & (res.Error == "Movie not found!")) {
                renderNotFoundMovies();
            } else {
                const movies = res.Search;
                searchMovieBtnNode.style.backgroundColor = '#000';
                console.log(movies);

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
