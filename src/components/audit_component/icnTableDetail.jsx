import React, { useState, useEffect, useRef } from "react";
import IcnAllTable from "./icnAllTable"
import useAuthentication from '../../hooks/useAuthentication';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCard,
    CCardFooter,
    CCardBody,
    CCardHeader,
    CAccordion,
    CAccordionItem,
    CAccordionBody,
    CAccordionHeader,
    CContainer,
    CListGroup,
    CListGroupItem

} from '@coreui/react';
import CIcon from "@coreui/icons-react";
import { cilDataTransferDown } from "@coreui/icons";
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IcnTableDetail = ({ rows }) => {
    const { getLoggedInUser, logout } = useAuthentication();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = getLoggedInUser();
            setUsuario(user);

            if (user) {
                try {


                } catch (error) {
                    console.error('Erro ao chamar a API Trust:', error);
                }
            }
        };

        fetchUser();

    }, []);



    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        // Cabeçalho
        doc.text(`Data e hora da exportação: ${new Date().toLocaleString()}`, 10, 10);
        doc.text(`Nome do usuário: ${usuario.loggedInUser}`, 10, 30); // Substitua 'username' pelo nome do usuário
        doc.text(`Organização: ${usuario.orgname}`, 10, 50); // Substitua 'organization' pela organização
        doc.text(`Request ID: ${rows.requestId}`, 10, 70); // Substitua 'requestId' pelo ID da solicitação

        doc.line(10, 80, 200, 80); // Desenha uma linha

        // Corpo
        const headers = ["Mobile", "Username", "SiteID", "Request ID", "Timestamp", "Trustscore"];
        const data = rows.map(row => [row.mobile, row.username, row.siteid, row.requestId, row.timestamp, row.trustscore]);
        doc.autoTable({
            startY: 90,
            head: [headers],
            body: data
        });

        doc.line(10, doc.autoTable.previous.finalY + 10, 200, doc.autoTable.previous.finalY + 10); // Desenha uma linha

        // Detalhes
        doc.text(`Risk level: ${rows.riskLevel || "Not available"}`, 10, doc.autoTable.previous.finalY + 30);

        doc.line(10, doc.autoTable.previous.finalY + 40, 200, doc.autoTable.previous.finalY + 40); // Desenha uma linha

        // Informações do número
        doc.text(`Carrier: ${rows.carrier || "Not available"}`, 10, doc.autoTable.previous.finalY + 60);
        doc.text(`Line Type: ${rows.lineType || "Not available"}`, 10, doc.autoTable.previous.finalY + 80);
        doc.text(`Country Code: ${rows.countryCode || "Not available"}`, 10, doc.autoTable.previous.finalY + 100);

        doc.line(10, doc.autoTable.previous.finalY + 110, 200, doc.autoTable.previous.finalY + 110); // Desenha uma linha

        // ID de solução de problemas
        doc.text(`Troubleshooting Id: ${rows.troubleshootingId || "Not available"}`, 10, doc.autoTable.previous.finalY + 130);

        doc.line(10, doc.autoTable.previous.finalY + 140, 200, doc.autoTable.previous.finalY + 140); // Desenha uma linha

        // Rodapé
        doc.text(`Data e hora da exportação: ${new Date().toLocaleString()}`, 10, 10);
        doc.text(`Nome do usuário: ${usuario.loggedInUser}`, 10, 30); // Substitua 'username' pelo nome do usuário
        doc.text(`Organização: ${usuario.orgname}`, 10, 50); // Substitua 'organization' pela organização
        doc.text(`Request ID: ${rows.requestId}`, 10, 70); // Substitua 'requestId' pelo ID da solicitação

        doc.save("Results.pdf")


        doc.autoTable(content);
        doc.save("Results.pdf")
    }


    return (
        <>
            {/* <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Username</CTableHeaderCell>
                        <CTableHeaderCell>Site ID</CTableHeaderCell>
                        <CTableHeaderCell>Request ID</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                        <CTableHeaderCell>Timestamp</CTableHeaderCell>
                        <CTableHeaderCell>Mobile</CTableHeaderCell>
                        <CTableHeaderCell>Trustscore</CTableHeaderCell>
                        <CTableHeaderCell>Indicators</CTableHeaderCell>
                        <CTableHeaderCell>Risk Level</CTableHeaderCell>
                        <CTableHeaderCell>Troubleshooting ID</CTableHeaderCell>
                        <CTableHeaderCell>Carrier</CTableHeaderCell>
                        <CTableHeaderCell>Line Type</CTableHeaderCell>
                        <CTableHeaderCell>Country Code</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {rows.map((row, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{row.username}</CTableDataCell>
                            <CTableDataCell>{row.siteid}</CTableDataCell>
                            <CTableDataCell>{row.requestId}</CTableDataCell>
                            <CTableDataCell>{row.status}</CTableDataCell>
                            <CTableDataCell>{row.timestamp}</CTableDataCell>
                            <CTableDataCell>{row.mobile}</CTableDataCell>
                            <CTableDataCell>{row.trustscore}</CTableDataCell>
                            <CTableDataCell>{row.indicators.join(', ')}</CTableDataCell>
                            <CTableDataCell>{row.riskLevel}</CTableDataCell>
                            <CTableDataCell>{row.troubleshootingId}</CTableDataCell>
                            <CTableDataCell>{row.carrier}</CTableDataCell>
                            <CTableDataCell>{row.lineType}</CTableDataCell>
                            <CTableDataCell>{row.countryCode}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable> */}
            {/* <button onClick={exportPDF}>Exportar para PDF</button> */}
            <CSVLink
                data={rows}
                filename={"Results.csv"}
                className="btn btn-transparent position-absolute end-0"
                style={{ right: "10px", top: "10px" }}
            >
                Download csv
                <CIcon
                    icon={cilDataTransferDown}
                    className="text-secondary"
                    size="xl"
                    title="CSV Download"
                    data-bs-toggle="tooltip"
                    data-bs-title="Another one here too"
                />
            </CSVLink>
            <CTable className="m-0">

                <CTableHead className="mb-1 table-secondary border-dark  fs-6 fw-bold align-text-top ">
                    <CTableRow >
                        <CTableHeaderCell >Mobile</CTableHeaderCell>
                        <CTableHeaderCell>Username</CTableHeaderCell>
                        <CTableHeaderCell>Site ID</CTableHeaderCell>
                        <CTableHeaderCell>Request ID</CTableHeaderCell>
                        <CTableHeaderCell>Timestamp</CTableHeaderCell>
                        <CTableHeaderCell>Trustscore</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody className="fs-8">
                    {rows.map((row, index) => (
                        <CTableRow key={index} >
                            <CTableDataCell >{row.mobile}</CTableDataCell>
                            <CTableDataCell>{row.username}</CTableDataCell>
                            <CTableDataCell>{row.siteid}</CTableDataCell>
                            <CTableDataCell>{row.requestId}</CTableDataCell>
                            <CTableDataCell>{row.timestamp}</CTableDataCell>
                            <CTableDataCell>{row.trustscore}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {rows.map((row, index) => (
                <CAccordion alwaysOpen key={index}>

                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader className="fs-6 fw-3">
                            Details
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CCard className={`p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow`}>
                                <CContainer >
                                    <CListGroup className="m-0 p-0" xs={{ cols: 2 }}>

                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            Risk Level
                                            <CListGroupItem className="bg-light lh-2 fw-medium fs-6 bg-gradient rounded shadow-sm" >
                                                {row.riskLevel || "Not available"}
                                            </CListGroupItem>
                                        </CListGroupItem>

                                    </CListGroup>

                                </CContainer>
                            </CCard>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                        <CAccordionHeader>
                            Number Info
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CCard className={`p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow`}>
                                <CContainer >
                                    <CListGroup className="m-0 p-0" xs={{ cols: 2 }}>
                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            Carrier
                                            <CListGroupItem className="bg-light lh-2 fw-medium fs-6 bg-gradient rounded shadow-sm" >
                                                {row.carrier || "Not available"}
                                            </CListGroupItem>
                                        </CListGroupItem>
                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            Line Type
                                            <CListGroupItem className="bg-light lh-2 fw-medium fs-6 bg-gradient rounded shadow-sm" >
                                                {row.lineType || "Not available"}

                                            </CListGroupItem>
                                        </CListGroupItem>
                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            Country Code
                                            <CListGroupItem className="bg-light lh-2 fw-medium fs-6 bg-gradient rounded shadow-sm" >
                                                {row.countryCode || "Not available"}

                                            </CListGroupItem>
                                        </CListGroupItem>
                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            Troubleshooting Id
                                            <CListGroupItem className="bg-light lh-2 fw-medium fs-6 bg-gradient rounded shadow-sm" >
                                                {row.troubleshootingId || "Not available"}



                                            </CListGroupItem>
                                        </CListGroupItem>




                                    </CListGroup>

                                </CContainer>
                            </CCard>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={3}>
                        <CAccordionHeader>Indicators</CAccordionHeader>
                        <CAccordionBody>
                            <CCard className={`p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow`}>
                                <CContainer >
                                    <CListGroup className="m-0 p-0" xs={{ cols: 2 }}>

                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            Indicators
                                            <CListGroupItem className="bg-light lh-2 fw-medium fs-6 bg-gradient rounded shadow-sm" >
                                                {row.indicators.join(', ') || "Not available"}
                                            </CListGroupItem>
                                        </CListGroupItem>

                                    </CListGroup>

                                </CContainer>
                            </CCard>
                        </CAccordionBody>
                    </CAccordionItem>

                </CAccordion>
            ))}


        </>
    );
};


export default IcnTableDetail;
