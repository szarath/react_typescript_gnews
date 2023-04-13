import React, { useState } from 'react';

// Define the shape of the news article object
interface Article {
  title: string;
  description: string;
  url: string;
}

// Define the shape of the API response object
interface ApiResponse {
  articles: Article[];
}

// Define the base URL for the GNews API
const API_BASE_URL = 'https://gnews.io/api/v4';

// Define the API key
const API_KEY = '0a5d48542c9808f76cbbb519a29a203a';

// Define a function to fetch the news data from the API
async function fetchNewsData(url: string): Promise<Article[]> {
  const response = await fetch(url);
  const data: ApiResponse = await response.json();
  return data.articles;
}

// Define the component for displaying the news articles
function NewsList(props: { articles: Article[] }) {
  return (
    <div className="news-list">
      {props.articles.map((article, index) => (
        <div className="news-item" key={index}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url}>Read more</a>
        </div>
      ))}
    </div>
  );
}

// Define the main App component
function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  // Handle the Get Headlines button click
  async function handleGetHeadlinesClick() {
    const url = `${API_BASE_URL}/top-headlines?country=us&token=${API_KEY}`;
    const data = await fetchNewsData(url);
    setArticles(data);
  }

  // Handle the Search by keyword button click
  async function handleSearchByKeywordClick(keyword: string) {
    const url = `${API_BASE_URL}/search?q=${keyword}&token=${API_KEY}`;
    const data = await fetchNewsData(url);
    setArticles(data);
  }

  // Handle the Search by title/author button click
  async function handleSearchByTitleOrAuthorClick(searchText: string) {
    const url = `${API_BASE_URL}/search?q=${searchText}&in=title,description&token=${API_KEY}`;
    const data = await fetchNewsData(url);
    setArticles(data);
  }

  return (
    <div className="container">
      <h1>GNews API Example</h1>
      <button className="btn" onClick={handleGetHeadlinesClick}>Get Headlines</button>
      <div className="search-container">
        <input type="text" id="searchByKeywordInput" className="search-input" placeholder="Search by keyword" />
        <button className="btn" onClick={() => handleSearchByKeywordClick((document.getElementById("searchByKeywordInput") as HTMLInputElement).value)}>Search</button>
      </div>
      <div className="search-container">
        <input type="text" id="searchByTitleOrAuthorInput" className="search-input" placeholder="Search by title/author" />
        <button className="btn" onClick={() => handleSearchByTitleOrAuthorClick((document.getElementById("searchByTitleOrAuthorInput") as HTMLInputElement).value)}>Search</button>
      </div>
      {articles.length > 0 ? <NewsList articles={articles} /> : <p>No articles to display</p>}
    </div>
  );
}

export default App;
