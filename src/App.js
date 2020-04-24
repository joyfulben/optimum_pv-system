import React, { useState } from 'react'
import { useHistory } from  'react-router-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Appliances from './components/Appliances'
import SystemForm from './components/SystemForm'
import NewUser from './components/NewUser'
import LogIn from './components/LogIn'
import MyOutputs from './components/MyOutputs'
import Home from './components/Home'
let baseURL= ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://pv-system-backend.herokuapp.com'
}

function App() {

  const [showNew, setShowNew]= useState(false);
  const [showLogIn, setShowLogin]= useState(false);
  const [token, setToken]= useState('');
  const [username, setUsername]= useState('');
  const [userId, setUserId]= useState(0);
  const [userInfo, setUserInfo]= useState([]);

  const showNewFunc = () => {
    setShowNew(!showNew)
    return
  }
  const updateToken = (token) => {
    setToken(token)
    return
  }
  const updateUserId = (id) => {
    setUserId(id)
    return
  }
  const welcomeUser = (username) => {
    setUsername(username)
    return
  }
  const getUserInfo = async () => {
    let response = await fetch(`${baseURL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    })
    const userStats = await response.json()
    setUserInfo([ userStats.site_outputs, ...userInfo ])
  }
  const handleUpdate = (id) => {
    const userInfo = this.state.userInfo[0].filter(output => output.id !== id)
    this.state.userInfo.pop()
    this.setState({
        userInfo: [userInfo, ...this.state.userInfo]
    })
  }
  
    return (
      <Router>
      <h2>Solar System <img src="favicon.ico" alt="sun animation"/>ptimizer</h2>
{
 //  _   _                _             _   _
 // | | | | ___  __ _  __| | ___ _ __  | \ | | __ ___   __
 // | |_| |/ _ \/ _` |/ _` |/ _ \ '__| |  \| |/ _` \ \ / /
 // |  _  |  __/ (_| | (_| |  __/ |    | |\  | (_| |\ V /
 // |_| |_|\___|\__,_|\__,_|\___|_|    |_| \_|\__,_| \_/
}
        <div className="login-signup">
        {
          username ?
          <div className="welcome">
          <p className="alert alert-success">Welcome {username}</p>
          <Link to='/my_output'><button className="btn btn-info" onClick={getUserInfo}>My Outputs</button></Link>
          </div>
          :
          <div className="user-forms">
            <a href="/login"><button className="btn btn-info log-in-btn">Log In</button></a>
            <a href="/sign_up"><button className="btn btn-warning sign-up-btn" onClick={showNewFunc}><span>Sign Up</span></button></a>
          </div>
        }
        <div className="sun-logo"></div>
        </div>

 {//      _     _      _
 //  ___(_) __| | ___| |__   __ _ _ __   _ __   __ ___   __
 // / __| |/ _` |/ _ \ '_ \ / _` | '__| | '_ \ / _` \ \ / /
 // \__ \ | (_| |  __/ |_) | (_| | |    | | | | (_| |\ V /
 // |___/_|\__,_|\___|_.__/ \__,_|_|    |_| |_|\__,_| \_/
}

        <div className="d-flex">
        <header>
              <Link to='/'><div className="link">Home</div></Link>
              <Link to='/system_output'><div className="link2">System Yield</div></Link>
              <Link to='/e_use_calc'><div className="link">Energy Use Calc</div></Link>
        </header>
{
 // __     ___
 // \ \   / (_) _____      _____
 //  \ \ / /| |/ _ \ \ /\ / / __|
 //   \ V / | |  __/\ V  V /\__ \
 //    \_/  |_|\___| \_/\_/ |___/
}
          <div className='components'>
          <Route exact path='/sign_up' component={() => (
            <NewUser
            showNew={showNew}
            funcShowNew={showNewFunc}
            baseURL={baseURL}
            />
          )} />
          <Route exact path='/login' component={() => (
            <LogIn
              baseURL={baseURL}
              updateToken={updateToken}
              updateUserId={updateUserId}
              welcomeUser={welcomeUser}
              getUserInfo={getUserInfo}
            />
          )} />
          <Route exact path='/' component={Home} />
          { userInfo[0] ?
            <>
              <Route exact path='/my_output' component= {() => (
                <MyOutputs
                userInfo={userInfo[0]}
                username={username}
                handleUpdate={handleUpdate}
                baseURL={baseURL}
                /> )}
              />
            </>
          : null
          }
            <Route exact path='/system_output' component= {() => (<SystemForm
              userId={userId}
              token={token}
              baseURL={baseURL}
              getUserInfo={getUserInfo}
            />)} />
            <Route exact path='/e_use_calc' component= {Appliances} />
          </div>
        </div>
      </Router>

    )
}

export default App;
