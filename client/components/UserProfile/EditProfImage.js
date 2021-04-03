import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {updateUserPicture} from '../../store/user'

class EditProfImage extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //     profileImage: ''
  //   }
  //   // this.handleSubmit = this.handleSubmit.bind(this)
  // }
  // componentDidMount() {
  //   this.setState({
  //     firstName: this.props.user.firstName,
  //     lastName: this.props.user.lastName,
  //     email: this.props.user.email,
  //     password: this.props.user.password,
  //     profileImage: this.props.user.profileImage
  //   })
  // }
  // handleSubmit(evt) {
  //   evt.preventDefault()
  //   this.props.updateUserPicture({...this.state, profileImage: evt.target.file})
  //   this.props.history.push('/profile')
  // }
  // state = {
  //   // Initially, no file is selected
  //   selectedFile: null
  // }
  // // On file select (from the pop up)
  // onFileChange = event => {
  //   // Update the state
  //   console.log('ON FILE CHANGE FILE', event.target.files)
  //   this.setState({selectedFile: event.target.files[0]})
  // }

  // On file upload (click the upload button)
  // onFileUpload () {
  //   this.props.hiistory.push('/profile')
  // }

  // // Update the formData object
  // formData.append(
  //   'myFile',
  //   this.state.selectedFile,
  //   this.state.selectedFile.name
  // )

  // Details of the uploaded file
  // console.log(this.state.selectedFile)

  // Request made to the backend api
  // Send formData object
  // await axios.post(`/api/users/upload/${this.props.user.id}`, formData)
  // console.log(data)
  // }

  // File content to be displayed after
  // file upload is complete
  // fileData = () => {
  //   if (this.state.selectedFile) {
  //     return (
  //       <div>
  //         <h2>File Details:</h2>

  //         <p>File Name: {this.state.selectedFile.name}</p>

  //         <p>File Type: {this.state.selectedFile.type}</p>

  //         <p>
  //           Last Modified:{' '}
  //           {this.state.selectedFile.lastModifiedDate.toDateString()}
  //         </p>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div>
  //         <br />
  //         <h4>Choose before Pressing the Upload button</h4>
  //       </div>
  //     )
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Upload a new profile image!</h1>
        {/* <h3>Your current profile image</h3>
        <img
          className="rounded-circle mt-5"
          src={this.props.user.profileImage}
           width="90"
        /> */}
        <form
          method="post"
          action={`/api/users/${this.props.user.id}/uploadProfile`}
          // onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <input type="file" name="profileImg" required />
          <input
            type="submit"
            // onClick={this.onFileUpload}
          />
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
