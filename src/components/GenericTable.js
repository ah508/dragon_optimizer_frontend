import React, {useState, useEffect} from "react"
import "../styles/Tables.css"
import "../styles/generic.css"

function GenericTable(props) {
  const [mode, setMode] = useState('')
  useEffect(() => {
    setMode(props.mode)
  }, [props.body])
  
  function generateRows(acl) {
    return (
      <tbody className="tablebody">
        {acl.map(action => {
          return (
            <tr key={action.id}>
              <td className="leftrow">{action.id} </td>
              { // ugly but functional
              (typeof action.value) === "number" ?
                (props.headerL === 'Results' 
                && ['Max Damage', 'DPS'].some(s => action.id.includes(s))
                && ['effmod', 'puremod'].some(s => mode.includes(s))) ?
                  <td className="rightrow">{`${(action.value * 100).toPrecision(4) / 1}%`}</td> :
                  <td className="rightrow">{action.value.toPrecision(4) / 1}</td> :
                  <td className="rightrow">{action.value}</td>
              }
            </tr>
          )
        })}       
      </tbody>
    )
  }

  return (
    <div className="inputtable genbox">
      <table>
        <thead>
          <tr>
            <th className="leftrow" scope="col">{props.headerL}</th>
            <th className="rightrow" scope="col">{props.headerR}</th>
          </tr>
        </thead>
        {generateRows(props.body)}
      </table>
    </div>
  )
}

export default GenericTable