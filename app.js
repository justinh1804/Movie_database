//api_key=504e974f5c5070054bb46113602b8d4a
//api_url=https://api.themoviedb.org/3
var pageIndex = 1
var youTubeID = []

const MOVIES_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=504e974f5c5070054bb46113602b8d4a"
const SERIES_URL = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=504e974f5c5070054bb46113602b8d4a"
const FEATURED_URL = "https://api.themoviedb.org/3/trending/all/day?api_key=504e974f5c5070054bb46113602b8d4a&count=30"
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_URL = 'https://api.themoviedb.org/3/search/multi?api_key=504e974f5c5070054bb46113602b8d4a&query='

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('content-container')
const menu_list_item = document.querySelectorAll('.menu-list-item')
const videoEl = document.createElement('div')
const btn = document.getElementById('btn')

window.addEventListener('load', ()=>{
    videoEl.classList.add('trailer')
    // Get Movies
    getInfo(FEATURED_URL+`&page=${pageIndex}`, displayFeatured)
    menu_list_item[0].classList.add('active')
})
async function getInfo(url, display)
{
    youTubeID = []
    await fetch(url).then(res=>res.json()).then(data=>display(data.results))
}
function getClassesByRating(rating)
{
    if(rating>=8)
    return 'green'
    else if(rating>5)
        return 'orange'
    else
    return 'red'
}
async function getYouTubeID(id,type){
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=504e974f5c5070054bb46113602b8d4a&language=en-US`)
    const data = await res.json()
    for(i=0; i<data.results.length; i++){
        if(data.results[i].site==='YouTube' && data.results[i].type==='Trailer')
        {
            youTubeID.push(data.results[i].key)
            return
        }
    }
    youTubeID.push('')
    return
}
function displayFeatured(movies)
{
    let ids = []
    let mts = []
    main.innerHTML=''
    movies.forEach((Movie) => {
        const movie = {
            title: Movie.media_type==='tv'?Movie.name:Movie.title,
            poster_path: Movie.poster_path,
            vote_average: Movie.vote_average,
            overview: Movie.overview,
            id: Movie.id,
            media_type: Movie.media_type
        }
        const moviesElement = document.createElement('div')
        moviesElement.classList.add('movie')
        moviesElement.innerHTML=`
        <img src="${IMAGE_PATH}${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassesByRating(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        <p>${movie.overview}</p>
        </div>
        `
        main.appendChild(moviesElement)
        ids.push(movie.id)
        mts.push(movie.media_type)
    })
    const movieDiv = document.querySelectorAll('.movie')
    movieDiv.forEach((movieDivEl, index)=>{
        getYouTubeID(ids[index], mts[index])
        movieDivEl.addEventListener('click', ()=>{
            document.body.style.overflow = 'hidden'
            videoEl.style.display = 'block'
            videoEl.innerHTML = ''
            videoEl.innerHTML = '<span><i class="fa-solid fa-xmark"></i></span><iframe width="1120" height="630" src="https://www.youtube.com/embed/'+youTubeID[index]+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            main.appendChild(videoEl)
            videoEl.addEventListener('click', ()=>{
                document.body.style.overflow = ''
                videoEl.style.display = 'none'
                videoEl.innerHTML = ''
            })
            document.querySelector('.trailer span').addEventListener('click', ()=>{
                document.body.style.overflow = ''
                videoEl.style.display = 'none'
                videoEl.innerHTML = ''
            })
        })
    })
}
function displayMovies(movies)
{
    let ids = []
    main.innerHTML=''
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview, id}=movie
        const moviesElement = document.createElement('div')
        moviesElement.classList.add('movie')
        moviesElement.innerHTML=`
        <img src="${IMAGE_PATH}${poster_path}" alt="${title}" />
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassesByRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `
        main.appendChild(moviesElement)
        ids.push(id)
    })
    const movieDiv = document.querySelectorAll('.movie')
    movieDiv.forEach((movieDivEl, index)=>{
        getYouTubeID(ids[index], 'movie')
        movieDivEl.addEventListener('click', ()=>{
            document.body.style.overflow = 'hidden'
            videoEl.style.display = 'block'
            videoEl.innerHTML = ''
            videoEl.innerHTML = '<span><i class="fa-solid fa-xmark"></i></span><iframe width="1120" height="630" src="https://www.youtube.com/embed/'+youTubeID[index]+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            main.appendChild(videoEl)
            videoEl.addEventListener('click', ()=>{
                document.body.style.overflow = ''
                videoEl.style.display = 'none'
                videoEl.innerHTML = ''
            })
            document.querySelector('.trailer span').addEventListener('click', ()=>{
                document.body.style.overflow = ''
                videoEl.style.display = 'none'
                videoEl.innerHTML = ''
            })
        })
    })
}
function displaySeries(series)
{
    let ids = []
    main.innerHTML=''
    series.forEach((movie) => {
        const {name, poster_path, vote_average, overview, id}=movie
        const moviesElement = document.createElement('div')
        moviesElement.classList.add('movie')
        moviesElement.innerHTML=`
        <img src="${IMAGE_PATH}${poster_path}" alt="${name}" />
        <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getClassesByRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `
        main.appendChild(moviesElement)
        ids.push(id)
    });
    const serieDiv = document.querySelectorAll('.movie')
    serieDiv.forEach((serieDivEl, index)=>{
        getYouTubeID(ids[index], 'tv')
        serieDivEl.addEventListener('click', ()=>{
            document.body.style.overflow = 'hidden'
            videoEl.style.display = 'block'
            videoEl.innerHTML = ''
            videoEl.innerHTML = '<span><i class="fa-solid fa-xmark"></i></span><iframe width="1120" height="630" src="https://www.youtube.com/embed/'+youTubeID[index]+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            main.appendChild(videoEl)
            videoEl.addEventListener('click', ()=>{
                document.body.style.overflow = ''
                videoEl.style.display = 'none'
                videoEl.innerHTML = ''
            })
            document.querySelector('.trailer span').addEventListener('click', ()=>{
                document.body.style.overflow = ''
                videoEl.style.display = 'none'
                videoEl.innerHTML = ''
            })
        })
    })
}

// search feature
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchValue = search.value
    if(searchValue && searchValue !== '')
    {
        getInfo(SEARCH_URL+searchValue+`&page=${pageIndex}`, displayFeatured)
        searchValue = ''
    }
    else{
        window.location.reload()
    }
})

// navbar menu buttons
menu_list_item.forEach((list_item, index)=>{
    list_item.addEventListener('click', ()=>{
        for(i=0; i<menu_list_item.length; i++)
        {
            if(i!==index)
            menu_list_item[i].classList.remove('active')
            else
            {
                if(list_item.id==='home')
                {
                    pageIndex = 1
                    getInfo(FEATURED_URL+`&page=${pageIndex}`, displayFeatured)
                    youTubeID = []
                }
                if(list_item.id==='movies')
                {
                    pageIndex = 1
                    getInfo(MOVIES_URL+`&page=${pageIndex}`, displayMovies)
                    youTubeID = []
                }
                if(list_item.id==='series')
                {
                    pageIndex = 1
                    getInfo(SERIES_URL+`&page=${pageIndex}`, displaySeries)
                    youTubeID = []
                }
                list_item.classList.add('active')
            }
        }
    })
})
