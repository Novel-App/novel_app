import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AllChats = () => {
  return (
    <div>
      <h3>Welcome, All chats</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(AllChats)
