import React, { useState } from 'react';
import { CButton } from '@coreui/react';
import { fetchDataToken } from '../../hooks/IcdProvePRD/icnProveGetTokenPrd';
import Prove_InsertPhone from '../../components/prove_component/Prove_InsertPhone';
import IcnProveTrustV1Endpoint from '../../hooks/IcdProvePRD/icnProveTrustV1Endpoint'; // Importe a função IcnProveTrustV1Endpoint

const Botoes = () => {
  //const [accessToken, setAccessToken] = useState(null);
  const [dados, setDados] = useState(null);

  // const handleClick = async () => {
  //   try {
  //     const token = await fetchDataToken();
  //     setAccessToken(token);
  //   } catch (error) {
  //     console.error('Erro ao buscar os dados:', error);
  //   }
  // };

  const handleClickT = async () => {
    try {
      const formattedPhoneNumber = Prove_InsertPhone.getFormattedPhoneNumber(); // Obtenha o número de telefone formatado
      const response = await IcnProveTrustV1Endpoint(formattedPhoneNumber); // Chame a função IcnProveTrustV1Endpoint com o número de telefone formatado
      setDados(response);
    } catch (error) {
      console.error('Erro ao chamar a API Trust:', error);
    }
  };

  return (
    <div>
      {/* <div>
        {accessToken && <div>Access Token: {accessToken}</div>}
        <CButton color="primary" onClick={handleClick}>token</CButton>
      </div> */}
      <br />
      <div>
        {dados && <div>Dados da API Trust: {JSON.stringify(dados)}</div>}
        <CButton color="primary" onClick={handleClickT}>Chamar API Trust</CButton>
      </div>
    </div>
  );
};

export default Botoes;
