import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchListings} from '../../store/userInfo'

class AllListings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listingStatus: 'available',
      listingUpdated: false
    }
    this.updateStatus = this.updateStatus.bind(this)
  }
  componentDidMount() {
    const userId = this.props.user.id
    this.props.loadListings(userId, this.state.listingStatus)
    this.setState({loading: false})
  }
  componentDidUpdate() {
    if (this.state.listingUpdated) {
      const userId = this.props.user.id
      this.props.loadListings(userId, this.state.listingStatus)
      this.setState({listingUpdated: false})
    }
  }
  updateStatus(status) {
    if (status !== this.state.listingStatus) {
      this.setState({listingStatus: status})
      this.setState({listingUpdated: true})
    }
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
    return (
      <div className="row">
        <div className="col-sm-6">
          <div>
            <a
              href="#"
              onClick={() => {
                this.updateStatus('available')
              }}
            >
              Current Listings
            </a>
          </div>
          <div>
            <a
              href="#"
              onClick={() => {
                this.updateStatus('reserved')
              }}
            >
              Reserved Listings
            </a>
          </div>
          <div>
            <a
              href="#"
              onClick={() => {
                this.updateStatus('sold')
              }}
            >
              Past Listings
            </a>
          </div>
          {/* render info if there's products if not you do not have listing */}
          {listings.length === 0 ? (
            <div>You don't have any listings</div>
          ) : (
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
          )}
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
