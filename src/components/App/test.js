import React from "react";
import ReactDOM from "react-dom";
import App from "./index";
import SearchForm from "../SearchForm";
import Table from "../Table";
import { shallow } from "../../tests";

describe("App component", () => {

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Renders the SearchForm component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SearchForm).length).toBe(1);
  });

});
