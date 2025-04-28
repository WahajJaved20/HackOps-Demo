fetch('http://node-backend:3000/data')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('items-list');
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
