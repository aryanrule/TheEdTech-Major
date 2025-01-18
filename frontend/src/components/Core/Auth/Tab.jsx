import React from 'react'

const Tab = (props) => { 
  const tab_data = props.tab_data;
  const setField = props.setField;
  const field = props.field;
  
  return (
    <div>
        {
            tab_data.map((tab) => (
            <button 
                key = {tab.id}
                onClick={(e)=>{setField(tab?.tabName)}}>
                {tab?.tabName}
            </button>
           ))
        }
    </div>
  )
}

export default Tab