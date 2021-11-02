import React, { useState, useContext } from 'react'
import useSWR from 'swr'
import {
  Typography, Container, Input, InputAdornment
  , InputGroup, InputLeftElement, Link, List, ListItem, Stack, Paper
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { Box, Code, IconButton, Switch, } from '@mui/material';

import TableRow from '../components/TableRow';
import UserContext from '../context/userContext';
import UserIdContext from '../context/userIdContext';
import SessionContext from '../context/sessionContext';
import { useGetWatchlist } from '../utils/useMovies'
import { getSearchResults } from '../utils/useMovies'

const Search = () => {
  const [value, setValue] = React.useState('')
  const [results, setResults] = React.useState([])

  const { user } = useContext(UserContext);
  const { userid } = useContext(UserIdContext);
  const { sessionId } = useContext(SessionContext);

  const { data, error } = useGetWatchlist(userid, sessionId)

  const handleChange = async (event) => {
    event.preventDefault();

    setValue(event.target.value)
    await getSearchResults(event.target.value).then(data => setResults(data.results))
  }

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="sm">
        <Stack spacing={2} >
          <div>
            <Input
              style={{ backgroundColor: 'lightgrey', borderRadius: 5, padding: 10 }}
              disableUnderline
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              value={value}
              onChange={handleChange}
              placeholder="Search for a movie.." />
          </div>
          <Box overflowX="scroll">
            {results?.length > 0 &&
              (
                results.map((movie) => (
                  <TableRow key={movie.id} movie={movie} />
                ))
              )
            }
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default Search;