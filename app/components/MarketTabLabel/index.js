/**
 *
 * Label
 *
 */

import React from "react";
import CryptoIcon from "components/CryptoIcon";
import { convertCurrencyName } from "../../utils/general";
import Subheader from "material-ui/Subheader";

class MarketTabLabel extends React.Component {
    render() {
        return (
            <Subheader>
                {convertCurrencyName(this.props.currency)} <CryptoIcon icon={this.props.currency}/>
            </Subheader>

        );
    }


}

export default MarketTabLabel;
