/**
 *
 * UpperExchangeBox
 *
 */

import React from "react";
import WithdrawalIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-downward";
import DepositIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-upward";
import FloatingActionButton from "material-ui/FloatingActionButton";
import DepositDialog from "components/DepositDialog";
import { convertCurrencyName } from "utils/general";
import CryptoIcon from "components/CryptoIcon";

var styles = {
    main: {
        marginLeft: "0.8em",
        marginTop: "0.4em"
    },
    
    icon: {
        backgroundColor: "block",
        marginLeft: "0.5em",
        marginBottom: "0.2em"
    },

    balance: {
        fontSize: "0.95em",
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: "normal",
        marginBottom: "0.75em"
    },

    deposit: {
        backgroundColor: "#9CD689",
        marginRight: "0.6em"
    },
    withdrawal: {
        backgroundColor: "#E87272",
        marginLeft: "0.4em"

    }
};


class Balance extends React.Component {
    state = {
        depositDialogOpen: false,
        withdrawalDialogOpen: false
    };

    handleDepositButton = () => {
        this.setState({ depositDialogOpen: true });
    };

    handleDepositClose = () => {
        this.setState({ depositDialogOpen: false });
    };

    render() {

        return (
            <div style={styles.main}>
                <DepositDialog address={this.props.account.address}
                               open={this.state.depositDialogOpen}
                               closeHandler={this.handleDepositClose}/>

                <FloatingActionButton
                    mini={true}
                    style={styles.deposit}
                    backgroundColor={styles.deposit.backgroundColor}
                    onClick={this.handleDepositButton}>

                    <DepositIcon style={styles.icon}/>
                </FloatingActionButton>

                    <span style={styles.balance}>
                        {this.props.account.balance.toPrecision(8) + " " + this.props.currency.toUpperCase()}
                        <CryptoIcon style={styles.icon} icon={this.props.currency}/>
                    </span>


                <FloatingActionButton
                    mini={true}
                    style={styles.withdrawal}
                    backgroundColor={styles.withdrawal.backgroundColor}>
                    <WithdrawalIcon style={styles.icon}/>
                </FloatingActionButton>

            </div>
        );
    }
}

export default Balance;
