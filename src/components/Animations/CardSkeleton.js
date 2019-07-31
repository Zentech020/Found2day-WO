import React from 'react';
import ContentLoader from "react-content-loader"

const CardSkeleton = props => (
  <ContentLoader
    height={300}
    width={1000}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    className="mt-4"
    {...props}
  >
<rect x="0" y="0" rx="3" ry="3" width="330" height="333" />
<rect x="360" y="0" rx="3" ry="3" width="330" height="333" />
<rect x="720" y="0" rx="3" ry="3" width="330" height="333" />

  </ContentLoader>
)

export default CardSkeleton;
