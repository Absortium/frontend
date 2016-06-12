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
    changeToAmount,
    exchangeCreated
} from "./actions";
import {
    convert,
    convertCurrencyName
} from "utils/general";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import FromAmount from "components/FromAmount";
import ToAmount from "components/ToAmount";
import Rate from "components/Rate";
import selectExchangeBox from "./selectors";
import { connect } from "react-redux";
import axios from "axios";
import RefreshIndicator from "material-ui/RefreshIndicator";
import { toastr } from "react-redux-toastr";

const styles = {

    top: {
        padding: "0.5em",

        text: {
            color: "#B9BCBD",
            fontSize: "1em"
        },

        icon: {
            marginLeft: "0.5em",
            marginBottom: "0.2em"
        }
    },

    block: {
        width: "100%",
        margin: "20px",
        textAlign: "center",
        display: "inline-block"
    },

    refresh: {
        display: "inline-block",
        position: "relative"
    }
};


class ExchangeBox extends React.Component {

    createExchange = () => {
        let from_currency = this.props.from_currency;
        let to_currency = this.props.to_currency;

        let amount = convert(this.props.from_amount.value);
        let price = this.props.rate.value;

        let data = {
            from_currency: from_currency,
            to_currency: to_currency,
            amount: amount,
            price: price
        };
        
        let component = this;
        axios.post("/api/exchanges/", data)
            .then(function (response) {
                toastr.success("Exchange", "Created successfully");
                component.props.exchangeCreated()
            })
            .catch(function (response) {
                let request = response.request;
                let msg = JSON.parse(request.response)[0];
                toastr.error("Exchange", msg);
            });
    };


    render = () => {
        let top = null;
        let main = null;
        let down = null;


        if (this.props.isAuthenticated &&
            this.props.isAccountLoaded) {
            top = <div style={styles.top}>
                <span style={styles.top.text}>
                    Exchange {this.props.from_currency.toUpperCase()} on {this.props.to_currency.toUpperCase()}
                </span>
            </div>;
        } else {
            top = <div>
                <br/>
            </div>;
        }


        if (this.props.isRateLoaded) {
            main = (
                <div>
                    <Rate handler={this.props.handlerRate}
                          rate={this.props.rate.value}
                          error={this.props.rate.error}/>

                    <FromAmount currency={this.props.from_currency}
                                handler={this.props.handlerFromAmount}
                                amount={this.props.from_amount.value}
                                error={this.props.from_amount.error}/>

                    <ToAmount currency={this.props.to_currency}
                              handler={this.props.handlerToAmount}
                              amount={this.props.to_amount.value}
                              error={this.props.to_amount.error}/>

                </div>
            )
        } else {
            main = (
                <div>
                    <br />
                    <RefreshIndicator
                        size={70}
                        top={0}
                        left={0}
                        status="loading"
                        style={styles.refresh}
                    />
                    <br />
                    <br />
                </div>
            )
        }


        if (this.props.isRateLoaded) {
            if (this.props.isAuthenticated) {
                if (this.props.isAccountLoaded && this.props.isAccountExist) {
                    let isDisabled = true;
                    if (this.props.rate.error == null &&
                        this.props.from_amount.error == null &&
                        this.props.to_amount.error == null) {
                        isDisabled = false;
                    }


                    down = (
                        <div>
                            <RaisedButton label="exchange"
                                          onMouseDown={this.createExchange}
                                          disabled={isDisabled}
                                          primary={true}/>
                            <br/>
                            <br />
                        </div>
                    )
                } else if (this.props.isAccountLoaded && !this.props.isAccountExist) {
                    down = (
                        <div>
                            <RaisedButton label="create account" primary={true}/>
                            <br/>
                            <br />
                        </div>
                    )
                }
            } else {
                down = (
                    <div>
                        <RaisedButton onMouseDown={() => this.props.logIn()} label="log in" primary={true}/>
                        <br/>
                        <br />
                    </div>
                )

            }
        }

        return (
            <div>
                <Paper style={styles.block} zDepth={2}>
                    {top}
                    <Divider />
                    {main}
                    <Divider />
                    <br />
                    {down}
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
        exchangeCreated: (exchange) => dispatch(exchangeCreated(exchange)),
        logIn: () => dispatch(logIn()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBox);