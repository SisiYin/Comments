// const commentsContainer = document.getElementById('commentContainer');
// const commentElement = document.createElement('div');
// commentElement.textContent = comment.comment;
// commentsContainer.appendChild(commentElement);
window.history.pushState(null, '', '/post/?aid=2');
const BACK_END_URL = 'http://localhost:3001'
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('aid');

// 发送GET请求给后端，获取特定article_id的全部评论
fetch(BACK_END_URL + `/${article_id}/comments`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
      return response.json(); // 解析JSON格式的响应
  })
  .then(comments => {
    // 将获取的评论显示在页面上
    const commentsContainer = document.getElementById('commentsContainer');
    comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.textContent = comment.comment;
      commentsContainer.appendChild(commentElement);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });