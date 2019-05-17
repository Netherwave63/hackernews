import React from "react";
import SearchForm from "../SearchForm/index";
import Table from "../Table/index";

class App extends React.Component {
  
  state = {
    results: null,
    searchKey: "react",
    searchTerm: "",
    isLoading: false
  }

  onDismiss = id => {
    const { results, searchKey } = this.state;
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          ...results[searchKey],
          hits: results[searchKey].hits.filter(item => item.objectID !== id)
        }
      }
    })
  }

  onChange = event => {
    this.setState({ 
      searchTerm: event.target.value 
    });
  }

  onSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.shouldFetchHackerNews(searchTerm)) {
      this.fetchHackerNews(searchTerm);
    } else {
      this.setState({ searchTerm: "" });
    };
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchHackerNews(this.state.searchKey);
  }

  fetchHackerNews = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`)
      .then(response => response.json())
      .then(result => this.setHackerNews(result))
      .catch(error => console.log(error));
  }

  shouldFetchHackerNews = searchTerm => {
    return !this.state.results[searchTerm];
  }

  setHackerNews = result => {
    const { hits, page } = result;
    const { results, searchKey } = this.state;
    const oldHits = page !== 0 ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      },
      searchTerm: "",
      isLoading: false
    });
  }

  render() {
    
    const {
      results,
      searchTerm,
      searchKey,
      isLoading
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page 
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || null;

    return (

      <div className="container">
        
        <h1 className="blue-text center-align">
          Hacker News
        </h1>
        
        <br />

        <SearchForm 
          searchTerm={ searchTerm }
          onSubmit={ this.onSubmit }
          onChange={ this.onChange }
        />

        <br />

        {
          list && 
          <Table 
            list={ list } 
            onDismiss={ this.onDismiss } 
          />
        }

        <br />

        <div className="center-align" style={{ marginBottom: "16px"}}>
          {
            isLoading ?
            <Loading /> : (
            <button 
              className="btn z-depth-0 blue"
              onClick={() => this.fetchHackerNews(searchKey, page + 1)}
            >
              More
            </button> )
          }
        </div>

      </div>

    );
  }

}

const Loading = () => (
  <p>Loading..</p>
);

export default App;