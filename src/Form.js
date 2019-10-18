import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// import styled from 'styled-components';


const OnboardForm = ({ values, handleChange, touched, errors }) => {
  return (
    <div className = "formContainer">
      <h2>All your form are belong to us.</h2>
      <Form>
        <label>
          Name:
          <Field
            type="text"
            name="name"
            placeholder="Indiana Jones"
          />
          {touched.name && errors.name && (
              <p className="error">{errors.name}</p>
            )}
        </label>
        <label>
          Email:
          <Field
            type="text"
            name="email"
            placeholder="this@that.com"
          />
          {touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}
        </label>
        <label>
          Password:
          <Field
            type="password"
            name="password"
          />
          {touched.password && errors.password && (
              <p className="error">{errors.password}</p>
            )}
        </label>
        <label>
          Position:
          <Field className="dropdown" component="select" name="position">
            <option>Choose an option</option>
            <option>Standing</option>
            <option>Seated</option>
            <option>Lying Down</option>
            <option>Fetal</option>
            <option>Downward Dog</option>
          </Field>
          {touched.position && errors.position && (
              <p className="error">{errors.position}</p>
            )}
        </label>
        <label>
          Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          {touched.tos && errors.tos && (
              <p className="error">{errors.tos}</p>
            )}
        </label>
        <button type="submit">Submit!</button>
      </Form>
    </div>
  );
}

const FormikOnboardForm = withFormik({
    mapPropsToValues({name, email, password, position, tos}) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        position: position || "",
        tos: tos || false,
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required.")
        .min(2, "Your name is too short")
        .max(50, "Your name is too long"),

      email: Yup.string()
        .required("Email is required.")
        .email("Invalid email address."),

      password: Yup.string()
        .required("You must choose a password")
        .min(9, "Your password is too short."),
      position: Yup.string()
        .oneOf(["Standing","Seated","Lying Down","Fetal","Downward Dog"]),
      tos: Yup.boolean()
        .test("is-true", "You must agree to the terms to continue", value => value === true)
    }),
    handleSubmit(values, {}) {
      axios.post('https://reqres.in/api/users/', values)
        .then(res => {console.log (res.data);})
        .catch(err => console.log(err.response));
    }
  })(OnboardForm)

export default FormikOnboardForm;