import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Loading} from '../Loading'
import {fetchUserProducts} from '../../store/userInfo'

class Profile extends Component {
  render() {
    const {firstName, lastName, email, profileImage} = this.props.user

    return (
      <div className="main-content">
        <div id="profile-container" className="container rounded mt-4 mb-10">
          <div className="d-flex justify-content-between align-items-center mb-3" />
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <h2 className="font-weight-bold profileText ">
                  Hi {firstName}!
                </h2>
                <img
                  className="rounded-circle mt-5"
                  src={profileImage}
                  width="90"
                />
                <br />
                <div>
                  <Link to="/profile/editImage">
                    <button
                      type="button"
                      className="btn btn-outline edit-profile"
                    >
                      Edit Profile Picture
                    </button>
                  </Link>
                </div>
                <br />
                <div>
                  <Link to="/profile/edit">
                    <button
                      type="button"
                      className="btn btn-outline edit-profile"
                    >
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h4 className="font-weight-bold d-none d-lg-inline-block">
                Profile
              </h4>
              <ul className="list-group">
                <li className="list-group-item profileText">
                  First Name: {firstName}
                </li>
                <li className="list-group-item profileText">
                  Last Name: {lastName}
                </li>
                <li className="list-group-item profileText">Email: {email}</li>
              </ul>
              <br />
              <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center">
                  <div className=" iconsize mr-3">
                    <Link to="/favorites">
                      <button
                        type="button"
                        className="btn btn-outline edit-profile btn-xl text-wrap"
                      >
                        <i className="bi bi-suit-heart-fill" /> Favorites
                      </button>
                    </Link>
                  </div>
                  <div className=" iconsize mr-3">
                    <Link to="/listings">
                      <button
                        type="button"
                        className="btn btn-outline edit-profile btn-xl text-wrap"
                      >
                        <i className="bi bi-receipt" /> Listings
                      </button>
                    </Link>
                  </div>
                  <div className=" iconsize">
                    <Link to="/purchases">
                      <button
                        type="button"
                        className="btn btn-outline edit-profile btn-xl text-wrap"
                      >
                        <i className="bi bi-bag-fill" /> Purchases
                      </button>
                    </Link>
                  </div>
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
    user: state.user
    // products: state.products.all,
    // favorites: state.userInfo.favorites,
    // purchases: state.userInfo.purchases
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     loadUserProducts: (userId, type) =>
//       dispatch(fetchUserProducts(userId, type))
//   }
// }

export default connect(mapStateToProps, null)(Profile)
