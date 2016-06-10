/**
 *
 * MarketInfo
 *
 */

import React from "react";
import { connect } from "react-redux";
import { replace } from 'react-router-redux';
import selectMarketInfo from "./selectors";
import MarketInfoBox from "components/MarketInfoBox";
import {
    Row,
    Col
} from "react-flexbox-grid";
import {
    Tabs,
    Tab
} from "material-ui/Tabs";
import CryptoIcon from "components/CryptoIcon";
import Paper from "material-ui/Paper";
import { convertCurrencyName } from "../../utils/general";

const styles = {
    block: {
        width: "100%",
        margin: "20px",
        textAlign: "center",
        display: "inline-block"
    }
};

export class MarketInfo extends React.Component {
    render() {
        return (
            <div>
                { this.props.marketInfoLoaded ?
                    <Paper style={styles.block} zDepth={2}>
                        <Tabs>
                            {
                                Object.keys(this.props.marketInfo).map(function (currency) {
                                    let info = this.props.marketInfo[currency];

                                    if (info != null) {
                                        return <Tab icon={<CryptoIcon icon={currency}/>}
                                                    label={convertCurrencyName(currency)}>
                                            <MarketInfoBox currency={currency} changeMarket={this.props.changeMarket} info={info}/>
                                        </Tab>
                                    }
                                }, this)
                            }
                        </Tabs>
                    </Paper>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = selectMarketInfo();

function mapDispatchToProps(dispatch) {
    return {
        changeMarket: (from_currency, to_currency) => dispatch(replace("/exchange/" + from_currency + "-" + to_currency)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfo);
