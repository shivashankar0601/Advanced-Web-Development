import { FilledInput, FormControl, InputAdornment } from "@mui/material";
import React from "react";

const Search = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const searchChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <FormControl fullWidth hiddenLabel onSubmit={handleSubmit}>
      <FilledInput
        fullWidth
        sx={{
          backgroundColor: "#40c4ff",
          display: "flex",
          alignItems: "center",
        }}
        name="search"
        onChange={searchChangeHandler}
        disableUnderline
        placeholder="Search user"
        startAdornment={<InputAdornment position="start" />}
      />
    </FormControl>
  );
};

export default Search;
