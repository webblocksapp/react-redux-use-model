import { isNullish } from '.';

describe('isNullish', () => {
  it('CASE-1', () => {
    expect(isNullish(undefined)).toBe(true);
  });

  it('CASE-2', () => {
    expect(isNullish(null)).toBe(true);
  });

  it('CASE-3', () => {
    expect(isNullish(0)).toBe(false);
  });

  it('CASE-4', () => {
    expect(isNullish('')).toBe(false);
  });
});
