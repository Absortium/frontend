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
import WithdrawalAmount from "components/WithdrawalAmount";
import WithdrawalAddress from "components/WithdrawalAddress";
import {
    Card,
    CardMedia,
    CardText
} from "material-ui/Card";
import {
    withdrawalDialogClose,
    changeWithdrawalAddress,
    changeWithdrawalAmount
} from "./actions";
import { sendWithdrawal } from "containers/App/actions";
import selectWithdrawalDialog from "./selectors";
import {convert} from "utils/general"

const styles = {
    icon: {
        marginLeft: "0.1em",
        marginRight: "0.3em",
        marginBottom: "0.2em"
    },

    block: {
        width: "100%",
        textAlign: "center",
        display: "inline-block"
    },

    dialog: {
        body: {
            padding: "0.1em 0.1em 0.1em 0.1em"
        },

        overlay: {},

        content: {
            borderRadius: "1em",
            width: "32.1em"

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


export default class WithdrawalDialog extends React.Component {
    sendWithdrawal = () => {
        let amount = convert(this.props.amount.value);
        let address = this.props.address.value;
        let pk = this.props.pk;

        this.props.sendWithdrawal(amount, address, pk)
    };

    render() {
        let isDisabled = (this.props.address.error != null) || (this.props.amount.error != null);

        console.log(this.props.currency);
        return (
            <Dialog modal={false}
                    open={this.props.open}
                    bodyStyle={styles.dialog.body}
                    overlayStyle={styles.dialog.overlay}
                    contentStyle={styles.dialog.content}
                    onRequestClose={this.props.closeHandler}>
                <Paper style={styles.block} zDepth={2}>
                    <Subheader style={styles.subheader}>
                        {"Withdrawal from " + this.props.currency.toUpperCase() + " account"}
                    </Subheader>
                    <Divider/>
                    <br/>

                    <WithdrawalAmount currency={this.props.currency}
                                      handler={this.props.changeWithdrawalAmount}
                                      amount={this.props.amount.value}
                                      error={this.props.amount.error}/>

                    <WithdrawalAddress currency={this.props.currency}
                                       handler={this.props.changeWithdrawalAddress}
                                       address={this.props.address.value}
                                       error={this.props.address.error}/>

                    <Divider/>
                    <br/>
                    <RaisedButton
                        label="withdraw"
                        primary={true}
                        disabled={isDisabled}
                        onTouchTap={this.sendWithdrawal}
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


const mapStateToProps = selectWithdrawalDialog();

function mapDispatchToProps(dispatch) {
    return {
        closeHandler: () => dispatch(withdrawalDialogClose()),
        sendWithdrawal: (amount, address, pk) => dispatch(sendWithdrawal(amount, address, pk)),
        changeWithdrawalAmount: (event) => dispatch(changeWithdrawalAmount(event.target.value)),
        changeWithdrawalAddress: (event) => dispatch(changeWithdrawalAddress(event.target.value)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalDialog);
