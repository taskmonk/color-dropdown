import React from 'react'
import { ColorDropdown } from './component'
import { IColor } from './component/ColorDropdown'

function App() {
  return (<div style={{ width: 800 }}>
    <ColorDropdown
      onChange={(e: IColor | undefined) => { console.log("Selected option, ", e) }}
      value={{ color: "#FF0000", displayName: "Red", name: "red" }}
      options={[
        { color: "#000000", displayName: "Balck", name: "black" },
        { color: "#FF0000", displayName: "Red", name: "red" },
        { color: "#00FF00", displayName: "Green", name: "green" },
        { color: "#0000FF", displayName: "Blue", name: "blue" }
      ]} />
  </div>)
}

export default App
