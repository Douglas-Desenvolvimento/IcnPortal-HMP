import React, { useState } from 'react';

const icnApiAccess = () => {
  
    

    
      const [error, setError] = useState(null);
      const apiUrl = 'OST http://213.163.247.230:8000';
    
      const fetchData = async (endpoint, method = 'GET', data = null, options = {}) => {
        try {
          setError(null);
    
          const url = `${apiUrl}/${endpoint}`;
          const requestOptions = {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...options.headers // Adicione os cabeçalhos extras fornecidos nas opções
            },
            ...options // Mescla outras opções, como corpo, método, etc.
          };
    
          if (data) {
            requestOptions.body = JSON.stringify(data);
          }
    
          const response = await fetch(url, requestOptions);
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          setError(error.message);
          return null;
        }
      };
    
      const getData = async (endpoint) => {
        return fetchData(endpoint);
      };
    
      const postData = async (endpoint, data, options = {}) => {
        return fetchData(endpoint, 'POST', data, options);
      };
    
      return { getData, postData, error };
    };
    
    






export default icnApiAccess
