/**
 *
 * ExchangeOffers
 *
 */

import React from "react";
import Paper from "material-ui/Paper";
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import { connect } from "react-redux";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import selectExchangeOffers from "./selectors";

const styles = {
    block: {
        width: '100%',
        margin: "20px",
        textAlign: 'center',
        display: 'inline-block',
    },

    propContainer: {
        width: "200px",
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

class ExchangeOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: "320px",
            fixedHeader: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false
        };
    }

    render() {
        return (
            <div className={styles.exchangeBox}>
                <Paper style={styles.block} zDepth={2}>
                    <div>
                        <br />
                        <Subheader>Exchange Offers Table</Subheader>
                        <br />
                        <Divider />

                        {this.props.offersLoaded ?
                            <Table
                                height={this.state.height}
                                fixedHeader={this.state.fixedHeader}
                                selectable={this.state.selectable}
                                multiSelectable={this.state.multiSelectable}>
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}
                                    enableSelectAll={this.state.enableSelectAll}>
                                    <TableRow>
                                        <TableHeaderColumn tooltip="The Price">Price</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="The Amount">Amount</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}
                                    deselectOnClickaway={this.state.deselectOnClickaway}
                                    showRowHover={this.state.showRowHover}
                                    stripedRows={this.state.stripedRows}>
                                    {this.props.offers.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{row.price}</TableRowColumn>
                                            <TableRowColumn>{row.amount}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            : null
                        }
                    </div>
                </Paper>
            </div>
        );
    }
}

export default ExchangeOffers;

const mapStateToProps = selectExchangeOffers();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeOffers);
