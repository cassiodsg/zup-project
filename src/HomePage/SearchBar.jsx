import React from 'react'
 
const SearchBar = props => {
  return(
    <div className="mb-5">
      <input className="searchBar form-control mr-sm-2" type="text" placeholder="Search Name" onChange={props.searchFunc}/>
    </div>
  )
}
 
export {SearchBar}