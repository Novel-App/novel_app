//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProduct} from '../../store/product'

//TIER 3: BARCODE SCAN --> PRE-FILL AVAILABLE INFORMATION

const defaultState = {
  title: '',
  author: '',
  ISBN: '../../images/defaultMugImage.jpg',
  description: '',
  image: 'https://historyexplorer.si.edu/sites/default/files/book-348.jpg',
  condition: '',
  price: 0,
  canBargain: false,
  availability: 'Available'
}

// place holders
// add condition info icon

class CreateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.createProduct({...this.state})
    this.setState({defaultState})
  }
  render() {
    const {handleChange, handleSubmit} = this.props
    const {
      title,
      author,
      ISBN,
      description,
      image,
      condition,
      price,
      canBargain
    } = this.state
    return (
      <div className="container">
        <div>
          <Link to="/products">Cancel</Link>
          <h1>New post</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            onChange={handleChange}
            value={title}
            required
          />
          <br />

          <label htmlFor="author">Author:</label>
          <input
            name="author"
            type="text"
            onChange={handleChange}
            value={author}
            required
          />
          <br />

          <label htmlFor="ISBN">ISBN:</label>
          <input
            name="ISBN"
            type="text"
            onChange={handleChange}
            value={ISBN}
            required
          />
          <br />

          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            type="textarea"
            onChange={handleChange}
            value={description}
            required
          />
          <br />

          {/* <label htmlFor="image">Upload Images:</label>
            <input
            name="image"
            onChange={handleChange}
            value={image}
            required
            />
            <br /> */}

          <label htmlFor="condition">Condition:</label>
          <select
            name="condition"
            onChange={handleChange}
            value={condition}
            required
          >
            <option value="Select" disabled selected>
              Select
            </option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Loved">Loved</option>
            <option value="Aged">Aged</option>
          </select>
          <br />

          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="number"
            onChange={handleChange}
            value={price}
            placeholder="$"
            required
          />
          <br />

          <label htmlFor="canBargain">Price negotiable:</label>
          <select
            name="canBargain"
            onChange={handleChange}
            value={condition}
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product))
  }
}

export default connect(null, mapDispatch)(CreateProduct)
