import React from 'react'
import * as core from "@coreui/react";
import IcnWidgetConsumReq from '../../components/dashborad_Components/icnWidgetConsumReq';




const Audit = ({ orgservices, userrole, formattedPhoneNumber }) => {
  return (
    <>
      <div className='mx-auto' style={{ width: "auto" }} >
        {orgservices.includes("AU_Portal") && (

          <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow " >
            <core.CCardHeader className="p-1 m-0 bg-success bg-gradient border-light fs-4 text-light">DASHBOARDS</core.CCardHeader>
            <core.CCardBody className="m-0 p-0 ">



              <core.CCard className="p-1 m-3 border-dark-subtitle border-top-3 shadow " >
                <core.CCardHeader className="mb-2 border-light fs-4 ">
                  Mobile Reputation
                </core.CCardHeader>
                <core.CCardBody className="m-0 p-0 ">
                  <IcnWidgetConsumReq />
                </core.CCardBody>
              </core.CCard>
            </core.CCardBody>
          </core.CCard>




          //     {/* <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow">
          //       <core.CCardHeader className="m-1 border-light fs-4 ">
          //         Data Verify
          //       </core.CCardHeader>
          //       <core.CCardBody className="m-0 p-0 ">
          //         <IcnWidgetConsumReq metricnames={["c-dataverify", "c-dataverify-m", "c-dataverify-w"]} />
          //       </core.CCardBody>
          //     </core.CCard>

          //     <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow">
          //       <core.CCardHeader className="m-1 border-light fs-4 ">
          //         Onborading
          //       </core.CCardHeader>
          //       <core.CCardBody className="m-0 p-0 ">
          //         <IcnWidgetConsumReq />
          //       </core.CCardBody>
          //     </core.CCard>

          //     <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow">
          //       <core.CCardHeader className="m-1 border-light fs-4 ">
          //         Autentication (Instant Link)
          //       </core.CCardHeader>
          //       <core.CCardBody className="m-0 p-0 ">
          //         <IcnWidgetConsumReq />
          //       </core.CCardBody>
          //     </core.CCard> */}

          // {/* <IcnChartLineAll /> */}

          // {/* {(userrole.includes("superAdm") || userrole.includes("admin") || userrole.includes("analyst")) ? (
          //       <NewWidget userrole={userrole} />
          //     ) : null} */}




        )}
      </div>
    </>

  )
}

export default Audit
