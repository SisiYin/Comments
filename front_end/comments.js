const { response } = require("express");

// app.js
const BACK_END_URL = 'http://localhost:3001'
const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('comments');
// const stars = document.getElementsByClassName("stars")[0]
// const icons = document.getElementsByClassName("fa-star")
// const vote = 0
// var score = document.getElementById("score")
// score.addEventListener("click",(event) => {
//   vote = 0
//   for (let i = 0; i < 5; i++) {
//     icons[i].style.setProperty("--v",0)
//     if (icons[i] == event.target) {
//       vote = i
//       for (let i = 0; j < i; j++) {
//         icons[j].style.setProperty("--v",100)
//       }
//       const ps = event.clientX - icons[1].getBoundingClientRect().left
//       if (ps / icons[i].offsetWidth < 0.5){
//         icons[i].style.setProperty("--v",50)
//         vote += 0.5
//       } else {
//         icons[i].style.setProperty("--v",100)
//         vote++
//       }
//     }
    
//   }
//   score.innerText = vote
// })

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const comment = document.getElementById('comment').value;

  try {
    await fetch(BACK_END_URL + '/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON//stringify({ username, comment }),
    });
    return response.json()
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
});

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

loadComments();
