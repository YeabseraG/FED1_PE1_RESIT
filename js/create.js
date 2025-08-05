const form = document.getElementById("artwork-form");
const message = document.getElementById("form-message");
const token = localStorage.getItem("token");
const API_KEY = "2681b5ac-d293-4e1c-96db-a5678866fa60";

console.log("Token:", token);
if (!token) {
  window.location.href = "/account/login.html";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const artist = form.artist.value.trim();
  const year = Number(form.year.value);
  const medium = form.medium.value.trim();
  const location = form.location.value.trim();
  const imageUrl = form.image.value.trim();
  const description = form.description.value.trim();

  if (!title || !artist || !year || !medium || !location || !imageUrl || !description) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  const newArtwork = {
    title,
    artist,
    year,
    medium,
    location,
    description,
    image: {
      url: imageUrl,
      alt: `${title} by ${artist}`,
    }
  };

  try {
    const res = await fetch("https://v2.api.noroff.dev/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-Noroff-API-key": API_KEY,
      },
      body: JSON.stringify(newArtwork),
    });

    const data = await res.json();
    console.log("Artwork creation response:", data);

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || "Failed to create artwork");
    }

    message.textContent = "Artwork created successfully!";
    message.style.color = "green";
    form.reset();

    setTimeout(() => {
      window.location.href = "/artwork/profile.html";
    }, 1500);
  } catch (error) {
    console.error("Create artwork error:", error);
    message.textContent = error.message;
    message.style.color = "red";
  }
});
