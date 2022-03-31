async function newFormHandler(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const post_body = document.getElementById('post-body').value;
    console.log(title, post_body)
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#create').addEventListener('submit', newFormHandler);