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
import Balance from "../../components/Balance";
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

const styles = {
    icon: {
        marginLeft: "0.1em",
        marginRight: "0.3em",
        marginBottom: "0.2em",
    },

    block: {
        width: "100%",
        margin: "1.5em",
        textAlign: "center",
        display: "inline-block"
    },

    refresh: {
        display: "inline-block",
        position: "relative"
    },

    subheader: {
        backgroundColor: "#E8E8E8"
    }

};

export class AccountBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (

            <div>
                <Paper style={styles.block} zDepth={2}>
                    <Subheader style={styles.subheader}>
                        Accounts Deposit / Withdrawal
                    </Subheader>
                    <Divider />

                    {this.props.isAccountLoaded ?
                        <Table
                            height="3em"
                            fixedHeader={true}
                            selectable={true}
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
                                    return <Balance currency={currency}
                                                    balance={account.amount}
                                                    address={account.address}/>
                                }, this)}
                            </TableBody>
                        </Table>
                        : null
                    }

                </Paper>
            </div>
        );
    }
}

const mapStateToProps = selectAccountBox();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBox);
