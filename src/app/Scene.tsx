import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Scene: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default Scene;
