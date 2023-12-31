const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
        console.log("error");
      }
    }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', signupFormHandler);