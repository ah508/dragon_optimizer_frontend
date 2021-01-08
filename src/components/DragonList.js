import React, {useState} from "react"
import OptionSelect from "./OptionSelect"
import "../styles/DragonList.css"

function Cross(props) {
  return (
    <svg 
      className="cross"
      width={props.size} 
      height={props.size}
      viewBox="0 0 100 100"
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 10 L 90 90" stroke="black" strokeWidth="14" />
    <path d="M 10 90 L 90 10" stroke="black" strokeWidth="14" />
    <circle cx="10" cy="10" r="7" fill="black"/>
    <circle cx="90" cy="90" r="7" fill="black"/>
    <circle cx="90" cy="10" r="7" fill="black"/>
    <circle cx="10" cy="90" r="7" fill="black"/>
    </svg>
  )
}

function DragonList() {
  const [dragons, setDragons] = useState([])
  const [lastkey, setLastkey] = useState(0)
  const colors = ["blue", "green", "red", "yellow"]

  const addDragon = (evt) => {
    evt.preventDefault()
    setDragons(dragons => [...dragons, lastkey])
    setLastkey(key => key+1)
  }

  const getColor = (keynum) => colors[Math.abs(keynum%4)]

  function remDragon(drop) {
    setDragons(dragons => dragons.filter(item => item !== drop))
  }

  return (
    <div className="draglist">
      {dragons.map(dragon => {
        const divHeight = {zIndex: 999-dragon};
        return (
          <div key={dragon} style={divHeight} className={"OSelect-header ".concat(getColor(dragon))}>
            <OptionSelect key={dragon} id={dragon} color={getColor(dragon)}/>
            <button className="buttonbody" id={"remove".concat(dragon)} tabIndex="0" onClick={() => remDragon(dragon)} />
            <label htmlFor={"remove".concat(dragon)} className="x-out">
              <Cross size="18"/>
            </label>
          </div>
        )
      })}
      <div className="buttonholder" >
        <button className="buttonbody" id="add" onClick={addDragon} />
        <label htmlFor="add" className="buttonlabel">
          Add
        </label>
      </div>
    </div>
  )
}


export default DragonList