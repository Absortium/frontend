/**
 *
 * Footer
 *
 */

import React from "react";
import FlatButton from "material-ui/FlatButton";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import styles from "./styles.css";

export default class Footer extends React.Component {
    render() {
        return (
            <Toolbar className={styles.toolbarBox}>
                <ToolbarGroup className={styles.toolbar}>
                    <FlatButton label="CONTACTS"/>
                    <ToolbarSeparator className={styles.separator}/>
                    <FlatButton label="ABOUT"/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default Footer;







