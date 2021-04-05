import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  LocationVerification,
  Welcome,
  AllProducts,
  AllChats,
  SingleChat,
  SingleProducts,
  EditProfile,
  Profile,
  CreateProduct,
  FavandPurchases,
  EditListing,
  EditProfImage,
  PageNotFound
} from './components'
import {getMe} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {!isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available to users not logged in */}
            <Route exact path="/" component={Welcome} />
            <Route exact path="/home" component={Welcome} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/home" component={AllProducts} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/listings" component={AllProducts} />
            <Route
              exact
              path="/listings/:listingId/edit"
              component={EditListing}
            />
            <Route exact path="/favorites" component={FavandPurchases} />
            <Route exact path="/purchases" component={FavandPurchases} />
            <Route exact path="/products/add" component={CreateProduct} />
            <Route exact path="/products/:id" component={SingleProducts} />
            <Route exact path="/chats" component={AllChats} />
            <Route exact path="/chats/:chatId" component={SingleChat} />
            <Route exact path="/singleChat" component={SingleChat} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route exact path="/profile/editImage" component={EditProfImage} />

            <Route
              exact
              path="/location-verification"
              component={LocationVerification}
            />
            <Route path="/products" component={AllProducts} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        )}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getMe())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
