import React from "react";
import ReactDOM from "react-dom";
import HighlightRow from "./components/HighlightRow";
import './style/demo.css';

const div = document.getElementById('react');
const clients = JSON.parse(div.dataset.client);
ReactDOM.render(<HighlightRow clients={clients}/>, div);