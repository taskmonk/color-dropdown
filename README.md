## TM Color Dropdown

### Installation
    npm i -S tm-color-dropdown

### Code

    import React from 'react'
    import { ColorDropdown } from 'tm-color-dropdown'
    import "tm-color-dropdown/dist/style.css";

    function App() {
  return (<div style={{ width: 800 }}>
      <ColorDropdown
        rangeValues={["#fff", "#ff0000", "#00ff00", "blue", "green"]}
      />
    </div>
  )
}

export default App


![alt text](./example01.png)


### Testing local
#### Run this from package dev env terminal

    npm link

#### Run this from folder when you want to import to

    npm link tm-color-dropdown