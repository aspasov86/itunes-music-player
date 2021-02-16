import { useMemo } from 'react';
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
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';
import styles from './ShareButton.module.scss';

const ShareButton = ({ trackViewUrl }) => {
  const { isLaptopDevice, isDesktopDevice } = useScreenWidth();

  const shareBtnsSize = useMemo(() => ((isLaptopDevice || isDesktopDevice) ? 40 : 35), [isLaptopDevice, isDesktopDevice]);

  const shareButtons = (
    <div className={styles.shareBtns}>
      <FacebookShareButton url={trackViewUrl}>
        <FacebookIcon size={shareBtnsSize} />
      </FacebookShareButton>
      <LinkedinShareButton url={trackViewUrl}>
        <LinkedinIcon size={shareBtnsSize} />
      </LinkedinShareButton>
      <TwitterShareButton url={trackViewUrl}>
        <TwitterIcon size={shareBtnsSize} />
      </TwitterShareButton>
    </div>
  );

  return !(isLaptopDevice || isDesktopDevice) ? (
    <Popup
      on="click"
      hoverable
      position="bottom right"
      trigger={<Button content="Share" className={styles.share} />}
      closeOnPortalMouseLeave={false}
      content={shareButtons}
    />
  ) : shareButtons;
};

ShareButton.defaultProps = { trackViewUrl: '' };

ShareButton.propTypes = { trackViewUrl: PropTypes.string };

export default ShareButton;
