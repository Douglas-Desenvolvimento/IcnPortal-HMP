import React, { useState, useEffect, useRef } from "react";
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

const IcnVerifyTableDetail = ({ rows, propsFirstName, propsLastName, propsAddress }) => {
    const { getLoggedInUser } = useAuthentication();
    const [usuario, setUsuario] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {

        if (propsFirstName && propsLastName && propsAddress) {

            setFirstName(propsFirstName);
            setLastName(propsLastName);
            setAddress(propsAddress);
            // console.log("Valor de propsFirstName:", firstName);
            // console.log("Valor de propsLastName:", lastName);
            // console.log("Valor de propsAddress:", address);
        }

    }, [propsFirstName, propsLastName, propsAddress]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = getLoggedInUser();
            setUsuario(user);


            if (user) {
                try {



                } catch (error) {
                    console.error('Erro ao chamar usuário:', error);
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
        const headers = ["Mobile", "Username", "SiteID", "Request ID", "Timestamp"];
        const data = rows.map(row => [row.mobile, row.username, row.siteid, row.requestId, row.timestamp]);
        doc.autoTable({
            startY: 90,
            head: [headers],
            body: data
        });

        doc.line(10, doc.autoTable.previous.finalY + 10, 200, doc.autoTable.previous.finalY + 10); // Desenha uma linha

        // Detalhes

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
                            <CCard className="p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow">
                                <CContainer >
                                    <CListGroup className="m-0 p-0" xs={{ cols: 2 }}>

                                        <CListGroupItem className="d-flex justify-content-between align-items-center" >
                                            <span className="fs-5">First Name  {firstName || "Not available"}</span>
                                            <span className="fs-6 fw-semibold">{row.firstName || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Last Name  {lastName || "Not available"} </span>
                                            <span className="fs-6 fw-semibold">{row.lastName || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Name Score  </span>
                                            <span className="fs-4 fw-semibold">{row.nameScore || "Not available"}</span>


                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Address </span>
                                            <span className="fs-6 fw-semibold"> {address || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Address Score </span>
                                            <span className="fs-4 fw-semibold">{row.addressScore || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Indicators </span>
                                            <span className="fs-6 fw-semibold">{row.indicators.join(', ') || "Not available"} </span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Identifiers </span>
                                            <span className="fs-6 fw-semibold">{Array.isArray(row.identifiers) ? row.identifiers.join(', ') : "Not available"}</span>
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
                            <CCard className="p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow">
                                <CContainer >
                                    <CListGroup className="m-0 p-0" xs={{ cols: 2 }}>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Carrier </span>
                                            <span className="fs-6 fw-semibold">{row.carrier || "Not available"} </span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Line Type </span>
                                            <span className="fs-6 fw-semibold">{row.lineType || "Not available"} </span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Country Code </span>
                                            <span className="fs-6 fw-semibold">{row.countryCode || "Not available"} </span>
                                        </CListGroupItem>
                                        <CListGroupItem className="fs-6 d-flex justify-content-between align-items-center">
                                            <span className="fs-5">Troubleshooting Id</span>
                                            <span className="fs-6 fw-semibold">{row.troubleshootingId || "Not available"}</span>
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


export default IcnVerifyTableDetail;
