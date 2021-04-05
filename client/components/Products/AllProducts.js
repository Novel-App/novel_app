import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ScrollUpButton from 'react-scroll-up-button'
import {fetchProducts, removeProduct} from '../../store/product'
import {fetchListings} from '../../store/userInfo'
import AvailabilityUpdateBtn from './AvailabilityUpdateBtn'
import {Loading} from '../Loading'
import FavoriteBtn from './FavoriteBtn'
import AddChat from '../Chats/AddChat'
import moment from 'moment'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchTerm: '',
      currentPage: '',
      listingStatus: 'Available',
      listingUpdated: false
    }
    this.updateStatus = this.updateStatus.bind(this)
    this.updateData = this.updateData.bind(this)
    this.handleOnSearchChange = this.handleOnSearchChange.bind(this)
    this.dynamicSearch = this.dynamicSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loadingHandler = this.loadingHandler.bind(this)
  }
  componentDidMount() {
    const path =
      this.props.match.path.slice(1) === 'listings' ? 'listings' : 'Products'
    this.setState({currentPage: path})
    this.updateData()
    // this.setState({loading: false})
    this.loadingHandler()
  }
  componentDidUpdate() {
    if (this.state.listingUpdated) {
      this.updateData()
      this.setState({listingUpdated: false})
    }
  }
  loadingHandler = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
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
  handleOnSearchChange(evt) {
    this.setState({
      searchTerm: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.setState({
      searchTerm: evt.target.searchTerm.value
    })
  }
  dynamicSearch(products) {
    return products.filter(
      product =>
        product.title
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        product.author
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
    )
  }

  deleteClickHandler(productId) {
    this.props.deleteProduct(productId)
  }

  render() {
    //loading screen
    if (this.state.loading) {
      return <Loading />
    }
    //only display certain buttons if listing page is true
    let products = []
    let currentPage = this.state.currentPage
    currentPage === 'listings'
      ? (products = this.dynamicSearch(this.props.listings))
      : (products = this.dynamicSearch(this.props.products))
    return (
      <div className="container">
        <div className="container-flex">
          <ScrollUpButton style={{marginBottom: '3em'}} />
          <div className="container">
            <nav className="productNavBar d-flex navbar-expand-md mt-3">
              <div
                id="small-navbar"
                className="navbar-collapse d-flex collapse w-100 order-1 order-sm-0 dual-collapse2"
              >
                <div>
                  <a
                    className="prod-nav-link"
                    style={
                      this.state.listingStatus === 'Available'
                        ? {textDecoration: 'underline'}
                        : {}
                    }
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
                    className="prod-nav-link"
                    style={
                      this.state.listingStatus === 'Reserved'
                        ? {textDecoration: 'underline'}
                        : {}
                    }
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
                    className="prod-nav-link"
                    style={
                      this.state.listingStatus === 'Sold'
                        ? {textDecoration: 'underline'}
                        : {}
                    }
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
            <div className="d-flex justify-content-between w-90">
              <Link to="/products/add">
                <div className="mt-1 ml-2">
                  <i
                    className="bi bi-plus-circle-fill add-product"
                    style={{fontSize: '3em'}}
                  />
                </div>
              </Link>
              <form
                className="input-group rounded d-flex justify-content-end"
                onSubmit={this.handleSubmit}
              >
                <div className="col-xs-6 form-inline">
                  <input
                    type="search"
                    name="searchTerm"
                    className="form-control rounded mr-1"
                    placeholder="Search a title/author "
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={this.state.searchTerm}
                    onChange={this.handleOnSearchChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-dark ml-1 mt-1"
                  >
                    search
                  </button>
                </div>
              </form>
            </div>
            {products.length === 0 ? (
              <h2>No results</h2>
            ) : (
              <div className="container-fluid">
                {products.map(product => (
                  <div className="card mt-3" key={product.id}>
                    <div className="row no-gutters">
                      <div className="d-flex align-items-center col-md-4">
                        <div className="card-horizontal">
                          <Link to={`/products/${product.id}`}>
                            <img
                              className="img-fluid"
                              alt={product.title}
                              src={product.image[0]}
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="card-body">
                          <h3 className="card-title text-center">
                            <Link to={`/products/${product.id}`}>
                              {product.title}
                            </Link>
                          </h3>
                          <h4 className="card-subtitle mb-2 text-muted text-center">
                            {product.author}
                          </h4>
                          <div className="text-center">
                            <h5 className="card-text">${product.price}</h5>
                            {product.sellerId !== this.props.user.id && (
                              <h5 className="card-text">
                                <FavoriteBtn productId={product.id} />
                              </h5>
                            )}
                          </div>
                          <br />
                          <div className="card-footer text-center container-flex ">
                            <h5>
                              <small className="text-muted">
                                Posted{' '}
                                {moment(
                                  moment(product.createdAt).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                  )
                                ).fromNow()}
                              </small>
                            </h5>
                            {product.sellerId === this.props.user.id ? (
                              <>
                                <div className="d-flex justify-content-center align-items-center">
                                  <Link to={`/listings/${product.id}/edit`}>
                                    <button
                                      className="btn btn-sm btn-outline-secondary rounded mr-2"
                                      type="button"
                                    >
                                      Edit
                                    </button>
                                  </Link>
                                  {/* <span style={{fontSize: '2em'}}>
                                    <i
                                      className="bi bi-trash"
                                      onClick={() =>
                                        this.deleteClickHandler(product.id)
                                      }
                                    />
                                  </span> */}
                                  <button
                                    className="btn btn-sm btn-outline-warning rounded mr-2"
                                    type="button"
                                    onClick={() =>
                                      this.deleteClickHandler(product.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                                <AvailabilityUpdateBtn product={product} />
                                <i className="bi bi-star-fill small" />{' '}
                                <span className="small">Your Listing</span>
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
                ))}
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
    loadProducts: availability => dispatch(fetchProducts(availability)),
    deleteProduct: productId => dispatch(removeProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
