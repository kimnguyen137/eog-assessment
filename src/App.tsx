import React from 'react';
import {
  ApolloProvider,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import { store } from './store';
import { Dashboard } from './Features/Chart/Dashboard';
import { client } from './graphql-client';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Wrapper>
          <Dashboard />
          <ToastContainer />
        </Wrapper>
      </ApolloProvider>

    </Provider>
  </MuiThemeProvider>
);

export default App;
