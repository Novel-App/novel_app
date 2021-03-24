import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/product'
import {Link} from 'react-router-dom'
import {fetchListings, fetchFavorites} from '../../store/userInfo'

//add a product icon --> links to add product component

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listingPage: false,
      productPage: false,
      favoritesPage: false
    }
  }
  componentDidMount() {
    const path = this.props.match.path
    if (path === '/products') {
      //productPage
      this.props.loadProducts()
      this.setState({productPage: true})
    } else if (path === '/listings') {
      //listing page
      this.props.loadListings(this.props.user.id)
      this.setState({listingPage: true})
    } else if (path === '/favorites') {
      //favorites page
      console.log('favorites')
      this.props.loadFavorites(this.props.user.id)
      this.setState({favoritesPage: true})
    }
    this.setState({loading: false})
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
    let noProducts = ''
    if (this.state.favoritesPage) {
      products = this.props.favorites
      noProducts = (
        <>
          <h2>You do not have any favorite products</h2>
          <p>Browse listings and heart some books!</p>
        </>
      )
    } else if (this.state.listingPage) {
      products = this.props.listings

      noProducts = <h2>You are not currently selling any products</h2>
    } else if (this.state.productPage) {
      products = this.props.products
      noProducts = <h2>There are no products being sold in your area</h2>
    }
    //if there are no products sold
    if (products.length === 0) {
      return <div>{noProducts}</div>
    }
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            {products.map(product => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    className="card-img-top"
                    alt={product.title}
                    src={product.image}
                  />
                  <h1 className="card-title">{product.title}</h1>
                </Link>
                <h2 className="card-subtitle mb-2 text-muted">
                  by {product.author}
                </h2>
                <h3>{product.createdAt}</h3>
                <h3>${product.price}</h3>
                <h3>♡: {product.numFavorites}</h3>
                <>
                  {this.state.listingPage ? (
                    <h3>UpdateListingButton</h3>
                  ) : (
                    <></>
                  )}
                </>
                <>
                  {this.state.listingPage ? (
                    <h3>Update to sold/reservedButton</h3>
                  ) : (
                    <></>
                  )}
                </>
              </div>
            ))}
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
    favorites: state.userInfo.favorites,
    listings: state.userInfo.listings
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
    loadListings: userId => dispatch(fetchListings(userId)),
    loadFavorites: userId => dispatch(fetchFavorites(userId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
