const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const container = document.getElementById("user-artworks");
const API_KEY = "2681b5ac-d293-4e1c-96db-a5678866fa60";

if (!container) {
  console.error("Container element with id 'user-artworks' not found.");
} else {
  if (!user || !token) {
    container.innerHTML = "<p>Please <a href='../login.html'>log in</a> to view your artworks.</p>";
  } else {
    const userName = user.name;
    const apiUrl = `https://v2.api.noroff.dev/artworks?limit=100`;

    async function getUserArtworks() {
      try {
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-Noroff-API-Key": API_KEY,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch artworks: ${res.status} ${res.statusText}`);
        }

        const { data } = await res.json();
        console.log("All artworks fetched:", data);

        const myArtworks = data.filter(art => art.owner?.name === userName);
        console.log("Filtered user artworks:", myArtworks);

        if (myArtworks.length === 0) {
          container.innerHTML = "<p>You haven't posted any artworks yet.</p>";
          return;
        }

        container.innerHTML = "";
        myArtworks.forEach(art => {
          const card = document.createElement("div");
          card.className = "art-card";
          card.innerHTML = `
            <a href="../artwork/index.html?id=${art.id}">
              <img src="${art.image?.url || 'https://placehold.co/600x400'}" alt="${art.image?.alt || art.title}">
            </a>
            <div class="art-info">
              <h3>${art.title}</h3>
              <p>${art.description || "No description"}</p>
              <button onclick="window.location.href='../artwork/edit.html?id=${art.id}'" class="edit-btn">Edit</button>
              <button data-id="${art.id}" class="delete-btn">Delete</button>
            </div>
          `;

          container.appendChild(card);
        });

        setupDeleteListeners();
      } catch (err) {
        console.error("Failed to load user artworks:", err);
        container.innerHTML = "<p>There was a problem loading your artworks.</p>";
      }
    }

    function setupDeleteListeners() {
      const deleteButtons = document.querySelectorAll(".delete-btn");

      deleteButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          if (confirm("Are you sure you want to delete this artwork?")) {
            try {
              const res = await fetch(`https://v2.api.noroff.dev/artworks/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "x-Noroff-API-Key": API_KEY,
                },
              });

              if (res.ok) {
                btn.closest(".art-card").remove();
              } else {
                const errorData = await res.json();
                alert("Error deleting artwork: " + (errorData.message || res.statusText));
              }
            } catch (err) {
              console.error("Delete failed:", err);
              alert("Something went wrong while deleting.");
            }
          }
        });
      });
    }

    getUserArtworks();
  }
}
