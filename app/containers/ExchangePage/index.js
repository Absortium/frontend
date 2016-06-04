/*
 *
 * ExchangePage
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectExchangePage from "./selectors";
import {Row, Col} from "react-flexbox-grid";
import ExchangeBox from "containers/ExchangeBox";
import MarketInfo from "containers/MarketInfo";
import ExchangeOffers from "components/ExchangeOffers";
import LastExchanges from "components/LastExchanges";
import styles from "./styles.css";
import axios from "axios";
import CircularProgress from "material-ui/CircularProgress";
import {logIn, marketChanged} from "containers/App/actions";

const marketinfo = {
    'btc': {
        "eth": {
            'rate': '123.000000',
            'rate_24h_max': '123.1230000000',
            'rate_24h_min': '234.00234000000',
            'volume_24h': '756.120000000'
        },
        "usdt": {
            'rate': '26.17654',
            'rate_24h_max': '784.229',
            'rate_24h_min': '0.00000000',
            'volume_24h': '0.00000000'
        }
    },
    'eth': {
        "btc": {
            'rate': '23.7654',
            'rate_24h_max': '0.00000000',
            'rate_24h_min': '0.00000000',
            'volume_24h': '722.234234'
        },
        "usdt": {
            'rate': '24324.23234',
            'rate_24h_max': '0.00000000',
            'rate_24h_min': '0.00000000',
            'volume_24h': '223.7978'
        }
    },
    'usdt': {
        "btc": {
            'rate': '21345.2343',
            'rate_24h_max': '0.00000000',
            'rate_24h_min': '0.00000000',
            'volume_24h': '22.234657'
        },
        "eth": {
            'rate': '2334.5434',
            'rate_24h_max': '0.00000000',
            'rate_24h_min': '0.00000000',
            'volume_24h': '435.2378'
        }
    }
};

const offers = [
    {'amount': 0.3426930378589339, 'price': 0.254547166514305},
    {'amount': 0.927685008594914, 'price': 0.3655291233387701},
    {'amount': 0.9749591122132907, 'price': 0.41704308481759744},
    {'amount': 0.413487034194706, 'price': 0.3172751009355921},
    {'amount': 0.6399409799581931, 'price': 0.5328547585861084},
    {'amount': 0.7703600663057, 'price': 0.6198582021746949},
    {'amount': 0.1535561678000038, 'price': 0.771622965162549},
    {'amount': 0.4467613971670866, 'price': 0.7631868412694859},
    {'amount': 0.9454444439306686, 'price': 0.41629236878868603},
    {'amount': 0.9446828482586664, 'price': 0.549319522091329},
    {'amount': 0.1854809582353696, 'price': 0.7629005453574121},
    {'amount': 0.25112337759478276, 'price': 0.7380141453972009},
    {'amount': 0.8808710901695731, 'price': 0.5138676398026056},
    {'amount': 0.5577202444532305, 'price': 0.997294616769381},
    {'amount': 0.05663940682725821, 'price': 0.9912340442534175},
    {'amount': 0.8948353032080163, 'price': 0.8758276803790845},
    {'amount': 0.6961038654986684, 'price': 0.5692764656502197},
    {'amount': 0.3295550993500569, 'price': 0.4742447209542531},
    {'amount': 0.9337597537491701, 'price': 0.23976490230043657},
    {'amount': 0.40490166565312213, 'price': 0.9866004493342432}];

const history = [
    {'amount': 0.3426930378589339, 'price': 0.254547166514305},
    {'amount': 0.927685008594914, 'price': 0.3655291233387701},
    {'amount': 0.9749591122132907, 'price': 0.41704308481759744},
    {'amount': 0.413487034194706, 'price': 0.3172751009355921},
    {'amount': 0.6399409799581931, 'price': 0.5328547585861084},
    {'amount': 0.7703600663057, 'price': 0.6198582021746949},
    {'amount': 0.1535561678000038, 'price': 0.771622965162549},
    {'amount': 0.4467613971670866, 'price': 0.7631868412694859},
    {'amount': 0.9454444439306686, 'price': 0.41629236878868603},
    {'amount': 0.9446828482586664, 'price': 0.549319522091329},
    {'amount': 0.1854809582353696, 'price': 0.7629005453574121},
    {'amount': 0.25112337759478276, 'price': 0.7380141453972009},
    {'amount': 0.8808710901695731, 'price': 0.5138676398026056},
    {'amount': 0.5577202444532305, 'price': 0.997294616769381},
    {'amount': 0.05663940682725821, 'price': 0.9912340442534175},
    {'amount': 0.8948353032080163, 'price': 0.8758276803790845},
    {'amount': 0.6961038654986684, 'price': 0.5692764656502197},
    {'amount': 0.3295550993500569, 'price': 0.4742447209542531},
    {'amount': 0.9337597537491701, 'price': 0.23976490230043657},
    {'amount': 0.40490166565312213, 'price': 0.9866004493342432}];

const accounts = {
    'btc': {
        'balance': 1.23123
    },
    'eth': {
        'balance': 2.324
    }
};

export class ExchangePage extends React.Component {

    constructor(props) {
        super(props);

        var {from_currency, to_currency} = this.props.params;

        this.state = {
            offers: null,
            history: history,
            marketinfo: {},
            account: null,
            from_currency: null,
            to_currency: null
        }
    };

    componentWillUpdate() {
        console.log("WILL UPDATE")
    }

    componentDidUpdate() {
        console.log("DID UPDATE")
    }

    componentWillMount() {
        var {from_currency, to_currency} = this.props.params;
        this.props.marketChanged(from_currency, to_currency);

        this.setState({
            from_currency: from_currency,
            to_currency: to_currency,
        });

        this.fetchExchangeOffers(from_currency, to_currency);
    };

    fetchExchangeOffers(from_currency, to_currency) {
        var component = this;
        component.setState({offers: null});

        var q = "?";
        q += "from_currency=" + from_currency;
        q += "&to_currency=" + to_currency;

        axios.get('/api/offers/' + q).then(function (response) {
            var results = response['data'];
            console.log("FETCH OFFERS");
            component.setState({offers: results})
        })
    };

    render() {

        var from_currency = this.state.from_currency;
        var to_currency = this.state.to_currency;

        var marketinfo = this.state.marketinfo;
        var rate = null;
        if (marketinfo[from_currency] && marketinfo[from_currency][to_currency]) {
            let info = marketinfo[from_currency][to_currency];
            rate = info.rate;
        }

        var history = this.state.history;
        var offers = this.state.offers;

        var drawLastExchanges = !(history === null);
        var lastExchanges = <CircularProgress size={1.5}/>;
        if (drawLastExchanges) {
            lastExchanges = <LastExchanges from={from_currency}
                                           to={to_currency}
                                           history={history}/>
        }

        var drawExchangeOffers = !(offers === null);
        var exchangeOffers = <CircularProgress size={1.5}/>;
        if (drawExchangeOffers) {
            exchangeOffers = <ExchangeOffers from={from_currency}
                                             to={to_currency}
                                             offers={offers}/>
        }

        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <div>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={5} align="center">
                                    {lastExchanges}
                                </Col>
                                <Col xs={5} align="center">
                                    <ExchangeBox from_currency={from_currency}
                                                 to_currency={to_currency}
                                                 rate={rate}
                                                 account={this.state.account}
                                                 isAuthenticated={this.props.isAuthenticated}
                                                 logIn={this.props.logIn}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row center="xs">
                                <Col xs={10} align="center">
                                    {exchangeOffers}
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </div>
                <div className={styles.market}>
                    <Col xs={12}>
                        <Row center="xs">
                            <Col xs={10} align="center">
                                <MarketInfo />
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        );
    }
}

const mapStateToProps = selectExchangePage();

function mapDispatchToProps(dispatch) {
    return {
        logIn: () => dispatch(logIn()),
        marketChanged: (from_currency, to_currency) => dispatch(marketChanged(from_currency, to_currency)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);
