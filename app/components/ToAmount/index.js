/**
 *
 * ToAmount
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    getErrorText,
    representation,
    isEmpty
} from "utils/general";


const styles = {
    div: {
        height: "6em",
        marginLeft: "4em",
        marginRight: "3em"
    },
    textField: {
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

class ToAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);
        let amount = !isEmpty(this.props.amount) ? this.props.amount : "";

        console.log("to_amount", amount, this.props.amount);
        return (
            <div style={styles.div}>
                <TextField floatingLabelText={"Get (" + this.props.currency.toUpperCase() + ")"}
                           floatingLabelFixed={true}
                           style={styles.textField}
                           type="number"
                           min={0}
                           step={0.1}
                           onChange={this.props.handler}
                           errorText={errorText}
                           errorStyle={styles.errorStyle}
                           value={amount}/>
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>
            </div>
        );
    }
}

export default ToAmount;
