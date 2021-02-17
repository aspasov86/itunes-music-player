import {
  getLargerImageSrc,
  isValidTimeValue,
  constructDuration,
  constructReleaseDate
} from './helpers';

test('get larger image source', () => {
  const size = 290;
  const res = getLargerImageSrc('/test/100x100bb.jpg', size);
  expect(res).toEqual(`/test/${size}x${size}bb.jpg`);
});

test('checks for time value validity', () => {
  const invalidValue = undefined;
  let res = isValidTimeValue(invalidValue);
  expect(res).toBe(false);

  const miliseconds = 254891;
  (res = isValidTimeValue(miliseconds));
  expect(res).toBe(true);
});

test('constructs the track duration format', () => {
  const res = constructDuration(254891);
  expect(res).toBe('04:14');
});

test('constructs the album release date format', () => {
  const res = constructReleaseDate('2012-11-01T12:00:00');
  expect(res).toBe('November 01, 2012');
});
