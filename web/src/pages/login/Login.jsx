import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { doLogin } from '../../services/api.services';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';
import { useAlert } from '../../contexts/alert.context';


function Login() {
    const { showAlert } = useAlert();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();   

    const { doLogin } = useContext(AuthContext)
    


    async function onSubmit(data) {
        try {
        setError(false)
          const response = await doLogin(data);
            navigate("/")
        } catch (err) {
            showAlert('Invalid credentials')
            }
      }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input 
                required
                placeholder='Email address'  
                id='email' 
                type="email" 
                className={`form-control ${errors.email}`}
                {...register("email")}/>
        </div>
        
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
                required 
                placeholder='password' 
                type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                minLength={'8'} id="password" 
                {...register("password")}/>
        </div>
        <button type="submit"  className="btn btn-success">Register</button>
        </form>
  )
}

export default Login