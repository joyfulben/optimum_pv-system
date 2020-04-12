import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Appliances from './components/Appliances'
import SystemForm from './components/SystemForm'
import NewUser from './components/NewUser'
import LogIn from './components/LogIn'
import MyOutputs from './components/MyOutputs'

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
    let response = await fetch(`http://localhost:3000/users/${this.state.userId}`, {
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
        <div className="user-forms">
        {
          this.state.showNew ?
            <NewUser
            showNew={this.state.showNew}
            funcShowNew={this.showNew}
            />
          : <button className="new-btn btn btn-outline-warning" onClick={this.showNew}>Sign Up</button>
        }

        { this.state.username ?
          <>
          <p>Welcome {this.state.username}</p>
          <Link to='/my_output'><button onClick={this.getUserInfo}>{this.state.username}</button></Link>
          </>
          :
          <div>
          <a href="/login"><button>Log In</button></a>
          <Route exact path="/login" component=
            {() => (<LogIn
              updateToken={this.updateToken}
              welcomeUser={this.welcomeUser}
              updateUserId={this.updateUserId}
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

          { this.state.userInfo[0] ?
            <>
              <Route exact path='/my_output' component= {() => (<MyOutputs userInfo={this.state.userInfo[0]} username={this.state.username}
              handleUpdate={this.handleUpdate}
              />)}
              />
            </>
          : null
          }
            <Route exact path='/system_output' component= {() => (<SystemForm userId={this.state.userId}/>)} />
            <Route exact path='/e_use_calc' component= {Appliances} />
          </div>
          </div>
        </Router>

    )
  }

}
