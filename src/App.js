import React from 'react';
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
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      showNew: false,
      showLogIn: false,
      token: '',
      username: '',
      userId: 0,
      userInfo: []
    }
  }
  showNew = () => {
    this.setState({ showNew: !this.state.showNew})
  }
  updateToken = (token) => {
    this.setState({ token: token })
  }
  updateUserId = (id) => {
    this.setState({ userId: id})
  }
  welcomeUser = (username) => {
    this.setState({ username: username})
  }
  getUserInfo = async () => {
    let response = await fetch(`${baseURL}/users/${this.state.userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.state.token}`
      }
    })
    const userStats = await response.json()
    this.setState({ userInfo: [userStats.site_outputs, ...this.state.userInfo ]})
  }
  handleUpdate = (id) => {
    const userInfo = this.state.userInfo[0].filter(output => output.id !== id)
    this.state.userInfo.pop()
    console.log(userInfo)
    this.setState({
        userInfo: [userInfo, ...this.state.userInfo]
    })

    console.log(this.state.userInfo)
  }
  render() {
    return (

      <Router>
        <div className="d-flex justify-content-around user-forms">
        {
          this.state.showNew ?
            <NewUser
            showNew={this.state.showNew}
            funcShowNew={this.showNew}
            baseURL={baseURL}
            />
          : <button className="btn btn-warning" onClick={this.showNew}>Sign Up</button>
        }

        { this.state.username ?
          <>
          <p className="alert alert-success">Welcome {this.state.username}</p>
          <Link to='/my_output'><button className="btn btn-info" onClick={this.getUserInfo}>{this.state.username}'s Outputs</button></Link>
          </>
          :
          <div>
          <a href="/login"><button className="btn btn-info">Log In</button></a>
          <Route exact path="/login" component=
            {() => (<LogIn
              updateToken={this.updateToken}
              welcomeUser={this.welcomeUser}
              updateUserId={this.updateUserId}
              baseURL={baseURL}
            />) }
          />
          </div>
        }
        </div>
        <div className="d-flex">
        <header>
              <Link to='/'><div className="link">Home</div></Link>
              <Link to='/system_output'><div className="link2">System Yield</div></Link>
              <Link to='/e_use_calc'><div className="link">Energy Use Calc</div></Link>
        </header>

          <div className='components'>
          <Route exact path='/' component={Home} />
          { this.state.userInfo[0] ?
            <>
              <Route exact path='/my_output' component= {() => (<MyOutputs userInfo={this.state.userInfo[0]} username={this.state.username}
              handleUpdate={this.handleUpdate}
              baseURL={baseURL}
              />)}
              />
            </>
          : null
          }
            <Route exact path='/system_output' component= {() => (<SystemForm
              userId={this.state.userId}
              token={this.state.token}
              baseURL={baseURL}
              getUserInfo={this.getUserInfo}
            />)} />
            <Route exact path='/e_use_calc' component= {Appliances} />
          </div>
          </div>
        </Router>

    )
  }

}
