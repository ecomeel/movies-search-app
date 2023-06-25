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

const isSearchEmpty = (result) => {
    return result ? false : true;
};

const getSearchEntry = () => {
    return searchMovieInputNode.value;
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
                        <div>
                            <img src=${posterLink}>
                            <h2>${title}</h2>
                            <p>${year}</p>
                            <p>${type}</p>
                        </div>
                    `;
        searchResultNode.innerHTML = moviesHTML;
    });
};

const findMovies = (searchEntry) => {
    const API = `https://www.omdbapi.com/?apikey=f0bbff55&s=${searchEntry}`;
    fetch(API)
        .then((response) => response.json())
        .then((res) => {
            if ((res.Response == "False") & (res.Error == "Movie not found!")) {
                searchResultNode.innerText = "Movies not found";
                // Добавить стили
            } else {
                const movies = res.Search;
                // console.log(movies);
                renderMovies(movies)
            }
        });
};

const searchMovieHandler = () => {
    const searchEntry = getSearchEntry();
    if (isSearchEmpty(searchEntry)) return;
    findMovies(searchEntry);
};

searchMovieBtnNode.addEventListener("click", searchMovieHandler);
