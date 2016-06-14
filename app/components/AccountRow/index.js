/**
 *
 * UpperExchangeBox
 *
 */

import React from "react";
import DepositIcon from "material-ui/svg-icons/navigation/arrow-upward";
import WithdrawIcon from "material-ui/svg-icons/navigation/arrow-downward";
import DepositDialog from "components/DepositDialog";
import IconButton from "material-ui/IconButton";
import {
    TableRow,
    TableRowColumn
} from "material-ui/Table";

var styles = {
    icon: {
        width: "18px",
        height: "18px"
    },

    deposit: {
        width: "36px",
        height: "36px",
        padding: "8px",
        backgroundColor: "#9CD689",
        borderRadius: "100px"
    },
    withdrawal: {
        marginLeft: "3px",
        width: "36px",
        height: "36px",
        padding: "8px",
        backgroundColor: "#D17373",
        borderRadius: "100px"
    }
};


class AccountRow extends React.Component {
    state = {
        depositDialogOpen: false
    };

    handlerDepositButton = () => {
        this.setState({ depositDialogOpen: true });
    };

    handlerDepositClose = () => {
        this.setState({ depositDialogOpen: false });
    };

    render() {

        return <TableRow key={this.props.currency}>
            <TableRowColumn>{this.props.currency.toUpperCase()}</TableRowColumn>
            <TableRowColumn>{this.props.balance}</TableRowColumn>
            <TableRowColumn>
                <DepositDialog address={this.props.address}
                               open={this.state.depositDialogOpen}
                               closeHandler={this.handlerDepositClose}/>

                <IconButton
                    style={styles.deposit}
                    iconStyle={styles.icon}
                    backgroundColor={styles.deposit.backgroundColor}
                    onClick={this.handlerDepositButton}>
                    <DepositIcon/>
                </IconButton>

                <IconButton
                    style={styles.withdrawal}
                    iconStyle={styles.icon}
                    backgroundColor={styles.withdrawal.backgroundColor}
                    onClick={this.props.openWithdrawalDialog(this.props.currency)}>
                    <WithdrawIcon/>
                </IconButton>
            </TableRowColumn>
        </TableRow>
    }
}


export default AccountRow;
