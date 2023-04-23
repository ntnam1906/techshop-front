import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {routes} from './routes/index'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {
            routes.map(route => {
              const Page = route.page
              return (<Route path={route.path} element={<Page />} key={route}/>)
            })
          }
          
        </Routes>
      </Router>
    </div>
  )
}


export default App