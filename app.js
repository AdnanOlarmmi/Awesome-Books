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
    markup += `<div class="library-book" style="background-color: ${index % 2 && 'rgb(225, 223, 223)'}">
      <p class="library-book__title">"${elem.title}"</p> <span> by </span>
      <p class="library-book__author">${elem.author}</p>
      
      <a href="index.html"><button type="button" class="library-btn__rmv border-black" id=${index}>Remove</button></a>
  </div>`;
  });
  libraryBooksEl.innerHTML = markup;
};

class library {
  constructor(title, author) {
    this.title = title,
    this.author = author;
  }

  addBook() {
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
  }

  removeBook () {
    for (let i = 0; i < removeElBtn.length; i += 1) {
      removeElBtn[i].addEventListener('click', (e) => {
        bookList.splice(e.target.id, 1);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        renderBooks();
      });
    }
  };

}

const awsomeBooks = new library();


renderBooks();
awsomeBooks.addBook();
awsomeBooks.removeBook();


