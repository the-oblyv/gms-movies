async function getMovie() {
  const params = new URLSearchParams(window.location.search);
  const ID = params.get("id");

  if (!ID) {
    window.location.href = "/";
    return;
  }

  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=9a2954cb0084e80efa20b3729db69067&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const movie = await response.json();

    // 🎬 Title
    const titleElement = document.getElementById("titletext");
    if (titleElement) {
      titleElement.textContent = movie.title;
    }

    // 🎥 Iframe setup
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.src = `https://nebulaflix.stream/?mt=${movie.imdb_id}&server=1`;

      // 🔒 STRICT sandbox (no same-origin)
      iframe.setAttribute(
        "sandbox",
        "allow-scripts allow-presentation"
      );

      // 🔒 Hide referrer
      iframe.setAttribute("referrerpolicy", "no-referrer");
    }

  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getMovie();
});
