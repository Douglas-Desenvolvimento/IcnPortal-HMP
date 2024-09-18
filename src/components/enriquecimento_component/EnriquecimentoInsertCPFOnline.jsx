import React, { useState } from "react";
import * as core from "@coreui/react";
import { IMaskMixin } from "react-imask";
import CIcon from "@coreui/icons-react";
import { cilInput, cilSearch, cilTrash } from "@coreui/icons";
import jcaEFetchPRDOnline from "../../hooks/JcaEnriquecimento/jcaEFetchPRDOnline";
import EnriquecimentoTableDetail from "./enriquecimentoTableDetailOnline";
import "../../App.css";

const EnriquecimentoInsertCPFOnline = () => {
    const [rowData, setRowData] = useState([]);
    const [nrCpf, setNrCpf] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [validated, setValidated] = useState(false);
    const [cpfValido, setCpfValido] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
        <core.CFormInput {...props} ref={inputRef} />
    ));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setShowSpinner(true);
            const formattedNrCpf = nrCpf.replace(/\D/g, "");

            try {
                const response = await jcaEFetchPRDOnline({ formattedNrCpf });
                if (response.results.length === 0) {
                    alert("CPF inválido ou não registrado.");
                    setCpfValido(false);
                    setShowSpinner(false);
                    return;
                }

                setCpfValido(true);
                const nRow = response.results[0];
                setRowData(nRow);
                setShowDetails(true);
            } catch (error) {
                console.error("Erro ao chamar a API Trust:", error);
            }

            setShowSpinner(false);
            setValidated(false);
            setNrCpf("");
        }
    };

    const handleNrCpfBlur = (event) => {
        const formattedNrCpf = event.target.value.replace(/\D/g, "");
        setNrCpf(formattedNrCpf);
    };

    const handleClear = () => {
        setRowData([]);
        setNrCpf("");
        setCpfValido(true);
        setShowDetails(false);
    };

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                    <core.CCol sm={8} className="m-1">
                        <core.CCardGroup>
                            <core.CCard
                                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                                className="w-50 mb-1 p-2 bg-gradient border-dark-subtitle shadow"
                            >
                                <core.CCardBody>
                                    <core.CCardTitle className="text-center">
                                        Insert here your CPF number
                                    </core.CCardTitle>
                                    <core.CForm noValidate validated={validated} onSubmit={handleSubmit}>
                                        <core.CInputGroup>
                                            <core.CInputGroupText id="addon-wrapping">
                                                <i className="cil-user"></i>
                                                <CIcon
                                                    icon={cilInput}
                                                    className="text-secondary"
                                                    size="lg"
                                                    title="Phone"
                                                />
                                            </core.CInputGroupText>
                                            <CFormInputWithMask
                                                mask="000.000.000-00"
                                                type="text"
                                                id="validationCustom01"
                                                required
                                                value={nrCpf}
                                                onBlur={handleNrCpfBlur}
                                                onChange={() => { }}
                                                style={{ width: "60%" }}
                                            />
                                            <core.CButton
                                                className="rounded border border-secondary"
                                                color="transparent"
                                                type="submit"
                                                style={{ marginLeft: "0px" }}
                                            >
                                                {showSpinner ? (
                                                    <core.CSpinner
                                                        as="span"
                                                        size="sm"
                                                        aria-hidden="true"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                ) : (
                                                    <CIcon
                                                        icon={cilSearch}
                                                        className="text-dark"
                                                        size="lg"
                                                        title="Search"
                                                    />
                                                )}
                                            </core.CButton>
                                            <core.CButton
                                                className="rounded border border-secondary"
                                                color="transparent"
                                                onClick={handleClear}
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <CIcon
                                                    icon={cilTrash}
                                                    className="text-dark"
                                                    size="lg"
                                                    title="Clear"
                                                />
                                                Clear All
                                            </core.CButton>
                                        </core.CInputGroup>
                                    </core.CForm>
                                </core.CCardBody>
                            </core.CCard>
                        </core.CCardGroup>
                    </core.CCol>
                </div>

                {showDetails && (
                    <core.CCard
                        className={`p-1 mt-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow-lg`}>
                        <core.CCardBody>
                            <EnriquecimentoTableDetail rows={rowData} />
                        </core.CCardBody>
                    </core.CCard>
                )}
            </div>
        </>
    );
};

export default EnriquecimentoInsertCPFOnline;
