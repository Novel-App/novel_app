import React, {Component} from 'react'
import Quagga from 'quagga'

let lastResult = []

const orderByOccurrence = arr => {
  let counts = {}
  arr.forEach(value => {
    if (!counts[value]) {
      counts[value] = 0
    }
    counts[value]++
  })

  return Object.keys(counts).sort(function(curKey, nextKey) {
    return counts[curKey] < counts[nextKey]
  })
}

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 320,
            facingMode: 'environment'
          }
        },
        locator: {
          halfSample: true,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true
            }
          }
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['upc_reader', 'ean_reader', 'upc_e_reader'],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          }
        },
        locate: true
      },
      function(err) {
        if (err) {
          return console.log(err)
        }
        Quagga.start()
      }
    )

    Quagga.onDetected(this._onDetected)
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected)
  }

  _onDetected = result => {
    let lastCode = result.codeResult.code
    lastResult.push(lastCode)
    if (lastResult.length > 50) {
      let code = orderByOccurrence(lastResult)[0]
      lastResult = []
      Quagga.stop()
      this.props.onDetected(code)
    }
  }

  render() {
    return (
      <div id="interactive" className="viewport">
        <canvas className="drawingBuffer" />
      </div>
    )
  }
}

export default Scanner
