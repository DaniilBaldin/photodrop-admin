import styled from 'styled-components';

import Creatable from 'react-select/creatable';

export const Input = styled(Creatable)`
  margin: 10px;
  width: 400px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const CopyButton = styled.button`
  border: none;
  margin: 0px;
  width: 150px;
  height: 40px;
  border-radius: 20px;
  color: white;
  background-color: navy;
  font-size: 16px;
  font-weight: 600;
  margin-left: auto;
  margin-right: 20px;
`;

export const P = styled.p`
  margin-left: 20px;
  font-size: 1rem;
  font-weight: 500;
  color: navy;
`;
