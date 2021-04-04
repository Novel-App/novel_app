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
    const {firstName, lastName, email, profileImage} = this.props.user
    console.log('PROFILE IMAGE', profileImage)
    return (
      <div className="main-content">
        {/* <a
          className="h3 mb-0 text-uppercase font-weight-bold d-none d-lg-inline-block"
          target="_blank"
        >
          User profile
        </a> */}
        {/* <span /> */}
        <div id="profile-container" className="container rounded mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3" />
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <h2 className="font-weight-bold">Hi {firstName}!</h2>
                <img
                  className="rounded-circle mt-5"
                  src={profileImage}
                  width="90"
                />
                <br />
                <div>
                  <Link to="/profile/editImage">
                    <button type="button" className="btn btn-outline-primary">
                      Edit Profile Picture
                    </button>
                  </Link>
                </div>
                <br />
                <div>
                  <Link to="/profile/edit">
                    <button type="button" className="btn btn-outline-primary">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-8 ">
              <h4 className="font-weight-bold d-none d-lg-inline-block">
                Profile
              </h4>
              <ul className="list-group">
                <li className="list-group-item">First Name: {firstName}</li>
                <li className="list-group-item">Last Name: {lastName}</li>
                <li className="list-group-item">Email: {email}</li>
              </ul>
              <br />
              <div className="d-flex">
                <div className="text-center container">
                  <span className="col-1 buttons iconsize">
                    <Link to="/favorites">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-circle btn-xl text-wrap"
                      >
                        <i className="bi bi-suit-heart-fill" /> Favorites
                      </button>
                    </Link>
                  </span>
                  <span className="col-1 buttons iconsize">
                    <Link to="/listings">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-circle btn-xl text-wrap"
                      >
                        <i className="bi bi-receipt" /> Listings
                      </button>
                    </Link>
                  </span>
                  <span className="col-1 buttons iconsize">
                    <Link to="/purchases">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-circle btn-xl text-wrap"
                      >
                        <i className="bi bi-bag-fill" />Purchases
                      </button>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
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
