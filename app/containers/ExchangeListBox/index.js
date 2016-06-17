/*
 *
 * ExchangeListBox
 *
 */

import React from "react";
import { connect } from "react-redux";
import selectExchangeListBox from "./selectors";
import Refresh from "components/Refresh";
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
    }
};

export class ExchangeListBox extends React.Component {
    render() {
        return (
            <div>

                <Paper style={styles.block} zDepth={2}>
                    <Subheader style={styles.subheader}>Last Exchange</Subheader>
                    <Divider />
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
                                    <TableHeaderColumn >Price</TableHeaderColumn>
                                    <TableHeaderColumn >Amount</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={true}
                                showRowHover={true}
                                stripedRows={false}>
                                {this.props.history.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn>{row.price}</TableRowColumn>
                                        <TableRowColumn>{row.amount}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        :
                        <Refresh />
                    }
                </Paper>
            </div>
        )
    }
}


const mapStateToProps = selectExchangeListBox();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeListBox);
