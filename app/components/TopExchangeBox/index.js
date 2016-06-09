/**
 *
 * UpperExchangeBox
 *
 */

import React from "react";
import DepositIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-downward";
import WithdrawalIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-upward";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import DepositDialog from "components/DepositDialog";

const styles = {
    depositButton: {
        backgroundColor: "#9CD689",
        marginRight: "1em"
    },
    textField: {
        width: "9.5em"
    },
    icon: {
        backgroundColor: "block",
        marginLeft: "0.1em",
        marginBottom: "0.1em"
    },

    withdrawalButton: {
        backgroundColor: "#E87272",
        marginLeft: "1em"

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
        return (
            <div>
                <br />

                <DepositDialog address={this.props.address}
                               open={this.state.depositDialogOpen}
                               closeHandler={this.handleDepositClose}/>

                <FloatingActionButton
                    style={styles.depositButton}
                    backgroundColor={styles.depositButton.backgroundColor}
                    onClick={this.handleDepositButton}>

                    <DepositIcon style={styles.icon}/>
                </FloatingActionButton>

                <TextField
                    disabled={true}
                    style={styles.textField}
                    floatingLabelText={"Balance: " + this.props.balance}
                />
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>
                <FloatingActionButton
                    style={styles.withdrawalButton}
                    backgroundColor={styles.withdrawalButton.backgroundColor}>
                    <WithdrawalIcon style={styles.icon}/>
                </FloatingActionButton>
            </div>
        );
    }
}

export default TopExchangeBox;
