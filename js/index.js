// const params = new URLSearchParams(location.search);
// console.log(params)
// const id = params.get('id')
// console.log(id)

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then(response => response.json())
//     .then(res => console.log(res))

const searchMovieInputNode = document.getElementById('searchMovieInput');
const searchMovieBtnNode = document.getElementById('searchMovieBtn');
const searchResultNode = document.getElementById('searchResult');

const isSearchEmpty = (result) => {
    return result ?  false :  true
}

const getSearchEntry = () => {
    return searchMovieInputNode.value;
}

const findMovies = (searchEntry) => {
    const API = `https://www.omdbapi.com/?apikey=f0bbff55&s=${searchEntry}`
    fetch(API)
        .then(response => response.json())
        .then((res) => {
            if (res.Response == 'False') {
                searchResultNode.innerText = 'Movies not found';
                // Добавить стили
            } else {
                const movies = res.Search;
                console.log(movies)
            }
        })
}

const searchMovieHandler = () => {
    const searchEntry = getSearchEntry();
    if (isSearchEmpty(searchEntry)) return
    findMovies(searchEntry);

}

searchMovieBtnNode.addEventListener('click', searchMovieHandler);