import { formatTime } from 'c/util';

describe('formatTime()', () => {

  it('formats values under 60 without colon', () => {
    expect(formatTime(1)).toBe('1');
    expect(formatTime(37)).toBe('37');
    expect(formatTime(59)).toBe('59');
  });

  it('formats values over 60 with `minutes` colon `seconds`, with leading zero if needed', () => {
    expect(formatTime(61)).toBe('1:01');
    expect(formatTime(137)).toBe('2:17');
    expect(formatTime(900)).toBe('15:00');
  });

});
