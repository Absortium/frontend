/**
 *
 * Rate
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import ForwardTenIcon from "material-ui/svg-icons/av/forward-10";
import {
    FIELD_NOT_VALID,
    FIELD_IS_REQUIRED
} from "containers/ExchangeBox/constants";

const styles = {
    middleIcon: {
        width: 36,
        height: 36,
    }
};

class Rate extends React.Component {
    render() {
        let errorText;
        if (this.props.error == FIELD_NOT_VALID) {
            errorText = "This field is not valid";

        } else if (this.props.error == FIELD_IS_REQUIRED) {
            errorText = "This field is required";
        }

        return (
            <div>
                <Badge
                    badgeStyle={{top: 12, right: 12}}
                    badgeContent={4}
                    primary={true}>
                    <ForwardTenIcon style={styles.middleIcon}/>
                </Badge>
                <TextField
                    floatingLabelText="Price (Rate) of the exchange"
                    floatingLabelFixed={true}
                    type="number"
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
