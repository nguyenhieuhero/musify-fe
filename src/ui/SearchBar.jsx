import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  padding: 5px 10px;
  border-radius: 50px;
  border: 1px solid white;
  width: 300px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: white;
  margin-left: 8px;
  flex-grow: 1;
  font-size: 16px;

  ::placeholder {
    color: #b3b3b3;
  }
`;

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  }, [query, navigate]);

  return (
    <SearchContainer>
      <FontAwesomeIcon icon={faSearch} color="#b3b3b3" />
      <SearchInput
        placeholder="What do you want to play?"
        onChange={(e) => setQuery(e.target.value)}
      />
    </SearchContainer>
  );
}

export default SearchBar;
