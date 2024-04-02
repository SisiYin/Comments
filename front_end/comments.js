//const { response } = require("express");

// app.js
const BACK_END_URL = 'http://localhost:3001'
const commentForm = document.getElementById('commentForm');
const commentInput= document.getElementById('comment');


commentForm.addEventListener('submit',async function(event) {
  try {
    const response = await saveComment(commentInput.value);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
    comment.value = '';
    comment.focus();
})

const saveComment = async (comment) => {
  try {
    const response = await fetch(BACK_END_URL + '/newcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};

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
