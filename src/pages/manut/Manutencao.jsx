import React, { useState, useEffect } from "react";
import * as core from "@coreui/react";
import useAuthentication from "../../hooks/useAuthentication.jsx";
import IcnWidgetConsumReq from "../../components/dashborad_Components/icnWidgetConsumReq.jsx";
import NavBar from '../../components/navBar.jsx'
import Prove from '../prove/Prove.jsx'
import Sidebar from "../../components/sideBar.jsx";
import IcnAllTable from "../../components/audit_component/icnAllTable.jsx";
import Audit from "../audit/Audit.jsx";


export let orgservices = [];
export let userrole = [];

const Manutencao = () => {

  const [activeComponent, setActiveComponent] = useState(null);

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };
  const [narrow, setNarrow] = useState(true);

  const toggleNarrow = () => {
    setNarrow(!narrow);
  };
  const { getLoggedInUser } = useAuthentication();
  const [userData, setUserData] = useState(null);
  const [activeKey, setActiveKey] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getLoggedInUser();
      setUserData(user);
      if (user) {
        orgservices = user.services;
        userrole = user.role;
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return null;
  }

  console.log("manut - Services:", orgservices);

  const handleClick = (key) => {
    setActiveKey(key); // Atualize activeKey com o índice da aba clicada
  };



  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar onToggleNarrow={toggleNarrow} />
        <div style={{ height: '50px' }} /> {/* Espaço reservado, ajuste a altura conforme necessário */}
        <div style={{ display: 'flex', flex: '1 1 auto' }}>
          <Sidebar narrow={narrow} onNavClick={handleNavClick} />
          <div className="mt-0 pt-2 pb-2 pr-0 shadow bg-light-subtle bg-gradient rounded border border-light" style={{ flex: '1 1 auto', overflow: 'auto', minHeight: '500px', minWidth: '1160px', marginLeft: 'auto' }}>
            <core.CContainer fluid>
              {/* <IcnWidgetConsumReq /> */}

              {activeComponent === 'Audit' && <Audit orgservices={orgservices} userrole={userrole} />}

              {activeComponent === 'MReputAnalisys' && <Prove orgservices={orgservices} userrole={userrole} />}
              {activeComponent === 'MReputHistory' && <IcnAllTable orgservices={orgservices} userrole={userrole} />}
            </core.CContainer>
          </div>
        </div>
      </div>
      <core.CFooter className="bg-dark bg-gradient px-0" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 3, width: '1500px' }}>
        <div>
          <core.CLink href="https://coreui.io">CoreUI</core.CLink>
          <span>&copy; 2024 creativeLabs.</span>
        </div>
        <div>
          <span>Powered by</span>
          <core.CLink href="https://coreui.io">CoreUI</core.CLink>
        </div>
      </core.CFooter>
    </>

  );
};
export default Manutencao;
