/**
 *
 * UpperExchangeBox
 *
 */

import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import DepositIcon from "../../../node_modules/material-ui/svg-icons/content/add";
import WithdrawIcon from "../../../node_modules/material-ui/svg-icons/content/remove";
import DepositDialog from "components/DepositDialog";
import { convertCurrencyName } from "utils/general";
import {
    TableRow,
    TableRowColumn
} from "material-ui/Table";

var styles = {
    deposit: {
        backgroundColor: "#9CD689",
        marginRight: "0.4em",
        marginTop: "0.5em",
        marginBottom: "0.5em"
    },
    withdrawal: {
        marginTop: "0.5em",
        marginBottom: "0.5em",
        backgroundColor: "#E87272",
        marginLeft: "0.4em"
    }
};


class AccountRow extends React.Component {
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

        return <TableRow key={this.props.currency}>
            <TableRowColumn>{this.props.currency.toUpperCase()}</TableRowColumn>
            <TableRowColumn>{this.props.balance}</TableRowColumn>
            <TableRowColumn>
                <DepositDialog address={this.props.address}
                               open={this.state.depositDialogOpen}
                               closeHandler={this.handleDepositClose}/>
                <FloatingActionButton
                    style={styles.deposit}
                    mini={true}
                    backgroundColor={styles.deposit.backgroundColor}
                    onClick={this.handleDepositButton}>
                    <DepositIcon/>
                </FloatingActionButton>

                <FloatingActionButton
                    style={styles.withdrawal}
                    mini={true}
                    backgroundColor={styles.withdrawal.backgroundColor}>
                    <WithdrawIcon/>
                </FloatingActionButton>
            </TableRowColumn>
        </TableRow>
    }
}


export default AccountRow;
