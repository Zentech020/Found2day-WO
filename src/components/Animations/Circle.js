import React from 'react';
import ContentLoader from "react-content-loader"

const Circle = () => (
  <ContentLoader
    height={70}
    width={125}
    speed={2}
    primaryColor="#d5d5d5"
    secondaryColor="#f2f9ff"
  >
    <circle cx="65" cy="38" r="30" />
  </ContentLoader>
)

export default Circle;
