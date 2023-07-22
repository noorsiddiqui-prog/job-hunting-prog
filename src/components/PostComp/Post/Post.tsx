import React, { useState } from "react"
import { postApi, useGetPostQuery } from "../../../services/PostServices/Post"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button, Typography } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikState,
} from "formik"
import PostForm from "./PostForm"
import * as Yup from "yup"
import { object, string, number, date, InferType } from "yup"

export interface MyFormValues {
  firstName: string
  lastName: string
  address: string
  phoneNo: string
  city: string
  country: string
  dob: Date | undefined
}

const PostSchema = Yup.object({
  firstName: Yup.string()
    .required("Please provide the first name")
    .min(3, "Please provide 3 characters long")
    .max(40, "Body is too long, only 40 characters are allowed"),
  lastName: Yup.string()
    .required("Please provide the last name")
    .min(3, "Please provide 3 characters long")
    .max(40, "Body is too long, only 40 characters are allowed"),
  address: Yup.string()
    .required("Please provide the address")
    .min(3, "Please provide 3 characters long")
    .max(80, "Body is too long, only 80 characters are allowed"),
  phoneNo: Yup.string()
    .required("Please provide the phone no")
    .matches(
      /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
      "Invalid phone number",
    )
    .min(3, "Please provide 3 characters long")
    .max(16, "Body is too long, only 16 characters are allowed"),
  city: Yup.string()
    .required("Please provide the city")
    .min(3, "Please provide 3 characters long")
    .max(30, "Body is too long, only 30 characters are allowed"),
  country: Yup.string()
    .required("Please provide the country")
    .min(3, "Please provide 3 characters long")
    .max(30, "Body is too long, only 30 characters are allowed"),
})

const Post: React.FC<{}> = () => {
  const { data, error, isLoading } = useGetPostQuery()
  console.log(data)

  // const [formData, setFormData] = useState<MyFormValues>({
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   phoneNo: "",
  //   city: "",
  //   country: "",
  // })

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    city: "",
    country: "",
    dob: undefined,
  }
  const onSubmit = (
    values: MyFormValues,
    helpers: FormikHelpers<MyFormValues>,
  ) => {
    console.log({ values, helpers })
    setTimeout(() => helpers.setSubmitting(false), 2000)
  }

  return (
    <div className="">
      <Box>
        <Typography variant="h4">Form</Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={PostSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions })
          // alert(JSON.stringify(values, null, 2))
          // actions.setSubmitting(false)
        }}
        component={PostForm}
      />
    </div>
  )
}

export default Post
