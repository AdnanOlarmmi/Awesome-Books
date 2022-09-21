const listEl = document.querySelector('.header-list');
const addnewEl = document.querySelector('.header-addnew');
const contactEl = document.querySelector('.header-contact');
const date = document.querySelector('.date');
const libraryBooksListEl = document.querySelector('.library-booklist');
const libraryBooksEl = document.querySelector('.library-booklist__books');
const addElBtn = document.querySelector('.library-btn__add');
const removeElBtn = document.getElementsByClassName('library-btn__rmv');
const contactInformationEl = document.querySelector('.contact-information');
const form = document.querySelector('form');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const errMsgEl = document.querySelector('.errMsg');
setInterval(() => {
  date.innerHTML = new Date();
}, 1000);

const toggleWindow = () => {
  listEl.addEventListener('click', () => {
    form.classList.remove('show');
    contactInformationEl.classList.remove('show');
    libraryBooksListEl.classList.remove('hide');
    listEl.style.color = 'blue';
    addnewEl.style.color = 'black';
    contactEl.style.color = 'black';
  });

  addnewEl.addEventListener('click', () => {
    form.classList.add('show');
    contactInformationEl.classList.remove('show');
    libraryBooksListEl.classList.add('hide');
    listEl.style.color = 'black';
    addnewEl.style.color = 'blue';
    contactEl.style.color = 'black';
  });

  contactEl.addEventListener('click', () => {
    form.classList.remove('show');
    contactInformationEl.classList.add('show');
    libraryBooksListEl.classList.add('hide');
    listEl.style.color = 'black';
    addnewEl.style.color = 'black';
    contactEl.style.color = 'blue';
  });
};

const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

localStorage.setItem('bookList', JSON.stringify(bookList));

const renderBooks = () => {
  if (!bookList.length) {
    libraryBooksEl.innerHTML = 'No books added';
  } else {
    let markup = '';
    JSON.parse(localStorage.getItem('bookList')).forEach((elem, index) => {
      markup += `<div class="library-book" style="background-color: ${index % 2 && 'rgb(225, 223, 223)'}">
      <p class="library-book__title">"${elem.title}"</p> <span> by </span>
      <p class="library-book__author">${elem.author}</p>
      
      <a href=""><button type="button" class="library-btn__rmv border-black" id=${index}>Remove</button></a>
  </div>`;
    });
    libraryBooksEl.innerHTML = markup;
  }
};

class Library {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook() {
    localStorage.setItem('bookList', JSON.stringify(bookList));
    addElBtn.addEventListener('click', (e) => {
      this.title = titleEl.value;
      this.author = authorEl.value;
      if (this.title && this.author) {
        const newBook = {
          title: this.title,
          author: this.author,
        };
        bookList.push(newBook);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        renderBooks();
        errMsgEl.innerHTML = '';
      } else {
        e.preventDefault();
        errMsgEl.innerHTML = 'Input something';
        setTimeout(() => {
          errMsgEl.innerHTML = '';
        }, 2000);
      }
    });
  }

  removeBook() {
    const { id } = this;
    for (let i = 0; i < removeElBtn.length; i += 1) {
      removeElBtn[i].addEventListener('click', (e) => {
        bookList.splice(e.target.id, 1);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        renderBooks();
        return id;
      });
    }
  }
}

const awsomeBooks = new Library();

renderBooks();
awsomeBooks.addBook();
awsomeBooks.removeBook();
toggleWindow();