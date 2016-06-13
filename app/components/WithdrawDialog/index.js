/**
 *
 * DepositDialog
 *
 */

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import ToAmount from "components/ToAmount";
import {
    Card,
    CardMedia,
    CardText
} from "material-ui/Card";


const styles = {
    icon: {
        marginLeft: "0.1em",
        marginRight: "0.3em",
        marginBottom: "0.2em",
    },

    block: {
        width: "30em",
        textAlign: "center",
        display: "inline-block",
    },

    dialog: {
        body: {
            padding: "0.1em 0.1em 0.1em 0.1em"
        },

        overlay: {},

        content: {
            textAlign: "center",
            borderRadius: "1em",
            width: "30.5em",

        },

        borderRadius: "1em",
    },

    refresh: {
        display: "inline-block",
        position: "relative"
    },

    subheader: {
        backgroundColor: "#E8E8E8"
    }

};


class DepositDialog extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.closeHandler}
            />
        ];

        return (
            <Dialog modal={false}
                    open={this.props.open}
                    bodyStyle={styles.dialog.body}
                    overlayStyle={styles.dialog.overlay}
                    contentStyle={styles.dialog.content}
                    onRequestClose={this.props.closeHandler}>
                <Paper style={styles.block} zDepth={2}>
                    <Subheader style={styles.subheader}>
                        Withdrawal
                    </Subheader>

                    <ToAmount currency={this.props.to_currency}
                              handler={this.props.handlerToAmount}
                              amount={this.props.to_amount.value}
                              error={this.props.to_amount.error}/>

                </Paper>
            </Dialog>
    );
    }
    }

    export default DepositDialog;
