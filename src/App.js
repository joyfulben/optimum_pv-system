import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Appliances from './components/Appliances'
import SystemForm from './components/SystemForm'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      systemCapacity: 0,
      moduleType: 1,
      loss: 0,
      tilt: 40,
      azimuth: 180,
      address: '',
      inv_eff: 96,
    }
  }

  systemOutput = async (event) => {
    event.preventDefault()
    let response = await fetch(`https://developer.nrel.gov/api/pvwatts/v6.json?api_key=vFMOCayhz9Z9jCBmmK8y6NUCbW3HPF9rSdX00AP6&address=${this.state.address}&system_capacity=${this.state.systemCapacity}&azimuth=${this.state.azimuth}&tilt=${this.state.tilt}&array_type=1&module_type=${this.state.moduleType}&losses=${this.state.loss}`)
    let data = await response.json()
    console.log(data)
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }


  render() {
    return (
      <Router>
        <nav>
          <Route exact path='/system_output' component={() => <SystemForm
          systemCapacity={this.state.systemCapacity}
          moduleType={this.state.moduleType}
          loss={this.state.loss}
          tilt={this.state.tilt}
          azimuth={this.state.azimuth}
          address={this.state.address}
          inv_eff={this.state.inv_eff}
          handleChange={this.handleChange}
          systemOutput={this.systemOutput}
          />} />
          <Route exact path='/e_use_calc' component= {Appliances} />
        </nav>
      </Router>
    )
  }

}
