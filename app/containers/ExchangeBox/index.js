import React from "react";
import {
  sendExchange,
  logIn
} from "containers/App/actions";
import {
  FROM_AMOUNT,
  TO_AMOUNT
} from "containers/ExchangeBox/constants";
import {
  substituteRate,
  substituteBalance,
  changeFromAmount,
  changeRate,
  changeToAmount
} from "./actions";
import selectExchangeBox from "./selectors";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import ReverseIcon from "material-ui/svg-icons/action/autorenew";
import Refresh from "components/Refresh";
import Divider from "material-ui/Divider";
import ExchangeBoxField from "components/ExchangeBoxField";
import { replace } from "react-router-redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Toolbar } from "material-ui/Toolbar";
import {
  isCurrencyGeneral,
  isBuyExchange
} from "utils/general";

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

  toolbar: {
    height: "3em"
  }

};


class ExchangeBox extends React.Component {

  createExchange = () => {
    let from_currency = this.props.from_currency;
    let to_currency = this.props.to_currency;

    let amount = this.props.last_changed == FROM_AMOUNT ? this.props.amount.value : null;
    let to_amount = this.props.last_changed == TO_AMOUNT ? this.props.total.value : null;

    let price = this.props.rate.value;

    this.props.sendExchange(from_currency, to_currency, amount, to_amount, price);
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

    let generalCurrency = null;
    let secondaryCurrency = null;
    let exchangeType = null;

    [generalCurrency, secondaryCurrency, exchangeType] = isBuyExchange(this.props.from_currency, this.props.to_currency) ?
      [this.props.from_currency, this.props.to_currency, "BUY"]
      :
      [this.props.to_currency, this.props.from_currency, "SELL"];

    top = <Toolbar style={styles.toolbar}>
      <Subheader>
        {exchangeType + " " + secondaryCurrency.toUpperCase()}
      </Subheader>
      <IconButton style={styles.reverse}
                  iconStyle={styles.reverseIcon}
                  tooltip="reverse market"
                  tooltipPosition="bottom-left"
                  backgroundColor={styles.reverse.backgroundColor}
                  onClick={this.reverseMarket}>
        <ReverseIcon/>
      </IconButton>
    </Toolbar>;


    if (this.props.isRateLoaded) {
      main = <div>
        <ExchangeBoxField currency={this.props.from_currency}
                          handler={this.props.handlerFromAmount}
                          tooltip="substitute balance"
                          floatingLabelText={"Amount (" + this.props.from_currency.toUpperCase() + ")"}
                          value={this.props.amount.value}
                          error={this.props.amount.error}
                          substitute={this.props.substituteBalance}/>

        <ExchangeBoxField currency={this.props.to_currency}
                          handler={this.props.handlerToAmount}
                          value={this.props.total.value}
                          error={this.props.total.error}
                          floatingLabelText={"Amount (" + this.props.to_currency.toUpperCase() + ")"}/>
        <ExchangeBoxField currency={this.props.from_currency}
                          handler={this.props.handlerRate}
                          value={this.props.rate.value}
                          error={this.props.rate.error}
                          tooltip="substitute rate"
                          floatingLabelText={secondaryCurrency.toUpperCase() + " Price (" + generalCurrency.toUpperCase() + ")"}
                          substitute={this.props.substituteRate}/>
      </div>

    } else {
      main = <Refresh />
    }


    if (this.props.isRateLoaded) {
      if (this.props.isAuthenticated) {
        if (this.props.isAccountLoaded && this.props.isAccountExist) {
          let isDisabled = true;
          if (this.props.rate.error == null &&
            this.props.amount.error == null &&
            this.props.total.error == null && !this.props.disabled) {
            isDisabled = false;
          }


          down = (
            <div>
              <RaisedButton label={exchangeType}
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
    sendExchange: (from_currency,
                   to_currency,
                   amount,
                   to_amount,
                   price) => dispatch(sendExchange(from_currency, to_currency, amount, to_amount, price)),
    changeMarket: (from_currency, to_currency) => dispatch(replace("/order/" + from_currency + "-" + to_currency)),
    substituteRate: () => dispatch(substituteRate()),
    substituteBalance: () => dispatch(substituteBalance()),
    logIn: () => dispatch(logIn()),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBox);