import React, { useState } from 'react';
import HighlightRow from './HighlightRow';
import TrSelectable from './TrSelectable';

export default function ClientsList(props) {
  const clients = props.clients;

  const [selectedRow, setSelectedRow] = useState(-1);

  function handleSelect(index) {
    setSelectedRow(index);
  }

  function handleFire(index) {
    console.log(clients[index]);
  }

  const clientRow = clients.map((client, i) => {
    return (<TrSelectable
      key={client.code_client}
      isActive={selectedRow === i}>
      <td>{client.code_client}</td>
      <td>{client.nom}</td>
      <td>{client.email}</td>
      <td>{client.adresses && client.adresses[0]?.cp} </td>
      <td>{client.adresses && client.adresses[0]?.ville} </td>
    </TrSelectable>);
  });

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
          {clientRow}
        </tbody>
      </table>
      </HighlightRow>
  );
}