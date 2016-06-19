/**
 *
 * StatusIcon
 *
 */

import React from "react";
import PendingIcon from "material-ui/svg-icons/av/av-timer";
import CompletedIcon from "material-ui/svg-icons/action/done";

const styles = {
    completed: {
        fontSize: "10px",
        width: "2.5em",
        height: "2.5em",
        backgroundColor: "#9CD689",
        borderRadius: "1em"
    },

    pending: {
        fontSize: "10px",
        width: "2.5em",
        height: "2.5em",
        backgroundColor: "#FFCC33",
        borderRadius: "1em"
    }
};

class StatusIcon extends React.Component {
    render() {
        return (
            <div>
                {this.props.status == "completed" ?
                    <CompletedIcon style={styles.completed}/>
                    :
                    <PendingIcon style={styles.pending}/>
                }
            </div>
        );
    }
}

export default StatusIcon;
