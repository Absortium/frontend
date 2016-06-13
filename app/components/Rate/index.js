/**
 *
 * Rate
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import { getErrorText } from "utils/general";
import CryptoIcon from "components/CryptoIcon";

const styles = {
    div: {
        height: "6em",
        marginLeft: "4em",
        marginRight: "3em"
    },
    textField: {
        width: "15em"
    },
    icon: {
        verticalAlign: "top",
        marginTop: "2em"
    },
    errorStyle: {
        color: "#E87272"
    }
};
class Rate extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);

        return (
            <div style={styles.div}>
                <TextField
                    floatingLabelText={"Price for 1 " + this.props.from_currency.toUpperCase() + " in " + this.props.to_currency.toUpperCase()}
                    floatingLabelFixed={true}
                    errorText={errorText}
                    style={styles.textField}
                    errorStyle={styles.errorStyle}
                    type="number"
                    min={0}
                    step={0.01}
                    value={this.props.rate}
                    onChange={this.props.handler}
                />
                <CryptoIcon style={styles.icon} icon={this.props.to_currency}/>
                <br />
            </div>
        );
    }
}

export default Rate;
