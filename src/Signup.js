import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',

    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are no errors
        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            try {
                const response = await axios.post('https://keepnotes-backend-sandy.vercel.app/signup',{
                    name: values.name,
                    email: values.email,
                    password: values.password
                });

                console.log(response);
                if (response.data) {
                    navigate('/'); // Navigate to the desired route after successful signup
                }
            } catch (err) {
                console.error("Error during signup:", err);
                alert("An error occurred during signup. Please try again.");
            }
        }
    }
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Store as string
    }
    return (
        // <div className='d-flex justify-content-center  align-items-center bg-primary vh-100'>
        //     <div className='bg-white p-3 rounded w-25'>
        //     <h4>SIGN UP</h4>
        //         <form action="" onSubmit={handleSubmit}>

        //         <div className='mb-3'>
        //                 <label htmlFor="name">
        //                     Name
        //                 </label>
        //                 <input type="name"
        //                     placeholder='Enter Name'
        //                     className='form-control rounded-0'
        //                     name='name'
        //                     onChange={handleInput}
        //                 />
        //                 {errors.name && <span className='text-danger ' style={{fontSize:"14px"}} >{errors.name}</span>}
        //             </div>
        //             <div className='mb-3'>
        //                 <label htmlFor="email">
        //                     Email
        //                 </label>
        //                 <input type="email"
        //                     placeholder='Enter Email'
        //                     className='form-control rounded-0'
        //                     name='email'
        //                     onChange={handleInput}
        //                 />
        //                  {errors.email && <span className='text-danger ' style={{fontSize:"14px"}} >{errors.email}</span>}
        //             </div>
        //             <div className='mb-3'>
        //                 <label htmlFor="password">
        //                     Password
        //                 </label>
        //                 <input type="password
        //         " placeholder='Enter Password'
        //         name='password'
        //                     className='form-control rounded-0'
        //                     onChange={handleInput}
        //                 />
        //                  {errors.email && <span className='text-danger ' style={{fontSize:"14px"}} >{errors.email}</span>}
        //             </div>
        //             <button className='btn btn-success w-100 my-2' type='submit'
        //             >Signup</button>
        //             <Link to="/" className='btn btn-default border w-100 my-2 text-decoration-none'
        //             >
        //               Login
        //             </Link>
        //         </form>
        //     </div>
        // </div>
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
                <div className='bgpink vh-100 overflow-hidden d-flex justify-content-center  align-items-center'>
                    <div className='rounded w-25 bcolor family'>
                    <div className='headercolor d-flex justify-content-between' style={{ color: "brown", borderBottom: "2px solid #b47a51" }}>
                        <div style={{ color: "#8B4513",fontWeight:600 }} className='p-2 px-4'>Sign In</div>
                            <div className='d-flex'>
                                <div className='text-danger rounded'> </div>
                            </div>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                        <div className='text-center p-2 ' style={{ color: "#8B4513", fontWeight: "bold", fontSize: "20px" }}>
                            Sign In
                        </div>
                            <div className='mb-3 mx-4'>
                                <label htmlFor="name" style={{ color: "#8B4513", fontSize: "small", fontWeight: 700, }}>
                                    Name
                                </label>
                                <br />
                                <input type="name"
                                    placeholder='Enter Name'
                                    className=' rounded bcolor  p-2'
                                    style={{fontSize:"14px",width:"100%"}}
                                    onChange={handleInput}
                                    name='name'
                                />
                                {errors.name && <span className='text-danger ' style={{fontSize:"14px"}} >{errors.name}</span>}
                            </div>
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
                                {errors.email && <span className='text-danger ' style={{fontSize:"14px"}} >{errors.email}</span>}
                            </div>
                            <div className='mb-3 mx-4'>
                                <label htmlFor="password" style={{ color: "#8B4513", fontSize: "small", fontWeight: 700, }}>
                                    Password
                                </label>
                                <br />
                                <input type="password
                            "   onChange={handleInput} placeholder='Enter Password'
                            className=' rounded bcolor  p-2'
                            style={{fontSize:"14px",width:"100%"}}
                                    name='password'
                                />
                                {errors.password && <span className='text-danger ' style={{fontSize:"14px"}} >{errors.password}</span>}
                            </div>
                            <div className='d-flex mx-4'>  <button type='submit' className='btn  w-100 m-3 text-decoration-none' style={{ backgroundColor: "#33ff99"
                            , color: "rgb(18, 112, 31)",fontSize: "14px",fontWeight:"bold"}}
                            >
                                Regiter
                            </button>
                                <Link to="/"  className='btn w-100 m-3 ' style={{ backgroundColor: "#FFDEAD", color: "#8B4513", fontSize: "14px",fontWeight:"bold" }}
                                >
                                    Login
                                </Link></div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup