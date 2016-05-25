/**
 *
 * ExchangeBox
 *
 */

import React from "react";
import styles from "./styles.css";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";


class ExchangeBox extends React.Component {
    render() {
        return (
            <div className={ styles.exchangeBox }>
                <Card>
                    <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions expandable={true}>
                        <FlatButton label="Action1"/>
                        <FlatButton label="Action2"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default ExchangeBox;
