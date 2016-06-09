/**
 *
 * UpperExchangeBox
 *
 */

import React from "react";
import WithdrawalIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-downward";
import DepositIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-upward";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Divider from "material-ui/Divider";
import CryptoIcon from "components/CryptoIcon";
import DepositDialog from "components/DepositDialog";
import {ERROR_FROM_AMOUNT_GT_BALANCE} from "../../containers/ExchangeBox/constants"
import {convertCurrencyName} from "utils/general"

var styles = {
    top: {
        padding: "0.5em",

        text: {
            color: "#B9BCBD",
            fontSize: "1em"
        },

        icon: {
            marginLeft: "0.5em",
            marginBottom: "0.2em"
        }
    },

    bottom: {
        padding: "0.5em",

        icon: {
            backgroundColor: "block",
            marginLeft: "0.5em",
            marginBottom: "0.2em"
        },

        balance: {
            fontSize: "0.86em",
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
    }
};


class TopExchangeBox extends React.Component {
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

        if (this.props.error == ERROR_FROM_AMOUNT_GT_BALANCE) {
            styles.bottom.balance.color = "#E87272"
        } else {
            styles.bottom.balance.color = "#ACAFB0"
        }

        return (
            <div>
                <div style={styles.top}>
                    <span style={styles.top.text}>
                        {convertCurrencyName(this.props.currency)}
                    </span>
                    <CryptoIcon style={styles.top.icon} icon={this.props.currency}/>
                </div>

                <Divider/>

                <DepositDialog address={this.props.account.address}
                               open={this.state.depositDialogOpen}
                               closeHandler={this.handleDepositClose}/>

                <div style={styles.bottom}>
                    <FloatingActionButton
                        mini={true}
                        style={styles.bottom.deposit}
                        backgroundColor={styles.bottom.deposit.backgroundColor}
                        onClick={this.handleDepositButton}>

                        <DepositIcon style={styles.bottom.icon}/>
                    </FloatingActionButton>

                    <span style={styles.bottom.balance}>
                        {"Balance: " + this.props.account.balance.toPrecision(8)}
                    </span>

                    <FloatingActionButton
                        mini={true}
                        style={styles.bottom.withdrawal}
                        backgroundColor={styles.bottom.withdrawal.backgroundColor}>
                        <WithdrawalIcon style={styles.bottom.icon}/>
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

export default TopExchangeBox;