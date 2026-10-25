import { useEffect, useRef, useState } from "react";

function Butterfly() {
  return <div className="butterfly">🦋</div>;
}


function AnimatedBouquet() {
  return (
    <div className="bouquet-art" aria-label="A bouquet of flowers">
      <svg viewBox="0 0 320 320" role="img">
        <defs>
          <linearGradient id="bouquetPaper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe4e8" />
            <stop offset="100%" stopColor="#dba1b4" />
          </linearGradient>
        </defs>

        {/* Stems */}
        <g
          className="bouquet-stems"
          stroke="#527c55"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M160 270 Q125 190 83 112" />
          <path d="M160 270 Q160 180 155 88" />
          <path d="M160 270 Q205 180 237 118" />
          <path d="M160 270 Q110 210 115 145" />
          <path d="M160 270 Q200 210 202 150" />
        </g>

        {/* Leaves */}
        <g fill="#83aa79">
          <ellipse cx="111" cy="206" rx="10" ry="23" transform="rotate(-48 111 206)" />
          <ellipse cx="199" cy="211" rx="10" ry="24" transform="rotate(48 199 211)" />
          <ellipse cx="127" cy="238" rx="9" ry="20" transform="rotate(-55 127 238)" />
          <ellipse cx="188" cy="239" rx="9" ry="20" transform="rotate(55 188 239)" />
        </g>

        {/* Flower heads */}
        <g>
          {[
            [83, 105, "#f3a8ba"],
            [155, 78, "#fff0c5"],
            [237, 111, "#e8a0c0"],
            [114, 137, "#fff0f2"],
            [204, 143, "#f6bfd0"]
          ].map(([x, y, color], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 8 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-14"
                  rx="8"
                  ry="14"
                  fill={color}
                  transform={`rotate(${i * 45})`}
                />
              ))}
              <circle r="8" fill="#dba34c" />
              <circle r="3" fill="#fff0b8" />
            </g>
          ))}
        </g>

        {/* Tiny filler flowers */}
        <g fill="#fff2cf">
          <circle cx="110" cy="94" r="4" />
          <circle cx="218" cy="88" r="4" />
          <circle cx="184" cy="108" r="4" />
          <circle cx="137" cy="112" r="4" />
          <circle cx="254" cy="142" r="4" />
        </g>

        {/* Bouquet wrapping */}
        <path
          d="M75 165 Q160 205 245 165 L204 284 Q160 305 116 284 Z"
          fill="url(#bouquetPaper)"
          stroke="#c889a0"
          strokeWidth="2"
        />
        <path
          d="M160 204 L160 293"
          stroke="#fff1f3"
          strokeWidth="2"
          opacity=".8"
        />

        {/* Ribbon */}
        <path
          d="M160 251 C130 226 119 257 155 265
             C120 288 145 296 160 269
             C177 296 200 285 166 265
             C202 251 185 227 160 251 Z"
          fill="#b85c80"
        />
        <circle cx="160" cy="262" r="7" fill="#f6c7d5" />
      </svg>
    </div>
  );
}

function BouquetScreen({ onContinue }) {
  return (
    <main className="bouquet-screen">
      <div className="bouquet-card">
        <p className="bouquet-eyebrow">a little something for you ♡</p>

        <h1>Hi, Misbah.</h1>

        <AnimatedBouquet />

        <h2>I made this bouquet for you.</h2>

        <p className="bouquet-message">
          If I could, I'd give you these flowers in person.
          Until then, here's a little piece of my heart. 🌷
        </p>

        <button className="bouquet-button" onClick={onContinue}>
          Take your bouquet ♡
        </button>
      </div>
    </main>
  );
}

function App() {
  
const audioRef = useRef(null);

useEffect(() => {
  const audio = document.getElementById("background-music");
  if (!audio) return;

  audioRef.current = audio;
  audio.volume = 0.08;

  const tryPlay = () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    }
  };

  // Try autoplay when the page loads.
  tryPlay();

  // Browsers may require a user interaction first.
  document.addEventListener("pointerdown", tryPlay);

  return () => {
    document.removeEventListener("pointerdown", tryPlay);
  };
}, []);


const [musicStarted, setMusicStarted] = useState(false);

const startMusic = () => {
  const audio = audioRef.current;
  if (!audio || musicStarted) return;

  audio.volume = 0.1;

  audio.play()
    .then(() => setMusicStarted(true))
    .catch(() => {});
};


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

  if (screen === "bouquet") {
    return (
      <BouquetScreen
        onContinue={() => setScreen("goodbye")}
      />
    );
  }

  if (screen === "goodbye") {
    return (
      <>
        {/* <audio ref={audioRef} src="/song.mp3" loop /> */}

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
            Since I can't come to Mankhurd rn...
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
              src="/photo1.jpeg"
              alt="A little memory"
            />

            <p>you being you ✦</p>
          </div>

          <div className="photo-card">
            <img
              src="/photo2.jpeg"
              alt="A little memory"
            />

            <p>okayyy... cute 😭</p>
          </div>

          <div className="photo-card">
            <img
              src="/photo3.jpeg"
              alt="A little memory"
            />

            <p>this one had to be here ✦</p>
          </div>

          <div className="photo-card">
            <img
              src="/photo4.jpeg"
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
              Since I can't come to Mankhurd rn...
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
              don't miss me too much. :
            </p>

            
            <button onClick={() => setScreen("bouquet")}>
              Wait... I made you something ♡ →
            </button>

          </div>
        </main>
      </>
    );
  }

  return null;
}

export default App;