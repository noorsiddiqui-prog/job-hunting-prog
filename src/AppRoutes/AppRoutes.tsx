import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PostPage from "../Pages/PostPages/PostPage"
import RTK_Post from "../components/PostComp/RTK_Post/RTK_Post"
import RTK_Add_Post from "../components/PostComp/RTK_Post/RTK_Detail_Post"
import RTK_Edit_Post from "../components/PostComp/RTK_Post/RTK_Edit_Post"
import RTK_Detail_Post from "../components/PostComp/RTK_Post/RTK_Detail_Post"

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<PostPage/>} /> */}
        <Route path="/" element={<RTK_Post />} />
        <Route path="/detailPost/:id" element={<RTK_Detail_Post />} />
        <Route path="/editPost/:id" element={<RTK_Edit_Post />} />
        <Route path="/addPost" element={<RTK_Edit_Post />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
