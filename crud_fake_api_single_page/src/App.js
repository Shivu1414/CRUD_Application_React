import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from "axios";

function App() {
  const [id, setId] = useState(0);
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [totalId, setTotalId] = useState(0);
  const [emailVal, setEmailVal] = useState(false);
  const [contactVal, setContactVal] = useState(false);
  const [firstNameVal, setFirstNameVal] = useState(false);
  const [lastNameVal, setLastNameVal] = useState(false);
  const [validate, setValidate] = useState(false);

  const getDataApiHandler = ()=>{
    axios.get('https://6759576e60576a194d146390.mockapi.io/api/v1/users')
      .then(res =>{
        let keys = Object.keys(res.data[0]);
        setColumns(['id', ...keys.filter(item => item !== 'id' && item !== 'createdAt')]);
        setRecords(res.data);
      })
  }

  useEffect(()=>{
    getDataApiHandler();
  },[])

  useEffect(()=>{
    if(validate){
      !contactVal ? document.getElementById("phone").innerHTML = "X" : document.getElementById("phone").innerHTML = "" ;
      !firstNameVal ? document.getElementById("fname").innerHTML = "X" : document.getElementById("fname").innerHTML = "" ;
      !lastNameVal ? document.getElementById("lname").innerHTML = "X" : document.getElementById("lname").innerHTML = "" ;
      !emailVal ? document.getElementById("mail").innerHTML = "X" : document.getElementById("mail").innerHTML = "" ;
    }
    else{
      document.getElementById("mail").innerHTML = "";
      document.getElementById("lname").innerHTML = "";
      document.getElementById("fname").innerHTML = "";
      document.getElementById("phone").innerHTML = "";
    }
  },[contactVal, firstNameVal, lastNameVal, emailVal, validate])

  const handleSave = (e) => {
    e.preventDefault();
    if(firstName == '' || lastName == '' || email == '' || contact == ''){
      alert("Field can not be empty");
    }
    else if(!emailVal || !firstNameVal || !lastNameVal || !contactVal){
      alert("Entered value is not correct");
    }
    else{
      const newObject = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: contact
      }
      axios.post(`https://6759576e60576a194d146390.mockapi.io/api/v1/users`, newObject)
      .then(res => {
        alert("Data Added Successfully!");
        handleClear();
        getDataApiHandler()
      })
      .catch(err => console.log(err));
    }
  }

  const handleDelete = (id) => {
    const conf = window.confirm("Do you really want to delete it?");
    if (conf) {
      axios?.delete(`https://6759576e60576a194d146390.mockapi.io/api/v1/users/${id}`)
      .then((res) => {
        if(res.status == 200){
          alert("Data deleted");
          getDataApiHandler()
        }     
      })
      .catch(err => console.log(err));
    }
  };
  

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setEmail('');
    setContact('');
    setIsUpdate(false);
    setValidate(false);
  }

  const handleEdit = (id) => {
    const dt = records.filter((item) => item.id === id);
    let inputField = document.getElementById("inp-field");
    if(dt !== undefined){
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstname);
      setLastName(dt[0].lastname);
      setEmail(dt[0].email);
      setContact(dt[0].phone);
      handleFnameChange(dt[0].firstname);
      handleLnameChange(dt[0].lastname);
      handlePhoneChange(dt[0].phone);
      handleEmailChange(dt[0].email);
      inputField.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if(firstName == '' || lastName == '' || email == '' || contact == ''){
      alert("Field can not be empty");
    }
    else if(!emailVal || !firstNameVal || !lastNameVal || !contactVal){
      alert("Entered value is not correct");
    }
    else{
      const data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: contact
      }
  
      axios.put('https://6759576e60576a194d146390.mockapi.io/api/v1/users/'+id,data)
      .then(res =>{
        if(res.status == 200){
          alert("data updated succesfully");
          handleClear();
          getDataApiHandler()
        }
      })
    }
  }

  const handleEmailChange = (el) => {
    setValidate(true);
    let eVal = el.trim();
    setEmail(eVal);
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailVal(mailRegex.test(eVal));
  }
  const handlePhoneChange = (el) => {
    setValidate(true);
    let pVal = el.trim();
    setContact(pVal);
    const phoneRegex = /^(\+?\d{1,3}[-. ]?)?\(?\d{1,4}?\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;
    setContactVal(phoneRegex.test(pVal));
  }
  const handleFnameChange = (el) => {
    setValidate(true);
    let fVal = el.trim();
    setFirstName(fVal);
    const nameRegex = /^[A-Za-z\s'-]+$/;
    setFirstNameVal(nameRegex.test(fVal));
  }
  const handleLnameChange = (el) => {
    setValidate(true);
    let lVal = el.trim();
    setLastName(lVal);
    const nameRegex = /^[A-Za-z\s'-]+$/;
    setLastNameVal(nameRegex.test(lVal));
  }

  return (
    <div className="App" id="inp-field">
      <div className='div-opn' >
        <div>
          <label>First Name : <span id="fname"></span> 
            &nbsp;<input type='text' placeholder='Enter First Name' onChange={(e)=>handleFnameChange(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name : <span id="lname"></span>
            &nbsp;<input type='text' placeholder='Enter Last Name' onChange={(e)=>handleLnameChange(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Email : <span id="mail"></span>
            &nbsp;<input type='text' placeholder='Enter Email' onChange={(e)=>handleEmailChange(e.target.value)} value={email} />
          </label>
        </div>
        <div>
          <label>Contact : <span id="phone"></span>
            &nbsp;<input type='text' placeholder='Enter phone no.' onChange={(e)=>handlePhoneChange(e.target.value)} value={contact} />
          </label>
        </div>
        <div>
          {
            !isUpdate ?
            <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
            :
            <button className='btn btn-primary' onClick={(e) => handleUpdate(e)}>Update</button>
          }
          &nbsp;<button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th >Sr.No.</th>
            {
              columns.map((item,index) => (
                <th key={index}>{ item.charAt(0).toUpperCase()+ item.slice(1) }</th>
              ))
            }
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(records) && 
            records?.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstname }</td>
                  <td>{item.lastname }</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={(e) => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ) 
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
