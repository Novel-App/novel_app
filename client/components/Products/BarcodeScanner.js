import React, {Component} from 'react'
import Scanner from './Scanner'

class BarcodeScanner extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      onScan: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  _onDetected = result => {
    this.setState({results: []})
    this.setState({results: this.state.results.concat([result])})
  }

  handleClick = () => {
    this.setState(prevState => ({
      onScan: !prevState.onScan
    }))
  }

  render() {
    return (
      <div>
        <input
          className="new-post-input"
          placeholder="Scan a barcode"
          value={this.state.results[0] && this.state.results[0].codeResult.code}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline-dark ml-1"
          onClick={this.handleClick}
        >
          Scan
        </button>
        {this.state.onScan && (
          <div>
            <Scanner onDetected={this._onDetected} />
            <button type="button" className="btn btn-outline-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default BarcodeScanner
