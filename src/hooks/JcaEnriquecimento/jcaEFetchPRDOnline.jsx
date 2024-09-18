async function jcaEFetchPRDOnline({
  formattedNrCpf }) {
  const myHeaders = new Headers();
  myHeaders.append("i-token", "amybok00bx9c70e8xlvgoiunbjibi8");;
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({

    nr_cpf: formattedNrCpf
    // nr_cpf: "66803217868"

  });
  //console.log("Fetch - Recebido do Form: ", raw)

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
    const response = await fetch('/cadsearch', requestOptions);

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



export default jcaEFetchPRDOnline;


