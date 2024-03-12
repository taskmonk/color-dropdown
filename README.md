# TM Color-dropdown
npm install tm-color-dropdown

yarn add tm-color-dropdown

# Usage

import React from "react";
import ColorDropdown from "tm-color-dropdown";

const MyComponent = () => {
  return (
    <ColorDropdown rangeValues={["red", "blue", "green"]} {...otherProps} />
  );
};

export default MyComponent;

# Props
rangeValues: An array of strings representing the color options available in the dropdown.
Other props: You can pass any other props that are accepted by the Select component from react-select.
