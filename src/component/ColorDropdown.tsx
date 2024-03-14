import React from "react";

import { IColourOption, colourOptions } from "./ColorOptions";
import Select, { createFilter } from "react-select";
import chroma from "chroma-js";
import colourStyles from "./ColorStyles";

interface IColorDropdownProps {
  options?: IColourOption[];
  styles?: any; // Adjust the type according to your ColorStyles
  id?: string;
  menuPortalTarget?: HTMLElement | null;
  isClearable?: boolean;
  onChange: (e: any) => void;
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

const ColorDropDown = ({
  options,
  styles,
  id,
  menuPortalTarget = document.querySelector("body"),
  isClearable,
  isDisabled,
  menuShouldScrollIntoView,
  meta,
  ...props
}: IColorDropdownProps) => {
  const { touched } = meta;

  let filteredOptions: IColourOption[] = [];
  if (props.rangeValues && props.rangeValues.length) {
    let colorOptions: IColourOption[] = [];
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
  let uniqueFilteredOptions: IColourOption[] = [];
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
        props?.required && !props.input.value
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
        menuPortalTarget={
          props.target ? props.target : document.querySelector("body")
        }
        value={props.value}
        onChange={props.onChange}
        filterOption={createFilter({ ignoreAccents: false })}
        isClearable={true}
        isDisabled={isDisabled}
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

export default ColorDropDown;
