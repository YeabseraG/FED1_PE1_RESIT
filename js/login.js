const form = document.getElementById("login-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value;

  const url = "https://v2.api.noroff.dev/auth/login";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login response data:", data);

    console.log("Logged in user name:", data.data.name);


    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    // Save token and user
    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.data));

    message.textContent = "Login successful! Redirecting...";
    message.style.color = "lightgreen";

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500); 
  } catch (err) {
    message.textContent = err.message;
    message.style.color = "red";
  }
});



