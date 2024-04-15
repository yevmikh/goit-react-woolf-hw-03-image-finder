import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from '../api/imagesApi/imagesGet';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    showModal: false,
    largeImageURL: '',
    loadMore: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.loadImages();
    }
  }

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [], totalHits: 0 });
  };

  loadImages = async () => {
    this.setState({ loading: true });
    try {
      const { query, page } = this.state;
      const { hits, totalHits } = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loading: false,
        loadMore: page < Math.ceil(totalHits / 12),
        totalHits,
      }));
      if (hits.length === 0) {
        toast.info('There are no more pictures.');
      }
    } catch (error) {
      this.setState({ loading: false });
      toast.error('There was a problem with the request.');
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, loading, loadMore, showModal, largeImageURL } = this.state;
    return (
      <div>
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          currentQuery={this.state.query}
        />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {loadMore && <Button onClick={this.handleLoadMore}>Load more</Button>}
        {!loadMore &&
          images.length > 0 &&
          toast.info('No more images to load.')}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
