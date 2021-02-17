import { renderHook, act } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import useTracksData from './useTracksData';

const tracks = [
  { trackId: 1 }, { trackId: 2 }, { trackId: 3 }, { trackId: 4 }
];
const trackIdParam = 3;

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <Router history={historyMock}>{children}</Router>;

test('returns selectedTrackData amongst oher track data', () => {
  const { result: { current: tracksData } } = renderHook(
    () => useTracksData(tracks, trackIdParam),
    { wrapper: Wrapper }
  );

  expect(tracksData.selectedTrack).toMatchObject(tracks[2]);
});

test('returns methods that skip to next/previous tracks', () => {
  const { result: { current: tracksData } } = renderHook(
    () => useTracksData(tracks, trackIdParam),
    { wrapper: Wrapper }
  );

  act(() => { tracksData.onClickNext(); });

  expect(historyMock.push).toHaveBeenCalledWith('/track/4');

  act(() => { tracksData.onClickPrevious(); });

  expect(historyMock.push).toHaveBeenCalledWith('/track/2');
});
