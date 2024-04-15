import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import moduleCss from './imageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={moduleCss.gallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        onImageClick={() => onImageClick(largeImageURL)}
      />
    ))}
  </ul>
);

export default ImageGallery;
