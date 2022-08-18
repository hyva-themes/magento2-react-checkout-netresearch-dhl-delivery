# Hyvä React Checkout - Netresearch Post & DHL Shipping Delivery

This is DHL delivery method integration for Hyvä React Checkout.

## Prerequisites

1. A working Magento site with **[Post & DHL Shipping Extension](https://github.com/netresearch/dhl-shipping-m2)** installed and setup.
2. **[Hyvä React Checkout](https://github.com/hyva-themes/magento2-react-checkout)** is installed and setup.

## Installation steps

1. Update the `package.json` file with the below content:

    File: `src/reactapp/package.json`
    ```
    "config": {
        "shippingMethodsRepo": {
        "dhl": "git@github.com:hyva-themes/magento2-react-checkout-netresearch-dhl-delivery.git"
        },
    },
    ```

    Depending upon the version, theme or the way in which you setup the extension, along with the GitHub URL, you may need to append the branch details also. For example, if you are using version 2.x of react checkout and you are running on Lumazon theme, then the GitHub url should be changed like `git@github.com:hyva-themes/magento2-react-checkout-netresearch-dhl-delivery.git -b lumazon-theme` where `lumazon-theme` is the branch that holds the code base for the same.

    With this code in `package.json` and running `npm install`, then you are all set. This repo will be copied into the Hyvä React Checkout and will be configured correctly.

2. You need to install two more packages in order to make the integration work. To install them, run below commands:

    ```
    npm i -S leaflet preact-render-to-string
    ```

3. Include the css file related to `leaflet` in your react app. This is needed for you to see the pickup locations correctly on the google map

    File: `src/reactapp/src/index.jsx`
    ```
    import './index.css';
    import 'leaflet/dist/leaflet.css';
    ```

4. Final step is including the translations related to the dhl delievery. For this, we need to do a layout update. Do the below:

    File: `src/view/frontend/layout/hyvareactcheckout_reactcheckout_index.xml`
    ```
    <?xml version="1.0"?>
    <page>
        ...
        <body>
            ...
            <referenceContainer name="main" htmlClass="container column main">
                <referenceContainer name="content">
                    <referenceBlock name="checkout.translations">
                        <arguments>
                            <argument name="checkout_translations" xsi:type="array">
                                <item name="hyva_reactcheckout_dhl_delivery" xsi:type="string">
                                    <![CDATA[Postcode,Search,Opening Hours,Services,Select,Remove,Your shipping option selections could not be saved.,Please enter less or equal than %1 symbols.,Please enter a valid number in this field.,HTML tags are not allowed.,Your input must not include one of the following: ,"You must not refer to a parcel shop, postal office, or similar.",Map data]]>
                                </item>
                            </argument>
                        </arguments>
                    </referenceBlock>
                    ...
                </referenceContainer>
            </referenceContainer>
            ....
        </body>
    </page>
    ```

## Credits

This Checkout has been built in corporation - and with the support of - our main partner, integer_net.

# [![integer_net GmbH](https://github.com/hyva-themes/magento2-react-checkout/blob/documentation/docs/images/logo-integernet.png)](https://integer-net.de)

- [Rajeev K Tomy][link-author]
- [integer_net GmbH][link-company1]

## License

The MIT License (MIT). Please see [License File](LICENSE.txt) for more information.

[ico-compatibility]: https://img.shields.io/badge/magento-%202.3%20|%202.4-brightgreen.svg?logo=magento&longCache=true&style=flat-square

## Be a Hero when you create your own shipping integration

1. Check the extension `checkout_index_index.xml` and `web/js` and `web/template` directories before you start with any integration. Get an understanding how checkout knockout components are used in the extension.
2. Mimic the behaviour of the extension. You should start with the shipping method template component. Create a react component for that and then slowly move the data binders you find in the template to the corresponding javascript part.
3. Enclose the api methods related to the extension within your shipping method folder itself under `src/api/` directory provided your shipping method directory is inside `src/reactapp/src/shippingMethods/`. Do not place them in the original api directory which you will find at `src/reactapp/src/api/`. Refer this code base for example.
4. If the shipping method you are integrating contains lot of application states, then instead of making them as part of global app state, you can create your own shipping method context and manage them there. Refer this code base for example.
5. Create your own custom hooks in order to collect global states such as Formik, App, Cart etc. Refer this code base for example.

[link-author]: https://github.com/progammer-rkt
[link-company1]: https://integer-net.com
