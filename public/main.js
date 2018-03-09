// main.js
var update = document.getElementById('update')

update.addEventListener('click',  () => {
  // Send PUT Request here
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Reese!',
      'quote': 'Woof woof woof!'
    })
  })
  .then((res) => {
    if(res.ok) return res.json();
  })
  .then(data => {
    console.log(data);
    window.location.reload(true);
  })
})
