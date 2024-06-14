

import React, { useEffect, useState } from 'react';

import { GetData, RegServices, UpdateData, ViewData } from '../Servicer/User';


import Button from '@mui/material/Button';

import 'react-toastify/dist/ReactToastify.css';
import RegForm from './RegForm';
const Reg = () => {
  const [show,setShow]=useState(false)
  const handleClose=()=>setShow(false)
  const handleShow = ()=>{
    setShow(true);
    // setEdit(false);
  }
  const [user, setUser] = useState();
  const [userData, setUserData] = useState(null);

  const [UserId, setUserId] = useState(null);


  useEffect(() => {
    displayData();
  }, []);
  const displayData = async () => {
    const res = await GetData();
    setUser(res.data);
    console.log("resresresres--", res.data);
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
                  {/* <button onClick={() => updateForm(user._id)}>Update</button> */}
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
   
      UserId={UserId}
      userData={userData}
      data={displayData}
      />
    </>
  );
};

export default Reg;
