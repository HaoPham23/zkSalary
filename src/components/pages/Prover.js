import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function Prover() {
    return (
        <div className="text-center">
            <h2 className="main-title">Prove</h2>
            <form action="/home">
                <p>
                    <label>Identifier</label><br/>
                    <input type="text" name="identifier" required />
                </p>
                <p>
                    <label>Salary (VND)</label>
                    <br/>
                    <input type="number" name="salary" required />
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
                    <button id="sub_btn" type="submit">Prove</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}