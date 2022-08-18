import React from 'react';

import DhlDeliveryOptionList from './DhlDeliveryOptionList';
import { classNames } from '../../../../utils';
import { useDhlDeliveryCartContext, useDhlDeliveryDataContext } from '../hooks';

function DhlDeliveryOptionAreas() {
  const { visible } = useDhlDeliveryDataContext();
  const { selectedShippingMethod } = useDhlDeliveryCartContext();
  const { image, title, imageWidth, commentsBefore, displayColor } =
    useDhlDeliveryDataContext();

  // dhl section should be shown only when both shipping country and postcode are filled.
  if (!visible) {
    return null;
  }

  return (
    <div
      className="px-6 py-4 my-3 border-2"
      style={{ borderColor: displayColor }}
    >
      <fieldset
        className={
          (classNames(selectedShippingMethod?.carrierCode || ''), 'mb-6')
        }
      >
        {image && (
          <img className="mb-4" alt="dhlImage" src={image} width={imageWidth} />
        )}
        {title && <h3 className="mb-2 text-xl font-extrabold">{title}</h3>}
        {commentsBefore.map((comment) => (
          <p key={comment.content} className="mb-2">
            <span
              className="tex-sm"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
            {comment.hasFootnote && <span>*</span>}
          </p>
        ))}
        <DhlDeliveryOptionList />
      </fieldset>
    </div>
  );
}

export default DhlDeliveryOptionAreas;
