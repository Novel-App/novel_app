//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../store/product'
import Condition from './Condition'
import axios from 'axios'
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
      genreId: '',
      onScan: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    //this.handleSearch = this.handleSearch.bind(this)
    this.handleAutoFill = this.handleAutoFill.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
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
      alert('Invalid Barcode number! Try again!')
    }
  }

  _onDetected = result => {
    console.log('detected the result.....', result)
    this.setState({isbn: result})
    this.setState({onScan: false})
  }

  handleClick = () => {
    console.log('handling click...', this.state.onScan)
    this.setState(prevState => ({
      onScan: !prevState.onScan
    }))
  }

  handleReset = () => {
    this.setState({
      isbn: '',
      title: '',
      author: '',
      ISBN: '',
      description: ''
    })
    this.setState({
      onScan: true
    })
  }

  // handleSearch = e => {
  //   console.log ('handling Search...')
  //   this.setState({isbn: e.target.value})
  // }

  handleFileChange(evt) {
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
      <div className="container">
        <div className="d-flex flex-column justify-content-center">
          <br />
          <div className="d-flex">
            <Link to="/home">
              <button
                type="button"
                className="ml-10 btn btn-sm btn-outline-warning ml-15  mb-10"
              >
                Cancel
              </button>
            </Link>
          </div>
          <h1 className="align-self-center">New post </h1>
        </div>

        <div className="d-flex flex-column align-items-center ml-5">
          <br />
          <button
            className={
              this.state.onScan
                ? 'btn btn-outline-success m1'
                : 'btn btn-outline-dark ml-1'
            }
            type="button"
            onClick={this.handleClick}
          >
            SCAN
          </button>

          <p> Scan your barcode to pre-fill the fields below</p>

          <div>
            <div className="d-flex flex-column align-items-center">
              <form
                onSubmit={handleAutoFill}
                className="d-flex justify-content-center"
              >
                <input
                  className="new-post-input"
                  style={{fontSize: 20, width: 190, height: 35, margin: 8}}
                  placeholder="Your barcode number"
                  value={this.state.isbn ? this.state.isbn : ''}
                />
                <button
                  className="btn btn-sm btn-outline-dark ml-1"
                  type="submit"
                >
                  Confirm
                </button>
                <button
                  className="btn btn-sm btn-outline-dark ml-1"
                  onClick={this.handleReset}
                  type="button"
                >
                  Clear
                </button>
              </form>
            </div>
            <div>
              {this.state.onScan ? (
                <Scanner onDetected={this._onDetected} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <p>Enter ISBN to auto-fill the fields below</p>
          <form onSubmit={handleAutoFill}>
            <input
              className="new-post-input"
              onChange={handleSearch}
              type="text"
              placeholder="Enter ISBN"
            />
            <button type="submit" className="btn btn-sm btn-outline-dark ml-1">
              Auto Fill
            </button>
          </form>
        </div>
        <div className="d-flex flex-column align-items-center ml-5">
          <p>Scan you ISBN barcode to auto-fill the fields below</p>
          <BarcodeScanner />
        </div>
        <br />

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="productImg">Upload your own images (up to 4)</label>
            <input
              type="file"
              name="productImg"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="title">Title</label>
            <div className="col-sm-4 col-xs-4 mt-0">
              <input
                name="title"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={title}
                required
              />
            </div>
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="author">Author</label>
            <div className="col-sm-4 col-xs-4 mt-0">
              <input
                name="author"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={author}
                required
              />
            </div>
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="ISBN">ISBN</label>
            <div className="col-sm-4 col-xs-4 mt-0">
              <input
                name="ISBN"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={ISBN}
                required
              />
            </div>
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="description">Description</label>
            <div className="col-sm-4 col-xs-4 mt-0">
              <textarea
                name="description"
                type="textarea"
                className="form-control"
                onChange={handleChange}
                value={description}
                required
              />
            </div>
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="genreId">Genre</label>

            <div className="d-flex justify-content-center align-items-center">
              <div className="col-sm-8 col-xs-8 mt-0">
                <select
                  name="genreId"
                  className="form-control select-dropdown"
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
              </div>

              <div className="form-check d-flex justify-content-center">
                <label className="form-check-label" htmlFor="isFiction">
                  <input
                    className="form-check-input mr-10"
                    name="isFiction"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={isFiction}
                  />
                  Fiction
                </label>
              </div>
            </div>
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="condition">
              Condition <Condition />
            </label>
            <div className="col-sm-4 col-xs-4 mt-0">
              <select
                name="condition"
                className="form-control select-dropdown"
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
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="price">Price ($)</label>

            <div className="d-flex justify-content-center align-items-center">
              <div className="col-sm-8 col-xs-8 mt-0">
                <input
                  name="price"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  value={price}
                  required
                />
              </div>

              <div className="form-check d-flex justify-content-center">
                <label className="form-check-label" htmlFor="canBargain">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="canBargain"
                    onChange={handleCheckboxChange}
                    value={canBargain}
                  />
                  Negotiable
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-primary ml-5">
              Submit
            </button>
          </div>
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
