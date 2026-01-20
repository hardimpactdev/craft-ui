import { describe, it, expect } from 'vitest';
import { getInitials, useInitials } from '../useInitials';

describe('getInitials', () => {
  it('returns empty string for undefined', () => {
    expect(getInitials(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(getInitials('')).toBe('');
  });

  it('returns empty string for whitespace only', () => {
    expect(getInitials('   ')).toBe('');
  });

  it('returns single initial for single name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('returns first and last initials for two names', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('returns first and last initials for multiple names', () => {
    expect(getInitials('John Michael Doe')).toBe('JD');
    expect(getInitials('Mary Jane Watson Parker')).toBe('MP');
  });

  it('handles extra whitespace between names', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });

  it('uppercases lowercase names', () => {
    expect(getInitials('john doe')).toBe('JD');
  });

  it('handles mixed case names', () => {
    expect(getInitials('jOHN dOE')).toBe('JD');
  });
});

describe('useInitials', () => {
  it('returns an object with getInitials function', () => {
    const result = useInitials();
    expect(result).toHaveProperty('getInitials');
    expect(typeof result.getInitials).toBe('function');
  });

  it('getInitials from composable works correctly', () => {
    const { getInitials: getInit } = useInitials();
    expect(getInit('Jane Smith')).toBe('JS');
  });
});
