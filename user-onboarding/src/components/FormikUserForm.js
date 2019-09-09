import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios'

const UserForm = ({values, errors, touched}) => {
	return (
		<Form>
			<div>
				{touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
				<Field type='text' name="firstName" placeholder="first name" />
			</div>
			<div>
				{touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
				<Field type="text" name="lastName" placeholder="last name" />
			</div>
			<div>
				{touched.email && errors.email && <p>{errors.email}</p>}
				<Field type="email" name="email" placeholder="Email" />
			</div>
			<div>
				{touched.password && errors.password && <p>{errors.password}</p>}
				<Field type="password" name="password" placeholder="Password" />
			</div>
			<label>
				{touched.tos && errors.tos && <p>{errors.tos}</p>}
				<Field type="checkbox" name="tos" checked={values.tos} />
				Accept Terms of Service
			</label><br/>
			<button>Submit!</button>
		</Form>
	)
}

const FormikUserForm = withFormik({

	mapPropsToValues({firstName, lastName, email, password, tos}){
		return {
			firstName: firstName || "",
			lastName: lastName || "",
			email: email || "",
			password: password || "",
			tos: tos || false
		};
	},

	validationSchema: Yup.object().shape({
		firstName: Yup.string()
			.required("must have first name")
			.min(4, "name must be 4 characters long"),
		lastName: Yup.string()
			.required("must have last name")
			.min(4, "last name must be 4 characters long"),
		email: Yup.string()
			.email("Email not valid")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "Password must be 6 characters or longer")
			.required("Password is required"),
		tos: Yup.boolean()
			.oneOf([true], 'Must Accept Terms and Conditions')
	}),

	handleSubmit(values, {resetForm}){
		const user = {
			email: values.email,
			first_name: values.firstName,
			last_name: values.lastName,
			avatar: ''
		}
		axios.post('https://reqres.in/api/users', user)
		.then(res => {
			console.log(res)

		})
		.catch(error => {
			console.log(error)
		})
		resetForm()
	}

})(UserForm)



export default FormikUserForm