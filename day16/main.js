const API_KEY = "71f66c292092431d9a65acdd20954d65";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const sideMenus = document.querySelectorAll(".sidenav a:not(.closebtn)");
sideMenus.forEach(sideMenu => sideMenu.addEventListener("click", (event) => getNewsByCategory(event)));

let searchInput = document.getElementById("search-input");
searchInput.addEventListener("focus", () => {
    searchInput.select();
});
searchInput.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        getNewsByKeyword();
        searchInput.value = "";
        searchInput.style.display = "none";
    }
});

let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.style.display = "block";
});



const getNews = async () => {
    try {
        url.searchParams.set("page", page); // => &page=page
        url.searchParams.set("pageSize", pageSize); // => &page=page
        
        const response = await fetch(url);
        const data = await response.json();
        console.log("rrr",response)
        console.log("ddd",data)

        if(response.status === 200) {
            if(data.articles.length == 0) {
                throw new Error("No matches for your search.");
            }

            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }

    } catch(error) {
        console.log("error : ", error.message);
        errorRender(error.message);
    }

    

}

const getLatestNews = async () => {
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
    );
    
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase().trim();
    
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

    getNews();
    closeNav();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;

    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    
    getNews();
}

const render = () => {
    
    const newsHTML = newsList.map(news => {
        const timeAgo = moment(news.publishedAt).fromNow();

        return `
            <div class="row news">
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




const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if(lastPage > totalPages) {
        lastPage = totalPages;
    }

    const firstPage = Math.max(1, lastPage - (groupSize - 1));
    let paginationHTML = ``;

    if(page > 1) {
        paginationHTML = `
            <li class="page-item" onclick="moveToPage(1)">
                <a class="page-link">&laquo;</a>
            </li>
            <li class="page-item" onclick="moveToPage(${page - 1})">
                <a class="page-link">&lsaquo;</a>
            </li>`;
    }

    for(let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${
            i === page ? "active" : ""
        }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    if(page != totalPages) {
        paginationHTML += `
            <li class="page-item" onclick="moveToPage(${page + 1})">
                <a class="page-link">&rsaquo;</a>
            </li>
            <li class="page-item" onclick="moveToPage(${totalPages})">
                <a class="page-link">&raquo;</a>
            </li>`;
    }
    
    document.querySelector(".pagination").innerHTML = paginationHTML;


};

const moveToPage = (pageNum) => {
    console.log("movetopage", pageNum);
    page = pageNum;

    getNews();
};



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

