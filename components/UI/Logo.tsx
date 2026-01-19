import React from 'react';
import logoUrl from '../../images/logo.png';

export const Logo: React.FC<{ className?: string; alt?: string }> = ({ className, alt = 'Cyber Safety Alliance' }) => {
  return <img src={logoUrl} alt={alt} className={className} />;
};
