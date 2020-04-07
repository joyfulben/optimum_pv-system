import React from 'react';

export default class Appliances extends React.Component {
constructor() {
  super()
  this.state = {
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    a5: 0,
    a6: 0,
    a7: 0,
    a8: 0,
    a9: 0,
    a10: 0,
    total: 0
  }
}
handleChange = (event) => {
  if (event.target.value === false) {
    this.setState({
      [event.target.id]: 0
    })
  } else {
    this.setState({ [event.target.id]: parseInt(event.target.value)})
  }

}
addTotal = (e) => {
  e.preventDefault()
  this.setState({ total:
    this.state.a1 + this.state.a2 + this.state.a3 + this.state.a4 + this.state.a5 + this.state.a6 + this.state.a7 + this.state.a8 + this.state.a9 + this.state.a10 })
  this.setState({
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    a5: 0,
    a6: 0,
    a7: 0,
    a8: 0,
    a9: 0,
    a10: 0
  })
}
  render() {
    return (
      <div>

      <form className="e-consumption-calc" onSubmit={this.addTotal}>
        <span>Energy Consumption Calc</span>
        <label>
          Refrigerator
          <div>
          <input id="a1" value={this.state.a1} type="number"  onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          TV
          <div>
          <input id="a2" value={this.state.a2} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Dishwasher
          <div>
          <input id="a3" value={this.state.a3} type="number" onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Blowdryer
          <div>
          <input id="a4" value={this.state.a4} type="number" onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Washing Machine
          <div>
          <input id="a5" value={this.state.a5} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Dryer
          <div>
          <input id="a6" value={this.state.a6} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Toaster Oven
          <div>
          <input id="a7" value={this.state.a7} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Space Heater
          <div>
          <input id="a8" value={this.state.a8} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Computer
          <div>
          <input id="a9" value={this.state.a9} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
        <label>
          Microwave Oven
          <div>
          <input id="a10" value={this.state.a10} type="number"onChange={this.handleChange} />
          Watts
          </div>
        </label>
          <div className="ecc-total">
          <input className="btn-outline-info btn" id="total-btn" type="button" type="submit" value="Show total" />
          <h4>Total: {parseInt(this.state.total) / 1000} kW</h4>
        </div>
      </form>

      </div>
    )
  }
}
