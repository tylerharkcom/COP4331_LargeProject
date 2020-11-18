import React from 'react';
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0B2B53;
`;

const MyLoadingSymbol = (props) => {
    return(
        <div classname="my-loading-symbol">
            <PacmanLoader
                css={override}
                size={25}
                color={"#0B2B53"}
                loading={props.loading}
            />
        </div>
        
    );
};

export default MyLoadingSymbol;