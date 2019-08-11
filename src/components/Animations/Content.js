import React from 'react';
import ContentLoader from "react-content-loader"

const Content = () => (
    <ContentLoader
      height={160}
      width={600}
      speed={2}
      primaryColor="#d5d5d5"
      secondaryColor="#f2f9ff"
    >
      <rect x="3" y="2" rx="0" ry="0" width="388" height="27" />
      <rect x="4" y="54" rx="0" ry="0" width="329" height="13" />
      <rect x="198" y="59" rx="0" ry="0" width="17" height="0" />
      <rect x="4" y="77" rx="0" ry="0" width="280" height="11" />
      <rect x="4" y="97" rx="0" ry="0" width="322" height="13" />
    </ContentLoader>
)

export default Content;
