import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import ApproveDoc from "./ApproveDoc";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectDocStatus = createSelector(
  (state) => state.loggedInUser,
  (loggedInUser) => loggedInUser.myPendings
);
function SingleDoc(props) {
  const [docState, setDocState] = useState(false);
  const baseUrl = process.env.REACT_APP_BASEURL;
  const docs = [{ uri: `${baseUrl}/upload/${props.path}` }];
  const docStatus = useSelector(selectDocStatus);

  useEffect(() => {
    docStatus.map((item) => {
      if (item.DocId == props.docId && item.isApproved === false) {
        setDocState(true);
      }
    });
  }, []);

  return (
    <>
      {/* "react-doc-viewer": "^0.1.5", */}
      <div className="doc-viewer">
        {docState ? <ApproveDoc name={props.path} /> : ""}
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          style={{ width: "100vw", height: "90vh" }}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
        />
      </div>
    </>
  );
}

export default SingleDoc;
