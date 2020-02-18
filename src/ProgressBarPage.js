import React from "react";
import { MDBProgress } from 'mdbreact';

const ProgressBarPage = () => {
  return (
    <>
      <MDBProgress material value={25} height="20px">
        25%
      </MDBProgress>
    </>
  );
}

export default ProgressBarPage;