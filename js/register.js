const form = document.getElementById('register-form');
const message = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const res = await fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      message.textContent = `Error: ${errorData.errors ? errorData.errors[0].message : res.statusText}`;
      message.style.color = 'red';
      return;
    }

    message.textContent = 'Registration successful! Redirecting to login...';
    message.style.color = 'green';

    setTimeout(() => {
      window.location.href = '/account/login.html';
    }, 2000);
  } catch (error) {
    message.textContent = 'Network error, please try again.';
    message.style.color = 'red';
  }
});


