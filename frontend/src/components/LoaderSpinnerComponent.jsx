import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import React from 'react';

const LoaderSpinnerComponent = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                float: "none",
                position: "absolute",
                top: "35%",
                left: "50%",
                marginLeft: "-50px"
            }}
        >
            <Loader type="Oval" color="lightblue" height="100" width="100" />
        </div>
    );
}

export default LoaderSpinnerComponent;