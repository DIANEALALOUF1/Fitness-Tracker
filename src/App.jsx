import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PLAN = [
  {
    id: "d1", day: "Day 1", schedule: "Monday",
    title: "Glutes, Hamstrings & Core", emoji: "🍑", color: "#c9504a",
    cardio: { icon: "🪢", name: "Jump Rope Intervals", duration: "15 mins", desc: "3 mins easy → 8 mins 40s fast/20s easy intervals → 4 mins cool-down." },
    exercises: [
      { id: "e1", name: "Hip Thrust", sets: "4 sets · 12–15 reps · 60s rest", tip: "Squeeze hard at the top, hold 1 second. Drive through your heels.", video: "https://www.youtube.com/results?search_query=hip+thrust+form+tutorial+women" },
      { id: "e2", name: "Romanian Deadlift", sets: "3 sets · 10–12 reps · 60s rest", tip: "Hinge at the hips, feel the stretch down the back of your legs. Keep a flat back.", video: "https://www.youtube.com/results?search_query=romanian+deadlift+women+tutorial" },
      { id: "e3", name: "Donkey Kick + Fire Hydrant", sets: "3 sets · 15 reps/side · 45s rest", tip: "Back-to-back with no rest between. Burns out the glute medius for that round shape.", video: "https://www.youtube.com/results?search_query=donkey+kick+fire+hydrant+glutes+tutorial" },
      { id: "e4", name: "Plank to Knee Tap", sets: "3 sets · 20 reps · 45s rest", tip: "From plank, tap opposite knee across. Hold form — don't rush it.", video: "https://www.youtube.com/results?search_query=plank+knee+tap+core+exercise+tutorial" },
    ],
  },
  {
    id: "d2", day: "Day 2", schedule: "Wednesday",
    title: "Upper Body & Shoulders", emoji: "💪", color: "#7a6fa8",
    cardio: { icon: "🏃‍♀️", name: "Incline Treadmill Walk", duration: "15 mins", desc: "3.5–4mph at 8–12% incline. Or jump rope: 45s fast / 15s rest × 10 rounds." },
    exercises: [
      { id: "e5", name: "Dumbbell Lateral Raise", sets: "4 sets · 15 reps · 45s rest", tip: "Creates round 3D shoulders. Light weight, full range. Raise until arms are parallel to floor.", video: "https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form+women+shoulder" },
      { id: "e6", name: "Seated Shoulder Press", sets: "3 sets · 10–12 reps · 60s rest", tip: "Sit upright, press up and slightly in. Keep elbows at 90° at the bottom.", video: "https://www.youtube.com/results?search_query=seated+dumbbell+shoulder+press+form+tutorial" },
      { id: "e7", name: "Bent-Over Dumbbell Row", sets: "3 sets · 12 reps/side · 60s rest", tip: "Pull toward your hip — not your shoulder. Squeeze at the top.", video: "https://www.youtube.com/results?search_query=dumbbell+bent+over+row+form+tutorial+women" },
      { id: "e8", name: "Bicep Curl + Tricep Extension", sets: "3 rounds · 12 + 12 reps · 60s rest", tip: "Superset these back-to-back for defined arms. Curls: elbows pinned to sides.", video: "https://www.youtube.com/results?search_query=bicep+curl+tricep+extension+superset+women+dumbbell" },
    ],
  },
  {
    id: "d3", day: "Day 3", schedule: "Friday",
    title: "Legs, Quads & Inner Thighs", emoji: "🦵", color: "#4a8b7a",
    cardio: { icon: "🚴‍♀️", name: "Stationary Bike Intervals", duration: "15–20 mins", desc: "3 mins easy → 8 rounds 40s high resistance / 20s easy spin → 4 mins cool-down." },
    exercises: [
      { id: "e9", name: "Goblet Squat", sets: "4 sets · 12–15 reps · 60s rest", tip: "Hold one heavy dumbbell at chest. Toes slightly out. Sit deep — chest tall.", video: "https://www.youtube.com/results?search_query=goblet+squat+form+tutorial+women" },
      { id: "e10", name: "Reverse Lunge", sets: "3 sets · 10 reps/leg · 60s rest", tip: "Step backward — kinder on knees. Keep front knee over ankle, not past toes.", video: "https://www.youtube.com/results?search_query=reverse+lunge+dumbbell+women+tutorial" },
      { id: "e11", name: "Sumo Squat Pulse", sets: "3 sets · 30 sec pulse · 45s rest", tip: "Wide stance, toes out 45°. Lower then pulse 2 inches. Burns inner thighs instantly!", video: "https://www.youtube.com/results?search_query=sumo+squat+pulse+inner+thigh+women" },
      { id: "e12", name: "Leg Press", sets: "3 sets · 12 reps · 75s rest", tip: "Feet high and wide on platform to target glutes. Go heavy. Control the lowering phase.", video: "https://www.youtube.com/results?search_query=leg+press+high+foot+placement+glutes+tutorial" },
    ],
  },
  {
    id: "d4", day: "Day 4", schedule: "Saturday",
    title: "Full Body Burn & Abs", emoji: "🔥", color: "#c87c2a",
    cardio: { icon: "💃", name: "Jump Rope HIIT", duration: "20 mins", desc: "5 rounds: 1 min fast / 30s rest / 1 min alternating feet / 30s rest / 30s fast singles." },
    exercises: [
      { id: "e13", name: "Dumbbell Deadlift", sets: "4 sets · 10 reps · 75s rest", tip: "Full-body compound — glutes, hamstrings, back, core all at once. Push the floor away.", video: "https://www.youtube.com/results?search_query=dumbbell+deadlift+women+form+tutorial" },
      { id: "e14", name: "Push-Up", sets: "3 sets · 8–12 reps · 60s rest", tip: "Start on knees if needed. Focus on chest touching the ground. Add 1 rep each week.", video: "https://www.youtube.com/results?search_query=push+up+form+women+modified+tutorial" },
      { id: "e15", name: "Glute Bridge Abduction", sets: "3 sets · 15 reps · 45s rest", tip: "Band above knees. In bridge, drive knees out. Creates that lifted, round shape.", video: "https://www.youtube.com/results?search_query=glute+bridge+band+abduction+tutorial+women" },
      { id: "e16", name: "Bicycle Crunch", sets: "3 sets · 20 reps · 45s rest", tip: "Slow and controlled. Elbow to opposite knee with a twist. Don't pull on your neck.", video: "https://www.youtube.com/results?search_query=bicycle+crunch+correct+form+tutorial" },
    ],
  },
];

const ACTIVITY_TYPES = [
  { label: "Walking", emoji: "🚶‍♀️" }, { label: "Running", emoji: "🏃" },
  { label: "Swimming", emoji: "🏊‍♀️" }, { label: "Cycling", emoji: "🚴‍♀️" },
  { label: "Jump Rope", emoji: "🪢" }, { label: "Yoga", emoji: "🧘‍♀️" }, { label: "Other", emoji: "⚡" },
];

const TIPS = [
  { icon: "🍑", title: "For the booty", text: "Hip thrusts and RDLs are your best friends. Go heavier over time — progressive overload is what actually builds shape." },
  { icon: "🥩", title: "Protein", text: "Aim for 0.7–1g per pound of bodyweight daily. Without enough protein, you won't tone or grow." },
  { icon: "📈", title: "Progressive overload", text: "Every 1–2 weeks, add a rep, a set, or a little weight. This is the only way muscles change." },
  { icon: "💧", title: "Hydration", text: "Drink 2–3L of water daily. Dehydration kills performance and slows fat loss." },
  { icon: "😴", title: "Sleep", text: "7–9 hours. This is when fat-burning hormones do their best work." },
  { icon: "⚡", title: "Weight selection", text: "The last 2–3 reps should feel genuinely challenging. If you finish easily, go heavier." },
];

const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

function loadLocal(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveLocal(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function Card({ children, style = {} }) {
  return <div style={{ background: "#231419", borderRadius: 16, padding: 20, marginBottom: 14, border: "1px solid #2e1f22", ...style }}>{children}</div>;
}
function Btn({ children, onClick, variant = "primary", style = {}, disabled = false }) {
  const vs = { primary: { background: "#c9504a", color: "white", border: "none" }, soft: { background: "#2e1f22", color: "#f2c4c4", border: "none" }, ghost: { background: "transparent", color: "#c9504a", border: "1px solid #c9504a" } };
  return <button onClick={onClick} disabled={disabled} style={{ padding: "9px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, fontFamily: "inherit", ...vs[variant], ...style }}>{children}</button>;
}
function Input({ value, onChange, placeholder, type = "text", style = {} }) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%", ...style }} />;
}
function Sel({ value, onChange, children }) {
  return <select value={value} onChange={onChange} style={{ background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%", cursor: "pointer" }}>{children}</select>;
}
function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", background: "#1a1014", borderBottom: "1px solid #2e1f22", overflowX: "auto", scrollbarWidth: "none" }}>
      {tabs.map(t => <button key={t.id} onClick={() => onSelect(t.id)} style={{ flex: "0 0 auto", padding: "13px 16px", background: "none", border: "none", borderBottom: active === t.id ? "2px solid #c9504a" : "2px solid transparent", color: active === t.id ? "#f2c4c4" : "#666", fontSize: 12, fontFamily: "inherit", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{t.label}</button>)}
    </div>
  );
}

function PlanTab({ onStartDay }) {
  const [open, setOpen] = useState(null);
  const [checked, setChecked] = useState(() => loadLocal("plan-checked", {}));
  const [showTips, setShowTips] = useState(false);

  function toggleCheck(dayId, exId) {
    const key = `${dayId}-${exId}`;
    const updated = { ...checked, [key]: !checked[key] };
    setChecked(updated);
    saveLocal("plan-checked", updated);
  }

  function resetDay(dayId) {
    const updated = { ...checked };
    Object.keys(updated).forEach(k => { if (k.startsWith(dayId)) delete updated[k]; });
    setChecked(updated);
    saveLocal("plan-checked", updated);
  }

  function dayProgress(day) {
    const total = day.exercises.length;
    const done = day.exercises.filter(e => checked[`${day.id}-${e.id}`]).length;
    return { done, total };
  }

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1e0f13, #3a1a1a)", borderRadius: 20, padding: "24px 20px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#c9504a", marginBottom: 8 }}>Your 4-Week Plan</div>
        <h2 style={{ fontSize: 22, color: "#f2c4c4", margin: "0 0 8px", fontStyle: "italic" }}>Train Hard, Glow Harder</h2>
        <p style={{ color: "#888", fontSize: 12, lineHeight: 1.6, margin: 0 }}>4 days · 50–60 mins · Tone, lift & burn 🍑</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {["🍑 Booty Focus", "🔥 Fat Loss", "💪 Full Body", "🎧 Cardio"].map(b => (
            <span key={b} style={{ background: "rgba(201,80,74,0.15)", border: "1px solid rgba(201,80,74,0.3)", borderRadius: 100, padding: "4px 12px", fontSize: 11, color: "#f2c4c4" }}>{b}</span>
          ))}
        </div>
      </div>

      {PLAN.map(day => {
        const { done, total } = dayProgress(day);
        const isOpen = open === day.id;
        const pct = Math.round((done / total) * 100);
        return (
          <div key={day.id} style={{ background: "#231419", borderRadius: 16, marginBottom: 12, border: `1px solid ${isOpen ? day.color + "66" : "#2e1f22"}`, overflow: "hidden" }}>
            <div onClick={() => setOpen(isOpen ? null : day.id)} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{day.emoji}</span>
                <div>
                  <div style={{ fontSize: 11, color: day.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>{day.day} · {day.schedule}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#f0e0e0" }}>{day.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <div style={{ height: 4, width: 80, background: "#1a1014", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: day.color, borderRadius: 10, transition: "width 0.3s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#666" }}>{done}/{total} done</span>
                  </div>
                </div>
              </div>
              <span style={{ color: "#555", fontSize: 18, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▾</span>
            </div>
            {isOpen && (
              <div style={{ padding: "0 18px 18px", borderTop: "1px solid #2e1f22" }}>
                <div style={{ background: "#1a1014", borderRadius: 12, padding: "12px 14px", margin: "14px 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>{day.cardio.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f2c4c4", marginBottom: 3 }}>Cardio: {day.cardio.name} — {day.cardio.duration}</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{day.cardio.desc}</div>
                  </div>
                </div>
                {day.exercises.map(ex => {
                  const isChecked = !!checked[`${day.id}-${ex.id}`];
                  return (
                    <div key={ex.id} style={{ background: "#1a1014", borderRadius: 12, padding: "14px", marginBottom: 10, border: `1px solid ${isChecked ? day.color + "55" : "#2e1f22"}`, opacity: isChecked ? 0.7 : 1, transition: "all 0.2s" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                        <button onClick={() => toggleCheck(day.id, ex.id)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${isChecked ? day.color : "#3a2530"}`, background: isChecked ? day.color : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                          {isChecked && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: isChecked ? "#888" : "#f0e0e0", textDecoration: isChecked ? "line-through" : "none", marginBottom: 3 }}>{ex.name}</div>
                          <div style={{ fontSize: 12, color: "#c9504a", marginBottom: 4 }}>{ex.sets}</div>
                          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{ex.tip}</div>
                        </div>
                      </div>
                      <a href={ex.video} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#231419", color: "#f2c4c4", borderRadius: 100, padding: "6px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid #2e1f22" }}>
                        ▶ Watch Tutorial
                      </a>
                    </div>
                  );
                })}
                <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                  <Btn onClick={() => onStartDay(day)} style={{ flex: 1 }}>🏋️ Log This Workout</Btn>
                  <Btn variant="soft" onClick={() => resetDay(day.id)} style={{ fontSize: 12 }}>↺ Reset</Btn>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ background: "linear-gradient(135deg, #1a1410, #1e1a10)", borderRadius: 16, padding: "20px", marginBottom: 12, border: "1px solid #2e2a1f", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🌸</div>
        <div style={{ fontWeight: 700, color: "#e0d0a0", marginBottom: 6 }}>Tue, Thu, Sun — Rest Days</div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>Recovery is training. Light walk, stretch, or yoga only. This is when your glutes actually grow. 💪</div>
      </div>

      <button onClick={() => setShowTips(!showTips)} style={{ width: "100%", background: "#1a1014", border: "1px solid #2e1f22", borderRadius: 14, padding: "14px 18px", cursor: "pointer", color: "#f2c4c4", fontSize: 14, fontWeight: 600, fontFamily: "inherit", textAlign: "left", marginBottom: 12 }}>
        {showTips ? "▾" : "▸"} &nbsp;🌟 Glow-Up Tips & Nutrition Guide
      </button>
      {showTips && (
        <div style={{ background: "linear-gradient(135deg, #1e0f13, #2b1a1a)", borderRadius: 16, padding: "20px", marginBottom: 16, border: "1px solid #3a1f22" }}>
          {TIPS.map(t => (
            <div key={t.title} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f2c4c4", marginBottom: 3 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LogWorkout({ onSave, preselectedDay, onClearPreselect }) {
  const [step, setStep] = useState(preselectedDay ? "log" : "pick");
  const [chosenDay, setChosenDay] = useState(preselectedDay || null);
  const [date, setDate] = useState(today());
  const [sets, setSets] = useState(() => {
    if (preselectedDay) {
      const init = {};
      preselectedDay.exercises.forEach(e => { init[e.name] = [{ reps: "", weight: "", unit: "kg" }]; });
      return init;
    }
    return {};
  });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (preselectedDay) {
      setChosenDay(preselectedDay);
      const init = {};
      preselectedDay.exercises.forEach(e => { init[e.name] = [{ reps: "", weight: "", unit: "kg" }]; });
      setSets(init);
      setStep("log");
      onClearPreselect();
    }
  }, [preselectedDay]);

  function pickDay(d) {
    setChosenDay(d);
    const init = {};
    d.exercises.forEach(e => { init[e.name] = [{ reps: "", weight: "", unit: "kg" }]; });
    setSets(init);
    setStep("log");
  }

  function addSet(ex) { setSets(p => ({ ...p, [ex]: [...p[ex], { reps: "", weight: "", unit: "kg" }] })); }
  function removeSet(ex, i) { setSets(p => ({ ...p, [ex]: p[ex].filter((_, idx) => idx !== i) })); }
  function updSet(ex, i, f, v) { setSets(p => ({ ...p, [ex]: p[ex].map((s, idx) => idx === i ? { ...s, [f]: v } : s) })); }

  async function handleSave() {
    await onSave({ id: Date.now(), type: "workout", date, day: chosenDay.title, emoji: chosenDay.emoji, color: chosenDay.color, sets, notes });
    setStep("done");
  }

  if (step === "done") return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 24, color: "#f2c4c4", marginBottom: 8 }}>Workout Saved!</h2>
      <p style={{ color: "#888", marginBottom: 28 }}>Great work. Recovery starts now.</p>
      <Btn onClick={() => { setStep("pick"); setChosenDay(null); setNotes(""); }}>Log Another</Btn>
    </div>
  );

  if (step === "pick") return (
    <div>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>Which workout today?</p>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>Date</label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      {PLAN.map(d => (
        <button key={d.id} onClick={() => pickDay(d)} style={{ width: "100%", background: "#1a1014", border: `1px solid ${d.color}33`, borderRadius: 14, padding: "16px 18px", marginBottom: 10, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{d.emoji}</span>
          <div>
            <div style={{ color: "#f0e0e0", fontWeight: 600, fontSize: 14 }}>{d.title}</div>
            <div style={{ color: "#555", fontSize: 11, marginTop: 3 }}>{d.exercises.map(e => e.name).join(" · ")}</div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={() => setStep("pick")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 20 }}>←</button>
        <span style={{ fontSize: 20 }}>{chosenDay.emoji}</span>
        <h2 style={{ fontSize: 17, color: "#f2c4c4", margin: 0 }}>{chosenDay.title}</h2>
      </div>
      {chosenDay.exercises.map(ex => (
        <Card key={ex.name}>
          <div style={{ fontWeight: 700, color: "#f2c4c4", marginBottom: 10, fontSize: 14 }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: chosenDay.color, marginBottom: 10 }}>{ex.sets}</div>
          {(sets[ex.name] || []).map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 58px 28px", gap: 7, marginBottom: 7, alignItems: "center" }}>
              <Input value={s.reps} onChange={e => updSet(ex.name, i, "reps", e.target.value)} placeholder="Reps" type="number" />
              <Input value={s.weight} onChange={e => updSet(ex.name, i, "weight", e.target.value)} placeholder="Weight" type="number" />
              <Sel value={s.unit} onChange={e => updSet(ex.name, i, "unit", e.target.value)}>
                <option>kg</option><option>lbs</option><option>bw</option>
              </Sel>
              <button onClick={() => removeSet(ex.name, i)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 17 }}>×</button>
            </div>
          ))}
          <Btn variant="soft" onClick={() => addSet(ex.name)} style={{ fontSize: 11, padding: "5px 12px", marginTop: 2 }}>+ Set</Btn>
        </Card>
      ))}
      <Card>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="How did it feel? Any PRs? 💪" style={{ width: "100%", background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 70, resize: "vertical" }} />
      </Card>
      <Btn onClick={handleSave} style={{ width: "100%", padding: 13, fontSize: 14, borderRadius: 14 }}>💾 Save Workout</Btn>
    </div>
  );
}

function LogActivity({ onSave }) {
  const [type, setType] = useState("Walking");
  const [date, setDate] = useState(today());
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [distUnit, setDistUnit] = useState("km");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  async function handleSave() {
    await onSave({ id: Date.now(), type: "activity", activityType: type, emoji: ACTIVITY_TYPES.find(a => a.label === type)?.emoji || "⚡", date, duration, distance, distUnit, notes });
    setDone(true);
  }

  if (done) return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontSize: 24, color: "#f2c4c4", marginBottom: 8 }}>Activity Logged!</h2>
      <p style={{ color: "#888", marginBottom: 28 }}>Every move counts.</p>
      <Btn onClick={() => { setDone(false); setDuration(""); setDistance(""); setNotes(""); }}>Log Another</Btn>
    </div>
  );

  return (
    <div>
      <Card>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 10, letterSpacing: 2, textTransform: "uppercase" }}>Activity Type</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {ACTIVITY_TYPES.map(a => (
            <button key={a.label} onClick={() => setType(a.label)} style={{ padding: "7px 13px", borderRadius: 100, border: "1px solid", borderColor: type === a.label ? "#c9504a" : "#2e1f22", background: type === a.label ? "#2e1f22" : "transparent", color: type === a.label ? "#f2c4c4" : "#666", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{a.emoji} {a.label}</button>
          ))}
        </div>
      </Card>
      <Card>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Date</label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </Card>
      <Card>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Duration (minutes)</label>
        <Input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 45" type="number" />
      </Card>
      <Card>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Distance (optional)</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: 7 }}>
          <Input value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 3.5" type="number" />
          <Sel value={distUnit} onChange={e => setDistUnit(e.target.value)}>
            <option>km</option><option>miles</option><option>m</option><option>laps</option>
          </Sel>
        </div>
      </Card>
      <Card>
        <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Notes / Garmin Stats</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Paste Garmin stats here — HR, pace, calories..." style={{ width: "100%", background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 70, resize: "vertical" }} />
        <p style={{ fontSize: 11, color: "#555", marginTop: 7 }}>💡 Garmin Connect → Activity → ··· → Share → paste here. Auto-fill coming in Phase 2!</p>
      </Card>
      <Btn onClick={handleSave} disabled={!duration} style={{ width: "100%", padding: 13, fontSize: 14, borderRadius: 14 }}>💾 Save Activity</Btn>
    </div>
  );
}

function History({ entries, onDelete }) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  if (!sorted.length) return <div style={{ textAlign: "center", padding: "48px 24px", color: "#555" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📋</div><p>No entries yet. Log your first workout!</p></div>;
  return (
    <div>
      {sorted.map(e => (
        <Card key={e.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{e.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#f2c4c4", fontSize: 14 }}>{e.type === "workout" ? e.day : e.activityType}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{fmtDate(e.date)}</div>
              </div>
            </div>
            <button onClick={() => onDelete(e.id)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 15, padding: 4 }}>🗑</button>
          </div>
          {e.type === "workout" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(e.sets).map(([ex, setArr]) => {
                const valid = setArr.filter(s => s.reps || s.weight);
                if (!valid.length) return null;
                return <div key={ex} style={{ background: "#1a1014", borderRadius: 8, padding: "5px 10px", fontSize: 11 }}><span style={{ color: "#666" }}>{ex}: </span>{valid.map((s, i) => <span key={i} style={{ color: "#f2c4c4" }}>{s.reps ? `${s.reps}×` : ""}{s.weight ? `${s.weight}${s.unit}` : "bw"}{i < valid.length - 1 ? " / " : ""}</span>)}</div>;
              })}
            </div>
          )}
          {e.type === "activity" && (
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {e.duration && <span style={{ background: "#1a1014", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#f2c4c4" }}>⏱ {e.duration} mins</span>}
              {e.distance && <span style={{ background: "#1a1014", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#f2c4c4" }}>📍 {e.distance} {e.distUnit}</span>}
            </div>
          )}
          {e.notes && <div style={{ marginTop: 8, fontSize: 11, color: "#666", fontStyle: "italic", borderTop: "1px solid #2e1f22", paddingTop: 8 }}>{e.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

function Progress({ entries }) {
  const workouts = entries.filter(e => e.type === "workout");
  const activities = entries.filter(e => e.type === "activity");
  const exerciseMap = {};
  workouts.forEach(w => {
    Object.entries(w.sets).forEach(([ex, sets]) => {
      sets.forEach(s => {
        if (s.weight && parseFloat(s.weight) > 0) {
          if (!exerciseMap[ex]) exerciseMap[ex] = [];
          exerciseMap[ex].push({ date: w.date, weight: parseFloat(s.weight) });
        }
      });
    });
  });
  const chartData = {};
  Object.entries(exerciseMap).forEach(([ex, recs]) => {
    const byDate = {};
    recs.forEach(r => { if (!byDate[r.date] || r.weight > byDate[r.date]) byDate[r.date] = r.weight; });
    chartData[ex] = Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, weight]) => ({ date: fmtDate(date), weight }));
  });
  const exercises = Object.keys(chartData);
  const [selEx, setSelEx] = useState(null);
  useEffect(() => { if (!selEx && exercises.length) setSelEx(exercises[0]); }, [exercises.length]);

  const actSum = {};
  activities.forEach(a => {
    if (!actSum[a.activityType]) actSum[a.activityType] = { count: 0, totalMins: 0, emoji: a.emoji };
    actSum[a.activityType].count++;
    actSum[a.activityType].totalMins += parseFloat(a.duration) || 0;
  });

  if (!entries.length) return <div style={{ textAlign: "center", padding: "48px 24px", color: "#555" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📈</div><p>Log some workouts to see your progress!</p></div>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[{ label: "Workouts", value: workouts.length, emoji: "💪" }, { label: "Activities", value: activities.length, emoji: "🏃‍♀️" }, { label: "Total Days", value: new Set(entries.map(e => e.date)).size, emoji: "📅" }].map(s => (
          <Card key={s.label} style={{ padding: "14px 10px", textAlign: "center", marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 5 }}>{s.emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f2c4c4" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      {exercises.length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, color: "#f2c4c4", marginBottom: 12, fontSize: 14 }}>💪 Strength Progress</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {exercises.map(ex => <button key={ex} onClick={() => setSelEx(ex)} style={{ padding: "5px 11px", borderRadius: 100, border: "1px solid", borderColor: selEx === ex ? "#c9504a" : "#2e1f22", background: selEx === ex ? "#2e1f22" : "transparent", color: selEx === ex ? "#f2c4c4" : "#666", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>{ex}</button>)}
          </div>
          {selEx && <ResponsiveContainer width="100%" height={180}><LineChart data={chartData[selEx]}><CartesianGrid strokeDasharray="3 3" stroke="#2e1f22" /><XAxis dataKey="date" tick={{ fill: "#666", fontSize: 10 }} /><YAxis tick={{ fill: "#666", fontSize: 10 }} /><Tooltip contentStyle={{ background: "#231419", border: "1px solid #2e1f22", borderRadius: 10, color: "#f2c4c4", fontSize: 12 }} /><Line type="monotone" dataKey="weight" stroke="#c9504a" strokeWidth={2} dot={{ fill: "#c9504a", r: 4 }} /></LineChart></ResponsiveContainer>}
        </Card>
      )}
      {Object.keys(actSum).length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, color: "#f2c4c4", marginBottom: 12, fontSize: 14 }}>🏃‍♀️ Activity Summary</div>
          {Object.entries(actSum).map(([type, data]) => (
            <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #2e1f22" }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center" }}><span style={{ fontSize: 18 }}>{data.emoji}</span><span style={{ color: "#f0e0e0", fontSize: 13 }}>{type}</span></div>
              <div style={{ textAlign: "right" }}><div style={{ color: "#f2c4c4", fontWeight: 700 }}>{data.count}×</div><div style={{ color: "#666", fontSize: 11 }}>{data.totalMins} mins</div></div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("plan");
  const [entries, setEntries] = useState(() => loadLocal("fitness-entries", []));
  const [preselectedDay, setPreselectedDay] = useState(null);

  function handleStartDay(day) {
    setPreselectedDay(day);
    setTab("log");
  }

  async function addEntry(entry) {
    const updated = [...entries, entry];
    setEntries(updated);
    saveLocal("fitness-entries", updated);
  }

  async function deleteEntry(id) {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveLocal("fitness-entries", updated);
  }

  const TABS = [
    { id: "plan", label: "📋 Plan" },
    { id: "log", label: "🏋️ Workout" },
    { id: "activity", label: "🚶 Activity" },
    { id: "history", label: "🕐 History" },
    { id: "progress", label: "📈 Progress" },
  ];

  return (
    <div style={{ background: "#120d0f", minHeight: "100vh", fontFamily: "sans-serif", color: "#f0e0e0" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { display: none; } input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.4); }`}</style>
      <div style={{ padding: "20px 18px 12px", background: "linear-gradient(180deg, #1e0f13 0%, #120d0f 100%)" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9504a", marginBottom: 3 }}>Your Fitness Journal</div>
        <h1 style={{ fontSize: 22, color: "#f2c4c4", margin: 0, fontStyle: "italic" }}>Train. Log. Glow. 🔥</h1>
      </div>
      <TabBar tabs={TABS} active={tab} onSelect={setTab} />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "18px 14px 80px" }}>
        {tab === "plan" && <PlanTab onStartDay={handleStartDay} />}
        {tab === "log" && <LogWorkout onSave={addEntry} preselectedDay={preselectedDay} onClearPreselect={() => setPreselectedDay(null)} />}
        {tab === "activity" && <LogActivity onSave={addEntry} />}
        {tab === "history" && <History entries={entries} onDelete={deleteEntry} />}
        {tab === "progress" && <Progress entries={entries} />}
      </div>
    </div>
  );
}
