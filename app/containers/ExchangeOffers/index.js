/**
 *
 * ExchangeOffers
 *
 */

import React from "react";
import Paper from "material-ui/Paper";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { connect } from "react-redux";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Refresh from "components/Refresh";
import selectExchangeOffers from "./selectors";
import { substituteOffer } from "./actions";
import {
  normalize,
  getPrimaryCurrency,
  getSecondaryCurrency,
  reverseOrderType
} from "utils/general";

const styles = {
  block: {
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
  },

  propContainer: {
    width: "200px",
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },

  subheader: {
    backgroundColor: "#E8E8E8"
  }
};

class ExchangeOffers extends React.Component {

  handleRowSelect = (ids) => {
    if (ids.length == 1) {
      let id = ids[0];
      let offer = this.props.offers[id];
      this.props.substituteOffer(offer.amount.toString(), offer.price.toString())
    }
  };

  render() {

    let primaryCurrency = getPrimaryCurrency(this.props.pair);
    let secondaryCurrency = getSecondaryCurrency(this.props.pair);

    let subHeader = reverseOrderType(this.props.order_type).toUpperCase() + " Orders";
    let fromAmountHeader = "Amount (" + secondaryCurrency.toUpperCase() + ")";
    let toAmountHeader = "Total (" + primaryCurrency.toUpperCase() + ")";
    let priceHeader = secondaryCurrency.toUpperCase() + " Price (" + primaryCurrency.toUpperCase() + ")";

    return (
      <div className={styles.exchangeBox}>
        <Paper style={styles.block} zDepth={2}>
          <div>
            <Subheader style={styles.subheader}>
              {subHeader}
            </Subheader>
            <Divider />

            {this.props.offersLoaded ?
              <Table
                height="18.6em"
                fixedHeader={true}
                selectable={true}
                multiSelectable={false}
                onRowSelection={this.handleRowSelect}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>{fromAmountHeader}</TableHeaderColumn>
                    <TableHeaderColumn>{priceHeader}</TableHeaderColumn>
                    <TableHeaderColumn>{toAmountHeader}</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  deselectOnClickaway={true}
                  showRowHover={true}
                  stripedRows={false}>
                  { this.props.offers.map(function (offer) {
                    return (
                      <TableRow hoverable={true}
                                key={offer.price}>
                        <TableRowColumn>{normalize(offer.amount)}</TableRowColumn>
                        <TableRowColumn>{normalize(offer.price)}</TableRowColumn>
                        <TableRowColumn>{normalize(offer.total)}</TableRowColumn>
                      </TableRow>
                    )
                  }, this)}
                </TableBody>
              </Table>
              :
              <Refresh />
            }
          </div>
        </Paper>
      </div>
    );
  }
}

export default ExchangeOffers;

const mapStateToProps = selectExchangeOffers();

function mapDispatchToProps(dispatch) {
  return {
    substituteOffer: (amount, price) => {
      dispatch(substituteOffer(amount, price))
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeOffers);
