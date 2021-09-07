import React, { useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const TheLayout = ({ history }) => {
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      history.replace("/login");
    } else {
      const {
        REACT_APP_WORDPRESS_URL,
        REACT_APP_WORDPRESS_CONSUMER_KEY,
        REACT_APP_WORDPRESS_CONSUMER_SECRET,
        REACT_APP_WORDPRESS_VERSION,
      } = process.env;

      window.api = new WooCommerceRestApi({
        url: REACT_APP_WORDPRESS_URL,
        consumerKey: REACT_APP_WORDPRESS_CONSUMER_KEY,
        consumerSecret: REACT_APP_WORDPRESS_CONSUMER_SECRET,
        version: REACT_APP_WORDPRESS_VERSION,
        queryStringAuth: true
      });
    }
  });

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
