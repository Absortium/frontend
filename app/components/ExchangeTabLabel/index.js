/**
 *
 * ExchangeTabLabel
 *
 */
import React from "react";
import Subheader from "material-ui/Subheader";

class ExchangeTabLabel extends React.Component {
    render() {
        return (
            <Subheader>
                {this.props.text}
            </Subheader>

        );
    }


}

export default ExchangeTabLabel;


