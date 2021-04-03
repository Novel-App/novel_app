import React, {Component} from 'react'
import axios from 'axios'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isbn: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.isbn}`
      )
      .then(data => {
        //console.log ('xxxxx',data.data.items[0].authors)
        const bookInfoFromAPI = data.data.items[0].volumeInfo
        const bookInfo = {
          title: bookInfoFromAPI.title,
          ISBN: bookInfoFromAPI.industryIdentifiers[1].identifier,
          description: bookInfoFromAPI.description,
          image: bookInfoFromAPI.imageLinks.thumbnail
        }
      })
  }

  handleSearch = e => {
    this.setState({isbn: e.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleSearch}
            type="text"
            placeholder="search by ISBN"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default Book
