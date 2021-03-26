import React from 'react'
import moment from 'moment'
import {Comment, Tooltip, Avatar} from 'antd'

export default function Message(props) {
  const message = props.message

  return (
    //   // <li className>
    //   //   <div className>
    //   //     <a href="#">
    //   //       <img src={message.sender.image} alt="image" />
    //   //     </a>
    //   //   </div>
    //   //   <div>
    //   //     <h4>{message.sender.name}</h4>
    //   //     {message.content}
    //   //   </div>
    //   // </li>

    <div style={{width: '100%'}}>
      <Comment
        author //props.sender.name
        avatar //props.sender.image
        content={message.content} //props.message (meesage or video or uploaded pictures)
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  )
}
