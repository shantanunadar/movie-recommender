import { useState, useEffect, useRef } from "react";

const API_BASE = "http://localhost:5000";

const MOVIES = [
  { title: "STRANGER THINGS", year: "2016", genre: "SCI-FI", rating: "9.0", imdb: "tt4574334" },
  { title: "THE CROWN", year: "2016", genre: "DRAMA", rating: "8.7", imdb: "tt4786824" },
  { title: "DAREDEVIL", year: "2015", genre: "ACTION", rating: "8.6", imdb: "tt3322312" },
  { title: "SUITS", year: "2011", genre: "LEGAL", rating: "8.5", imdb: "tt1632701" },
  { title: "MINDHUNTER", year: "2017", genre: "CRIME", rating: "8.6", imdb: "tt5290382" },
  { title: "PEAKY BLINDERS", year: "2013", genre: "CRIME", rating: "8.8", imdb: "tt2442560" },
  { title: "BROOKLYN 99", year: "2013", genre: "COMEDY", rating: "8.4", imdb: "tt2467372" },
  { title: "NARCOS", year: "2015", genre: "CRIME", rating: "8.8", imdb: "tt2707408" },
  { title: "OZARK", year: "2017", genre: "DRAMA", rating: "8.4", imdb: "tt5071412" },
  { title: "SQUID GAME", year: "2021", genre: "THRILLER", rating: "8.0", imdb: "tt10919420" },
  { title: "WEDNESDAY", year: "2022", genre: "HORROR", rating: "7.4", imdb: "tt13443470" },
  { title: "DARK", year: "2017", genre: "SCI-FI", rating: "8.7", imdb: "tt5753856" },
  { title: "MONEY HEIST", year: "2017", genre: "CRIME", rating: "8.2", imdb: "tt6468322" },
  { title: "BRIDGERTON", year: "2020", genre: "ROMANCE", rating: "7.3", imdb: "tt8740790" },
  { title: "THE WITCHER", year: "2019", genre: "FANTASY", rating: "8.2", imdb: "tt5180504" },
  { title: "ALTERED CARBON", year: "2018", genre: "SCI-FI", rating: "8.0", imdb: "tt2261227" },
  { title: "SENSE8", year: "2015", genre: "SCI-FI", rating: "8.3", imdb: "tt2431438" },
  { title: "BREAKING BAD", year: "2008", genre: "CRIME", rating: "9.5", imdb: "tt0903747" },
  { title: "BETTER CALL SAUL", year: "2015", genre: "CRIME", rating: "9.0", imdb: "tt3032476" },
  { title: "THE OFFICE", year: "2005", genre: "COMEDY", rating: "9.0", imdb: "tt0386676" },
  { title: "GAME OF THRONES", year: "2011", genre: "FANTASY", rating: "9.2", imdb: "tt0944947" },
  { title: "HOUSE OF CARDS", year: "2013", genre: "DRAMA", rating: "8.7", imdb: "tt1856010" },
  { title: "WESTWORLD", year: "2016", genre: "SCI-FI", rating: "8.5", imdb: "tt0475784" },
  { title: "TRUE DETECTIVE", year: "2014", genre: "CRIME", rating: "9.0", imdb: "tt2356777" },
  { title: "FARGO", year: "2014", genre: "CRIME", rating: "8.9", imdb: "tt2802850" },
  { title: "THE BOYS", year: "2019", genre: "ACTION", rating: "8.7", imdb: "tt1190634" },
  { title: "EUPHORIA", year: "2019", genre: "DRAMA", rating: "8.4", imdb: "tt8772296" },
  { title: "SUCCESSION", year: "2018", genre: "DRAMA", rating: "8.9", imdb: "tt7660850" },
  { title: "CHERNOBYL", year: "2019", genre: "HISTORY", rating: "9.4", imdb: "tt7366338" },
  { title: "SEVERANCE", year: "2022", genre: "SCI-FI", rating: "8.7", imdb: "tt11280740" },
  { title: "THE LAST OF US", year: "2023", genre: "SCI-FI", rating: "8.8", imdb: "tt3581920" },
  { title: "ANDOR", year: "2022", genre: "SCI-FI", rating: "8.4", imdb: "tt9253284" },
  { title: "HOUSE OF DRAGON", year: "2022", genre: "FANTASY", rating: "8.4", imdb: "tt11198330" },
  { title: "THE MANDALORIAN", year: "2019", genre: "SCI-FI", rating: "8.7", imdb: "tt8111088" },
  { title: "LOKI", year: "2021", genre: "SCI-FI", rating: "8.2", imdb: "tt9140554" },
  { title: "INVINCIBLE", year: "2021", genre: "ACTION", rating: "8.7", imdb: "tt6741278" },
  { title: "ARCANE", year: "2021", genre: "FANTASY", rating: "9.0", imdb: "tt11126994" },
  { title: "ATTACK ON TITAN", year: "2013", genre: "ANIME", rating: "9.0", imdb: "tt2560140" },
  { title: "DEATH NOTE", year: "2006", genre: "ANIME", rating: "9.0", imdb: "tt0877057" },
  { title: "ONE PUNCH MAN", year: "2015", genre: "ANIME", rating: "8.7", imdb: "tt4508902" },
  { title: "SHERLOCK", year: "2010", genre: "MYSTERY", rating: "9.1", imdb: "tt1475582" },
  { title: "BAND OF BROTHERS", year: "2001", genre: "WAR", rating: "9.5", imdb: "tt0185906" },
  { title: "ROME", year: "2005", genre: "HISTORY", rating: "8.7", imdb: "tt0384766" },
  { title: "THE WIRE", year: "2002", genre: "CRIME", rating: "9.3", imdb: "tt0306414" },
  { title: "THE SOPRANOS", year: "1999", genre: "CRIME", rating: "9.2", imdb: "tt0141842" },
  { title: "MAD MEN", year: "2007", genre: "DRAMA", rating: "8.7", imdb: "tt0804503" },
  { title: "TWIN PEAKS", year: "1990", genre: "MYSTERY", rating: "8.8", imdb: "tt0098936" },
  { title: "DEXTER", year: "2006", genre: "CRIME", rating: "8.6", imdb: "tt0773262" },
  { title: "PRISON BREAK", year: "2005", genre: "ACTION", rating: "8.3", imdb: "tt0455275" },
  { title: "24", year: "2001", genre: "ACTION", rating: "8.4", imdb: "tt0285331" },
  { title: "LOST", year: "2004", genre: "MYSTERY", rating: "8.3", imdb: "tt0411008" },
  { title: "BLACK MIRROR", year: "2011", genre: "SCI-FI", rating: "8.8", imdb: "tt2085059" },
  { title: "RICK AND MORTY", year: "2013", genre: "COMEDY", rating: "9.1", imdb: "tt2861424" },
  { title: "THE BEAR", year: "2022", genre: "DRAMA", rating: "8.5", imdb: "tt14452776" },
  { title: "BARRY", year: "2018", genre: "COMEDY", rating: "8.4", imdb: "tt5657502" },
  { title: "FLEABAG", year: "2016", genre: "COMEDY", rating: "8.7", imdb: "tt5687612" },
  { title: "ABBOTT ELEMENTARY", year: "2021", genre: "COMEDY", rating: "8.2", imdb: "tt14218830" },
  { title: "WHAT WE DO SHADOWS", year: "2019", genre: "COMEDY", rating: "8.6", imdb: "tt7908628" },
  { title: "IT CROWD", year: "2006", genre: "COMEDY", rating: "8.6", imdb: "tt0487831" },
  { title: "CURB ENTHUSIASM", year: "2000", genre: "COMEDY", rating: "8.7", imdb: "tt0264235" },
  { title: "SILICON VALLEY", year: "2014", genre: "COMEDY", rating: "8.5", imdb: "tt2575988" },
  { title: "VEEP", year: "2012", genre: "COMEDY", rating: "8.3", imdb: "tt1871659" },
  { title: "YELLOWSTONE", year: "2018", genre: "DRAMA", rating: "8.7", imdb: "tt4236770" },
  { title: "SHOGUN", year: "2024", genre: "HISTORY", rating: "8.9", imdb: "tt2788316" },
  { title: "FALLOUT", year: "2024", genre: "SCI-FI", rating: "8.5", imdb: "tt12637874" },
  { title: "THE SOPRANOS", year: "1999", genre: "CRIME", rating: "9.2", imdb: "tt0141842" },
  { title: "DEXTER", year: "2006", genre: "CRIME", rating: "8.6", imdb: "tt0773262" },
  { title: "SUPERNATURAL", year: "2005", genre: "FANTASY", rating: "8.4", imdb: "tt0460681" },
  { title: "ARROW", year: "2012", genre: "ACTION", rating: "7.6", imdb: "tt2193021" },
  { title: "THE FLASH", year: "2014", genre: "ACTION", rating: "7.6", imdb: "tt3107288" },
];

const ACCENT_COLORS = [
  "#e94560", "#c9a84c", "#cc0000", "#d4a017", "#c8a951", "#4a90d9",
  "#8b7355", "#2196f3", "#4caf50", "#7c4dff", "#00bcd4", "#e91e8c",
  "#9e9e9e", "#3d5afe", "#f44336", "#e040fb", "#8bc34a", "#00e5ff",
  "#ffeb3b", "#66bb6a", "#ba68c8", "#ff8f00", "#ffa726", "#ff6400",
  "#cc3300", "#009688", "#795548", "#607d8b", "#e91e63", "#9c27b0",
];

// Pre-assign accent colors and generate color1/color2
MOVIES.forEach((m, i) => {
  m.accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
  const hex = m.accent.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  m.color1 = `rgb(${Math.floor(r * 0.1)},${Math.floor(g * 0.1)},${Math.floor(b * 0.1)})`;
  m.color2 = m.accent;
});

const CW = 148, CH = 220, PAD = 16, ROWS = 5;
const ANGLE_DEG = -15;
const ANGLE_RAD = ANGLE_DEG * Math.PI / 180;
const SPEEDS = [25, 20, 30, 22, 28]; // slower
const DIRS = [1, -1, 1, -1, 1];

// ── Poster loading ───────────────────────────────────────────────────────────
const posterCache = new Map(); // imdb → HTMLImageElement | null

function getPosterUrl(imdb) {
  return `https://img.omdbapi.com/?i=${imdb}&apikey=trilogy&h=300`;
}

function loadPoster(imdb) {
  if (posterCache.has(imdb)) return Promise.resolve(posterCache.get(imdb));
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { posterCache.set(imdb, img); resolve(img); };
    img.onerror = () => { posterCache.set(imdb, null); resolve(null); };
    img.src = getPosterUrl(imdb);
  });
}

// ── Canvas background ────────────────────────────────────────────────────────
function PosterCanvas() {
  const canvasRef = useRef(null);
  const offsetsRef = useRef(new Array(ROWS).fill(0));
  const lastRef = useRef(null);
  const rafRef = useRef(null);
  const postersRef = useRef(new Map());

  // Load posters progressively
  useEffect(() => {
    const unique = [...new Map(MOVIES.map(m => [m.imdb, m])).values()];
    const CHUNK = 6;
    let cancelled = false;
    (async () => {
      for (let i = 0; i < unique.length; i += CHUNK) {
        if (cancelled) break;
        await Promise.all(
          unique.slice(i, i + CHUNK).map(async (m) => {
            const img = await loadPoster(m.imdb);
            if (img) postersRef.current.set(m.imdb, img);
          })
        );
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
    }

    function drawCard(m, x, y) {
      ctx.save();
      roundRect(x, y, CW, CH, 8);
      ctx.clip();

      const poster = postersRef.current.get(m.imdb);
      if (poster) {
        ctx.drawImage(poster, x, y, CW, CH);
        const ov = ctx.createLinearGradient(x, y, x, y + CH);
        ov.addColorStop(0, "rgba(0,0,0,0.08)");
        ov.addColorStop(0.55, "rgba(0,0,0,0.1)");
        ov.addColorStop(0.75, "rgba(0,0,0,0.65)");
        ov.addColorStop(1, "rgba(0,0,0,0.93)");
        ctx.fillStyle = ov;
        ctx.fillRect(x, y, CW, CH);
      } else {
        // Fallback gradient card
        ctx.fillStyle = m.color1;
        ctx.fillRect(x, y, CW, CH);
        const g = ctx.createLinearGradient(x, y, x, y + CH * 0.6);
        g.addColorStop(0, m.color2 + "cc");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(x, y, CW, CH);
        const rg = ctx.createRadialGradient(x + CW / 2, y + CH * 0.3, 0, x + CW / 2, y + CH * 0.3, CW * 0.7);
        rg.addColorStop(0, m.accent + "22");
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.fillRect(x, y, CW, CH);
        const bot = ctx.createLinearGradient(x, y + CH * 0.5, x, y + CH);
        bot.addColorStop(0, "transparent");
        bot.addColorStop(1, "rgba(0,0,0,0.9)");
        ctx.fillStyle = bot;
        ctx.fillRect(x, y, CW, CH);
      }

      // Bottom genre/rating bar
      ctx.fillStyle = m.accent;
      ctx.fillRect(x, y + CH - 26, CW, 26);
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(x, y + CH - 26, CW, 26);

      ctx.font = "bold 10px Arial,sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.textAlign = "left";
      ctx.fillText(m.genre, x + 8, y + CH - 11);
      ctx.textAlign = "right";
      ctx.fillStyle = m.accent;
      ctx.fillText("★ " + m.rating, x + CW - 8, y + CH - 11);

      // Title
      const words = m.title.split(" ");
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(0,0,0,0.95)";
      ctx.shadowBlur = 10;
      if (words.length <= 2) {
        ctx.font = "bold 12px Arial,sans-serif";
        ctx.fillText(m.title, x + 8, y + CH - 34);
      } else {
        ctx.font = "bold 11px Arial,sans-serif";
        ctx.fillText(words.slice(0, 2).join(" "), x + 8, y + CH - 45);
        ctx.fillText(words.slice(2).join(" "), x + 8, y + CH - 32);
      }
      ctx.shadowBlur = 0;

      // Year + accent strip
      ctx.font = "bold 9px Arial,sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "left";
      ctx.fillText(m.year, x + 8, y + 14);
      ctx.fillStyle = m.accent;
      ctx.fillRect(x, y + 18, 3, 14);

      ctx.restore();

      // Border
      ctx.save();
      roundRect(x, y, CW, CH, 8);
      ctx.strokeStyle = m.accent + "55";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    const colStep = CW + PAD;
    const rowH = CH + PAD;
    const stripLen = MOVIES.length * colStep;

    function drawFrame(ts) {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;

      ctx.clearRect(0, 0, W, H);

      const diag = Math.sqrt(W * W + H * H) + 300;
      const totalRowsH = ROWS * rowH;

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(ANGLE_RAD);

      for (let row = 0; row < ROWS; row++) {
        offsetsRef.current[row] =
          (offsetsRef.current[row] + SPEEDS[row] * DIRS[row] * dt + stripLen * 1000) % stripLen;

        const y = -totalRowsH / 2 + row * rowH;
        const halfW = diag;
        const numCards = Math.ceil((halfW * 2) / colStep) + 6;
        const tileOffset = offsetsRef.current[row];

        for (let i = 0; i < numCards; i++) {
          const rawX = -halfW + i * colStep - tileOffset;
          for (let wrap = 0; wrap < 3; wrap++) {
            const fx = rawX + wrap * stripLen;
            if (fx + CW < -halfW - colStep || fx > halfW + colStep) continue;
            const idx = ((i % MOVIES.length) + MOVIES.length) % MOVIES.length;
            drawCard(MOVIES[idx], fx, y);
          }
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(drawFrame);
    }

    rafRef.current = requestAnimationFrame(drawFrame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}

// ── Score bar ────────────────────────────────────────────────────────────────
function StarBar({ score }) {
  const pct = Math.round(score * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#ff6400,#ff9a00)", borderRadius: "2px" }} />
      </div>
      <span style={{ color: "#fff", fontSize: "11px", opacity: 0.7 }}>{pct}%</span>
    </div>
  );
}

// ── Recommendation card ──────────────────────────────────────────────────────
function RecCard({ rec, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,100,0,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(255,100,0,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        padding: "20px",
        transition: "all 0.3s",
        transform: hov ? "translateY(-2px)" : "none",
        animation: `fadeUp 0.4s ease ${index * 0.05}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          background: "linear-gradient(135deg,#ff6400,#cc3300)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "#fff",
          flexShrink: 0, boxShadow: "0 4px 20px rgba(255,100,0,0.4)",
        }}>{index + 1}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: "#fff", fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "17px", letterSpacing: "1.5px", marginBottom: "10px",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{rec.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[["CF", rec.cf_score], ["CB", rec.cb_score]].map(([lbl, score]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "1px", fontFamily: "monospace", width: "30px" }}>{lbl}</span>
                <StarBar score={score} />
              </div>
            ))}
          </div>
        </div>
        <div style={{
          background: "rgba(255,100,0,0.15)", border: "1px solid rgba(255,100,0,0.3)",
          borderRadius: "8px", padding: "8px 12px", textAlign: "center", flexShrink: 0,
        }}>
          <div style={{ color: "#ff6400", fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", lineHeight: 1 }}>
            {Math.round(rec.hybrid_score * 100)}
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", letterSpacing: "1px", fontFamily: "monospace", marginTop: "2px" }}>SCORE</div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers] = useState(Array.from({ length: 50 }, (_, i) => i + 1));
  const [selectedUser, setSelectedUser] = useState(1);
  const [alpha, setAlpha] = useState(0.6);
  const [topN, setTopN] = useState(10);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then(r => r.json())
      .then(d => { if (d.users?.length) setUsers(d.users); })
      .catch(() => {});
  }, []);

  const fetchRecs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/recommend?user_id=${selectedUser}&alpha=${alpha}&top_n=${topN}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRecs(data.recommendations || []);
      setFetched(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const sliderBg = `linear-gradient(to right,#ff6400 0%,#ff6400 ${alpha * 100}%,rgba(255,255,255,0.15) ${alpha * 100}%,rgba(255,255,255,0.15) 100%)`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; background: #080c14; }
        body { font-family: 'DM Sans', sans-serif; overflow: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #ff6400; border-radius: 3px; }
        select {
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff6400' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
          background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; cursor: pointer;
        }
        .asl { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; outline: none; margin-top: 10px; cursor: pointer; }
        .asl::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #ff6400; cursor: pointer; box-shadow: 0 0 12px rgba(255,100,0,0.6); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes spin  { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ── Canvas background ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#080c14" }}>
        <PosterCanvas />

        {/* Central vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(8,12,20,0.35) 0%, rgba(8,12,20,0.85) 100%)" }} />

        {/* Edge vignettes — all four sides to eliminate blank corners */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "220px", background: "linear-gradient(#080c14 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", background: "linear-gradient(transparent 0%, #080c14 100%)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "220px", background: "linear-gradient(to right, #080c14 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "220px", background: "linear-gradient(to left, #080c14 0%, transparent 100%)" }} />
      </div>

      {/* ── UI layer ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 10,
        overflowY: "auto", display: "flex", flexDirection: "column",
        alignItems: "center", padding: "48px 20px 60px",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,100,0,0.12)", border: "1px solid rgba(255,100,0,0.3)",
            borderRadius: "20px", padding: "6px 16px", marginBottom: "18px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff6400", animation: "pulse 1.5s ease-in-out infinite" }} />
            <span style={{ color: "#ff6400", fontSize: "11px", letterSpacing: "2px", fontFamily: "'Bebas Neue',sans-serif" }}>HYBRID AI ENGINE</span>
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,9vw,96px)",
            letterSpacing: "6px", color: "#fff", lineHeight: 0.9,
            textShadow: "0 0 80px rgba(255,100,0,0.4)",
          }}>
            CINE<span style={{ color: "#ff6400" }}>MATCH</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "12px", letterSpacing: "3px", fontFamily: "'Bebas Neue',sans-serif", marginTop: "10px" }}>
            COLLABORATIVE · CONTENT-BASED · BLENDED INTELLIGENCE
          </p>
        </div>

        {/* Control panel */}
        <div style={{
          width: "100%", maxWidth: "680px",
          background: "rgba(8,12,20,0.78)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "28px" }}>
            {/* User select */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "2px", fontFamily: "'Bebas Neue',sans-serif", marginBottom: "8px" }}>USER ID</label>
              <select
                value={selectedUser}
                onChange={e => setSelectedUser(Number(e.target.value))}
                style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", color: "#fff", padding: "12px 36px 12px 14px", fontSize: "14px", outline: "none" }}
              >
                {users.map(u => <option key={u} value={u} style={{ background: "#0f1624" }}>User {u}</option>)}
              </select>
            </div>

            {/* Alpha slider */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "2px", fontFamily: "'Bebas Neue',sans-serif", marginBottom: "8px" }}>
                CF WEIGHT (α = {alpha.toFixed(2)})
              </label>
              <input
                type="range" className="asl"
                min="0" max="1" step="0.05" value={alpha}
                onChange={e => setAlpha(parseFloat(e.target.value))}
                style={{ background: sliderBg }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>Content</span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>Collab</span>
              </div>
            </div>

            {/* Top-N select */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "2px", fontFamily: "'Bebas Neue',sans-serif", marginBottom: "8px" }}>TOP N</label>
              <select
                value={topN}
                onChange={e => setTopN(Number(e.target.value))}
                style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", color: "#fff", padding: "12px 36px 12px 14px", fontSize: "14px", outline: "none" }}
              >
                {[5, 10, 15, 20].map(n => <option key={n} value={n} style={{ background: "#0f1624" }}>Top {n}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={fetchRecs}
            disabled={loading}
            style={{
              width: "100%", padding: "16px",
              background: loading ? "rgba(255,100,0,0.3)" : "linear-gradient(135deg,#ff6400,#cc4400)",
              border: "none", borderRadius: "12px", color: "#fff",
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", letterSpacing: "3px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 8px 30px rgba(255,100,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            }}
          >
            {loading
              ? <><div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> COMPUTING…</>
              : "▶  GET RECOMMENDATIONS"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ width: "100%", maxWidth: "680px", background: "rgba(255,100,0,0.1)", border: "1px solid rgba(255,100,0,0.3)", borderRadius: "12px", padding: "16px 20px", color: "#ffaa66", fontSize: "13px", marginTop: "20px", fontFamily: "monospace" }}>
            ⚠ {error} — Make sure the FastAPI server is running on port 5000.
          </div>
        )}

        {/* Results */}
        {fetched && recs.length > 0 && (
          <div style={{ width: "100%", maxWidth: "680px", marginTop: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "3px", color: "#fff" }}>
                PICKS FOR <span style={{ color: "#ff6400" }}>USER {selectedUser}</span>
              </div>
              <div style={{ background: "rgba(255,100,0,0.15)", border: "1px solid rgba(255,100,0,0.3)", borderRadius: "20px", padding: "4px 12px", color: "#ff6400", fontSize: "12px", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1px" }}>
                α = {alpha.toFixed(2)} · {recs.length} RESULTS
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "14px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              {[["CF", "Collaborative Filter (SVD)"], ["CB", "Content-Based (LightFM)"], ["SCORE", "Hybrid Blend"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#ff6400", letterSpacing: "1px" }}>{k}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recs.map((rec, i) => <RecCard key={`${rec.item_id}-${i}`} rec={rec} index={i} />)}
            </div>
          </div>
        )}

        {fetched && recs.length === 0 && !loading && !error && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: "2px", marginTop: "20px" }}>
            NO RECOMMENDATIONS FOUND FOR THIS USER
          </div>
        )}

        <div style={{ marginTop: "60px", color: "rgba(255,255,255,0.12)", fontSize: "11px", letterSpacing: "2px", fontFamily: "'Bebas Neue',sans-serif", textAlign: "center" }}>
          HYBRID RECOMMENDER · SVD + LIGHTFM · ML-100K DATASET
        </div>
      </div>
    </>
  );
}