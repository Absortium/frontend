import React from "react";
import {
    logIn,
    accountsReceived,
    sendExchange
} from "containers/App/actions";
import selectExchangeBox from "./selectors";
import {
    changeFromAmount,
    changeRate,
    changeToAmount
} from "./actions";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton"
import ReverseIcon from "material-ui/svg-icons/action/autorenew";
import RefreshIndicator from "material-ui/RefreshIndicator";
import Divider from "material-ui/Divider";
import FromAmount from "components/FromAmount";
import ToAmount from "components/ToAmount";
import Rate from "components/Rate";
import { replace } from "react-router-redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator
} from "material-ui/Toolbar";


const styles = {
    reverseIcon: {
        width: "25px",
        height: "25px",
        fill: "white"
    },
    reverse: {
        marginTop: "5px",
        width: "36px",
        height: "36px",
        padding: "6px",
        backgroundColor: "rgb(0, 188, 212)",
        borderRadius: "100px"
    },

    icon: {
        marginLeft: "0.1em",
        marginRight: "0.3em",
        marginBottom: "0.2em"
    },

    block: {
        width: "100%",
        margin: "1.5em",
        textAlign: "center",
        display: "inline-block"
    },

    refresh: {
        display: "inline-block",
        position: "relative"
    },

    toolbar: {
        height: "3em"
    }

};


class ExchangeBox extends React.Component {

    createExchange = () => {
        let from_currency = this.props.from_currency;
        let to_currency = this.props.to_currency;

        let amount = this.props.from_amount.value;
        let price = this.props.rate.value;

        this.props.sendExchange(from_currency, to_currency, amount, price);
    };

    reverseMarket = () => {
        let to_currency = this.props.from_currency;
        let from_currency = this.props.to_currency;

        this.props.changeMarket(from_currency, to_currency);
    };

    render = () => {
        let top = null;
        let main = null;
        let down = null;


        top = <Toolbar style={styles.toolbar}>
            <Subheader>
                Exchange {this.props.from_currency.toUpperCase()} on {this.props.to_currency.toUpperCase()}
            </Subheader>
            <IconButton
                style={styles.reverse}
                iconStyle={styles.reverseIcon}
                tooltip="reverse market"
                tooltipPosition="bottom-left"
                backgroundColor={styles.reverse.backgroundColor}
                onClick={this.reverseMarket}>
                <ReverseIcon/>
            </IconButton>
        </Toolbar>;


        if (this.props.isRateLoaded) {
            main = (
                <div>
                    <Rate handler={this.props.handlerRate}
                          rate={this.props.rate.value}
                          error={this.props.rate.error}
                          from_currency={this.props.from_currency}
                          to_currency={this.props.to_currency}/>

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
        sendExchange: (from_currency, to_currency, amount, price) => dispatch(sendExchange(from_currency, to_currency, amount, price)),
        changeMarket: (from_currency, to_currency) => dispatch(replace("/exchange/" + from_currency + "-" + to_currency)),
        logIn: () => dispatch(logIn()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBox);