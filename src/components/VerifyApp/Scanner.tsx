import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

function Scanner({onScan}: any) {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        }, undefined)
        scanner.render(success, error);
    
        function success(result: any) {
            scanner.clear();
            onScan(result);

        }
    
        function error(err: any) {
            console.log(err);
        };
    },[onScan]);
    
    return (
        <div>
            <div id="reader" className="proof"></div>
        </div>
    )
}

export default Scanner;