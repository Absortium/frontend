/**
 *
 * WithdrawAmount
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    convertable,
    getErrorText
} from "utils/general";

const styles = {
    div: {
        height: "6em",
        width: "14.5em",
        marginLeft: "3em",
        marginRight: "0em"
    },
    textField: {
        width: "12.5em",
    },

    fee: {
        width: "5.4em",
    },

    icon: {
        verticalAlign: "top",
        marginTop: "2.35em"
    },
    errorStyle: {
        color: "#E87272"
    }
};

export default class WithdrawalAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);

        return (
            <div style={styles.div}>
                <TextField floatingLabelText={"Amount of " + this.props.currency.toUpperCase() + " to withdraw"}
                           floatingLabelFixed={true}
                           style={styles.textField}
                           type="number"
                           min={0}
                           step={0.1}
                           onChange={this.props.handler}
                           errorText={errorText}
                           errorStyle={styles.errorStyle}
                           value={this.props.amount}/>
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>
            </div>
        );
    }
}
