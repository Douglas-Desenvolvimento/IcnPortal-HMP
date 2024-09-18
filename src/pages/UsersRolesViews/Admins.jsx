import React from 'react';
import * as core from "@coreui/react";
//import NewWidget from '../../components/newWidget';
import { orgservices } from '../manut/Manutencao';


const Admins = () => {
  return (
    <div>
      <core.CCallout color="primary">
        Conteúdo do perfil de administrador

        <core.CRow>
          {/* Card TS */}
          {orgservices.includes("TS_Portal") && (
            <core.CCol sm={6}>
              <core.CCard>
                <core.CCardBody>
                  <core.CCardTitle>TS_Portal</core.CCardTitle>
                </core.CCardBody>
              </core.CCard>
            </core.CCol>
          )}

          {/* Card AT */}
          {orgservices.includes("AU_Portal") && (
            <core.CCol sm={6}>
              <core.CCard>
                <core.CCardBody>
                  <core.CCardTitle>AU_Portal</core.CCardTitle>
                </core.CCardBody>
              </core.CCard>
            </core.CCol>
          )}

          {/* Card PF */}
          {orgservices.includes("PF_Portal") && (
            <core.CCol sm={6}>
              <core.CCard>
                <core.CCardBody>
                  <core.CCardTitle>PF_Portal</core.CCardTitle>
                </core.CCardBody>
              </core.CCard>
            </core.CCol>
          )}

          {/* Card VF */}
          {orgservices.includes("VF_Portal") && (
            <core.CCol sm={6}>
              <core.CCard>
                <core.CCardBody>
                  <core.CCardTitle>PF_Portal</core.CCardTitle>
                </core.CCardBody>
              </core.CCard>
            </core.CCol>
          )}
        </core.CRow>
      </core.CCallout>
    </div>
  );
};

export default Admins;
