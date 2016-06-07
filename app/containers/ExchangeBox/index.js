import React from "react";
import Paper from "material-ui/Paper";
import {
    loggedIn,
    logIn,
    accountsReceived,
    marketChanged
} from "containers/App/actions";
import {
    changeFromAmount,
    changeRate,
    changeToAmount
} from "./actions";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import ForwardTenIcon from "material-ui/svg-icons/av/forward-10";
import CryptoIcon from "components/CryptoIcon";
import selectExchangeBox from "./selectors";
import { connect } from "react-redux";
import axios from "axios";
import RefreshIndicator from "material-ui/RefreshIndicator";


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
    },
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    }
};

class ExchangeBox extends React.Component {

    deconvert = (value) => {
        return Number(value) / Number(Math.pow(10, 8));

    };

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


    render = () => {
        let from_currency = this.props.from_currency;
        let to_currency = this.props.to_currency;

        let top = null;
        let main = null;
        let down = null;

        if (this.props.isRateLoaded &&
            this.props.isAuthenticated &&
            this.props.isAccountLoaded &&
            this.props.isAccountExist) {

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
                </div>
            )
        }

        if (this.props.isRateLoaded) {
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
                        onChange={this.props.handlerRate}
                        value={this.props.rate}
                    />
                    <br />

                    <CryptoIcon icon={from_currency}/>{' '}
                    <TextField
                        floatingLabelText={"Amount of " + from_currency.toUpperCase() + " you want to sell"}
                        floatingLabelFixed={true}
                        type="number"
                        step={0.0001}
                        onChange={this.props.handlerFromAmount}
                        value={this.deconvert(this.props.from_amount)}
                    />
                    <br />

                    <CryptoIcon icon={to_currency}/>{' '}
                    <TextField
                        floatingLabelText={"Amount of " + to_currency.toUpperCase() + " you want to buy"}
                        floatingLabelFixed={true}
                        type="number"
                        onChange={this.props.handlerToAmount}
                        value={this.deconvert(this.props.to_amount)}/>
                </div>
            )
        } else {
            main = (
                <div>
                    <RefreshIndicator
                        size={70}
                        top={0}
                        left={0}
                        status="loading"
                        style={styles.refresh}
                    />
                    <br />
                </div>
            )
        }


        if (this.props.isRateLoaded) {
            if (this.props.isAuthenticated) {
                if (this.props.isAccountLoaded && this.props.isAccountExist) {
                    down = (
                        <div>
                            <RaisedButton label="exchange" onMouseDown={this.createExchange} primary={true}/>
                            <br/>
                        </div>
                    )
                } else if (this.props.isAccountLoaded && !this.props.isAccountExist) {
                    down = (
                        <div>
                            <RaisedButton label="create account" primary={true}/>
                            <br/>
                        </div>
                    )
                }
            } else {
                down = (
                    <div>
                        <RaisedButton onMouseDown={() => this.props.logIn()} label="log in" primary={true}/>
                        <br/>
                    </div>
                )

            }
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
                </Paper>
            </div>
        )
    }
}

export default ExchangeBox;

const mapStateToProps = selectExchangeBox();

function

mapDispatchToProps(dispatch) {
    return {
        handlerFromAmount: (event) => dispatch(changeFromAmount(event.target.value)),
        handlerToAmount: (event) => dispatch(changeToAmount(event.target.value)),
        handlerRate: (event) => dispatch(changeRate(event.target.value)),
        logIn: () => dispatch(logIn()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBox);