import React from 'react';
import * as core from "@coreui/react";
import { CChart } from '@coreui/react-chartjs';

const getStyle = (variable) => {
  // Lógica para obter a cor do corpo do CoreUI ou qualquer outra cor desejada
  return '#000000'; // Retorna uma cor preta padrão como exemplo
};

const GaugeCoreui = () => {
  return (
    <div>
      <CChart
        type="doughnut"
        data={{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [40, 20, 80, 10],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              }
            }
          },
        }}
        width={40} // Defina a largura do gráfico
        height={10} // Defina a altura do gráfico
      />
    </div>
  );
}

export default GaugeCoreui;
