import { useEffect, useRef, useState } from "react";

function Butterfly() {
  return <div className="butterfly">🦋</div>;
}

function App() {
  const audioRef = useRef(null);

  const [screen, setScreen] = useState("intro");
  const [vibe, setVibe] = useState("");
  const [activity, setActivity] = useState("");
  const [food, setFood] = useState("");

  const [selfDestruct, setSelfDestruct] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const [destroyed, setDestroyed] = useState(
    () => localStorage.getItem("assam-surprise-destroyed") === "true"
  );

  // Self destruct countdown
  useEffect(() => {
    if (!selfDestruct) return;

    if (countdown === 0) {
      localStorage.setItem("assam-surprise-destroyed", "true");

      if (audioRef.current) {
        audioRef.current.pause();
      }

      setDestroyed(true);
      setScreen("destroyed");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selfDestruct, countdown]);

  // If already destroyed, keep it locked
  useEffect(() => {
    if (destroyed) {
      setScreen("destroyed");
    }
  }, [destroyed]);

  // -----------------------------
  // DESTROYED / LOCKED SCREEN
  // -----------------------------

  if (destroyed) {
    return (
      <>
        <Butterfly />

        <main className="destroyed-page">
          <div className="destroyed-icon">🦋</div>

          <div className="eyebrow">experience terminated ✦</div>

          <h1>gone.</h1>

          <p>
            You already used your one shot.
            <br />
            nice try though 😭
          </p>
        </main>
      </>
    );
  }

  // -----------------------------
  // SELF DESTRUCT SCREEN
  // -----------------------------

  if (screen === "goodbye") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="self-destruct-page">
          {!selfDestruct ? (
            <>
              <div className="eyebrow">okay... that's actually it ✦</div>

              <h1>Ready to disappear? 👀</h1>

              <p>
                This little thing is about to
                <br />
                self-destruct.
              </p>

              <button
                onClick={() => {
                  setSelfDestruct(true);
                  setCountdown(3);
                }}
              >
                Self-destruct <span>💥</span>
              </button>
            </>
          ) : (
            <>
              <div className="eyebrow">self-destruct initiated ✦</div>

              <h1 className="countdown">
                {countdown}
              </h1>

              <p>okay bye 😭</p>
            </>
          )}
        </main>
      </>
    );
  }

  // -----------------------------
  // INTRO
  // -----------------------------

  if (screen === "intro") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="hero">
          <div className="eyebrow">
            a little something for you ✦
          </div>

          <h1>
            Since I can't come to Assam rn...
          </h1>

          <p>
            here's what I can do instead 👀
          </p>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 20;

                audioRef.current.play().catch(() => {});
              }

              setScreen("vibe");
            }}
          >
            Let me cook <span>→</span>
          </button>
        </main>
      </>
    );
  }

  // -----------------------------
  // VIBE
  // -----------------------------

  if (screen === "vibe") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="hero">
          <div className="eyebrow">
            okay, first things first ✦
          </div>

          <h1>Pick the vibe. 👀</h1>

          <p>What are we going for?</p>

          <div className="options">
            <button
              className={`option ${
                vibe === "chill" ? "selected" : ""
              }`}
              onClick={() => setVibe("chill")}
            >
              🌙 Chill & cozy
            </button>

            <button
              className={`option ${
                vibe === "chaotic" ? "selected" : ""
              }`}
              onClick={() => setVibe("chaotic")}
            >
              🎮 Chaotic & fun
            </button>

            <button
              className={`option ${
                vibe === "cute" ? "selected" : ""
              }`}
              onClick={() => setVibe("cute")}
            >
              🌸 Cute & wholesome
            </button>
          </div>

          <button
            className="continue-btn"
            disabled={!vibe}
            onClick={() => setScreen("activity")}
          >
            Continue <span>→</span>
          </button>
        </main>
      </>
    );
  }

  // -----------------------------
  // ACTIVITY
  // -----------------------------

  if (screen === "activity") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="hero">
          <div className="eyebrow">
            okay, interesting choice ✦
          </div>

          <h1>What sounds good? 🌙</h1>

          <p>Pick your kind of cozy.</p>

          <div className="options">
            <button
              className={`option ${
                activity === "movie" ? "selected" : ""
              }`}
              onClick={() => setActivity("movie")}
            >
              🎬 Movie + yap session
            </button>

            <button
              className={`option ${
                activity === "music" ? "selected" : ""
              }`}
              onClick={() => setActivity("music")}
            >
              🎧 Music + late night talks
            </button>

            <button
              className={`option ${
                activity === "rain" ? "selected" : ""
              }`}
              onClick={() => setActivity("rain")}
            >
              🌧️ Rain + blanket + doing absolutely nothing
            </button>
          </div>

          <button
            className="continue-btn"
            disabled={!activity}
            onClick={() => setScreen("food")}
          >
            Continue <span>→</span>
          </button>
        </main>
      </>
    );
  }

  // -----------------------------
  // FOOD
  // -----------------------------

  if (screen === "food") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="hero">
          <div className="eyebrow">
            important question now ✦
          </div>

          <h1>Okay, what are we eating? 🍜</h1>

          <p>
            because vibes are nothing without food.
          </p>

          <div className="options">
            <button
              className={`option ${
                food === "pizza" ? "selected" : ""
              }`}
              onClick={() => setFood("pizza")}
            >
              🍕 Pizza. Obviously.
            </button>

            <button
              className={`option ${
                food === "comfort" ? "selected" : ""
              }`}
              onClick={() => setFood("comfort")}
            >
              🍜 Something warm & comforting
            </button>

            <button
              className={`option ${
                food === "snacks" ? "selected" : ""
              }`}
              onClick={() => setFood("snacks")}
            >
              🍟 Just snacks. We ball.
            </button>
          </div>

          <button
            className="continue-btn"
            disabled={!food}
            onClick={() => setScreen("trap")}
          >
            Continue <span>→</span>
          </button>
        </main>
      </>
    );
  }

  // -----------------------------
  // TRAP
  // -----------------------------

  if (screen === "trap") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="hero">
          <div className="eyebrow">
            wait... one last thing ✦
          </div>

          <h1>
            Whatever you do...
            <br />
            don't click this. 😭
          </h1>

          <p>I'm serious. Don't.</p>

          <button
            onClick={() => setScreen("reveal")}
          >
            🚨 DO NOT CLICK
          </button>
        </main>
      </>
    );
  }

  // -----------------------------
  // REVEAL
  // -----------------------------

  if (screen === "reveal") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="hero">
          <div className="eyebrow">
            okay... you clicked it ✦
          </div>

          <h1>Fine. You win. 😭</h1>

          <p>
            So apparently your perfect vibe is...
          </p>

          <div className="reveal-card">
            <div>
              <span>Vibe</span>

              <strong>
                {vibe === "chill" &&
                  "🌙 Chill & cozy"}

                {vibe === "chaotic" &&
                  "🎮 Chaotic & fun"}

                {vibe === "cute" &&
                  "🌸 Cute & wholesome"}
              </strong>
            </div>

            <div>
              <span>Activity</span>

              <strong>
                {activity === "movie" &&
                  "🎬 Movie + yap session"}

                {activity === "music" &&
                  "🎧 Music + late night talks"}

                {activity === "rain" &&
                  "🌧️ Rain + blanket + nothing"}
              </strong>
            </div>

            <div>
              <span>Food</span>

              <strong>
                {food === "pizza" &&
                  "🍕 Pizza. Obviously."}

                {food === "comfort" &&
                  "🍜 Something warm & comforting"}

                {food === "snacks" &&
                  "🍟 Just snacks. We ball."}
              </strong>
            </div>
          </div>

          <p>
            Honestly...
            <br />
            sounds kinda nice. 👀
          </p>

          <button
            onClick={() => setScreen("photos")}
          >
            There's more <span>→</span>
          </button>
        </main>
      </>
    );
  }

  // -----------------------------
  // PHOTOS
  // -----------------------------

  if (screen === "photos") {
    return (
      <>
        <audio ref={audioRef} src="/song.mp3" loop />

        <Butterfly />

        <main className="photo-page">
          <div className="eyebrow">
            okay... one last thing ✦
          </div>

          <h1>
            A little something for you. 👀
          </h1>

          <div className="photo-card">
            <img
              src="/photo-1.jpeg"
              alt="A little memory"
            />

            <p>you being you ✦</p>
          </div>

          <div className="photo-card">
            <img
              src="/photo-2.jpeg"
              alt="A little memory"
            />

            <p>okayyy... cute 😭</p>
          </div>

          <div className="photo-card">
            <img
              src="/photo-3.jpeg"
              alt="A little memory"
            />

            <p>this one had to be here ✦</p>
          </div>

          <div className="photo-card">
            <img
              src="/photo-4.jpeg"
              alt="A little memory"
            />

            <p>
              yeah, this had to be here.
            </p>
          </div>

          <div className="final-message">
            <div className="eyebrow">
              and that's all for now ✦
            </div>

            <h1>
              Since I can't come to Assam rn...
            </h1>

            <p>
              I figured I could at least make you
              a tiny version of something we'd
              probably enjoy. 👀
            </p>

            <p>
              For the actual version,
              <br />
              you'll have to wait.
            </p>

            <p>
              Until then...
              <br />
              don't miss me too much. :)
            </p>

            <button
              onClick={() => setScreen("goodbye")}
            >
              Okay, I'm done <span>→</span>
            </button>
          </div>
        </main>
      </>
    );
  }

  return null;
}

export default App;