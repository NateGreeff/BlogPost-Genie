document.querySelectorAll('.post-title').forEach(title => {
    title.addEventListener('click', function() {
        const postId = this.dataset.id;  

        
        fetch(`/api/blogposts/${postId}`)
        .then(response => response.json())
        .then(data => {
            
            const postBody = document.querySelector('.post-body');
            postBody.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.body}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching post:", error);
        });
    });
});