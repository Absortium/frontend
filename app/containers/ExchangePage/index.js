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
import AccountBox from "containers/AccountBox";
import LastExchanges from "components/LastExchanges";
import styles from "./styles.css";
import CircularProgress from "material-ui/CircularProgress";
import {
    logIn,
    marketChanged
} from "containers/App/actions";

const history = [
    { 'amount': 0.34269322, 'price': 0.25454716},
    { 'amount': 0.92768501, 'price': 0.36552912},
    { 'amount': 0.97495911, 'price': 0.41704308},
    { 'amount': 0.41348703, 'price': 0.31727511},
    { 'amount': 0.63994097, 'price': 0.53285475},
    { 'amount': 0.77036006, 'price': 0.61985821},
    { 'amount': 0.15355616, 'price': 0.77162296},
    { 'amount': 0.44676139, 'price': 0.76318684},
    { 'amount': 0.94544444, 'price': 0.41629236},
    { 'amount': 0.94468284, 'price': 0.54931952},
    { 'amount': 0.18548095, 'price': 0.76290054},
    { 'amount': 0.25112337, 'price': 0.73801414},
    { 'amount': 0.88087109, 'price': 0.51386763},
    { 'amount': 0.55772024, 'price': 0.99729461},
    { 'amount': 0.05663941, 'price': 0.99123404},
    { 'amount': 0.89483531, 'price': 0.87582768},
    { 'amount': 0.69610386, 'price': 0.56927646},
    { 'amount': 0.32955509, 'price': 0.47424472},
    { 'amount': 0.93375975, 'price': 0.23976491},
    { 'amount': 0.40490166, 'price': 0.98660044}];

export class ExchangePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: history,
            from_currency: null,
            to_currency: null
        }
    };

    componentWillMount() {
        var { from_currency, to_currency } = this.props.params;

        this.setState({
            from_currency: from_currency,
            to_currency: to_currency
        });
    };

    render() {

        var from_currency = this.state.from_currency;
        var to_currency = this.state.to_currency;

        var history = this.state.history;

        var drawLastExchanges = !(history === null);
        var lastExchanges = <CircularProgress size={1.5}/>;
        if (drawLastExchanges) {
            lastExchanges = <LastExchanges from={from_currency}
                                           to={to_currency}
                                           history={history}/>
        }


        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <div>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={4}>
                                    {lastExchanges}
                                </Col>
                                <Col xs={4}>
                                    <ExchangeBox />
                                </Col>
                                <Col xs={4}>
                                    <ExchangeOffers />
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </div>
                <div className={styles.market}>
                    <Col xs={12}>
                        <Row center="xs">
                            <Col xs={8}>
                                <AccountBox />
                            </Col>
                        </Row>
                        <Row center="xs">
                            <Col xs={8}>
                                <MarketInfo />
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
