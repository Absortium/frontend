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
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import FromAmount from "components/FromAmount";
import ToAmount from "components/ToAmount";
import Rate from "components/Rate";
import selectExchangeBox from "./selectors";
import { connect } from "react-redux";
import axios from "axios";
import RefreshIndicator from "material-ui/RefreshIndicator";
import TopEcxhangeBox from "components/TopExchangeBox";

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
        let top = null;
        let main = null;
        let down = null;

        if (this.props.isRateLoaded &&
            this.props.isAuthenticated &&
            this.props.isAccountLoaded &&
            this.props.isAccountExist) {

            top = <TopEcxhangeBox account={this.props.account}
                                  currency={this.props.from_currency}
                                  error={this.props.from_amount.error}/>

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
                    {main}
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