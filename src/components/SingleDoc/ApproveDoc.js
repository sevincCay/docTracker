import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { approveDoc } from "../../features/documentSlice";

function ApproveDoc(props) {
  const [isApproved, setIsApproved] = useState(false);
  const [toggleBtn, setToggle] = useState(false);
  const dispatch = useDispatch();

  const docName = {
    name: props.name,
  };

  const approveDocs = () => {
    dispatch(approveDoc(docName));
    setToggle(true);
  };

  return (
    <div
      className={toggleBtn ? "invisible approve-doc" : "visible approve-doc"}
    >
      <input
        className="me-3"
        onChange={() => setIsApproved(!isApproved)}
        type="checkbox"
        name="approveDoc"
        id="approveDoc"
      />
      <label htmlFor="approveDoc">I read and understood </label>
      <Button
        className="approve-btn btn-sm"
        disabled={isApproved ? false : true}
        onClick={approveDocs}
      >
        Approve
      </Button>
      <Link className={toggleBtn ? "visible" : "invisible"} to="/">
        Back
      </Link>
    </div>
  );
}

export default ApproveDoc;
