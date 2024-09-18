import React, { useState, useEffect } from "react";
import useAuthentication from '../../hooks/useAuthentication';
import { CIcon } from '@coreui/icons-react';
import { cilFullscreen, cilFullscreenExit } from '@coreui/icons';

import {
    CCol,
    CButton,
    CCollapse,
    CCard,
    CCardBody,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CContainer,
    CListGroup,
    CListGroupItem,
    CRow,
    CFormInput,
} from '@coreui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EnriquecimentoTableDetail = ({ rows }) => {
    const [expandido, setExpandido] = useState(false);
    const [nCpf, setNCpf] = useState("");
    const { getLoggedInUser } = useAuthentication();
    const [usuario, setUsuario] = useState(null);
    const [visibleInfo, setVisibleInfo] = useState(true);
    const [visibleAdd, setVisibleAdd] = useState(true);
    const [visibleAdd1, setVisibleAdd1] = useState(false);
    const [visibleAdd2, setVisibleAdd2] = useState(false);
    const [visibleAdd3, setVisibleAdd3] = useState(false);
    const [visibleAdd4, setVisibleAdd4] = useState(false);
    const [visibleAdd5, setVisibleAdd5] = useState(false);
    const [visibleTel1, setvisibleTel1] = useState(false);
    const [visibleTel2, setvisibleTel2] = useState(false);
    const [visibleTel3, setvisibleTel3] = useState(false);
    const [visibleTel4, setvisibleTel4] = useState(false);
    const [visibleTel5, setvisibleTel5] = useState(false);
    const [visiblemail1, setVisiblemail1] = useState(false);
    const [visiblemail2, setVisiblemail2] = useState(false);
    const [visiblemail3, setVisiblemail3] = useState(false);
    const [visiblemail4, setVisiblemail4] = useState(false);
    const [visiblemail5, setVisiblemail5] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            const user = getLoggedInUser();
            setUsuario(user);
            console.log("Rows prop received:", rows);
        };

        fetchUser();
    }, [rows]);

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        doc.text(`Data e hora da exportação: ${new Date().toLocaleString()}`, 10, 10);
        doc.text(`Nome do usuário: ${usuario ? usuario.loggedInUser : 'Unknown User'}`, 10, 30);

        const headers = ["Nome Completo", "CPF", "Telefone recebido", "E-mail recebido"];
        const data = Array.isArray(rows) ? rows.map(row => [row.name_completo, row.nr_cpf, row.phone_recebido, row.email_recebido]) : [];

        doc.autoTable({
            startY: 90,
            head: [headers],
            body: data
        });

        doc.save("Results.pdf");
    };

    const handleExpandCollapse = () => {
        // Verifica se todos os componentes estão atualmente expandidos
        const allExpanded = visibleInfo && visibleAdd && visibleAdd1 && visibleAdd2 && visibleAdd3 && visibleAdd4 &&
            visibleAdd5 && visiblemail1 && visiblemail2 && visiblemail3 && visiblemail4 && visiblemail5 &&
            visibleTel1 && visibleTel2 && visibleTel3 && visibleTel4 && visibleTel5;

        // Se todos estão expandidos, colapsa todos, caso contrário, expande todos
        const newExpandido = !allExpanded;

        setExpandido(newExpandido);
        setVisibleInfo(newExpandido);
        setVisibleAdd(newExpandido);
        setVisibleAdd1(newExpandido);
        setVisibleAdd2(newExpandido);
        setVisibleAdd3(newExpandido);
        setVisibleAdd4(newExpandido);
        setVisibleAdd5(newExpandido);
        setVisiblemail1(newExpandido);
        setVisiblemail2(newExpandido);
        setVisiblemail3(newExpandido);
        setVisiblemail4(newExpandido);
        setVisiblemail5(newExpandido);
        setvisibleTel1(newExpandido);
        setvisibleTel2(newExpandido);
        setvisibleTel3(newExpandido);
        setvisibleTel4(newExpandido);
        setvisibleTel5(newExpandido);
    };



    const validRows = Array.isArray(rows) ? rows : [rows];

    return (
        <>
            <div className="d-flex justify-content-between">
                <CButton
                    className="rounded border border-secondary mb-2 mt-1 pb-1"
                    color="transparent"
                    onClick={handleExpandCollapse}
                >
                    <CIcon
                        icon={expandido ? cilFullscreen : cilFullscreenExit}
                        className="text-dark"
                        size="lg"
                        title={expandido ? "Collapse All" : "Expand All"}
                    />
                    {expandido ? " Collapse All" : " Expand All"}
                </CButton>
            </div>
            <CCard className="p-1 mb-1 bg-light bg-gradient border-dark-subtitle border-top-3 shadow ">
                {validRows.length > 0 ? validRows.map((row, index) => (
                    <CRow key={index} xs={{ gutter: 0 }}>
                        <CCol md>
                            <CFormInput
                                className="fw-bold border-0 border-end rounded-0"
                                type="text"
                                id={`floatingInputGridName${index}`}
                                floatingLabel="Nome"
                                value={row.nm_completo}
                            />
                        </CCol>
                        <CCol md>
                            <CFormInput
                                className="fw-bold border-0 border-end rounded-0"
                                type="text" // Use 'text' e formate o valor se necessário
                                id={`floatingInputGridCpf${index}`}
                                floatingLabel="CPF"
                                value={row.nr_cpf}
                            />
                        </CCol>
                        <CCol md>
                            <CFormInput
                                className="fw-bold border-0 border-end rounded-0"
                                type="text" // Use 'text' e formate o valor se necessário
                                id={`floatingInputGridPhone${index}`}
                                floatingLabel="Telefone"
                                value={row.num_tel_concat_mask_1}
                            />
                        </CCol>
                        <CCol md>
                            <CFormInput
                                className="fw-bold border-0 rounded-0"
                                type="email"
                                id={`floatingInputGridEmail${index}`}
                                floatingLabel="E-mail"
                                value={row.email_ds_email_1}
                            />
                        </CCol>
                    </CRow>
                )) : (
                    <span>Não disponível</span>
                )}



            </CCard>
            <div className="mb-2 mt-2 ps-2 border border-dark-subtitle rounded">
                <CRow className="pl-2">
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-stretch">
                            <CButton className="text-start fs-5 w-100 text-wrap" color="link" variant="outline" onClick={() => setVisibleInfo(!visibleInfo)}>
                                Informações
                                <CIcon
                                    icon={visibleInfo ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleInfo}>
                                    <CListGroup flush>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-semibold">{row.nm_completo || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Data de Nascimento</span>
                                            <span className="fs-5 fw-semibold">{row.dt_nasc || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Sexo</span>
                                            <span className="fs-5 fw-semibold">{row.ds_sexo || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Nome recebido</span>
                                            <span className="fs-5 fw-semibold">{row.shopper_name_recebido || "Not available"}</span>
                                        </CListGroupItem>
                                    </CListGroup>
                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                </CRow>
                <hr style={{ borderTop: '2px solid #000', margin: '3px' }} />
                <CRow className="pl-2 ">
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-5" color="link" variant="outline" onClick={() => setVisibleAdd(!visibleAdd)}>
                                Endereço
                                <CIcon
                                    icon={visibleAdd ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleAdd}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-semibold">{row.endereco_concat_1 || "Not available"}</span>
                                        </CListGroupItem>
                                    </CListGroup>
                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                </CRow>
            </div>
            <hr style={{ borderTop: '2px solid #000', margin: '4px 0' }} />
            <div className="mb-2 mt-2 ps-2 border border-dark-subtitle rounded">
                <CRow>
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisibleAdd1(!visibleAdd1)}>
                                Endereço (Principal)
                                <CIcon
                                    icon={visibleAdd1 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleAdd1}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6">{row.endereco_concat_1 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisibleAdd2(!visibleAdd2)}>
                                Endereço (2)
                                <CIcon
                                    icon={visibleAdd2 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleAdd2}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6">{row.endereco_concat_2 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisibleAdd3(!visibleAdd3)}>
                                Endereço (3)
                                <CIcon
                                    icon={visibleAdd3 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleAdd3}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6">{row.endereco_concat_3 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisibleAdd4(!visibleAdd4)}>
                                Endereço (4)
                                <CIcon
                                    icon={visibleAdd4 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleAdd4}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 ">{row.endereco_concat_4 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisibleAdd5(!visibleAdd5)}>
                                Endereço (5)
                                <CIcon
                                    icon={visibleAdd5 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleAdd5}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6">{row.endereco_concat_5 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                </CRow>
                <hr style={{ borderTop: '2px solid #000', margin: '2px 0' }} />
                <CRow>
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisiblemail1(!visiblemail1)}>
                                E-mail (Principal)
                                <CIcon
                                    icon={visiblemail1 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visiblemail1}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6">{row.email_ds_email_1 || "Not available"}</span>
                                        </CListGroupItem>
                                    </CListGroup>
                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisiblemail2(!visiblemail2)}>
                                E-mail (2)
                                <CIcon
                                    icon={visiblemail2 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visiblemail2}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 ">{row.email_ds_email_2 || "Not available"}</span>
                                        </CListGroupItem>
                                    </CListGroup>
                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisiblemail3(!visiblemail3)}>
                                E-mail (3)
                                <CIcon
                                    icon={visiblemail3 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visiblemail3}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 ">{row.email_ds_email_3 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisiblemail4(!visiblemail4)}>
                                E-mail (4)
                                <CIcon
                                    icon={visiblemail4 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visiblemail4}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 ">{row.email_ds_email_4 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setVisiblemail5(!visiblemail5)}>
                                E-mail (5)
                                <CIcon
                                    icon={visiblemail5 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visiblemail5}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 ">{row.email_ds_email_5 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}

                </CRow>
                <hr style={{ borderTop: '2px solid #000', margin: '2px 0' }} />
                <CRow>
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setvisibleTel1(!visibleTel1)}>
                                Telefone (Principal)
                                <CIcon
                                    icon={visibleTel1 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleTel1}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5 fw-semibold">{row.num_tel_concat_mask_1 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">UF do Telefone:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_uf_ddd_1 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Linha:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_ds_tipo_telefone_1 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setvisibleTel2(!visibleTel2)}>
                                Telefone (2)
                                <CIcon
                                    icon={visibleTel2 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleTel2}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5 fw-semibold">{row.num_tel_concat_mask_2 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">UF do Telefone:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_uf_ddd_2 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Linha:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_ds_tipo_telefone_2 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setvisibleTel3(!visibleTel3)}>
                                Telefone (3)
                                <CIcon
                                    icon={visibleTel3 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleTel3}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5 fw-semibold">{row.num_tel_concat_mask_3 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">UF do Telefone:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_uf_ddd_3 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Linha:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_ds_tipo_telefone_3 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setvisibleTel4(!visibleTel4)}>
                                Telefone (4)
                                <CIcon
                                    icon={visibleTel4 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleTel4}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5 fw-semibold">{row.num_tel_concat_mask_4 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">UF do Telefone:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_uf_ddd_4 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Linha:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_ds_tipo_telefone_4 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                    {validRows.map((row, index) => (
                        <CCol key={`col-${index}`} className="p-1 d-flex align-items-center" >
                            <CButton className="text-start fs-6" color="link" variant="outline" onClick={() => setvisibleTel5(!visibleTel5)}>
                                Telefone (5)
                                <CIcon
                                    icon={visibleTel5 ? cilFullscreenExit : cilFullscreen}
                                    size="sm"
                                    className="ms-2"
                                />
                                <CCollapse visible={visibleTel5}>
                                    <CListGroup flush className="m-0 p-0 br-transparent">
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5 fw-semibold">{row.num_tel_concat_mask_5 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">UF do Telefone:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_uf_ddd_5 || "Not available"}</span>
                                        </CListGroupItem>
                                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-light">Linha:</span>
                                            <span className="fs-6 fw-semibold">{row.telefone_ds_tipo_telefone_5 || "Not available"}</span>
                                        </CListGroupItem>

                                    </CListGroup>


                                </CCollapse>
                            </CButton>
                        </CCol>
                    ))}
                </CRow>
            </div>
            <hr style={{ borderTop: '2px solid #000', margin: '2px 0' }} />

        </>
    );
};

export default EnriquecimentoTableDetail;
