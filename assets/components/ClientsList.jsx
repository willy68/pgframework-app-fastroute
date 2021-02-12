import React, { useState, useEffect } from 'react';
import { findClients } from '../functions/api';
import HighlightRow from './HighlightRow';
import TrSelectable from './TrSelectable';

export default function ClientsList(props) {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [clients, setClients] = useState(null);

  useEffect(async () => {
    const clients = await findClients();
    setClients(clients);
  }, [])

  function handleSelect(index) {
    setSelectedRow(index);
  }

  function handleFire(index) {
    const url = `/demo/client/${clients[index].id}`;
    window.location.assign(url);
  }

  return (
    <HighlightRow handleSelect={handleSelect} handleFire={handleFire}>
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Code Postal</th>
            <th>Ville</th>
          </tr>
        </thead>
        <tbody>
          {clients ? (clients.map((client, i) => (
            <TrSelectable
              key={client.code_client}
              isActive={selectedRow === i}>
              <td>{client.code_client}</td>
              <td>{client.nom}</td>
              <td>{client.email}</td>
              <td>{client.adresses && client.adresses[0]?.cp} </td>
              <td>{client.adresses && client.adresses[0]?.ville} </td>
            </TrSelectable>))
            ) : <>
              </>
          }
        </tbody>
      </table>
    </HighlightRow>
  );
}