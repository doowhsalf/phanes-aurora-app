import React from "react";
import PropTypes from "prop-types";
import { Clear } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField, IconButton, styled } from '@mui/material';

function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

const ClearIconButton = styled(IconButton)({
  padding: '6px',
  '& svg': {
    fontSize: '16px',
  },
});

const styles = {
  textFontSize: 16,
};

export default class DebouncedTextField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    readonly: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value != null ? this.props.value : "",
    };

    this.passChange = debounce(this.passChange, 30);
  }

  handleChange = (event) => {
    const text = event.target.value;
    this.setState({ value: text });
    this.passChange();
  };

  passChange() {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.state.value);
    }
  }

  handleClear = (event) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(" ");
    }
    this.setState({ value: "" });

    console.log("handleClear");
    console.log(this.state.value);
  };

  render() {
    //take onchange to avoid overwrite by ...other
    const { id, onChange, value, ...other } = this.props;
    return (
      <TextField
        id={id + "-debounced"}
        value={this.state.value}
        onChange={this.handleChange}
        {...other}
        InputProps={{
          endAdornment: this.state.value && (
            <InputAdornment position="end">
              <ClearIconButton onClick={this.handleClear} size="small">
                <Clear />
              </ClearIconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}
