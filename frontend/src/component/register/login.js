import image from '../../image/view.png'

function Register() {
    return <main className="full">
        <form className="register register-res">
            <div className="flex-row-center">
                <h3>Login</h3>
            </div> 

            <div className="invalid">
                <div>Invalid Password. Please try again!</div>
                <a href="" className="init-a">Forgot your password ?</a>
            </div>

            <div className="flex-col">
                <label className="label-1">Username</label>
                <input type="text" placeholder=" " className="ipt-1" required/>
            </div>
            <div className="flex-col relative">
                <label className="label-1">Password</label>
                <input type="password" placeholder=" " className="ipt-1" required/>
                <div className="pass-wrap flex-center">
                    <img className="pass-img" src={image}/>
                </div>
            </div>
            {/* <div className="flex-col">
                <label className="label-1">Error</label>
                <input type="text" placeholder=" " className="ipt-2" required/>
            </div>
            <div className="flex-col">
                <label className="label-1">Multi Input</label>
                <div className="ipts-1">
                    <input type="text" placeholder=" " className="ipt-1" required/>
                    <input type="text" placeholder=" " className="ipt-1" required/>
                    <input type="text" placeholder=" " className="ipt-1" required/>
                </div>
            </div> */}

            <button className="btn-1">Submit</button>
        </form>
    </main>
}


export default Register