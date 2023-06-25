import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { createBreakpoints} from '@material-ui/core/styles/createBreakpoints';
import { SortContextProvider } from './Sortcontext';
    
const breakpointValues = {
  xs: 375,
  sm: 600,
  md: 820,
  lg: 1194,
  xl: 1536,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });


const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));



ReactDOM.render(
  <SortContextProvider>

  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  </SortContextProvider>
,
  document.getElementById('root'),
  
 
);
