/*
 *
 * ExchangePage
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectExchangePage from "./selectors";
import ExchangeBox from "components/ExchangeBox";
import styles from "./styles.css";

/**
 *
 * Main
 *
 */


export class ExchangePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={ styles.exchangePage }>
                <ExchangeBox />
            </div>
        );
    }
}

const mapStateToProps = selectExchangePage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);
