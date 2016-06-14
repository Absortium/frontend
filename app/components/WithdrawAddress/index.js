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
        marginLeft: "4em",
        marginRight: "3em"
    },
    textField: {
        width: "15em"
    },
    icon: {
        verticalAlign: "top",
        marginTop: "2em"
    },
    errorStyle: {
        color: "#E87272"
    }
};

class WithdrawAddress extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);
        let amount = this.props.amount;

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
                    value={amount}/>
                <WalletIcon style={styles.icon}/>
            </div>
        );
    }
}

export default WithdrawAddress;
