const BASE_URL = 'https://v2.api.noroff.dev'; // or whatever your API is

const params = new URLSearchParams(window.location.search);
const artworkId = params.get("id");

if (!artworkId) {
  document.getElementById('artwork-detail').innerHTML = "<p>Artwork ID missing.</p>";
  throw new Error("No artwork ID provided in URL.");
}

fetch(`${BASE_URL}/artworks/${artworkId}`)
  .then(res => res.json())
  .then(result => {
    const art = result.data;

    const container = document.getElementById('artwork-detail');
    const imageUrl = typeof art.image === 'string'
      ? art.image
      : art.image?.url || '../img/placeholder.jpg';

    container.innerHTML = `
      <div class="artwork-full">
        <img src="${imageUrl}" alt="${art.title}" />
        <div class="artwork-text">
          <h2>${art.title}</h2>
          <p><strong>Artist:</strong> ${art.artist}</p>
          <p><strong>Year:</strong> ${art.year}</p>
          <p><strong>Medium:</strong> ${art.medium}</p>
          <p><strong>Location:</strong> ${art.location}</p>
          <p><strong>Description:</strong><br>${art.description}</p>
        </div>
      </div>
    `;
  })
  .catch(err => {
    console.error("Failed to fetch artwork:", err);
    document.getElementById('artwork-detail').innerHTML = "<p>Error loading artwork details.</p>";
  });



