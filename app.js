const libraryBooksEl = document.querySelector('.library-books');
const addElBtn = document.querySelector('.library-btn__add');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const errMsgEl = document.querySelector('.errMsg');
const form = document.querySelector('form');
const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

const renderBooks = () => {
  if (!bookList.length) {
    libraryBooksEl.innerHTML = 'No books added';
  } else {
    let markup = '';
    bookList.forEach((elem, index) => {
      markup += `<div class="library-book" index=${index}>
      <p class="library-book__title">${elem.title}</p>
      <p class="library-book__author">${elem.author}</p>    
      <button type="button" class="library-btn__rmv" id=${index}>Remove</button>
  </div>`;
    });
    libraryBooksEl.innerHTML = markup;
  }

  const removeBook = () => {
    const removeBtnsEl = [...document.getElementsByClassName('library-btn__rmv')];
    removeBtnsEl.forEach((item) => {
      item.addEventListener('click', (e) => {
        bookList.splice(e.target.id, 1);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        renderBooks();
      });
    });
  };
  removeBook();
};

const addBook = () => {
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
      form.reset();
      errMsgEl.innerHTML = '';
    } else {
      errMsgEl.innerHTML = 'Input something';
    }
  });
};

renderBooks();
addBook();
