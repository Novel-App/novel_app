//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct, updateProduct} from '../../store/product'
import Condition from '../Products/Condition'

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
  genreId: 1
}

class EditListing extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.loadSingleProduct(this.props.match.params.listingId)
    this.setState({
      title: this.props.listing.title,
      author: this.props.listing.author,
      ISBN: this.props.listing.ISBN,
      description: this.props.listing.description,
      image: this.props.listing.image[0],
      condition: this.props.listing.condition,
      price: this.props.listing.price,
      canBargain: this.props.listing.canBargain,
      availability: this.props.listing.availability,
      genreId: this.props.genreId
    })
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
    await this.props.updateListing({
      ...this.state,
      id: this.props.match.params.listingId,
      sellerId: this.props.user.id
    })
    // this.setState({defaultState})
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
        <Link to="/listings">
          <button type="button" className="btn btn-warning">
            Cancel
          </button>
        </Link>

        <form onSubmit={handleSubmit}>
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
                checked={canBargain}
              />
              <label className="form-check-label" htmlFor="canBargain">
                Negotiable
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    listing: state.products.single,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    updateListing: product => dispatch(updateProduct(product))
  }
}

export default connect(mapState, mapDispatch)(EditListing)
