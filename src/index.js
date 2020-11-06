import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore, history } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { ConnectedRouter } from 'connected-react-router';
import ApolloProviderWrapper from './ApolloProvider';




// import { loadEvents } from './features/events/eventActions';

const store = configureStore();

// store.dispatch(loadEvents());
// console.log(store.getState());

// Hot Module Replacement for better development experience
const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <ApolloProviderWrapper>
     <Provider store={store}>
       <ConnectedRouter history={history}>
         <ScrollToTop />
         <App />
       </ConnectedRouter>
     </Provider>
    </ApolloProviderWrapper>
    ,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
