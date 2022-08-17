import React from 'react';
import renderToString from 'preact-render-to-string';
import { renderToString as reactRenderToString } from 'react-dom/server';

import { config } from '../../../../../../config';

const convertToDomElement = (html) => {
  const element = document.createElement('div');
  element.innerHTML = html;

  return element;
};

export const tmplRenderer = {
  render(props, ReactHtmlComponent) {
    return convertToDomElement(
      config.isDevelopmentMode
        ? // preact won't work in dev mode. so using react-dom/server in dev mode.
          reactRenderToString(<ReactHtmlComponent {...props} />)
        : renderToString(<ReactHtmlComponent {...props} />)
    );
  },
};
