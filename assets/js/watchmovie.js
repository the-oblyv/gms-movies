async function getMovie() {
  const ID = new URLSearchParams(window.location.search).get("id");
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

    const titleElement = document.getElementById("titletext");
    if (titleElement) {
      titleElement.innerHTML = movie.title;
    }

    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.src = `https://www.vidking.net/embed/movie/${ID}?color=9146ff`;

      // ✅ Sandbox
      iframe.setAttribute(
        "sandbox",
        "allow-scripts allow-same-origin allow-presentation"
      );

      // ✅ Referrer protection
      iframe.setAttribute("referrerpolicy", "no-referrer");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// 🔥 GLOBAL DEFENSE (IMPORTANT)
if (window.top !== window.self) {
  // Kill popup attempts
  window.open = () => null;

  // Block link hijacking
  document.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      e.preventDefault();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getMovie();
});
