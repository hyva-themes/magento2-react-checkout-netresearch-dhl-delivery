import React, { useEffect, useRef, useState } from 'react';
import { node } from 'prop-types';

import {
  useDhlDeliveryDataContext,
  useDhlDeliveryFormContext,
} from '../../hooks';
import { LocationModalContext } from '../../context';
import { DHL_DELIVERY_FORM } from '../../../../../../config';

const searchZipField = `${DHL_DELIVERY_FORM}.searchZip`;
const searchCityField = `${DHL_DELIVERY_FORM}.searchCity`;
const searchStreetField = `${DHL_DELIVERY_FORM}.searchStreet`;
const searchCountryField = `${DHL_DELIVERY_FORM}.searchCountry`;

function LocationFinderModalWrapper({ children }) {
  const modalRef = useRef();
  const [modalId, setModalId] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { activateDhlSearch } = useDhlDeliveryDataContext();
  const { shippingAddressValues, setFieldValue } = useDhlDeliveryFormContext();

  // Side effect that deals with event registration on modal open/close action
  useEffect(() => {
    // Event handler that closes the modal on pressing `ESC` in keyboard.
    const keyDownHandler = (event) => {
      if (event.key === 'Esc' || event.key === 'Escape') {
        setIsModalActive(false);
      }
    };
    // Event handler that closes the modal when click outside of the modal
    const mouseDownHandler = (event) => {
      if (!modalRef.current) {
        return;
      }

      const agreementBoxDom = modalRef.current.querySelector(
        '#modal-locationfinder-content'
      );

      if (!agreementBoxDom.contains(event.target)) {
        setIsModalActive(false);
      }
    };

    // We only want to register events when we have the modal active.
    if (isModalActive) {
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('mousedown', mouseDownHandler);
    }

    // Removing event listeners; be a good boy by sticking on best practices.👍
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  }, [isModalActive]);

  // When modal is opened, we are initializing pickup location search inputs of the map;
  useEffect(() => {
    if (!isModalActive) {
      setModalId(null);
      return;
    }
    const { city, postCode, street, country } = shippingAddressValues || {};
    const newModalId = `${country}.${postCode}.${city}.${street}`;

    // modalId ensures the search field initialization happens only once.
    if (modalId === newModalId) {
      return;
    }

    // populating pickup location search inputs based on the shipping address.
    setFieldValue(searchCityField, city);
    setFieldValue(searchZipField, postCode);
    setFieldValue(searchStreetField, street);
    setFieldValue(searchCountryField, country);
    activateDhlSearch();
    setModalId(newModalId);
  }, [
    modalId,
    isModalActive,
    setFieldValue,
    activateDhlSearch,
    shippingAddressValues,
  ]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    modalId,
    modalRef,
    setModalId,
    isModalActive,
    setIsModalActive,
  };

  return (
    <LocationModalContext.Provider value={context}>
      {children}
    </LocationModalContext.Provider>
  );
}

LocationFinderModalWrapper.propTypes = {
  children: node.isRequired,
};

export default LocationFinderModalWrapper;
