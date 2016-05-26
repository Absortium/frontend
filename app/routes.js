// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import {getHooks} from "./utils/hooks";

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    // create reusable async injectors using getHooks factory
    const {injectReducer, injectSagas} = getHooks(store);

    return [
        {
            path: '/',
            name: 'exchange',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/ExchangePage/reducer'),
                    System.import('containers/ExchangePage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('exchange', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        }
    ];
}
