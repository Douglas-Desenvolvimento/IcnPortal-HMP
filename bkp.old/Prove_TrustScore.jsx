import React from "react";
import * as core from "@coreui/react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "0 3px 5px 2px rgba(192, 192, 192, .3)", // Adicionando sombra cinza claro
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#2A3037" : "#f5f5f5", // Adicionando efeito hover
  },
}));

//inicio do gauge//
function GaugeChart() {
  const initialValue = apiResponse.response.trustScore; // Valor inicial (ajuste conforme necessário)

  // Função para determinar a cor com base no valor inicial
  const getColor = (value) => {
    if (value === 0) {
      return "black"; // Cor preta para sem dados
    } else if (value >= 1 && value <= 300) {
      return "red"; // Cor vermelha para Danger
    } else if (value >= 301 && value <= 450) {
      return "yellow"; // Cor amarela para Warning
    } else if (value >= 451 && value <= 700) {
      return "green"; // Cor verde para Good
    } else {
      return "blue"; // Cor azul para Very good
    }
  };

  const color = getColor(initialValue);

  const settings = {
    width: 300,
    height: 330,
    value: initialValue, // Ajustando o valor do Gauge
  };

  return (
    <Gauge
      valueMin={0}
      valueMax={1000}
      {...settings}
      cornerRadius="50%"
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
          ? "Danger"
          : color === "yellow"
          ? "Warning"
          : color === "green"
          ? "Good"
          : "Very good"}
      </text>
    </Gauge>
  );
}
//fim do gauge//
////////////////////////////////////////

//Inicio da tabela de dados//
function DenseTable({ formattedPhoneNumber }) {
  function createData(name, svalue) {
    return { name, svalue };
  }

  const rows = [
    createData("Phone", formattedPhoneNumber),
    createData("Score", apiResponse.response.trustScore),
    createData("Transaction date", apiResponse.response.details[1].simTimestamp),
    createData("Transaction Id", apiResponse.requestId),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              Your data Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#fff", // Adicionando cores alternadas
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.svalue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//Fim da tabela de dados//

//////////////////////////////////////////////
//início do Accordion//
function AccordionTransition({ formattedPhoneNumber }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
    <div style={{ margin: "50 auto", maxWidth: "1200px" }}>
  <Accordion
    defaultExpanded
    expanded={expanded}
    onChange={handleExpansion}
    sx={{
      width: "100%", // Define a largura do Accordion com base no conteúdo
      boxShadow: "0 3px 5px 2px rgba(92, 92, 192, .3)",
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
      sx={{
        width: "100%", // Garante que o resumo do Accordion ocupe toda a largura
        justifyContent: "center", // Centralizando os itens no AccordionSummary
      }}
    >
      <Typography variant="h5">TrustScore</Typography>
    </AccordionSummary>
    <AccordionDetails
  sx={{
    width: "100%", // Garante que os detalhes do Accordion ocupem toda a largura
    justifyContent: "start", // Centralizando os itens nos detalhes do Accordion
  }}
>
  <Box sx={{ width: "100%" }}>
    <Grid
      container
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 8, sm: 8, md: 10.6 }}
      justifyContent="center" // Centralizando os itens na Grid
    >
      <Grid item xs={4} md={3} sx={{ maxWidth: "20px", boxShadow: "0 3px 5px 2px rgba(92, 92, 192, .3)" }}> {/* Definindo uma largura máxima para o item */}
        <Item>
          <GaugeChart />
        </Item>
      </Grid>

      <Grid item xs={5} md={5}>
        <Item>
          <DenseTable formattedPhoneNumber={formattedPhoneNumber} />
        </Item>
      </Grid>
    </Grid>
  </Box>
</AccordionDetails>

  </Accordion>
</div>




    </>
  );
}

//fim do Accordion//

const Prove_TrustScore = ({ formattedPhoneNumber }) => {
  // Valor inicial para teste

  return (
    <div>
      <core.CRow className="justify-content-center">
        <AccordionTransition formattedPhoneNumber={formattedPhoneNumber} />
      </core.CRow>
    </div>
  );
};

export default Prove_TrustScore;
