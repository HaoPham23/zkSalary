import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

function Scanner({onScan}) {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        }, undefined)
        scanner.render(success, error);
    
        function success(result) {
            onScan(result);
        }
    
        function error(err) {
            console.log(err);
        };
        return () => {
            scanner.clear();
          };
    },[onScan]);
    
    return (
        <div>
            <div id="reader" className="proof"></div>
        </div>
    )
}

export default Scanner;