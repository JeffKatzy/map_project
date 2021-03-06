import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { createUser } from '../actions/actions'
import { browserHistory } from 'react-router'

function NewUser(props) {
  function handleSubmit(event) {
    event.preventDefault()

    const username = event.target.children.username.value
    const password = event.target.children.password.value

    props.createUser(username, password)
    browserHistory.push('/')
  }

  return (
    <div className="NewUser">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit.bind(this)}>
        <label htmlFor="username">Username: </label>
        <input id="username" type="text"/>
        <label htmlFor="password">Password: </label>
        <input id="password" type="password"/>
        <br/>
        <input type="submit" value="Create User"/>
      </form>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(NewUser);
