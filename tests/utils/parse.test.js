import { mountQuery } from '../../src/utils/parse';

describe('Utils parse', () => {
  describe('mountQuery', () => {
    it('should parse url if query is empty', () => {
      const url = 'http://domain/endpoint';

      expect(mountQuery(url)).toBe(url);
    });

    it('should parse url if query is not empty', () => {
      const url = 'http://domain/endpoint';
      const query = {
        page: 1,
        name: 'David',
      };

      expect(mountQuery(url, query)).toBe(`${url}?page=1&name=David`);
    });
  });
});
