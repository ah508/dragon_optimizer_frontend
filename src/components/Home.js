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
          This is a tool to maximize the effectiveness of a given
          transformation.

          Right now it's a little rough around the edges, but still
          totally functional.
        </p>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">How to use this tool</h3>
        <p>
          Navigate to /app, then add and choose a dragon.

          Set your desired initial conditions (persistent buffs 
          and the like), and hit "Optimize!" to get your solution.
          
          The optimal result will be returned as an unordered set 
          of actions that can be used to construct a valid attack string.
        </p>
        <p>
          You might find the output a little confusing - at some point
          I hope to include a program that will generate a valid ordering
          for you, but I haven't yet had time to work on it.

          Actions are prefixed by the "state" that they take place in,
          which can result in a little bit of output gore.

          This is... not ideal, but I'm trying to work with what I've got.

          Please note that the initial conditions are assumed to persist for 
          <strong> the entire duration</strong> of the transformation - this 
          is an unfortunate limitation of the current system.
        </p>
      </section>
      <section className="sectionbody">
        <p>
          If you want to know how and why this works, check
          out the "About" page. 
          
          There, you'll also find the assumptions that make this 
          possible, and the limitations that result from them.
          
          Some of these limitaions can be improved upon - maybe 
          you could be the one to do it - this project
          does have an open source.
        </p>
      </section>
      <section className="sectionbody">
          If you'd like to contribute to the project, or if you
          have any unanswered questions, you can get
          in touch with me on discord @Lazy Chunch#1139
        </section>
      <section className="sectionbody">
        <h4>Special thanks to:</h4>
        <p>
          Nyara and Chu for early support, resources, and a ton of data collection;
          Qwe and Hank for UI and refactoring recommendations;
          Alex for extensive testing, 
          and anyone who provided frames or footage for data collection.
        </p>
      </section>
      <div className="emptydiv"></div>
    </article>
  )
}

export default Home