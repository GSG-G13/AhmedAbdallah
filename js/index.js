// variables
const generallink = document.getElementById("genral");
const businesslink = document.getElementById("business");
const sportslink = document.getElementById("sport");
const entertainmentlink = document.getElementById("entertainment");
const technologylink = document.getElementById("technology");
const healthlink = document.getElementById("health");
const sciencelink = document.getElementById("science");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "41c1fd3b33134958b35bc4adc3c83113";
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
    newsType.innerHTML="<h4>General news</h4>";

    fetchNews(headlines);
  };
  
  function fetchNews(url) {
    let xhr = new XMLHttpRequest();
    //let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=41c1fd3b33134958b35bc4adc3c83113";
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        newsDataArr = response.articles;
        console.log(newsDataArr)
        displayNews();
      }
    };
    xhr.open("GET", url, true); // use the `url` variable here
    xhr.send();
  }
  

  
generallink.addEventListener("click",function(){
    newsType.innerHTML="<h4>General news</h4>";
    fetchNews(general);
});

businesslink.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
    fetchNews(business);
});

sportslink.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchNews(sports);
});

entertainmentlink.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchNews(entertainment);
});

technologylink.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchNews(technology);
});
healthlink.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchNews(health);
});
sciencelink.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchNews(science);
});

searchBtn.addEventListener("click",function(){
    const search = searchQ+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY;
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchNews(search);
});


function displayNews() {

    newsdetails.innerHTML = "";



    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("q");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
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

