/**
 *
 * ToAmount
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import WalletIcon from "material-ui/svg-icons/action/account-balance-wallet";
import {
    convertable,
    getErrorText
} from "../../utils/general";


const styles = {
    div: {
        height: "6em",
        width: "25em",
        marginLeft: "3em",
        marginRight: "0em"
    },
    textField: {
        width: "23em"
    },
    input: {
        fontSize: "1em"
    },

    icon: {
        verticalAlign: "top",
        marginTop: "2.35em"
    },
    errorStyle: {
        color: "#E87272"
    }
};

export default class WithdrawalAddress extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);

        return (
            <div style={styles.div}>
                <TextField
                    floatingLabelText={"Address of " + this.props.currency.toUpperCase() + " wallet"}
                    floatingLabelFixed={true}
                    style={styles.textField}
                    type="text"
                    onChange={this.props.handler}
                    errorText={errorText}
                    errorStyle={styles.errorStyle}
                    inputStyle={styles.input}
                    value={this.props.address}/>
                <WalletIcon style={styles.icon}/>
            </div>
        );
    }
}
