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
                    <div className={styles.dashboardComponent}>
                        <ExchangeBox />
                    </div>
                    {this.props.accountBox &&
                        <div className={styles.dashboardComponent}>
                            <AccountBox />
                        </div>
                    }
                    <div className={styles.dashboardComponent}>
                        <MarketInfo />
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.dashboardComponent}>
                        <ExchangeListBox />
                    </div>
                    <div className={styles.dashboardComponent}>
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
