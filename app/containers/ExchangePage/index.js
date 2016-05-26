/*
 *
 * ExchangePage
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectExchangePage from "./selectors";
import "flexboxgrid/css/flexboxgrid.css";
const {Grid, Row, Col} = require('react-flexbox-grid');


export class ExchangePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={3}>Hello, world!</Col>
                </Row>
            </Grid>
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
