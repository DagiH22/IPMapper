import React from 'react'
import '../styles/error.css'

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
          message: 'This app has exceeded its free api usage limit. Please contact the developer.',
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
          message: typeof err?.message === 'string'
            ? err.message
            : 'Unknown error occurred.',
        }
      }

  return (
    <div className='error'>
        <div className='cont'>
            <h2>{formattedMessage.title} - {err.status}</h2>
            <p>{formattedMessage.message}</p>
        </div>
    </div>
  )
}

export default Error