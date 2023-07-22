import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostPage from '../Pages/PostPages/PostPage'

const AppRoutes:React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<PostPage/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes