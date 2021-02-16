import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import CoverImage from '../components/CoverImage/CoverImage';
import FadeIn from '../components/FadeIn/FadeIn';
import Details from '../components/Details/Details';
import ShareButton from '../components/ShareButton/ShareButton';
import useTracksData from '../hooks/tracksData/useTracksData';
import Layout from '../components/Layout/Layout';
import 'react-h5-audio-player/lib/styles.css';
import styles from './Track.module.scss';

const Track = ({ match }) => {
  const tracks = useSelector(store => store.tracks);
  const {
    selectedTrack, onClickNext, onClickPrevious, goBack
  } = useTracksData(tracks, match.params.trackId);
  return (
    <FadeIn>
      <Layout className={styles.trackPage}>
        <div className={styles.topLine}>
          <Button
            onClick={goBack}
            basic
            content="Back to Search"
            icon={<Icon name="play" flipped="horizontally" />}
            labelPosition="left"
            size="tiny"
          />
          <ShareButton trackViewUrl={selectedTrack.trackViewUrl} />
        </div>
        <div className={styles.content}>
          <div className={styles.playerWrap}>
            <AudioPlayer
              header={<CoverImage src={selectedTrack.artworkUrl100} size={250} />}
              src={selectedTrack.previewUrl}
              volume={0.2}
              showSkipControls
              onClickPrevious={onClickPrevious}
              onClickNext={onClickNext}
              showJumpControls={false}
              customAdditionalControls={[]}
              crossOrigin="anonymous"
            />
          </div>
          <Details track={selectedTrack} />
        </div>
      </Layout>
    </FadeIn>
  );
};

Track.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ trackId: PropTypes.string })
  }).isRequired
};

export default Track;
