import React from 'react'

function Error({err}) {
    let formattedMessage = {}
    if (err.status === 'N/A') {
        formattedMessage = {
          title: 'Network Error',
          message: 'Check your internet connection or try again later.',
        }
      } else if (err.status === 403) {
        formattedMessage = {
          title: 'Access Denied',
          message: 'Sorry we ran out of ',
        }
      } else if (err.status === 429) {
        formattedMessage = {
          title: 'Too Many Requests',
          message: 'You’ve hit the request limit. Please wait a moment.',
        }
      } else if (err.status === 400) {
        formattedMessage = {
            title: 'Invalid Input',
            message: 'Please enter a valid IP address or domain name.',
        }
      }
      else {
        formattedMessage = {
          title: 'Something went wrong',
          message: err.message || 'Unknown error occurred.',
        }
      }

  return (
    <div className='error'>
        <h2>{formattedMessage.title}</h2>
        <p>{formattedMessage.message}</p>
    </div>
  )
}

export default Error