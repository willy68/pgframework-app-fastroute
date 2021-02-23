import React, { useState, useEffect } from 'react';
import { findClients } from '../functions/api';
import HighlightRow from './HighlightRow';
import TrSelectable from './TrSelectable';

export default function ClientsList() {
  const [state, setState] = useState({
    clients: null,
    selectedRow: -1
  });

  useEffect(async () => {
    const clients = await findClients();
    setState(s => ({ ...s, clients: clients }));
  }, [])

  const handleSelect = function (index) {
    setState(s => ({ ...s, selectedRow: index }))
  }

  const handleFire = function (index) {
    const url = `/demo/client/${state.clients[index].id}`;
    window.location.assign(url);
  }

  const row = state.clients ? state.clients.map((client, i) => (
    <TrSelectable
      key={client.code_client}
      isActive={state.selectedRow === i}>
      <td>{client.code_client}</td>
      <td>{client.nom}</td>
      <td>{client.email}</td>
      <td>{client.adresses && client.adresses[0]?.cp} </td>
      <td>{client.adresses && client.adresses[0]?.ville} </td>
    </TrSelectable>)) : <></>;

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
          {row}
        </tbody>
      </table>
    </HighlightRow>
  );
}