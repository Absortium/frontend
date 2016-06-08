/**
 *
 * Rate
 *
 */

import React from "react";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import ForwardTenIcon from "material-ui/svg-icons/av/forward-10";


const styles = {
    middleIcon: {
        width: 36,
        height: 36,
    }
};

class Rate extends React.Component {
    render() {
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
                    type="Decimal"
                    onChange={this.props.handler}
                    value={this.props.rate}
                />
                <br />
            </div>
        );
    }
}

export default Rate;
