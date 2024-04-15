import React, { Component } from 'react';
import { Rings } from 'react-loader-spinner';
import moduleCss from './modal.module.css';

class Modal extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleImageLoaded = () => {
    this.setState({ loading: false });
  };

  handleImageError = () => {
    this.setState({ loading: false });
    alert('Failed to load the image.');
  };

  render() {
    const { largeImageURL } = this.props;
    const { loading } = this.state;
    return (
      <div className={moduleCss.overlay} onClick={this.handleOverlayClick}>
        <div className={moduleCss.modal}>
          {loading && (
            <Rings
              visible={true}
              ariaLabel="loading"
              color="#3f51b5"
              height={80}
              width={80}
            />
          )}
          <img
            src={largeImageURL}
            alt="Modal"
            onLoad={this.handleImageLoaded}
            onError={this.handleImageError}
            style={{ visibility: loading ? 'hidden' : 'visible' }}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
