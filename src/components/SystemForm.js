import React from 'react';

export default class SystemForm extends React.Component {

  render() {
    return (
      <div>
        <form className="sys-form">
        <label>
          System Capacity
          <div>
          <input id="systemCapacity" value={this.props.systemCapacity} type="number"  onChange={this.props.handleChange} />
          kW
          </div>
        </label>
        <label>
          Solar Panel Type
          <div>
          <input id="moduleType" value={this.props.moduleType} type="number"onChange={this.props.handleChange} />
          </div>
        </label>
        <label>
          System Loss
          <div>
          <input id="loss" value={this.props.loss} type="number" onChange={this.props.handleChange} />
          %
          </div>
        </label>
        <label>
          Tilt
          <div>
          <input id="tilt" value={this.props.tilt} type="number"onChange={this.props.handleChange} />
          °
          </div>
        </label>
        <label>
          Azimuth
          <div>
          <input id="azimuth" value={this.props.azimuth} type="number" onChange={this.props.handleChange} />
          °
          </div>
        </label>
        <label>
          Address
          <div>
          <textArea rows="4" id="address" value={this.props.address} type="text"onChange={this.props.handleChange}></textArea>
          </div>
        </label>
        <label>
          Efficiency of Inverter
          <div>
          <input id="inv_eff" value={this.props.inv_eff} type="number"onChange={this.props.handleChange} />
          %
          </div>
        </label>

        </form>
      </div>
    )
  }
}
