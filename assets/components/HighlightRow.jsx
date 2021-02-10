import React, { useState, useRef, useEffect } from 'react';

export default function HighlightRow(props) {
  let scrollTop = 0;
  let cancelScroll = false;
  let startIndex = 0;

  const [selectedRow, setSelectedRow] = useState(-1);

  const el = useRef();
  const tbody = useRef();

  useEffect(() => {

    if (el && el.current) {
      document.addEventListener('keydown', handleKeyboardEvent);

      return function cleanup() {
        document.removeEventListener('keydown', handleKeyboardEvent);
      }

    }
  }, [selectedRow]);

  function handleKeyboardEvent(e) {
    e.preventDefault();
    console.log(e);
    if (tbody && tbody.current) {
      const trCollection = tbody.current.getElementsByTagName('tr');
      if (trCollection.length === 0) {
        return;
      }
      let selected = selectedRow;
      console.log(selected);
      switch (e.code) {
        case 'ArrowUp':
          if (selected === 0 || selected === -1) {
            selected = trCollection.length;
          }
          selected--;
          //changeSelect(selected);
          break;
        case 'ArrowDown':
          if (selected === trCollection.length - 1) {
            selected = -1;
          }
          selected++;
          //changeSelect(selected);
          break;
        case 'Enter':
          if (selected !== -1) {
            //selectItem(selected);
          }
          break;
        default:
          break;
      }
      setSelectedRow(selected);
    }
  }

  function handleMouseClick(event) {
    let index = selectedRow;
    event.preventDefault();
    console.log(event);
    if (tbody && tbody.current) {
      const trCollection = tbody.current.getElementsByTagName('tr');
      if (trCollection.length === 0) {
        return;
      }

      if (trCollection[0].rowIndex > 0) {
        startIndex = trCollection[0].rowIndex;
      }

      let tr = event.target;
        while (tr.tagName !== 'TR') {
          tr = tr.parentElement;
        }
        index = tr.rowIndex - startIndex;
        setSelectedRow(index);
    }
  }

  function changeSelect(selected) {
    cancelScroll = true;
    doScroll(selected);
    //selectChange.emit(selectedRow);
  }

  const clients = props.clients;
  const clientRow = clients.map((client, i) => {
    return (<TrSelectable
      key={client.code_client}
      index={i}
      isActive={selectedRow === i}>
      <td>{client.code_client}</td>
      <td>{client.nom}</td>
      <td>{client.email}</td>
      <td>{client.adresses && client.adresses[0]?.cp} </td>
      <td>{client.adresses && client.adresses[0]?.ville} </td>
    </TrSelectable>);
  });

  return (
    <div className="fixed-header ft-09"
      height="19em"
      ref={el} onClick={handleMouseClick}>
      <table className="table table-hover table-sheet table-sm">
        <TheadFixed>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Code Postal</th>
            <th>Ville</th>
          </tr>
        </TheadFixed>
        <tbody ref={tbody}>
          {clientRow}
        </tbody>
      </table>
    </div>
  );

  /*
  
    function handleMouseClick(event) {
      const index = selectedRow;
      e.preventDefault();
      console.log(e);
      if (tbody && tbody.current) {
        const trCollection = tbody.current.getElementsByTagName('tr');
        if (trCollection.length === 0) {
          return;
        }
      }
  
      if (trCollection[0].rowIndex > 0) {
        startIndex = trCollection[0].rowIndex;
      }
  
      let tr = event.target;
      while (tr.tagName !== 'TR') {
        tr = tr.parentElement;
      }
      selectedRow = tr.rowIndex - startIndex;
      this.changeSelect(index);
    }
  
    function handleScroll(event) {
  
      if (this.cancelScroll && this.scrollTop !== event.target.scrollTop) {
        event.target.scrollTop = this.scrollTop;
        this.cancelScroll = false;
      }
    }
  
    function doScroll(index) {
      const scrollBody = document.getElementsByClassName('fixed-header');
      if (!scrollBody.length) { return; }
  
      let scrollBodyEl; 
      let theadHeight = 0;
      const theadFixed = this.thead[0];
      if (theadFixed) {
        theadHeight = theadFixed.offsetHeight;
      }
  
      scrollBodyEl = scrollBody[0];
      const rowEl = this.trCollection[index];
      if (rowEl.offsetTop < scrollBodyEl.scrollTop + theadHeight) {
        this.scrollTop = scrollBodyEl.scrollTop = rowEl.offsetTop - theadHeight;
      } else if ((rowEl.offsetTop + rowEl.offsetHeight) >
        (scrollBodyEl.scrollTop + scrollBodyEl.offsetHeight)) {
        this.scrollTop = (scrollBodyEl.scrollTop += rowEl.offsetTop +
          rowEl.offsetHeight - scrollBodyEl.scrollTop - scrollBodyEl.offsetHeight);
      }
    }
  
    function handleMouseDblClick(event) {
      const index = this.selectedRow;
      if (!this.trCollection || this.trCollection.length === 0) {
        this.trCollection = this.tbody[0].getElementsByTagName('tr');
        if (this.trCollection.length === 0) {
          return;
        }
      }
  
      if (this.trCollection[0].rowIndex > 0) {
        this.startIndex = this.trCollection[0].rowIndex;
      }
  
      this.disableClass(index);
      let tr = event.target;
      while (tr.tagName !== 'TR') {
        tr = tr.parentElement;
      }
      this.selectedRow = tr.rowIndex - this.startIndex;
      this.setClickedRow(this.selectedRow);
      this.doScroll(this.selectedRow);
      if (this.selectedRow !== -1) {
        this.selectItem.emit(this.selectedRow);
      }
    }
*/

  //<!--  onEdit="" onSelect="" -->

}

function TheadFixed(props) {
  return (
    <thead>
      {props.children}
    </thead>
  );
}

function TrSelectable(props) {
  return (
    <tr className={props.isActive ? 'active' : ''}>
      {props.children}
    </tr>
  );
}
