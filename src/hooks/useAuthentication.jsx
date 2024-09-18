import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    //console.log("user:", username, "Pwd: ", password);
    const myHeaders = new Headers();
    myHeaders.append("i-token", "PyemQZhrMlpBsRZryM9N");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ username, password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      setError('');
      const loginResponse = await fetch('/sign', requestOptions);

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();  // Adiciona isso para capturar o texto da resposta em caso de erro
        console.error('Erro na resposta do servidor:', errorText);
        throw new Error('Falha ao fazer login.');
      }

      const data = await loginResponse.json();  // Isso deve ser JSON se o servidor estiver configurado corretamente
      const { token } = data;

      // Armazene o token JWT e o nome de usuário localmente
      sessionStorage.setItem('token', token);

      //profile fetch
      // console.log('API - Token JWT:', token);
      const uMyHeaders = new Headers();
      uMyHeaders.append("i-token", "PyemQZhrMlpBsRZryM9N");
      uMyHeaders.append("s-token", token);
      uMyHeaders.append("Content-Type", "application/json");
      //console.log('API 2- Token JWT:', token);
      const raw = JSON.stringify({
        "username": username
      });

      const uRequestOptions = {
        method: "POST",
        headers: uMyHeaders,
        body: raw,
        redirect: "follow"
      };


      const userProfile = await fetch("/profile", uRequestOptions)

      if (!userProfile.ok) {
        const errorText = await userProfile.text();  // Adiciona isso para capturar o texto da resposta em caso de erro
        console.error('Erro na resposta do servidor:', errorText);
        throw new Error('Falha ao fazer login.');
      }

      const userData = await userProfile.json();

      const {
        loginid: loggedInUser,
        services: servicesUser,
        Rolename: Rolename,
        siteid: siteid,
        mobile: mobile,
        orgname: orgname,
        email: email
      } = userData;

      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      sessionStorage.setItem('services', JSON.stringify(servicesUser));
      sessionStorage.setItem('Rolename', JSON.stringify(Rolename));
      sessionStorage.setItem('siteid', JSON.stringify(siteid));
      sessionStorage.setItem('mobile', JSON.stringify(mobile));
      sessionStorage.setItem('orgname', JSON.stringify(orgname));
      sessionStorage.setItem('email', JSON.stringify(email));


      navigate('/home');

      // Retorna true se o usuário for autenticado com sucesso
      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error('Erro ao fazer login:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    sessionStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const getLoggedInUser = () => {
    try {
      const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      const services = JSON.parse(sessionStorage.getItem('services'));
      const RoleName = JSON.parse(sessionStorage.getItem('Rolename'));
      const siteid = JSON.parse(sessionStorage.getItem('siteid'));
      const mobile = JSON.parse(sessionStorage.getItem('mobile'));
      const orgname = JSON.parse(sessionStorage.getItem('orgname'));
      const email = JSON.parse(sessionStorage.getItem('email'));

      // Verifique se loggedInUser não é nulo
      if (!loggedInUser) {
        throw new Error('Os dados do usuário não foram encontrados na sessionStorage.');
      }

      return { loggedInUser, services, RoleName, siteid, mobile, email, orgname };
    } catch (error) {
      console.error('Erro ao obter o usuário logado:', error);
      return null;
    }
  };


  function useSession() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      // setupSessionExpirationCheck(setVisible);
      //checkSessionExpiration(setVisible);
    }, []);

    return { visible };
  }



  return { login, logout, error, getLoggedInUser, useSession };




};

export default useAuthentication;
