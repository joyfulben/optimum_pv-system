import React, { useState } from 'react';
import { useHistory } from  'react-router-dom'
import Axios from 'axios';

export default function EnergyOutputs(props) {

  const acOutputs = []
  const [months, setMonths] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  const [showRedirect, setShowRedirect] = useState(false)

  const history = useHistory()

  const collectOutputs = (i) => {
    let output = {location: props.address, sys_cap: props.systemCapacity, ac_output: props.output.ac_monthly[i].toFixed(2), dc_output: props.output.dc_monthly[i].toFixed(2), month: months[i], user_id: props.userId}
    return saveOutputs(output)
  }

  const saveOutputs = async (output) => {
    let response = await Axios.post(`${props.baseURL}/site_outputs`, output);
    props.getUserInfo()
    setShowRedirect(true)
  }
  const saveMonth = (month, i) => {
    console.log(`This month is: ${months[i]}, it will output: ${month}`)
  }
    props.output.ac_monthly.map((month) => {
    acOutputs.push(month.toFixed(2))
  })
    return (
      <div className="output-tables">
        <table cellPadding="5">
          <thead>
            <tr>
              <th colSpan="1">Month</th>
              <th colSpan="1">DC Output (kWh)</th>
              <th colSpan="1">AC Output (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {props.output.dc_monthly.map((month, i) => {
              return (
                <>
                  <tr>
                    <td>
                      <h6 key={i}>{months[i]}</h6>
                    </td>
                    <td>
                      <h6>{month.toFixed(2)}</h6>
                    </td>
                    <td>
                      <h6>{acOutputs[i]}</h6>
                    </td>
                    <button className="btn btn-outline-dark save-output-btn" onClick={() => collectOutputs(i)}>Save Month</button>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>

      {showRedirect ?
        history.push('/my_output')
        :
        null
      }
    </div>
  )
}
