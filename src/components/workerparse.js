// this is all very packed code - that is to say,
// difficult to read. This will get the job done,
// but it could definitely be made a bit prettier.

const workercode = () => {
    // generic sum
    const sum = arr => arr.reduce((a, b) => a + b, 0)

    // decrements remaining uses of given move
    const decrement = (base, key) => {
        let result = JSON.parse(JSON.stringify(base))
        result[key] -= 1
        return result
    }

    function formatReduction(sol) {
        let whole = [],
            frag = []
        const nline = new Set(['T', 'W', 'D', 'S', 'Buff end'])
        for (const move of sol) {
            frag.push(move)
            if (nline.has(move)) {
                whole.push(frag.join(' '))
                frag = []
            }
        }
        if (frag.length) {
            whole.push(frag.join(' '))
        }
        return whole
    }

    // generates funtions for getting children of the current node
    // and simplifying the final string
    function makeHelpers(rules, body) {
        const specS = Object.keys(body).filter(k => /_skl/.test(k))

        const customFilter = (k, v) => {
            if (specS.length) { 
                if (k === specS[0]) { 
                    return (v in body)
                } else {
                    return (v in body && v[v.length-1] !== 'S')
                }
            } else {
                return (v in body)
            }
        }

        const reduce_map = Object.fromEntries(
            Object.entries(rules)
                .filter(([k, v]) => k in body)
                .map(([k, v]) => [k, v['reduce_to']])
        )
        const access = Object.fromEntries(
            Object.entries(rules)
                .filter(([k, v]) => k in body)
                .map(([k, v]) => [k, v['children'].filter(c => customFilter(k, c))])
        )
        
        const reduceMoves = acl => acl.map(action => reduce_map[action]) 
        const nodeChildren = (curAct, remaining) => access[curAct].filter(act => remaining[act] > 0)

        return [nodeChildren, reduceMoves]
    }

    function recursiveFind(curAction, remain, history, walkFunc) {
        const children = walkFunc(curAction, remain)
        
        if (!children.length) {
            if (sum(Object.values(remain)) === 0) {
                return history //fires up the stack when a valid string is found
            } else {
                return null
            }
        }
        for (const next_dest of children) {
            const next_acl = decrement(remain, next_dest),
                  next_hist = [...history, next_dest]
            const result = recursiveFind(next_dest, next_acl, next_hist, walkFunc)
            if (result) {
                return result
            }
        }
        return null
    }

    onmessage = function(e) {
        if (e.data.message === 'solve') {
            const [nodeChildren, reduceMoves] = makeHelpers(e.data.rules, e.data.body)
            const start_state = decrement(e.data.body, 'TransformT')
            const solution = recursiveFind('TransformT', start_state, ['TransformT'], nodeChildren)
            const returnval = solution ? formatReduction(reduceMoves(solution)) : solution // simplifies solution if it is not null
            postMessage({message: 'result', value: returnval})
        }
    }
}

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;