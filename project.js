async function fetchMovies(query) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=abc12345&s=batman`);

    if (!res.ok) {
      throw new Error("API Error");
    }

    const data = await res.json();

    return data.Search || [];

  } catch (error) {
    console.log("Error:", error);
    return [];
  }
}