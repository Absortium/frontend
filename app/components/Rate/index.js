/**
 *
 * Rate
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import { getErrorText } from "utils/general";


const styles = {
    div: {
        height: "5em",
        marginLeft: "3em",
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
                    floatingLabelText="Price (Rate) of the exchange"
                    floatingLabelFixed={true}
                    errorText={errorText}
                    style={styles.textField}
                    errorStyle={styles.errorStyle}
                    type="number"
                    min={0}
                    value={this.props.rate}
                    onChange={this.props.handler}
                />
                <br />
            </div>
        );
    }
}

export default Rate;
