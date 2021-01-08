import React, {useState, useEffect} from "react"
// eslint-disable-next-line
import myWorker from "worker-loader!../helperfiles/parseworker"
import BufferZone from "./BufferZone"
import "../styles/Tables.css"
import "../styles/generic.css"

function ParseString(props) {
  const [status, setStatus] = useState('working')
  const [workResponse, setWorkResponse] = useState(null)
  const sum = arr => arr.reduce((a, b) => a + b, 0)
  const quickInfo = rows => Object.fromEntries(rows.map(row => [row.id, row.value]))

  useEffect(() => {
    console.log('instantiating worker')
    var worker = new myWorker()
    worker.addEventListener("message", e => {
      setStatus('')
      console.log(e.data)
      setWorkResponse(e.data.value)
    })

    const body = quickInfo(props.body)
    if (sum(Object.values(body)) > 40) {
      setStatus('large')
    } else {
      setStatus('working')
      console.log('attempting string generation')
      worker.postMessage({message: 'solve', rules: props.rules, body: body})
    }

    return function cleanup() {
      console.log('sending shutdown signal')
      worker.terminate() 
      // this might cause memory leaks, idk
      // seems more "proper" to use self.close()
      // but CRA doesn't like that for some reason
      // edit: this WILL cause memory leaks, if the user
      // somehow manages to make submissions faster than
      // the worker can solve - typically that shouldn't
      // occur
    }
  }, [props.body, props.rules])

  return (
    <> 
      {// these chained ternarys are confusing, but necessary
      (status === 'working') ? 
        <BufferZone /> : // if not working ->
        (status === 'large') ? 
          <div className="genbox scuff">
            Output is too large to safely parse <br />
            (n &gt; 40)
          </div> : // if not large ->
          (workResponse) ?
            <div className="inputtable genbox scuff">
              <div><b>Suggested String</b></div>
              <div className="tablebody">
                {workResponse.map((lvl, index) => {
                  return (
                    <div key={index}>{lvl}</div>
                  )
                })}
              </div>
            </div> : // if response is falsy ->
            <div className="genbox scuff">
              Failed to parse string.
            </div>
      }
    </>
  )
}

export default ParseString