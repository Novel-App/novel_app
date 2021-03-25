import React from 'react'

const ErrorFormMessage = props => {
  const {error} = props

  let errorMessage
  if (error.data.includes('Validation')) {
    errorMessage = error.data
      .split('Validation error: Validation ')
      .slice(1)
      .map(err => {
        const words = err.split(' ')
        if (err.includes('notEmpty')) {
          return `*${words[2]} is required`
        }
        if (err.includes('isEmail')) {
          return '*Please input valid email address'
        }
      })
  } else {
    errorMessage = error.data
  }

  return (
    <div className="error">
      {typeof errorMessage === 'string' ? (
        <p>*{errorMessage}</p>
      ) : (
        errorMessage.map((message, idx) => <p key={idx}>*{message}</p>)
      )}
    </div>
  )
}

export default ErrorFormMessage
