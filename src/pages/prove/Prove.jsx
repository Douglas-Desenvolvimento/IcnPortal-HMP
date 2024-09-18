import React from 'react'
import Prove_InsertPhone from '../../components/prove_component/Prove_InsertPhone'
import { CContainer, CCard, CCardHeader } from "@coreui/react";

const Prove = ({ orgservices }) => {
  return (
    <>
      {orgservices.includes("TS_Portal") && (
        <CContainer fluid className="p-0 border border-dark-subtitle  border-top-3 shadow">

          <div>
            <CCard className="p-3 m-0 " >
              <CCardHeader className="p-1 m-0 bg-info bg-gradient border-light fs-4 text-light">TRUST SCORE PANEL</CCardHeader>
              <Prove_InsertPhone />
              <br />

            </CCard>
          </div>

        </CContainer>
      )}
    </>
  )
}

export default Prove
