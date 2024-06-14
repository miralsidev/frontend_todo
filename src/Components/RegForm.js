import React from 'react'
import { Button, Paper, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';

import { RegServices, UpdateData, } from '../Servicer/User';
import { ToastContainer, toast } from 'react-toastify';

const RegForm = ({ show, handleClose, UserId, userData,data }) => {
    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        Pno: yup.string().required('Phone number is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const handleClikeEvent =async(values)=>{
            console.log("values--",values);
            const res = await RegServices({
                    email:values.email,
                    Phone:values.Pno,
                    name:values.name,
                    password:values.password
            })
            console.log("res--",res);
            if(res.data.status===200){
                toast(res.data.message)
                data();
            }
            else if(res.data.status === 400){
                toast(res.data.message)
            }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>add data</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '80vh', overflowY: 'auto' }}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            name: '',
                            Pno:'',
                            email:'',
                            password:'',
                        }}
                        onSubmit={handleClikeEvent}
                    >
                        <div className='row justify-content-center'>
                            <div className=' col-12'>
                               
                                    <Form action="" className='main-form-div'>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='gap-3 p-3'>
                                            <Field as={TextField} name="name" label="Enter your name"  sx={{ marginBottom: '5px' }}/>
                                            <div style={{ color: 'red' }}>
                                                <ErrorMessage name='name' />
                                            </div>
                                            <Field as={TextField} name="email" label="Enter your email"  sx={{ marginBottom: '5px' }}/>
                                            <div style={{ color: 'red' }}>
                                                <ErrorMessage name='email' />
                                            </div>
                                            <Field as={TextField} name="Pno" label="Enter your phone number"  sx={{ marginBottom: '5px' }}/>
                                            <ErrorMessage name='Pno' />
                                            <Field as={TextField} name="password" label="Enter your password"  sx={{ marginBottom: '5px' }}/>
                                            <ErrorMessage name='password' />
                                            <Button variant="contained" color="primary" type="submit" >
                                                submite
                                            </Button>
                                            <ToastContainer />

                                        </div>
                                    </Form>
                           
                            </div>
                        </div>

                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegForm
