import React from "react"
import "../styles/Essay.css"

function About() {
  return (
    <article className="backdrop">
      <section className="topbill">
        <h3 className="sectionheader">Gameplay Assumptions</h3>
        <div className="textbody">
          <p>
            To smooth things over with regard to gameplay
            and execution, we assume that:
          </p>
          <ol>
            <li>
              All "real" projectiles deal damage
              on the same frame that they spawn
            </li>
            <li>
              Except in some rare circumstances, you 
              can cancel any attack on the same frame 
              it deals damage
            </li>
            <li>
              Changes to buffs/debuffs may only be 
              initiated by the transformed dragon
            </li>
            <li>
              Skills have a hard upper limit on the
              number of uses
            </li>
            <li>
              All gathered empirical framedata is
              correct
            </li>
          </ol>
          <p>
            In practice these might not always hold.

            Our data could be in error, and frame
            perfect cancels are hard to get consistent at.
          </p>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">How it works</h3>
        <div className="textbody">
          <p>
            The aim of this program is to help the user 
            maximize their use of time spent transformed.

            In most cases, this can be achieved through 
            complete enumeration - however we can speed
            things up by exploiting some key features.
          </p>
          <div className="paddedlist">
            <ul>
              <li>
                All actions are bounded by a finite 
                resource (time or number of uses)
              </li>
              <li>
                Actions do not need to be strictly ordered<sup><a href="#fn1" id="r1">+</a></sup>
              </li>
              <li>
                Each action has known value (damage) that
                is independent of other actions<sup><a href="#fn2" id="r2">++</a></sup>
              </li>
              <li>
                Our objective may be expressed as a 
                linear combination of the values of 
                each action 
              </li>
            </ul>
            <p className="footnote" id="fn1"><sup><a href="#r1">+</a></sup>
            In order to perform a C2, you first need to C1, but the order
            of execution does not change the total value.</p>
            <p className="footnote" id="fn2"><sup><a href="#r2">++</a></sup>
            This doesn't naturally hold for buffs, but we can <i>make</i> it hold</p>
          </div>
          <p>
            These features allow us to formulate the problem as a <a 
                href="https://en.wikipedia.org/wiki/Knapsack_problem"
                target="_blank" 
                rel="noreferrer"
            >knapsack</a> with additional constraints for sequential
            dependence.

            Our decision variables represent the number of times we
            take each action, and our objective function is a linear 
            combination of those decision variables and their corresponding
            values. (generally damage)
          </p>
          <p>
            We choose to solve this as an Integer Linear Program (ILP), 
            using <a href='https://pypi.org/project/mip/'
            target="_blank" rel="noreferrer"
            >Python MIP</a> as an intermediary to COIN-OR CBC and CLP.
          </p>
          <h4 className="subheader">Why it works</h4>
          <div className="textbody">
            <p>
              Since our objective is linear, we can
              demonstrate that it is a convex function,
              which means that any discovered local optimum
              will actually be <i>the</i> global optimum.

              This means we can utilize highly efficient
              hill climbing or gradient descent algorithms 
              to find an optimal solution to the problem.

              In particular, CLP uses the Simplex method, 
              which is classed as hill climbing.
            </p>
            <p>
              Unless you specifically request a solution
              to the LP relaxation, all decision variables
              are additionally required to be integers.
              
              This means that we aren't just using linear
              programming - CBC uses a branch and cut
              algorithm with the LP relaxation of the 
              integer programming problem as a bound.

              In some sense this is technically still
              an enumerative method, but it's much faster
              than most.
            </p>
          </div>
          <h4 className="subheader">Handling Buffs</h4>
          <div className="textbody">
            <p>
              Buffs and debuffs introduce a small kink in
              the hose - the value of other actions may not
              be independent of the buff or debuff.

              This means our function isn't linear, and hence
              we can't apply linear programming... or can we?
            </p>
            <p>
              You may notice that, while buffed, we
              still have a linear function... it just 
              isn't the <i>same</i> linear function.

              We can, in fact, decompose our nonlinear
              function into two or more linear functions, 
              where each linear function corresponds to
              one possible "state" of being buffed.

              We need to add a few additional dummy
              variables in order to account for how
              "buff states" can be entered/exited, but
              this almost completely solves the 
              nonlinearity introduced by buffs... <i>almost</i>.
            </p>
          </div>
          <h4 className="subheader">Arbitrary Complexity</h4>
          <div className="textbody">
            <p>
              If buffs can be reasonably accounted for 
              through buff states, why don't we permit
              input of timed buffs and debuffs?
            </p>
            <p>
              Well... as a function of the number of buffs,
              the number of buff states grows pretty darn fast. 
              
              (you can approximate the first few terms 
              by an exponential of base 3)
              
              This starts to become a problem for the 
              human trying to read the output at around 4
              or 5 buffs, and starts to become a problem
              for the program itself at 14 or 15.
              
              Due to a strong instinctual desire to not 
              have my stuff break, I am thus averse to
              permitting the entry of user defined buffs.

              This is also why Giovanni is disabled for
              the forseeable future.
            </p>
          </div>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">How the Problem is Formatted</h3>
        <div className="textbody">
          <p>
            For this section, I'm going to assume that you have some
            understanding of how a linear programming problem is 
            formulated.
          </p>
          <h4 className="subheader">States</h4>
          <div className="textbody">
            <p>
              At the topmost layer, the problem is divided
              by "state."<br />

              State categorizes decision variables based
              on possible combinations of buffs and debuffs;
              it's an additional level of abstraction that 
              makes things easier for us humans to understand.
            </p>
            <p>
              In each state you can take similar
              actions, but the value of a particular 
              action may differ from state to state. For example:
              "Unbuffed_C1" and "Buffed_C1" are two 
              different decision variables representing a 
              single action, "C1,"" that can be taken in 
              two different states, "Unbuffed" and "Buffed." 
            </p>
          </div>
          <h4 className="subheader">Variables</h4>
          <div className="textbody">
            <p>
              There are two primary types of decision variables:
            </p>
            <div className="paddedlist">
              <ol>
                <li>Actions</li>
                <li>Dummies</li>
              </ol>
            </div>
            <p>
              <u>Action  variables</u> directly represent
              actions you can take while transformed.

              This includes things like transforming,
              executing a sequential attack, dodging,
              or using a skill.

              In the objective function, these variables
              have coefficients equal to the damage they deal
              or the number of frames they take to complete,
              depending on what you're optimizing for.
            </p>
            <p>
              <u>Dummy variables</u> do not represent actions 
              that you take directly.
              
              Instead, these variables are introduced to
              model abstract behavior that cannot be captured
              with action variables alone.

              Among other things, this includes overlapping
              buff timings and transitions between states.

              In the objective function, dummy variables
              always have coefficients of zero.
            </p>
          </div>
          <h4 className="subheader">Constraints</h4>
          <div className="textbody">
            <p>
              There are six primary types of constraints:
            </p>
            <div className="paddedlist">
              <ol>
                <li>Sequential Dependence Constraints</li>
                <li>Entry Constraints </li>
                <li>Usage Constraints</li>
                <li>Time Constraints</li>
                <li>Overlap Constraints</li>
                <li>SP Constraints</li>
              </ol>
            </div>
            <p>
              There is also a seventh type of constraint,
              the "Optimality Constraint," but we'll describe
              that in the next section.
            </p>
            <p>
              <u>Sequential dependence constraints</u> are those
              that ensure a valid ordering can be constructed
              post-solve.
              
              A common constraint of this type might dictate
              that the number of C2 actions cannot exceed
              the number of C1 actions.

              In other words:
              <span className="formula">
                C2 &le; C1
              </span>
              <span className="formula">or</span>
              <span className="formula">
                C2 - C1 &le; 0
              </span>

              For problems involving buff states, this can also
              involve dummy variables representing an exit from
              a state.

              For the prior example, if a buff state were
              involved, the constraint would instead read:
              <span className="formula">
                C2 - C1 - BC1 &le; 0
              </span>
              where "BC1" is a dummy variable indicating 
              that the last action you took while buffed
              was a C1.
            </p>
            <p>
              <u>Entry constraints</u> appropriately restrict how
              you initiate a sequence of actions.

              A typical entry constraint might state that
              you cannot initiate a C1 more than once 
              without first dodging, waiting, using a 
              skill, or transforming.

              Better stated, this means that the number 
              of C1 actions cannot exceed one (transform
              is mandatory) plus the total number of 
              dodges, waits, and skills.
              
              More concisely:
              <span className="formula">
                C1 - W - D - S &le; 1
              </span>
            </p>
            <p>
              <u>Usage constraints</u> are simply an upper bound
              on the usage of a particular action.

              Most commonly, these dictate that you cannot
              use a skill more than once
              <span className="formula">
                S &le; 1
              </span>
              or that you cannot exit a state more than once
              <span className="formula">
                BC1 + BC2 + BC3 &le; 1
              </span>
            </p>
            <p>
              <u>Time constraints</u> place limits on how
              much time can be spent in a particular state,
              or how much time can be spent overall.

              Constraints of this type follow the form of:
              <span className="formula">
                &Sigma; c<sub>i</sub>x<sub>i</sub> &le; t
              </span>
              where c<sub>i</sub> is the cost (time)
              of action i, x<sub>i</sub> is the decision
              variable representing action i, and t is
              the total permitted time.

              When multiple buffs are involved, it's
              necessary to use a dummy variable to model
              overlap times, since those can't be determined
              before solving.
            </p>
            <p>
              <u>Overlap constraints</u> are used to
              "set" the value of a dummy variable to
              the unspent time of an initial buff state,
              so that the time spent overlapping the
              next buff state can be accurately limited.
            </p>
            <p>
              <u>SP constraints</u> ensure that a skill
              is not used prematurely when SP generation
              is involved.

              Constraints of this type follow the form of:
              <span className="formula">
                c<sub>s</sub>x<sub>s</sub> - &Sigma; a<sub>i</sub>x<sub>i</sub> &le; 0
              </span>
              where c<sub>s</sub> is the SP cost of action S,
              x<sub>s</sub> is the decision variable associated
              with action S, a<sub>i</sub> is the SP generated
              by action i, and x<sub>i</sub> is the associated
              decision variable.
              
              Unfortunately, this cannot be used to model
              an arbitrary number of skills.
            </p>
          </div>
          <h4 className="subheader">Constructing and Solving the Model</h4>
          <div className="textbody">
            <p>
              With these definitions in mind, it becomes rather
              simple to break the construction of the problem into
              manageable steps.
            </p>
            <div className="paddedlist">
              <ol>
                <li>
                  Generate all possible states.
                </li>
                <li>
                  Set an objective function, with 
                  decision variables for each action
                  in each state, with coefficients
                  equal to the damage dealt by that
                  action in that state.
                </li>
                <li>
                  Add an equality constraint to set
                  the number of transformations equal
                  to one.
                </li>
                <li>
                  For each state, add sequential
                  dependence constraints for the
                  dragon's main string (C1, C2, etc.)
                </li>
                <li>
                  For each state, add an entry constraint.
                </li>
                <li>
                  Set usage constraints for state exit
                  dummy variables. (if needed)
                </li>
                <li>
                  Set usage constraints for skills.
                </li>
                <li>
                  Set a time constraint for the entire
                  transformation.
                </li>
                <li>
                  For each buff state, set a
                  time constraint. (if needed)
                </li>
                <li>
                  Set overlap constraints. (if needed)
                </li>
                <li>
                  Set SP constraints. (if needed)
                </li>
                <li>
                  Solve the maximization problem.
                </li>
              </ol>
            </div>
            <p>
              Notice that step 1 and steps 3 through 6 are entirely
              unaffected by user input. As a result, we may pregenerate
              these features of the model and load them in as needed.
              Solving the model yields an optimal value for our
              objective function, maximizing the damage dealt during
              this particular transformation; however there may be 
              a more optimal solution - a solution that achieves
              the same damage in a shorter time.<br />
              So, we adjust the model such that it minimizes
              the time spent in transformation; but in order
              to ensure that our damage is still maximized, we
              add an additional <i>optimality constraint</i> of
              the form:
              <span className="formula">
                &Sigma; &Sigma; d<sub>ij</sub>x<sub>ij</sub> = K
              </span>
              where d<sub>ij</sub> is the damage produced
              by action j in state i, x<sub>ij</sub> is the corresponding
              decision variable, and K is the optimal value
              of the objective function from the previous solve.<br />
              We adjust the model as follows:
            </p>
            <div className="paddedlist">
              <ol>
                <li>
                  Change the coefficients of the objective
                  function from damage to time. 
                </li>
                <li>
                  Add the optimality constraint to the model.
                </li>
                <li>
                  Solve the minimization problem.
                </li>
              </ol>
            </div>
            <p>
              This will yield a solution that produces maximal
              damage with minimal time.<br />
              Note: there are less costly methods of doing multi-objective
              optimizations, but they will not necessarily guarantee a
              solution that matches our criteria for optimality.
            </p>
          </div>
          <h4 className="subheader">Unusual Cases</h4>
          <div className="textbody">
            <p>
              Some dragons are just weird.

              Sometimes, we need to add additional constraints
              or variables to model them correctly.
            </p>
            <p>
              <u>Gala Reborn Poseidon</u> automatically uses 
              a skill at the end of transformation.
              
              This is easy enough to account for - we simply
              add an extra decision variable to represent this
              skill, and an extra constraint to limit its use.<br />
              
              Note: this extra skill does not interact with
              anything, so we needn't edit entering constraints
              with its introduction.
            </p>
            <p>
              <u>"Bufferables"</u> like Leviathan, Pele, and High
              Brunhilda all have actions that cannot be immediately
              canceled by a dodge - though they can be canceled
              immediately by a skill.

              This results in two different timings for the same
              action, so we need to add a decision variable to 
              represent this alternate execution, and to constrain
              it by the number of skill uses.

              We must also modify sequential dependence constraints
              like so:
              <span className="formula">
                C<sub>i</sub> + C<sub>ia</sub> - C<sub>i-1</sub> &le; 0
              </span>
              Where C<sub>i</sub> is the move in question,
              C<sub>ia</sub> is the alternate execution, and 
              C<sub>i-1</sub> is the preceding action.

              Do note that we do <i>not</i> modify constraints where
              the move in question is the preceding action, since
              the alternate execution can only be followed up by a
              skill.
            </p>
            <p>
              <u>Styx</u> has multiple different levels for his
              skill, based on the number of C3s he executes.
              
              These all require separate decision variables which
              collectively utilize the same usage constraint.

              To ensure that the appropriate level is used
              for our given number of C3s we will also require
              additional modified sequential dependence constraints.
            </p>
          </div>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Limitations and Other Issues</h3>
        <div className="textbody">
          <p>
            Naturally, our assumptions and choice of 
            solution strategy introduce a number of
            limitations and shortcomings. 
            
            In addition to these, there are some bumps 
            with the current implementation that still 
            need to be ironed out.
          </p>
          <h4 className="subheader">Buffs</h4>
          <p>
            The first and most difficult limitation
            has already been discussed to some extent.
            
            In general, this limitation cannot be
            removed - the computational difficulties
            it introduces simply cannot be overcome.

            However, it may be possible to compromise.

            <i> Up to some number</i> of buffs may still be
            safe, to a degree, and with better formatting
            of output the results can be made human-readable.

            A compromise like this would require more
            groundwork - the program in its current state 
            isn't fit to handle pure dynamic generation of
            constraints.
          </p>
          <h4 className="subheader">Projectiles</h4>
          <p>
            The disconnect between how the program handles 
            projectiles and how they behave in-game may,
            in theory, generate some suboptimal solutions.

            Unfortunately, to my knowledge, this limitation 
            cannot be overcome with this solution strategy.

            More exhaustive enumerative methods would be able 
            to model this behavior more accurately, but the 
            sacrifice of speed is too great a cost.
          </p>
          <h4 className="subheader">Framedata</h4>
          <p>
            All framedata is gathered manually.

            This means that it may be subject to 
            observational errors, environmental errors,
            and outright mistakes, which can then be
            inherited by the model.

            To some extent, this could be overcome 
            with a little bit of statistics, and 
            a lot of extra data collection...

            Data collection is tedious, unglamorous,
            and likely won't be automated any time soon.

            Understandably, <i>nobody</i> wants to do it,
            so accurate framedata will probably continue
            to be the biggest thorn in the side of this 
            project.
          </p>
          <h4 className="subheader">Accurate Afflictions</h4>
          <p>
            All affliction punishers are currently lumped
            under the same binary banner.

            "You have 'em or you don't."

            This means that disjoint punishers, or
            punishers that only activate on dragon
            skill can't be modeled.

            Generally this isn't a big deal, but it
            is something some users may desire to do.
          </p>
          <p>
            Our chosen solution method can actually
            handle a more robust system - the code just
            isn't there right now.
          </p>
          <h4 className="subheader">Output</h4>
          <p>
            The format of output is... not the greatest
            at the moment.

            I wanted to make and implement a generator
            for valid strings, but I legitimately don't 
            have time right now.

            It might require a few changes to the API,
            but output can totally be streamlined and 
            hopefully will be at some point.
          </p>
          <p>
            There are other plans related to this that
            I also haven't had time to work on,
            like a string parser to allow for
            additional experimentation post-solve.
          </p>
          <h4 className="subheader">Miscellaneous Limitations</h4>
          <div>
            <ol>
              <li>
                The system is not built around
                disjoint buff timings.
              </li>
              <li>
                The system is not built with
                consideration for buff caps.
              </li>
              <li>
                The system is built on
                deterministic behavior -
                crits are weighted and 
                there is not yet any 
                support for randomized buffs.
              </li>
              <li>
                Most of the formulation
                is still done manually,
                and hence may be prone to
                errors.
              </li>
              <li>
                Excessively large or small 
                numbers can break things, even
                though <i>in theory</i> they 
                shouldn't.
              </li>
              <li>
                Python can be kinda slow
                sometimes. That may or
                may not prove to be a 
                problem in production.
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section className="sectionbody">
        <h3 className="sectionheader">Future Improvements</h3>
        <div className="textbody">
          <ol>
            <li>
              Get frames for missing dragons
            </li>
            <li>
              Change the data format to check for buff zones
            </li>
            <li>
              Add real time limitations as an alternative
              to dragon time transformations.
            </li>
            <li>
              (try to) Implement Thor
            </li>
            <li>
              Implement Shishimai (?)
            </li>
            <li>
              Move all of the dragon information into an actual database
              for ease of updating.
            </li>
            <li>
              Add a means of retrieving dragon information instead of
              initiating a solve. (goes with above)
            </li>
            <li>
              Swap over to sim standard for filestuff.
            </li>
            <li>
              Make an arbitrary string parser with graphical display.
            </li>
            <li>
              Fix the early exit buff bug.
            </li>
            <li>
              Migrate verifications from the spreadsheet to this site.
            </li>
            <li>
              Integrate use of COIN-OR libraries directly, and drop Python MIP.
            </li>
          </ol>
        </div>
      </section>
      <div className="emptydiv"></div>
    </article>
  )
}

export default About