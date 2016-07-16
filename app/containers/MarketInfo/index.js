/**
 *
 * MarketInfo
 *
 */

import React from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import selectMarketInfo from "./selectors";
import MarketTabContent from "components/MarketTabContent";
import MarketTabLabel from "components/MarketTabLabel";
import {
    Tabs,
    Tab
} from "material-ui/Tabs";
import Paper from "material-ui/Paper";


const styles = {
    block: {
        width: '100%',
        textAlign: "center",
        display: "inline-block"
    },

    tab: {
        backgroundColor: "#E8E8E8",
        textTransform: "capitalize"

    }
};


class MarketInfo extends React.Component {
    getActiveTab = () => {
        let index = 0;
        for (let from_currency in this.props.marketInfo) {
            if (from_currency == this.props.to_currency) {
                break;
            } else {
                index += 1;
            }
        }
        
        return index;
    };
    
    render() {

        

        return (
            <div>
                { this.props.marketInfoLoaded ?
                    <Paper style={styles.block} zDepth={2}>
                        <Tabs initialSelectedIndex={this.getActiveTab()}>
                            {
                                Object.keys(this.props.marketInfo).map(function (currency) {
                                    let info = this.props.marketInfo[currency];

                                    if (info != null) {
                                        return <Tab key={currency}
                                                    label={<MarketTabLabel currency={currency}/>}
                                                    style={styles.tab}>
                                            <MarketTabContent currency={currency} 
                                                              changeMarket={this.props.changeMarket}
                                                              info={info}/>
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

export default MarketInfo;

const mapStateToProps = selectMarketInfo();

function mapDispatchToProps(dispatch) {
    return {
        changeMarket: (from_currency, to_currency) => dispatch(replace("/order/" + from_currency + "-" + to_currency)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfo);
