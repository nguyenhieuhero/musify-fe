import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchByQuery } from '../services/apiService';
import TrackCard from '../components/TrackCard';
import styled from 'styled-components';

// Container for search results
const ResultsContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Header for the search results
const ResultsHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

// Empty state for no results
const NoResults = styled.p`
  font-size: 18px;
  color: #888;
`;

// Individual search result item
const SearchCardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ $isPlaying }) => ($isPlaying ? '#e0e0e0' : 'white')};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Search result title
const ResultTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await searchByQuery(query, { signal });
        setResults(response.data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request cancelled');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ResultsContainer>
      <ResultsHeader>Search Results</ResultsHeader>
      {results.length === 0 ? (
        <NoResults>No results found.</NoResults>
      ) : (
        results.map((result) => (
          <SearchCardContainer key={result.id}>
            {result.type === 'track' ? (
              <TrackCard id={result.id} track_name={result.name} />
            ) : (
              <ResultTitle
                onClick={() => navigate(`/${result.type}/${result.id}`)}
              >
                {result.name} ({result.type})
              </ResultTitle>
            )}
          </SearchCardContainer>
        ))
      )}
    </ResultsContainer>
  );
}

export default Search;
