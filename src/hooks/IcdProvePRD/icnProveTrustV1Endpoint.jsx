import { fetchDataToken } from './icnProveGetTokenPrd'; // Importe a função fetchDataToken do arquivo correspondente




async function IcnProveTrustV1Endpoint({ formattedPhoneNumber, siteid, loginid }) {
  const myHeaders = new Headers();
  myHeaders.append("i-token", "ZmxvEQwKcY9DGoKYmMGU");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    phoneNumber: formattedPhoneNumber,
    siteid: siteid,
    username: loginid
  });

  // const raw = JSON.stringify({
  //   phoneNumber: "5521970445500",
  //   siteid: "2024000",
  //   username: "loginid"
  // });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch('/trust', requestOptions);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API returned status ${response.status}: ${text}`);
    }


    const result = await response.json();
    console.log("API Response:", result);
    return result;

  } catch (error) {
    console.error("Erro ao chamar a API Trust:", error.message);
    throw error;
  };


};



export default IcnProveTrustV1Endpoint;


