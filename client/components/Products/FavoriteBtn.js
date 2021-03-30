//PROPS --> SINGLE PRODUCT

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFavorite, getFavCount} from '../../store/product'

class FavoriteBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: true,
      favCount: 0
    }
    this.toggleFavorite = this.toggleFavorite.bind(this)
  }
  async componentDidMount() {
    await this.props.getFavorite(this.props.product, {
      userId: this.props.user.id
    })
    await this.props.getFavCount(this.props.product.id)
    await this.setState({
      isFavorite: this.props.favorite.isFavorite,
      favCount: this.props.favCount
    })
  }
  async toggleFavorite() {
    await this.setState({
      isFavorite: !this.state.isFavorite
    })
    await this.props.getFavorite(this.props.product, {
      userId: this.props.user.id,
      isFavorite: this.state.isFavorite
    })
    await this.props.getFavCount(this.props.product.id)
  }
  render() {
    return (
      <>
        <i
          className={this.state.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}
          onClick={this.toggleFavorite}
        />
        <p>{this.state.favCount}</p>
      </>
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
