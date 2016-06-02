/**
 *
 * MarketInfo
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
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import CryptoIcon from "components/CryptoIcon";

const styles = {
    block: {
        width: '100%',
        margin: "20",
        textAlign: 'center',
        display: 'inline-block',
    },

    propContainer: {
        width: "200",
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

const tableData = [];

class MarketInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 100,
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
        var tableBody = (
            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}>
                { Object.keys(this.props.marketinfo).map(function (currency) {
                    var info = this.props.marketinfo[currency];
                    return (
                        <TableRow>
                            <TableRowColumn>{currency.toUpperCase()}</TableRowColumn>
                            <TableRowColumn>{info.volume_24h}</TableRowColumn>
                            <TableRowColumn>{info.rate}</TableRowColumn>
                        </TableRow>
                    )
                }, this)}
            </TableBody>
        );
        
        return (
            <div className={styles.exchangeBox}>
                <Paper style={styles.block} zDepth={2}>
                    <div>
                        <Subheader>
                            {this.props.currency.toUpperCase()}{' '}
                            <CryptoIcon icon={this.props.currency}/>
                        </Subheader>
                        <Divider />
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
                                    <TableHeaderColumn tooltip="Crypto currency">Coin</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Market volume">Volume</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Coin price">Price</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            {tableBody}
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default MarketInfo;
