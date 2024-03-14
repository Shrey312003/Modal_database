import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, TextField, IconButton, Button } from '@mui/material';
import { Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {Container} from '@mui/material';

function NavBar() {
  const [searchValue, setSearchValue] = React.useState('');
  const {data: modals} = useFetch("https://my-json-server.typicode.com/Shrey312003/Modal_database/posts");
  const [searchObj, setSearchObj] = React.useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
    const val = modals.filter((modal) => modal.title === newValue);
    setSearchObj(val[0]);
  };

  const handleSearch = () => {
    console.log('Perform search for:', searchValue);
    try {
      navigate(`/explore/${searchObj.id}`);
    } catch(error) {
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
                display: { xs: 'inline', sm: 'inline',md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                alignSelf: 'center', // Vertically center align the brand name
              }}
            >
              ATLAN
            </Typography>

            <Box sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              '& .MuiTextField-root': { // Targeting all MUI TextFields inside this Box
                mr: 2, // Adding right margin to TextField
                '& .MuiOutlinedInput-root': {
                  color: 'white', // Making the text white
                  '& fieldset': { // Targeting the TextField's border
                    borderColor: 'white', // Making the border white
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Making the border white on hover
                  },
                  '&.Mui-focused fieldset': { // Making the border white when the TextField is focused
                    borderColor: 'white',
                  },
                },
              },
              '& .MuiButtonBase-root': { // Targeting all MUI ButtonBase components like IconButton
                color: 'white', // Making the IconButton white
              },
            }}>
              <Autocomplete
                freeSolo
                disablePortal
                id="combo-box-demo"
                options={modals.map((option) => option.title)}
                sx={{ width: {sm:"30%",xs:"30%",md:300,lg:300}, maxWidth: '100%',color:"white", borderColor:"white" }} // Adjust the width of the search bar here
                onInputChange={handleSearchChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Modals"
                    variant="outlined"
                    size="small"
                    onKeyPress={handleKeyPress}
                    // The InputProps and InputLabelProps are used to style the components of the TextField
                    InputProps={{
                      ...params.InputProps,
                      className: 'search-bar-input', // You can also use a class for styling if needed
                      endAdornment: (
                        <IconButton onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      ),
                      style: { color: 'white' } // Inline style for text color
                    }}
                    InputLabelProps={{
                      style: { color: 'white' } // Inline style for label color
                    }}
                  />
                )}
              />
              {/* <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleSearch}
                sx={{ marginLeft: '8px' }}
              >
                <SearchIcon />
              </IconButton> */}

              <Button 
                variant="outlined" // Makes the button outlined
                color="inherit"
                onClick={handleCreate}
                sx={{ width:{s:'10%'},ml: 2, borderRadius: 1 }} // Adds margin-left and border radius to the button
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
