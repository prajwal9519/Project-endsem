const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

// Fetch movies from API
async function fetchMovies(query) {
  try {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    displayMovies(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display movies on UI
function displayMovies(movies) {
  moviesContainer.innerHTML = ""; // clear previous results

  movies.forEach(item => {
    const show = item.show;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295'}" alt="${show.name}">
      <div class="movie-info">
        <h3>${show.name}</h3>
        <p>${show.genres.join(", ") || "No Genre"}</p>
      </div>
    `;

    moviesContainer.appendChild(movieCard);
  });
}

// Event listener
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});

// Optional: search on Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  // Save theme
  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});