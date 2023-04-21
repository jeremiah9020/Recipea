import {React, useState, useEffect} from 'react'

// needs a recipe as a prop
function Comment(props) {
    const [comments, setComments] = useState([])

    // populate comments on load
    useEffect(() => {
        async function populateComments()
        {
            const url = `http://localhost:3001/api/comments/${props.recipe.id}`;
            const result = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            let coms = await result.json();
            setComments(coms);
        }
        populateComments();
    }, [props.recipe.id])

    async function sendComment() {
        const textarea = document.getElementById('CommentBox');

        if (textarea.value.trim())
        {
            // not null, undefined, or whitespacea
            // post to database
            const url = `http://localhost:3001/api/comments`;
            const body = {comment: textarea.value, recipeid: props.recipe.id}

            const result = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(body)
            });
            const comment = await result.json();

            // add comment
            setComments(prev => [comment, ...prev])

            // reset textarea
            textarea.value = '';
        }
    }

  return (
    <div className='CommentContainer'>
        <p>Comments</p>
        <textarea className='form-control' name="CommentBox" id="CommentBox" rows="10"></textarea>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}><button onClick={sendComment}>Send</button></div>
        {
            comments.map((comment) => {
                return <div className='Comment'>
                    <div className='CommentInfoContainer'>
                        <p><span>{comment.username}</span> @ {(new Date(comment.updatedAt)).toUTCString()}</p>
                    </div>
                    <div className='CommentContent'>
                        {comment.comment}
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default Comment