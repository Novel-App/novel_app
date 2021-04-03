//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../store/product'
import Condition from './Condition'
import axios from 'axios'
import BarcodeScanner from './BarcodeScanner'
import Scanner from './Scanner'

//TIER 3: BARCODE SCAN --> PRE-FILL AVAILABLE INFORMATION

const defaultState = {
  title: '',
  author: '',
  ISBN: '',
  description: '',
  image: ['https://historyexplorer.si.edu/sites/default/files/book-348.jpg'],
  condition: '',
  price: 0,
  canBargain: false,
  availability: 'Available',
  isFiction: false,
  genreId: ''
}
class CreateProduct extends Component {
  constructor(props) {
    super(props)
    // this.productImage = React.createRef()
    this.state = {
      title: '',
      author: '',
      ISBN: '',
      description: '',
      image: [
        'https://historyexplorer.si.edu/sites/default/files/book-348.jpg'
      ],
      condition: '',
      price: 0,
      canBargain: false,
      availability: 'Available',
      genreId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleAutoFill = this.handleAutoFill.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleCheckboxChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.checked
    })
  }

  async handleAutoFill(e) {
    e.preventDefault()
    try {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${
            this.state.isbn
          }`
        )
        .then(data => {
          if (data.data.items[0]) {
            const bookInfoFromAPI = data.data.items[0].volumeInfo
            this.setState({
              title: bookInfoFromAPI.title,
              author: bookInfoFromAPI.authors[0],
              ISBN: bookInfoFromAPI.industryIdentifiers[1].identifier,
              description: bookInfoFromAPI.description,
              image: bookInfoFromAPI.imageLinks.thumbnail
            })
            console.log('---->', this.state)
          }
        })
    } catch (err) {
      alert('ISBN Not Found! Try again!')
    }
  }

  handleSearch = e => {
    this.setState({isbn: e.target.value})
  }

  handleFileChange(evt) {
    // console.log('IMAGE URL', URL.createObjectURL(evt.target.files[0]))
    this.setState({image: evt.target.files})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const product = new FormData()
    product.append('title', this.state.title)
    product.append('author', this.state.author)
    product.append('ISBN', this.state.ISBN)
    product.append('description', this.state.description)
    for (let i = 0; i < this.state.image.length; i++) {
      product.append('productImg', this.state.image[i])
    }
    product.append('condition', this.state.condition)
    product.append('price', this.state.price)
    product.append('canBargain', this.state.canBargain)
    product.append('availability', this.state.availability)
    product.append('genreId', this.state.genreId)
    product.append('sellerId', this.props.user.id)

    await this.props.createProduct(product)
  }

  render() {
    const {
      handleChange,
      handleCheckboxChange,
      handleSubmit,
      handleFileChange,
      handleSearch,
      handleAutoFill
    } = this
    const {
      title,
      author,
      ISBN,
      description,
      condition,
      price,
      canBargain,
      genreId,
      isFiction
    } = this.state
    return (
      <div>
        <div className="d-flex flex-column justify-content-center">
          <Link to="/home">
            <button type="button" className="btn btn-warning">
              Cancel
            </button>
          </Link>
          <h1 className="align-self-center">New post </h1>
        </div>

        <div>
          <p>Enter ISBN below for auto fill imformation</p>
          <form onSubmit={handleAutoFill}>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Enter ISBN"
            />
            <button type="submit">Auto Fill</button>
          </form>
        </div>
        <div>
          <p>Scan your barcode for ISBN</p>
          <BarcodeScanner />
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="productImg">Images (up to 4)</label>
            <input
              type="file"
              name="productImg"
              accept="image/*"
              multiple
              // ref={this.productImage}
              onChange={handleFileChange}
              required
            />

            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={title}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              name="author"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={author}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ISBN">ISBN</label>
            <input
              name="ISBN"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={ISBN}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              type="textarea"
              className="form-control"
              onChange={handleChange}
              value={description}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
              name="genreId"
              className="form-control"
              onChange={handleChange}
              value={genreId}
              required
            >
              <option value="">Select</option>
              <option value={1}>Fantasy/Adventure</option>
              <option value={2}>Romance</option>
              <option value={3}>Thriller/Mystery</option>
              <option value={4}>Science Fiction/Dystopian</option>
              <option value={5}>Memoir</option>
              <option value={6}>History</option>
              <option value={7}>Lifestyle</option>
              <option value={8}>Development/How-To/Education</option>
              <option value={9}>Humor</option>
              <option value={10}>Childrens</option>
            </select>

            <div className="form-check">
              <input
                className="form-check-input"
                name="isFiction"
                type="checkbox"
                onChange={handleCheckboxChange}
                value={isFiction}
              />
              <label className="form-check-label" htmlFor="isFiction">
                Fiction
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="condition">
              Condition <Condition />
            </label>
            <select
              name="condition"
              className="form-control"
              onChange={handleChange}
              value={condition}
              required
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Loved">Loved</option>
              <option value="Aged">Aged</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              name="price"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={price}
              required
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="canBargain"
                onChange={handleCheckboxChange}
                value={canBargain}
              />
              <label className="form-check-label" htmlFor="canBargain">
                Negotiable
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-light">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product))
  }
}

export default connect(mapState, mapDispatch)(CreateProduct)
