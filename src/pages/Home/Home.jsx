import React, { useState, useEffect } from "react";
//import { useSession } from "../../hooks/sessionToken";
import * as core from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBan } from "@coreui/icons";
import NavBar from "../../components/navBar";
import useAuthentication from "../../hooks/useAuthentication.jsx";
import { useNavigate } from 'react-router-dom';
import "../../App.css"
import AuditPage from '../audit/Audit.jsx';
import AdmUser from "../admUser/AdmUser.jsx";
import Voice from "../voice/Voice.jsx";
import ProvePage from "../prove/Prove.jsx";
import PreFillPage from "../prefill/PreFill.jsx";
import EnriquecimentoPage from "../enriquecimento/Enriquecimento.jsx";


import VerifyPage from "../verify/Verify.jsx";
import Sidebar from "../../components/sideBar.jsx";
import WelcomeHome from "./WelcomeHome.jsx";
import ProveHistoryTable from "../prove/ProveHistoryTable.jsx";



const Home = () => {

  const [narrow, setNarrow] = useState(true);

  const toggleNarrow = () => {
    setNarrow(!narrow);
  };

  const [activeComponent, setActiveComponent] = useState('WelcomeHome');

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  const { getLoggedInUser, useSession, logout } = useAuthentication();
  const [usuario, setUsuario] = useState(null);
  const [orgservices, setOrgServices] = useState([]);
  const [activeKey, setActiveKey] = useState(1);
  const [userrole, setUserRole] = useState(""); // Defina userrole no estado do componente
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  // const { visible } = useSession();

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const userData = await getLoggedInUser();



        // console.log("UDa", userData)
        if (!usuario) {
          setUsuario(userData);
          if (userData) {
            setOrgServices(userData.services);
            setUserRole(userData.RoleName); // Defina o valor de userrole
            setUserName(userData.loggedInUser);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error.message);
      }
    };

    fetchAllServices();
  }, [getLoggedInUser, usuario]);

  // const handleLogout = () => {
  //   logout();
  //   navigate('/');
  // };

  if (!usuario) {
    return null;
  }
  const handleClick = (key) => {
    setActiveKey(key); // Atualize activeKey com o índice da aba clicada
  };

  // console.log("orgservices:", orgservices);
  // console.log("activeKey:", activeKey);
  // console.log("userrole:", userrole);




  return (
    <>
      {/* conteúdo do home novo V2 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar onToggleNarrow={toggleNarrow} />
      </div>
      <div style={{ height: '85px' }} /> {/* Espaço reservado, ajuste a altura conforme necessário */}

      <Sidebar narrow={narrow} onNavClick={handleNavClick} />

      <div className="mt-0 pt-2 pb-2 pr-0 shadow bg-light-subtle bg-gradient rounded border border-light d-flex justify-content-center align-items-center" style={{ flex: '1 1 auto', overflow: 'auto', minHeight: '500px', minWidth: '1160px', marginLeft: 'auto' }}>
        <core.CContainer fluid>

          {activeComponent === 'WelcomeHome' && <WelcomeHome orgservices={orgservices} userrole={userrole} username={username} />}
          {activeComponent === 'Audit' && <AuditPage orgservices={orgservices} userrole={userrole} />}
          {activeComponent === 'MReputAnalisys' && <ProvePage orgservices={orgservices} userrole={userrole} />}
          {activeComponent === 'MReputHistory' && <ProveHistoryTable orgservices={orgservices} userrole={userrole} />}
          {activeComponent === 'Verify' && <VerifyPage orgservices={orgservices} userrole={userrole} />}
          {activeComponent === 'PreFill' && <PreFillPage orgservices={orgservices} userrole={userrole} />}
          {activeComponent === 'JcaEnriquecimento' && <EnriquecimentoPage orgservices={orgservices} userrole={userrole} />}

        </core.CContainer>
      </div>







      {/* conteúdo do home antigo V1

      <core.CContainer fluid className="shadow-custom p-3 mt-5 bg-light-subtle bg-gradient rounded-bottom">
        <div>


          {visible && (
            <core.CModal
              backdrop="static"
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="StaticBackdropExampleLabel"
              className="d-flex justify-content-center"
            >
              <core.CModalHeader className="d-flex justify-content-center">
                <core.CModalTitle className="d-flex justify-content-center" id="StaticBackdropExampleLabel">Sessão Expirada, efetue um novo login</core.CModalTitle>
              </core.CModalHeader>
              <core.CModalBody className="d-flex justify-content-center align-items-center">
                <CIcon
                  color="black"
                  icon={cilBan}
                  width={84}
                  height={84}
                />
              </core.CModalBody>
              <core.CModalFooter className="d-flex justify-content-center">
                <core.CButton onClick={handleLogout} color="primary">Login</core.CButton>
              </core.CModalFooter>
            </core.CModal>
          )}
          <br />
          <core.CContainer fluid className="shadow-custom p-1 bg-light bg-gradient rounded">
            <core.CNav variant="tabs" role="tablist" >
              {orgservices.includes("AU_Portal") && (
                <core.CNavItem>
                  <core.CNavLink
                    href="#"
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}
                  >
                    Dashboard
                  </core.CNavLink>
                </core.CNavItem>
              )}
              {orgservices.includes("TS_Portal") && (
                <core.CNavItem>
                  <core.CNavLink
                    href="#"
                    active={activeKey === 2}
                    onClick={() => handleClick(2)} // Chame handleClick com o índice da aba
                  >
                    Mobile Reputation Analisys
                  </core.CNavLink>
                </core.CNavItem>
              )}
              {orgservices.includes("TS_Portal") && (
                <core.CNavItem>
                  <core.CNavLink
                    href="#"
                    active={activeKey === 3}
                    onClick={() => handleClick(3)} // Chame handleClick com o índice da aba
                  >
                    Mobile Reputation History
                  </core.CNavLink>
                </core.CNavItem>
              )}

              {orgservices.includes("NVC_Portal") && (
                <core.CNavItem>
                  <core.CNavLink
                    href="#"
                    active={activeKey === 4}
                    onClick={() => handleClick(4)} // Chame handleClick com o índice da aba
                  >
                    VOICE
                  </core.CNavLink>
                </core.CNavItem>
              )}
              {userrole.includes("nadmin") || userrole.includes("nsuperAdm") && (
                <core.CNavItem>
                  <core.CNavLink
                    href="#"
                    active={activeKey === 5}
                    onClick={() => handleClick(5)} // Chame handleClick com o índice da aba
                  >
                    ADMIN
                  </core.CNavLink>
                </core.CNavItem>
              )}
              {orgservices.includes("VF_Portal") && (
                <core.CNavItem>
                  <core.CNavLink
                    href="#"
                    active={activeKey === 6}
                    onClick={() => handleClick(6)} // Chame handleClick com o índice da aba
                  >
                    Verify
                  </core.CNavLink>
                </core.CNavItem>
              )}
            </core.CNav>

            <core.CTabContent>
              <core.CTabPane
                role="tabpanel"
                aria-labelledby="Dashboard"
                visible={activeKey === 1}
              >
                
              <AuditPage orgservices={orgservices} userrole={userrole} />
                
              </core.CTabPane>
              <core.CTabPane
                role="tabpanel"
                aria-labelledby="Reputation Analisys"
                visible={activeKey === 2}>
                <Prove orgservices={orgservices} userrole={userrole} />
              </core.CTabPane>
              <core.CTabPane
                role="tabpanel"
                aria-labelledby="Reputation history"
                visible={activeKey === 3}>
                <IcnAllTable orgservices={orgservices} userrole={userrole} />
              </core.CTabPane>
              <core.CTabPane
                role="tabpanel"
                aria-labelledby="VOICE"
                visible={activeKey === 4}>
                <Voice orgservices={orgservices} userrole={userrole} />
              </core.CTabPane>
              <core.CTabPane
                role="tabpanel"
                aria-labelledby="ADMIN"
                visible={activeKey === 5}>
                <AdmUser orgservices={orgservices} userrole={userrole} />
              </core.CTabPane>
              <core.CTabPane
                role="tabpanel"
                aria-labelledby="Verify"
                visible={activeKey === 6}>
                <VerifyPage orgservices={orgservices} userrole={userrole} />
              </core.CTabPane>

            </core.CTabContent>
          </core.CContainer>

        </div>
      </core.CContainer>


 */}

    </>
  );
};

export default Home;
