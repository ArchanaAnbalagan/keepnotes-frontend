import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios'
import './style.css';
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            debugger
            axios.post('https://keepnotes-backend-69st.vercel.app/login', {
                email: values.email, // Assuming values is an object with email and password
                password: values.password
            })
                .then(res =>
                // console.log(res);
                {
                    console.log(res);
                    if (res.data.message == "success") {
                        
                        navigate('/home', { state: { name: res.data.name, user_id: res.data.id } });
                        console.log("User  ID:", res.data.id);
                    }
                    else {
                        alert("no record")
                    }

                }

                )
                .catch(err => console.log(err))
        }
    }
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Store as string
    }

    return (
    
        <div>
            <div className='fixed top-0 d-flex backroundblue justify-content-between px-5  align-items-center  p-3 font-weight-bold custom-font' >
                <div className="p-2">Keep Notes</div>
                <div className="d-flex p-2">
                    <div className='px-1'>www</div>
                    <div className='px-1'>www</div>
                    <div className='px-1'>www</div>
                    <div className='px-1'>www</div>
                </div>
            </div>

            <div>
                <div className='bgpink vh-100 overflow-hidden d-flex justify-content-center  align-items-center'>
                    <div className='rounded w-25 bcolor family'>
                        <div className='headercolor d-flex justify-content-between'>
                           <div className='p-2 mx-4'  style={{ color: "brown"}}>Login</div> 
                           <div className='d-flex'>
                                 <div className='text-danger rounded'> </div>
                           </div>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='text-center p-2 ' style={{ color: "brown", fontWeight: "bold", fontSize: "larger" }}>Login</div>
                            <div className='mb-3 mx-4'>
                                <label htmlFor="email" style={{ color: "brown", fontSize: "medium", fontWeight: "bold", }}>
                                    Email
                                </label>
                                <br/>
                                <input type="email"
                                    placeholder='Enter Email'
                                    className=' rounded bcolor'
                                    onChange={handleInput}
                                    name='email'
                                />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                            <div className='mb-3 mx-4'>
                                <label htmlFor="password" style={{ color: "brown", fontSize: "medium", fontWeight: "bold", }}>
                                    Password
                                </label>
                                <br/>
                                <input type="password
                    "   onChange={handleInput} placeholder='Enter Password'
                                       className=' rounded bcolor'
                                    name='password'
                                />
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>
                            <div className='d-flex mx-4'>  <button type='submit' className='btn w-100 m-3 ' style={{backgroundColor:"rgb(185, 156, 148)",color:"rgb(170, 111, 95)",fontSize:"bold"}}>
                Login
            </button>
                            <Link to="/signup" className='btn  w-100 m-3 text-decoration-none' style={{backgroundColor:"rgb(147, 211, 211)",color:"rgb(42, 145, 145)",fontSize:"bold"}}
                            >
                                Register
                            </Link></div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login