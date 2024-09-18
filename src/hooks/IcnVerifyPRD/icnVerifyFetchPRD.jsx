async function icnVerifyFetchPRD({
  siteid,
  userName,
  formattedPhoneNumber,
  propsFirstName,
  propsLastName,
  propsAddress,
  propsCity,
  propsRegion,
  propsZipCode,
  propsFormattedDate,
  propsCountry,
  propsCpf }) {
  const myHeaders = new Headers();
  myHeaders.append("i-token", "ZmxvEQwKcY9DGoKYmMGU");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    siteid: siteid,
    username: userName,
    phoneNumber: formattedPhoneNumber,
    firstName: propsFirstName,
    lastName: propsLastName,
    address: propsAddress,
    city: propsCity,
    region: propsRegion,
    postalCode: propsZipCode,
    dob: propsFormattedDate,
    country: propsCountry,
    cpf: propsCpf
  });

  // const raw = JSON.stringify({
  //   phoneNumber: "5521970445500",
  //   siteid: "2024000",
  //   username: "loginid"
  // });
  //console.log("raw", raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch('/verify', requestOptions);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API returned status ${response.status}: ${text}`);
    }


    const result = await response.json();
    //console.log("API Response:", result);
    return result;

  } catch (error) {
    console.error("Erro ao chamar a AP Verify:", error.message);
    throw error;
  };


};



export default icnVerifyFetchPRD;


