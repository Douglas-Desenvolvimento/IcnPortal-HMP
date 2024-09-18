import React from 'react'
import * as core from "@coreui/react";
import { orgservices } from '../manut/Manutencao';
import AuditPage from '../audit/Audit'

const Audit = () => {
  return (
    <div>
      <core.CCallout color="primary">
         Conteúdo do perfil de Audit
        <AuditPage />

      </core.CCallout>
    </div>
  )
}

export default Audit
