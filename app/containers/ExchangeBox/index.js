/**
 *
 * ExchangeBox
 *
 */

import React from "react";
import Paper from "material-ui/Paper";
import {Row, Col} from "react-flexbox-grid";
import {loggedIn, accountsReceived, marketChanged} from "containers/App/actions";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import ForwardTenIcon from "material-ui/svg-icons/av/forward-10";
import CryptoIcon from "components/CryptoIcon";
import CircularProgress from "material-ui/CircularProgress";
import selectExchangeBox from "./selectors"
import {connect} from "react-redux";
import axios from "axios";

const styles = {
    block: {
        width: '100%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    smallIcon: {
        width: "30",
        height: "30",
    },

    middleIcon: {
        width: 36,
        height: 36,
    },
    small: {
        width: 72,
        height: 72,
    }
};


class ExchangeBox extends React.Component {

    constructor(props) {
        super(props);

        console.log("BOX CONSTRUCTOR");
        this.state = {
            from_amount: null,
            to_amount: null,
            rate: null,
        }
    }


    componentDidMount() {
        console.log("BOX DID MOUNT")
    }

    componentDidUpdate() {
        console.log("BOX DID UPDATE")
    }

    createExchange = () => {

        var from_currency = this.props.from_currency;
        var to_currency = this.props.to_currency;

        var amount = this.state.amount;
        var price = this.state.price;

        var data = {
            from_currency: from_currency,
            to_currency: to_currency,
            amount: amount,
            price: price
        };

        axios.post('/api/exchanges/', data).then(function (response) {
            console.log(response)
        })
    };

    linkTo = (name) => (event) => {
        let newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    };


    render = () => {

        let from_currency = this.props.from_currency;
        let to_currency = this.props.to_currency;

        let accountExist = this.props.account !== null;
        let amount = null;
        if (accountExist) {
            amount = this.props.account.amount;
            console.log("Amount");
            console.log(amount);
        }

        let top = null;
        if (this.props.isAuthenticated) {
            if (accountExist) {
                top = (
                    <div>
                        <br />
                        <RaisedButton label="deposit" primary={true}/>{' '}{' '}{' '}
                        <RaisedButton label="withdraw" primary={true}/>
                    </div>
                )
            } else {
                top = (
                    <div>
                        <br />
                        <RaisedButton label="create account" primary={true}/>
                    </div>
                )
            }

        }

        let main = null;
        if (this.state.rate != null) {
            main = (
                <div>
                    <Badge
                        badgeStyle={{top: 12, right: 12}}
                        badgeContent={4}
                        primary={true}>
                        <ForwardTenIcon style={styles.middleIcon}/>
                    </Badge>
                    <TextField
                        floatingLabelText="Price (Rate) of the exchange"
                        floatingLabelFixed={true}
                        type="number"
                        onChange={this.linkTo('rate')}
                        value={this.state.rate}
                    />
                    <br />

                    <CryptoIcon icon={from_currency}/>{' '}
                    <TextField
                        floatingLabelText={"Amount of " + from_currency.toUpperCase() + " you want to sell"}
                        floatingLabelFixed={true}
                        type="number"
                        onChange={this.linkTo('from_amount')}
                        value={this.state.from_amount}
                        defaultValue={amount}
                    />
                    <br />

                    <CryptoIcon icon={to_currency}/>{' '}
                    <TextField
                        floatingLabelText={"Amount of " + to_currency.toUpperCase() + " you want to buy"}
                        floatingLabelFixed={true}
                        type="number"/>
                    onChange={this.linkTo('to_amount')}
                    value={this.state.to_amount}
                </div>
            );
        } else {
            main = (
                <div>
                    <CircularProgress size={1.5}/>
                    <br />
                </div>
            )
        }

        let down = null;
        if (this.props.isAuthenticated) {
            down = <RaisedButton label="exchange" onMouseDown={this.createExchange} primary={true}/>
        } else {
            down = <RaisedButton onMouseDown={() => this.props.logIn()} label="LOG IN" primary={true}/>
        }

        return (
            <div className={styles.exchangeBox}>
                <Paper style={styles.block} zDepth={2}>
                    {top}
                    <br />
                    <Divider />
                    <br />
                    {main}
                    <br />
                    <Divider />
                    <br />
                    {down}
                    <br />
                    <br />
                </Paper>
            </div>
        )
    }
}

export default ExchangeBox;

const mapStateToProps = selectExchangeBox();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBox);