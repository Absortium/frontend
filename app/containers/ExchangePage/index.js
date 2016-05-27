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
import MarketInfo from "components/MarketInfo";
import ExchangeOffers from "components/ExchangeOffers";
import LastExchanges from "components/LastExchanges";
import styles from "./styles.css";


var btc_market_data = [
    {
        'coin': 'ETH',
        'volume': 78615231.12,
        'price': 0.254547166514305,
        'change': 3.14,
        'exchange': 100

    },
    {
        'coin': 'USDT',
        'volume': 78615231.12,
        'price': 0.254547166514305,
        'change': 3.14,
        'exchange': 100

    }
];

var eth_market_data = [
    {
        'coin': 'BTC',
        'volume': 1615231.12,
        'price': 14.1254547166514305,
        'change': 1.55,
        'exchange': 10

    },
    {
        'coin': 'USDT',
        'volume': 78615231.12,
        'price': 0.254547166514305,
        'change': 3.14,
        'exchange': 100

    }
];

export class ExchangePage extends React.Component {
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <div>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={5}>
                                    <LastExchanges from="BTC"
                                                   to="ETH"/>
                                </Col>
                                <Col xs={5}>
                                    <ExchangeBox fee="0.25"
                                                 price="0.219378176"
                                                 balance="1.1123987"
                                                 from="BTC"
                                                 to="ETH"/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={10}>
                                    <ExchangeOffers from="BTC"
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
                                <Col xs={10}>
                                    <MarketInfo
                                        currency="BTC"
                                        data={btc_market_data}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={10}>
                                    <MarketInfo
                                        currency="ETH"
                                        data={eth_market_data}/>
                                </Col>
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
