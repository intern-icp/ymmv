import React, { Component } from 'react';
import CreateOrUpdateDoc from './CreateOrUpdateDoc';

class Search extends Component {
  render() {
    return (
      <CreateOrUpdateDoc docType="Product" isNew/>
    );
  }
}

export default Search;