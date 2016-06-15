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
import { substituteOffer } from "./actions";
import { normalize } from "utils/general";

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

    handleRowSelect = (ids) => {
        if (ids.length == 1) {
            let id = ids[0];


            let price = Object.keys(this.props.offers)[id];
            let amount = this.props.offers[price];
            price = normalize(1/price);

            this.props.substituteOffer(amount , price)
        }
    };

    render() {
        let subHeader = "Exchanges " + this.props.to_currency.toUpperCase() + " on " + this.props.from_currency.toUpperCase();
        let priceHeader = this.props.from_currency.toUpperCase() + " Price (" + this.props.to_currency.toUpperCase() + ")";
        let amountHeader = "Amount (" + this.props.from_currency.toUpperCase() + ")";

        return (
            <div className={styles.exchangeBox}>
                <Paper style={styles.block} zDepth={2}>
                    <div>
                        <Subheader style={styles.subheader}>
                            {subHeader}
                        </Subheader>
                        <Divider />

                        {this.props.offersLoaded ?
                            <Table
                                height="18.6em"
                                fixedHeader={true}
                                selectable={true}
                                multiSelectable={false}
                                onRowSelection={this.handleRowSelect}>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                    enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>{priceHeader}</TableHeaderColumn>
                                        <TableHeaderColumn>{amountHeader}</TableHeaderColumn>
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
                                                <TableRowColumn>{normalize(1/price)}</TableRowColumn>
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
        substituteOffer: (amount, price) => {
            dispatch(substituteOffer(amount, price))
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeOffers);
