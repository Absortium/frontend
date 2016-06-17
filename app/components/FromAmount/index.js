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
        let amount = this.props.amount != null ? this.props.amount : "";

        return (
            <div style={styles.div}>
                <IconButton
                    style={styles.inputButton}
                    iconStyle={styles.inputIcon}
                    tooltip="substitute balance"
                    tooltipPosition="bottom-center"
                    backgroundColor={styles.inputButton.backgroundColor}
                    onClick={this.props.substituteFromAmount}>
                    <InputIcon/>
                </IconButton>
                <TextField
                    floatingLabelText={"Give (" + this.props.currency.toUpperCase() + ")"}
                    floatingLabelFixed={true}
                    style={styles.textField}
                    type="number"
                    min={0}
                    step={0.1}
                    onChange={this.props.handler}
                    errorText={errorText}
                    errorStyle={styles.errorStyle}
                    value={amount}
                />
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>
                <br />
            </div>
        );
    }
}

export default FromAmount;
