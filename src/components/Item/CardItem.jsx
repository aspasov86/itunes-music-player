import PropTypes from 'prop-types';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import InfoLine from '../InfoLine/InfoLine';
import { getLargerImageSrc } from '../../utlis/helpers';
import styles from './CardItem.module.scss';

const CardItem = ({ track, itemClickHandler }) => (
  <Card
    onClick={itemClickHandler(track.trackId)}
    className={styles.card}
    data-testid="card"
  >
    <Image src={getLargerImageSrc(track.artworkUrl100, 290)} className={styles.image} alt="cover" />
    <Card.Content>
      <Card.Header className={styles.name}>
        <InfoLine info={track.trackName} contentOnly />
      </Card.Header>
      <Card.Meta>
        <InfoLine info={track.collectionName} contentOnly />
      </Card.Meta>
      <Card.Header className={styles.artist}>
        <InfoLine info={track.artistName} contentOnly />
      </Card.Header>
      <Card.Description>
        <InfoLine info={track.primaryGenreName} htmlTag="span" />
        {' '}
        &#9733;
        {' '}
        <InfoLine info={track.releaseDate} htmlTag="span" type="date" />
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <InfoLine
        info={track.trackTimeMillis}
        type="duration"
        className={styles.left}
      />
      <InfoLine info={track.trackPrice} type="price" className={styles.right} />
    </Card.Content>
  </Card>
);

CardItem.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackTimeMillis: PropTypes.number,
    trackPrice: PropTypes.number
  }).isRequired,
  itemClickHandler: PropTypes.func.isRequired
};

export default CardItem;
