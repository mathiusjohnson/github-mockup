import repos from './repoSlice';

describe('repos reducer', () => {
  it('should handle initial state', () => {
    expect(repos(undefined, {})).toEqual({
      currentRepo: {},
      entities: {},
      error: null,
      ids: [],
      status: 'idle',
    });
  });
});
