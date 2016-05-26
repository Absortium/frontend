/**
 *
 * ExchangeBox
 *
 */

import React from "react";
import styles from "./styles.css";
import Paper from "material-ui/Paper";

const style = {
    width: '100%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};


class ExchangeBox extends React.Component {
    render() {
        return (
            <div className={ styles.exchangeBox }>
                <Paper style={style} zDepth={2}> EXCHANGE BOX</Paper>
            </div>
        );
    }
}

export default ExchangeBox;
