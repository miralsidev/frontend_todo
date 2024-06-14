import { Button, Paper, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { user } from '../Servicer/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const validationSchema = yup.object({
        email: yup.string().required('email is required').email('enter valid emial address'),
        password: yup.string().min(6, "enter 6 at lates")
    })
    const handlesubmit = async (values) => {
        const res = await user({
            email: values.email,
            password: values.password
        })
        console.log("res-=--", res.data);
        // toast('login succesfully..!!')
        if (res.data.status === 400) {
            toast(res.data.message)
        }
        else if (res.data.status === 200) {
            toast(res.data.message)
        }
    }
    return (
        <>
            <Formik validationSchema={validationSchema} initialValues={{
                email: '',
                password: ''
            }}
                onSubmit={handlesubmit}>
                <div className='row justify-content-center'>
                    <div className='col-xl-5 col-lg-7 col-md-8 col-sm-10'>
                        <Paper elevation={2}>
                            <Form>
                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                    <Field as={TextField} name='email' label="enter your email" sx={{ marginBottom: '8px' }} />
                                    <Field as={TextField} name='password' label="enter your password" />
                                    <Button type='submit' >Login</Button>
                                    < ToastContainer />
                                </div>
                            </Form>
                        </Paper>
                    </div>
                </div>
            </Formik>
        </>
    )
}
export default Login