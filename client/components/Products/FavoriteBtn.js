//PROPS --> SINGLE PRODUCT

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getFavorites,
  updateFavorite,
  getFavCount,
  updateFavCount
} from '../../store/favorites'

class FavoriteBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusUpdated: false
    }
    this.toggleFavorite = this.toggleFavorite.bind(this)
  }
  componentDidMount() {
    this.props.getFavorites(this.props.user.id)
    this.props.getFavCount(this.props.productId)
  }
  async componentDidUpdate() {
    if (this.state.statusUpdated) {
      await this.props.getFavorites(this.props.user.id)
      await this.props.updateFavCount(this.props.productId)
      this.setState({statusUpdated: false})
    }
  }
  toggleFavorite(favStatus) {
    this.props.updateFavorite(this.props.productId, {
      userId: this.props.user.id,
      isFavorite: !favStatus
    })
    this.setState({
      statusUpdated: true
    })
  }
  render() {
    const favorites = this.props.favorites || []
    const favCounts = this.props.favCounts || []
    let favorite = favorites.filter(
      fav => fav.productId === this.props.productId
    )
    favorite = favorite.length > 0 ? favorite[0] : {isFavorite: false}
    let oneFavCount = favCounts.filter(
      fav => Number(fav.productId) === this.props.productId
    )
    return favorite === undefined || oneFavCount[0] === undefined ? (
      <></>
    ) : (
      <div className="d-flex justify-content-center mb-1">
        <i
          className={favorite.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
          onClick={() => this.toggleFavorite(favorite.isFavorite)}
        />
        <p className="ml-2 mt-1 mb-0 small">{oneFavCount[0].count}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    favorites: state.favorites.all,
    favCounts: state.favorites.favCounts
  }
}

const mapDispatch = dispatch => {
  return {
    updateFavCount: productId => dispatch(updateFavCount(productId)),
    getFavCount: productId => dispatch(getFavCount(productId)),
    updateFavorite: (productId, info) =>
      dispatch(updateFavorite(productId, info)),
    getFavorites: userId => dispatch(getFavorites(userId))
  }
}

export default connect(mapState, mapDispatch)(FavoriteBtn)
