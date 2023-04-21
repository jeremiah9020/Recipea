
import {React, useState, useEffect} from 'react';
import './Cookbook.scss'
import Header from '../../components/Header/Header';
import ExtendedCard from '../../components/ExtendedCard/ExtendedCard';
import Card from '../../components/Card/Card'
var user_data
var cards1
var valueofbook = ""

function Cookbook() {
    // let recipes_values = {}
    const [selected,setselected] = useState("N/A")//what the user wants to look at
    const [books,setBooks] = useState([])
    const [profiles,setProfiles] = useState(0)
    const [recipes,setRecipes] = useState([])
    const [cards, setCards] = useState([])
    const [extendedCard, setExtendedCard] = useState();

    //This was used in the navigation bar and from the authContext.js to get the user profile
    useEffect(() => {
        async function getUserProfileData() {
            const response = await fetch(`http://localhost:3001/api/profiles/authenticated`, {
                method: 'GET',
                credentials: 'include'
            })
            user_data = await response.json()//who the user is..
            setProfiles(user_data.userid)
        }   
        getUserProfileData()
    },[])//This will get the userid


    //This will get the recipes from the api
    useEffect(() => {
        fetch(`http://localhost:3001/api/recipes`)
        .then((res)=> res.json())
        .then((data) => setRecipes(data))
    },[])


    //When the profile is found the cookbooks are then fetched
    useEffect(()=>{
        fetch(`http://localhost:3001/api/cookbook/${profiles}`)
        .then((res)=> res.json())
        .then((data) => setBooks(data))
    },[profiles])

    //When the books are changed the lists are repopulated
    useEffect(()=>{
        let list = document.getElementById("books")
        let remove = document.getElementById("booksRemove")
        books.forEach((data)=>{
            let y = document.createElement('option')
            let x = document.createElement('option')
            y.innerText = data.cookbookname
            x.innerText = data.cookbookname
            list.appendChild(y)
            remove.appendChild(x)
        }
        )
        populateCards()//Populate the cards for the user
    },[books])
    
    //Get the recipes for the user
    useEffect(()=>{
        let t = []
        for(var r = 0; r < recipes.length; r++)
        {
            if(recipes[r].userid === profiles)
            {
                t.push(recipes[r])
                let list = document.getElementById("recipestochoose")
                let x = document.createElement('option')
                x.innerText = recipes[r].title
                list.appendChild(x)
            }
        }
        setRecipes(t)        
    },[profiles])
    
    //Search tht CB for the user
    function searchCB() {
        populateCards()
    }

    //Populate the cards to be used
    function populateCards() {
        let values = ""
        cards1 = []
        valueofbook = -1
        for (var i = 0; i < books.length; i++){
            if(books[i].cookbookname === document.getElementById('namesofCB').value)
            {
                values = books[i].recipes
                valueofbook = i
                break
            }
        }        
        if(valueofbook === -1)
        {
            return
        }
        setselected(document.getElementById('namesofCB').value)
        if(values)
        {
            values = values.split(":")
            for(var re = 0; re < recipes.length; re++)
            {
                if(values.includes((recipes[re].id).toString()))
                {
                    cards1.push(<Card recipe={recipes[re]} user={user_data} onClick={cardClick} setExtendedCard={setExtendedCard} />)
                }
            }
            // console.log(cards);
        }
        setCards(cards1)
    }

    function cardClick()
    {
      console.log("CLICKED");
      setExtendedCard(<ExtendedCard/>)
    }
  

    ///Make sure that this cookbook is unique
    //Add a cookbook for the user
    async function AddCook() {
        if(document.getElementById("addCB").value === "") return

        for(var g = 0; g < books.length; g++)
        {
            if(books[g].cookbookname ===  document.getElementById("addCB").value)
            {
                //Have an alert here...
                document.getElementById("addCB").value = ""
                return
            }
        }

        const url = 'http://localhost:3001/api/cookbook'
        await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: profiles,
                cookbookname: document.getElementById("addCB").value,
                recipes: null
            })
        })
        
        //Refetch the data...
        // alert("Successfully add the cookbook" + document.getElementById("addCB").value)
        document.getElementById("books").innerHTML = ""
        document.getElementById("booksRemove").innerHTML = ""
        document.getElementById("addCB").value = ""
        fetch(`http://localhost:3001/api/cookbook/${profiles}`)
        .then((res)=> res.json())
        .then((data) => setBooks(data))
    }

    //Remove a cookbook for the user
    async function RemoveCook() {
        const url = 'http://localhost:3001/api/cookbook'
        let h = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: profiles,
                cookbookname: document.getElementById("removeCB").value,
            })
        })
        //Refetch the data....
        document.getElementById("books").innerHTML = ""
        document.getElementById("booksRemove").innerHTML = ""
        document.getElementById("removeCB").value = ""
        fetch(`http://localhost:3001/api/cookbook/${profiles}`)
        .then((res)=> res.json())
        .then((data) => setBooks(data))
        setselected("N/A")
    }

    //Add a recipe for the user
    async function AddRecipe() {
        if (selected === "N/A" || selected === "")
        {
            return
        }
        const url = 'http://localhost:3001/api/cookbook'
        let id = 0
        for(var t = 0; t < recipes.length; t++)
        {
            if(recipes[t].title === document.getElementById("recipestochoose").value)
            {
                id = recipes[t].id

                break
            }
        }
        let a = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: profiles,
                cookbookname: selected,
                recipes: id
            })
        })
        document.getElementById("books").innerHTML = ""
        document.getElementById("booksRemove").innerHTML = ""
        document.getElementById("addCB").value = ""
        await fetch(`http://localhost:3001/api/cookbook/${profiles}`)
        .then((res)=> res.json())
        .then((data) => setBooks(data))
        // .then(console.log(books))
    }


    return(
        <div className='CookBook'>
            <Header></Header>
            <div>
                <div className='CookBook-selected'>
                    Selected CookBook {selected}
                </div>
                <div className='flexbox'>
                <input list="books" id="namesofCB" placeholder='Cookbooks' className='Recipesforuser'></input>
                <datalist className='listofCook' id='books'>
                </datalist>
                <button onClick={searchCB} className='searchingCB'>
                    Search/Choose CookBooks
                </button>
                <input list="booksAdd" id="addCB" placeholder='Add CookBook' className='Recipesforuser'></input>
                <button onClick={AddCook} className='addcook'>
                    Add CookBook
                </button>
                </div>
                <div className='flexbox'>
                <input list="booksRemove" id="removeCB" placeholder='Remove CookBook' className='Recipesforuser'></input>
                <datalist className='listofCook' id='booksRemove'>
                </datalist>
                <button onClick={RemoveCook} id="removeButton" className='removecook'>
                    Remove CookBook
                </button>
                <select className="recipestochoose" id="recipestochoose"></select>
                <button onClick={AddRecipe} id="AddRecipe" className='recipestoAdd'>
                    Add Recipe to CookBook
                </button>
                </div>
            <hr></hr>
            </div>
            <div className='flex'>
            {cards}
            </div>
            <div>
                {extendedCard}
            </div>
        </div>
    )
}

export default Cookbook;