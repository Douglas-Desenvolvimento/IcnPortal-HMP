import React from 'react';
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { padding } from '@mui/system';

const Prove_TrustScore_Gouge = ({ trustScore }) => {

  const getColor = (value) => {
    if (value === 0) {
      return "black"; // Cor preta para sem dados
    } else if (value >= 1 && value <= 630) {
      return "red"; // Cor vermelha para Danger
    } else if (value >= 631 && value <= 750) {
      return "yellow"; // Cor amarela para Warning
    } else if (value >= 751 && value <= 1000) {
      return "green"; // Cor verde para Good
    }
  };

  const initialValue = trustScore; // Valor inicial (ajuste conforme necessário)
  const color = getColor(initialValue);
  const settings = {
    width: 330,
    height: 200,
    paddingTop: 0,
    value: initialValue, // Ajustando o valor do Gauge
  };

  return (
    <>
      <div >
        <Gauge
          valueMin={0}
          valueMax={1000}
          {...settings}
          cornerRadius="80%"
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 28, // Tamanho de fonte maior para o valor
              fill: color, // Aplicando a cor determinada
              fontFamily: "Arial, sans-serif", // Fonte mais forte
              textAnchor: "middle", // Alinhamento central
              dominantBaseline: "middle", // Alinhamento vertical central
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: color, // Aplicando a mesma cor ao arco
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
            [`& .${gaugeClasses.circle}`]: {
              fill: "#f0f0f0", // Cor cinza mais clara
              filter: "drop-shadow(2px 2px 4px rgba(92, 92, 92, 0.3))", // Sombra cinza claro
            },
          })}
        >
          {/* Adicionando o label acima do valor com espaçamento */}
          <text
            x="50%"
            y="70%" // Espaçamento ajustado para a parte inferior
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontFamily="Arial, sans-serif" // Fonte mais simpática
            fill={color}
          >
            {color === "black"
              ? "No Data"
              : color === "red"
                ? "High risk"
                : color === "yellow"
                  ? "Moderate risk"
                  : color === "green"
                    ? "Without risk"
                    : "Very good"}
          </text>
        </Gauge>
      </div>
    </>
  );
}

export default Prove_TrustScore_Gouge;
