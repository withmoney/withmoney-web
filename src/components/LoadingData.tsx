import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingData = () => {
  return (
    <div>
      <ContentLoader
        speed={2}
        width="100%"
        height={40}
        backgroundColor="#f3f3f3"
        foregroundColor="#c0c0c0"
      >
        <rect x="0" y="0" rx="3" ry="3" width="100%" height="40" />
      </ContentLoader>
    </div>
  );
};

export default LoadingData;
