import { useNavigate } from "react-router-dom"; 
import { useState, useEffect  } from "react";
import { useAuth } from "../context/AuthContext"; 

function LoginForm() {

  interface LoginForm {
    user_email: string, 
    user_password: string
  }

  //states för logindata, msg till användaren och laddning
  const [loginInfo, setLoginInfo] = useState<LoginForm>({user_email: "", user_password: ""}); 
  const [infoMsg, setInfoMsg] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const { login, user } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect( () => {
    if(user) {
      navigate("/admin"); 
    }
  }, [user]);
  
  const loginUser = async (event: any) => {
    event.preventDefault(); 

    if(!loginInfo.user_email || !loginInfo.user_password) {
      setInfoMsg("Du måste ange både e-post och lösenord för att logga in"); 
    }

    //kontroll av logininfo
    console.log(loginInfo); 

    try {
      setIsLoading(true);
      await login(loginInfo);
      
      if(!user) {
        setInfoMsg("Felaktig e-post eller lösenord. Försök igen!"); //kunna återställa lösenord? 
      }

      navigate("/admin"); 

    } catch(error) {

    } finally {
      setIsLoading(false); 
    }
  }


  return (
    <>
    <form onSubmit={loginUser}>
        <label htmlFor="email">E-post</label><br />
        <input type="email" id="email" name="email" required value={loginInfo.user_email}
        onChange={ (e) => setLoginInfo({...loginInfo, user_email: e.target.value})}
        /><br />

        <label htmlFor="password">Lösenord</label><br />
        <input type="text" id="password" name="password" required value={loginInfo.user_password}
        onChange={(e) => setLoginInfo({...loginInfo, user_password: e.target.value})}
        /><br />

        <input type="submit" value="Logga in" /><br />
        {isLoading && <em>Loggar in</em>}
        {infoMsg && <p>{infoMsg}</p>}
    </form>
    </>
  )
}

export default LoginForm
