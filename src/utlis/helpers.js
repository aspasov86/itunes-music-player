import moment from 'moment';

export const getLargerImageSrc = (src, size) => {
  const splitSrc = src.split('/');
  splitSrc[splitSrc.length - 1] = `${size}x${size}bb.jpg`;
  return splitSrc.join('/');
};

const isValidTimeValue = timeValue => timeValue !== undefined && moment(timeValue).isValid();

export const constructDuration = (trackTimeMillis) => {
  if (isValidTimeValue(trackTimeMillis)) {
    const durationObj = moment.duration(trackTimeMillis);
    const duration = [Math.floor(durationObj.asMinutes()), durationObj.seconds()]
      .map(num => (num < 10 ? `0${num}` : num))
      .join(':');
    return duration;
  }
  return null;
};

export const constructReleaseDate = releaseDate => (isValidTimeValue(releaseDate)
  ? moment(releaseDate).format('MMMM DD, YYYY')
  : null);
