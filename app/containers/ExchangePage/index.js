/*
 *
 * ExchangePage
 *
 */

import React from "react";
import { connect } from "react-redux";
import ExchangeBox from "containers/ExchangeBox";
import MarketInfo from "containers/MarketInfo";
import ExchangeOffers from "containers/ExchangeOffers";
import WithdrawalDialog from "containers/WithdrawalDialog";
import AccountBox from "containers/AccountBox";
import ExchangeListBox from "containers/ExchangeListBox";
import styles from "./styles.css";
import { createSelector } from "reselect";
import { selectAccountBoxDomain } from "containers/AccountBox/selectors";

export class ExchangePage extends React.Component {
    render() {
        console.log(this.props);
        return (
            <main className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.dashboardComponent}>
                        <ExchangeBox />
                    </div>
                    <div className={styles.dashboardComponent}>
                        {this.props.isAccountLoaded &&
                            <AccountBox />
                        }
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

export default connect(createSelector(
    selectAccountBoxDomain(),
    (account) => ({ isAccountLoaded: account.isAccountLoaded })
), mapDispatchToProps)(ExchangePage);
