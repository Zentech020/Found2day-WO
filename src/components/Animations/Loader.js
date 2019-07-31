import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from './loader.json'

export default class Loader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require('./loader.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Lottie options={defaultOptions}
              height={200}
              width={200}
            />

    )
  }
}
