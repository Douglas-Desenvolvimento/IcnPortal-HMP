import React, { useState, useEffect } from 'react';

const fetchData = async () => {
  try {
    const response = await fetch('https://213.163.247.230:3093/event/activity', {
      method: 'GET',
      
      
      headers: {
        "i-token": "rvxdviev66at8db8p3av3jkckk50wd"
      },
      referrerPolicy: 'unsafe-url'
    });
    const data = await response.json();
    return data.rows; // Ajuste para acessar os dados diretamente da propriedade 'rows'
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

const TableComponent = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchData();
        setRowData(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div>
      <h2>Dados da tabela</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Site ID</th>
            <th>Username</th>
            <th>Mobile</th>
            <th>Trust Score</th>
            <th>Indicators</th>
            <th>Timestamp</th>
            <th>Status</th>
            {/* Adicione mais cabeçalhos conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, index) => (
            <tr key={index}>
              <td>{row.act_transactionid}</td>
              <td>{row.siteid}</td>
              <td>{row.username}</td>
              <td>{row.mobile}</td>
              <td>{row.trustscore}</td>
              <td>{row.indicators}</td>
              <td>{row.timestamp}</td>
              <td>{row.act_status}</td>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
