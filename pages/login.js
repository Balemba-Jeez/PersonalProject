import styled, { createGlobalStyle } from "styled-components"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const PageGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
/* COLOR VARIABLES */
:root {
    --primary-color: #000000;
    --secondary-color: #535354;
    --background-color: #EFEFEF;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --white-color: #FFF;
    --black-color: #000;
    --input-border-color: #E3E4E6;
    --transition-3s: 0.3s;
}
/* GLOBAL STYLES */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
`

const StyledDiv = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--background-color);
a{
    text-decoration: none;
    color: var(--black-color);
    transition: var(--transition-3s);
}
a:hover{
    text-decoration: underline;
}
/* WRAPPER */
.wrapper{
    position: relative;
    width: 430px;
    height: 500px;
    background-color: var(--white-color);
    border-radius: 3px;
    padding: 120px 32px 64px;
    // border: 1px solid var(--primary-color);
    box-shadow: 0 8px 15px var(--shadow-color);
    transition: var(--transition-3s);
    overflow: hidden;
}
/* FORM HEADER */
.form-header{
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 70px;
    background-color: white;
    border-radius: 0 0 20px 20px;
}
.form-header::before, .form-header::after{
    content: "";
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
}
.form-header::before{
    left: -30px;
    border-top-right-radius: 50%;
    // box-shadow: 15px 0 0 var(--primary-color);
}
.form-header::after{
    right: -30px;
    border-top-left-radius: 50%;
    // box-shadow: -15px 0 0 var(--primary-color);
}
/* TITLES */
.titles{
    position: relative;
  
}
.title-login, .title-register{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: black;
    font-size: 1.7rem;
    font-weight: 550;
    transition: var(--transition-3s);
    width: 250px;
    text-align: center;
}
.title-register{
    top: 50px;
}
/* FORMS */
.login-form, .register-form{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    transition: var(--transition-3s);
}
.register-form{
    left: 150%;
}
/* INPUT FIELDS */
.input-box{
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
}
.input-field{
    width: 100%;
    height: 55px;
    font-size: 16px;
    background: transparent;
    color: var(--black-color);
    padding: 0 20px;
    border: 1px solid var(--input-border-color);
    border-radius: 4px;
    outline: none;
    transition: var(--transition-3s);
}
.input-field:focus{
    border: 1px solid var(--primary-color);
}
.label{
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: var(--secondary-color);
    transition: 0.2s;
    cursor: text;
}
.input-field:focus ~ .label,
.input-field:valid ~ .label{
    top: 0;
    font-size: 14px;
    background-color: var(--white-color);
    color: var(--primary-color);
    padding: 0 10px;
}
.input-field:valid ~ .label{
    color: var(--secondary-color);
}
.icon{
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    font-size: 20px;
    color: var(--secondary-color);
}
/* FORGOT PASSWORD & TERMS AND CONDITIONS */
.form-cols{
    display: flex;
    justify-content: center;
    font-size: 14px;
}
.col-1{
    display: flex;
    align-items: center;
    gap: 6px;
}
/* SUBMIT BUTTON */
.btn-submit{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 50px;
    background-color: var(--primary-color);
    color: var(--white-color);
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition-3s);
}
.btn-submit:hover{
    gap: 15px;
    background-color: #333333;
}
.btn-submit i{
    font-size: 20px;
}
/* SWITCH FORM */
.switch-form{
    text-align: center;
}
.switch-form a{
    font-weight: 500;
}
/* RESPONSIVE STYLES */
@media only screen and (max-width: 564px){
    .wrapper{
        margin: 20px;
    }

}

`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    
    e.preventDefault();

    try {
      const res = await axios.post('/api/login', { email, password });
      const user = res.data.user;
      console.log(user)
      // Save user data in localStorage or cookies
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to dashboard or home
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error);
      // alert('Login failed: ' + err.response?.data?.error || 'Something went wrong');
    }
  }

    return(
        <>
        <PageGlobalStyle />
        <StyledDiv>
        <div className="wrapper">
        <div className="form-header">
            <div className="titles">
                <div className="title-login">Welcome back</div>
                
            </div>
        </div>
        {/* <!-- LOGIN FORM --> */}
        <form onSubmit={handleLogin} action="" className="login-form" autocomplete="off">
            {/* <!-- Login form inputs --> */}
            <div className={"flex justify-center items-center" + (error && ' bg-[#fbe6e6] h-[50px] gap-1')}>
            { error && 
              (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>)}
            <span className=" text-[11px]">
              {error || ''}
            </span>
            </div>
            
          <div className="input-box">
            
              <input type="text" className="input-field" id="log-email" required  value={email} onChange={e => setEmail(e.target.value)}/>
              <label for="log-email" className="label">Email</label>
              {/* <i className='bx bx-envelope icon'></i> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>


          </div>
          <div className="input-box">
              <input type="password" className="input-field" id="log-pass" required value={password} onChange={e => setPassword(e.target.value)}/>
              <label for="log-pass" className="label">Password</label>
              <i className='bx bx-lock-alt icon'></i>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>

          </div>
          <div className="form-cols">
              <div className="col-1"></div>
              <div className="col-2">
                  <a href="#">Forgot password?</a>
              </div>
          </div>
          <div className="input-box">
              <button className="btn-submit" id="SignInBtn">Sign In <i className='bx bx-log-in'></i></button>
          </div>          
        </form>
    </div>

        </StyledDiv>
    </>
    )
}