import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {routes} from './routes/index'
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
function App() {

  return (
    <div>
      <DefaultComponent />
      <Router>
        <Routes>
          {
            routes.map(route => {
              const Page = route.page
              return (<Route path={route.path} element={<Page />} />)
            })
          }
          
        </Routes>
      </Router>
    </div>
  )
}


export default App