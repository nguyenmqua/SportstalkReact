import React from "react";


// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm({users, search, handleInputChange, handleInputClick}) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="user">Search Member UserName</label>
        <input
          value={search}
          onChange={handleInputChange}   
          name={"user"}
          list="users"
          type="text"
          className="form-control"
          placeholder="Search User"
          id="user"
        />
        <datalist id="users">
          {users.map(user => (
            <option value={user._id} key={user.username}>{user.username}</option>
          ))}
        </datalist>
        
      </div>
    </form>
  );
}

export default SearchForm;
