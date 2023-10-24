const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#content').value.replace(/\n/g, "<br>")
  
    if (title && body) {
      console.log(title, body);
      await fetch(`/api/blogposts`, {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => console.log(data));
      document.location.replace('/');
    }


};
  
document
.querySelector('#submit-button')
.addEventListener('click', newPostHandler);