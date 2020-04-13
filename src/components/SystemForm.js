
import React from 'react';
import EnergyOutputs from './EnergyOutputs'
import Popover, { ArrowContainer } from 'react-tiny-popover'

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
      isPopoverOpen: false
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

        <div>
          <form onSubmit={this.systemOutput} className="sys-form">
          <label>
            System Capacity

            <div>
            <Popover
              isOpen={this.state.isPopoverOpen}
              position={'left'}
              content={(
                <div>This is the capacity of your system</div>
              )}
              >
            <span onClick={() => this.setState ({ isPopoverOpen: !this.state.isPopoverOpen})}>?</span>
            </Popover>
            <input onChange={this.handleChange} id="systemCapacity" value={this.state.systemCapacity} type="number"  />
            kW
            </div>
          </label>
          <label>
            Solar Panel Type
            <div>
            <input id="moduleType" value={this.state.moduleType} type="number"onChange={this.handleChange} />
            </div>
          </label>
          <label>
            System Loss
            <div>
            <input id="loss" value={this.state.loss} type="number" onChange={this.handleChange} />
            %
            </div>
          </label>
          <label>
            Tilt
            <div>
            <input id="tilt" value={this.state.tilt} type="number" onChange={this.handleChange} />
            °
            </div>
          </label>
          <label>
            Azimuth
            <div>
            <input id="azimuth" value={this.state.azimuth} type="number" onChange={this.handleChange} />
            °
            </div>
          </label>
          <label>
            Address
            <div>
            <textarea id="address" value={this.state.address}  type="text" onChange={this.handleChange} required/>
            </div>
          </label>
          <label>
            Efficiency of Inverter
            <div>
            <input id="inv_eff" value={this.state.inv_eff} type="number" onChange={this.handleChange} />
            %
            </div>
          </label>
          <button className="btn btn-outline-success" type="submit">Monthly Output</button>
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

        />
        : null
        }
        </div>

      </div>
    )
  }
}
