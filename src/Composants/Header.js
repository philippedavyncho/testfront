import "./Header.css"
import Slider from "./Slider"
import LeftSlider from "./LeftSlider"
import Right from "./Right"



export default function Header(){
    return(
        <div className="Header">
            <div className="leftHeader">
                <LeftSlider/>
            </div>
            <div className="middleHeader">
                <Slider />
            </div>
            <div className="rightHeader">
                <Right />
            </div>
        </div>
    )
}