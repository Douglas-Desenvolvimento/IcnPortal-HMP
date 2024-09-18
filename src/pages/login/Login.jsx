import React, { useState } from "react";
import "../../App.css"
import useAuthentication from "../../hooks/useAuthentication.jsx";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked } from "@coreui/icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuthentication();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await login(username, password);
  };
  return (
    <>
      <CContainer fluid className="d-flex align-items-center min-vh-100">
        <CRow className="justify-content-center">
          <CCol s={6} m={7}>
            <CImage src="/Oakmont Branca.png" width={320} height={300} style={{ marginBottom: '0px' }} />
          </CCol>
          <CCardGroup>
            <CCard style={{ paddingBottom: "0.1rem", paddingTop: "0.5rem" }} className="mt-1 shadow-custom rounded-4 bg-gradient d-flex flex-row align-items-center">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Login</h1>
                  <p className="text-body-secondary">Sign In to your account</p>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} className="text-secondary" size="lg" title="username" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} className="text-secondary" size="lg" title="password" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={12} className="text-center">
                      <CButton type="submit" color="secondary" className="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                  {error && <p className="text-danger">{error}</p>}
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CRow>
      </CContainer>
    </>
  );
};

export default Login;
