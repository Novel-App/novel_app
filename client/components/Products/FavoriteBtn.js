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
    await this.props.getFavorite(this.props.product, {
      userId: this.props.user.id
    })
    await this.props.getFavCount(this.props.product.id)
    // await this.setState({
    //   isFavorite: this.props.favorite.isFavorite,
    //   favCount: Number(this.props.favCount)
    // })
    console.log('COMP DID MOUNT FAV', this.props.favorite.isFavorite)
    console.log('COMP DID MOUNT FAV', this.props.favCount)
  }
  //   async componentDidUpdate(prevProps) {
  //     if (
  //       prevProps.favorite &&
  //       prevProps.favorite.isFavorite !== this.props.favorite.isFavorite
  //     ) {
  //       console.log('IN COMP DID UPDATE')
  //       // await this.props.getFavorite(this.props.product, {
  //       //     userId: this.props.user.id,
  //       //     isFavorite: this.state.isFavorite
  //       // })
  //       await this.props.getFavCount(this.props.product.id)
  //     }
  //   }
  async toggleFavorite() {
    // this.setState({
    //   isFavorite: !this.state.isFavorite
    console.log('BEFORE TOGGLE FAV COUNT', this.props.favCount)
    console.log('BEFORE TOGGLE FAVORITE', this.props.favorite.isFavorite)
    await this.props.getFavorite(this.props.product, {
      userId: this.props.user.id,
      isFavorite: !this.props.isFavorite
    })
    this.props.getFavCount(this.props.product.id)
    console.log('AFTER TOGGLE FAVORITE', this.props.favorite.isFavorite)
    console.log('AFTER TOGGLE FAV COUNT', this.props.favCount)
  }

  render() {
    const favorite = this.props.favorite
    const favCount = Number(this.props.favCount)
    return favorite !== undefined && favCount !== undefined ? (
      <>
        <i
          className={favorite.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
          onClick={this.toggleFavorite}
        />
        <p>{this.props.favCount}</p>
      </>
    ) : (
      ''
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    favorite: state.products.favorite,
    favCount: Number(state.products.favCount)
  }
}

const mapDispatch = dispatch => {
  return {
    getFavorite: (product, info) => dispatch(getFavorite(product, info)),
    getFavCount: productId => dispatch(getFavCount(productId))
  }
}

export default connect(mapState, mapDispatch)(FavoriteBtn)
