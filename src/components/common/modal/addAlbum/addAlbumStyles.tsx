import styled from 'styled-components';

export const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  pointer-events: ${(props) => (props.show ? 'all' : 'none')};
`;

export const ModalContent = styled.div`
  width: 400px;
  /* height: 380px; */
  background-color: white;
  /* display: block;
  position: absolute;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%); */
  border-radius: 20px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  border: none;
  margin: 10px;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  color: white;
  background-color: navy;
  font-size: 16px;
  font-weight: 600;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  font-weight: 600;
  font-size: 1rem;
  color: black;
`;

export const ModalInput = styled.input`
  margin: 10px;
  border-radius: 20px;
  height: 40px;
  border: 2px solid navy;
  width: 350px;
  padding: 10px;
  outline: none;

  &:focus {
    border-radius: 20px;
    border: 2px solid blue;
    outline: none;
  }
`;

export const ModalInputDate = styled.input`
  margin: 10px;
  border-radius: 20px;
  height: 40px;
  border: 2px solid navy;
  width: 350px;
  padding: 10px;
  outline: none;

  &:focus {
    border-radius: 20px;
    border: 2px solid blue;
    outline: none;
  }
`;
export const InfoMessage = styled.p`
  font-size: 10px;
  color: navy;
`;
