//PROPS --> SINGLE PRODUCT

//pass in product req.body object including all necessary fields (including user)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getFavorite} from '../../store/product'

class FavoriteBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.product
    }
    this.toggleFavorite = this.toggleFavorite.bind(this)
  }
  toggleFavorite() {
    this.setState({
      isFavorite: !this.state.isFavorite
    })
    this.props.getFavorite(this.props.product.id, this.props.user.id)
  }
  render() {
    const {toggleFavorite} = this
    return <button />
  }
}

const mapState = state => {
  return {
    user: state.user,
    favorited: state.products.single
  }
}

const mapDispatch = dispatch => {
  return {
    getFavorite: (product, userId) => dispatch(getFavorite(product, userId))
  }
}

export default connect(mapState, mapDispatch)(FavoriteBtn)
