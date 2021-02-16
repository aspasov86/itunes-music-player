import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';
import styles from './ShareButton.module.scss';

const ShareButton = ({ trackViewUrl }) => (
  <Popup
    on="click"
    hoverable
    position="bottom right"
    trigger={<Button content="Share" />}
    closeOnPortalMouseLeave={false}
    content={(
      <div className={styles.shareBtns}>
        <FacebookShareButton url={trackViewUrl}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
        <LinkedinShareButton url={trackViewUrl}>
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
        <TwitterShareButton url={trackViewUrl}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </div>
    )}
  />
);

ShareButton.defaultProps = { trackViewUrl: '' };

ShareButton.propTypes = { trackViewUrl: PropTypes.string };

export default ShareButton;
