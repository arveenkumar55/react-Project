import React from 'react';
class Progressbar extends React.Component {
  render () {
    return (
      <div className='Progressbar-background'>
        <div className='progress'>
          <div
            className='progress-bar'
            role='progressbar'
            aria-valuenow='70'
            aria-valuemin='0'
            aria-valuemax='100'
            style={{ width: `${this.props.percentage}%`, backgroundColor: this.props.data > this.props.limit ? 'red' : 'blue', textAlign: 'center', maxWidth: '100%' }}>
            <span className='sr-only'>{this.props.percentage}%</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Progressbar