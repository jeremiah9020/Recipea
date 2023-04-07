import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

// stylesheets
import './CreateRecipe.scss';

function CreateRecipe() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    async function postRecipe(data)
    {
        let url = 'http://localhost:3001/api/recipe';

        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });

        return response.json();
    }

    // can make bold, italic, or underline text - ctrl + b, ctrl + i, ctrl + u
    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    // called by the bold button
    const _onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    } 

    const _addRow = ()=>
    {
        let row = document.getElementById("measurements")
        let r = row.insertRow()
        let i = r.insertCell(0)
        let j = r.insertCell(1)
        
        let f = r.insertCell(2)
        i.innerHTML = "Ingredient"
        j.innerHTML = "Measurement"
        f.innerHTML = document.getElementById("measurements").rows.length
        i.contentEditable = true
        j.contentEditable = true
        // https://www.w3schools.com/jsref/met_table_insertrow.asp
        // https://www.w3schools.com/jsref/coll_table_rows.asp
        //Documents
    }

    const _removeRow = ()=>
    {
        let row = document.getElementById("Rows").value
        if (row <= document.getElementById("measurements").rows.length)
        {
            let y = document.getElementById("measurements")
            y.deleteRow(row - 1)
        }
        else
        {
            //Tell the user that this isn't an authorized thing   
        }
    }

    function addTag()
    {
        const tag_container = document.querySelector('.tag-container');
        const tag_border = document.createElement('div');
        tag_border.classList.add('tag');
        const tag = document.createElement('p');
        tag.innerText = '#tag';
        tag_border.appendChild(tag);
        tag_container.appendChild(tag_border);
    }

    return (
            <div class="container">
            {/* <!-- user can upload image --> */}
            <div class="image-container">
                <svg class="upload-img" width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M91 78.65L25.35 13H91V78.65ZM85.8 97.9333L78.8667 91H13V25.1333L6.06665 18.2L12.1333 12.1333L91.8667 91.8666L85.8 97.9333ZM26 73.6666H61.425L52.325 64.5666L48.75 69.3333L39 56.3333L26 73.6666Z" fill="black"/>
                </svg>    
                <p class="upload-text bold">upload</p>
                <input type="file" name="photo" id="photo"></input>
            </div>
            {/* <!-- user can change title and select time --> */}
            <div class="title-time-container">
            <input type="text" placeholder='title'></input>

                <div class="time-container">
                    <svg class="clock" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.0834 25.3645L31.7709 30.052C32.1529 30.434 32.3438 30.9118 32.3438 31.4854C32.3438 32.059 32.1529 32.5534 31.7709 32.9687C31.3542 33.3854 30.8591 33.5937 30.2855 33.5937C29.7119 33.5937 29.2174 33.3854 28.8022 32.9687L24.3751 28.5416C23.889 28.0555 23.5244 27.5173 23.2813 26.927C23.0383 26.3368 22.9167 25.6944 22.9167 25V18.75C22.9167 18.1597 23.1167 17.6645 23.5168 17.2645C23.9167 16.8645 24.4112 16.6652 25.0001 16.6666C25.5904 16.6666 26.0855 16.8666 26.4855 17.2666C26.8855 17.6666 27.0848 18.1611 27.0834 18.75V25.3645ZM25.0001 8.33329C25.5904 8.33329 26.0855 8.53329 26.4855 8.93329C26.8855 9.33329 27.0848 9.82774 27.0834 10.4166C27.0834 11.0069 26.8834 11.502 26.4834 11.902C26.0834 12.302 25.589 12.5013 25.0001 12.5C24.4098 12.5 23.9147 12.3 23.5147 11.9C23.1147 11.5 22.9154 11.0055 22.9167 10.4166C22.9167 9.82635 23.1167 9.33121 23.5168 8.93121C23.9167 8.53121 24.4112 8.3319 25.0001 8.33329ZM41.6668 25C41.6668 25.5902 41.4668 26.0854 41.0667 26.4854C40.6668 26.8854 40.1723 27.0847 39.5834 27.0833C38.9931 27.0833 38.498 26.8833 38.098 26.4833C37.698 26.0833 37.4987 25.5889 37.5001 25C37.5001 24.4097 37.7001 23.9145 38.1001 23.5145C38.5001 23.1145 38.9945 22.9152 39.5834 22.9166C40.1737 22.9166 40.6688 23.1166 41.0688 23.5166C41.4688 23.9166 41.6681 24.4111 41.6668 25ZM25.0001 37.5C25.5904 37.5 26.0855 37.7 26.4855 38.1C26.8855 38.5 27.0848 38.9944 27.0834 39.5833C27.0834 40.1736 26.8834 40.6687 26.4834 41.0687C26.0834 41.4687 25.589 41.668 25.0001 41.6666C24.4098 41.6666 23.9147 41.4666 23.5147 41.0666C23.1147 40.6666 22.9154 40.1722 22.9167 39.5833C22.9167 38.993 23.1167 38.4979 23.5168 38.0979C23.9167 37.6979 24.4112 37.4986 25.0001 37.5ZM12.5001 25C12.5001 25.5902 12.3001 26.0854 11.9001 26.4854C11.5001 26.8854 11.0056 27.0847 10.4167 27.0833C9.82647 27.0833 9.33133 26.8833 8.93133 26.4833C8.53133 26.0833 8.33203 25.5889 8.33342 25C8.33342 24.4097 8.53342 23.9145 8.93342 23.5145C9.33342 23.1145 9.82786 22.9152 10.4167 22.9166C11.007 22.9166 11.5022 23.1166 11.9022 23.5166C12.3022 23.9166 12.5015 24.4111 12.5001 25ZM25.0001 45.8333C22.1181 45.8333 19.4098 45.2861 16.8751 44.1916C14.3404 43.0972 12.1355 41.6132 10.2605 39.7395C8.3855 37.8645 6.90147 35.6597 5.80842 33.125C4.71536 30.5902 4.16814 27.8819 4.16675 25C4.16675 22.118 4.71397 19.4097 5.80842 16.875C6.90286 14.3402 8.38689 12.1354 10.2605 10.2604C12.1355 8.38538 14.3404 6.90135 16.8751 5.80829C19.4098 4.71524 22.1181 4.16801 25.0001 4.16663C27.882 4.16663 30.5904 4.71385 33.1251 5.80829C35.6598 6.90274 37.8647 8.38677 39.7397 10.2604C41.6147 12.1354 43.0994 14.3402 44.1938 16.875C45.2883 19.4097 45.8348 22.118 45.8334 25C45.8334 27.8819 45.2862 30.5902 44.1917 33.125C43.0973 35.6597 41.6133 37.8645 39.7397 39.7395C37.8647 41.6145 35.6598 43.0993 33.1251 44.1937C30.5904 45.2882 27.882 45.8347 25.0001 45.8333ZM25.0001 41.6666C29.6529 41.6666 33.5938 40.052 36.823 36.8229C40.0522 33.5937 41.6668 29.6527 41.6668 25C41.6668 20.3472 40.0522 16.4062 36.823 13.177C33.5938 9.94788 29.6529 8.33329 25.0001 8.33329C20.3473 8.33329 16.4063 9.94788 13.1772 13.177C9.948 16.4062 8.33342 20.3472 8.33342 25C8.33342 29.6527 9.948 33.5937 13.1772 36.8229C16.4063 40.052 20.3473 41.6666 25.0001 41.6666Z" fill="black"/>
                    </svg>
                    <p class="time bold">time <input type="number" min="0" class="time bold" placeholder="minutes" name="time" id="time"></input></p>
                </div>
            </div>

            {/* <!-- user enters tags --> */}
            <div class="tag-container">
                <datalist id="tag-values">
                    <option value="budget"/>
                    <option value="vegan"/>
                    <option value="vegetarian"/>
                    <option value="gluten free"/>
                    <option value="fast"/>
                    <option value="sweet"/>
                    <option value="sour"/>
                </datalist>
                <input list="tag-values" name="tags"/>
                <button class="tag-button" onClick={addTag}>
                    <svg class="add-tag" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3333 28.3334H21.6666V21.6667H28.3333V18.3334H21.6666V11.6667H18.3333V18.3334H11.6666V21.6667H18.3333V28.3334ZM19.9999 36.6667C17.6944 36.6667 15.5277 36.2289 13.4999 35.3534C11.4721 34.4778 9.70825 33.2906 8.20825 31.7917C6.70825 30.2917 5.52103 28.5278 4.64659 26.5C3.77214 24.4723 3.33436 22.3056 3.33325 20C3.33325 17.6945 3.77103 15.5278 4.64659 13.5C5.52214 11.4723 6.70936 9.70837 8.20825 8.20837C9.70825 6.70837 11.4721 5.52115 13.4999 4.64671C15.5277 3.77226 17.6944 3.33449 19.9999 3.33337C22.3055 3.33337 24.4721 3.77115 26.4999 4.64671C28.5277 5.52226 30.2916 6.70949 31.7916 8.20837C33.2916 9.70837 34.4794 11.4723 35.3549 13.5C36.2305 15.5278 36.6677 17.6945 36.6666 20C36.6666 22.3056 36.2288 24.4723 35.3533 26.5C34.4777 28.5278 33.2905 30.2917 31.7916 31.7917C30.2916 33.2917 28.5277 34.4795 26.4999 35.355C24.4721 36.2306 22.3055 36.6678 19.9999 36.6667ZM19.9999 33.3334C23.7221 33.3334 26.8749 32.0417 29.4583 29.4584C32.0416 26.875 33.3333 23.7223 33.3333 20C33.3333 16.2778 32.0416 13.125 29.4583 10.5417C26.8749 7.95837 23.7221 6.66671 19.9999 6.66671C16.2777 6.66671 13.1249 7.95837 10.5416 10.5417C7.95825 13.125 6.66659 16.2778 6.66659 20C6.66659 23.7223 7.95825 26.875 10.5416 29.4584C13.1249 32.0417 16.2777 33.3334 19.9999 33.3334Z" fill="#387285"/>
                    </svg>
                </button>
            
                {/* <!-- <p class="add-tag">+</p> --> */}
                <div class="tag">
                    <p>#tag</p>
                </div>
            </div>

            {/* <!-- create two columns --> */}
            <div class="ingredient-description-container">
                {/* <!-- ingredient list --> */}
                <div class="ingredient-container">
                    <p class="bold">ingredients</p>
                    <div class="ingredient-item">
                        <table name="measurements" id="measurements">
                            <th class="ingredient">
                                ingredient
                            </th>
                            <th class="measurement">
                                measurement
                            </th>
                            <th class="measurement">
                                Row
                            </th>
                        </table>
                    </div>
                    <div>
                        <button onClick={_addRow} class="add-row">
                    <svg class="add-tag" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3333 28.3334H21.6666V21.6667H28.3333V18.3334H21.6666V11.6667H18.3333V18.3334H11.6666V21.6667H18.3333V28.3334ZM19.9999 36.6667C17.6944 36.6667 15.5277 36.2289 13.4999 35.3534C11.4721 34.4778 9.70825 33.2906 8.20825 31.7917C6.70825 30.2917 5.52103 28.5278 4.64659 26.5C3.77214 24.4723 3.33436 22.3056 3.33325 20C3.33325 17.6945 3.77103 15.5278 4.64659 13.5C5.52214 11.4723 6.70936 9.70837 8.20825 8.20837C9.70825 6.70837 11.4721 5.52115 13.4999 4.64671C15.5277 3.77226 17.6944 3.33449 19.9999 3.33337C22.3055 3.33337 24.4721 3.77115 26.4999 4.64671C28.5277 5.52226 30.2916 6.70949 31.7916 8.20837C33.2916 9.70837 34.4794 11.4723 35.3549 13.5C36.2305 15.5278 36.6677 17.6945 36.6666 20C36.6666 22.3056 36.2288 24.4723 35.3533 26.5C34.4777 28.5278 33.2905 30.2917 31.7916 31.7917C30.2916 33.2917 28.5277 34.4795 26.4999 35.355C24.4721 36.2306 22.3055 36.6678 19.9999 36.6667ZM19.9999 33.3334C23.7221 33.3334 26.8749 32.0417 29.4583 29.4584C32.0416 26.875 33.3333 23.7223 33.3333 20C33.3333 16.2778 32.0416 13.125 29.4583 10.5417C26.8749 7.95837 23.7221 6.66671 19.9999 6.66671C16.2777 6.66671 13.1249 7.95837 10.5416 10.5417C7.95825 13.125 6.66659 16.2778 6.66659 20C6.66659 23.7223 7.95825 26.875 10.5416 29.4584C13.1249 32.0417 16.2777 33.3334 19.9999 33.3334Z" fill="#387285"/>
                    </svg>   
                        </button>
                        <div>
                            <input type="number" min="0" max="100" class="remove-row" placeholder='What Row?' name="Rows" id="Rows"></input>
                            <button onClick={_removeRow} class="remove-row" name="Whatrow" id="Whatrow">remove row</button>
                        </div>
                    </div>
            </div>

                {/* <!-- description --> */}
                <div class="description-container">
                    <p class="description bold">description</p>
                    <p class="description-placeholder"></p>
                    <button onClick={_onBoldClick}>BOLD</button>
                    <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={setEditorState} />
                </div>
            </div>

            <hr/>

            {/* <!-- add directions for the recipe --> */}
            <div class="steps-container">
                <p class="steps bold">steps</p>
                <p class="step"></p>
            </div>

            {/* <!-- save (s), cancel (c), or post (p) the recipe --> */}
            <div class="footer">
                <div class="scp-container">
                    <button class="save bold" onClick={postRecipe}>save</button>
                    <p class="cancel bold">cancel</p>
                    <p class="post bold">post</p>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipe