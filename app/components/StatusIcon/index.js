/**
 *
 * StatusIcon
 *
 */

import React from "react";
import PendingIcon from "material-ui/svg-icons/av/av-timer";
import CompletedIcon from "material-ui/svg-icons/action/done";

class StatusIcon extends React.Component {
    render() {
        return (
            <div>
                {this.props.status == "completed" ?
                    <CompletedIcon/>
                    :
                    <PendingIcon/>
                }
            </div>
        );
    }
}

export default StatusIcon;
