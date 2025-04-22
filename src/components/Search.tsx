import { Component } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  isLoading: boolean;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.props.onSearch(savedSearchTerm);
    } else {
      this.props.onSearch('');
    }
  }

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch} disabled={this.props.isLoading}>
          {this.props.isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    );
  }
}

export default Search;
