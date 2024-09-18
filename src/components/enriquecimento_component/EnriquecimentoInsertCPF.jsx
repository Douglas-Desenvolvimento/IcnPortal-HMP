import React, { useState } from "react";
import * as core from "@coreui/react";
import { IMaskMixin } from "react-imask";
import CIcon from "@coreui/icons-react";
import { cilInput, cilSearch, cilTrash } from "@coreui/icons";
import jcaEFetchPRD from "../../hooks/JcaEnriquecimento/jcaEFetchPRD";
import EnriquecimentoTableDetail from "./enriquecimentoTableDetail";
import { CSSTransition } from "react-transition-group";
import "../../App.css";

const EnriquecimentoInsertCPF = () => {
    const [rowData, setRowData] = useState([]);
    const [nrCpf, setNrCpf] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [validated, setValidated] = useState(false);
    const [cpfValido, setCpfValido] = useState(true); // Estado para controlar a validade do CPF

    const [showDetails, setShowDetails] = useState(false); // Estado para mostrar detalhes

    const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
        <core.CFormInput {...props} ref={inputRef} />
    ));

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de submissão do formulário
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setShowSpinner(true);
            const formattedNrCpf = nrCpf.replace(/\D/g, "");

            try {
                const response = await jcaEFetchPRD({ formattedNrCpf });

                if (response.rows.length === 0) {
                    // Se não há dados retornados, exibe o alerta e interrompe o processo
                    alert("CPF inválido.");
                    setCpfValido(false);
                    setShowSpinner(false);
                    return;
                }

                // CPF é válido, continua com o processamento
                setCpfValido(true);
                const nRow = response.rows[0];

                // Processamento dos dados
                function formatCpf(cpf) {
                    const cpfStr = cpf.toString().padStart(11, '0');
                    return `${cpfStr.slice(0, 3)}.${cpfStr.slice(3, 6)}.${cpfStr.slice(6, 9)}-${cpfStr.slice(9)}`;
                }

                const nr_cpf_mask = formatCpf(nRow.nr_cpf);

                function formatPhoneNumber(ddd, number) {
                    const numStr = number.toString().padStart(9, '0');
                    return `(${ddd})${numStr.slice(0, 5)}-${numStr.slice(5)}`;
                }

                const num_tel_concat_mask_1 = formatPhoneNumber(nRow.telefone_nr_ddd_1, nRow.telefone_nr_telefone_1);
                const num_tel_concat_mask_2 = formatPhoneNumber(nRow.telefone_nr_ddd_2, nRow.telefone_nr_telefone_2);
                const num_tel_concat_mask_3 = formatPhoneNumber(nRow.telefone_nr_ddd_3, nRow.telefone_nr_telefone_3);
                const num_tel_concat_mask_4 = formatPhoneNumber(nRow.telefone_nr_ddd_4, nRow.telefone_nr_telefone_4);
                const num_tel_concat_mask_5 = formatPhoneNumber(nRow.telefone_nr_ddd_5, nRow.telefone_nr_telefone_5);

                const endereco_concat_1 = `${nRow.endereco_sg_tipo_logradouro_1} ${nRow.endereco_ds_logradouro_1}, Nº.: ${nRow.endereco_nr_numero_1}, ${nRow.endereco_ds_complemento_1}, ${nRow.endereco_ds_bairro_1}, ${nRow.endereco_ds_cidade_1} - ${nRow.endereco_sg_uf_1} - CEP: ${nRow.endereco_nr_cep_1}`;
                const endereco_concat_2 = `${nRow.endereco_sg_tipo_logradouro_2} ${nRow.endereco_ds_logradouro_2}, Nº.: ${nRow.endereco_nr_numero_2}, ${nRow.endereco_ds_bairro_2}, ${nRow.endereco_ds_complemento_2}, ${nRow.endereco_ds_cidade_2} - ${nRow.endereco_sg_uf_2} - CEP: ${nRow.endereco_nr_cep_2}`;
                const endereco_concat_3 = `${nRow.endereco_sg_tipo_logradouro_3} ${nRow.endereco_ds_logradouro_3}, Nº.: ${nRow.endereco_nr_numero_3}, ${nRow.endereco_ds_bairro_3}, ${nRow.endereco_ds_complemento_3}, ${nRow.endereco_ds_cidade_3} - ${nRow.endereco_sg_uf_3} - CEP: ${nRow.endereco_nr_cep_3}`;
                const endereco_concat_4 = `${nRow.endereco_sg_tipo_logradouro_4} ${nRow.endereco_ds_logradouro_4}, Nº.: ${nRow.endereco_nr_numero_4}, ${nRow.endereco_ds_bairro_4}, ${nRow.endereco_ds_complemento_4}, ${nRow.endereco_ds_cidade_4} - ${nRow.endereco_sg_uf_4} - CEP: ${nRow.endereco_nr_cep_4}`;
                const endereco_concat_5 = `${nRow.endereco_sg_tipo_logradouro_5} ${nRow.endereco_ds_logradouro_5}, Nº.: ${nRow.endereco_nr_numero_5}, ${nRow.endereco_ds_bairro_5}, ${nRow.endereco_ds_complemento_5}, ${nRow.endereco_ds_cidade_5} - ${nRow.endereco_sg_uf_5} - CEP: ${nRow.endereco_nr_cep_5}`;

                const tableData = {
                    ...nRow,
                    nr_cpf: nr_cpf_mask,
                    num_tel_concat_mask_1: num_tel_concat_mask_1,
                    num_tel_concat_mask_2: num_tel_concat_mask_2,
                    num_tel_concat_mask_3: num_tel_concat_mask_3,
                    num_tel_concat_mask_4: num_tel_concat_mask_4,
                    num_tel_concat_mask_5: num_tel_concat_mask_5,
                    endereco_concat_1: endereco_concat_1,
                    endereco_concat_2: endereco_concat_2,
                    endereco_concat_3: endereco_concat_3,
                    endereco_concat_4: endereco_concat_4,
                    endereco_concat_5: endereco_concat_5
                };
                setRowData(tableData);
                setShowDetails(true); // Exibe os detalhes após a consulta
                console.log("Resposta do Fetch:", response);
                console.log("CPF 1 - ", nrCpf);
                console.log("Teste de tabela:", tableData);
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
                        <core.CCardBody >

                            <EnriquecimentoTableDetail rows={rowData} />

                        </core.CCardBody>
                    </core.CCard>
                </CSSTransition>
            </div>
        </>
    );
};

export default EnriquecimentoInsertCPF;
