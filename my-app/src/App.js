import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import BookBoard from './components/Book/BookBoard';
import BookTable from './components/Book/BookTable';
import CreateBook from './components/Book/CreateBook';
import TodoBoard from './components/Todo/TodoBoard';
import TodoTable from './components/Todo/TodoTable';
import CreateTodo from './components/Todo/CreateTodo';
import {createBook, getAllBooks} from './services/BookService';
import {createTodo, getAllTodos} from './services/TodoService';
import Footer from './components/Footer';

function App() {

    //books
    const [bookShelf, setBookShelf] = useState({});
    const [books, setBooks] = useState([]);
    const [numberOfBooks, setNumberBooks] = useState(0);

    //Todos
    const [todoList, setTodoList] = useState({});
    const [todos, setTodos] = useState([]);
    const [numberOfTodos, setNumberTodos] = useState(0);

    const handleBookSubmit = () => {
        createBook(bookShelf)
            .then(() => {
                setNumberBooks(numberOfBooks + 1);
            });
    }

    const handleTodoSubmit = () => {
        createTodo(todoList)
            .then(() => {
                setNumberTodos(numberOfTodos + 1);
            });
    }

    const getAllBook = () => {
        getAllBooks()
            .then(data => {
                setBooks(data);
                setNumberBooks(data.length);
            });
    }

    const getAllTodo = () => {
        getAllTodos()
            .then(data => {
                setTodos(data);
                setNumberTodos(data.length);
            });
    }

    const handleOnChangeBookForm = (e) => {
        let inputData = bookShelf;
        if (e.target.name === 'book') {
            bookShelf.book = e.target.value;
        } else if (e.target.name === 'category') {
            bookShelf.category = e.target.value;
        } else if (e.target.name === 'author') {
            bookShelf.author = e.target.value;
        }
        setBookShelf(inputData);
    }

    const handleOnChangeTodoForm = (e) => {
        let inputData = todoList;
        if (e.target.name === 'todo') {
            todoList.todo = e.target.value;
        } else if (e.target.name === 'category') {
            todoList.category = e.target.value;
        }
        setTodoList(inputData);
    }


    return (
        <div className="main-wrapper">
            <div className="main">
                <Header/>
                <CreateBook
                    bookShelf={bookShelf}
                    onChangeForm={handleOnChangeBookForm}
                    handleSubmit={handleBookSubmit}
                />
                <CreateTodo
                    todoList={todoList}
                    onChangeForm={handleOnChangeTodoForm}
                    handleSubmit={handleTodoSubmit}
                />
                <BookBoard
                    numberOfBooks={numberOfBooks}
                    getAllBook={getAllBook}
                />
                <TodoBoard
                    numberOfTodos={numberOfTodos}
                    getAllTodo={getAllTodo}
                />
                <BookTable books={books}/>
                <TodoTable todos={todos}/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
