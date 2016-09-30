import { expect } from 'chai';
import users from './users';
import initialState from './initialState';
import { USERS_SUCCESS } from './../constants/actionTypes';

const db = require('./../data/db.json');

describe('User reducer',() => {
  it('should return the initialState', () => {
    expect(users(undefined, {})).to.deep.equal(initialState.users);
  });

  it('should handle USERS_SUCCESS', () => {
    expect(
      users([], {
        type: USERS_SUCCESS,
        users: db.users
      })
    ).to.deep.equal({
      isFetching: false,
      errorMessage: '',
      meta: {
        total: db.users.meta.total,
        pageSize: db.users.meta.pageSize,
        pageNum: db.users.meta.pageNum
      },
      data: db.users.data.list
    });
  });
});
