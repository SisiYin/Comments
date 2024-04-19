
window.history.pushState(null, '', '/post/2');
const BACK_END_URL = 'http://localhost:3001'
const commentForm = document.getElementById('commentForm');
const commentInput= document.getElementById('comment');
const textarea = document.querySelector('textarea')
const useCount = document.querySelector('span')
const ul = document.getElementById('list');

// const urlParams = new URLSearchParams(window.location.search);
// const article_id = urlParams.get('aid');
 // 获取当前页面的 URL
 const url = window.location.href;
 // 从 URL 中提取文章 ID
 const article_id = url.substring(url.lastIndexOf('/') + 1);


// function addCommentToPage(comment) {
//   const commentsContainer = document.getElementById('commentsContainer');
//   const commentElement = document.createElement('div');
//   commentElement.textContent = comment.comment;
//   commentsContainer.appendChild(commentElement);
// }
function timeSince(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
      return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

fetch(BACK_END_URL + '/'+ article_id +'/commentsreply')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(comments => {
    comments.forEach(comment => {
      const newcomment = document.createElement('li');
      const content = document.createElement('div');
      content.textContent = comment.comment;
      const time = document.createElement('div')
      time.textContent = 'created at: ' + timeSince(comment.created_at);
      const replyer = document.createElement('div')
      replyer.textContent = comment.username;
      
      newcomment.appendChild(replyer);
      newcomment.appendChild(time);
      newcomment.appendChild(content);
      
      ul.appendChild(newcomment);
    });
  })


// fetch(BACK_END_URL + '/'+ article_id +'/comments')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(comments => {
//     const commentsContainer = document.getElementById('commentsContainer');
//     comments.forEach(comment => {
//       const commentElement = document.createElement('div');
//       commentElement.textContent = comment.comment;
//       commentsContainer.appendChild(commentElement);
//     });
//   })
  // .catch(error => {
  //   console.error('There was a problem with the fetch operation:'+ error.massage);
  // });

commentForm.addEventListener('submit',async function(event) {
  try {
    event.preventDefault()
    const response = await saveComment(commentInput.value);
    console.log(response);
    commentInput.value = '';
    useCount.innerText = 0;
    commentInput.focus();
    // addCommentToPage(commentInput.value);
  } catch (error) {
    console.error(error);
  }
    
})

textarea.addEventListener('input',function () {
  useCount.innerText = textarea.value.length
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
