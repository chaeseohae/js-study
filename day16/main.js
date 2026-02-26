const API_KEY = "71f66c292092431d9a65acdd20954d65";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    // `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
);
const sideMenus = document.querySelectorAll(".sidenav a:not(.closebtn)");
sideMenus.forEach(sideMenu => sideMenu.addEventListener("click", (event) => getNewsByCategory(event)));

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
searchBtn.addEventListener("click", () => {
    searchInput.style.display = "block"
});



const getLatestNews = async () => {
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        // `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
    );
    
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();

    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        // `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

    getNews();
    closeNav();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;

    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
        // `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
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
    
    const newsHTML = newsList.map(news => {
        const timeAgo = moment(news.publishedAt).fromNow();

        return `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
  }">
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${news.description == null || news.description == "" 
                        ? "내용 없음" 
                        : news.description.length >= 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                    }
                </p>
                <div>
                    ${news.source.name || "no source"} * ${timeAgo}
                </div>
            </div>
        </div>
        `}).join("");
        
    document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
                            ${errorMessage}
                        </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
}


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}



getLatestNews();

