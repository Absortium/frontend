/**
 *
 * DepositDialog
 *
 */

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import { connect } from "react-redux";
import WithdrawAmount from "components/WithdrawAmount";
import WithdrawAddress from "components/WithdrawAddress";
import {
    Card,
    CardMedia,
    CardText
} from "material-ui/Card";
import { withdrawClose, changeWithdrawalAmount } from "./actions";
import selectWithdrawDialog from "./selectors"

const styles = {
    icon: {
        marginLeft: "0.1em",
        marginRight: "0.3em",
        marginBottom: "0.2em",
    },

    block: {
        width: "100%",
        textAlign: "center",
        display: "inline-block",
    },

    dialog: {
        body: {
            padding: "0.3em 0.3em 0.3em 0.3em"
        },

        overlay: {},

        content: {
            textAlign: "center",
            borderRadius: "1em",
            width: "24.1em"

        }
    },

    refresh: {
        display: "inline-block",
        position: "relative"
    },

    subheader: {
        backgroundColor: "#E8E8E8"
    }

};


export default class WithdrawDialog extends React.Component {
    render() {
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
                    <Divider/>
                    <br/>

                    <WithdrawAmount
                        currency={this.props.currency}
                        amount={this.props.amount.value}
                        error={this.props.amount.error}
                        handler={this.props.changeWithdrawalAmount}/>

                    <WithdrawAddress
                        currency={this.props.currency}
                        address={this.props.address.value}
                        error={this.props.address.error}
                        handler={this.props.changeWithdrawalAmount}/>
                    
                    <Divider/>
                    <br/>
                    <RaisedButton
                        label="withdraw"
                        primary={true}
                        onTouchTap={this.props.closeHandler}
                    />
                    <FlatButton
                        label="close"
                        keyboardFocused={true}
                        onTouchTap={this.props.closeHandler}/>
                    <br/>
                    <br/>
                </Paper>
            </Dialog>
        );
    }
}


const mapStateToProps = selectWithdrawDialog();

function mapDispatchToProps(dispatch) {
    return {
        closeHandler: () => dispatch(withdrawClose()),
        changeWithdrawalAmount: (event) => dispatch(changeWithdrawalAmount(event.value)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawDialog);
