import React from 'react';
import "placeholder-loading/dist/css/placeholder-loading.min.css";
import "placeholder-loading/dist/css/placeholder-loading.css";

export default function Placeholder() {
    return (
        <div className="ph-item">
            <div className="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-row"></div>
            </div>
            <div className="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-row"></div>
            </div>
        </div>
    )
}
