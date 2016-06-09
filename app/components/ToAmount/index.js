/**
 *
 * ToAmount
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    convertable,
    getErrorText
} from "../../utils/general";


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
        marginTop: "2em"
    }
};

class ToAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);
        let amount = this.props.amount;

        return (
            <div style={styles.div}>
                <TextField
                    floatingLabelText={"Amount of " + this.props.currency.toUpperCase() + " for exchange"}
                    floatingLabelFixed={true}
                    style={styles.textField}
                    type="number"
                    min={0}
                    onChange={this.props.handler}
                    errorText={errorText}
                    value={amount}/>
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>
            </div>
        );
    }
}

export default ToAmount;
