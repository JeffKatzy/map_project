import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

function NavBar(props) {
  return (
    <div className="NavBar row">
      <h2>MAPP</h2>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </ul>
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(NavBar)
