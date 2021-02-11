import React from "react";
import ReactDOM from "react-dom";
import ClientsList from "./components/ClientsList";
import './style/demo.css';

const div = document.getElementById('react');
const clients = JSON.parse(div.dataset.client);
ReactDOM.render(<ClientsList clients={clients}/>, div);