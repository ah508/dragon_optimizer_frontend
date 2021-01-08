import React from "react"
import "../styles/Essay.css"

function Home() {
  return (
    <article className="backdrop">
      <section className="topbill">
        <p>
          Welcome to the Dragalia Lost dragon optimization project.
        </p>
        <p>
          This is a very old tool that was never really widely available;
          hopefully that can change soon.

          It's designed to help you maximize the use of your time spent
          transformed.
          
          The implementation is still a bit rough around the
          edges, but at least it's functional again.
        </p>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">How to use this tool</h3>
        <p>
          Navigate to /app, then add and choose a dragon.

          Set your desired initial conditions (persistent buffs 
          and the like), and hit "Optimize!" to get your solution.
          
          The optimal result will be returned as an unordered set 
          of actions - the app will attempt to construct a valid
          string from these, but may not always succeed.
        </p>
        <p>
          Please note that the initial conditions are assumed to persist for 
          <strong> the entire duration</strong> of the transformation - this 
          is a limitation of the current system that won't go away any time soon.
        </p>
      </section>
      <section className="sectionbody">
        <p>
          If you want to know more of the technical details on 
          how this works, check the "about" section.
        </p>
        <p>
          If you have any questions that aren't answered in FAQ, 
          or if you'd like to contribute to the project,
          you can contact me on discord @Lazy Chunch#1139.
        </p>
      </section>
      <section className="sectionbody">
        <h4>Special thanks to:</h4>
        <p>
          Nyara and Chu for early support, resources, and a ton of data collection;
          Qwe, Hank, and Zannett for UI and refactoring recommendations;
          Alex for extensive testing, 
          and anyone who provided frames or footage for data collection.
        </p>
      </section>
      <div className="emptydiv"></div>
    </article>
  )
}

export default Home