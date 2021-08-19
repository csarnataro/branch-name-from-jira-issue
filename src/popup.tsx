import React from "react";
import ReactDOM from "react-dom";

import PopupPage from "./PopupPage";
import "./popup.css";

var mountNode = document.getElementById("popup");
ReactDOM.render(<PopupPage />, mountNode);
