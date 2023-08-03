import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function Verifier() {
    return (
        <div className="text-center">
            <h2 className="main-title">Verify</h2>
            <form action="/home">
                <p>
                    <label>Identifier</label><br/>
                    <input type="text" name="Identifier" required />
                </p>
                <p>
                    <label>Lowerbound</label>
                    <br/>
                    <input type="number" name="lower" required />
                </p>
                <p>
                    <label>Upperbound</label>
                    <br/>
                    <input type="number" name="upper" required />
                </p>
                <p>
                    <label>Proof</label>
                    <br/>
                    <input type="text" name="proof" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Verify</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}