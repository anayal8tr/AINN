import { useState } from 'react';

const SignUp = () => { 
    const [mydata, setMydata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setMydata({...mydata, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SignUp Data:', mydata);
    }

    return ( 
         < > 
         <div className="signup-page">
         <div className="signup-container">
         <h2> Sign UP </h2>
         <form onSubmit={handleSubmit} className='signup-form' >
            <label>Name</label>
            <input type='text' name='name' value={mydata.name} onChange={handleChange} required />

            <label>Email</label>
            <input type='email' name='email' value={mydata.email} onChange={handleChange} required />

            <label>Password</label>
            <input type='password' name='password' value={mydata.password} onChange={handleChange} required />

            <label>Confirm Password</label>
            <input type='password' name='confirmPassword' value={mydata.confirmPassword} onChange={handleChange} required />

            <button type='submit'>Sign Up</button>

         </form>
         </div>
         <style> {`
            .signup-page {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f5f5f5;
            }
            .signup-container {
                max-width: 600px;
                width: 100%;
                padding: 25px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .signup-form {
                display: flex;
                flex-direction: column;
            }
            .signup-form label {
                text-align: left;
                font-weight: bold;
                margin: 10px 0 4px;
            }
                .signup-form input {
                border: 1px solid #ccc;
                padding: 12px;
                border-radius: 5px;
                outline: none;
                width: 97%;
                transition: all 0.6s;
            }
            .signup-form input:focus {
                border-color: #007bff;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            }
            .signup-form button {
                margin-top: 14px;
                padding: 11px;
                background-color: #ff385c;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .signup-form button:hover {
                background-color: #e63948;
                transform: scale(1.05);
            }
            `} </style>
         </div> 

         </>

    )
}
export default SignUp;