

  /* fetch('https://v2.api.noroff.dev/artworks')
  .then(res => res.json())
  .then(result => {
    const artworks = result.data;
    const gallery = document.getElementById('gallery');

    artworks.slice(0, 12).forEach(art => {
      const div = document.createElement('div');
      div.classList.add('art-card');
      div.innerHTML = `
        <img src="${art.image}" alt="${art.title}" />
        <div class="art-info">
          <h3>${art.title}</h3>
          <p>by ${art.artist}</p>
        </div>
      `;

      div.addEventListener('click', () => {
        window.location.href = `artwork/index.html?id=${art.id}`;
      });

      gallery.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Failed to fetch artworks:', err);
    document.getElementById('gallery').innerHTML = `<p>Error loading artworks.</p>`;
  });

*/




fetch('https://v2.api.noroff.dev/artworks')
  .then(res => res.json())
  .then(result => {
    const artworks = result.data;
    const gallery = document.getElementById('gallery');

    artworks.slice(0, 12).forEach(art => {
      const imageUrl = typeof art.image === 'string'
        ? art.image
        : art.image?.url || 'img/placeholder.jpg'; // fallback

      const div = document.createElement('div');
      div.classList.add('art-card');
      div.innerHTML = `
        <img src="${imageUrl}" alt="${art.title}" />
        <div class="art-info">
          <h3>${art.title}</h3>
          <p>by ${art.artist}</p>
        </div>
      `;

      div.addEventListener('click', () => {
        window.location.href = `artwork/index.html?id=${art.id}`;
      });

      gallery.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Failed to fetch artworks:', err);
    document.getElementById('gallery').innerHTML = `<p>Error loading artworks.</p>`;
  });


