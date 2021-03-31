//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../store/product'
import Condition from './Condition'

//TIER 3: BARCODE SCAN --> PRE-FILL AVAILABLE INFORMATION

const defaultState = {
  title: '',
  author: '',
  ISBN: '',
  description: '',
  image: 'https://historyexplorer.si.edu/sites/default/files/book-348.jpg',
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
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.createProduct({
      ...this.state,
      sellerId: this.props.user.id
    })
  }
  render() {
    const {handleChange, handleCheckboxChange, handleSubmit} = this
    const {
      title,
      author,
      ISBN,
      description,
      image,
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
          <h1 className="align-self-center">New post</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="image">Upload Images:</label>
                <input
                name="image"
                onChange={handleChange}
                value={image}
                required
                />
                <br /> */}

          <div className="form-group">
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
