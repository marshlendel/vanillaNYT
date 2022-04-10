const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const key = "HL6oQxAxBRBXeQAghrI6DYLmS8HA7VkU";
let url;

//? Search Form
const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector(".submit");

//? Results Navigation
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

//? Results Section
const section = document.querySelector("section");

nav.style.display = "none";
previousBtn.style.display = "none";
let pageNumber = 0;
let displayNav = false;

//! Add event listeners

searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

//* Functions

function fetchResults(e) {
  e.preventDefault();
  //assemble full URL
  url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`;

  if (startDate.value !== "") {
    url += `&begin_date=${startDate.value}`;
  }

  if (endDate.value !== "") {
    url += `&end_date=${endDate.value}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      displayResults(json);
    });
}

function displayResults(json) {
  let articles = json.response.docs;

  if (articles.length >= 10) {
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }

    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }

  articles.length === 0
    ? console.log("no results")
    : articles.forEach((doc) => {
        let article = document.createElement("article");
        let heading = document.createElement("h2");
        let img = document.createElement("img");
        let link = document.createElement("a");
        let para = document.createElement("p");
        let clearfix = document.createElement("div");

        link.href = doc.web_url;
        link.target = "_blank";
        link.textContent = doc.headline.main;
        para.textContent = "Keywords";

        doc.keywords.forEach((keyword) => {
          let span = document.createElement("span");
          span.textContent = keyword.value + " ";
          para.appendChild(span);
        });

        if (doc.multimedia.length > 0) {
          img.src = `http://www.nytimes.com/${doc.multimedia[0].url}`;
          img.alt = doc.headline.main;
        }

        clearfix.setAttribute("class", "clearfix");

        article.appendChild(heading);
        heading.appendChild(link);
        article.appendChild(img);
        article.appendChild(para);
        article.appendChild(clearfix);
        section.appendChild(article);
      });
}

function nextPage(e) {
  pageNumber++;
  if (pageNumber > 0) {
    previousBtn.style.display = "inline-block";
  }
  fetchResults(e);
}

function previousPage(e) {
  pageNumber--;
  if (pageNumber === 0) {
    previousBtn.style.display = "none";
  }
  fetchResults(e);
}
