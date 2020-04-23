
import React from 'react';
import EnergyOutputs from './EnergyOutputs'
import PopoverComp from './PopoverComp'

const button = document.querySelector('#button');
const tooltip = document.querySelector('.tooltip')


export default class SystemForm extends React.Component {
  constructor() {
    super()
    this.state = {
      showOutputs: false,
      systemCapacity: 0,
      moduleType: 1,
      loss: 0,
      tilt: 40,
      azimuth: 180,
      address: '',
      inv_eff: 96,
      output: [],
      tooltip: {
        sys_cap: 'This is the sum total wattage capacity of the solar panel array',
        panel_type: <div>0 = PolyCrystaline<br/>1 = MonoCrystaline<br/>2 = Thin Film</div>,
        loss: 'This is system loss related to "electrical friction" from wire diameter',
        tilt: 'Angle between 0 and 90 that pivots on the z axis towards the sun',
        azimuth: 'Angle between 0 and 359 that pivots east to west. 180 is geographic south',
        address: 'Example: Boulder Colorado (Must be location in USA)',
        eff_inv: 'Efficiency percentage of DC to AC converter'
      }
    }
  }
  showOutputs = () => {
    this.setState({ showOutputs: !this.state.showOutputs})
  }

  systemOutput = async (event) => {
    event.preventDefault()
    let response = await fetch(`https://developer.nrel.gov/api/pvwatts/v6.json?api_key=vFMOCayhz9Z9jCBmmK8y6NUCbW3HPF9rSdX00AP6&address=${this.state.address}&system_capacity=${this.state.systemCapacity}&azimuth=${this.state.azimuth}&tilt=${this.state.tilt}&array_type=1&module_type=${this.state.moduleType}&losses=${this.state.loss}`)
    let data = await response.json()
    console.log(data)
    this.setState({ output: data.outputs})
    this.showOutputs()
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }

  render() {
    return (

      <div className="sys-cap">

        <div >
          <form onSubmit={this.systemOutput} className="sys-form">
          <label>
            System Capacity

            <div>
            <PopoverComp tooltip={this.state.tooltip.sys_cap}/>
            <input onChange={this.handleChange} id="systemCapacity" value={this.state.systemCapacity} type="number"  />
            kW
            </div>
          </label>

          <div className="form-group d-flex justify-content-center flex-column">
            <label>Solar Panel Type</label>
            <div className="d-flex panel-options">
            <PopoverComp tooltip={this.state.tooltip.panel_type} />
            <select className="form-control d-flex justify-content-between" id="moduleType" value={this.state.moduleType} onChange={this.handleChange}>
              <option>{Number("0")}</option>
              <option>{Number("1")}</option>
              <option>{Number("2")}</option>
            </select>
            </div>
          </div>

          <label>
            System Loss
            <div>
            <PopoverComp tooltip={this.state.tooltip.loss}/>
            <input id="loss" value={this.state.loss} type="number" onChange={this.handleChange} />
            %
            </div>
          </label>
          <label>
            Tilt
            <div>
            <PopoverComp tooltip={this.state.tooltip.tilt}/>
            <input id="tilt" value={this.state.tilt} type="number" onChange={this.handleChange} />
            °
            </div>
          </label>
          <label>
            Azimuth
            <div>
            <PopoverComp tooltip={this.state.tooltip.azimuth}/>
            <input id="azimuth" value={this.state.azimuth} type="number" onChange={this.handleChange} />
            °
            </div>
          </label>
          <label>
            Address
            <div>
            <PopoverComp tooltip={this.state.tooltip.address}/>
            <textarea id="address" value={this.state.address}  type="text" onChange={this.handleChange} required/>
            </div>
          </label>
          <label>
            Efficiency of Inverter
            <div>
            <PopoverComp tooltip={this.state.tooltip.eff_inv}/>
            <input id="inv_eff" value={this.state.inv_eff} type="number" onChange={this.handleChange} />
            %
            </div>
          </label>
          <button className="btn btn-outline-success sys-btn" type="submit">Monthly Output</button>
          </form>
        </div>
        <div>
        {this.state.showOutputs ?
        <EnergyOutputs
        systemCapacity={this.state.systemCapacity}
        moduleType={this.state.moduleType}
        loss={this.state.loss}
        tilt={this.state.tilt}
        azimuth={this.state.azimuth}
        address={this.state.address}
        inv_eff={this.state.inv_eff}
        output={this.state.output}
        userId={this.props.userId}
        baseURL={this.props.baseURL}
        token={this.props.token}
        getUserInfo={this.props.getUserInfo}
        />
        : null
        }
        </div>

      </div>
    )
  }
}
