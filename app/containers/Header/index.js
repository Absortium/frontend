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
import {logIn, logOut} from "containers/App/actions";

export default class Header extends React.Component {

    render() {
        var Button;
        if (this.props.isAuthenticated) {
            Button = <RaisedButton onMouseDown={() => this.props.logOut()} label="LOG OUT" primary={true}/>
        } else {
            Button = <RaisedButton onMouseDown={() => this.props.logIn()} label="LOG IN" primary={true}/>
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
        logIn: () => dispatch(logIn()),
        logOut: () => dispatch(logOut()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
