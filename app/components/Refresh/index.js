/**
 *
 * Refresh
 *
 */

import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";

const styles = {
    refresh: {
        display: "inherit",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto"
    }
};

class Refresh extends React.Component {
    render() {
        return (
            <div>
                <br />
                <RefreshIndicator
                    size={70}
                    top={0}
                    left={0}
                    status="loading"
                    style={styles.refresh}
                />
                <br />
            </div>
        );
    }
}

export default Refresh;
