/**
 *
 * ExchangeBoxField
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import {
  getErrorText,
  representation,
  isEmpty
} from "utils/general";
import CryptoIcon from "components/CryptoIcon";
import IconButton from "material-ui/IconButton";
import InputIcon from "material-ui/svg-icons/action/input";

const styles = {
  inputIcon: {
    width: "13px",
    height: "13px",
    fill: "white"
  },
  inputButton: {
    verticalAlign: "top",
    display: "inline",
    marginTop: "37px",
    marginLeft: "20px",
    width: "25px",
    height: "25px",
    padding: "6px",
    backgroundColor: "rgb(0, 188, 212)",
    borderRadius: "100px"
  },
  div: {
    height: "6em",
    marginRight: "3em"
  },
  textField: {
    marginLeft: "1.0em",
    width: "15em"
  },
  icon: {
    verticalAlign: "top",
    marginTop: "2.35em"
  },
  errorStyle: {
    color: "#E87272"
  }
};

class ExchangeBoxField extends React.Component {
  render() {
    return (
      <div style={Object.assign({}, styles.div, this.props.substitute ? {} : {"marginLeft":  "2.5em"}  )}>
        { this.props.substitute != null ?
          <IconButton style={styles.inputButton}
                      iconStyle={styles.inputIcon}
                      tooltip={this.props.tooltip}
                      tooltipPosition="bottom-center"
                      backgroundColor={styles.inputButton.backgroundColor}
                      onClick={this.props.substitute}>
            <InputIcon/>
          </IconButton>
          : null
        }

        <TextField floatingLabelText={this.props.floatingLabelText}
                   floatingLabelFixed={true}
                   errorText={getErrorText(this.props.error)}
                   style={styles.textField}
                   errorStyle={styles.errorStyle}
                   type="number"
                   min={0}
                   step={0.01}
                   value={!isEmpty(this.props.value) ? this.props.value : ""}
                   onChange={this.props.handler}/>

        <CryptoIcon style={styles.icon}
                    icon={this.props.currency}/>
        <br />
      </div>
    );
  }
}

export default ExchangeBoxField;
