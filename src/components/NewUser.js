import React from 'react';
import Axios from 'axios';

export default class NewUser extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.handleNewUser(this.state)
  }
  handleNewUser = async (newUser) => {
    let response = await Axios.post('http://localhost:3000/users', newUser)
    this.props.funcShowNew()
    console.log(response)

  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit }>
        <label>
          Username
          <div>
          <input onChange={this.handleChange} id="username" type="text"  />
          </div>
        </label>
        <label>
          Password
          <div>
          <input onChange={this.handleChange} id="password"  type="password"  />
          </div>
        </label>
        <button type="submit">Add me</button>
        </form>
      </div>
    )
  }
}
