import React from "react";
import ReactDOM from "react-dom";
import Table from "./index";

describe("Table component", () => {

  const props = {
    list: [
      { title: "1", author: "1", num_comments: 1, points: 1, objectID: "1" },
      { title: "2", author: "2", num_comments: 2, points: 2, objectID: "2" },
    ]
  };

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});