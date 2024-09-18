import { useState, useEffect } from 'react';

export const fetchDataToken = async () => {
  const url = 'https://uat.global.proveapis.com/token';
  const data = new URLSearchParams();
  data.append('username', 'f59799bf-d808-42df-9f15-7f31b9592e35');
  data.append('password', '1fa35441-de4a-4544-b3b8-96ad65806047');
  data.append('grant_type', 'password');
  data.append('client_id', 'oakmont');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    return responseData.access_token;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    return null;
  }
};

const IcnProveGetTokenPrd = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleClick = async () => {
    const token = await fetchDataToken();
    setAccessToken(token);
  };

  return (
    <div>
      <button onClick={handleClick}>Buscar Token</button>
      {accessToken && <div>Access Token: {accessToken}</div>}
    </div>
  );
};

export default IcnProveGetTokenPrd;
