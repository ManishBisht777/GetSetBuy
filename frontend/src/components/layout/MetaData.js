import React from "react";
import Helmet from "react-helmet";

function metadata({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default metadata;
