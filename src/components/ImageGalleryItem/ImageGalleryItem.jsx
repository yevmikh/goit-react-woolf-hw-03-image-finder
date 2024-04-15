import moduleCss from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, onImageClick }) => (
  <li className={moduleCss.galleryItem}>
    <img
      src={webformatURL}
      alt=""
      onClick={onImageClick}
      style={{ width: '100%', height: 'auto' }}
    />
  </li>
);

export default ImageGalleryItem;
