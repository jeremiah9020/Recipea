import React from 'react'

import './TagItem.scss';

function TagItem(props) {
  function onChange(event) {
    props.setTagValues(prev => {
      let arr = [...prev];
      arr[props.listId] = event.target.value;
      return arr;
    })
  }

  return (
    <div className="TagItem">
        <input type="text" list="tag-values" name="tag1" className="tag-item" placeholder="#tag" onChange={onChange}/>
    </div>
  )
}

export default TagItem