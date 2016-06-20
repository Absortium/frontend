/*
 *
 * AccountBox
 *
 */

import React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import AccountRow from "components/AccountRow";
import Refresh from "components/Refresh";
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import selectAccountBox from "./selectors";
import {withdrawalDialogOpen} from "containers/WithdrawalDialog/actions"

const styles = {
    icon: {
        marginLeft: "0.1em",
        marginRight: "0.3em",
        marginBottom: "0.2em",
    },

    block: {
        width: "100%",
        textAlign: "center",
        display: "inline-block"
    },

    subheader: {
        backgroundColor: "#E8E8E8"
    }

};

export class AccountBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            this.props.isAuthenticated &&
                <Paper style={styles.block} zDepth={2}>
                    <Subheader style={styles.subheader}>
                        Accounts Deposit / Withdrawal
                    </Subheader>
                    <Divider />
  
                    {this.props.isAccountLoaded ?
                        <Table
                            height="6.74em"
                            fixedHeader={true}
                            multiSelectable={false}
                            onRowSelection={this.handleRowSelect}>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Currency</TableHeaderColumn>
                                    <TableHeaderColumn>Balance</TableHeaderColumn>
                                    <TableHeaderColumn>Actions</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={true}
                                showRowHover={false}
                                stripedRows={false}>

                                { Object.keys(this.props.accounts).map(function (currency) {
                                    let account = this.props.accounts[currency];
                                    return <AccountRow key={currency}
                                                       currency={currency}
                                                       balance={account.amount}
                                                       address={account.address}
                                                       openWithdrawalDialog={this.props.openWithdrawalDialog}/>
                                }, this)}
                            </TableBody>
                        </Table>
                        :
                        <Refresh />
                    }
              </Paper>
        );
    }
}

const mapStateToProps = selectAccountBox();

function mapDispatchToProps(dispatch) {
    return {
        openWithdrawalDialog: (currency) => () => dispatch(withdrawalDialogOpen(currency)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBox);
