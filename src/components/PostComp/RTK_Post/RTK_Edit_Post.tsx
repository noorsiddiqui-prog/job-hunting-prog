import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetPostQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../../../services/PostServices/Post"
import useDebounce from "../../../hooks/useDebounce"

interface IEditPost {
  id: number
  userId: number
  title: string
  body: string
}

const initialState: IEditPost = {
  id: 0,
  userId: 0,
  title: "",
  body: "",
}

const RTK_Edit_Post = () => {
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState(initialState)
  const [editMode, setEditMode] = useState(false)
  const [debounceMode, setDebounceMode] = useState(false)

  const [addPost] = useAddPostMutation()
  const [updatePost] = useUpdatePostMutation()

  const { id, userId, title, body } = formValue

  const Param = useParams()
  const ParamId = Param.id

  // const debouncedInput =

  useEffect(() => {
    useDebounce(id || userId || title || body, 500)
  }, [formValue])

  const { data, error } = useGetPostByIdQuery(ParamId!)

  useEffect(() => {
    if (error && ParamId) {
      toast.error("Something went wrong")
    }
  }, [error])

  console.log(data)

  useEffect(() => {
    if (ParamId) {
      setEditMode(true)
      if (data) {
        setFormValue({ ...data })
      }
    } else {
      setEditMode(false)
      setFormValue({ ...initialState })
    }
  }, [id, data])

  const handleInput = (e: any) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!id && !userId && !title && !body) {
      toast.error("Please fill all fields")
    } else {
      if (!editMode) {
        let data = await addPost(formValue)
        if (data) {
          //   navigate("/")
          toast.success("Post added successfully")
        }
      } else {
        let data = await updatePost(formValue)
        if (data) {
          //   navigate("/")
          setEditMode(false)
          toast.success("Post updated successfully")
        }
      }
    }
  }

  return (
    <div>
      {" "}
      <div style={{ marginTop: "100px" }}>
        <form
          action=""
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="userId">Id</label>
          <input
            type="text"
            id="id"
            name="id"
            // placeholder="Enter id.."
            value={id}
            onChange={handleInput}
          />
          <label htmlFor="userId">userId</label>
          <input
            type="text"
            id="userId"
            name="userId"
            // placeholder="Enter userId.."
            value={userId}
            onChange={handleInput}
          />
          <label htmlFor="email">Title</label>
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Enter title.."
            value={title}
            onChange={handleInput}
          />
          <label htmlFor="Body">Body</label>
          <input
            type="text"
            id="body"
            name="body"
            // placeholder="Enter contact no.."
            value={body}
            onChange={handleInput}
          />
          <input type="submit" value={editMode ? "Update" : "Add"} />
        </form>
      </div>
    </div>
  )
}

export default RTK_Edit_Post
