// variables
const homeLink = document.getElementById("home");
const generallink = document.getElementById("genral");
const businesslink = document.getElementById("business");
const sportslink = document.getElementById("sports");
const entertainmentlink = document.getElementById("entertainment");
const technologylink = document.getElementById("technology");
const healthlink = document.getElementById("health");
const sciencelink = document.getElementById("science");
const searchBtn = document.getElementById("searchBtn");
const selectNewsCat = document.getElementById("selectNewsCat");



const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.querySelector(".banner-sub-content");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "8309ecd71883471db0fc4a20fd3959d5";
const  searchQ = "https://newsapi.org/v2/everything?q=";


window.onload = function() {

    fetchNews("general", "Latest News");
  };
  
  function fetchNews(cat, headerTitle) {
    let xhr = new XMLHttpRequest();
    let url;
    if(cat == "search"){
     url = searchQ+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY;
    }else{
     url = "https://newsapi.org/v2/top-headlines?country=us&page=1&category="+cat+"&apiKey="+API_KEY;
    }
    console.log(cat)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        newsDataArr = response.articles;
        console.log(newsDataArr)
        displayNews(headerTitle);
      }
    };
    xhr.open("GET", url, true); // use the `url` variable here
    xhr.send();
  }
  
  homeLink.addEventListener("click",function(){
    fetchNews("general", "Latest News");
});

generallink.addEventListener("click",function(){
    fetchNews("general", "General News");
});

businesslink.addEventListener("click",function(){
    fetchNews("business", "Business News");
});

sportslink.addEventListener("click",function(){
    fetchNews("sports", "Sports News");
});

entertainmentlink.addEventListener("click",function(){
    fetchNews("entertainment", "Entertainment News");
});

technologylink.addEventListener("click",function(){
    fetchNews("technology", "Technology News");
});
healthlink.addEventListener("click",function(){
    fetchNews("health", "Technology News");
});
sciencelink.addEventListener("click",function(){
    fetchNews("science", "Technology News");
});

searchBtn.addEventListener("click",function(){
    fetchNews("search", "Search : "+newsQuery.value+"");
});


function displayNews(h2) {

    newsdetails.innerHTML ='';
    
    /*var newsHeader = document.createElement('h2');
    newsHeader.innerHTML = h2;
    
    newsdetails.appendChild(newsHeader);*/

    newsType.innerText=h2;



    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('article');

        var card = document.createElement('div');

        var image = document.createElement('img');
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.innerHTML = news.description;

        var link = document.createElement('button');
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}

