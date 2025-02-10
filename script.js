// let apiKey = window.ENV.API_KEY; // Your API key for local
const apiKey = process.env.API_KEY; // Your API key for production
console.log(apiKey)
const newsContainer = document.getElementById('news-container');
const visitorCounter = document.getElementById('visitor-counter');

// Simulate a visitor counter
let visitors = localStorage.getItem('visitors') || 0;
visitors++;
localStorage.setItem('visitors', visitors);
visitorCounter.textContent = visitors;

// Fetch news from the API
async function fetchNews(category = 'general') {
    try {
        newsContainer.innerHTML = '<p>Fetching the latest headlines... <img src="loading.gif" alt="Loading" class="loading"></p>';
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
        );
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Oops! Something went wrong. Try again later, dude.</p>';
    }
}

// Display news articles
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous content
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news to show. Bummer! 🤷‍♂️</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available. Boring, right?'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Load general news by default
fetchNews('general');