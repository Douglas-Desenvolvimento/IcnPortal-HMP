import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CNavbar,
  CNavbarBrand,
  CButton,
  CAvatar,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAccountLogout, cilMenu } from "@coreui/icons";
import useAuthentication from "../hooks/useAuthentication.jsx";
import "../App.css";

const NavBar = ({ onToggleNarrow }) => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const { getLoggedInUser, logout } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = getLoggedInUser();
      setUsuario(user);
      if (user) {
        try {
          // Additional code if needed
        } catch (error) {
          console.error('Erro ao chamar a API Trust:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    setModalVisible(false);
    navigate("/");
  };

  return (
    <>
      <div style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,

        width: '100vw',
        overflowY: 'auto'

      }} >
        <CNavbar className="bg-dark bg-gradient custom-navbar">
          <CButton onClick={onToggleNarrow}>
            <CIcon icon={cilMenu} className="text-light" size="xxl" />
          </CButton>
          <CNavbarBrand className="text-light text-center fs-2">FRAUD PORTAL</CNavbarBrand>
          <div className="navbar-right-section">
            <CAvatar
              size="md"
              src="/no-avatar.jpg"
              className="avatar-img"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
              onClick={() => setVisible(!visible)}
            />
            <CButton
              onClick={() => setModalVisible(!modalVisible)}
              style={{ marginLeft: "10px" }}
            >
              <CIcon icon={cilAccountLogout} className="text-light" size="xl" title="Logout" />
            </CButton>
          </div>
          <CModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
          >
            <CModalBody onClose={() => setModalVisible(false)}>
              <p>Do you want to leave?</p>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                No!
              </CButton>
              <CButton color="success" onClick={handleLogout}>
                Yes!
              </CButton>
            </CModalFooter>
          </CModal>
          <COffcanvas
            id="offcanvasNavbar"
            placement="end"
            portal={false}
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <COffcanvasHeader className="justify-content-between p-2">
              <CCloseButton
                className="text-reset d-flex"
                onClick={() => setVisible(false)}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <COffcanvasTitle>Profile</COffcanvasTitle>
              <CNavbarNav>
                <CNavItem>
                  <CNavLink href="#"></CNavLink>
                  <CListGroup className="shadow-sm rounded-2">
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      Name:
                      <div className="bg-light lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.loggedInUser : "Não disponível"}
                      </div>
                    </CListGroupItem>
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      E-mail:
                      <div className="bg-light lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.email : "Não disponível"}
                      </div>
                    </CListGroupItem>
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      Phone:
                      <div className="bg-light lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.mobile : "Não disponível"}
                      </div>
                    </CListGroupItem>
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      Organization:
                      <div className="bg-light lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.orgname : "Não disponível"}
                      </div>
                    </CListGroupItem>
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      Site-id:
                      <div className="bg-light lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.siteid : "Não disponível"}
                      </div>
                    </CListGroupItem>
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      Access Profile:{" "}
                      <div className="bg-light lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.RoleName : "Não disponível"}
                      </div>
                    </CListGroupItem>
                    <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                      Serviços:{" "}
                      <div className="bg-light text-break lh-1 fw-medium fs-8 bg-gradient rounded shadow-sm">
                        {usuario ? usuario.services : "Não disponível"}
                      </div>
                    </CListGroupItem>
                  </CListGroup>
                </CNavItem>
              </CNavbarNav>
            </COffcanvasBody>
          </COffcanvas>
        </CNavbar>
      </div>
    </>
  );
};

export default NavBar;
