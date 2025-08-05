const form = document.getElementById("edit-artwork-form");
const message = document.getElementById("form-message");
const token = localStorage.getItem("token");
const API_KEY = "2681b5ac-d293-4e1c-96db-a5678866fa60";
const params = new URLSearchParams(window.location.search);
const artworkId = params.get("id");

if (!token) {
  window.location.href = "/account/login.html";
}

if (!artworkId) {
  message.textContent = "No artwork ID found.";
  message.style.color = "red";
}

async function loadArtwork() {
  try {
    const res = await fetch(`https://v2.api.noroff.dev/artworks/${artworkId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-Noroff-API-Key": API_KEY,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch artwork details.");

    const { data } = await res.json();

    // Pre-fill form with existing data
    form.title.value = data.title;
    form.artist.value = data.artist;
    form.year.value = data.year;
    form.medium.value = data.medium;
    form.location.value = data.location;
    form.imageUrl.value = data.image?.url || "";
    form.description.value = data.description;

  } catch (err) {
    console.error("Error loading artwork:", err);
    message.textContent = "Error loading artwork details.";
    message.style.color = "red";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedArtwork = {
    title: form.title.value.trim(),
    artist: form.artist.value.trim(),
    year: Number(form.year.value),
    medium: form.medium.value.trim(),
    location: form.location.value.trim(),
    description: form.description.value.trim(),
    image: {
      url: form.imageUrl.value.trim(),
      alt: `${form.title.value.trim()} by ${form.artist.value.trim()}`
    }
  };

  try {
    const res = await fetch(`https://v2.api.noroff.dev/artworks/${artworkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(updatedArtwork),
    });

    const result = await res.json();
console.log(result);
    if (!res.ok) {
      throw new Error(result.errors?.[0]?.message || "Failed to update artwork.");
    }

    message.textContent = "Artwork updated successfully!";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "/artwork/profile.html";
    }, 1500);

  } catch (err) {
    console.error("Update error:", err);
    message.textContent = err.message;
    message.style.color = "red";
  }
});

loadArtwork();
