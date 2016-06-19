/*
 *
 * ExchangeListBox
 *
 */

import React from "react";
import { connect } from "react-redux";
import selectExchangeListBox from "./selectors";
import Refresh from "components/Refresh";
import StatusIcon from "components/StatusIcon";
import Paper from "material-ui/Paper";
import {
    Tabs,
    Tab
} from "material-ui/Tabs";
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import ExchangeTabLabel from "components/ExchangeTabLabel";
import { normalize } from "utils/general";
import BigNumber from "bignumber.js";

/**
 *
 * LastExchanges
 *
 */

const styles = {
    block: {
        width: "100%",
        margin: "1.5em",
        textAlign: "center",
        display: "inline-block"
    },

    tab: {
        backgroundColor: "#E8E8E8",
        textTransform: "capitalize"
    },

    subheader: {
        backgroundColor: "#E8E8E8"
    },

    currency: {
        row: {
            width: "4.5em",
            textTransform: "uppercase"
        },
        name: {
            width: "4.5em"
        }
    },

    status: {
        width: "4.5em"
    }
};

class ExchangeListBox extends React.Component {
    render() {
        return (
            <div>

                <Paper style={styles.block} zDepth={2}>
                    <Tabs>
                        <Tab label={<ExchangeTabLabel text="All Exchanges"/>}
                             style={styles.tab}>
                            { this.props.isAllExchangesLoaded ?
                                <Table
                                    height="18.6em"
                                    fixedHeader={true}
                                    selectable={true}
                                    multiSelectable={false}>
                                    <TableHeader
                                        displaySelectAll={false}
                                        adjustForCheckbox={false}
                                        enableSelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn>{"Give (" + this.props.from_currency.toUpperCase() + ")"}</TableHeaderColumn>
                                            <TableHeaderColumn>{"Price (" + this.props.to_currency.toUpperCase() + ")"}</TableHeaderColumn>
                                            <TableHeaderColumn>{"Get (" + this.props.to_currency.toUpperCase() + ")"}</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        displayRowCheckbox={false}
                                        deselectOnClickaway={true}
                                        showRowHover={true}
                                        stripedRows={false}>
                                        {this.props.all_exchanges.map((row, index) => {
                                            let price = new BigNumber(row.price);
                                            let amount = new BigNumber(row.amount);

                                            return (
                                                <TableRow key={index}>


                                                    <TableRowColumn>{normalize(amount)}</TableRowColumn>
                                                    <TableRowColumn>{normalize(price)}</TableRowColumn>
                                                    <TableRowColumn>{normalize(price.times(amount))}</TableRowColumn>
                                                </TableRow>
                                            )}
                                        )}
                                    </TableBody>
                                </Table>
                                :
                                <Refresh />
                            }
                        </Tab>
                        { this.props.isAuthenticated ?
                            <Tab label={<ExchangeTabLabel text="User Exchanges"/>}
                                 style={styles.tab}>
                                { this.props.isUserExchangesLoaded ?
                                    <Table
                                        height="18.6em"
                                        fixedHeader={true}
                                        selectable={true}
                                        multiSelectable={false}>
                                        <TableHeader
                                            displaySelectAll={false}
                                            adjustForCheckbox={false}
                                            enableSelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>{"Give (" + this.props.from_currency.toUpperCase() + ")"}</TableHeaderColumn>
                                                <TableHeaderColumn>{"Price (" + this.props.to_currency.toUpperCase() + ")"}</TableHeaderColumn>
                                                <TableHeaderColumn>{"Get (" + this.props.to_currency.toUpperCase() + ")"}</TableHeaderColumn>
                                                <TableHeaderColumn>Status</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox={false}
                                            deselectOnClickaway={true}
                                            showRowHover={true}
                                            stripedRows={false}>
                                            {this.props.user_exchanges.map((row, index) => {

                                                let price = new BigNumber(row.price);
                                                let amount = new BigNumber(row.amount);

                                                return (
                                                    <TableRow key={index}>
                                                        <TableRowColumn>{normalize(amount)}</TableRowColumn>
                                                        <TableRowColumn>{normalize(price)}</TableRowColumn>
                                                        <TableRowColumn>{normalize(amount.times(price))}</TableRowColumn>
                                                        <TableRowColumn><StatusIcon
                                                            status={row.status}/></TableRowColumn>
                                                    </TableRow>
                                                )
                                            })
                                            }
                                        </TableBody>
                                    </Table>
                                    :
                                    <Refresh />
                                }

                            </Tab>
                            :
                            null}
                    </Tabs>
                </Paper>
            </div>
        )
    }
}

export default ExchangeListBox;

const mapStateToProps = selectExchangeListBox();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeListBox);
