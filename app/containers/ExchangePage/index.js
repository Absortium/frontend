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
            <div className={styles.main}>
                <div className={styles.content}>
                    <WithdrawalDialog />

                    <Col xs={12}>
                        <Row center="xs">
                            <Col xsOffset={2} xs={3}>
                                <ExchangeBox />
                            </Col>
                            <Col xs={3}>
                                <Row left="xs">
                                    <Col xs={12}>
                                        <AccountBox />
                                    </Col>
                                </Row>
                                <Row left="xs">
                                    <Col xs={12}>
                                        <MarketInfo />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row center="xs">
                            <Col xsOffset={2} xs={4}>
                                <ExchangeListBox />
                            </Col>
                            <Col xs={4}>
                                <ExchangeOffers />
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(ExchangePage);
