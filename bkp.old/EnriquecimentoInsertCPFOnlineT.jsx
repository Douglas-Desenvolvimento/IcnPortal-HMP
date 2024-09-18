import React, { useState } from "react";
import * as core from "@coreui/react";
import { IMaskMixin } from "react-imask";
import CIcon from "@coreui/icons-react";
import { cilInput, cilSearch, cilTrash } from "@coreui/icons";
import jcaEFetchPRDOnline from "../../hooks/JcaEnriquecimento/jcaEFetchPRDOnline";
import EnriquecimentoTableDetail from "./enriquecimentoTableDetailT";
import { CSSTransition } from "react-transition-group";
import "../../App.css";

const EnriquecimentoInsertCPFOnlineT = () => {
    const [rowData, setRowData] = useState([]);
    const [nrCpf, setNrCpf] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [validated, setValidated] = useState(false);
    const [cpfValido, setCpfValido] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [arraysCount, setArraysCount] = useState([]);

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
                console.log("resposta:", response.results);

                if (response.results.length === 0) {
                    alert("CPF inválido ou não registrado.");
                    setCpfValido(false);
                    setShowSpinner(false);
                    setRowData([]); // Garantir que rowData seja um array
                    return;
                }

                setCpfValido(true);
                const nRow = response.results[0];
                const cadastral = response.results[0].cadastral;
                const contato = response.results[0].contato;
                const obito = response.results[0].obito;
                const socioeconomico = response.results[0].socioeconomico;
                const vinculo = response.results[0].vinculo


                console.log("cad, contato", cadastral, contato);

                console.log("resposta nrow:", nRow);

                function formatCpf(cpf) {
                    if (!cpf) return 'CPF inválido';
                    const cpfStr = cpf.toString().padStart(11, '0');
                    return `${cpfStr.slice(0, 3)}.${cpfStr.slice(3, 6)}.${cpfStr.slice(6, 9)}-${cpfStr.slice(9)}`;
                }

                function formatPhoneNumber(ddd, number) {
                    if (!ddd || !number) return 'Número de telefone inválido';
                    const numStr = number.toString().padStart(9, '0');
                    return `(${ddd}) ${numStr.slice(0, 5)}-${numStr.slice(5)}`;
                }




                // A formatação deve ser aplicada corretamente
                if (nRow.cpf && Object.keys(nRow.cpf).length > 0) {
                    const cpfKey = Object.keys(nRow.cpf)[0]; // Pegando a primeira chave de 'cpf'
                    nRow.cpf[cpfKey] = formatCpf(nRow.cpf[cpfKey]);
                }

                // Formatar números de telefone, se existirem
                const phoneNumbers = [];
                Object.keys(nRow).forEach(key => {
                    if (key.startsWith('telefone[')) {
                        const parts = key.match(/^telefone\[(\d+)\]\.(nr_ddd|nr_telefone)$/);
                        if (parts) {
                            const [_, index, part] = parts;
                            if (!phoneNumbers[index]) {
                                phoneNumbers[index] = {};
                            }
                            phoneNumbers[index][part] = nRow[key];
                        }
                    }
                });

                phoneNumbers.forEach((phone, index) => {
                    if (phone.nr_ddd && phone.nr_telefone) {
                        nRow[`telefone[${index}]`] = formatPhoneNumber(phone.nr_ddd, phone.nr_telefone);
                    }
                });

                setRowData(nRow); // Definir como um único objeto, não array
                setShowDetails(true);

                console.log("Resposta do Fetch:", response);
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
                                                onChange={() => { }} // Evite mudanças diretas no onChange
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
                <CSSTransition in={showDetails} timeout={300} classNames="fade" unmountOnExit>
                    <core.CCard
                        className={`p-1 mt-1 bg-light bg-gradient border-dark-subtitle border-top-1 shadow-lg`}>
                        <core.CCardBody>
                            <EnriquecimentoTableDetail validRows={rowData} arraysSCount={arraysCount} />
                        </core.CCardBody>
                    </core.CCard>
                </CSSTransition>
            </div>
        </>
    );
};

export default EnriquecimentoInsertCPFOnlineT;
