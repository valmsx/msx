const BACKEND_URL = "https://youtube-flask-proxy.onrender.com/search";

function search() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  fetch(`${BACKEND_URL}?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => showResults(data))
    .catch(err => {
      console.error("Errore nella ricerca:", err);
      alert("Errore durante la ricerca.");
    });
}

function showResults(videos) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!Array.isArray(videos) || videos.length === 0) {
    container.innerHTML = "<p>Nessun risultato trovato.</p>";
    return;
  }

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => {
      const url = `plugin:video:https://www.youtube.com/watch?v=${video.videoId}`;
      window.location.href = url;
    };

    card.innerHTML = `
      <img class="thumbnail" src="${video.thumbnail}" alt="${video.title}">
      <div class="title">${video.title}</div>
    `;

    container.appendChild(card);
  });
}
