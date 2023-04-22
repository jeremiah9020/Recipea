import {React, useState, useEffect} from 'react'
import Rating from '@mui/material/Rating';

function StarRating(props) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        async function setDefaultRating() {
            const url = `http://localhost:3001/api/ratings/${props.recipeid}`;

            const result = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            })

            const rating = await result.json();

            if (rating)
            {
                setValue(rating.score);
            }
        }
        setDefaultRating();
    }, [props.recipeid,props.refresh])

    function handleStarChange(value)
    {
        if (!value) value = 0;

        async function handleStarValue()
        {
            // fetch request to update rating
            const url = `http://localhost:3001/api/ratings`;
            const body = {score: value, recipeid: props.recipeid};

            await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(body)
            });
        }
        handleStarValue()
    }

    function handleStarClick(event)
    {
        // prevent modal
        event.stopPropagation();
    }

    return (
        <div>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    handleStarChange(newValue);
                }}
                onClick={handleStarClick}
            />
        </div>
    )
}

export default StarRating