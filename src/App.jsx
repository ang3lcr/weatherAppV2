import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Card from "./components/Card"
import LoadingScreen from './components/LoadingScreen'

import {useSelector} from  'react-redux'

function App() {
  const isLoading = useSelector(state => state.isLoading)


  return (
    <div className="App">
      {isLoading && <LoadingScreen />}
      <Card />
    </div>
  )
}

export default App
