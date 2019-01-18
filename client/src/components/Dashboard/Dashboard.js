import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// const TheComponent = React.lazy(() => import("../TheComponent/TheComponent"));

// <React.Suspense fallback={null}>
// <TheComponent />
// </React.Suspense>

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/tickets">Tickets</Link>
      </div>
    )
  }
}

export default Dashboard
