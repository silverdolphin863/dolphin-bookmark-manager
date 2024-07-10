document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;
  const category = document.getElementById('category').value;

  fetch('/api/bookmarks/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, originalUrl: url, category })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('bookmarkForm').reset();
    displayBookmarks();
  });
}

function deleteBookmark(id) {
  fetch(`/api/bookmarks/${id}`, { method: 'DELETE' })
  .then(() => displayBookmarks());
}

function displayBookmarks() {
  fetch('/api/bookmarks')
  .then(res => res.json())
  .then(bookmarks => {
    const bookmarksDiv = document.getElementById('bookmarks');
    bookmarksDiv.innerHTML = '';
    bookmarks.forEach(bookmark => {
      const bookmarkDiv = document.createElement('div');
      bookmarkDiv.className = 'bookmark';
      bookmarkDiv.innerHTML = `
        <a href="${bookmark.shortUrl}" target="_blank">${bookmark.title}</a>
        <p>${bookmark.category}</p>
        <button class="delete" onclick="deleteBookmark('${bookmark._id}')">Delete</button>
      `;
      bookmarksDiv.appendChild(bookmarkDiv);
    });
  });
}

document.addEventListener('DOMContentLoaded', displayBookmarks);
