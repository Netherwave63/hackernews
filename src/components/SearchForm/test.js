import React from "react";
import ReactDOM from "react-dom";
import SearchForm from "./index";

describe("SearchForm component", () => {

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SearchForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});