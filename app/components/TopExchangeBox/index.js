/**
 *
 * UpperExchangeBox
 *
 */

import React from "react";
import DepositIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-downward";
import WithdrawIcon from "../../../node_modules/material-ui/svg-icons/navigation/arrow-upward";
import FloatingActionButton from "material-ui/FloatingActionButton";


const styles = {
    depositButton: {
        backgroundColor: "#9CD689",
        marginRight: "280px"
    },
    icon: {
        backgroundColor: "block"
    },

    withdrawButton: {
        backgroundColor: "#E87272"
    }
};

class TopExchangeBox extends React.Component {
    render() {
        return (
            <div>
                <br />

                <FloatingActionButton
                    style={styles.depositButton}
                    backgroundColor={styles.depositButton.backgroundColor}>
                    <DepositIcon style={styles.icon}/>
                </FloatingActionButton>

                <FloatingActionButton
                    style={styles.withdrawButton}
                    backgroundColor={styles.withdrawButton.backgroundColor}>
                    <WithdrawIcon style={styles.icon}/>
                </FloatingActionButton>
            </div>
        );
    }
}

export default TopExchangeBox;
