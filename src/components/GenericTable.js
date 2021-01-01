import React from "react"
import "../styles/Tables.css"

function GenericTable(props) {
    function generateRows(acl) {
        return (
            <tbody className="tablebody">
                {acl.map(action => {
                    return (
                        <tr key={action.id}>
                            <td className="leftrow">{action.id} </td>
                            {
                            (typeof action.value) === "number" ?
                                <td className="rightrow">{action.value.toPrecision(4) / 1}</td> :
                                <td className="rightrow">{action.value}</td>
                            }
                        </tr>
                        )
                    })
                }       
            </tbody>
        )
    }

    return (
        !props.body ? null : 
            <div className="inputtable">
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