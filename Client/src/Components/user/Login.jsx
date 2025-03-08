import React , { useState , useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext.jsx';


const Login = () => {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const { login } = useContext(AppContext);
  const [ message , setMessage ] = useState('');
  const navigate = useNavigate();

  function onChangeHandle(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e){
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if(result === false){
      setMessage('Wrong Credentials');
    }
    if(result === true){
      return navigate('/');
    }
  }

  return (
<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100%" }}>
      <div className="container my-5 p-3" style={{ width: "600px",  padding: "20px" }}>
        <h1 className="text-center">Login</h1>
        <form className="my-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
            <input name="email" value={formData.email} onChange={onChangeHandle} type="email" className="form-control" id="exampleInputEmail1" placeholder="Email..." aria-describedby="emailHelp" style={{ width: "100%" , padding: "10px" , borderRadius: "8px" , outline: "none" , border:"none" }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name="password" value={formData.password} onChange={onChangeHandle} type="password" placeholder="Password..." className="form-control" id="exampleInputPassword1" style={{ width: "100%" , padding: "10px" , borderRadius: "8px" , outline: "none" , border:"none" }} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <div className="d-grid col-5 mx-auto my-3"> 
          <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="text-center">Create Account...<Link to="/register" style={{textDecoration:"none" , marginLeft:"4px"}}>Signup</Link> </p>
        <p className="text-center" style={{color:"yellow"}}>{message}</p>
      </div>
    </div>
  )
}

export default Login;