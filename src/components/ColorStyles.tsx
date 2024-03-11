import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";
import { ColourOption } from "./ColorOptions";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 14,
    width: 14,
  },
});

const isValidColor = (color: any) => {
  return chroma.valid(color);
};

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    let color: any;
    if (isValidColor(data.color)) {
      color = chroma(data.color);
    } else {
      // Default color in case of invalid input
      color = chroma("black");
    }

    return {
      ...styles,
      backgroundColor: isFocused ? "#ccc" : undefined,
      color: isDisabled ? "#ccc" : "#000",
      fontWeight: isSelected ? "bold" : "normal",
      cursor: isDisabled ? "not-allowed" : "pointer",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          data.color.toLowerCase() === "white"
            ? "grey"
            : !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
      },

      ...dot(data.color),
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  container: (provided) => ({
    ...provided,
    borderTop: "none",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 99,
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: "visible",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    //background: (state.hasValue || state.selectProps.inputValue)  && "none !important",
    top: state.hasValue || state.selectProps.inputValue ? -2 : "10%",
    transition: "top 0.1s, font-size 0.1s",
    fontSize: (state.hasValue || state.selectProps.inputValue) && 11,
    backgroundColor: "white",
    padding: "2px",
    ...dot("#ccc"),
  }),
};

export default colourStyles;
