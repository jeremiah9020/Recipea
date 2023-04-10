import React from 'react'

function IngredientItem(props) {

  function onChange(event)
  {
    props.setIngredientValues(prev => {
      let arr = [...prev];
      arr[props.listId] = event.target.value;
      return arr;
    })
  }

  return (
    <div className="IngredientItem">
        <input type="text" placeholder='enter ingredient' onChange={onChange} />
    </div>
  )
}

export default IngredientItem