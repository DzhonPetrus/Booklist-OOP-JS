import Store from './Store.js';

export default class UI {
    constructor(){
        this.books = Store.getBooks();
        this.displayBooksToList();
    }

    getFormValues() {
        const title = $('#title').val(),
            author = $('#author').val(),
            isbn = $('#isbn').val();

        return {title, author, isbn};
    }

    resetFormValues() {
        $('#title').val('');
        $('#author').val('');
        $('#isbn').val('');
    }

    showAlert(message, className) {
        const container = $('#alert-container');
        const template = `<div class="${className}">${message}</div>`;
        
        container.html(template);

        // remove alert after 3 seconds
        setTimeout(() => container.html(''), 3000);
    }

    isBookValid({title, author, isbn}) {
        return !(title === '' || author === '' || isbn === '');
    }

    isISBNTaken({isbn}) {
        return this.books.filter(book => book.isbn === isbn).length !== 0;
    }

    deleteBook(e) {
        const isbn = $(e.target).attr('data-isbn');
        const filteredBooks = this.books.filter(book => book.isbn !== isbn)

        this.books = filteredBooks;
        Store.setBooks(this.books);
        this.displayBooksToList();
    }

    addBookToList(book) {
        if (!this.isBookValid(book)) return this.showAlert('Please fill in all fields', 'error');
        if(this.isISBNTaken(book)) return this.showAlert('ISBN already exist!', 'error')

        this.books.push(book);
        Store.setBooks(this.books);
        this.displayBooksToList();

        this.showAlert('Book Added!', 'success');
        this.resetFormValues();
    }

    displayBooksToList() {
        const list = $('#book-list');
        const template = this.books.reduce((BOOKS, BOOK) => BOOKS + `<tr>
            <td>${BOOK.title}</td> 
            <td>${BOOK.author}</td> 
            <td>${BOOK.isbn}</td>
            <td><span class="deleteButton" data-isbn="${BOOK.isbn}">X</span></td>
        </tr>`, '');

        list.html(template);

        // binds the 'this' keyword of target HTML Element
        $('.deleteButton').on('click', this.deleteBook.bind(this));
    }

}