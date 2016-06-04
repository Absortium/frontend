/**
 *
 * MarketInfoBox
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
        width: "100%",
        margin: "20px",
        textAlign: "center",
        display: "inline-block",
    },

    propContainer: {
        width: "200px",
        overflow: "hidden",
        margin: "20px auto 0",
    },
    propToggleHeader: {
        margin: "20px auto 10px",
    },
};

class MarketInfoBox extends React.Component {
    render() {
        return (
            <div>
                <Paper style={styles.block} zDepth={2}>
                    <div>
                        <Subheader>
                            {this.props.currency.toUpperCase()}{" "}
                            <CryptoIcon icon={this.props.currency}/>
                        </Subheader>
                        <Divider />
                        <Table
                            height="100px"
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
                    </div>
                </Paper>
            </div>
        );
    }
}

export default MarketInfoBox;