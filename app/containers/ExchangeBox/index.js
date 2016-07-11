import React from "react";
import {
  sendExchange,
  logIn
} from "containers/App/actions";
import {
  AMOUNT,
  TOTAL
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
import { Toolbar } from "material-ui/Toolbar";
import {
  getPrimaryCurrency,
  getSecondaryCurrency
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
    let amount = this.props.last_changed == AMOUNT ? this.props.amount.value : null;
    let total = this.props.last_changed == TOTAL ? this.props.total.value : null;
    let price = this.props.rate.value;

    this.props.sendExchange(this.props.pair, this.props.order_type, amount, total, price);
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

    let primaryCurrency = getPrimaryCurrency(this.props.pair);
    let secondaryCurrency = getSecondaryCurrency(this.props.pair);

    top = <Toolbar style={styles.toolbar}>
      <Subheader>
        {this.props.order_type.toUpperCase() + " " + secondaryCurrency.toUpperCase()}
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
        <ExchangeBoxField currency={secondaryCurrency}
                          handler={this.props.handlerAmount}
                          tooltip={this.props.order_type == "sell" ? "substitute balance" : null}
                          floatingLabelText={"Amount (" + secondaryCurrency.toUpperCase() + ")"}
                          value={this.props.amount.value}
                          error={this.props.amount.error}
                          substitute={this.props.order_type == "sell" ? this.props.substituteBalance(AMOUNT) : null}/>

        <ExchangeBoxField currency={primaryCurrency}
                          handler={this.props.handlerRate}
                          value={this.props.rate.value}
                          error={this.props.rate.error}
                          tooltip="substitute rate"
                          floatingLabelText={secondaryCurrency.toUpperCase() + " Price (" + primaryCurrency.toUpperCase() + ")"}
                          substitute={this.props.substituteRate}/>

        <ExchangeBoxField currency={primaryCurrency}
                          handler={this.props.handlerTotal}
                          tooltip={this.props.order_type == "buy" ? "substitute balance" : null}
                          value={this.props.total.value}
                          error={this.props.total.error}
                          floatingLabelText={"Total (" + primaryCurrency.toUpperCase() + ")"}
                          substitute={this.props.order_type == "buy" ? this.props.substituteBalance(TOTAL) : null}/>

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
              <RaisedButton label={this.props.order_type}
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
    handlerAmount: (event) => dispatch(changeFromAmount(event.target.value)),
    handlerTotal: (event) => dispatch(changeToAmount(event.target.value)),
    handlerRate: (event) => dispatch(changeRate(event.target.value)),
    sendExchange: (pair,
                   order_type,
                   amount,
                   total,
                   price) => dispatch(sendExchange(pair, order_type, amount, total, price)),
    changeMarket: (from_currency, to_currency) => dispatch(replace("/exchange/" + from_currency + "-" + to_currency)),
    substituteRate: () => dispatch(substituteRate()),
    substituteBalance: (field) => () => dispatch(substituteBalance(field)),
    logIn: () => dispatch(logIn()),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeBox);