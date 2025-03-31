import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Edit() {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const navigat = useNavigate();

    useEffect(()=>{
        console.log(id);
        axios.get('http://localhost:3030/user/'+id)
        .then(res =>{
            setData(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setAge(res.data.Age);
            setContact(res.data.contact);
        })
        .catch(err=>console.log(err))
    },[])

    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setContact('');
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        data.firstName = firstName;
        data.lastName = lastName;
        data.Age = age;
        data.contact = contact;
        axios.put('http://localhost:3030/user/'+id,data)
        .then(res =>{
            alert("data updated succesfully");
            navigat('/')
        })
    }


  return (
    <>
    <div className='div-opn'>
        <div>
          <label>First Name : 
            &nbsp;<input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name : 
            &nbsp;<input type='text' placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Age :
            &nbsp;<input type='text' placeholder='Enter Age'  onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          <label>Contact :
            &nbsp;<input type='number' placeholder='Enter phone no.'  onChange={(e) => setContact(e.target.value)} value={contact} />
          </label>
        </div>
    </div>
    <div className='div-btn'>
      &nbsp;<button className='btn btn-primary' onClick={(e) => handleUpdate(e)} >Update</button>
      &nbsp;<button className='btn btn-danger' onClick={() => handleClear()} >Clear</button>
    </div>
    </>
  )
}

export default Edit