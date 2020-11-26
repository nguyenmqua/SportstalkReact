import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm({users, search, handleInputChange, handleFormSubmit}) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="user">Search Member UserName</label>
        <input
          value={search}
          onChange={handleInputChange}
          name="user"
          list="users"
          type="text"
          className="form-control"
          placeholder="Search User"
          id="user"
        />
        <datalist id="users">
          {users.map(user => (
            <option value={user.username} key={user.username} />
          ))}
        </datalist>
      </div>
    </form>
  );
}

export default SearchForm;
