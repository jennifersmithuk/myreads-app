import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css'
import MainPage from './MainPage'
import SearchBar from './SearchBar'

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    }
  )
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
    console.log('update worked!');
  }


  render() {

    return (
      <div className="app">
        <div>
      <MainPage
        books={this.state.books}
        updateShelf={this.updateShelf}
        />
        </div>

        <div>
          <Route exact path="/search" render={() => (
            <SearchBar
              updateShelf={this.updateShelf}
              books={this.state.books}
              />
          )} />
        </div>
    </div>
)
}
}

export default App;
