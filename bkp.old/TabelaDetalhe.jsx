import React, { useEffect, useState } from "react";
import detailApiData from "../../hooks/useApiData";
import * as core from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

const TabelaDetalhe = () => {
  const detailData = detailApiData();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); // Armazena os checkboxes selecionados

  // Manipulador de evento para atualizar os checkboxes selecionados
  const handleFormCheckChange = (index) => {
    if (selectedCheckboxes.includes(index)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== index));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, index]);
    }
  };

  if (!detailData) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      key: "id",
      label: "ID",
      _props: { scope: "col" },
    },
    {
      key: "telefone",
      _props: { scope: "col" },
    },
    {
      key: "date_time",
      label: "Data da transação",
      _props: { scope: "col" },
    },
    {
      key: "status",
      label: "Status da Transação",
      _props: { scope: "col" },
    },
  ];

  // Mapeia a lista de checkboxes e cria o JSX correspondente
  const colors = ["success", "primary", "warning", "info"];
  const formCheckboxes = detailData.datasets.map((dataset, index) => (
    <core.CFormCheck
      key={index}
      button={{ color: colors[index], variant: "outline" }}
      id={`btncheck${index + 1}`}
      autoComplete="off"
      label={dataset.label}
      onChange={() => handleFormCheckChange(index)}
      checked={selectedCheckboxes.includes(index)} // Verifica se o checkbox está selecionado
    />
  ));

  // Mapeia a lista de dados para criar os itens da tabela
  const items = selectedCheckboxes.flatMap((index) =>
    detailData.datasets[index].data.map((dataItem, index) => ({
      id: dataItem.reqid,
      telefone: dataItem.phone,
      date_time: dataItem.date_time,
      status: dataItem.status,
      _cellProps: { id: { scope: "row" } },
    }))
  );

  return (
    <div>
      <core.CAccordion alwaysOpen activeItemKey={2}>
        <core.CAccordionItem itemKey={1}>
          <core.CAccordionHeader>Detelhamento do das transações</core.CAccordionHeader>
          <core.CAccordionBody>
            <core.CButtonToolbar className="mb-3" role="group" aria-label="Toolbar with button groups">
              <core.CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                {formCheckboxes}
              </core.CButtonGroup>
            </core.CButtonToolbar>
            <core.CCard color="light" className={`mb-5 border-secondary  border-top-5`}>
              <core.CCardHeader as="h2" className={`mb-3 border-light `}>
                Detelhamento dos Serviços
              </core.CCardHeader>
              <core.CCallout color="secondary">
                <core.CCard className={`border-success  `}>
                  <core.CCardHeader as="h3" className={`mb-3 border-light text-start`}>
                    Tabela
                  </core.CCardHeader>
                  <core.CTable
                    small
                    striped
                    hover
                    bordered
                    captionTop={selectedCheckboxes.map((index) => detailData.datasets[index].label).join(", ")}
                    columns={columns}
                    items={items}
                    tableHeadProps={{ color: "secondary" }}
                  />
                </core.CCard>
              </core.CCallout>
            </core.CCard>
          </core.CAccordionBody>
        </core.CAccordionItem>
      </core.CAccordion>
    </div>
  );
};

export default TabelaDetalhe;
