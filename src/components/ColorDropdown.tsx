import React from "react";

import { ColourOption, colourOptions } from "./ColorOptions";
import Select, { createFilter } from "react-select";
import colourStyles from "./ColorStyles";
import chroma from "chroma-js";

interface props {
  options?: colourOptions<ColourOption>;
  styles?: any; // Adjust the type according to your ColorStyles
  id?: string;
  menuPortalTarget?: HTMLElement | null;
  isClearable?: boolean;
  onChange: Function;
  value?: string;
  isDisabled?: boolean;
  menuShouldScrollIntoView?: boolean;
  placeholder?: any;
  rangeValues?: [];
  required?: any;
  target?: any;
  input: {
    onChange: (value: string) => void;
    value: string;
    name: string;
    color: string;
  };
  defaultValue?: any;
  errortext?: any;
  meta: {
    touched: boolean;
  };
}

const colorDropDown: React.FC<props> = ({
  options = [],
  styles = colourStyles,
  id = "",
  menuPortalTarget = document.querySelector("body"),
  isClearable = true,
  isDisabled = false,
  menuShouldScrollIntoView = true,
  //   placeholder = "...select",
  meta = {
    touched: false,
  },
  required = true,
  ...props
}) => {
  const { meta: { touched } = { touched: false } } = props;

  let filteredOptions: colourOptions[] = [];
  if (props.rangeValues && props.rangeValues.length) {
    let colorOptions: colourOptions[] = [];
    props.rangeValues.forEach((color: string) => {
      if (chroma.valid(color)) {
        colorOptions.push({
          label: color,
          value: color,
          color: color,
        });
      }
    });
    filteredOptions = colorOptions;
  } else {
    filteredOptions = [...colourOptions];
  }

  let uniqueOptions = new Set<string>();
  let uniqueFilteredOptions: ColourOption[] = [];
  // Filter out duplicate color values and ensure uniqueness
  filteredOptions.forEach((option) => {
    if (!uniqueOptions.has(option.value)) {
      uniqueOptions.add(option.value);
      uniqueFilteredOptions.push(option);
    }
  });
  return (
    <div
      style={
        props.required && !props.input.value
          ? {
              borderRadius: 5,
              border: "1px solid red",
              marginTop: "0px",
              marginRight: "0px",
            }
          : { border: "", marginTop: "0px", marginRight: "0px" }
      }
    >
      <Select
        defaultValue={uniqueFilteredOptions ? "Select.." : colourOptions[0]}
        options={uniqueFilteredOptions}
        styles={colourStyles}
        style={{ minWidth: "150" }}
        menuPortalTarget={
          props.target ? props.target : document.querySelector("body")
        }
        value={props.value}
        onChange={props.onChange}
        filterOption={createFilter({ ignoreAccents: false })}
        isClearable={true}
        isDisabled={props.disabled}
        menuShouldScrollIntoView={true}
      />
      {touched && props.required
        ? props.input.value == "" && (
            <div
              style={{
                color: "red",
                fontSize: "14px",
                padding: "5px",
              }}
            >
              {"*" + props.errortext}
            </div>
          )
        : null}
    </div>
  );
};

export default colorDropDown;
