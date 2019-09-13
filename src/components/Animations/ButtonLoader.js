import React from 'react'
import Lottie from 'react-lottie';

export default class ButtonLoader extends React.Component {

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require('./button-loader.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Lottie
        options={defaultOptions}
        height={30}
        width={30}
        resizeMode="cover"
      />

    )
  }
}
