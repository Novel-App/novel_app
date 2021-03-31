//PROPS --> SINGLE PRODUCT

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFavorites, updateFavorite, getFavCount} from '../../store/favorites'

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
  }
  async componentDidUpdate() {
    if (this.state.statusUpdated) {
      await this.props.getFavorites(this.props.user.id)
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
    let favorite = favorites.filter(
      fav => fav.productId === this.props.productId
    )
    favorite = favorite.length > 0 ? favorite[0] : {isFavorite: false}
    const favCount = Number(this.props.favCount)
    return favorite === undefined || favCount === undefined ? (
      <></>
    ) : (
      <>
        <i
          className={favorite.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
          onClick={() => this.toggleFavorite(favorite.isFavorite)}
        />
        {/* <p>{this.props.favCount}</p> */}
      </>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    favorites: state.favorites.all,
    favCount: Number(state.products.favCount)
  }
}

const mapDispatch = dispatch => {
  return {
    getFavCount: productId => dispatch(getFavCount(productId)),
    updateFavorite: (productId, info) =>
      dispatch(updateFavorite(productId, info)),
    getFavorites: userId => dispatch(getFavorites(userId))
  }
}

export default connect(mapState, mapDispatch)(FavoriteBtn)
