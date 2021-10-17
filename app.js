import Book from './Book.js';
import UI from './UI.js';

const ui = new UI();

$('#book-form').on('submit', function(e) {

    const book = new Book(ui.getFormValues());

    ui.addBookToList(book);
    
    e.preventDefault();
})