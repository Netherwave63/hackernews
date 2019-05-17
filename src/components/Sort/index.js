import React from "react";

const Sort = ({ sortKey, onSort, children }) => {

  return (
    <span 
      onClick={() => onSort(sortKey)}
      style={{ cursor: "pointer" }}
    >
      { children }
    </span>
  );

};

export default Sort;