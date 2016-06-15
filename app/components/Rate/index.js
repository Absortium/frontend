/**
 *
 * Rate
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import { getErrorText } from "utils/general";
import CryptoIcon from "components/CryptoIcon";
import IconButton from "material-ui/IconButton"
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
class Rate extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);
        let rate = this.props.rate != null ? this.props.rate : undefined;
        
        return (
            <div style={styles.div}>
                <IconButton
                    style={styles.inputButton}
                    iconStyle={styles.inputIcon}
                    tooltip="substitute rate"
                    tooltipPosition="bottom-center"
                    backgroundColor={styles.inputButton.backgroundColor}
                    onClick={this.props.substituteRate}>
                    <InputIcon/>
                </IconButton>
                <TextField
                    floatingLabelText={"Price for 1 " + this.props.from_currency.toUpperCase() + " in " + this.props.to_currency.toUpperCase()}
                    floatingLabelFixed={true}
                    errorText={errorText}
                    style={styles.textField}
                    errorStyle={styles.errorStyle}
                    type="number"
                    min={0}
                    step={0.01}
                    value={rate}
                    onChange={this.props.handler}
                />
                <CryptoIcon style={styles.icon} icon={this.props.to_currency}/>
                <br />
            </div>
        );
    }
}

export default Rate;
