/**
 *
 * DepositDialog
 *
 */

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {
    Card,
    CardMedia,
    CardText
} from "material-ui/Card";


const styles = {
    dialog: {
        width: "30em"
    },
    cardtext: {
        textAlign: "center",
        fontSize: "1.2em"

    }
};


class DepositDialog extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.closeHandler}
            />
        ];

        return (
            <Dialog modal={false}
                    open={this.props.open}
                    contentStyle={styles.dialog}
                    onRequestClose={this.props.closeHandler}>
                <Card>
                    <CardMedia>
                        <img src="http://blog.qr4.nl/images/QR-Cube-4.jpg"/>
                    </CardMedia>
                </Card>
                <br/>
                <Card>
                    <CardText style={styles.cardtext}>
                        {this.props.address}
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}

export default DepositDialog;
