import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, TextField, IconButton, Button, Container } from '@mui/material';
import { Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function NavBar() {
  const [searchValue, setSearchValue] = React.useState('');
  const { data: modals } = useFetch("https://my-json-server.typicode.com/Shrey312003/Modal_database/posts");
  const [searchObj, setSearchObj] = React.useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
    const val = modals.filter((modal) => modal.title === newValue);
    setSearchObj(val[0]);
  };

  const handleSearch = () => {
    console.log('Perform search for:', searchValue);
    if (searchObj) {
      navigate(`/explore/${searchObj.id}`);
    } else {
      console.log("Not found");
    }
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar position="static">
      {modals && (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                alignSelf: 'center',
              }}
            >
              ATLAN
            </Typography>

            <Box sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
              <Autocomplete
                freeSolo
                disablePortal
                id="combo-box-demo"
                options={modals.map((option) => option.title)}
                sx={{ 
                  width: 200, // Adjusted to a specific width to make it smaller
                  maxWidth: '100%',
                  mx: 2,
                  '.MuiAutocomplete-inputRoot': {
                    color: 'white', // Ensures the input text is white
                    borderColor:'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white', // Keeps the border color white
                    },
                  },
                }}
                onInputChange={handleSearchChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    variant="outlined"
                    size="small"
                    placeholder="Search" // Placeholder text instead of label for a cleaner look
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <IconButton onClick={handleSearch}>
                          <SearchIcon sx={{color:"white"}}/>
                        </IconButton>
                      ),
                    }}
                    InputLabelProps={{
                      style: { color: 'white' }
                    }}
                  />
                )}
              />

              <Button 
                variant="outlined"
                color="inherit"
                onClick={handleCreate}
                sx={{ ml: 2, borderRadius: 1 }}
              >
                Create
              </Button>
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
}

export default NavBar;
