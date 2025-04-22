import { Component } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';

interface SearchResult {
  name: string;
  description: string;
}

interface AppState {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    };
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const url = new URL('https://stapi.co/api/v2/rest/astronomicalObject');
      if (searchTerm) {
        url.searchParams.append('uid', searchTerm);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedResults: SearchResult[] = [
        {
          name: data.astronomicalObject.uid,
          description: data.astronomicalObject.name,
        },
      ];
      console.log(formattedResults);
      this.setState({ results: formattedResults });
    } catch (err) {
      this.setState({
        error: err instanceof Error ? err.message : 'An error occurred',
        results: [],
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    return (
      <ErrorBoundary>
        <div>
          <div>
            <Search
              onSearch={this.handleSearch}
              isLoading={this.state.isLoading}
            />
          </div>
          <div style={{ padding: '5px' }}>
            <p>Item Name | Item Description</p>
            <SearchResults
              results={this.state.results}
              isLoading={this.state.isLoading}
              error={this.state.error}
            />
            <button onClick={this.throwError}>Throw Error</button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
