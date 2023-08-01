import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa'


const Login = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navegate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log(userName);
    dispatch({
      type: "GET_USERNAME",
      payload: userName
    });
    setUserName("");
    navegate("/pokedex");
  };

  return (
    
    <div className="log-in">
      
      <form className="form-login" action="" onSubmit={submit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          placeholder="Escribe tu nombre para ingresar" 
          maxLength="10"/>
        <button><FaArrowRight/></button>
      </form>
    </div>
  );
};

export default Login;
