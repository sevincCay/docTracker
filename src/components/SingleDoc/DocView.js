import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SingleDoc from "./index";

function DocView(props) {
  const docUrl = useParams();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  return (
    <div className="doc-wrapper">
      <SingleDoc path={docUrl.name} docId={params.get("docId")} />
    </div>
  );
}

export default DocView;
