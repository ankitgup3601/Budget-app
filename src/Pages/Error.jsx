import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  const navigate = useNavigate();
  return (
    <div className='error'>
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <p>{error.stack}</p>
      <div className='flex-md'>
        <button className='btn btn--dark' onClick={()=> navigate(-1)}>
          <span>Go back</span>
          <ArrowUturnLeftIcon width={20}/>
        </button>
        <Link to="/" className='btn btn--dark'>
          <span>GO home</span>
          <HomeIcon width={20}/>
        </Link>
      </div>
    </div>
  )
}

export default Error