/*
 *
 * ExchangePage
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectExchangePage from "./selectors";
import {Row, Col} from "react-flexbox-grid";
import ExchangeBox from "components/ExchangeBox";
import ExchangeOffers from "components/ExchangeOffers";
import styles from "./styles.css";

export class ExchangePage extends React.Component {
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <div>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={7}>
                                    <ExchangeOffers from="BTC"
                                                    to="ETH"/>
                                </Col>
                                <Col xs={5}>
                                    <ExchangeBox fee="0.25"
                                                 price="0.219378176"
                                                 from="BTC"
                                                 to="ETH"/>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </div>
                <div className={styles.market}>
                    <div>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={10}> SEARCH BAR <p>ANOTHER THING</p></Col>
                            </Row>
                        </Col>

                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={10}> BTC INFO </Col>
                            </Row>
                        </Col>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = selectExchangePage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);
