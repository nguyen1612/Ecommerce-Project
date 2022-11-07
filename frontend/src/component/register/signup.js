import {useEffect, useState, useRef} from 'react';
import axios from 'axios'

import view from '../../image/view.png'


function Signup() {

    
    return <main className="full">
        <form className="register register-res">
            <div className="flex-row-center">
                <h3>Signup</h3>
            </div>

            <div className="invalid">
                <div>Invalid Password. Please try again!</div>
            </div>

            <div className="flex-col">
                <label htmlFor="username" className="label-1">Username</label>
                <input type="text" className="ipt-1" id="username" placeholder=" " required/>
            </div>

            <div className="flex-col">
                <label htmlFor="email" className="label-1">Email</label>
                <input type="email" className="ipt-1" id="email" placeholder=" " required/>
            </div>

            <div className="flex-col relative">
                <label htmlFor="pass1" className="label-1">Password</label>
                <input type="password" className="ipt-1" id="pass1" placeholder=" " required/>
                <div className='pass-wrap flex-center'>
                    <img src={view} className="pass-img"/>
                </div>
            </div>

            <div className="flex-col relative">
                <label htmlFor="pass2" className="label-1">Confirm Password</label>
                <input type="password" className="ipt-1" id="pass2" placeholder=" " required/>
                <div className='pass-wrap flex-center'>
                    <img src={view} className="pass-img"/>
                </div>
            </div>

            <button className="btn-1">Signup</button>
        </form>
    </main>
}

export default Signup