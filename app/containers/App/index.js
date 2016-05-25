/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import "sanitize.css/sanitize.css";
import Footer from "components/Footer";
import Header from "components/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


function App(props) {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <Header />
                {props.children}
                <Footer />

            </div>
        </MuiThemeProvider>
    );
}

App.propTypes = {
    children: React.PropTypes.node,
};

export default App;
