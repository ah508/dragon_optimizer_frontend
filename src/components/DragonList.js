import React, {useState} from "react"
import OptionSelect from "./OptionSelect"
import "../styles/DragonList.css"

function DragonList() {
  const [dragons, setDragons] = useState([])
  const [lastkey, setLastkey] = useState(0)
  const colors = ["blue", "green", "red", "yellow"]

  const addDragon = (evt) => {
    evt.preventDefault()
    setDragons(dragons => [...dragons, [lastkey, [colors[Math.abs(lastkey%4)]]]])
    setLastkey(key => key+1)
  }

  const remDragon = (evt) => {
    evt.preventDefault()
    setDragons(dragons => dragons.slice(0, -1))
    setLastkey(key => key-1)
  }

  return (
    <div className="draglist">
      {dragons.map(dragon => <OptionSelect key={dragon[0]} id={dragon[0]} className={"OSelect-header ".concat(dragon[1])}/>)}
      <div className="buttonholder" >
        <label htmlFor="add" className="buttonlabel">
          Add
        </label>
        <button className="buttonbody" id="add" onClick={addDragon} />
        <label htmlFor="remove" className="buttonlabel">
          Remove
        </label>
        <button className="buttonbody" id="remove" onClick={remDragon} />
      </div>
    </div>
  )
}


export default DragonList