import './navbar.css'

function Navbar (){
    return (
            <div className="navbar">
                <div className="left">
                </div>
                <div className="nav">
                    <ul className="items">
                        <li><a href="">Home</a></li>
                        <li><a href="">Sign Up</a></li>
                        <li><a href="">Log in</a></li>
                    </ul>
                    <ul className="items">
                        <li><a href="">Home</a></li>
                        <li><a href="">Log Out</a></li>
                    </ul>
                </div>
            </div>
    )
}

export default Navbar;
