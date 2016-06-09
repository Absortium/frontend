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
                    style={styles.textField}
                    type="number"
                    min={0}
                    onChange={this.props.handler}
                    errorText={errorText}
                    value={this.props.rate}
                />
                <br />
            </div>
        );
    }
}

export default Rate;
