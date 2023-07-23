import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetPostQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../../../services/PostServices/Post"

const RTK_Post = () => {
  const { data, isLoading, error } = useGetPostQuery()

  const [deletePost] = useDeletePostMutation()

  useEffect(() => {
    if (error) {
      toast.error("something went wrong")
    }
  }, [error])

  if (isLoading) {
    return <div>Loading ...</div>
  }
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this contact")) {
      await deletePost(id)
      toast.success("Contact deleted")
    }
  }
  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <Link to="/addPost">
          <button className="btn btn-add">Add contact</button>
        </Link>
        <br />
        <br />
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Id</th>
              <th style={{ textAlign: "center" }}>UserId</th>
              <th style={{ textAlign: "center" }}>Title</th>
              <th style={{ textAlign: "center" }}>Body</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: any) => {
              return (
                <tr className="key" key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.userId}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>
                    <Link to={`/editPost/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/detailPost/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RTK_Post
