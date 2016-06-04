/**
 *
 * MarketInfo
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectMarketInfo from "./selectors"
import MarketInfoBox from "components/MarketInfoBox";
import {Row, Col} from "react-flexbox-grid";

export class MarketInfo extends React.Component {
    render() {
        let infos = null;
        if (this.props.marketInfoLoaded) {
            infos = Object.keys(this.props.marketInfo).map(function (currency) {
                let info = this.props.marketInfo[currency];
                if (info != null) {
                    return <MarketInfoBox currency={currency} info={info}/>
                }
            }, this);
        }

        return (
            <Col xs={12}>
                <Row center="xs">
                    <Col xs={10}>
                        <div>
                            {infos}
                        </div>
                    </Col>
                </Row>
            </Col>
        )
    }
}

const mapStateToProps = selectMarketInfo();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfo);
