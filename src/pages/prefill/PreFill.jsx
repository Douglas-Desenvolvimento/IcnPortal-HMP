import React from 'react'
import * as core from "@coreui/react";


const PreFill = ({ orgservices, userrole, formattedPhoneNumber }) => {
  return (
    <>
      <div >
        {orgservices.includes("PF_Portal") && (
          <core.CContainer fluid className="mt-1 p-1 shadow bg-light-subtle bg-gradient rounded border border-light justify-content-center" >

            <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow " >
              <core.CCardHeader className="p-1 m-0 bg-primary bg-gradient border-light fs-4 text-light">PREFILL PANEL</core.CCardHeader>
              <core.CCardBody className="m-0 p-0 ">


              </core.CCardBody>
            </core.CCard>

            {/* <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow">
            <core.CCardHeader className="m-1 border-light fs-4 ">
              Data Verify
            </core.CCardHeader>
            <core.CCardBody className="m-0 p-0 ">
              <IcnWidgetConsumReq metricnames={["c-dataverify", "c-dataverify-m", "c-dataverify-w"]} />
            </core.CCardBody>
          </core.CCard>

          <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow">
            <core.CCardHeader className="m-1 border-light fs-4 ">
              Onborading
            </core.CCardHeader>
            <core.CCardBody className="m-0 p-0 ">
              <IcnWidgetConsumReq />
            </core.CCardBody>
          </core.CCard>

          <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow">
            <core.CCardHeader className="m-1 border-light fs-4 ">
              Autentication (Instant Link)
            </core.CCardHeader>
            <core.CCardBody className="m-0 p-0 ">
              <IcnWidgetConsumReq />
            </core.CCardBody>
          </core.CCard> */}

            {/* <IcnChartLineAll /> */}

            {/* {(userrole.includes("superAdm") || userrole.includes("admin") || userrole.includes("analyst")) ? (
            <NewWidget userrole={userrole} />
          ) : null} */}
            <br />


          </core.CContainer>
        )}
      </div>
    </>
  )
}

export default PreFill
