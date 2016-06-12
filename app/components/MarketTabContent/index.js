/**
 *
 * MarketInfoBox
 *
 */

import React from "react";
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";


class MarketTabContent extends React.Component {
    handleRowSelect = (ids) => {
        if (ids.length == 1) {
            let id = ids[0];

            let from_currency = this.props.currency;
            let to_currency = Object.keys(this.props.info)[id];
            this.props.changeMarket(from_currency, to_currency);
        }
    };

    render() {
        return (
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
                        <TableHeaderColumn>Coin</TableHeaderColumn>
                        <TableHeaderColumn>Volume</TableHeaderColumn>
                        <TableHeaderColumn>Price</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={true}
                    showRowHover={false}
                    stripedRows={false}>
                    { Object.keys(this.props.info).map(function (currency) {
                        var info = this.props.info[currency];
                        return (
                            <TableRow key={currency}>
                                <TableRowColumn>{currency.toUpperCase()}</TableRowColumn>
                                <TableRowColumn>{info.volume_24h}</TableRowColumn>
                                <TableRowColumn>{info.rate}</TableRowColumn>
                            </TableRow>
                        )
                    }, this)}
                </TableBody>
            </Table>
        );
    }
}

export default MarketTabContent;