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


class MarketInfoBox extends React.Component {
    render() {
        return (
                <Table
                    height="3em"
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={false}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip="Crypto currency">Coin</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Market volume">Volume</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Coin price">Price</TableHeaderColumn>
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

export default MarketInfoBox;