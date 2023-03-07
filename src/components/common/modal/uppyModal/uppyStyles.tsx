import styled from 'styled-components';

import Creatable from 'react-select/creatable';

export const Modal = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 750px;
  background-color: white;
  /* transform: translateY(-100px); */
`;

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
