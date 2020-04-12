import React from 'react'
import Axios from 'axios'


export default class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.authorization(this.state)
  }
  authorization = async (userInfo) => {
    let response = await Axios.post('http://localhost:3000/users/login', userInfo)
    console.log(response)
    if (response.data.token) {
      this.props.updateToken(response.data.token)
      this.props.welcomeUser(response.data.user.username)
      this.props.updateUserId(response.data.user.id)
    }
  }



  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <div>
            <input onChange={this.handleChange} id="username" type="text"  />
            </div>
          </label>
          <label>
            Password
            <div>
            <input onChange={this.handleChange} id="password"  type="password" />
            </div>
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
}
