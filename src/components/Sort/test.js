import React from "react";
import ReactDOM from "react-dom";
import Sort from "./index";

describe("Sort component", () => {

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Sort>sortBy</Sort> />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});