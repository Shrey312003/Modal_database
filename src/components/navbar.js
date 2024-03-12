import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, TextField, IconButton, Button } from '@mui/material';
import { Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function NavBar() {
  const [searchValue, setSearchValue] = React.useState('');

  const {data:modals} = useFetch("http://localhost:8000/data");

  console.log(modals);

  const [searchObj, setSearchObj] = React.useState(null);

  const navigate = useNavigate();

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
    const val = modals.filter((modal) => modal.title === newValue);

    setSearchObj(val[0]);
  };

  const handleSearch = () => {
    console.log('Perform search for:', searchValue);
    console.log(searchObj);
    try{
      navigate(`/explore/${searchObj.id}`);
    }

    catch(error){
      <div>Page not found</div>
    }
    
  };

  const handleCreate = () => {
    
  }

  // If you want the search to be performed when the user presses Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar position="static">

      {modals && (<Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center'}}>
            <Autocomplete
              freeSolo // Allows arbitrary input, not just selection from the list
              disablePortal
              id="combo-box-demo"
              options={modals.map((option) => option.title)} // Map your options to strings
              sx={{ width:"50px", flexGrow: 1 ,backgroundColor:"white"}}
              onInputChange={handleSearchChange} // Update search value on input change
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Modals"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                  // onKeyPress={handleKeyPress} // Add the keyPress event to handle Enter
                />
              )}
            />

            <Button 
              sx={{backgroundColor:"white" ,color:"black",margin:"0 2% 0 2%"}}
              onClick={handleCreate}
            >
              Create
            </Button>
          </Box>
        </Toolbar>
      </Container>)}
    </AppBar>
  );
}

export default NavBar;
