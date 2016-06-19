/*
 *
 * ExchangeListBox
 *
 */

import React from "react";
import { connect } from "react-redux";
import selectExchangeListBox from "./selectors";
import Refresh from "components/Refresh";
import AllExchangeTable from "components/AllExchangeTable";
import UserExchangeTable from "components/UserExchangeTable";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader"
import {
    Tabs,
    Tab
} from "material-ui/Tabs";
import ExchangeTabLabel from "components/ExchangeTabLabel";

/**
 *
 * LastExchanges
 *
 */

const styles = {
    block: {
        width: "100%",
        margin: "1.5em",
        textAlign: "center",
        display: "inline-block"
    },

    tab: {
        backgroundColor: "#E8E8E8",
        textTransform: "capitalize"
    },

    subheader: {
        backgroundColor: "#E8E8E8"
    },

    currency: {
        row: {
            width: "4.5em",
            textTransform: "uppercase"
        },
        name: {
            width: "4.5em"
        }
    },

    status: {
        width: "4.5em"
    }
};

class ExchangeListBox extends React.Component {
    render() {
        return (
            <Paper style={styles.block} zDepth={2}>
                { this.props.isAuthenticated ?
                    <Tabs>
                        <Tab label={<ExchangeTabLabel text="All Exchanges"/>}
                             style={styles.tab}>
                            { this.props.isAllExchangesLoaded ?
                                <AllExchangeTable exchanges={this.props.all_exchanges}
                                                  from_currency={this.props.from_currency}
                                                  to_currency={this.props.to_currency}/>
                                :
                                <Refresh />
                            }
                        </Tab>

                        <Tab label={<ExchangeTabLabel text="User Exchanges"/>}
                             style={styles.tab}>
                            { this.props.isUserExchangesLoaded ?
                                <UserExchangeTable exchanges={this.props.user_exchanges}
                                                   from_currency={this.props.from_currency}
                                                   to_currency={this.props.to_currency}/>
                                :
                                <Refresh />
                            }
                        </Tab>
                    </Tabs>
                    :
                    <div>
                        <Subheader style={styles.subheader}>
                            All Exchanges
                        </Subheader>
                        { this.props.isAllExchangesLoaded ?
                            <AllExchangeTable exchanges={this.props.all_exchanges}
                                              from_currency={this.props.from_currency}
                                              to_currency={this.props.to_currency}/>
                            :
                            <Refresh />
                        }
                    </div>
                }
            </Paper>
        )
    }
}

export default ExchangeListBox;

const mapStateToProps = selectExchangeListBox();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeListBox);
