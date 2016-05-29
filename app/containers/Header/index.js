/*
 *
 * Header
 *
 */

import React from "react";
import {connect} from "react-redux";
import selectHeader from "./selectors";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import styles from "./styles.css";
import {logIn, logOut} from "./actions";
import Auth0Lock from "auth0-lock";

export default class Header extends React.Component {
    componentWillMount() {
        this.lock = new Auth0Lock('JmIrPzSo0nixk13ohk8KeQC2OZ7LByRI', 'absortium.auth0.com');
    }

    logIn() {
        var component = this;
        component.lock.show(function (err, profile, token) {
            if (err) {
                console.log("Error signing in", err);
            } else {
                component.props.logIn(token, profile)
            }
        })
    }

    logOut() {
        this.props.logOut()
    }

    render() {
        var Button;
        if (this.props.token === null) {
            Button = <RaisedButton onMouseDown={() => this.logIn()} label="LOG IN" primary={true}/>
        } else {
            Button = <RaisedButton onMouseDown={() => this.logOut()} label="LOG OUT" primary={true}/>
        }

        return (
            <Toolbar>
                <ToolbarGroup className={styles.toolbar}>
                    <FlatButton label="EXCHANGE"/>
                    <ToolbarSeparator />
                    <FlatButton label="SETTINGS"/>
                    <ToolbarSeparator/>
                    {Button}
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = selectHeader();

function mapDispatchToProps(dispatch) {
    return {
        logIn: (token, profile) => dispatch(logIn(token, profile)),
        logOut: () => dispatch(logOut()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
