/**
 *
 * UserExchangeTable
 *
 */

import React from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import StatusIcon from "components/StatusIcon";
import { normalize } from "utils/general";
import BigNumber from "bignumber.js";

class UserExchangeTable extends React.Component {
    render() {

        let exchanges = this.props.exchanges.sort(function(a,b) {
            return new Date(b.created).getTime() - new Date(a.created).getTime()
        });


        return (
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
                    {exchanges.map((row, index) => {
                        let price = new BigNumber(row.price);
                        let amount = new BigNumber(row.amount);

                        return (
                            <TableRow key={index}>
                                <TableRowColumn>{normalize(amount)}</TableRowColumn>
                                <TableRowColumn>{normalize(price)}</TableRowColumn>
                                <TableRowColumn>{normalize(amount.times(price))}</TableRowColumn>
                                <TableRowColumn>
                                    <StatusIcon status={row.status}/>
                                </TableRowColumn>
                            </TableRow>
                        )
                    })
                    }
                </TableBody>
            </Table>
        );
    }
}

export default UserExchangeTable;
