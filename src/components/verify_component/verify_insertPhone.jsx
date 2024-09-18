import React, { useState, useEffect } from "react";
import * as core from "@coreui/react";
import { IMaskMixin } from "react-imask";
import CIcon from "@coreui/icons-react";
import { cilPhone, cilHouse, cilUser, cilTask, cilGlobeAlt, cilEnvelopeClosed } from "@coreui/icons";
import icnVerifyFetchPRD from "../../hooks/IcnVerifyPRD/icnVerifyFetchPRD";
import useAuthentication from "../../hooks/useAuthentication";
import axios from 'axios';
import { CSSTransition } from "react-transition-group";
import "../../App.css";
import IcnVerifyTableDetail from "./icnVerifyTableDetail";
import ProgressBar from "./progressBar";

const Verify_InsertPhone = () => {
  const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <core.CFormInput {...props} ref={inputRef} />
  ));


  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameScore, setNameScore] = useState("");
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { getLoggedInUser } = useAuthentication();
  const [siteid, setSiteId] = useState(null);
  const [loginid, setLoginId] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [userName, setUserName] = useState(null);
  const [addressScore, setAddressScore] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [number, setNumber] = useState("");
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('BR');
  const [neighborhood, setNeighborhood] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [complement, setComplement] = useState("");
  const [propsFirstName, setPropsFirstName] = useState("");
  const [propsLastName, setPropsLastName] = useState("");
  const [propsAddress, setPropsAddress] = useState("");

  useEffect(() => {
    const fetchUserSiteId = async () => {
      try {
        const userData = await getLoggedInUser();
        if (userData) {
          setUserName(userData.loggedInUser);
          setSiteId(userData.siteid);


        }
      } catch (error) {
        console.error("Erro ao buscar o username e siteid:", error.message);
      }
    };

    fetchUserSiteId();
  }, [getLoggedInUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkBoxChecked) {
      event.stopPropagation();
    } else {
      setShowSpinner(true);
      const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
      setPhoneNumber(formattedPhoneNumber);

      const [day, month, year] = dateOfBirth.split('/');
      //const propsFormattedDate = `${month}/${day}/${year}`;
      const propsFormattedDate = dateOfBirth.replace(`${month}/${day}/${year}`, `${year}-${month}-${day}`);
      setDateOfBirth(propsFormattedDate);

      const propsFirstName = firstName;
      const propsLastName = lastName;
      const propsAddress = `${address}, ${number}, ${complement} - ${neighborhood}`;
      const propsCity = city;
      const propsRegion = region;
      const propsCountry = country;
      const propsZipCode = zipCode;
      const propsCpf = cpf;

      try {
        const response = await icnVerifyFetchPRD({
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
          propsCpf,


        });
        //console.log("phone", formattedPhoneNumber,);
        // console.log("Resposta", response);
        // console.log("formattedDate", propsFormattedDate);
        const tableData = {
          username: userName,
          siteid: siteid,
          requestId: response.requestId,
          status: response.status,
          //timestamp: response.timestamp,
          mobile: phoneNumber,
          firstName: response.response.name.firstName ? response.response.name.firstName : null,
          lastName: response.response.name.lastName ? response.response.name.lastName : null,
          nameScore: response.response.name.nameScore ? response.response.name.nameScore : null,
          addressScore: response.response.address.addressScore ? response.response.address.addressScore : null,
          indicators: response.response.indicators ? response.response.indicators : null,
          dob: response.response.dob ? response.response.dob : null,
          troubleshootingId: response.response.troubleshootingId ? response.response.troubleshootingId : null,
          carrier: response.response.numberInfo ? response.response.numberInfo.carrier : null,
          lineType: response.response.numberInfo ? response.response.numberInfo.lineType : null,
          countryCode: response.response.numberInfo ? response.response.numberInfo.countryCode : null,
          identifiers: response.response.identifiers ? response.response.identifiers : null,
        };

        setRowData([tableData]);
        setNameScore(tableData.nameScore);
        setAddressScore(tableData.addressScore);

        // console.log("Dados", tableData);
        // console.log("NameScore", tableData.nameScore);
        // console.log("AddressScore", tableData.addressScore);

      } catch (error) {
        console.error("Erro ao chamar no retorno do verify:", error);
        if ({ status: 1021 }) {
          alert("Service Unavailable - Status 1021 - check the service");
        };

      }

      setShowSpinner(false);
      setPhoneNumber("");
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setCpf("");
      setZipCode("");
      setAddress("");
      setCity("");
      setRegion("");
      setCountry("");
      setNeighborhood("");
      setNumber("");
      setComplement("");
      setCheckBoxChecked(false);

    }
  };

  const handleFirstNameChange = (event) => {
    const newFName = event.target.value;
    setFirstName(newFName);
  };

  const handleLastNameChange = (event) => {
    const newLName = event.target.value;
    setLastName(newLName);
  };

  const handleDateBlur = (event) => {
    const [day, month, year] = dateOfBirth.split('/');
    const formattedDate = event.target.value.replace(`${month}/${day}/${year}`);
    setDateOfBirth(formattedDate);
  };

  const handleCpfBlur = (event) => {
    const newCpf = event.target.value;
    setCpf(newCpf)
  };

  const handlePhoneNumberBlur = (event) => {
    const formattedPhoneNumber = event.target.value.replace(/\D/g, "");
    setPhoneNumber(formattedPhoneNumber);
  };


  const handleCheckBoxChange = (event) => {
    setCheckBoxChecked(event.target.checked);
  };



  const handleZipCodeChange = async (event) => {
    const newZipCode = event.target.value;
    setZipCode(newZipCode);

  };
  // console.log(zipCode);

  const handleNumberBlur = (event) => {
    const newNumber = event.target.value;
    setNumber(newNumber);
  };


  const handleZipCodeCheck = async () => {

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (response.data) {
        setAddress(response.data.logradouro);
        setCity(response.data.localidade);
        setRegion(response.data.uf);
        setCountry("BR");
        setNeighborhood(response.data.bairro);

        const result = response.data;
        //console.log(result);

        const address = result.logradouro; // Rua
        const city = result.localidade; // Cidade
        const region = result.uf; // Estado
        const country = "BR"; // País
        const neighborhood = result.bairro; // Bairro


        //console.log('Endereço:', address, neighborhood, city, region, "BR");

      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  return (
    <>
      <div>
        <core.CCard
          className={`p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-3 shadow`}
        >
          <core.CRow>
            <core.CCol sm={8} className="m-1" >

              <core.CCardGroup>
                <core.CCard

                  className="mb-1 p-1 bg-gradient border-dark-subtitle shadow"
                >
                  <core.CCardHeader className="mb-1 border-light fs-5 fw-bold">
                    Verify form customer
                  </core.CCardHeader>
                  <core.CCardBody className="pt-2 border border-dark-subtitle rounded">

                    <core.CForm onSubmit={handleSubmit}>

                      <core.CInputGroup className="row row-cols-2 g-1" >

                        <core.CCol md={4} className="mb-1">
                          <core.CInputGroup size="sm">
                            <core.CInputGroupText id="ainputGroupPrepend02">
                              <CIcon
                                icon={cilUser}
                                className="text-secondary"
                                size="lg"
                              />
                            </core.CInputGroupText>
                            <core.CFormInput
                              type="text"
                              id="validationDefault01"
                              floatingLabel="First Name"
                              placeholder="First Name"
                              value={firstName}
                              onChange={handleFirstNameChange}
                              tabIndex={1}

                              required


                            />
                          </core.CInputGroup>
                        </core.CCol>

                        <core.CCol md={4} >
                          <core.CInputGroup>

                            <core.CFormInput
                              type="text"
                              id="validationDefault02"
                              floatingLabel="Last Name"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={handleLastNameChange}
                              tabIndex={2}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={4} >
                          <core.CInputGroup>

                            <CFormInputWithMask
                              type="text"
                              mask="00/00/0000"
                              id="validationDefault03"
                              floatingLabel="Date of birth"
                              placeholder="mm/dd/yyyy"
                              value={dateOfBirth}
                              onBlur={handleDateBlur}
                              onChange={() => { }}
                              tabIndex={3}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={6} className="mb-1">
                          <core.CInputGroup size="sm">
                            <core.CInputGroupText id="ainputGroupPrepend02">
                              <CIcon
                                icon={cilTask}
                                className="text-secondary"
                                size="lg"
                              />
                            </core.CInputGroupText>
                            <CFormInputWithMask
                              type="text"
                              mask="000.000.000-00"
                              id="validationDefault04"
                              floatingLabel="CPF"
                              placeholder="CPF"
                              value={cpf}
                              onBlur={handleCpfBlur}
                              onChange={() => { }}
                              tabIndex={4}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>

                        <core.CCol md={6} >
                          <core.CInputGroup size="sm">
                            <core.CInputGroupText id="ainputGroupPrepend02">
                              <CIcon
                                icon={cilPhone}
                                className="text-secondary"
                                size="lg"
                              />
                            </core.CInputGroupText>
                            <CFormInputWithMask
                              floatingLabel="Phone Number"
                              placeholder="Phone Number"
                              mask="+55 (00) 00000-0000"
                              type="text"
                              id="validationDefault05"
                              value={phoneNumber}
                              onBlur={handlePhoneNumberBlur}
                              onChange={() => { }}
                              tabIndex={5}
                              required


                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={5} >
                          <core.CInputGroup size="sm">
                            <core.CInputGroupText id="ainputGroupPrepend02">
                              <CIcon
                                icon={cilEnvelopeClosed}
                                className="text-secondary"
                                size="lg"
                              />
                            </core.CInputGroupText>
                            <CFormInputWithMask
                              type="text"
                              mask="00000-000"
                              id="validationDefault06"
                              floatingLabel="Zip Code"
                              placeholder="Zip Code"
                              onBlur={handleZipCodeChange}
                              value={zipCode}
                              onChange={() => { }}
                              tabIndex={6}
                              required
                            />

                            <core.CButton color="secondary" onClick={handleZipCodeCheck}>Check Zip Code</core.CButton>

                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={5} className="mb-1" >
                          <core.CInputGroup size="sm">
                            <core.CInputGroupText id="ainputGroupPrepend02">
                              <CIcon
                                icon={cilHouse}
                                className="text-secondary"
                                size="lg"
                              />
                            </core.CInputGroupText>
                            <core.CFormInput
                              type="text"
                              id="validationDefault07"
                              floatingLabel="Address"
                              placeholder="Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              tabIndex={7}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={2} >
                          <core.CInputGroup>

                            <CFormInputWithMask
                              type="text"
                              mask="0000"
                              id="validationDefault08"
                              floatingLabel="Number"
                              placeholder="Number"
                              value={number}
                              onBlur={handleNumberBlur}
                              onChange={() => { }}
                              tabIndex={8}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={6} className="mb-1">
                          <core.CInputGroup>
                            <core.CFormInput
                              type="text"
                              id="validationDefault09"
                              floatingLabel="Complement"
                              placeholder="Complement"
                              value={complement}
                              onChange={(e) => setComplement(e.target.value)}
                              tabIndex={9}
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={6} className="mb-1">
                          <core.CInputGroup>
                            <core.CFormInput
                              type="text"
                              id="validationDefault09"
                              floatingLabel="Neighborhood"
                              placeholder="Neighborhood"
                              value={neighborhood}
                              onChange={(e) => setNeighborhood(e.target.value)}
                              tabIndex={10}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={5} className="mb-1" >
                          <core.CInputGroup size="sm">
                            <core.CInputGroupText id="ainputGroupPrepend02">
                              <CIcon
                                icon={cilGlobeAlt}
                                className="text-secondary"
                                size="lg"
                              />
                            </core.CInputGroupText>
                            <core.CFormInput
                              type="text"
                              id="validationDefault10"
                              floatingLabel="City"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              tabIndex={11}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={2} >
                          <core.CInputGroup>

                            <core.CFormInput
                              type="text"
                              id="validationDefault11"
                              floatingLabel="Region"
                              placeholder="Region"
                              value={region}
                              onChange={(e) => setRegion(e.target.value)}
                              tabIndex={12}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>
                        <core.CCol md={2} >
                          <core.CInputGroup>

                            <core.CFormInput
                              type="text"
                              id="validationDefault12"
                              floatingLabel="Country"
                              placeholder="Country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              tabIndex={13}
                              required
                            />
                          </core.CInputGroup>
                        </core.CCol>


                        <core.CCol md={10} >

                          <core.CFormCheck
                            className="mt-2 text-start"
                            type="checkbox"
                            id="invalidCheck"
                            label="Click to authorize the use of data"
                            onChange={handleCheckBoxChange}
                            tabIndex={14}
                            required
                          />

                        </core.CCol>
                        <core.CCol md={10} className="text-start">

                          <core.CButton
                            className="rounded border border-dark mt-2"
                            color="secondary"
                            type="submit"
                            tabIndex={15}

                          >
                            {showSpinner ? (
                              <core.CSpinner
                                as="span"
                                size="sm"
                                aria-hidden="true"
                                style={{ marginRight: "5px" }}
                              />
                            ) : (
                              "Verify Customer"
                            )}
                          </core.CButton>
                        </core.CCol>
                      </core.CInputGroup>
                    </core.CForm>
                  </core.CCardBody>
                </core.CCard>
              </core.CCardGroup>
            </core.CCol>

            <core.CCol>

              <core.CCard className="p-1 mt-1 border border-dark-subtitle border-top-1 shadow">

                <core.CCardHeader className="m-1 border-light fs-5 fw-bold">
                  Score
                </core.CCardHeader>
                <CSSTransition
                  in={!!nameScore}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <core.CCardBody style={{ display: 'd-flex', flexDirection: 'column', width: "260px", height: "200px", paddingTop: 0, gap: '10px' }}>
                    <div style={{ marginBottom: '5px' }}>
                      <core.CCardText className="text-start mb-1 fw-semibold"> Name Score</core.CCardText>
                      <ProgressBar className="" progress={nameScore} color={nameScore >= 60 ? 'green' : nameScore >= 30 ? 'orange' : 'red'} value={nameScore} />
                    </div>
                    <div>
                      <core.CCardText className="text-start mb-1 fw-semibold"> Address Score </core.CCardText>
                      <ProgressBar progress={addressScore} color={addressScore >= 60 ? 'green' : addressScore >= 30 ? 'orange' : 'red'} value={addressScore} />
                    </div>
                  </core.CCardBody>
                </CSSTransition>
              </core.CCard>

            </core.CCol>

          </core.CRow>

          <CSSTransition
            in={!!rowData.length}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <core.CCard className="p-1 m-1 border-dark-subtitle border-top-1 shadow">
              <core.CCardHeader className="m-1 border-light fs-4 text-start">
                Results
              </core.CCardHeader>
              <core.CCardBody className="m-0 p-0 border border-dark-subtitle rounded">
                <IcnVerifyTableDetail rows={rowData} propsFirstName={firstName} propsLastName={lastName} propsAddress={`${address}, ${number}, ${complement} - ${neighborhood} - ${region}, ${city} - ${country} - ${zipCode}`} />
              </core.CCardBody>
            </core.CCard>
          </CSSTransition>

        </core.CCard>





      </div >
    </>
  );
};

export default Verify_InsertPhone;
