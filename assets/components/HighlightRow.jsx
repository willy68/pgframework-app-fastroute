import React, { useState, useRef, useEffect } from 'react';

export default function HighlightRow(props) {
  let startIndex = 0;

  const handleSelect = props.handleSelect;
  const handleFire = props.handleFire;

  const [selectedRow, setSelectedRow] = useState(-1);
  const [scrollTop, setScrollTop] = useState(0);
  const [cancelScroll, setCancelScroll] = useState(false);

  const el = useRef();

  useEffect(() => {

    if (el && el.current) {
      document.addEventListener('keydown', handleKeyboardEvent);

      return function cleanup() {
        document.removeEventListener('keydown', handleKeyboardEvent);
      }

    }
  }, [selectedRow]);

  function handleKeyboardEvent(e) {
    if (el && el.current) {
      const tbody = el.current.getElementsByTagName('tbody');
      const trCollection = tbody[0].getElementsByTagName('tr');
      if (trCollection.length === 0) {
        return;
      }
      let index = selectedRow;
      switch (e.code) {
        case 'ArrowUp':
          if (index === 0 || index === -1) {
            index = trCollection.length;
          }
          index--;
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (index === trCollection.length - 1) {
            index = -1;
          }
          index++;
          e.preventDefault();
          break;
        case 'Enter':
          if (index !== -1) {
            e.preventDefault();
            handleFire(index);
          }
          break;
        default:
          break;
      }
      if (index !== selectedRow) {
        setSelectedRow(index);
        scroll(index);
        handleSelect(index);
      }
    }
  }

  function handleMouseClick(e) {
    let index = selectedRow;
    e.preventDefault();

    let tr = e.target;
    while (tr && tr.tagName !== 'TR') {
      tr = tr.parentElement;
    }

    if (tr && el && el.current) {
      const tbody = el.current.getElementsByTagName('tbody');
      const trCollection = tbody[0].getElementsByTagName('tr');
      if (trCollection.length === 0) {
        return;
      }

      if (trCollection[0].rowIndex > 0) {
        startIndex = trCollection[0].rowIndex;
      }

      index = tr.rowIndex - startIndex;
      setSelectedRow(index);
      scroll(index);
      handleSelect(index);
    }
  }

  function handleMouseDblClick(e) {
    let index = selectedRow;
    e.preventDefault();

    let tr = e.target;
    while (tr && tr.tagName !== 'TR') {
      tr = tr.parentElement;
    }

    if (tr && el && el.current) {
      const tbody = el.current.getElementsByTagName('tbody');
      const trCollection = tbody[0].getElementsByTagName('tr');
      if (trCollection.length === 0) {
        return;
      }

      if (trCollection[0].rowIndex > 0) {
        startIndex = trCollection[0].rowIndex;
      }

      index = tr.rowIndex - startIndex;
      setSelectedRow(index);
      scroll(index);
      if (index > -1) {
        handleSelect(index);
        handleFire(index);
      }
    }
  }

  function handleScroll(e) {

    if (cancelScroll && scrollTop !== e.target.scrollTop) {
      e.target.scrollTop = scrollTop;
      setCancelScroll(false);
    }
  }

  function scroll(index) {
    setCancelScroll(true);
    doScroll(index);
  }

  function doScroll(index) {
    const scrollBody = document.getElementsByClassName('fixed-header');
    if (!scrollBody || scrollBody.length === 0) { return; }

    const trCollection = scrollBody[0].getElementsByTagName('tr');
    if (!trCollection || trCollection.length === 0) {
      return;
    }

    const thead = scrollBody[0].getElementsByTagName('thead');
    if (!thead || thead.length === 0) {
      return;
    }

    let scrollBodyEl;
    let theadHeight = 0;
    const theadFixed = thead[0];
    if (theadFixed) {
      theadHeight = theadFixed.offsetHeight;
    }

    scrollBodyEl = scrollBody[0];
    const rowEl = trCollection[index];
    if (rowEl.offsetTop < scrollBodyEl.scrollTop + theadHeight) {
      scrollBodyEl.scrollTop = rowEl.offsetTop - theadHeight;
      setScrollTop(rowEl.offsetTop - theadHeight);
    } else if ((rowEl.offsetTop + rowEl.offsetHeight + theadHeight) >
      (scrollBodyEl.scrollTop + scrollBodyEl.offsetHeight)) {
      scrollBodyEl.scrollTop = rowEl.offsetTop + rowEl.offsetHeight + theadHeight - scrollBodyEl.offsetHeight;
      setScrollTop(rowEl.offsetTop + rowEl.offsetHeight + theadHeight - scrollBodyEl.offsetHeight);
    }
  }

  return (
    <div className="fixed-header"
      ref={el}
      onClick={handleMouseClick}
      onScroll={handleScroll}
      onDoubleClick={handleMouseDblClick}>
        {props.children}
    </div>
  );

}


