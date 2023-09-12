import "./Header.css"
import Slider from "./Slider"
import LeftSlider from "./LeftSlider"




export default function Header(){
    return(
        <div className="Header">
            <div className="middleHeader">
                <Slider />
            </div>
            <div className="rightHeader">
                <LeftSlider/>
            </div>
        </div>
    )
}