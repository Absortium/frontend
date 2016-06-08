/**
 *
 * ToAmount
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    cut,
    convertable,
    getErrorText
} from "../../utils/general";



class ToAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);
        let amount = this.props.amount;
        
        if (errorText == null) {
            console.log(amount);
            amount = cut(amount);
        }


        return (
            <div>
                <CryptoIcon icon={this.props.currency}/>{' '}
                <TextField
                    floatingLabelText={"Amount of " + this.props.currency.toUpperCase() + " you want to buy"}
                    floatingLabelFixed={true}
                    type="number"
                    min={0}
                    onChange={this.props.handler}
                    errorText={errorText}
                    value={amount}/>
            </div>
        );
    }
}

export default ToAmount;
