
window.history.pushState(null, '', '/post/?aid=2');
const BACK_END_URL = 'http://localhost:3001'
const commentForm = document.getElementById('commentForm');
const commentInput= document.getElementById('comment');

const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('aid');

// function addCommentToPage(comment) {
//   const commentsContainer = document.getElementById('commentsContainer');
//   const commentElement = document.createElement('div');
//   commentElement.textContent = comment.comment;
//   commentsContainer.appendChild(commentElement);
// }


fetch(BACK_END_URL + '/'+ article_id +'/comments')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(comments => {
    const commentsContainer = document.getElementById('commentsContainer');
    comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.textContent = comment.comment;
      commentsContainer.appendChild(commentElement);
    });
  })
  // .catch(error => {
  //   console.error('There was a problem with the fetch operation:'+ error.massage);
  // });

commentForm.addEventListener('submit',async function(event) {
  try {
    event.preventDefault()
    const response = await saveComment(commentInput.value);
    console.log(response);
    commentInput.value = '';
    commentInput.focus();
    // addCommentToPage(commentInput.value);
  } catch (error) {
    console.error(error);
  }
    
})

const saveComment = async (comment) => {
  try {
    const response = await fetch(BACK_END_URL + '/newcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        article_id: article_id,
        comment:comment 
      })
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};

// const fetchComments = async () => {
//   try {
//     const response = await fetch(BACK_END_URL + '/');
//     const comments = await response.json();
//     commentsContainer.innerHTML = '';
//     comments.forEach(comment => {
//       const commentElement = document.createElement('div');
//       commentElement.textContent = comment.text;
//       commentsContainer.appendChild(commentElement);
//     });
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//   }
// };

// fetchComments();
// async function loadComments() {
//   try {
//     const response = await fetch('/');
//     const comments = await response.json();

//     commentsContainer.innerHTML = '';
//     comments.forEach(comment => {
//       const commentElement = document.createElement('div');
//       commentElement.innerHTML = `<strong>${comment.username}</strong>: ${comment.comment}`;
//       commentsContainer.appendChild(commentElement);
//     });
//   } catch (error) {
//     console.error('Error loading comments:', error);
//   }
// }

//saveComment();
