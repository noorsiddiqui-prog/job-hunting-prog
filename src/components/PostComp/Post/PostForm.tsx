import React from "react"
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
  FormikState,
} from "formik"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button, Typography } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MyFormValues } from "./Post"
import * as Yup from "yup"

const PostForm: (props: FormikProps<MyFormValues>) => JSX.Element = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
  isValid,
  dirty,
}) => {
  // let dateOnChange = (date: Date | [Date, Date] | null) => {
  let dateOnChange = (date: Date | null) => {
    setFieldValue("dob", date)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <>
        <Box
          component="form"
          sx={{
            ml: "23%",
            mt: "20px",
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ display: "flex", mb: "10px" }}>
            {" "}
            <Box>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="firstName"
                sx={{ mr: "10px" }}
                onChange={handleChange}
                value={values.firstName}
                style={{
                  border:
                    errors.firstName && touched.firstName
                      ? "1px solid green"
                      : "1px solid red",
                }}
              />
              <Box>
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className="error"
                />
              </Box>
            </Box>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
            />
          </Box>
          <Box sx={{ display: "flex", mb: "10px" }}>
            {" "}
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              sx={{ mr: "10px" }}
              onChange={handleChange}
              value={values.address}
            />
            <TextField
              id="outlined-basic"
              label="Phone no"
              variant="outlined"
              name="phoneNo"
              onChange={handleChange}
              value={values.phoneNo}
            />
          </Box>
          <Box sx={{ display: "flex", mb: "10px" }}>
            {" "}
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              sx={{ mr: "10px" }}
              name="city"
              onChange={handleChange}
              value={values.city}
            />
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              name="country"
              onChange={handleChange}
              value={values.country}
            />
          </Box>
          <Box sx={{ mt: "10px", mb: "20px" }}>
            <DatePicker
              name="dob"
              onChange={dateOnChange}
              value={values.dob?.toLocaleDateString()}
              selected={values.dob}
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </>
    </Form>
  )
}

export default PostForm
