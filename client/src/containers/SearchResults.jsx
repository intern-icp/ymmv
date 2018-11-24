import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import { Result } from '../components';

class SearchResults extends Component {
  render() {
    if (!this.props.searchResults) return <h1>No results</h1>;
    return (
      <Col>
        { this.props.searchResults.map(product => {
          return <Result product={product}/>
        })}
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.products.searchResults,
  }
}

export default connect(mapStateToProps)(SearchResults);