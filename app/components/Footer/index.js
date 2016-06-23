/**
 *
 * Footer
 *
 */

import React from "react";
import FlatButton from "material-ui/FlatButton";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import styles from "./styles.css";


const separator = {
    "marginLeft": "0px"
};

export default class Footer extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup className={styles.toolbar}>
                    <FlatButton label="CONTACTS"/>
                    <ToolbarSeparator style={separator}/>
                    <FlatButton label="ABOUT"/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default Footer;







