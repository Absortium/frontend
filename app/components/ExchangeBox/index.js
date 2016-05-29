/**
 *
 * ExchangeBox
 *
 */

import React from "react";
import Paper from "material-ui/Paper";
import {Row, Col} from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import ForwardTenIcon from "material-ui/svg-icons/AV/forward-10";
import CryptoIcon from "components/CryptoIcon";
import Subheader from "material-ui/Subheader";


const styles = {
    block: {
        width: '100%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    smallIcon: {
        width: "30",
        height: "30",
    },

    middleIcon: {
        width: 36,
        height: 36,
    },
    small: {
        width: 72,
        height: 72,
    }
};


class ExchangeBox extends React.Component {

    render() {
        return (
            <div className={styles.exchangeBox}>
                <Paper style={styles.block} zDepth={2}>
                    <div>
                        <br />
                        <Subheader>
                            {"Balance: " + this.props.balance + "  "}
                            <CryptoIcon icon={this.props.from}/>{' '}
                        </Subheader>
                        <RaisedButton label="deposit" primary={true}/>{' '}{' '}{' '}
                        <RaisedButton label="withdraw" primary={true}/>
                        <br />
                        <br />
                        <Divider />

                        <Badge
                            badgeStyle={{top: 12, right: 12}}
                            badgeContent={4}
                            primary={true}>
                            <ForwardTenIcon style={styles.middleIcon}/>
                        </Badge>
                        <TextField
                            floatingLabelText="Price (Rate) of the exchange"
                            floatingLabelFixed={true}
                            type="number"/>
                        <br />

                        <CryptoIcon icon={this.props.from}/>{' '}
                        <TextField
                            floatingLabelText={"Amount of " + this.props.from + " you want to sell"}
                            floatingLabelFixed={true}
                            type="number"/>
                        <br />

                        <CryptoIcon icon={this.props.to}/>{' '}
                        <TextField
                            floatingLabelText={"Amount of " + this.props.to + " you want to buy"}
                            floatingLabelFixed={true}
                            type="number"/>
                        <br />

                        <br />
                        <RaisedButton label="Exchange" primary={true}/>

                        <br />
                        <br />
                        <Divider />
                        <br />

                    </div>
                </Paper>
            </div>
        )
            ;
    }
}

export default ExchangeBox;
