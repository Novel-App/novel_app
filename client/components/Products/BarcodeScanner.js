import React, {Component} from 'react'
import Scanner from './Scanner'
import CreateProduct from './CreateProduct'

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
    console.log('hadling click...', this.state.onScan)
    this.setState(prevState => ({
      onScan: !prevState.onScan
    }))
  }

  render() {
    return (
      <div>
        <h2>Barcode Scanner</h2>

        <button type="button" onClick={this.handleClick}>
          SCAN
        </button>

        <input
          style={{fontSize: 20, width: 190, height: 35, margin: 8}}
          value={
            this.state.results[0]
              ? this.state.results[0].codeResult.code
              : 'Scan Barcode'
          }
        />
        <div>
          {this.state.onScan ? (
            <Scanner onDetected={this._onDetected} />
          ) : (
            <></>
          )}
        </div>

        <button type="button">Submit</button>
      </div>
    )
  }
}

export default BarcodeScanner
