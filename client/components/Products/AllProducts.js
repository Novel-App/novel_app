import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../../store/product'
import {fetchListings} from '../../store/userInfo'
import AvailabilityUpdateBtn from './AvailabilityUpdateBtn'
import AddChat from '../Chats/AddChat'

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
    this.handleOnSearchChange = this.handleOnSearchChange.bind(this)
    this.dynamicSearch = this.dynamicSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleOnSearchChange(evt) {
    console.log('SEARCH CHANGE', evt.target.value)
    this.setState({
      searchTerm: evt.target.value
    })
  }
  handleSubmit(evt) {
    // console.log('SEARCH CHANGE', evt.target.value)
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
      ? (products = this.dynamicSearch(this.props.listings))
      : (products = this.dynamicSearch(this.props.products))
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
          <h5>New post</h5>
          <div />
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
              <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <div>
                  <a
                    id="prod-nav-link"
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
                    id="prod-nav-link"
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
                    id="prod-nav-link"
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
            <form className="input-group rounded" onSubmit={this.handleSubmit}>
              <div className="col-xs-2 form-inline">
                <input
                  type="search"
                  name="searchTerm"
                  className="form-control rounded"
                  placeholder="Search for title/author!"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={this.state.searchTerm}
                  onChange={this.handleOnSearchChange}
                />
                <button type="submit" className="btn btn-light">
                  search
                </button>
              </div>
            </form>
            {products.length === 0 ? (
              <h2>
                {/* There are no {this.state.listingStatus.toLowerCase()}{' '}
                {this.state.currentPage} */}
                No results
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
                                  ♡ {product.numFavorites}
                                </h5>
                              </div>
                              <br />
                              <div className="card-footer text-center">
                                <h5>
                                  <small className="text-muted">
                                    {product.createdAt}
                                  </small>
                                </h5>
                                {product.sellerId === this.props.user.id ? (
                                  <>
                                    <i className="bi bi-star" />
                                    <p>Your Item</p>
                                    <br />
                                    <Link to={`/listings/${product.id}/edit`}>
                                      <button
                                        className="btn-primary"
                                        type="button"
                                      >
                                        {' '}
                                        Edit
                                      </button>
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
