import React from "react"
import "../styles/Essay.css"

function Home() {
    return (
        <article className="backdrop">
            <section className="topbill">
                <p>
                    Hey! Welcome to the Dragalia Lost dragon optimization project.
                </p>
                <p>
                    This is an endeavor to mathematically determine the optimal set
                    of actions to take when transformed into a particular dragon, 
                    given certain initial conditions. Right now it's a little
                    barebones, but still very much functional. 
                </p>
            </section>

            <section className="sectionbody">
                <h3 className="sectionheader">How to use this tool</h3>
                <p>
                    Navigate to /app and start adding dragons.

                    Once you've chosen a dragon, you can set initial conditions
                    (persistent buffs and the like), and then hit "Optimize!" to
                    submit your request to the server. 
                    
                    The server will process your request, and return an unordered
                    set of actions that will maximize the damage dealt  by the
                    selected dragon during transformation, given the initial conditions.
                </p>
                <p>
                    You might find the output a little confusing - if you want a 
                    crash course on how to read it there will be a section in "About".

                    Right now there isn't yet a tool to parse this set into a valid
                    string - but that feature should be added... eventually.

                    Please note that the initial conditions are assumed to persist for 
                    <strong> the entire duration</strong> of the transformation. 
                    
                    Arbitrary timings and durations for buffs and debuffs are 
                    theoretically possible, but too risky to permit for practical 
                    purposes.

                    I don't know how robust the server is, so responses might take a
                    little longer than expected - please be patient, and if anything 
                    breaks please let me know.
                </p>
            </section>
            <section className="sectionbody">
                <p>
                    If you want to know how, and why, this works mathematically, check
                    out the "About" page. There, you'll also find the limitations and
                    assumptions necessary for this to work, and explanations of why 
                    certain things aren't allowed. Some of these limitaions can be
                    improved upon - maybe you could be the one to do it - this project
                    does have an open source.
                </p>
            </section>
            <section className="sectionbody">
                <h4>Special thanks to:</h4>
                <p>
                    Nyara, Chu, and anyone who sent framedata/combos for verification
                </p>
            </section>
            <div className="emptydiv"></div>
        </article>
    )
}

export default Home