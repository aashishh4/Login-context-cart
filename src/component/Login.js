 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });

  function submit(values) {
    const obj = {
      email: values.email,
      password: values.password,
    };
  
    axios
      .post('https://reqres.in/api/login', obj)
      .then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          localStorage.setItem('login', 'true');
          
          toast.success('Login successful! Redirecting to the book page...');
          setTimeout(() => {
            login();
            navigate('/home');
           
          }, 1000);
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
        toast.error('Login failed, please check your email and password.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      });
   
    
  }
  return (
    <>
      <div className="MainLogo">
       
      </div>
      <div className="LoginPage">
        <h1>Log in</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="LoginInput">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id='errormsg' style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="LoginInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div id='errormsg' style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="LoginInput">
            <button type="submit">Login</button>
          </div>
        </form>
        <br></br>
   

        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
