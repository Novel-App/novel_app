import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SingleChat = () => {
  return (
    <div>
      <h3>Welcome, single chat</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(SingleChat)
