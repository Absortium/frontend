/**
 *
 * FromAmountField
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    isEmpty,
    deconvert
} from "utils/general";


class FromAmount extends React.Component {
    render() {
        let amount = this.props.amount;
        if (!isEmpty(amount)) {
            amount = deconvert(amount);
        }

        return (
            <div>
                <CryptoIcon icon={this.props.currency}/>{' '}
                <TextField
                    floatingLabelText={"Amount of " + this.props.currency.toUpperCase() + " you want to sell"}
                    floatingLabelFixed={true}
                    type="Decimal"
                    onChange={this.props.handler}
                    value={amount}
                />
                <br />
            </div>
        );
    }
}

export default FromAmount;
