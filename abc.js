import React from 'react'
import { Button, Paper, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';

import { RegServices, UpdateData, } from '../Servicer/User';
import { ToastContainer, toast } from 'react-toastify';

const RegForm = ({ show, handleClose, edit, UserId, userData }) => {
    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        Pno: yup.string().required('Phone number is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });
    const handleClikeEvent = async (values) => {
        console.log("values==",values);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('Phone', values.Pno);
        formData.append('password', values.password);
        console.log('formdata---', formData);


        const response = edit ? await UpdateData(formData, UserId) : await RegServices(formData)

        console.log('res==', response);
        console.log('res==', response.data.status);

        if (response.data.status === 200) {
            toast.success(response.data.message);
        } else {
            toast.error('Failed to update data');
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{edit ? 'Update Car' : 'Add Car'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '80vh', overflowY: 'auto' }}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            name: edit ? userData?.name : '',
                            Pno: edit ? userData?.Phone : '',
                            email: edit ? userData?.email : '',
                            password: edit ? userData?.password : '',
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
                                                {edit ? 'Update' : 'Submit'}
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
-------------------------


import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { GetData, RegServices, UpdateData, ViewData } from '../Servicer/User';
import { ToastContainer, toast } from 'react-toastify';

import Button from '@mui/material/Button';

import 'react-toastify/dist/ReactToastify.css';
import RegForm from './RegForm';
const Reg = () => {
  const [show,setShow]=useState(false)
  const handleClose=()=>setShow(false)
  const handleShow = ()=>{
    setShow(true);
    setEdit(false);
  }
  const [user, setUser] = useState();
  const [userData, setUserData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [UserId, setUserId] = useState(null);


  useEffect(() => {
    displayData();
  }, []);
  const displayData = async () => {
    const res = await GetData();
    setUser(res.data);
    console.log("resresresres--", res.data);
  };

  const updateForm = async (id) => {
    console.log('updateForm=', id);
    await fetchData(id);
    setShow(true);
    setEdit(true);
    setUserId(id);
  };
  const fetchData = async (id) => {
    console.log('fetchData=', id);
    const res = await ViewData(id);
    console.log("res fetchdata--", res.data.data);
    setUserData(res.data); 
  };

  return (
    <>
      <div className='p-4'>
      <div style={{ background: "" }} className="mb-4 bg-light">
              <span className="d-flex justify-content-end  ">
                <Button variant="contained" onClick={handleShow} style={{ backgroundColor: '#6D4A56' }}>ADD data</Button>
              </span>
            </div>

      </div>

      <div className='container'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.data?.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.Phone}</td>
                <td>
                  <button onClick={() => updateForm(user._id)}>Update</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RegForm
      show={show}
      handleClose={handleClose}
      edit={edit}
      UserId={UserId}
      userData={userData}
      />
    </>
  );
};

export default Reg;
