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
import Header from "containers/Header";
import 'react-redux-toastr/src/less/index.less'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
    cyan500,
    cyan700,
    grey100,
    grey300,
    grey400,
    grey500,
    pinkA200,
    white,
    darkBlack,
    fullBlack
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import injectTapEventPlugin from "react-tap-event-plugin";


// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


import BigNumber from "bignumber.js";
BigNumber.config({ ERRORS: false, DECIMAL_PLACES: 12 });

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: grey500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 100
    }
});

class App extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <Header />
                        {this.props.children}
                        <Footer />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
};

export default App;
