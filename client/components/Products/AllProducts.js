import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../../store/product'
import {fetchListings} from '../../store/userInfo'
import AvailabilityUpdateBtn from './AvailabilityUpdateBtn'
import EditListing from '../UserProfile/EditListing'
import AddChat from '../Chats/AddChat'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentPage: '',
      listingStatus: 'Available',
      listingUpdated: false
    }
    this.updateStatus = this.updateStatus.bind(this)
  }
  componentDidMount() {
    const path =
      this.props.match.path.slice(1) === 'listings' ? 'listings' : 'Products'
    this.setState({currentPage: path})
    this.updateData()
    this.setState({loading: false})
  }
  componentDidUpdate() {
    if (this.state.listingUpdated) {
      this.updateData()
      this.setState({listingUpdated: false})
    }
  }
  updateData() {
    const userId = this.props.user.id
    const path =
      this.props.match.path.slice(1) === 'listings' ? 'listings' : 'products'
    path === 'listings'
      ? this.props.loadListings(userId, this.state.listingStatus)
      : this.props.loadProducts(this.state.listingStatus)
  }
  updateStatus(status) {
    if (status !== this.state.listingStatus) {
      this.setState({listingStatus: status})
      this.setState({listingUpdated: true})
    }
  }
  render() {
    //loading screen
    if (this.state.loading === true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    //only display certain buttons if listing page is true
    let products = []
    let currentPage = this.state.currentPage
    currentPage === 'listings'
      ? (products = this.props.listings)
      : (products = this.props.products)
    return (
      <div className="container">
        <div className="container-flex">
          <Link to="/products/add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
              alignself="right"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </Link>
          <h5>Add a product</h5>
          <div />
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
              <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <div>
                  <a
                    href="#"
                    onClick={() => {
                      this.updateStatus('Available')
                    }}
                  >
                    Current {currentPage}
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    onClick={() => {
                      this.updateStatus('Reserved')
                    }}
                  >
                    Reserved {currentPage}
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    onClick={() => {
                      this.updateStatus('Sold')
                    }}
                  >
                    Past {currentPage}
                  </a>
                </div>
              </div>
            </nav>
            {products.length === 0 ? (
              <h2>
                There are no {this.state.listingStatus.toLowerCase()}{' '}
                {this.state.currentPage}
              </h2>
            ) : (
              <div className="container-fluid">
                <div className="row">
                  {products.map(product => (
                    <div key={product.id}>
                      <div className="col-12 mt-3">
                        <div className="card">
                          <div className="card-horizontal">
                            <Link to={`/products/${product.id}`}>
                              <img
                                className="card-img"
                                alt={product.title}
                                src={product.image}
                              />
                            </Link>
                            <div className="card-body">
                              <h3 className="card-title text-center">
                                {product.title}
                              </h3>
                              <h4 className="card-subtitle mb-2 text-muted text-center">
                                {product.author}
                              </h4>
                              <div className="text-center">
                                <h5 className="card-text">${product.price}</h5>
                                <h5 className="card-text">
                                  ♡: {product.numFavorites}
                                </h5>
                              </div>
                              <br />
                              <div className="card-footer text-center">
                                <h5>
                                  <small className="text-muted">
                                    {product.createdAt}
                                  </small>
                                </h5>
                                {currentPage === 'listings' ? (
                                  <>
                                    <i className="bi bi-star" />
                                    <Link to={`/listings/${product.id}/edit`}>
                                      Edit
                                    </Link>
                                    <AvailabilityUpdateBtn product={product} />
                                  </>
                                ) : (
                                  <AddChat
                                    productId={product.id}
                                    browserId={this.props.user.id}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    products: state.products.all,
    listings: state.userInfo.listings
  }
}

const mapDispatch = dispatch => {
  return {
    loadListings: (userId, availability) =>
      dispatch(fetchListings(userId, availability)),
    loadProducts: availability => dispatch(fetchProducts(availability))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
