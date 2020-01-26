import React from "react";

import "./with-spinner.styles.css";

export const withSpinner = (WrappedComponent) => ({isLoading, ...otherProps})=>{
    const spinner = isLoading ? (
        <div className="spinner-overlay">
            <div className="spinner-container"></div>
        </div>
    ): <WrappedComponent {...otherProps}/>

    return spinner;
}
