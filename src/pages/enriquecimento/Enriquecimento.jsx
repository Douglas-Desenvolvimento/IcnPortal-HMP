import React, { useState, useEffect } from "react";
import * as core from "@coreui/react";
import EnriquecimentoInsertCPF from "../../components/enriquecimento_component/EnriquecimentoInsertCPF";
import EnriquecimentoInsertCPFOnline from "../../components/enriquecimento_component/EnriquecimentoInsertCPFOnline";


const Enriquecimento = ({ orgservices, userrole, formattedNrCpf }) => {

    return (
        <>
            <div >
                {orgservices.includes("PF_Portal") && (
                    <core.CContainer fluid className="mt-1 py-3 bg-light border border-dark-subtitle justify-content-center shadow" >

                        <core.CTabs activeItemKey={1}>
                            <core.CTabList variant="underline" layout="fill">
                                <core.CTab className="shadow-sm py-2 bg-white fs-5 border border-botton border-light" aria-controls="online-tab-pane" itemKey={1}>Verify Data - Online</core.CTab>
                                <core.CTab className="shadow-sm py-2 bg-white fs-5 border border-botton border-light" aria-controls="history-tab-pane" itemKey={2}>Verify Data - History</core.CTab>
                                {/* <core.CTab aria-controls="history-tab-pane" itemKey={3}>Verify Data - TestOn</core.CTab> */}
                            </core.CTabList>
                            <core.CTabContent>
                                <core.CTabPanel className="shadow py-2 bg-white rounded-bottom" aria-labelledby="online-tab-pane" itemKey={1}>
                                    <core.CCard className="p-2 m-1 bg-light border-dark-subtitle border-top-3 shadow " >
                                        <core.CCardHeader className="p-1 m-0 bg-primary bg-gradient border-light fs-4 text-light ">VERIFY DATA</core.CCardHeader>
                                        <EnriquecimentoInsertCPFOnline />
                                        <core.CCardBody className="m-0 p-0">
                                            <br />
                                        </core.CCardBody>
                                    </core.CCard>
                                    <br />
                                </core.CTabPanel>
                                <core.CTabPanel className="shadow py-2 bg-white rounded-bottom" aria-labelledby="history-tab-pane" itemKey={2}>
                                    <core.CCard className="p-2 m-1 bg-light border-dark-subtitle border-top-3 shadow " >
                                        <core.CCardHeader className="p-1 m-0 bg-primary bg-gradient border-light fs-4 text-light ">VERIFY DATA</core.CCardHeader>
                                        <EnriquecimentoInsertCPF />
                                        <core.CCardBody className="m-0 p-0">
                                            <br />
                                        </core.CCardBody>
                                    </core.CCard>

                                    <br />

                                </core.CTabPanel>
                                {/* <core.CTabPanel className="py-3" aria-labelledby="history-tab-pane" itemKey={3}>
                                    <core.CCard className="p-1 m-1 border-dark-subtitle border-top-3 shadow " >
                                        <core.CCardHeader className="p-1 m-0 bg-primary bg-gradient border-light fs-4 text-light ">VERIFY DATA</core.CCardHeader>
                                        <EnriquecimentoInsertCPFOnlineT />
                                        <core.CCardBody className="m-0 p-0">
                                            <br />
                                        </core.CCardBody>
                                    </core.CCard>

                                    <br />

                                </core.CTabPanel> */}
                            </core.CTabContent>
                        </core.CTabs>
                    </core.CContainer>
                )}
            </div>
        </>
    )
}

export default Enriquecimento
