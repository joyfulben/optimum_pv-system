import React from 'react';
import Axios from 'axios';

export default class EnergyOutputs extends React.Component{
  constructor() {
    super()
    this.state = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
  collectOutputs = () => {
    let output = {location: this.props.address, sys_cap:this.props.systemCapacity, ac_output: this.props.output.ac_monthly[0].toFixed(3), dc_output: this.props.output.dc_monthly[0].toFixed(3), month: 'January', user_id: this.props.userId}
    return this.saveOutputs(output)
  }

  saveOutputs = async (output) => {
    let response = await Axios.post('https://pv-system-backend.herokuapp.com/site_outputs', output)
  }

  render() {
    console.log(this.props.output)
    return (
      <div className="output-tables">
      <table>
        <thead>
          <tr>
            <th colSpan="1">Month</th>
            <th colSpan="1">DC Output (kWh)</th>
          </tr>
        </thead>
        {this.props.output.dc_monthly.map((month, i) => {
          return (
            <tbody>
              <tr>
                <td>
                  <h6 key={i}>{this.state.months[i]}</h6>
                </td>
                <td>
                  <h6>{month.toFixed(3)}</h6>
                </td>
              </tr>
            </tbody>
        )
        })}
      </table>
      <table>
        <thead>
          <tr>
            <th colspan="1">AC Output (kWh)</th>
          </tr>
        </thead>
        {this.props.output.ac_monthly.map((month, i) => {
          return (
            <tbody>
              <tr>
                <td>
                  <h6>{month.toFixed(3)}</h6>
                </td>
              </tr>
            </tbody>
        )
        })}
      </table>
      <button onClick={this.collectOutputs}>Save Outputs</button>
      </div>
    )
  }
}
