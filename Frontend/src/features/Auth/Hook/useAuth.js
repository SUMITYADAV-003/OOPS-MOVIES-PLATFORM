import { useContext, useEffect } from "react";
import {register, login, getMe, logout} from "../Services/auth.api";

import {AuthContext} from "../auth.context";


export const useAuth = () => {
  const context = useContext(AuthContext);
  const {user, setUser, loading, setLoading} = context;

  async function handleRegister({username, password, email}) {
    setLoading(true);
    const data = await register(username, email, password);
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({username, password, email}) {
    setLoading(true);
    const data = await login(username,email,password);
    setUser(data.user);
    setLoading(false);
    
  }
  
  async function handleGetMe() {
    setLoading(true);
    const data = await getMe()
    setUser(data.user);
    setLoading(false);
  }

   async function handleLoginOut() {
    setLoading(true);
    const data = await login()
    setUser(data.user);
    setLoading(false);
  }


    useEffect(() => {
    handleGetMe()
  }, [])

    return({
    user, loading, handleLoginOut, handleLogin, handleRegister, handleGetMe
  })

}