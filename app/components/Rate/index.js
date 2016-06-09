/**
 *
 * Rate
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import ForwardTenIcon from "material-ui/svg-icons/av/forward-10";
import { getErrorText } from "utils/general";


const styles = {
    div: {
        height: "80px",
    },

    badget: {
        verticalAlign: "top",
        marginTop: "8px"
    },

    middleIcon: {
        width: "36px",
        height: "36px",
    }
};

class Rate extends React.Component {
    render() {
        let errorText = getErrorText(this.props.error);

        return (
            <div style={styles.div}>
                <Badge
                    style={styles.badget}
                    badgeStyle={{top: "12px", right: "12px"}}
                    badgeContent={4}
                    primary={true}>
                    <ForwardTenIcon style={styles.middleIcon}/>
                </Badge>

                <TextField
                    floatingLabelText="Price (Rate) of the exchange"
                    floatingLabelFixed={true}
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
