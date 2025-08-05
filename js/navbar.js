document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const postLink = document.getElementById("post-link");
  const profileLink = document.getElementById("profile-link");

  if (token) {
    if (logoutLink) {
      logoutLink.style.display = "inline";

      // Remove any existing listener to prevent duplicates
      logoutLink.replaceWith(logoutLink.cloneNode(true));
      const newLogoutLink = document.getElementById("logout-link");

      newLogoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user");
        window.location.href = "../index.html";
      });
    }
    if (loginLink) loginLink.style.display = "none";
    if (postLink) postLink.style.display = "inline";
    if (profileLink) profileLink.style.display = "inline";
  } else {
    if (logoutLink) logoutLink.style.display = "none";
    if (loginLink) loginLink.style.display = "inline";
    if (postLink) postLink.style.display = "none";
    if (profileLink) profileLink.style.display = "none";
  }
});

