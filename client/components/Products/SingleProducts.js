import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../../store/product'
import Condition from './Condition'
import AvailabilityUpdateBtn from './AvailabilityUpdateBtn'
import {Loading} from '../Loading'
import FavoriteBtn from './FavoriteBtn'
import AddChat from '../Chats/AddChat'
import moment from 'moment'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.loadingHandler()
  }
  async componentDidMount() {
    try {
      await this.props.loadProduct(this.props.match.params.id)
      this.loadingHandler()
    } catch (err) {
      console.log(err)
    }
  }
  loadingHandler = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 500)
  }
  render() {
    if (this.state.loading === true) {
      return <Loading />
    }
    const {product, user} = this.props
    const bargainStatus = product.canBargain ? 'negotiable' : 'non-negotiable'

    return (
      <div className="container">
        <div>
          <div className="d-flex justify-content-between w-90">
            <Link to="/products/">
              <div className="mt-1 ml-2">
                <i
                  className="bi bi-arrow-left-circle"
                  style={{fontSize: '3em'}}
                />
              </div>
            </Link>
          </div>
        </div>
        {/* AVAILABILITY UPDATE BTN ONLY RENDERS FOR SELLER */}
        {product.sellerId === user.id && (
          <AvailabilityUpdateBtn product={product} />
        )}

        {/* <AddChat productId={product.id} browserId={this.props.user.id} /> */}
        <br />
        <div className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                className="img-fluid rounded"
                data-src="holder.js/200x250?theme=thumb"
                alt={product.title}
                src={product.image[0]}
              />
            </div>
            <div className="col-md-5">
              {/* <div className="mb-0" style={{fontSize: '2em'}}><FavoriteBtn productId={product.id} /></div> */}
              <div className="mb-0 text-dark small">
                Posted{' '}
                {moment(
                  moment(product.createdAt).format('YYYY-MM-DD HH:mm:ss')
                ).fromNow()}
              </div>
              <div>
                <h2 className="mb-0 text-dark">{product.title} </h2>
                <div className="mb-0 text-dark">by {product.author}</div>

                <div className="mb-0 mt-2 text-dark">
                  <span className="label">Genre:</span> {product.genre.category}{' '}
                  {product.isFiction && '(Fiction)'}
                </div>
                <div className="mb-0 text-dark">
                  <span className="label">Condition:</span> {product.condition}{' '}
                  <Condition />
                </div>
              </div>
              <p className="pt-1 text-dark">
                <span className="label">Description:</span>{' '}
                {product.description}
              </p>
              <h4 className="mb-0 text-dark">
                ${product.price}{' '}
                <span className="small label">({bargainStatus})</span>
              </h4>
              <br />
              {/* if user is a buyer then render products to buy */}
              <div className="d-flex mb-0 justify-content-space-around align-items-center">
                {product.sellerId !== this.props.user.id && (
                  <>
                    <span className="mr-2 label">
                      <AddChat
                        productId={product.id}
                        browserId={this.props.user.id}
                      />
                    </span>
                    <span className="mr-2 mt-1 " style={{fontSize: '1.5em'}}>
                      <FavoriteBtn productId={product.id} />
                    </span>
                  </>
                )}
              </div>
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
