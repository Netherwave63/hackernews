import React from "react";
import PropTypes from "prop-types";
import { sortBy } from "lodash";
import Sort from "../Sort";

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

class Table extends React.Component {
  
  state = {
    sortKey: "NONE",
    isSortReverse: false
  }

  onSort = sortKey => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {

    const { sortKey, isSortReverse } = this.state;

    const { list, onDismiss } = this.props;

    const sortedList = SORTS[sortKey](list);

    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    
    return (
      <div>
        <p><span className="blue-text" style={{ fontWeight: "700"}}>SortBy : </span>{sortKey}</p>
        <table>
          <thead>
            <tr>
              <th>
                <Sort sortKey="TITLE" onSort={ this.onSort }>Title</Sort>
              </th>
              <th>
                <Sort sortKey="AUTHOR" onSort={ this.onSort }>Author</Sort>
              </th>
              <th>
                <Sort sortKey="COMMENTS" onSort={ this.onSort }>Comments</Sort>
              </th>
              <th>
                <Sort sortKey="POINTS" onSort={ this.onSort }>Points</Sort>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reverseSortedList.map(item =>
              <tr key={ item.objectID }>
                <td><a href={ item.url } className="grey-text text-darken-3">{ item.title }</a></td>
                <td>{ item.author }</td>
                <td>{ item.num_comments }</td>
                <td>{ item.points }</td>
                <td>
                  <button 
                    className="btn z-depth-0 blue"
                    onClick={() => onDismiss(item.objectID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ),
  onDismiss: PropTypes.func
};

export default Table;