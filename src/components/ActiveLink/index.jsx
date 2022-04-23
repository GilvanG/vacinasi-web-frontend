/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { cloneElement } from 'react';
import { useLocation, Link } from 'react-router-dom';

export function ActiveLink({
  children,
  ...rest
}) {
  const { pathname } = useLocation();
  let isActive = false;
  if (pathname === rest.href || pathname === rest.as) {
    isActive = true;
  }
  return (
    <Link to={rest.href} {...rest}>
      {cloneElement(children, { color: isActive ? 'green.500' : 'gray.50' })}
    </Link>
  );
}
