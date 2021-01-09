import React from "react"
import "../styles/Essay.css"

function FAQ() {
  return (
    <article className="backdrop">
      <section className="topbill">
        <h3 className="sectionheader">How do I read the output?</h3>
        <div className="textbody">
          <p>
            Which output?
          </p>
          <h4 className="subheader">Actions</h4>
          <p>
            This contains an unordered set of actions 
            that will maximize your damage dealt.

            Actions are prefixed by state, which is an
            abstraction that adds a bit more order on
            the backend.

            Suggested String will attempt to parse this 
            into something more readable, and for many 
            of you that's probably a better place to start.
          </p>
          <h4 className="subheader">Results</h4>
          <p>
            This displays some important statistics from the solve.
          </p>
          <p>
            Max Damage and DPS should be pretty self explanatory.
          </p>
          <p>
            Real Time is the amount of actual time (in frames)
            that you spent transformed.
            
            Dragon Time is the amount of dragon time (in frames)
            consumed by your actions.

            These two stats will differ, because transforming
            and using skill don't use any dragon time.
          </p>
          <h4 className="subheader">Suggested String</h4>
          <p>
            This will attempt to display one possible ordering of 
            the optimal set.

            Actions are listed in combo notation - "C" followed
            by the number of taps needed for execution. (C1, C2, C3, etc.)

            If an action has multiple <i>distinct</i> hits, the
            number will additionally be followed by a lowercase
            letter denoting which hits are referenced. (C1a, C1b, etc.)
          </p>
          <p>
            There are also some oddballs:
          </p>
          <ul>
            <li>
              T - "Transformation"
            </li>
            <li>
              D - "Dodge"
            </li>
            <li>
              S - "Skill"
            </li>
            <li>
              W - "Wait" (keep tapping instead of dodging)
            </li>
            <li>
              buff_end - a buff just expired (still a bit buggy)
            </li>
            <li>
              BD - "Backdash" (not currently implemented)
            </li>
          </ul>
        </div>
      </section>
      <section className="sectionbody">
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
              Some dragons might not be implemented yet.
              
              Thor and Shishimai are not totally unsolvable,
              but I have not yet had time to work on them.
            </li>
            <li>
              Some other dragons may actually be completely
              intractable, and can't be added for some reason
              or another.

              Right now this just includes Giovanni, Tiki, 
              and Dragondrive users.
            </li>
            <li>
              Some dragons don't actually exist.

              Leonidas and Chelle, for instance, have
              "unique" transformations that are completely
              indistinguishable from the normal usage of 
              Mars and Cat S&igrave;th.
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
        <h3 className="sectionheader">Why are there fields for force strikes?</h3>
        <div className="textbody">
          <p>
            Don't ask questions you don't want to know the answers to.
            <br /><br /><br />
            It's really just light future proofing; I would
            prefer to not be caught off-guard by something so
            easily implemented.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">How do you account for boosted dragon time?</h3>
        <div className="textbody">
          <p>
            We don't.

            The time you enter is the time that's used.

            Nimis is an exception, his skill costs negative frames.
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