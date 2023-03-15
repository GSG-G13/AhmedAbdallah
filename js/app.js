// variables
const generallink = document.getElementById("genral");
const businesslink = document.getElementById("business");
const sportslink = document.getElementById("sports");
const entertainmentlink = document.getElementById("entertainment");
const technologylink = document.getElementById("technology");
const healthlink = document.getElementById("health");
const sciencelink = document.getElementById("science");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.querySelector(".banner-sub-content");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "8309ecd71883471db0fc4a20fd3959d5";
const headlines = "https://newsapi.org/v2/top-headlines?country=us&apiKey="+API_KEY;
const general = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey="+API_KEY;
const business = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="+API_KEY;
const sports = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey="+API_KEY;
const entertainment = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey="+API_KEY;
const technology = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey="+API_KEY;
const science = "https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey="+API_KEY;
const health = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey="+API_KEY;

     
const  searchQ = "https://newsapi.org/v2/everything?q=";


window.onload = function() {

    fetchNews(headlines, "General news");
  };
  
  function fetchNews(url, headerTitle) {
    let xhr = new XMLHttpRequest();
    //let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=41c1fd3b33134958b35bc4adc3c83113";
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
  
  displayNews();
  
generallink.addEventListener("click",function(){
    fetchNews(general, "General news");
});

businesslink.addEventListener("click",function(){
    fetchNews(business, "Business");
});

sportslink.addEventListener("click",function(){
    fetchNews(sports, "Sports");
});

entertainmentlink.addEventListener("click",function(){
    fetchNews(entertainment, "Entertainment");
});

technologylink.addEventListener("click",function(){
    fetchNews(technology, "Technology");
});
healthlink.addEventListener("click",function(){
    fetchNews(health, "Technology");
});
sciencelink.addEventListener("click",function(){
    fetchNews(science, "Technology");
});

searchBtn.addEventListener("click",function(){
    const search = searchQ+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY;
    newsType.innerText="Search : "+newsQuery.value+"";
    fetchNews(search);
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

