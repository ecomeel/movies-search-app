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
const movNode = document.getElementById("mov");

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

        moviesHTML =
            moviesHTML +
            `
                        <div class="movie">
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

const getIdMovie = (event) => {
    const a = event.imdbID;
    console.log(a);
};

const findMovies = (searchEntry) => {
    const API = `https://www.omdbapi.com/?apikey=f0bbff55&s=${searchEntry}`;
    fetch(API)
        .then((response) => response.json())
        .then((res) => {
            if ((res.Response == "False") & (res.Error == "Movie not found!")) {
                renderNotFoundMovies();
            } else {
                const movies = res.Search;
                console.log(movies);

                renderMovies(movies);

                // movNode.addEventListener('click', getIdMovie);
            }
        });
};

const searchMovieHandler = () => {
    const searchEntry = getSearchEntry();
    if (isSearchEmpty(searchEntry)) return;
    findMovies(searchEntry);
};

searchMovieBtnNode.addEventListener("click", searchMovieHandler);
