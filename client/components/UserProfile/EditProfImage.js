import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserPicture} from '../../store/user'

class EditProfImage extends Component {
  constructor() {
    super()
    this.state = {
      profileImg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleFileChange(evt) {
    console.log('image file', evt.target.files)
    this.setState({profileImg: evt.target.files[0]})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const user = new FormData()
    user.append('profileImg', this.state.profileImg)
    user.append('id', this.props.user.id)
    this.props.updateUserPicture(user)
  }

  render() {
    return (
      <div className="container-fluid d-flex-column justify-content-center">
        <h1>Upload a new profile image!</h1>
        <p>Current profile image</p>
        <img
          className="img-fluid rounded-circle z-depth-2 mb-5"
          src={this.props.user.profileImage}
          width="300em"
        />
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={this.handleFileChange}
            required
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserPicture: user => dispatch(updateUserPicture(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfImage)
