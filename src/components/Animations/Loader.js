import React from 'react'
import Lottie from 'react-lottie';

export default class Loader extends React.Component {

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require('./loader.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
      />

    )
  }
}
