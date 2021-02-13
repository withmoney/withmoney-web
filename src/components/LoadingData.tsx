import React from 'react';
import ContentLoader from 'react-content-loader';

type Props = {
  repeat?: number;
  size?: string;
};

const LoadingData = ({ repeat = 1, size }: Props) => {
  const loadData = [];
  for (let i = 0; i < repeat; ++i) {
    loadData.push(i);
  }
  return (
    <div>
      {loadData.map((repeatLoad) => {
        return (
          <ContentLoader
            key={repeatLoad}
            speed={2}
            width={size ? size : '100%'}
            height={size ? size : '40'}
            backgroundColor="#f3f3f3"
            foregroundColor="#c0c0c0"
            style={{ marginBottom: '5px' }}
          >
            <rect
              x="0"
              y="0"
              rx="3"
              ry="3"
              width={size ? size : '100%'}
              height={size ? size : '40'}
            />
          </ContentLoader>
        );
      })}
    </div>
  );
};

export default LoadingData;
