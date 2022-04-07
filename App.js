import React from 'react'

// UI UX
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components'

// Redux third party
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appsReducer from './redux/index';

// pages
import Home from './src'

export default function App() {

  const store = createStore(appsReducer)
  
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <Home />
      </Provider>
    </ApplicationProvider>
  )
}