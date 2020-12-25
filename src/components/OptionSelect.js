import React, { useState } from "react"
import SelectSearch from "react-select-search"
import GenericTable from "./GenericTable"
import "../styles/OptionSelect.css"
import "../styles/Searchbox.css"

//for some reason that's probably really obvious, dragon images
//won't load if I try to path to them in src

function dragonObjects() {
    let dragmapping = require("../helperfiles/name_map.json")
    const d_map = Object.keys(dragmapping).map(key => {
        return ({
            name: dragmapping[key].NameEN, 
            value: dragmapping[key].NameEN, 
            photo: "../../dragons/".concat(key, ".png")
        })
    })
    d_map.push({
        name: "Rush",
        value: "Rush",
        photo: "../../dragons/210118_01.png"
    },
    {
        name: "Lathna",
        value: "Lathna",
        photo: "../../dragons/210071_01.png"
    },
    {
        name: "Lathna(MS)",
        value: "Lathna(MS)",
        photo: "../../dragons/210071_01.png"
    },
    {
        name: "Halloween Mym",
        value: "Halloween Mym",
        photo: "../../dragons/210113_01.png"
    },
    {
        name: "Gala Mym",
        value: "Gala Mym",
        photo: "../../dragons/210002_02.png"
    },
    {
        name: "Gala Super Mym",
        value: "Gala Super Mym",
        photo: "../../dragons/210002_02.png"
    })
    return d_map
}

function mapDragons() {
    let dragmapping = require("../helperfiles/name_map.json")
    const get_img = Object.fromEntries(Object.keys(dragmapping).map(key => {
        return ([
            dragmapping[key].NameEN,
            "../../dragons/".concat(key, ".png")
        ])
    }))
    get_img[""] = "../../dragons/blank_drag.png"
    get_img["Rush"] = "../../dragons/210118_01.png"
    get_img["Lathna"] = "../../dragons/210071_01.png"
    get_img["Lathna(MS)"] = "../../dragons/210071_01.png"
    get_img["Halloween Mym"] = "../../dragons/210113_01.png"
    get_img["Gala Mym"] = "../../dragons/210002_02.png"
    get_img["Gala Super Mym"] = "../../dragons/210002_02.png"
    return get_img
}

function renderDragon(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '0%',
        verticalAlign: 'middle',
        marginRight: 5,
    };

    return (
        <button {...props} className={className} type="button">
            <span><img alt="" style={imgStyle} width="64" height="64" src={option.photo} /><span>{option.name}</span></span>
        </button>
    );
}

function OptionSelect(props) {
    const [dragon, setDragon] = useState("")
    const [mode, setMode] = useState("effmod")
    const [duration, setDuration] = useState(600)
    const [speed, setSpeed] = useState(0)
    const [skill, setSkill] = useState(1)
    const [leniency, setLeniency] = useState(0)
    const [advanced, setAdvanced] = useState(false)
    const [baseSTR, setBaseSTR] = useState(100)
    const [passiveSTR, setPassiveSTR] = useState(0)
    const [activeSTR, setActiveSTR] = useState(0)
    const [coabSTR, setCoabSTR] = useState(0)
    const [passiveFS, setPassiveFS] = useState(0)
    const [activeFS, setActiveFS] = useState(0)
    const [coabFS, setCoabFS] = useState(0)
    const [passiveSKD, setPassiveSKD] = useState(0)
    const [activeSKD, setActiveSKD] = useState(0)
    const [coabSKD, setcoabSKD] = useState(0)
    const [critC, setCritC] = useState(0)
    const [critM, setCritM] = useState(0)
    const [afflicPUN, setAfflicPUN] = useState(0)
    const [brk, setBRK] = useState(false)
    const [brkMOD, setbrkMOD] = useState(0.6)
    const [brkPUN, setbrkPUN] = useState(0)
    const [baseDEF, setBaseDEF] = useState(10)
    const [modDEF, setModDEF] = useState(0)
    const [eleRES, setEleRES] = useState(0)
    const [eleADV, setEleADV] = useState(1)
    const [bufftime, setBufftime] = useState(0)
    const [haste, setHaste] = useState(0)
    const [dboost, setDboost] = useState(0)
    const [energized, setEnergized] = useState(false)
    const [inspired, setInspired] = useState(false)
    const [bog, setBog] = useState(false)
    const [relax, setRelax] = useState(false)
    const [apiResponse, setapiResponse] = useState(false)
    const availableDragons = dragonObjects()
    const getImage = mapDragons()

    //testing values
    const forbidden = [
        false, 
        "Gala Thor", 
        "Giovanni", 
        "Shishimai", 
        "Mini Hildy", 
        "Mini Zodi", 
        "Barbatos", 
        "Horus",
    ]
    // const fillerAPIStuff = {
    //     dataTable: [
    //         {id: 'damage', value: 5000},
    //         {id: 'realframes', value: 711},
    //         {id: 'dragframes', value: 588},
    //         {id: 'dps', value: 83.3}
    //     ],
    //     decisionVariables: [
    //         {id: "TransformT", value: 1},
    //         {id: "NormalC1a", value: 5},
    //         {id: "NormalC1b", value: 5},
    //         {id: "NormalC2", value: 5},
    //         {id: "NormalC3", value: 2},
    //         {id: "NormalD", value: 3},
    //         {id: "NormalS", value: 1},
    //         {id: "TransformT", value: 1},
    //         {id: "NormalC1a", value: 5},
    //         {id: "NormalC1b", value: 5},
    //         {id: "NormalC2", value: 5},
    //         {id: "NormalC3", value: 2},
    //         {id: "NormalD", value: 3},
    //         {id: "NormalS", value: 1},
    //     ],
    //     rules: {}
    // }
    //end testing values

    const handleSubmit = (evt) => {
        evt.preventDefault()
        
        setapiResponse({
            dataTable: "loading",
            decisionVariables: "loading",
        })
        
        const stats = {
            "basestr": baseSTR,
            "passivestr": passiveSTR,
            "activestr": activeSTR,
            "coabstr": coabSTR,
            "passivefs": passiveFS,
            "activefs": activeFS,
            "coabfs": coabFS,
            "passiveskd": passiveSKD,
            "activeskd": activeSKD,
            "coabskd": coabSKD,
            "critchance": critC,
            "critmod": critM,
            "afflicpun": afflicPUN,
            "breakmod": brkMOD,
            "breakpun": brkPUN,
            "basedef": baseDEF,
            "defmod": modDEF,
            "eleres": eleRES,
            "eleadv": eleADV,
            "aspd": speed,
            "ahst": haste,
            "dboost": dboost,
            "energized": energized,
            "inspired": inspired,
            "broken": brk,
            "bog": bog,
            "bufftime": bufftime
        }
        const submission = {
            "dragon": dragon,
            "mode": mode,
            "transform time": duration,
            "skill": skill,
            "leniency": leniency,
            "relax": relax,
            "stats": stats
        }
        
        // setapiResponse(fillerAPIStuff)

        // async POST submission json
        fetch('http://ec2-18-219-252-55.us-east-2.compute.amazonaws.com/api/optimize', {
            method: 'POST',
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application.json',
            },
            body: JSON.stringify(submission),
        })
        .then(response => response.json())
        .then(data => setapiResponse(data))
        // not sure if this is the right way to structure the response
        // nvm seems to work right
    }

    return (
        <div className={props.className}>
            <div className="inputbucket">
                <img className="dragonphoto" src={getImage[dragon]} alt="" />
                <SelectSearch
                    id={"dragonSelect".concat(props.id)}
                    placeholder="Choose a dragon"
                    value={dragon}
                    onChange={setDragon}
                    options={availableDragons}
                    renderOption={renderDragon}
                    search={true}
                />
                <form onSubmit={handleSubmit}>
                    {dragon && (
                        <>
                        <div className="formfill">
                            <div className="form-element">
                                <label htmlFor={"mode".concat(props.id)}>Mode</label>
                                <select
                                    id={"mode".concat(props.id)}
                                    value = {mode}
                                    onChange={e => setMode(e.currentTarget.value)}
                                    disabled={forbidden.includes(dragon)}
                                >
                                    <option value={"puremod"}>Pure Modifier</option>
                                    <option value={"effmod"}>Effective Modifier</option>
                                    <option value={"damage"}>Damage</option>
                                </select>
                            </div>
                            <div className="form-element">
                                <label htmlFor={"dtime".concat(props.id)}>
                                    Transformation Duration
                                </label>
                                <input 
                                    type="number" 
                                    size="20px"
                                    id={"dtime".concat(props.id)}
                                    value={duration} 
                                    onChange={e => setDuration(e.currentTarget.value)}
                                    min="1"
                                    step="1"
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            <div className="form-element">
                                <label htmlFor={"aspd".concat(props.id)}>
                                    Attack Speed
                                </label>
                                <input 
                                    type="number" 
                                    id={"aspd".concat(props.id)} 
                                    value={speed} 
                                    onChange={e => setSpeed(e.currentTarget.value)}
                                    min="0.00"
                                    step="0.01"
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            {(() => {
                                switch(mode) {
                                    case "damage": return (
                                        <>
                                        <div className="form-element">
                                            <label htmlFor={"baseSTR".concat(props.id)}>
                                                Base Attack
                                            </label>
                                            <input 
                                                type="number" 
                                                id={"baseSTR".concat(props.id)} 
                                                value={baseSTR} 
                                                onChange={e => setBaseSTR(e.currentTarget.value)}
                                                min="0"
                                                step="1"
                                                disabled={forbidden.includes(dragon)}
                                            />
                                        </div>
                                        <div className="form-element">
                                            <label htmlFor={"baseDEF".concat(props.id)}>
                                                Enemy Defense
                                            </label>
                                            <input 
                                                type="number" 
                                                id={"baseDEF".concat(props.id)} 
                                                value={baseDEF} 
                                                onChange={e => setBaseDEF(e.currentTarget.value)}
                                                min="0.01"
                                                step="0.01"
                                                disabled={forbidden.includes(dragon)}
                                            />
                                        </div>
                                        </>
                                    );
                                    default: return null;
                                }
                            })()}
                            <div className="form-element">
                                <label htmlFor={"lenience".concat(props.id)}>
                                    Desired Leniency
                                </label>
                                <input 
                                    type="number" 
                                    size="20px"
                                    id={"lenience".concat(props.id)}
                                    value={leniency} 
                                    onChange={e => setLeniency(e.currentTarget.value)}
                                    min="0"
                                    step="1"
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            <div className="form-element">
                                <label htmlFor={"skill".concat(props.id)}>
                                    Skill Usage
                                </label>
                                <input
                                    type="checkbox"
                                    id={"skill".concat(props.id)} 
                                    value={skill} 
                                    onChange={e => setSkill(Math.abs(skill-1))}
                                    disabled={forbidden.includes(dragon)}
                                    defaultChecked
                                />
                            </div>
                        </div>
                        <div className="oddones">
                            <input className="submit_button"
                                type="submit"
                                id={"submission".concat(props.id)}
                                value="Optimize!" 
                                disabled={forbidden.includes(dragon)} 
                            />
                            <label 
                                htmlFor={"submission".concat(props.id)}
                                className="for_submission"
                                disabled={forbidden.includes(dragon)}
                            >
                                Optimize!
                            </label>
                            <label 
                                htmlFor={"advanced".concat(props.id)} 
                                className="for_advanced"
                            >
                                {advanced ? "Hide Advanced" : "Show Advanced"}
                            </label>
                            <input className="disp_advanced"
                                type="checkbox" 
                                id={"advanced".concat(props.id)} 
                                value={advanced}
                                onClick={() => setAdvanced(!advanced)}
                            />
                            <div className="advdropdown">
                                <div className="form-element">
                                    <label 
                                        htmlFor={"passiveSTR".concat(props.id)}
                                    >
                                        Passive Strength
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"passiveSTR".concat(props.id)} 
                                        value={passiveSTR} 
                                        onChange={e => setPassiveSTR(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"activeSTR".concat(props.id)}
                                    >
                                        Active Strength
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"activeSTR".concat(props.id)} 
                                        value={activeSTR} 
                                        onChange={e => setActiveSTR(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"coabSTR".concat(props.id)}>
                                        Coability Strength
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"coabSTR".concat(props.id)} 
                                        value={coabSTR} 
                                        onChange={e => setCoabSTR(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"passiveFS".concat(props.id)}
                                    >
                                        Passive Force Strike
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"passiveFS".concat(props.id)} 
                                        value={passiveFS} 
                                        onChange={e => setPassiveFS(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"activeFS".concat(props.id)}
                                    >
                                        Active Force Strike
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"activeFS".concat(props.id)} 
                                        value={activeFS} 
                                        onChange={e => setActiveFS(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"coabFS".concat(props.id)}>
                                        Coability Force Strike
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"coabFS".concat(props.id)} 
                                        value={coabFS} 
                                        onChange={e => setCoabFS(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"passiveSKD".concat(props.id)}>
                                        Passive Skill Damage
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"passiveSKD".concat(props.id)} 
                                        value={passiveSKD} 
                                        onChange={e => setPassiveSKD(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"activeSKD".concat(props.id)}>
                                        Active Skill Damage
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"activeSKD".concat(props.id)} 
                                        value={activeSKD} 
                                        onChange={e => setActiveSKD(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"coabSKD".concat(props.id)}>
                                        Coability Skill Damage
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"coabSKD".concat(props.id)} 
                                        value={coabSKD} 
                                        onChange={e => setcoabSKD(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"critC".concat(props.id)}>
                                        Critical Chance
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"critC".concat(props.id)} 
                                        value={critC} 
                                        onChange={e => setCritC(e.currentTarget.value)}
                                        min="0.00"
                                        max="1.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"critM".concat(props.id)}>
                                        Additional Critical Modifier
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"critM".concat(props.id)} 
                                        value={critM} 
                                        onChange={e => setCritM(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"afflicPUN".concat(props.id)}>
                                        Affliction Punisher
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"afflicPUN".concat(props.id)} 
                                        value={afflicPUN} 
                                        onChange={e => setAfflicPUN(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"brkMod".concat(props.id)}>
                                        Break Modifier
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"brkMod".concat(props.id)} 
                                        value={brkMOD} 
                                        onChange={e => setbrkMOD(e.currentTarget.value)}
                                        min="0.01"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"brkPUN".concat(props.id)}>
                                        Break Punisher 
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"brkPUN".concat(props.id)} 
                                        value={brkPUN} 
                                        onChange={e => setbrkPUN(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"modDEF".concat(props.id)}>
                                        Defense Debuff
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"modDEF".concat(props.id)} 
                                        value={modDEF} 
                                        onChange={e => setModDEF(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"eleRES".concat(props.id)}>
                                        Enemy Damage Resistance
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"eleRES".concat(props.id)} 
                                        value={eleRES} 
                                        onChange={e => setEleRES(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"eleADV".concat(props.id)}>
                                        Elemental Advantage Modifier
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"eleADV".concat(props.id)} 
                                        value={eleADV} 
                                        onChange={e => setEleADV(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"dboost".concat(props.id)}>
                                        Dragon Boost
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"dboost".concat(props.id)} 
                                        value={dboost} 
                                        onChange={e => setDboost(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"skhst".concat(props.id)}>
                                        Skill Haste
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"skhst".concat(props.id)} 
                                        value={haste} 
                                        onChange={e => setHaste(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                    disabled= {forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"bufft".concat(props.id)}>
                                        Buff Time
                                    </label>
                                    <input 
                                        type="number" 
                                        id={"bufft".concat(props.id)} 
                                        value={bufftime} 
                                        onChange={e => setBufftime(e.currentTarget.value)}
                                        min="0.00"
                                        step="0.01"
                                    disabled= {forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"energized".concat(props.id)}>
                                        Energized
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        id={"energized".concat(props.id)} 
                                        value={energized} 
                                        onChange={() => setEnergized(!energized)}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"inspired".concat(props.id)}>
                                        Inspired
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        id={"inspired".concat(props.id)} 
                                        value={inspired} 
                                        onChange={() => setInspired(!inspired)}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"bog".concat(props.id)}>
                                        Bogged
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        id={"bog".concat(props.id)} 
                                        value={bog} 
                                        onChange={() => setBog(!bog)}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"brk".concat(props.id)}>
                                        Break
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        id={"brk".concat(props.id)} 
                                        value={brk} 
                                        onChange={e => setBRK(!brk)}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                <label htmlFor={"relax".concat(props.id)}>
                                    LP Relaxation
                                </label>
                                <input 
                                    type="checkbox" 
                                    id={"relax".concat(props.id)} 
                                    value={relax} 
                                    onChange={() => setRelax(!relax)}
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            </div>
                        </div>
                        </>
                    )}
                </form>
            </div>
            <GenericTable headerL={'Action'} headerR={'#'} body={apiResponse.decisionVariables}/>
            <GenericTable headerL={'Results'} headerR={''} body={apiResponse.dataTable}/>
            {/* <ViableString solveresults={apiResponse.dataTable}/> */}
        </div>
    )
}

export default OptionSelect