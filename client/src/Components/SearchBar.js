// SearchBar.js
import React from "react";
import { Divider, Input } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        mx="auto" // Center the search bar
        w="50%" // Set the width to 50%
        rounded="full"
        borderColor="teal"
        _focus={{ borderColor: "#3182CE", boxShadow: "0 0 0 2px #3182CE" }} // Add a subtle box shadow on focus
      />
    </div>
  );
};

export default SearchBar;
