/**
 *
 * FromAmountField
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    convertable,
    getErrorText
} from "utils/general";
import IconButton from "material-ui/IconButton";
import InputIcon from "material-ui/svg-icons/action/input";

const styles = {
    inputIcon: {
        width: "18px",
        height: "18px",
        fill: "white"
    },
    inputButton: {
        verticalAlign: "top",
        display: "inline",
        marginTop: "33px",
        marginLeft: "10px",
        width: "32px",
        height: "32px",
        padding: "7.2px",
        backgroundColor: "rgb(0, 188, 212)",
        borderRadius: "100px"
    },
    div: {
        height: "6em",
        marginRight: "3em"
    },
    textField: {
        marginLeft: "1em",
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

class FromAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);

        return (
            <div style={styles.div}>
                <IconButton
                    style={styles.inputButton}
                    iconStyle={styles.inputIcon}
                    tooltip="substitute amount"
                    tooltipPosition="bottom-center"
                    backgroundColor={styles.inputButton.backgroundColor}
                    onClick={this.props.substituteFromAmount}>
                    <InputIcon/>
                </IconButton>
                <TextField
                    floatingLabelText={"Amount of " + this.props.currency.toUpperCase() + " you will give (sell)"}
                    floatingLabelFixed={true}
                    style={styles.textField}
                    type="number"
                    min={0}
                    step={0.1}
                    onChange={this.props.handler}
                    errorText={errorText}
                    errorStyle={styles.errorStyle}
                    value={this.props.amount}
                />
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>
                <br />
            </div>
        );
    }
}

export default FromAmount;
