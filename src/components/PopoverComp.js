import React from 'react'
import Popover, { ArrowContainer } from 'react-tiny-popover'

export default class PopoverComp extends React.Component {
  constructor() {
    super()
    this.state = {
      isPopoverOpen: false
    }
  }

  render() {
    return (
      <Popover
        isOpen={this.state.isPopoverOpen}
        position={'left'}
        content={(
          <div className="sys-info">{this.props.tooltip}</div>
        )}
        >
      <span onClick={() => this.setState ({ isPopoverOpen: !this.state.isPopoverOpen})}>?</span>
      </Popover>
    )
  }
}
