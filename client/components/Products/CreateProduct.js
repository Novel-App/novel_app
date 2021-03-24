//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../store/product'

//TIER 3: BARCODE SCAN --> PRE-FILL AVAILABLE INFORMATION

// add condition info icon

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
  genreCategory: '',
  isFiction: false
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
    this.setState({defaultState})
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
      genreCategory,
      isFiction
    } = this.state
    return (
      <div>
        <div>
          <Link to="/products">Cancel</Link>
          <h1>New post</h1>
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
            <label htmlFor="genreCategory">Genre</label>
            <select
              name="genreCategory"
              className="form-control"
              onChange={handleChange}
              value={genreCategory}
              required
            >
              <option value="">Select</option>
              <option value="Fantasy/Adventure">Fantasy/Adventure</option>
              <option value="Romance">Romance</option>
              <option value="Thriller/Mystery">Thriller/Mystery</option>
              <option value="Science Fiction/Dystopian">
                Science Fiction/Dystopian
              </option>
              <option value="Memoir">Memoir</option>
              <option value="History">History</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Development/How-To/Education">
                Development/How-To/Education
              </option>
              <option value="Humor">Humor</option>
              <option value="Childrens">Childrens</option>
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
            <label htmlFor="condition">Condition</label>
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
          <button type="submit">Submit</button>
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
