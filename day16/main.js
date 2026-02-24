const API_KEY = "71f66c292092431d9a65acdd20954d65";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
);

let searchInput = document.getElementById("search-input");
searchInput.addEventListener("focus", () => {
    searchInput.value = "";
});
searchInput.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        getNewsByKeyword();
        searchInput.value = "";
    }
});
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => searchInput.value = "");


const getLatestNews = async () => {
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
    );
    
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();

    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

    getNews();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;

    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    
    getNews();
}

const getNews = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("rrr",response)
        console.log("ddd",data)

        if(response.status === 200) {
            if(data.articles.length == 0) {
                throw new Error("No matches for your search.");
            }

            newsList = data.articles;
            render();

        } else {
            throw new Error(data.message);
        }


    } catch(error) {
        console.log("error : ", error.message);
        errorRender(error.message);
    }

}

const render = () => {
    
    const newsHTML = newsList.map(news => `
        <div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${news.urlToImage}">
            </div>
            <div class="col-lg-8">
                <h2>${news.title}}</h2>
                <p>
                    ${news.description}
                </p>
                <div></div>
                    ${news.source.name} * ${news.publishedAt.slice(0, 10)}
                </div>
            </div>
        </div>
        `).join("");
    
    document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
                            ${errorMessage}
                        </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
}

getLatestNews();

