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
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(Validation(values));
    //     if (errors.email === "" && errors.password === "") {
    //         debugger
    //         axios.post('/login', {
    //             email: values.email, // Assuming values is an object with email and password
    //             password: values.password
    //         })
    //             .then(res =>
    //             // console.log(res);
    //             {
    //                 console.log(res);
    //                 if (res.data.message == "success") {

    //                     navigate('/home', { state: { name: res.data.name, user_id: res.data.id } });
    //                     console.log("User  ID:", res.data.id);
    //                 }
    //                 else {
    //                     alert("no record")
    //                 }

    //             }

    //             )
    //             .catch(err => console.log(err))
    //     }
    // }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        const credentials = {
            email: values.email, // Assuming values is an object with email and password
            password: values.password
        };
        if (!validationErrors.email && !validationErrors.password) {

        try {
            const response = await axios.post('https://keepnotes-backend-sandy.vercel.app/login', credentials);
            if (response.data.message == "success") {

                navigate('/home', { state: { name: response.data.name, user_id: response.data.id } });
                console.log("User  ID:", response.data.id);
            }
            else {
                alert("No Account Found !, Please Register Your Name")
            }


        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }}
    };
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Store as string
    }

    return (

        <div>
              <div className='fixed top-0 d-flex backroundblue justify-content-between   align-items-center  font-weight-bold custom-font' style={{ paddingLeft: "200px", paddingRight: "160px"

               }} >
                <div className="p-2  " style={{ fontSize: "20px", fontWeight: 700 }}>Keep Notes</div>
                <div className="d-flex p-2 " style={{ fontSize: "15px" }}>
                    <div className='px-2' style={{ fontWeight: 700 }}>About</div>
                    <div className='px-2' style={{ fontWeight: 700 }}>Notes</div>
                    <div className='px-2' style={{ fontWeight: 700 }}>Account</div>
                    <div className='px-2' style={{ fontWeight: 700 }}>Logout</div>
                </div>
            </div>

            <div>
                <div className='bgpink vh-100  d-flex justify-content-center  align-items-center family'>
                    <div className='rounded w-25 bcolor family mb-5'>
                        <div className='headercolor d-flex justify-content-between' style={{ color: "brown", borderBottom: "2px solid #b47a51" }}>
                        <div style={{ color: "#8B4513",fontWeight:600 }} className='p-2 px-4'>Login</div>
                            <div className='d-flex'>
                                <div className='text-danger rounded'> </div>
                            </div>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='text-center p-2 ' style={{ color: "#8B4513", fontWeight: "bold", fontSize: "20px" }}>Login</div>
                            <div className='mb-3 mx-4'>
                                <label htmlFor="email" className='py-1' style={{ color: "#8B4513", fontSize: "small", fontWeight: 700, }}>
                                    Email
                                </label>
                                <br />
                                <input type="email"
                                    placeholder=' Email'
                                    className=' rounded bcolor  p-2'
                                    style={{fontSize:"14px",width:"100%"}}
                                    onChange={handleInput}
                                    name='email'
                                    
                                />
                                {errors.email && <span className='text-danger ' style={{fontSize:"12px"}}>{errors.email}</span>}
                            </div>
                            <div className='mb-3 mx-4'>
                                <label htmlFor="password" className='py-1'  style={{ color: "#8B4513", fontSize: "small", fontWeight: 700, }}>
                                    Password
                                </label>
                                <br />
                                <input type="password
                    "   onChange={handleInput} placeholder=' Password'
                    className=' rounded bcolor  p-2'
                    style={{fontSize:"14px",width:"100%"}}
                                    name='password'
                                />
                                {errors.password && <span className='text-danger ' style={{fontSize:"12px"}}>{errors.password}</span>}
                            </div>
                            <div className='d-flex mx-3'>  <button type='submit' className='btn w-100 m-3 ' style={{ backgroundColor: "#FFDEAD", color: "#8B4513", fontSize: "14px",fontWeight:"bold" }}>
                                Login
                            </button>
                                <Link to="/signup" className='btn  w-100 m-3 text-decoration-none' style={{ backgroundColor: "rgb(147, 211, 211)", color: "rgb(33, 109, 109)",fontSize: "14px",fontWeight:"bold"}}
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