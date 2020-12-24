import React from "react"
import "../styles/Essay.css"

function FAQ() {
  return (
    <article className="backdrop">
      <section className="topbill">
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
            He's very awkward to fit in, but nothing about him is 
            particularly difficult to model.

            It's just that the current program isn't built to handle
            probabilistic buffs, and I don't want to hack it to make
            him work.

            He'll be supported eventually, just not right now.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Will you add Tiki/Dragondrive?</h3>
        <div className="textbody">
          <p>
            No. 
            
            Or at least I don't plan to right now. 
            
            Potentially arbitrary skill usage is really hard
            to reconcile with how the problem gets formulated.
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

            So to avoid redundancy, they're being ignored for now.
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
            We don't... at the moment.

            Personally, I would prefer to keep that as direct as possible -
            "give frames, get results to match", instead of getting a
            result that takes <i>more</i> frames than specified.

            Unless someone poses a really good argument about this, I have
            no intention to change it.
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
            Unfortunately, the answer is kinda technical and 
            long-winded.

            If you're really interested in knowing the answer to that,
            check out the "About" section on buffs.
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
            A more serious answer is that we can only maintain
            this degree of accuracy because of how limited the
            problem is.

            The accuracy with which we can model this process also
            made this interesting to pursue for academic purposes -
            we know that the behavior can be completely characterized,
            so why not make an effort to do that?
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