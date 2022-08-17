import RootElement from '../../../../../../utils/rootElement';

const checkoutConfig = RootElement.getCheckoutConfig();

export const mapConfig = {
  /**
   * Get location finder config map tile api token
   * @return {string}
   */
  getToken() {
    return checkoutConfig.locationFinder.maptileApiToken;
  },

  /**
   * Get location finder config map tile url
   * @return {string}
   */
  getUrl() {
    return checkoutConfig.locationFinder.maptileUrl;
  },

  /**
   * Get location finder config map attribution
   * @return {string}
   */
  getAttribution() {
    return checkoutConfig.locationFinder.mapAttribution;
  },
};
