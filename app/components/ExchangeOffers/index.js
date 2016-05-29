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
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";

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

const tableData = [
    {'amount': 0.3426930378589339, 'price': 0.254547166514305},
    {'amount': 0.927685008594914, 'price': 0.3655291233387701},
    {'amount': 0.9749591122132907, 'price': 0.41704308481759744},
    {'amount': 0.413487034194706, 'price': 0.3172751009355921},
    {'amount': 0.6399409799581931, 'price': 0.5328547585861084},
    {'amount': 0.7703600663057, 'price': 0.6198582021746949},
    {'amount': 0.1535561678000038, 'price': 0.771622965162549},
    {'amount': 0.4467613971670866, 'price': 0.7631868412694859},
    {'amount': 0.9454444439306686, 'price': 0.41629236878868603},
    {'amount': 0.9446828482586664, 'price': 0.549319522091329},
    {'amount': 0.1854809582353696, 'price': 0.7629005453574121},
    {'amount': 0.25112337759478276, 'price': 0.7380141453972009},
    {'amount': 0.8808710901695731, 'price': 0.5138676398026056},
    {'amount': 0.5577202444532305, 'price': 0.997294616769381},
    {'amount': 0.05663940682725821, 'price': 0.9912340442534175},
    {'amount': 0.8948353032080163, 'price': 0.8758276803790845},
    {'amount': 0.6961038654986684, 'price': 0.5692764656502197},
    {'amount': 0.3295550993500569, 'price': 0.4742447209542531},
    {'amount': 0.9337597537491701, 'price': 0.23976490230043657},
    {'amount': 0.40490166565312213, 'price': 0.9866004493342432}];

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
                                {tableData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn>{row.price}</TableRowColumn>
                                        <TableRowColumn>{row.amount}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default ExchangeOffers;
