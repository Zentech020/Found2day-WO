import React from 'react';
import ContentLoader from "react-content-loader"

const Block = ({width, height}) => (
  <ContentLoader
    height={300}
    width={600}
    speed={2}
    primaryColor="#d5d5d5"
    secondaryColor="#f2f9ff"
  >
    <rect x="-8" y="-1" rx="5" ry="5" width={width} height={height} />
  </ContentLoader>
)

export default Block;
