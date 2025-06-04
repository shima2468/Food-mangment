import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState} from "react";

export let AuthContext=createContext();

export default function AuthContextProvider(props){

    // هو عبارة عن الاوبجكت الي هيحمل فيه
  // الاوبجكت الي نتج عن فك تشفير التوكن
  const [loginData, SetLoginData] = useState(null);
  console.log(loginData);
  let saveLoginData = () => {
    let encodeToken = localStorage.getItem("token");
    let DecodeToken = jwtDecode(encodeToken);
    console.log(DecodeToken);

    SetLoginData(DecodeToken);

  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // لو التوكين معاك موجود جوا
      //هروح اعمل كول لهالفنكش  الي هتملى اللوق ان داتا
      saveLoginData();
    }
  }, []);

  return <AuthContext.Provider value={{saveLoginData,loginData}}>{props.children}</AuthContext.Provider>

}