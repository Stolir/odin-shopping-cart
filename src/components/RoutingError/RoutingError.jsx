import React from 'react'
import { useRouteError } from 'react-router'

function RoutingError() {

  const error = useRouteError();

  return (
    <div>
      <h3>An error has occured.</h3>
      <p>{error.message} || {error.status}</p>
    </div>
  )
}

export default RoutingError