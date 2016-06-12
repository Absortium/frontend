/*
 *
 * Header
 *
 */

import React from "react";
import { connect } from "react-redux";
import selectHeader from "./selectors";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from "material-ui/Toolbar";
import {
    logIn,
    logOut
} from "containers/App/actions";
import Avatar from "material-ui/Avatar";
import Balance from "components/Balance";

const styles = {
    avatar: {
        marginLeft: "0.9em",
        marginTop: "0.45em"
    },


    toolbar: {
        margin: "auto"
    }
};

export default class Header extends React.Component {

    render() {
        return (
            <Toolbar>
                <ToolbarGroup style={styles.toolbar}>
                    <FlatButton label="EXCHANGE"/>
                    <ToolbarSeparator/>

                    {this.props.isAvatarLoaded ?
                        <Avatar src={this.props.avatar}
                                size={40}
                                style={styles.avatar}/>
                        : null
                    }
                    {this.props.isAuthenticated ?
                        <RaisedButton onMouseDown={() => this.props.logOut()} label="LOG OUT" primary={true}/> :
                        <RaisedButton onMouseDown={() => this.props.logIn()} label="LOG IN" primary={true}/>
                    }

                    {this.props.isAccountLoaded ?
                        <ToolbarSeparator />
                        : null
                    }
                    {this.props.isAccountLoaded ?
                        <Balance currency={this.props.from_currency} 
                                 balance={this.props.balance}
                                 address={this.props.address}/>
                        : null
                    }

                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = selectHeader();

function

mapDispatchToProps(dispatch) {
    return {
        logIn: () => dispatch(logIn()),
        logOut: () => dispatch(logOut()),
        dispatch,
    };
}

export
default

connect(mapStateToProps, mapDispatchToProps)

(
    Header
)
;
