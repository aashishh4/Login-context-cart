
import { useAuth } from "./AuthContext";

function Navbar(){
    const { cartItems } =  useAuth();
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return(
        <div>
        <span> <h3>Cart items: {totalCount}</h3></span> 
        <br/>
        </div>
    )
}export default Navbar