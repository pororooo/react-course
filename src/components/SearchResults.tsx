import { Component } from 'react';

interface SearchResult {
  name: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { results, isLoading, error } = this.props;

    if (isLoading) {
      return <div>Search...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (results.length === 0) {
      return <div>No data found</div>;
    }

    return (
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <div>
              {result.name} - {result.description}
            </div>
            <div></div>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
