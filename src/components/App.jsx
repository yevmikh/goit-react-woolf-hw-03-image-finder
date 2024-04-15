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

    if (
      this.state.images.length === this.state.totalHits &&
      this.state.images.length > 0 &&
      prevState.loading &&
      !this.state.loading
    ) {
      toast.info('No more images to load.');
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalHits: 0,
      loadMore: false,
    });
  };

  loadImages = async () => {
    this.setState({ loading: true });
    try {
      const { query, page } = this.state;
      const { hits, totalHits } = await fetchImages(query, page);
      if (hits.length === 0) {
        toast.info(`No images found with name ${query} Try another search`);
        this.setState({ loading: false, loadMore: false });
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits,
      }));
    } catch (error) {
      this.setState({ loading: false });
      toast.error('There was a problem with the request.');
    } finally {
      this.setState({ loading: false });
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
    const { images, loading, showModal, largeImageURL, totalHits } = this.state;
    const loadMore = images.length > 0 && images.length < totalHits;
    return (
      <div>
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          currentQuery={this.state.query}
        />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {loadMore && <Button onClick={this.handleLoadMore}>Load more</Button>}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
