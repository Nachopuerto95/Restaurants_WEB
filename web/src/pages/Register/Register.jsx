import React from 'react';
import { useForm } from 'react-hook-form'
import { createUser } from '../../services/api.services';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext, useAlert } from '../../contexts/alert.context';


function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const latitude = useRef(0);
    const longitude = useRef(0);

    const { showAlert } = useAlert();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(ref.current);
          latitude.current = position.coords.latitude;
          longitude.current = position.coords.longitude;
        });
      }, []);

    async function onSubmit(data) {
        try {
          setError(false)
          await createUser({
            ...data,
            location: {
              type: "Point",
              coordinates: [latitude.current, longitude.current],
            },
          });
    
          navigate("/login");
        } catch (err) {
            showAlert(err)
           
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
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Name</label>
            <input 
                
                placeholder='Name' 
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                id="username" 
                {...register("name")}/>
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
        <div className="mb-3">
            <label htmlFor="date" className="form-label">Birth date</label>
            <input 
                required 
                type="date" className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`} 
                minLength={'8'} id="birthDate" 
                {...register("birthDate")}/>
        </div>
       
        <button type="submit"  className="btn btn-success">Register</button>
        </form>
  )
}

export default Register