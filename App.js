import React from 'react'

// UI UX
import { Provider as PaperProvider } from 'react-native-paper';
// Redux third party
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appsReducer from './redux/index';

// pages
import Home from './src'

export default function App() {

  const store = createStore(appsReducer)
  
  return (
    <PaperProvider>
      <Provider store={store}>
        <Home />
      </Provider>
    </PaperProvider>
  )
}