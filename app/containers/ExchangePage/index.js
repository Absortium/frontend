/*
 *
 * ExchangePage
 *
 */

import React from "react";
import { connect } from "react-redux";
import {
    Row,
    Col
} from "react-flexbox-grid";
import ExchangeBox from "containers/ExchangeBox";
import MarketInfo from "containers/MarketInfo";
import ExchangeOffers from "containers/ExchangeOffers";
import WithdrawalDialog from "containers/WithdrawalDialog";
import AccountBox from "containers/AccountBox";
import ExchangeListBox from "containers/ExchangeListBox";
import styles from "./styles.css";

export class ExchangePage extends React.Component {
    render() {
        return (
            <main className={styles.main}>
                <div className={styles.block}>
                    <div style={ {width: '30%'} }>
                        <ExchangeBox />
                    </div>
                    {this.props.accountBox &&
                        <div style={ {width: '30%'} }>
                            <AccountBox />
                        </div>
                    }
                    <div style={ {width: '30%'} }>
                        <MarketInfo />
                    </div>
                </div>
                <div className={styles.block}>
                    <div>
                        <ExchangeListBox />
                    </div>
                    <div>
                        <ExchangeOffers />
                    </div>
                </div>
                <WithdrawalDialog />
            </main>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(
  state => ({ accountBox: state.accountBox}),
  mapDispatchToProps
)(ExchangePage);
