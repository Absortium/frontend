/**
 *
 * Header
 *
 */

import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import styles from "./styles.css";

export default class Header extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup className={styles.toolbar}>
                    <FlatButton label="EXCHANGE"/>
                    <ToolbarSeparator />
                    <FlatButton label="SETTINGS"/>
                    <ToolbarSeparator/>
                    <RaisedButton label="LOG IN" primary={true}/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default Header;







