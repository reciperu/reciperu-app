import { useCallback, useState } from 'react';

type UseModal = () => {
  isVisible: boolean;
  toggleModal: () => void;
  closeModal: () => void;
  openModal: () => void;
};

export const useModal: UseModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  return { isVisible: isModalVisible, toggleModal, openModal, closeModal };
};
