import React, { useState } from "react"
import SelectSearch from "react-select-search"
import GenericTable from "./GenericTable"
import "../styles/OptionSelect.css"
import "../styles/Searchbox.css"

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
        name: "Gala Mym",
        value: "Gala Mym",
        photo: "../../dragons/210002_02.png"
    },
    {
        name: "Gala Super Mym",
        value: "Gala Super Mym",
        photo: "../../dragons/210002_02.png"
    },
    {
        name: "Halloween Mym",
        value: "Halloween Mym",
        photo: "../../dragons/210113_01.png"
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
    const [loading, setLoading] = useState(false)
    const [dragon, setDragon] = useState("")
    const [advanced, setAdvanced] = useState(false)
    const [necessary, setNecessary] = useState({
        "mode": "effmod",
        "transform time": 600,
        "skill": 1,
        "leniency": 0,
        "relax": false,
    })
    const [stats, setStats] = useState({
        "basestr": 1000,
        "standatk": 0,
        "passivestr": 0,
        "activestr": 0,
        "coabstr": 0,
        "passivefs": 0,
        "activefs": 0,
        "coabfs": 0,
        "passiveskd": 0,
        "activeskd": 0,
        "coabskd": 0,
        "critchance": 0,
        "critmod": 0,
        "afflicpun": 0,
        "breakmod": 0.6,
        "breakpun": 0,
        "basedef": 10,
        "defmod": 0,
        "eleres": 0,
        "eleadv": 1,
        "aspd": 0,
        "ahst": 0,
        "dboost": 0.2,
        "energized": false,
        "inspired": false,
        "broken": false,
        "bog": false,
        "bufftime": 0
    })
    const [apiResponse, setapiResponse] = useState(false)
    const availableDragons = dragonObjects()
    const getImage = mapDragons()

    const handleNecessary = (evt) => {
        const {name, value} = evt.target
        setNecessary(prevNecessary => ({...prevNecessary, [name]: value}))
    }

    const swapSkill = (evt) => {
        evt.preventDefault()
        setNecessary(prevNecessary => ({...prevNecessary, ["skill"]: Math.abs(necessary["skill"]-1)}))
    }

    const swapRelax = (evt) => {
        evt.preventDefault()
        setNecessary(prevNecessary => ({...prevNecessary, ["relax"]: !necessary["relax"]}))
    }

    const handleStat = (evt) => {
        const {name, value} = evt.target
        setStats(prevStats => ({...prevStats, [name]: value}))
    }

    const swapBool = (evt) => {
        const {name} = evt.target
        setStats(prevStats => ({...prevStats, [name]: !stats[name]}))
    }

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

    const handleSubmit = (evt) => {
        evt.preventDefault()
        
        setLoading(true)
        
        const submission = Object.assign({}, necessary)
        submission["dragon"] = dragon
        submission["stats"] = Object.assign({}, stats)
    
        fetch('https://dldragonopt.app/api/optimize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json',
            },
            body: JSON.stringify(submission),
        })
        .then(response => response.json())
        .then(data => setapiResponse(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }

    return (
        <>
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
                                    name="mode"
                                    value = {necessary["mode"]}
                                    onChange={handleNecessary}
                                    disabled={forbidden.includes(dragon)}
                                >
                                    <option value={"puremod"}>Pure Modifier</option>
                                    <option value={"effmod"}>Effective Modifier</option>
                                    <option value={"damage"}>Damage</option>
                                </select>
                            </div>
                            <div className="form-element">
                                <label htmlFor={"dtime".concat(props.id)}>
                                    Dragon Time (frames)
                                </label>
                                <input 
                                    name="transform time"
                                    type="number" 
                                    size="20px"
                                    id={"dtime".concat(props.id)}
                                    value={necessary["transform time"]} 
                                    onChange={handleNecessary}
                                    min="1"
                                    max="1000000"
                                    step="1"
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            <div className="form-element">
                                <label htmlFor={"aspd".concat(props.id)}>
                                    Attack Speed (%)
                                </label>
                                <input 
                                    name="aspd"
                                    type="number" 
                                    id={"aspd".concat(props.id)} 
                                    value={stats["aspd"]} 
                                    onChange={handleStat}
                                    min="0.00"
                                    max="10"
                                    step="0.01"
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            {(() => {
                                switch(necessary["mode"]) {
                                    case "damage": return (
                                        <>
                                        <div className="form-element">
                                            <label htmlFor={"baseSTR".concat(props.id)}>
                                                Base Attack
                                            </label>
                                            <input 
                                                name="basestr"
                                                type="number" 
                                                id={"baseSTR".concat(props.id)} 
                                                value={stats["basestr"]} 
                                                onChange={handleStat}
                                                min="0"
                                                max="100000"
                                                step="1"
                                                disabled={forbidden.includes(dragon)}
                                            />
                                        </div>
                                        <div className="form-element">
                                            <label htmlFor={"baseDEF".concat(props.id)}>
                                                Enemy Defense
                                            </label>
                                            <input 
                                                name="basedef"
                                                type="number" 
                                                id={"baseDEF".concat(props.id)} 
                                                value={stats["basedef"]} 
                                                onChange={handleStat}
                                                min="0.01"
                                                max="100"
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
                                    Desired Leniency (frames)
                                </label>
                                <input 
                                    name="leniency"
                                    type="number" 
                                    size="20px"
                                    id={"lenience".concat(props.id)}
                                    value={necessary["leniency"]} 
                                    onChange={handleNecessary}
                                    min="0"
                                    max={necessary["transform time"]}
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
                                    value={necessary["skill"]} 
                                    onChange={swapSkill}
                                    disabled={forbidden.includes(dragon)}
                                    defaultChecked
                                />
                            </div>
                        </div>
                        <div className="oddones">
                            <input className="submit_button"
                                type="submit"
                                id={`submission${props.id}`}
                                value="Optimize!" 
                                disabled={forbidden.includes(dragon) || loading} 
                            />
                            <label 
                                htmlFor={`submission${props.id}`}
                                className={`for_submission ${props.color}c`}
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
                                        htmlFor={"standatk".concat(props.id)}
                                    >
                                        Standard Attack Damage (%)
                                    </label>
                                    <input 
                                        name="standatk"
                                        type="number" 
                                        id={"standatk".concat(props.id)} 
                                        value={stats["standatk"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"passiveSTR".concat(props.id)}
                                    >
                                        Passive Strength (%)
                                    </label>
                                    <input 
                                        name="passivestr"
                                        type="number" 
                                        id={"passiveSTR".concat(props.id)} 
                                        value={stats["passivestr"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"activeSTR".concat(props.id)}
                                    >
                                        Active Strength (%)
                                    </label>
                                    <input 
                                        name="activestr"
                                        type="number" 
                                        id={"activeSTR".concat(props.id)} 
                                        value={stats["activestr"]} 
                                        onChange={handleStat}
                                        min="-0.50"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"coabSTR".concat(props.id)}>
                                        Coability Strength (%)
                                    </label>
                                    <input 
                                        name="coabstr"
                                        type="number" 
                                        id={"coabSTR".concat(props.id)} 
                                        value={stats["coabstr"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="0.2"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"passiveFS".concat(props.id)}
                                    >
                                        Passive Force Strike (%)
                                    </label>
                                    <input
                                        name="passivefs" 
                                        type="number" 
                                        id={"passiveFS".concat(props.id)} 
                                        value={stats["passivefs"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label 
                                        htmlFor={"activeFS".concat(props.id)}
                                    >
                                        Active Force Strike (%)
                                    </label>
                                    <input 
                                        name="activefs"
                                        type="number" 
                                        id={"activeFS".concat(props.id)} 
                                        value={stats["activefs"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"coabFS".concat(props.id)}>
                                        Coability Force Strike (%)
                                    </label>
                                    <input 
                                        name="coabfs"
                                        type="number" 
                                        id={"coabFS".concat(props.id)} 
                                        value={stats["coabfs"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max=".4"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"passiveSKD".concat(props.id)}>
                                        Passive Skill Damage (%)
                                    </label>
                                    <input
                                        name="passiveskd" 
                                        type="number" 
                                        id={"passiveSKD".concat(props.id)} 
                                        value={stats["passiveskd"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"activeSKD".concat(props.id)}>
                                        Active Skill Damage (%)
                                    </label>
                                    <input 
                                        name="activeskd"
                                        type="number" 
                                        id={"activeSKD".concat(props.id)} 
                                        value={stats["activeskd"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"coabSKD".concat(props.id)}>
                                        Coability Skill Damage (%)
                                    </label>
                                    <input 
                                        name="coabskd"
                                        type="number" 
                                        id={"coabSKD".concat(props.id)} 
                                        value={stats["coabskd"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max=".3"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"critC".concat(props.id)}>
                                        Critical Chance (%)
                                    </label>
                                    <input 
                                        name="critchance"
                                        type="number" 
                                        id={"critC".concat(props.id)} 
                                        value={stats["critchance"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="1.00"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"critM".concat(props.id)}>
                                        Additional Critical Modifier (%)
                                    </label>
                                    <input 
                                        name="critmod"
                                        type="number" 
                                        id={"critM".concat(props.id)} 
                                        value={stats["critmod"]} 
                                        onChange={handleStat}
                                        min="-1.5"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"afflicPUN".concat(props.id)}>
                                        Affliction Punisher (%)
                                    </label>
                                    <input 
                                        name="afflicpun"
                                        type="number" 
                                        id={"afflicPUN".concat(props.id)} 
                                        value={stats["afflicpun"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"brkMod".concat(props.id)}>
                                        Break Multiplier
                                    </label>
                                    <input 
                                        name="breakmod"
                                        type="number" 
                                        id={"brkMod".concat(props.id)} 
                                        value={stats["breakmod"]} 
                                        onChange={handleStat}
                                        min="0.01"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"brkPUN".concat(props.id)}>
                                        Break Punisher (%)
                                    </label>
                                    <input 
                                        name="breakpun"
                                        type="number" 
                                        id={"brkPUN".concat(props.id)} 
                                        value={stats["breakpun"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"modDEF".concat(props.id)}>
                                        Defense Debuff (%)
                                    </label>
                                    <input 
                                        name="defmod"
                                        type="number" 
                                        id={"modDEF".concat(props.id)} 
                                        value={stats["defmod"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="0.50"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"eleRES".concat(props.id)}>
                                        Elemental Resistance Debuff (%)
                                    </label>
                                    <input 
                                        name="eleres"
                                        type="number" 
                                        id={"eleRES".concat(props.id)} 
                                        value={stats["eleres"]} 
                                        onChange={handleStat}
                                        min="-0.99"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"eleADV".concat(props.id)}>
                                        Elemental Advantage Multiplier
                                    </label>
                                    <input 
                                        name="eleadv"
                                        type="number" 
                                        id={"eleADV".concat(props.id)} 
                                        value={stats["eleadv"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"dboost".concat(props.id)}>
                                        Bonus Dragon Damage (%)
                                    </label>
                                    <input 
                                        name="dboost"
                                        type="number" 
                                        id={"dboost".concat(props.id)} 
                                        value={stats["dboost"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="10"
                                        step="0.01"
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"skhst".concat(props.id)}>
                                        Skill Haste (%)
                                    </label>
                                    <input 
                                        name="ahst"
                                        type="number" 
                                        id={"skhst".concat(props.id)} 
                                        value={stats["ahst"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="10"
                                        step="0.01"
                                    disabled= {forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"bufft".concat(props.id)}>
                                        Buff Time (%)
                                    </label>
                                    <input 
                                        name="bufftime"
                                        type="number" 
                                        id={"bufft".concat(props.id)} 
                                        value={stats["bufftime"]} 
                                        onChange={handleStat}
                                        min="0.00"
                                        max="10"
                                        step="0.01"
                                    disabled= {forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"energized".concat(props.id)}>
                                        Energized
                                    </label>
                                    <input 
                                        name="energized"
                                        type="checkbox" 
                                        id={"energized".concat(props.id)} 
                                        value={stats["energized"]} 
                                        onChange={swapBool}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"inspired".concat(props.id)}>
                                        Inspired
                                    </label>
                                    <input
                                        name="inspired" 
                                        type="checkbox" 
                                        id={"inspired".concat(props.id)} 
                                        value={stats["inspired"]} 
                                        onChange={swapBool}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"bog".concat(props.id)}>
                                        Bogged
                                    </label>
                                    <input 
                                        name="bog"
                                        type="checkbox" 
                                        id={"bog".concat(props.id)} 
                                        value={stats["bog"]} 
                                        onChange={swapBool}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                    <label htmlFor={"brk".concat(props.id)}>
                                        Break
                                    </label>
                                    <input 
                                        name="broken"
                                        type="checkbox" 
                                        id={"brk".concat(props.id)} 
                                        value={stats["broken"]} 
                                        onChange={swapBool}
                                        disabled={forbidden.includes(dragon)}
                                    />
                                </div>
                                <div className="form-element">
                                <label htmlFor={"relax".concat(props.id)}>
                                    LP Relaxation
                                </label>
                                <input 
                                    name="relax"
                                    type="checkbox" 
                                    id={"relax".concat(props.id)} 
                                    value={necessary["relax"]} 
                                    onChange={swapRelax}
                                    disabled={forbidden.includes(dragon)}
                                />
                            </div>
                            </div>
                        </div>
                        </>
                    )}
                </form>
            </div>

            {loading ?
                <>
                    <div className="bufferzone">
                    <img className="bufferimage" src="../../dragons/blank_drag.png" alt="loading placeholder" />
                    </div>
                    <div className="bufferzone">
                        <img className="bufferimage" src="../../dragons/blank_drag.png" alt="loading placeholder" />
                    </div>
                </> :
                <>
                    <GenericTable headerL={'Action'} headerR={'#'} body={apiResponse.decisionVariables}/> 
                    <GenericTable headerL={'Results'} headerR={''} body={apiResponse.dataTable}/>
                </>
            }
        </>
    )
}

export default OptionSelect