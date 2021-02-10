import React, { useState, useRef }  from 'react';

export default function HighlightRow(props) {

  const [selectedRow, setSelectedRow] = useState(-1);
  //const [thead, setThead] = useState(null);
  //const [cancelScroll, setCancelScroll] = useState(false);

  const el = useRef();
  const tbody = useRef(null);
  //const trCollection = useRef(null);

  function handleKeyboard(e){
    console.log(e);
    console.log(tbody);
    //setSelectedRow(index);
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

  function handleKeyboardEven(event) {
    if (!trCollection || trCollection.length === 0) {
      trCollection = tbody[0].getElementsByTagName('tr');
      if (trCollection.length === 0) {
        return;
      }
    }
    const index = selectedRow;
    let selected = selectedRow;
    switch (event.code) {
      case 'ArrowUp':
        if (selected === 0 || selected === -1) {
          selected = trCollection.length;
        }
        selected--;
        //changeSelect(index);
        break;
      case 'ArrowDown':
        if (selected === trCollection.length - 1) {
          selected = -1;
        }
        selected++;
        //changeSelect(index);
        break;
      case 'Enter':
        if (selected !== -1) {
          //selectItem(selected);
        }
        break;
      default:
        break;
    }
  }

  function changeSelect(prevIndex) {
    disableClass(prevIndex);
    setClickedRow(selectedRow);
    cancelScroll = true;
    doScroll(this.selectedRow);
    //selectChange.emit(selected);
  }

  function setClickedRow(index) {
    if (index > -1 && index < this.trCollection.length) {
      this.renderer.addClass(this.trCollection[index], 'active');
    }
  }

  function disableClass(index) {
    if (index > -1 && index < this.trCollection.length) {
      this.renderer.removeClass(this.trCollection[index], 'active');
    }
  }

  return (
    <div className="fixed-header ft-09" 
      height="19em" 
      ref={el} 
      onKeyDown={handleKeyboard} tabIndex="-1">
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
    ngOnInit = function () {
      let height = '25em';
      if (this.height) {
        height = this.height;
      }
      this.renderer.setStyle(this.el.nativeElement, 'height', height);
      this.tbody = this.el.nativeElement.getElementsByTagName('tbody');
      this.thead = this.el.nativeElement.getElementsByTagName('thead');
      if (this.tbody.length > 0) {
        this.trCollection = this.tbody[0].getElementsByTagName('tr');
      }
      this.selectedRow = -1;
    }
    trCollection: any;
    tbody: any;
    thead: any;
    scrollTop = 0;
    cancelScroll = false;
    startIndex = 0;
    selectedRow: number;
  
    this.handleMouseClick = function (event) {
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
  
      let tr = event.target;
      while (tr.tagName !== 'TR') {
        tr = tr.parentElement;
      }
      this.selectedRow = tr.rowIndex - this.startIndex;
      this.changeSelect(index);
    }
  
    changeSelect = function (prevIndex) {
      this.disableClass(prevIndex);
      this.setClickedRow(this.selectedRow);
      this.cancelScroll = true;
      this.doScroll(this.selectedRow);
      this.selectChange.emit(this.selectedRow);
    }
  
    setClickedRow = function (index) {
      if (index > -1 && index < this.trCollection.length) {
        this.renderer.addClass(this.trCollection[index], 'active');
      }
    }
  
    disableClass = function (index) {
      if (index > -1 && index < this.trCollection.length) {
        this.renderer.removeClass(this.trCollection[index], 'active');
      }
    }
  
    handleScroll = function (event) {
  
      if (this.cancelScroll && this.scrollTop !== event.target.scrollTop) {
        event.target.scrollTop = this.scrollTop;
        this.cancelScroll = false;
      }
    }
  
    doScroll = function (index) {
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
  
    handleMouseDblClick = function (event) {
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

function TheadFixed(props)
{
  return (
    <thead>
      {props.children}
    </thead>
  );
}

function TrSelectable(props)
{

  function handleKeyboard(e) {
    props.onKeyDown(e, props.index);
  }

  return (
    <tr className={props.isActive ? 'active' : ''} tabIndex="0">
      {props.children}
    </tr>
  );

}
