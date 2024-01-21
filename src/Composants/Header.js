import "./Header.css"
import LeftSlider from "./LeftSlider"




export default function Header(){
    return(
        <div className="Header">
            <div className="rightHeader">
                <LeftSlider/>
            </div>
        </div>
    )
}