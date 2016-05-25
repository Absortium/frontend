/*
 *
 * ExchangePage
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectExchangePage from "./selectors";
import styles from "./styles.css";

export class ExchangePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={ styles.exchangePage }>
                This is ExchangePage container !
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
