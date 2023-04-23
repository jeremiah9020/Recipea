import {React, useState, useEffect} from 'react';
import Header from '../../components/Header/Header'
import CardContainer from '../../components/CardContainer/CardContainer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import './Search.scss';
import useRefresh from '../../hooks/refreshHook'

const Filters = [
    {
      value: 'userid',
      label: 'User',
    },
    {
      value: 'title',
      label: 'Title',
    },
    {
      value: 'ingredients',
      label: 'Ingredients',
    },
    {
      value: 'tags',
      label: 'Tags',
    },
];

const options = ['Option 1', 'Option 2'];
// var searchField = '';
// var filteredList = [];

function Search() {
    const [refresh, forceRefresh] = useRefresh()
    const [searchField, setSearchField] = useState('');
    
    const [value, setValue] = useState();
    const [input, setInput] = useState('');

    // const searchField = '';
    // setSearchField(prevSearchField => ([...prevMovies, ...result]));

    const [recipes, setRecipes] = useState([])

    const fetchUserData = () => {
        fetch("http://localhost:3001/api/recipes")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setRecipes(data)
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    function handleClick() { 
    
        console.log(searchField);
        console.log(input) 
        console.log(filteredList);
        console.log(renderList);
        
    } 

    const [filteredList, setFilteredList] = useState([]);
    const [renderList, setRenderList] = useState([]);
    //const [tempRecipes, setTempRecipes] = useState([]);

    function handleSearchFieldChange(e) {
        setSearchField(e.target.value);
        let nextId = 0;
        let tempRecipes = [];
        for (let recipe of recipes)
        {
            var found = false;
            for(var i = 0; i < tempRecipes.length; i++) {
                if (tempRecipes[i].Name == recipe[e.target.value]) {
                    found = true;
                    break;
                }
            }
            if (found == false)
            {
                tempRecipes = [...tempRecipes, { Id: nextId++, Name: recipe[e.target.value] }];
            }
            // if (!tempRecipes.some( tempRecipes => tempRecipes['Name'] !== recipe[e.target.value] ))
            // {
                
            // }
            // if (tempRecipes.filter(function(e) { return e.Name === recipe[e.target.value]; }).length > 0)
            // {

            // }
            // else
            // {
            //     tempRecipes = [...tempRecipes, { Id: nextId++, Name: recipe[e.target.value] }];
            // }
            // if (!tempRecipes.some(e => e.Name === recipe[e.target.value]))
            // {
            //     tempRecipes = [...tempRecipes, { id: nextId++, name: recipe[e.target.value] }];
            // }
            // if (!tempRecipes.name.includes(recipe[e.target.value]))
            // {
            //     tempRecipes = [...tempRecipes, { id: nextId++, name: recipe[e.target.value] }];
            // }
        }
        //filteredList = tempRecipes;
        setFilteredList(tempRecipes);
    }

    function handleButtonClick() {
        let tempRecipes = [];
        for (let recipe of recipes)
        {
            // console.log(tempRecipes);
            // console.log(tempRecipes);
            // console.log(recipe[searchField]);
            var found = false;
            for(var i = 0; i < tempRecipes.length; i++) {
                
                if (tempRecipes[i][input] == recipe[searchField]) {
                    found = true;
                    break;
                }
            }
            console.log(recipe[searchField]);
            console.log(input.Name);
            if (found == false && recipe[searchField] == input.Name)
            {
                tempRecipes = [...tempRecipes, recipe];
            }
            console.log(tempRecipes);
        }
        
        setRenderList(tempRecipes)
    }
  
    return (
      <div className="Search">
        <Header/>
        <div style = {{display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px', flexWrap: 'wrap', gap: '40px'}}>
            <TextField
                id="outlined-select-filterType"
                select
                label="Search By"
                defaultValue={'User Id'}
                helperText="Please select your Search By Filter"
                onChange={handleSearchFieldChange}
            >
            {Filters.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
            </TextField>
            <Autocomplete 
                id="autocompleteFilter"
                onChange={(e,v) => setInput(v)}
                getOptionLabel={(filteredList) =>
                    filteredList.Name
                }
                options={filteredList}
                sx={{width: 300}}
                isOptionEqualToValue={(option, value) =>
                    option[searchField] === value[searchField]
                }
                noOptionsText = "No available emails"
                renderOption={(props, filteredList) => (
                    <Box component="li" {...props} key={filteredList.Id}>
                        {filteredList.Name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField {...params} label="Search For" helperText={`Please select your ${searchField}`} onChange={({ target }) => setInput(target.value[searchField])}/>
                )}
                  
                // onChange={handleChange}
            />
            <Button
                variant="outlined" 
                size="medium"
                onClick={() => {
                    alert('clicked');
                    handleButtonClick();
                }}
            >
                Search
            </Button>
            <div onClick={handleClick}>
            
                Hello World 
            
            </div> 
        </div>
        
        <CardContainer forceRefresh={forceRefresh} recipes={renderList} />
      </div>
    )
}

export default Search;