import React from 'react'
import ColorDropDown from './component/ColorDropdown'
import { IColourOption } from './component/ColorOptions'

function App() {
  return (<div
    style={{
      padding: "10px",
      height: "100px",
      border: "1px solid red",
      overflow: "scroll",
    }}
  >
    <ColorDropDown
      onChange={(e) => { console.log("Selected option, ", e) } }
      options={[
        { color: "#000000", label: "Balck", value: "black" },
        { color: "#FF0000", label: "Red", value: "red" },
        { color: "#00FF00", label: "Green", value: "green" },
        { color: "#0000FF", label: "Blue", value: "blue" }
      ]} input={{
        onChange: function (value: string): void {
          throw new Error('Function not implemented.')
        },
        value: "red",
        name: '',
        color: ''
      }} meta={{
        touched: false
      }} />
  </div>)
}

export default App
