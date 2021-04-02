import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserProducts} from '../../store/userInfo'
import AddChat from '../Chats/AddChat'
import FavoriteBtn from '../Products/FavoriteBtn'
import moment from 'moment'

class FavAndPurchases extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentPage: ''
    }
  }

  componentDidMount() {
    const path = this.props.match.path.slice(1)
    const userId = this.props.user.id
    this.setState({currentPage: path})
    this.props.loadUserProducts(userId, path)
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
    let currentPage = this.state.currentPage
    if (currentPage === 'favorites') {
      products = this.props.favorites
      noProducts = (
        <>
          <h2>You do not have any favorite products</h2>
          <p>Browse products and heart some books!</p>
        </>
      )
    } else {
      products = this.props.purchases
      noProducts = <h2>You do not have any past purchases</h2>
    }
    //if there are no products sold
    if (products.length === 0) {
      return <div>{noProducts}</div>
    }
    return (
      <div className="container-fluid">
        <h1>{currentPage === 'favorites' ? 'Favorites' : 'Purchases'}</h1>
        <div className="d-flex flex-column">
          {products.map(product => (
            <div className="card mt-3" key={product.id}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <div className="card-horizontal">
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="card-img img-fluid"
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
                    <div className="card-footer text-center">
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

                      <AddChat
                        productId={product.id}
                        browserId={this.props.user.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    favorites: state.userInfo.favorites,
    purchases: state.userInfo.purchases
  }
}

const mapDispatch = dispatch => {
  return {
    loadUserProducts: (userId, type) =>
      dispatch(fetchUserProducts(userId, type))
  }
}

export default connect(mapState, mapDispatch)(FavAndPurchases)
