import React, { useEffect, useState } from 'react';
import { GetData, deletData } from '../Servicer/User';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import RegForm from './RegForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Reg = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  // const handleShow = () => {
  //   setShow(true);
  //   setUserData(null)
  //   setUserId(null)
  // }

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

  const DeletData = async (id) => {
    const res = await deletData(id)
    if (res.data.status === 200) {
      function noify(cb) {
        toast(res.data.message, { onClose: cb })
      }
      noify(() => displayData())
    }
  }
  const updateForm = async (user) => {
    console.log('user=', user);
    setUserData(user)
    setUserId(user._id)
    setShow(true)

  }
  return (
    <>
      <div className='p-4'>
        <div style={{ background: "" }} className="mb-4 bg-light">
          <span className="d-flex justify-content-end  ">
            <Button variant="contained" onClick={setShow} style={{ backgroundColor: '#6D4A56' }}>ADD data</Button>
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
                  <button onClick={() => updateForm(user)}>Update</button>
                  <button onClick={() => DeletData(user._id)}>Delete</button>
                  {/* < ToastContainer /> */}
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
