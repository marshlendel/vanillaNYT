const baseURL = 'https//api.nytimes.com/svc/search/v2/articlesearch.json'
const key = 'HL6oQxAxBRBXeQAghrI6DYLmS8HA7VkU'
let url;

//?Search Form
const searchTerm = document.querySelector('.search')
const startDate = document.querySelector('.start-date')
const endDate = document.querySelector('.end-date')
const searchForm = document.querySelector('.submit')

//?Results Navigation
const nextBtn = document.querySelector('.next')
const previousBtn = document.querySelector('.prev')
const nav = document.querySelector('nav')

//?Results Section
const section = document.querySelector('section')


nav.style.display = 'none'
let pageNumber = 0
let displayNav = false

//! Add event listeners

searchForm.addEventListener('submit', fetchResults)
nextBtn.addEventListener('click', nextPage)
previousBtn.addEventListener('click', previousPage)