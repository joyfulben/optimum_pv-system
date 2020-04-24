import React, { useState } from 'react'
import { useHistory } from  'react-router-dom'
import Axios from 'axios'


function LogIn(props) {

  const history = useHistory()
  const [username, setUsername]= useState('')
  const [password, setPassword]= useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    authorization(username, password)
  }
  const authorization = async (username, password) => {
    console.log(username, password)
    let response = await Axios.post(`${props.baseURL}/users/login`, {username, password})
    console.log(response)
    if (response.data.token) {
      props.updateToken(response.data.token)
      props.welcomeUser(response.data.user.username)
      props.updateUserId(response.data.user.id)
      props.getUserInfo()
      history.push('/my_output')
    }
    return
  }
  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePWChange = (event) => {
    setPassword(event.target.value)
  }

    return (
      <div className="login">
        <h3>Log In Here</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username
            <div>
            <input onChange={handleNameChange} id="username" type="text"  />
            </div>
          </label>
          <label>
            Password
            <div>
            <input onChange={handlePWChange} id="password"  type="password" />
            </div>
          </label>
          <button className="btn btn-success" type="submit">Log In</button>
        </form>
      </div>
    )
}
export default LogIn;
