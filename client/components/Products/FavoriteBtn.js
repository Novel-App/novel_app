//PROPS --> SINGLE PRODUCT

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFavorite, getFavCount} from '../../store/product'

class FavoriteBtn extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   isFavorite: null,
    //   favCount: null
    // }
    this.toggleFavorite = this.toggleFavorite.bind(this)
  }
  async componentDidMount() {
    await this.props.getFavorite(this.props.productId, {
      userId: this.props.user.id
    })
    await this.props.getFavCount(this.props.productId)
    // console.log('THIS PROPS FAVORITES', this.props.favorites)
    // await this.setState({
    //   isFavorite: this.props.favorited.isFavorite,
    //   favCount: Number(this.props.favCount)
    // })
    // console.log('COMP DID MOUNT FAV', this.props.favorited.isFavorite)
    // console.log('COMP DID MOUNT FAV', this.props.favCount)
  }
  //   async componentDidUpdate(prevProps) {
  //     if (
  //       prevProps.favorite &&
  //       prevProps.favorite.isFavorite !== this.props.favorited.isFavorite
  //     ) {
  //       console.log('IN COMP DID UPDATE')
  //       // await this.props.getFavorite(this.props.product, {
  //       //     userId: this.props.user.id,
  //       //     isFavorite: this.state.isFavorite
  //       // })
  //       await this.props.getFavCount(this.props.product.id)
  //     }
  //   }
  async toggleFavorite(favorite) {
    // this.setState({
    //   isFavorite: !this.state.isFavorite
    // console.log('BEFORE TOGGLE FAV COUNT', this.props.favCount)
    // console.log('BEFORE TOGGLE FAVORITE', this.props.favorited.isFavorite)
    await this.props.getFavorite(this.props.productId, {
      userId: this.props.user.id,
      isFavorite: !favorite.isFavorite
    })
    this.props.getFavCount(this.props.productId)
    // console.log('AFTER TOGGLE FAVORITE', this.props.favorited.isFavorite)
    // console.log('AFTER TOGGLE FAV COUNT', this.props.favCount)
  }

  render() {
    const favorites = this.props.favorites || []
    const favorite =
      favorites.length > 0
        ? favorites.filter(fav => fav.productId === this.props.productId)
        : [{isFavorite: '', productId: ''}]
    const favCount = Number(this.props.favCount)
    console.log('FAVORITED', favorite)
    return favorite.length === 0 && favCount !== undefined ? (
      <>
        <i
          className={
            favorite[0].isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'
          }
          onClick={() => this.toggleFavorite(favorite[0])}
        />
        <p>{this.props.favCount}</p>
        <p>this.props.productId {this.props.productId}</p>
        <p>this.props.favorite.productId {favorite[0].productId}</p>
      </>
    ) : (
      ''
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    favorites: state.products.favorites,
    favCount: Number(state.products.favCount)
  }
}

const mapDispatch = dispatch => {
  return {
    getFavorite: (productId, info) => dispatch(getFavorite(productId, info)),
    getFavCount: productId => dispatch(getFavCount(productId))
  }
}

export default connect(mapState, mapDispatch)(FavoriteBtn)
