import { Component } from 'react';
import { Rings } from 'react-loader-spinner';
import moduleCss from './loader.module.css';

class Loader extends Component {
  render() {
    return (
      <Rings
        visible={true}
        ariaLabel="rings-loading"
        color="#3f51b5"
        height={150}
        width={150}
        wrapperClass={moduleCss.loader}
      />
    );
  }
}

export default Loader;
