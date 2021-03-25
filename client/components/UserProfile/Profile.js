import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMe} from '../../store/user'
import {fetchUserProducts} from '../../store/userInfo'

class Profile extends Component {
  componentDidMount() {
    this.props.getMe()
  }
  render() {
    const {firstName, lastName, email, profileImage, zipCode} = this.props.user
    return (
      <div className="main-content">
        <a
          className="h3 mb-0 text-uppercase d-none d-lg-inline-block"
          target="_blank"
        >
          User profile
        </a>
        <span />
        <div id="profile-container" className="container rounded mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Hi {firstName}!</h4>
          </div>
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  src={profileImage}
                  width="90"
                />
              </div>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">First Name: {firstName}</li>
                <li className="list-group-item">Last Name: {lastName}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Zip Code: {zipCode}</li>
              </ul>
            </div>
          </div>
          <div>
            <Link to="/profile/edit">
              <button type="button" className="btn btn-primary">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div id="fav-container" className="container mt-5">
          <div className="center container">
            <span className="col-1 buttons iconsize">
              <Link to="/favorites">
                <button
                  type="button"
                  className="btn btn-primary btn-circle btn-xl"
                >
                  <i className="bi bi-suit-heart-fill" />Chat Seller Now!
                </button>
              </Link>
            </span>
            <span className="col-1 buttons iconsize">
              <Link to="/listings">
                <button
                  type="button"
                  className="btn btn-primary btn-circle btn-xl"
                >
                  <i className="bi bi-receipt" />
                </button>
              </Link>
            </span>
            <span className="col-1 buttons iconsize">
              <Link to="/purchases">
                <button
                  type="button"
                  className="btn btn-primary btn-circle btn-xl"
                >
                  <i className="bi bi-bag-fill" />
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products.all,
    favorites: state.userInfo.favorites,
    purchases: state.userInfo.purchases
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(getMe()),
    loadUserProducts: (userId, type) =>
      dispatch(fetchUserProducts(userId, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

//button wrapped in a link with the exact path (paths are listed on routes)
