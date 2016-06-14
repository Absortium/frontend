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

class FromAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);

        console.log(this.props.amount);
        console.log(typeof this.props.amount);
        return (
            <div style={styles.div}>
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
