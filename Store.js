export default class Store {
    static getBooks() {
        return (localStorage.getItem('books') === null) ? [] : JSON.parse(localStorage.getItem('books'));
    }

    static setBooks(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }
}