import React from 'react'


export default class MyOutputs extends React.Component {

  delete = async (id) => {
    let response = await fetch(`https://pv-system-backend.herokuapp.com/site_outputs/${id}`, {
      method: 'DELETE'
    })
    this.props.handleUpdate(id)
  }

  render() {

    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>System Capacity</th>
            <th>Month</th>
            <th>DC Output (kWh)</th>
            <th colSpan="2">AC Output (kWh)</th>
          </tr>
        </thead>
        {this.props.userInfo.map((site, i) => {
          return (
            <>
            <tbody>
              <tr>
                <td>
                  <h6 key={i}>{site.location}</h6>
                </td>
                <td>
                  <h6>{site.sys_cap}</h6>
                </td>
                <td>
                  <h6>{site.month}</h6>
                </td>
                <td>
                  <h6>{site.dc_output}</h6>
                </td>
                <td >
                  <h6>{site.ac_output}</h6>
                </td>
                <button className="btn btn-outline-danger" onClick={() => this.delete(site.id)}>Delete</button>
              </tr>

            </tbody>

            </>
          )
        })}
      </table>
      </div>
    )
  }
}
