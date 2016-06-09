/**
 *
 * ToAmount
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import CryptoIcon from "components/CryptoIcon";
import {
    convertable,
    getErrorText
} from "../../utils/general";


const styles = {
    div: {
        height: "80px"
    },
    icon: {
        verticalAlign: "top",
        marginTop: "37px",
        marginRight: "5px",
        marginLeft: "40px"
    }
};

class ToAmount extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);
        let amount = this.props.amount;

        return (
            <div style={styles.div}>
                <CryptoIcon style={styles.icon} icon={this.props.currency}/>{' '}
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
