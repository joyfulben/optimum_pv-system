import React, { useState } from 'react';
import { useHistory } from  'react-router-dom'
import Axios from 'axios';

export default function EnergyOutputs(props) {

  const [months, setMonths] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  const [showRedirect, setShowRedirect] = useState(false)

  const history = useHistory()

  const collectOutputs = () => {
    let output = {location: props.address, sys_cap: props.systemCapacity, ac_output: props.output.ac_monthly[0].toFixed(2), dc_output: props.output.dc_monthly[0].toFixed(2), month: 'January', user_id: props.userId}
    return saveOutputs(output)
  }

  const saveOutputs = async (output) => {
    let response = await Axios.post(`${props.baseURL}/site_outputs`, output);
    props.getUserInfo()
    setShowRedirect(true)
  }
    return (
      <div className="output-tables">
      <table cellpadding="5">
        <thead>
          <tr>
            <th colSpan="1">Month</th>
            <th colSpan="1">DC Output (kWh)</th>
          </tr>
        </thead>
        {props.output.dc_monthly.map((month, i) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <h6 key={i}>{months[i]}</h6>
                  </td>
                  <td>
                    <h6>{month.toFixed(2)}</h6>
                  </td>
                </tr>
              </tbody>
          )
          })}
        </table>
        <table cellpadding="5">
          <thead>
            <tr>
              <th colspan="1">AC Output (kWh)</th>
            </tr>
          </thead>
          {props.output.ac_monthly.map((month, i) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <h6>{month.toFixed(2)}</h6>
                  </td>
                </tr>
              </tbody>
            )
          })}
      </table>
      <button className="btn btn-outline-dark" onClick={collectOutputs}>Save Outputs</button>
      {showRedirect ?
        history.push('/my_output')
        :
        null
      }
      </div>
    )
}
