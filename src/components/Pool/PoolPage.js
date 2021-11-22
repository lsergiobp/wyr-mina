import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pool from './Pool';
import PoolResult from './PoolResult';
import { Redirect } from 'react-router-dom';

class PoolPage extends Component {
  render() {
    const { hasAnswered } = this.props;
    const { id, question } = this.props;

    if (!question) {
      return <Redirect to='/PageNotFound' />;
    }

    return <div>{hasAnswered ? <PoolResult id={id} /> : <Pool id={id} />}</div>;
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  var userAnswered = Object.keys(users[authedUser].answers);
  var hasAnswered = userAnswered.includes(id);
  console.log('mapStateToProps - hasAnswered', hasAnswered);

  return {
    id,
    authedUser,
    hasAnswered,
    question,
  };
}

export default connect(mapStateToProps)(PoolPage);
