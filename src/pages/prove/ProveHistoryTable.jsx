import React from 'react'

import { CContainer, CCard, CCardHeader } from "@coreui/react";
import IcnAllTable from '../../components/audit_component/icnAllTable';

const ProveHistoryTable = ({ orgservices }) => {
  return (
    <>
      {orgservices.includes("TS_Portal") && (
        <CContainer fluid className="p-0 border border-dark-subtitle  border-top-3 shadow">

          <div>
            <CCard className="p-3 m-0 " >
              <CCardHeader className="p-1 m-0 bg-secondary bg-gradient border-light fs-4 text-light">HISTORY</CCardHeader>
              <IcnAllTable />
              <br />

            </CCard>
          </div>

        </CContainer>
      )}
    </>
  )
}

export default ProveHistoryTable
