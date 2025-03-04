const e=`import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RedirectProps {
  to: string;
}

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return <></>;
};
`;export{e as default};
