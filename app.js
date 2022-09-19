const libraryBooksEl = document.querySelector('.library-books');
const addElBtn = document.querySelector('.library-btn__add');
const removeElBtn = document.getElementsByClassName('library-btn__rmv');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const errMsgEl = document.querySelector('.errMsg');

const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

localStorage.setItem('bookList', JSON.stringify(bookList));

const renderBooks = () => {
  let markup = '';
  JSON.parse(localStorage.getItem('bookList')).forEach((elem, index) => {
    markup += `<div class="library-book" index=${index}>
      <p class="library-book__title">${elem.title}</p>
      <p class="library-book__author">${elem.author}</p>
      
      <a href="index.html"><button type="button" class="library-btn__rmv" id=${index}>Remove</button></a>
  </div>`;
  });
  libraryBooksEl.innerHTML = markup;
};

const addBook = () => {
  localStorage.setItem('bookList', JSON.stringify(bookList));
  addElBtn.addEventListener('click', () => {
    const title = titleEl.value;
    const author = authorEl.value;
    if (title && author) {
      const newBook = {
        title,
        author,
      };
      bookList.push(newBook);
      localStorage.setItem('bookList', JSON.stringify(bookList));
      renderBooks();
      errMsgEl.innerHTML = '';
    } else {
      errMsgEl.innerHTML = 'Input something';
    }
  });
};

renderBooks();
addBook();
removeBook();
