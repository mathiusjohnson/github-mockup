import languages from './languagesSlice';

describe('languages reducer', () => {
  it('should handle initial state', () => {
    expect(languages(undefined, {})).toEqual({
      entities: {},
      error: null,
      ids: [],
      status: 'idle',
    });
  });
});
