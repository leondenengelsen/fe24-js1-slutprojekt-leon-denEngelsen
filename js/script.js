const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGE2NTUyNGI2ODVlYTg1MmUyN2I3YWI3YmJlMmZmNCIsIm5iZiI6MTczNDQyNjU5Mi44MDMsInN1YiI6IjY3NjEzZmUwODcwY2MzYzAwZmI0ZmNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JzHHtrjLGbxNB8dZmb14AELa2OQYPFnErHrGAPQhZEs'
  }
};

//--------------------------------------------------------------------------------------------//

const homeButton = document.getElementById("homeBtn");
const homeScreenContainer = document.getElementById("homeScreenContainer");
const top10Container = document.querySelector(".top10Container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResultsContainer = document.getElementById("searchResultsContainer");
const searchMovieContainer = document.getElementById("searchMovieContainer");
const searchInputActor = document.getElementById("searchInputactor");
const searchBtnActor = document.getElementById("searchBtnActor"); 
const searchActorContainer = document.getElementById("searchActorContainer"); 

//--------------------------------------------------------------------------------------------//

homeButton.addEventListener("click", () => {
  top10Container.classList.add("top10ContainerHidden");
  searchResultsContainer.classList.add("searchResultsContainerHidden");
  homeButton.addEventListener("click", () => {
    top10Container.classList.add("top10ContainerHidden");
    searchResultsContainer.classList.add("searchResultsContainerHidden");
    homeScreenContainer.classList.remove("homeScreenHidden");

    displayRandomTopTVSeries();
    displayRandomTopMovies();
  });
});

//--------------------------------------------------------------------------------------------//

highestRatingBtn.addEventListener("click", () => {
  searchMovieContainer.innerHTML = ""; 
  searchActorContainer.innerHTML = "";

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then((res) => res.json())
    .then((data) => {
      homeScreenContainer.classList.add("homeScreenHidden");
      top10Container.classList.remove("top10ContainerHidden");
      searchMovieContainer.classList.add("searchMovieContainerHidden");
      homeScreenContainer.classList.add("homeScreenHidden");
      top10Container.innerHTML = "<h2>Top 10 Highest Rated Movies</h2>";

      const top10Rated = data.results.slice(0, 10);

      top10Rated.forEach((movie, index) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movieContainer");

        movieDiv.innerHTML = `
          <img class="moviePoster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.original_title} poster" />
          <div class="movieDetails">
            <h3>${index + 1}. ${movie.original_title}</h3>
            <p><strong>Rating:</strong> ${movie.vote_average.toFixed(1)}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
          </div>
        `; 

        top10Container.appendChild(movieDiv);
      });

      anime({
        targets: '.movieContainer',
        translateY: [-50, 0], 
        opacity: [0, 1], 
        delay: anime.stagger(50), 
        easing: 'easeOutQuad', 
        duration: 500, 
      });
    })
    .catch((err) => {
      console.error('Error fetching highest-rated movies:', err);
      alert('Error fetching highest-rated movies:');
  });
});

//--------------------------------------------------------------------------------------------//

mostPopularBtn.addEventListener("click", () => {
  searchMovieContainer.innerHTML = ""; 
  searchActorContainer.innerHTML = ""; 

  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(res => res.json()) 
    .then(data => {
      top10Container.classList.remove("top10ContainerHidden");
      searchMovieContainer.classList.add("searchMovieContainerHidden")
      homeScreenContainer.classList.add("homeScreenHidden");

      const top10Popular = data.results.slice(0, 10);
      top10Container.innerHTML = "<h2>Top 10 Most Popular Movies</h2>";

      top10Popular.forEach((movie, index) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movieContainer");
        movieDiv.innerHTML =
          `
            <img class="moviePoster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.original_title} poster" />
            <div class="movieDetails">
              <h3>${index + 1}. ${movie.original_title}</h3>
              <p><strong>Rating:</strong> ${movie.vote_average.toFixed(1)}</p>
              <p><strong>Release Date:</strong> ${movie.release_date}</p>
            </div>
          `;
        top10Container.appendChild(movieDiv);
      });
      anime({
        targets: '.movieContainer',
        translateY: [-50, 0], 
        opacity: [0, 1], 
        delay: anime.stagger(50), 
        easing: 'easeOutQuad', 
        duration: 500 
      });
    })
    .catch((err) => {
      console.error('Error fetching most popular movies:', err);
      alert('Error fetching most popular movies.');
    });
});

//--------------------------------------------------------------------------------------------//

searchBtnMovie.addEventListener("click", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim(); 

  if (query) {
    searchResultsContainer.innerHTML = ""; 
    searchMovieContainer.innerHTML = ""; 

    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        top10Container.classList.add("top10ContainerHidden");
        searchMovieContainer.innerHTML = `<h2>Search Results for "${query}"</h2>`;
        searchResultsContainer.classList.add("searchResultsContainer");
        searchResultsContainer.classList.remove("searchResultsContainerHidden");
        homeScreenContainer.classList.add("homeScreenHidden");

        searchInput.value = ""; 

        if (data.results && data.results.length > 0) {
          data.results.forEach((movie) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movieContainer");

            movieDiv.innerHTML = `
              <img class="moviePoster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title || 'No Poster'}" />
              <div class="movieDetails">
                <h3>${movie.title || 'No Title Available'}</h3>
                <p><strong>Release Date:</strong> ${movie.release_date || 'N/A'}</p>
                <p>${movie.overview || 'No description available.'}</p>
              </div>
            `;
            searchMovieContainer.appendChild(movieDiv);
          });

          searchResultsContainer.appendChild(searchMovieContainer);

          anime({
            targets: '.movieContainer',
            translateY: [-50, 0], 
            opacity: [0, 1], 
            delay: anime.stagger(50), 
            easing: 'easeOutQuad', 
            duration: 500 
          });

        } else {
          searchResultsContainer.innerHTML += "<p>No results found.</p>";
        }
      })
      .catch((err) => {
        console.error('Error fetching results', err);
        alert('Error fetching results');
      });

  } else {
    alert("Please enter a search term."); 
  }
});

//--------------------------------------------------------------------------------------------//

searchBtnActor.addEventListener("click", (event) => {
  event.preventDefault();

  const query = searchInputActor.value.trim(); 

  if (query) {
    searchActorContainer.innerHTML = "";
    searchMovieContainer.innerHTML = `<h2>Search Results for "${query}"</h2>`;
    searchResultsContainer.classList.add("searchResultsContainer");
    searchResultsContainer.classList.remove("searchResultsContainerHidden");
    top10Container.classList.add("top10ContainerHidden");
    searchInputActor.value = ""; 
    homeScreenContainer.classList.add("homeScreenHidden");

//personal note Leon: the part below ChatGPT helped me set this up.

    fetch(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          data.results.forEach((person) => {
            const personDiv = document.createElement("div");
            personDiv.classList.add("movieContainer"); 

            const knownFor = person.known_for
              .map((item) => {
                const type = item.media_type === "movie" ? "Movie" : "TV";
                return `<li>${type}: ${item.title || item.name}</li>`;
              })
              .join("");

            personDiv.innerHTML = `
              <img class="moviePoster" src="https://image.tmdb.org/t/p/w200${person.profile_path}" alt="${person.name || 'No Image'}" />
              <div class="movieDetails">
                <h3>${person.name || 'No Name Available'}</h3>
                <p><strong>Department:</strong> ${person.known_for_department || 'N/A'}</p>
                <p><strong>Known For:</strong></p>
                <ul>${knownFor || '<li>No known works available.</li>'}</ul>
              </div>
            `;
            searchActorContainer.appendChild(personDiv);
          });
          searchResultsContainer.appendChild(searchActorContainer);

          anime({
            targets: '.movieContainer',
            translateY: [-50, 0],
            opacity: [0, 1],
            delay: anime.stagger(50),
            easing: 'easeOutQuad',
            duration: 500,
          });
        } else {
          searchActorContainer.innerHTML = "<p>No actor results found.</p>";
          searchResultsContainer.appendChild(searchActorContainer);
        }
      })
      .catch((err) => {
        console.error('Error fetching results', err);
        alert('Error fetching results');
      });
  } else {
    alert("Please enter an actor's name."); 
  }
});

//--------------------------------------------------------------------------------------------//

function displayRandomTopTVSeries() {
  fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((data) => {
      homeScreenContainer.innerHTML = "<h2>3 Series You Should Watch</h2>";
      homeScreenContainer.classList.add("homeScreenContainer");

      const topSeries = data.results.slice(0, 50); 
      const shuffledSeries = topSeries.sort(() => 0.5 - Math.random());
      const randomSeries = shuffledSeries.slice(0, 3);

      randomSeries.forEach((series) => {
        const seriesDiv = document.createElement("div");
        seriesDiv.classList.add("movieContainer");

        seriesDiv.innerHTML = `
          <img class="moviePoster" src="https://image.tmdb.org/t/p/w200${series.poster_path}" alt="${series.name || 'No Poster'}" />
          <div class="movieDetails">
            <h3>${series.name || 'No Title Available'}</h3>
            <p><strong>First Air Date:</strong> ${series.first_air_date || 'N/A'}</p>
            <p>${series.overview || 'No description available.'}</p>
          </div>
        `;

        homeScreenContainer.appendChild(seriesDiv);
      });

      anime({
        targets: '.movieContainer',
        translateY: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
        duration: 500,
      });
    })
    .catch((err) => console.error('Error fetching TV series:', err));
}

//--------------------------------------------------------------------------------------------//

function displayRandomTopMovies() {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((data) => {
      
      const moviesHeading = document.createElement("h2");
      moviesHeading.textContent = "3 Movies You Should Watch";
      homeScreenContainer.appendChild(moviesHeading);

      const topMovies = data.results.slice(0, 50);
      const shuffledMovies = topMovies.sort(() => 0.5 - Math.random());
      const randomMovies = shuffledMovies.slice(0, 3);

      randomMovies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movieContainer");

        movieDiv.innerHTML = `
          <img class="moviePoster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title || 'No Poster'}" />
          <div class="movieDetails">
            <h3>${movie.title || 'No Title Available'}</h3>
            <p><strong>Release Date:</strong> ${movie.release_date || 'N/A'}</p>
            <p>${movie.overview || 'No description available.'}</p>
          </div>
        `;

        homeScreenContainer.appendChild(movieDiv);
      });

      anime({
        targets: '.movieContainer',
        translateY: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
        duration: 500,
      });
    })
    .catch((err) => console.error('Error fetching top-rated movies:', err));
}

//--------------------------------------------------------------------------------------------//

displayRandomTopMovies();
displayRandomTopTVSeries();



