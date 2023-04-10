import React from 'react'

function StepItem(props) {
  function onChange(event) {
    props.setStepValues(prev => {
      let arr = [...prev];
      arr[props.listId] = event.target.value;
      return arr;
    })
  }

  return (
    <div className="StepItem">
        <input type="text" placeholder='enter step' onChange={onChange} />
    </div>
  )
}

export default StepItem