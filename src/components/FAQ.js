import React from "react"
import "../styles/Essay.css"

function FAQ() {
  return (
    <article className="backdrop">
      <section className="topbill">
        <h3 className="sectionheader">Why does the input only go to five?</h3>
        <div className="textbody">
          <p>
            That's 5.00 - which is 500%.
            
            Things can break if you allow arbitrarily high input, so 
            it's capped at value arbitrarily deemed "high enough."
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why can't I use [insert dragon here]?</h3>
        <div className="textbody">
          <p>
            This could be for any number of reasons.
          </p>
          <ol>
            <li>
              Some dragons do not yet have empirically verified
              framedata.
              
              At the time of writing, this includes:
              <ul>
                <li>Mini Hildy</li>
                <li>Mini Zodi</li>
                <li>Barbatos</li>
                <li>Horus</li>
              </ul>
            </li>
            <li>
              Some dragons might not be implemented yet, or
              may be intractable.
              See: Giovanni, Thor, and Shishimai
            </li>
            <li>
              The dragon may be new, and may not yet have data.
            </li>
            <li>
              Maybe I goofed and accidentally forbid something
              that was fine.
            </li>
          </ol>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why am I getting "INFEASIBLE" solutions?</h3>
        <div className="textbody">
          <p>
            You either put all of the inputs to the extreme, or figured
            out a better way to break something. If you @ me, I can check
            the logs.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">I don't see any actions and my results are all zero?</h3>
        <div className="textbody">
          <p>
            Your damage is zero and the optimal course of action is
            to do nothing.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Output just blips and disappears?</h3>
        <div className="textbody">
          <p>
            Congrats! You broke something I didn't expect!<br/>

            Please let me know what you did to achieve this.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why can't I use Giovanni?</h3>
        <div className="textbody">
          <p>
            Giovanni is really hard to model accurately. <br />
            See also: the "About" section on buffs
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why can't I use Thor?</h3>
        <div className="textbody">
          <p>
            Thor's string is hard to model.

            Not Giovanni hard, I just don't have the time to
            sit down and work it out right now.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why can't I use Shishimai?</h3>
        <div className="textbody">
          <p>
            He'll be supported eventually, just not right now.

            He's very awkward to fit in, but not particularly difficult
            to model.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Will you add Tiki/Dragondrive?</h3>
        <div className="textbody">
          <p>
            No. 
            
            Or at least I don't plan to right now. 
            
            Potentially arbitrary skill usage is not pleasant to
            try and reconcile mathematically.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">What about Leonidas/Chelle?</h3>
        <div className="textbody">
          <p>
            While Leonidas and Chelle can only transform into Mars 
            and Cat Sith respectively, there is nothing to differentiate
            these shapeshifts from using Mars/Cat Sith normally.

            So to avoid redundancy, they're being ignored.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why are there fields for force strikes?</h3>
        <div className="textbody">
          <p>
            Don't ask questions you don't want to know the answers to.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">How do you account for boosted dragon time?</h3>
        <div className="textbody">
          <p>
            We don't.

            The time you enter is the time that's used.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why do the buffs need to last for the entire transformation?</h3>
        <div className="textbody">
          <p>
            Great question!
          </p>
          <p>
            The answer is kinda technical and long-winded.

            If you're really interested in knowing,
            check the "About" section on buffs.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why can't I put poison or burn punisher?</h3>
        <div className="textbody">
          <p>
            Currently, all punishers are lumped into one binary
            category:
            
            "You have 'em or you don't."

            To the program, poison punisher and burn punisher are
            both the same thing.

            This may change at some point in the future.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Why did you put so much effort into something so limited?</h3>
        <div className="textbody">
          <p>
            Great question.
          </p>
          <p>
            Unlike most optimization problems related to this game,
            this one can actually be solved. (most of the time, anyway...)

            It's interesting because it's possible, and the limitations
            are what make it so.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Hey did you know that Phoenix has a second hit on C3?</h3>
        <div className="textbody">
          <p>
            Yeah, that's implemented on the backend but not
            visible on the frontend.
          </p>
        </div>
      </section>
      <div className="emptydiv"></div>
    </article>
  )
}

export default FAQ