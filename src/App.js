import React, { useState, useEffect } from 'react';
import { listChildren } from './graphql/queries';
import { gql, useQuery } from '@apollo/client';
import { 
    Typography,
    Button,
    TextField,
    Box,
    Alert
  } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


function App() {

  const [childIdValue, setChildIdValue] = useState('');
  const [foundChild, setFoundChild] = useState({});
  const [generalError, setGeneralError] = useState("");

  function handleChildIdValue(event)  {setChildIdValue(whatIfNull(event.target.value, ""))};

  const whatIfNull = (text, value) => {
    return (text === null ? value : text);
  }

  const showErrorNotification = () => {
    let result = <></>;
    if (generalError) {
        result = <Alert severity="error">{generalError}</Alert>
    };
    return result;
  }

  //T8201
  const findChildID = () =>  {
    console.log("ID trying to find: ", childIdValue);
    setFoundChild(null);
    child_data.listChildren.items.map((child) => {
      if(child.ChildID === childIdValue){
        setFoundChild(child)
      }
    })
  }


  const { 
    data: child_data, 
    loading: child_loading, 
    error: child_error, 
    refetch: child_Refetch 
  } = useQuery(gql(listChildren), {variables: {limit: 3000 }});

  if(child_loading) {return <div>Child List is loading</div>};  
  if(child_error) {
    const errMsg = "Child List Load error: " + child_error
    return (
      <div>{errMsg}</div>
    );
  };
  if(child_data.listChildren.items.length===0) {return <div>There are no children to list</div>};
  console.log("Children Data: ", child_data);

  

  const showChildData = () => {
    console.log("In showChildData")
    console.log("foundChild Value: ", foundChild)
    if (foundChild === null || foundChild === ""){
      return (<></>)
    } else {
      return (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Typography variant="h6" sx={{ mt: 5 }}>Name</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Firstname}</Typography>
                <Typography variant="h6" sx={{}}>Child ID</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.ChildID}</Typography>
                <Typography variant="h6" sx={{}}>Age</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Age}</Typography>
                <Typography variant="h6" sx={{}}>Gender</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Gender}</Typography>
                <Typography variant="h6" sx={{}}>Race</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Race}</Typography>
                <Typography variant="h6" sx={{}}>Shirt Size</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.ShirtSize}</Typography>
                <Typography variant="h6" sx={{ }}>Pant Size</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.PantSize}</Typography>
                <Typography variant="h6" sx={{}}>Shoe Size</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.ShoeSize}</Typography>
                <Typography variant="h6" sx={{}}>Wish List</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Wishlist}</Typography>
                <Typography variant="h6" sx={{}}>Additional Information</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Info}</Typography>
                <Typography variant="h6" sx={{}}>Siblings</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{foundChild.Siblings}</Typography>
              </Box>
              </Box>
          </ThemeProvider>
        </React.Fragment>
        
      )
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
          <Typography
            variant="h3"
            sx={{
              color: '#CC0000'
            }}
            >Red Bag Search</Typography>
          <Typography
            variant="h6"
            sx={{
              
            }}
            >Enter the Childs ID</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
          }}>
          <TextField
            sx={{
              input: {
                backgroundColor: 'white'
              },
            }}
            value={childIdValue}
            onChange={handleChildIdValue}
          />
          <Button
            variant="contained"
            onClick={(findChildID)}
            sx={{
              ml: 2,
              backgroundColor: 'green',
              color: 'white',
              ":hover": {
                backgroundColor: "#006600"
              },
            }}
          >Search</Button>
        </Box>
        {foundChild === null ? <div style={{color:'red', textAlign: 'center', marginTop: '10px'}}>Sorry, can't find that ID.</div> : <></>}
        {showChildData()}
         
        
      </ThemeProvider>
      
    </React.Fragment>
  );
  }

export default App;
