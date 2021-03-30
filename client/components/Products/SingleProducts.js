import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../../store/product'
import Condition from './Condition'
import AvailabilityUpdateBtn from './AvailabilityUpdateBtn'
import {Link} from 'react-router-dom'
import AddChat from '../Chats/AddChat'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  async componentDidMount() {
    try {
      await this.props.loadProduct(this.props.match.params.id)
      this.setState({loading: false})
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    if (this.state.loading === true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    const {product, user} = this.props
    const bargainStatus = product.canBargain ? 'negotiable' : 'non-negotiable'

    return (
      <div className="container">
        {/* AVAILABILITY UPDATE BTN ONLY RENDERS FOR SELLER */}
        {product.sellerId === user.id && (
          <AvailabilityUpdateBtn product={product} />
        )}

        <AddChat productId={product.id} browserId={this.props.user.id} />
        <br />
        <div className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                className="img-fluid rounded"
                data-src="holder.js/200x250?theme=thumb"
                alt={product.title}
                src={product.image}
              />
            </div>
            <div className="col-md-5">
              <h2 className="mb-0 text-dark">{product.title}</h2>
              <div className="mb-0 text-dark">by {product.author}</div>
              <div className="mb-0 text-dark">
                Genre: {product.genre.category}
              </div>
              <div className="mb-0 text-dark">{product.createdAt}</div>
              <div>
                <span className="mb-0 text-dark">
                  Condition: {product.condition}{' '}
                </span>
                <Condition />
              </div>
              <div className="mb-0 text-dark">
                ${product.price} ({bargainStatus})
              </div>
              <div className="mb-0 text-dark">♡ </div>
              <p className="pt-1 text-dark">
                Description: {product.description}
              </p>
              {/* if user is a buyer then render products to buy */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    product: state.products.single
  }
}

const mapDispatch = dispatch => {
  return {
    loadProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
