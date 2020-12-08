import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Router } from "react-router-dom"
import { Provider } from "react-redux"
// Components import
import history from "utilities/history"
import Page from "page"
import store from "state"

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Router history={history}>
          <Page />
        </Router>
      </Provider>
    </ChakraProvider>
  )
}

export default App
