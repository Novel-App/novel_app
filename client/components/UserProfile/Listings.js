import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchListings} from '../../store/userInfo'

class AllListings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listingStatus: 'available'
    }
  }
  componentDidMount() {
    const userId = this.props.user.id
    this.props.loadListings(userId, this.state.listingStatus)
  }

  render() {
    //loading screen
    if (this.state.loading === true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    //only display certain buttons if listing page is true
    let listings = this.props.listings || []
    //if there are no products sold
    if (listings.length === 0) {
      return <div>You don't have any listings</div>
    }
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            {listings.map(listing => (
              <div key={listing.id}>
                <Link to={`/products/${listing.id}`}>
                  <img
                    className="card-img-top"
                    alt={listing.title}
                    src={listing.image}
                  />
                  <h1 className="card-title">{listing.title}</h1>
                </Link>
                <h2 className="card-subtitle mb-2 text-muted">
                  by {listing.author}
                </h2>
                <h3>{listing.createdAt}</h3>
                <h3>${listing.price}</h3>
                <h3>♡: {listing.numFavorites}</h3>
                <h3>UpdateListingButton</h3>
                <h3>Update to sold/reservedButton</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    listings: state.userInfo.listings
  }
}

const mapDispatch = dispatch => {
  return {
    loadListings: (userId, availability) =>
      dispatch(fetchListings(userId, availability))
  }
}

export default connect(mapState, mapDispatch)(AllListings)
