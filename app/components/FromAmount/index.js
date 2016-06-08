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
    deconvert,
    convertable
} from "utils/general";
import {
    FIELD_NOT_VALID,
    FIELD_IS_REQUIRED
} from "containers/ExchangeBox/constants";


class FromAmount extends React.Component {
    render() {
        let errorText;
        let amount = this.props.amount;
        if (this.props.error == FIELD_NOT_VALID) {
            errorText = "This field is not valid";
        } else if (this.props.error == FIELD_IS_REQUIRED) {
            errorText = "This field is required";
        } else {
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
                    errorText={errorText}
                    value={amount}
                />
                <br />
            </div>
        );
    }
}

export default FromAmount;
