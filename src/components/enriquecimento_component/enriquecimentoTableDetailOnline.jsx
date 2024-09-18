import React, { useState, useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { CIcon } from "@coreui/icons-react";
import { cilFullscreen, cilFullscreenExit } from "@coreui/icons";

import {
    CTabs,
    CTabList,
    CTabContent,
    CTabPanel,
    CTab,
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
} from "@coreui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EnriquecimentoTableDetail = ({ rows }) => {
    //  console.log("Rows vinda do InsertOnline: ", rows)
    const [expandido, setExpandido] = useState(false);
    const { getLoggedInUser } = useAuthentication();
    const [usuario, setUsuario] = useState(null);
    const [visibleInfoA, setVisibleInfoA] = useState(true);
    const [visibleInfoB, setVisibleInfoB] = useState(true);
    const [visibleInfoC, setVisibleInfoC] = useState(true);
    const [visibleInfoD, setVisibleInfoD] = useState(true);
    const [visibleInfoE, setVisibleInfoE] = useState(true);

    const [visibleCED, setVisibleCED] = useState(true);
    const [visibleCT, setVisibleCT] = useState(false);
    const [visibleCE, setVisibleCE] = useState(false);

    const [visibleVE, setVisibleVE] = useState(false);
    const [visibleVP, setVisibleVP] = useState(false);
    const [visibleVPCT, setVisibleVPCT] = useState(false);
    const [visibleVS, setVisibleVS] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = getLoggedInUser();
            setUsuario(user);
            // console.log("Rows prop received:", rows);
        };

        fetchUser();
    }, [rows]);

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        doc.text(
            `Data e hora da exportação: ${new Date().toLocaleString()}`,
            10,
            10
        );
        doc.text(
            `Nome do usuário: ${usuario ? usuario.loggedInUser : "Unknown User"}`,
            10,
            30
        );

        const headers = [
            "Nome Completo",
            "CPF",
            "Telefone recebido",
            "E-mail recebido",
        ];
        const data = Array.isArray(rows)
            ? rows.map((row) => [
                row.name_completo,
                row.nr_cpf,
                row.phone_recebido,
                row.email_recebido,
            ])
            : [];
        //  console.log("data: ", data)
        doc.autoTable({
            startY: 90,
            head: [headers],
            body: data,
        });

        doc.save("Results.pdf");
    };

    const handleExpandCollapse = () => {
        // Verifica se todos os componentes estão atualmente expandidos
        const allExpanded =
            visibleInfoA &&
            visibleInfoB &&
            visibleInfoC &&
            visibleInfoD &&
            visibleCED &&
            visibleCT &&
            visibleCE &&
            visibleVE &&
            visibleVP &&
            visibleVPCT;

        // Se todos estão expandidos, colapsa todos, caso contrário, expande todos
        const newExpandido = !allExpanded;

        setExpandido(newExpandido);
        setVisibleInfoA(newExpandido);
        setVisibleInfoB(newExpandido);
        setVisibleInfoC(newExpandido);
        setVisibleInfoD(newExpandido);
        setVisibleInfoE(newExpandido);
        setVisibleCED(newExpandido);
        setVisibleCT(newExpandido);
        setVisibleCE(newExpandido);
        setVisibleVE(newExpandido);
        setVisibleVP(newExpandido);
        setVisibleVPCT(newExpandido);
        setVisibleVS(newExpandido);
    };

    const validRows = Array.isArray(rows) ? rows : [rows];
    const cadastralRows = Array.isArray(rows.cadastral)
        ? rows.cadastral
        : [rows.cadastral];
    const contatoRows = Array.isArray(rows.contato)
        ? rows.contato
        : [rows.contato];
    const vinculoRows = Array.isArray(rows.vinculo)
        ? rows.vinculo
        : [rows.vinculo];
    const obitoRows = Array.isArray(rows.obito) ? rows.obito : [rows.obito];
    const socioeconomicoRows = Array.isArray(rows.socioeconomico)
        ? rows.socioeconomico
        : [rows.socioeconomico];
    //console.log("Cadastral Rows:", cadastralRows)
    //console.log("vinculo Rows:", vinculoRows)
    //console.log("ValidRows: ", validRows);
    //console.log("Contatos:", contatoRows)
    //  console.log("Socioeconomico: ", socioeconomicoRows)

    ///////////////////////////formatações//////////////////

    function formatCpf(cpf) {
        const cpfStr = cpf.toString().padStart(11, "0");
        return `${cpfStr.slice(0, 3)}.${cpfStr.slice(3, 6)}.${cpfStr.slice(
            6,
            9
        )}-${cpfStr.slice(9)}`;
    }

    const nr_cpf_mask = formatCpf(validRows[0].cpf);

    // console.log("Cpf Formatado na tabela:", nr_cpf_mask)

    function formatPhoneNumber(ddd, number, tipoTelefone) {
        if (!ddd || !number) {
            return "Sem telefone cadastrado"; // Retorna "Sem dados" se ddd ou número estiver ausente
        }

        const numStr =
            tipoTelefone === "Móvel"
                ? number.toString().padStart(9, "0")
                : number.toString().padStart(8, "0");

        return `(${ddd}) ${numStr.slice(
            0,
            tipoTelefone === "Móvel" ? 5 : 4
        )}-${numStr.slice(tipoTelefone === "Móvel" ? 5 : 4)}`;
    }

    // Verifica se existe um telefone disponível antes de tentar formatar
    const telefone = contatoRows[0]?.telefone?.[0];
    const formatedPhone = telefone
        ? formatPhoneNumber(telefone.nr_ddd, telefone.nr_telefone)
        : "Sem  telefone cadastrado";

    function formatDate(dateString) {
        if (!dateString) return ""; // Tratamento caso a data não esteja disponível
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }

    function formatCep(cep) {
        if (!cep) {
            return "";
        }
        const nCep = cep.toString();
        return `${nCep.slice(0, 2)}.${nCep.slice(2, 5)}-${nCep.slice(6, 8)}`;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////trandformando dados em uma tabela////////////////////

    /// Cadastral

    // Mapeamento dos labels para cada campo
    const labelsCad = {
        nm_completo: "Nome Completo",
        nm_social: "Nome Social",
        nome_unico: "Nome Único",
        dt_nasc: "Data de Nascimento",
        ds_faixa_idade: "Faixa Etária",
        ds_nacionalidade: "Nacionalidade",
        ds_sexo: "Sexo",
        sg_sexo: "Sigla do Sexo",
        ds_signo: "Signo",
        nm_mae: "Nome da Mãe",
        nr_cpf_mae: "CPF da Mãe",
        nr_cpf: "CPF",
        nr_rg: "RG",
        ds_orgao_emissor: "Órgão Emissor",
        sg_uf_rg: "UF do RG",
        nit_pis: "NIT/PIS",
        nr_titulo_eleitoral: "Título Eleitoral",
        comprovante_rfb: "Comprovante RFB",
        dt_atualizacao_rfb: "Data de Atualização RFB",
        ds_status_rfb: "Status RFB",
        st_menor_idade: "Menor de Idade",
        st_pep: "PEP",
        st_ppp: "PPP",
        dt_inscricao: "Data de Inscrição",
    };

    // Ordem das colunas a serem exibidas
    const columnOrderCad = [
        "nm_completo",
        "nm_social",
        "nome_unico",
        "dt_nasc",
        "ds_faixa_idade",
        "ds_nacionalidade",
        "ds_sexo",
        "sg_sexo",
        "ds_signo",
        "nm_mae",
        "nr_cpf_mae",
        "nr_cpf",
        "nr_rg",
        "ds_orgao_emissor",
        "sg_uf_rg",
        "nit_pis",
        "nr_titulo_eleitoral",
        "comprovante_rfb",
        "dt_atualizacao_rfb",
        "ds_status_rfb",
        "st_menor_idade",
        "st_pep",
        "st_ppp",
        "dt_inscricao",
    ];

    // Filtrar as colunas para incluir apenas as que têm valores
    const columnsCad = columnOrderCad
        .filter((key) => cadastralRows.some((cadastral) => cadastral[key]))
        .map((key) => ({
            key: key,
            label: labelsCad[key] || key.replace(/_/g, " "), // Usar label do mapeamento ou chave formatada
            _props: { scope: "col" },
        }));

    // Gerar os itens (linhas) para a tabela
    const itemsCad = cadastralRows
        ? cadastralRows.map((cadastral, index) => ({
            id: index + 1, // Identificador único para cada linha (pode ser removido se não necessário)
            ...columnOrderCad.reduce((acc, key) => {
                let value = cadastral[key];

                if (value) {
                    // Formatação de CPF
                    if (key === "nr_cpf") {
                        value = formatCpf(value);
                    }

                    // Formatação de datas
                    if (
                        key === "dt_nasc" ||
                        key === "dt_atualizacao_rfb" ||
                        key === "dt_inscricao"
                    ) {
                        value = formatDate(value);
                    }

                    acc[key] =
                        typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                            : value;
                }
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Óbitos
    // Mapeamento dos labels para cada campo
    const labelMappingO = {
        dt_obito: "Data do Óbito",
        mes_obito: "Mês do Óbito",
        ano_obito: "Ano do Óbito",
        tipo_obito: "Tipo de Óbito",
        fonte_obito: "Fonte do Óbito",
        possivel_obito: "Possível Óbito",
        st_obito: "Status do Óbito",
    };

    // Filtrar as colunas para incluir apenas as que têm valores
    const columnsO = Object.keys(labelMappingO)
        .filter((key) => obitoRows.some((obitos) => obitos[key]))
        .map((key) => ({
            key: key,
            label: labelMappingO[key] || key.replace(/_/g, " "), // Usar label do mapeamento ou chave formatada
            _props: { scope: "col" },
        }));

    // Gerar os itens (linhas) para a tabela
    const itemsO = obitoRows
        ? obitoRows.map((obitos, index) => ({
            id: index + 1, // Identificador único para cada linha (pode ser removido se não necessário)
            ...Object.keys(labelMappingO).reduce((acc, key) => {
                let value = obitos[key];

                if (value) {
                    // Formatação de datas
                    if (key === "dt_obito") {
                        value = formatDate(value);
                    }

                    acc[key] =
                        typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                            : value;
                }
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Informações Socioeconômicas
    // Mapeamento dos labels para cada campo
    const labelMappingIS = {
        ds_grau_escolaridade: "Grau de Escolaridade",
        dt_grau_escolaridade: "Data do Grau de Escolaridade",
        ds_ocupacao: "Ocupação",
        dt_ocupacao: "Data de Ocupação",
        ds_faixa_renda_presumida: "Faixa de Renda Presumida",
        dt_faixa_renda_presumida: "Data da Faixa de Renda Presumida",
        cd_ocupacao: "Código da Ocupação",
    };

    // Filtrar as colunas para incluir apenas as que têm valores
    const columnsIS = Object.keys(labelMappingIS)
        .filter((key) =>
            socioeconomicoRows.some((socioeconomico) => socioeconomico[key])
        )
        .map((key) => ({
            key: key,
            label: labelMappingIS[key] || key.replace(/_/g, " "), // Usar label do mapeamento ou chave formatada
            _props: { scope: "col" },
        }));

    // Gerar os itens (linhas) para a tabela
    const itemsIS = socioeconomicoRows
        ? socioeconomicoRows.map((socioeconomico, index) => ({
            id: index + 1, // Identificador único para cada linha (pode ser removido se não necessário)
            ...Object.keys(labelMappingIS).reduce((acc, key) => {
                let value = socioeconomico[key];

                if (value) {
                    // Formatação de datas
                    if (
                        key === "dt_ocupacao" ||
                        key === "dt_grau_escolaridade" ||
                        key === "dt_faixa_renda_presumida"
                    ) {
                        value = formatDate(value);
                    }

                    acc[key] =
                        typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                            : value;
                }
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Últimas Ocupações
    // Mapeando os labels para cada campo
    const columnOrderUO = {
        ano: "Ano da Ocupação",
        ds_ocupacao: "Ocupação",
        renda_presumida: "Renda Presumida", // Adicione mais campos conforme necessário
        faixa_renda_presumida: "Faixa de Renda Presumida", // Adicione mais campos conforme necessário
        outro_campo_2: "Label do Campo 2",
        // Continue adicionando conforme necessário
    };

    // Mapeando as colunas a partir do primeiro item do array
    const columnsUO = socioeconomicoRows[0]?.historico_ocupacoes?.[0]
        ? Object.keys(socioeconomicoRows[0].historico_ocupacoes[0]).map((key) => ({
            key: key,
            label: columnOrderUO[key] || key.replace(/_/g, " "), // Usar label do mapeamento ou chave formatada
            _props: { scope: "col" },
        }))
        : [];

    // Reordenar as colunas com base em `columnOrderUO`
    const reorderedColumnsUO = columnsUO.sort((a, b) => {
        const indexA = Object.keys(columnOrderUO).indexOf(a.key);
        const indexB = Object.keys(columnOrderUO).indexOf(b.key);

        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
    });

    // Gerando os itens (linhas) para a tabela
    const itemsUO = socioeconomicoRows[0]?.historico_ocupacoes?.[0]
        ? socioeconomicoRows[0].historico_ocupacoes.map((ocupacao, index) => ({
            id: index + 1, // Se precisar de um identificador único para cada linha
            ...Object.keys(ocupacao).reduce((acc, key) => {
                const value = ocupacao[key];

                // Se o valor for um objeto, converta-o em uma string JSON ou renderize de outra forma
                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";

                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } }, // Define a propriedade _cellProps para a linha
        }))
        : [];

    /// Contatos Endereço
    // Mapeando os labels para cada campo
    const columnOrderCED = {
        sg_tipo_logradouro: "Tipo de Logradouro",
        ds_logradouro: "Logradouro",
        nr_numero: "Número",
        ds_complemento: "Complemento",
        ds_bairro: "Bairro",
        ds_cidade: "Cidade",
        sg_uf: "UF",
        nr_cep: "CEP",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsCED = Object.keys(columnOrderCED).map((key) => ({
        key: key,
        label: columnOrderCED[key] || key.replace(/_/g, " "), // Usar label do mapeamento ou chave formatada
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsCED = contatoRows[0]?.endereco
        ? contatoRows[0].endereco.map((endereco, index) => ({
            id: index + 1,
            ...Object.keys(columnOrderCED).reduce((acc, key) => {
                let value = endereco[key];

                // Formatar o CEP se aplicável
                if (key === "nr_cep" && value) {
                    value = formatCep(value);
                }

                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Contatos Telefone
    // Mapeando os labels para cada campo
    const columnOrderCT = {
        nr_ddd: "DDD",
        uf_ddd: "UF do DDD",
        nr_telefone: "Número de Telefone",
        ds_tipo_telefone: "Tipo de Telefone",
        dt_inclusao: "Data de Inclusão",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsCT = Object.keys(columnOrderCT).map((key) => ({
        key: key,
        label: columnOrderCT[key] || key.replace(/_/g, " "), // Usar label do mapeamento ou chave formatada
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsCT = contatoRows[0]?.telefone
        ? contatoRows[0].telefone.map((telefone, index) => ({
            id: index + 1,
            ...Object.keys(columnOrderCT).reduce((acc, key) => {
                let value = telefone[key];

                // Formatar o número de telefone se aplicável
                if (key === "nr_telefone" && telefone.nr_ddd && value) {
                    value = formatPhoneNumber(telefone.nr_ddd, value);
                }

                // Formatar a data de inclusão se aplicável
                if (key === "dt_inclusao" && value) {
                    value = formatDate(value);
                }

                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Contatos Emails
    // Mapeando os labels para cada campo
    const columnOrderCE = {
        dt_inclusao: "Data de Inclusão",
        ds_email: "Email",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsCE = Object.keys(columnOrderCE).map((key) => ({
        key: key,
        label: columnOrderCE[key], // Usar label do mapeamento
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsCE = contatoRows[0]?.email
        ? contatoRows[0].email.map((email, index) => ({
            id: index + 1,
            ...Object.keys(columnOrderCE).reduce((acc, key) => {
                let value = email[key];
                if (key === "dt_inclusao" && value) {
                    value = formatDate(value);
                }
                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Vínculos Empregador
    // Mapeando os labels para cada campo
    const columnOrderVE = {
        nr_cnpj: "CNPJ",
        razao_social: "Razão Social",
        dt_admissao: "Data de Admissão",
        dt_demissao: "Data de Demissão",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsVE = Object.keys(columnOrderVE).map((key) => ({
        key: key,
        label: columnOrderVE[key], // Usar label do mapeamento
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsVE = vinculoRows[0]?.empregador
        ? vinculoRows[0].empregador.map((empregador, index) => ({
            id: index + 1,
            ...Object.keys(columnOrderVE).reduce((acc, key) => {
                let value = empregador[key];

                // Aplica a formatação de data
                if (key === "dt_admissao" || (key === "dt_demissao" && value)) {
                    value = formatDate(value);
                }
                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Vínculos Parentesco
    // Mapeando os labels para cada campo
    const columnOrderVP = {
        nm_completo: "Nome Completo",
        ds_vinculo: "Tipo de Vínculo",
        nr_cpf: "CPF",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsVP = Object.keys(columnOrderVP).map((key) => ({
        key: key,
        label: columnOrderVP[key], // Usar label do mapeamento
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsVP = vinculoRows[0]?.parentesco
        ? vinculoRows[0].parentesco.map((parentesco, index) => ({
            id: index + 1,
            ...Object.keys(columnOrderVP).reduce((acc, key) => {
                let value = parentesco[key];
                if (key === "nr_cpf" && value) {
                    value = formatCpf(parentesco.nr_cpf);
                }
                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /// Vínculos Possíveis Colegas de Trabalho
    // Mapeando os labels para cada campo
    const columnOrderVPCT = {
        nm_completo: "Nome Completo",
        nr_cpf: "CPF",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsVPCT = Object.keys(columnOrderVPCT).map((key) => ({
        key: key,
        label: columnOrderVPCT[key], // Usar label do mapeamento
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsVPCT = vinculoRows[0]?.possiveis_colegas_trabalho
        ? vinculoRows[0].possiveis_colegas_trabalho.map(
            (possiveis_colegas_trabalho, index) => ({
                id: index + 1,
                ...Object.keys(columnOrderVPCT).reduce((acc, key) => {
                    let value = possiveis_colegas_trabalho[key];
                    if (key === "nr_cpf" && value) {
                        value = formatCpf(possiveis_colegas_trabalho.nr_cpf);
                    }
                    acc[key] =
                        typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                            : value || "";
                    return acc;
                }, {}),
                _cellProps: { id: { scope: "row" } },
            })
        )
        : [];

    /// Vínculos Sócios
    // Mapeando os labels para cada campo
    const columnOrderVS = {
        nm_completo: "Nome Completo",
        nr_cpf: "CPF",
    };

    // Mapeando as colunas usando os labels definidos
    const columnsVS = Object.keys(columnOrderVS).map((key) => ({
        key: key,
        label: columnOrderVS[key], // Usar label do mapeamento
        _props: { scope: "col" },
    }));

    // Gerando os itens (linhas) para a tabela
    const itemsVS = vinculoRows[0]?.socios
        ? vinculoRows[0].socios.map((socios, index) => ({
            id: index + 1,
            ...Object.keys(columnOrderVS).reduce((acc, key) => {
                let value = socios[key];
                if (key === "nr_cpf" && value) {
                    value = formatCpf(socios.nr_cpf);
                }
                acc[key] =
                    typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value || "";
                return acc;
            }, {}),
            _cellProps: { id: { scope: "row" } },
        }))
        : [];

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div className="d-flex justify-content-between">
                <CButton
                    className="border border-secondary mb-2 mt-1 pb-1"
                    color="transparent"
                    onClick={handleExpandCollapse}
                    hidden
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
            <CCard className="p-2 mb-3 bg-gradient border-dark-subtitle border-top-3">
                <CRow xs={{ gutter: 0 }}>
                    <CCol md>
                        <CFormInput
                            className="fw-bold border-0 border-end rounded-0"
                            type="text"
                            id="floatingInputGrid"
                            floatingLabel="Nome"
                            value={
                                cadastralRows[0]?.nm_completo
                                    ? cadastralRows[0].nm_completo
                                    : ""
                            }
                        />
                    </CCol>
                    <CCol md>
                        <CFormInput
                            className="fw-bold border-0 border-end rounded-0"
                            type="cpf"
                            id="floatingInputGrid"
                            floatingLabel="cpf"
                            value={nr_cpf_mask}
                        ></CFormInput>
                    </CCol>
                    <CCol md>
                        <CFormInput
                            className="fw-bold border-0 border-end rounded-0"
                            type="phone"
                            id="floatingInputGrid"
                            floatingLabel="Telefone"
                            value={formatedPhone}
                        />
                    </CCol>
                    <CCol md>
                        <CFormInput
                            className="fw-bold border-0 rounded-0"
                            type="email"
                            id="floatingInputGrid"
                            floatingLabel="E-mail"
                            value={
                                contatoRows[0]?.email[0]?.ds_email
                                    ? contatoRows[0].email[0].ds_email
                                    : "E-mail não forncecido"
                            }
                        />
                    </CCol>
                </CRow>
            </CCard>
            <CTabs activeItemKey={1}>
                <CTabList variant="underline" layout="fill">
                    <CTab
                        className="shadow-sm py-2 bg-white fs-5"
                        aria-controls="home-tab-pane"
                        itemKey={1}
                    >
                        Cadastral
                    </CTab>
                    <CTab
                        className="shadow-sm py-2 bg-white fs-5 "
                        aria-controls="profile-tab-pane"
                        itemKey={2}
                    >
                        Contatos
                    </CTab>
                    <CTab
                        className="shadow-sm py-2 bg-white fs-5"
                        aria-controls="contact-tab-pane"
                        itemKey={3}
                    >
                        Vínculos
                    </CTab>
                </CTabList>
                <CTabContent>
                    <CTabPanel
                        className="shadow rounded-bottom py-1 bg-white"
                        color="link"
                        aria-labelledby="home-tab-pane"
                        itemKey={1}
                    >
                        <div className="m-2 p-2 border border-dark-subtitle">
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleInfoA(!visibleInfoA)}
                                >
                                    Informações Cadastrais
                                    <CIcon
                                        icon={visibleInfoA ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleInfoA}>
                                            <CListGroup flush>
                                                {itemsCad.map((item, index) =>
                                                    Object.keys(item).map((key) => {
                                                        const column = columnsCad.find(
                                                            (col) => col.key === key
                                                        );

                                                        if (column && key !== "_cellProps") {
                                                            return (
                                                                <CListGroupItem
                                                                    key={index + key}
                                                                    className="d-flex justify-content-between align-items-center"
                                                                >
                                                                    <span className="fs-6 fw-light">
                                                                        {column.label}
                                                                    </span>
                                                                    <span className="fs-6 fw-semibold text-end">
                                                                        {item[key]}
                                                                    </span>
                                                                </CListGroupItem>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                )}
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />

                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleInfoC(!visibleInfoC)}
                                >
                                    Informações de Óbito
                                    <CIcon
                                        icon={visibleInfoC ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleInfoC}>
                                            <CListGroup flush>
                                                {itemsO.map((item, index) =>
                                                    Object.keys(item).map((key) => {
                                                        const column = columnsO.find(
                                                            (col) => col.key === key
                                                        );

                                                        if (column && key !== "_cellProps") {
                                                            return (
                                                                <CListGroupItem
                                                                    key={index + key}
                                                                    className="d-flex justify-content-between align-items-center"
                                                                >
                                                                    <span className="fs-6 fw-light">
                                                                        {column.label}
                                                                    </span>
                                                                    <span className="fs-6 fw-semibold text-end">
                                                                        {item[key]}
                                                                    </span>
                                                                </CListGroupItem>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                )}
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>

                            <br />

                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleInfoD(!visibleInfoD)}
                                >
                                    Informações Socioeconomicas
                                    <CIcon
                                        icon={visibleInfoD ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleInfoD}>
                                            <CListGroup flush>
                                                {itemsIS.map((item, index) =>
                                                    Object.keys(item).map((key) => {
                                                        const column = columnsIS.find(
                                                            (col) => col.key === key
                                                        );

                                                        if (column && key !== "_cellProps") {
                                                            return (
                                                                <CListGroupItem
                                                                    key={index + key}
                                                                    className="d-flex justify-content-between align-items-center"
                                                                >
                                                                    <span className="fs-6 fw-light">
                                                                        {column.label}
                                                                    </span>
                                                                    <span className="fs-6 fw-semibold text-end">
                                                                        {item[key]}
                                                                    </span>
                                                                </CListGroupItem>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                )}
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />

                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleInfoE(!visibleInfoE)}
                                >
                                    Últimas Ocupações
                                    <CIcon
                                        icon={visibleInfoE ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleInfoE}>
                                            <CListGroup flush>
                                                <CTable
                                                    hover
                                                    className="rounded"
                                                    columns={reorderedColumnsUO}
                                                    items={itemsUO}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <hr style={{ borderTop: "2px solid #000", margin: "3px" }} />
                        </div>
                    </CTabPanel>

                    <CTabPanel
                        className="shadow rounded-bottom py-1 bg-white"
                        aria-labelledby="profile-tab-pane"
                        itemKey={2}
                    >
                        <div className="m-2 p-2 border border-dark-subtitle">
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleCED(!visibleCED)}
                                >
                                    Endereços
                                    <CIcon
                                        icon={visibleCED ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleCED}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsCED}
                                                    items={itemsCED}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleCT(!visibleCT)}
                                >
                                    Telefones
                                    <CIcon
                                        icon={visibleCT ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleCT}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsCT}
                                                    items={itemsCT}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleCE(!visibleCE)}
                                >
                                    E-Mails
                                    <CIcon
                                        icon={visibleCE ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleCE}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsCE}
                                                    items={itemsCE}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <hr style={{ borderTop: "2px solid #000", margin: "3px" }} />
                        </div>
                    </CTabPanel>
                    <CTabPanel
                        className="shadow rounded-bottom py-1 bg-white"
                        aria-labelledby="profile-tab-pane"
                        itemKey={3}
                    >
                        <div className="m-2 p-2 border border-dark-subtitle">
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleVE(!visibleVE)}
                                >
                                    Empregadores
                                    <CIcon
                                        icon={visibleVE ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleVE}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsVE}
                                                    items={itemsVE}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleVP(!visibleVP)}
                                >
                                    Familiares
                                    <CIcon
                                        icon={visibleVP ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleVP}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsVP}
                                                    items={itemsVP}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleVPCT(!visibleVPCT)}
                                >
                                    Possíveis colegas de trabalho
                                    <CIcon
                                        icon={visibleVPCT ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleVPCT}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsVPCT}
                                                    items={itemsVPCT}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>
                            <br />
                            <CContainer className="pl-2 bg-light rounded border border-1">
                                <CButton
                                    className="text-start fs-5 w-100 text-wrap"
                                    color="link"
                                    variant="outline"
                                    onClick={() => setVisibleVS(!visibleVS)}
                                >
                                    Sócios
                                    <CIcon
                                        icon={visibleVS ? cilFullscreenExit : cilFullscreen}
                                        size="sm"
                                        className="ms-2"
                                    />
                                </CButton>
                                <hr style={{ borderTop: "1px solid #000", margin: "auto" }} />

                                <CRow>
                                    <CCol md="12" className="p-1">
                                        <CCollapse visible={!visibleVS}>
                                            <CListGroup flush>
                                                <CTable
                                                    small
                                                    hover
                                                    className="rounded"
                                                    columns={columnsVS}
                                                    items={itemsVS}
                                                    style={{ fontSize: "0.875rem" }}
                                                    tableHeadProps={{ color: "light" }}
                                                />
                                            </CListGroup>
                                        </CCollapse>
                                    </CCol>
                                </CRow>
                            </CContainer>

                            <hr style={{ borderTop: "2px solid #000", margin: "3px" }} />
                        </div>
                    </CTabPanel>
                </CTabContent>
            </CTabs>
        </>
    );
};

export default EnriquecimentoTableDetail;
