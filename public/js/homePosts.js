let postId;

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

document.querySelectorAll('.post-title').forEach(title => {
    title.addEventListener('click', function() {
        postId = this.dataset.id;  
        
        fetch(`/api/blogposts/${postId}`)
        .then(response => response.json())
        .then(data => {
            const postBody = document.querySelector('.post-body');
            postBody.innerHTML = `
            <h2>${data.title}</h2>
            <p class="post-header">By ${data.user.name}</p>
            <p class="post-header">${formatDate(data.createdAt)}</p>
            <p>${data.body}</p>
            <div id="comment-container">
                <h3 class="post-header">Comments</h3>
                <ul class="comment-list" data-id="${data.id}">
                ${data.comments.map(comment => 
                    `<li class="comment-item">
                        <p id='author'>${comment.user.name} - ${formatDate(comment.created_at)}</p>
                        <p class="comment-text">${comment.body}</p>
                    </li>`).join('')}
                </ul>
            </div>
            `;
            
            const commentForm = document.querySelector('#comments');
            commentForm.classList.remove('hidden');
        })
        .catch(error => {
            console.error("Error fetching post:", error);
        });
    });
});


document.querySelectorAll('#comment-form').forEach(form => {
    form.addEventListener('submit', function() {
        const commentBody = this.querySelector('#comment-text').value;
        const commentData = {
            comment: commentBody,
            blog_id: postId
        };
        fetch(`/api/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
        .then(response => console.log(response))
        .catch(error => {
            console.error("Error adding comment:", error);
        });
    }
    );
});