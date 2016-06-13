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
import RefreshIndicator from "material-ui/RefreshIndicator";
import Divider from "material-ui/Divider";
import selectExchangeOffers from "./selectors";
import { substituteExchange } from "./actions";

const styles = {
    block: {
        width: '100%',
        margin: "1.5em",
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

    subheader: {
        backgroundColor: "#E8E8E8"
    },

    refresh: {
        display: "inline-block",
        position: "relative"
    }

};

class ExchangeOffers extends React.Component {

    handleRowSelect = () => {
        // TODO: 
        this.props.substituteExchange()

    };

    render() {
        return (
            <div className={styles.exchangeBox}>
                <Paper style={styles.block} zDepth={2}>
                    <div>
                        <Subheader style={styles.subheader}>
                            Offers table
                        </Subheader>
                        <Divider />

                        {this.props.offersLoaded ?
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
                                        <TableHeaderColumn tooltip="The Price">Price</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="The Amount">Amount</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    deselectOnClickaway={true}
                                    showRowHover={false}
                                    stripedRows={false}>
                                    { Object.keys(this.props.offers).map(function (price) {
                                        let amount = this.props.offers[price];
                                        return (
                                            <TableRow key={price}>
                                                <TableRowColumn>{price}</TableRowColumn>
                                                <TableRowColumn>{amount}</TableRowColumn>
                                            </TableRow>
                                        )
                                    }, this)}
                                </TableBody>
                            </Table>
                            :
                            <div>
                                <br />
                                <RefreshIndicator
                                    size={70}
                                    top={0}
                                    left={0}
                                    status="loading"
                                    style={styles.refresh}
                                />
                                <br />
                                <br />
                            </div>
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
        substituteExchange: (price, amount) => {
            dispatch(substituteExchange(price, amount))
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeOffers);
