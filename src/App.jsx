import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WORKOUT_PLAN = {
  "Day 1 – Glutes & Core": {
    emoji: "🍑", color: "#c9504a",
    exercises: ["Hip Thrust","Romanian Deadlift","Donkey Kick","Fire Hydrant","Plank to Knee Tap"],
  },
  "Day 2 – Upper Body": {
    emoji: "💪", color: "#7a6fa8",
    exercises: ["Lateral Raise","Shoulder Press","Bent-Over Row","Bicep Curl","Tricep Extension"],
  },
  "Day 3 – Legs & Quads": {
    emoji: "🦵", color: "#4a8b7a",
    exercises: ["Goblet Squat","Reverse Lunge","Sumo Squat Pulse","Leg Press"],
  },
  "Day 4 – Full Body Burn": {
    emoji: "🔥", color: "#c87c2a",
    exercises: ["Dumbbell Deadlift","Push-Up","Glute Bridge Abduction","Bicycle Crunch"],
  },
};

const ACTIVITY_TYPES = [
  { label: "Walking", emoji: "🚶‍♀️" },
  { label: "Running", emoji: "🏃‍♀️" },
  { label: "Swimming", emoji: "🏊‍♀️" },
  { label: "Cycling", emoji: "🚴‍♀️" },
  { label: "Jump Rope", emoji: "🪢" },
  { label: "Yoga", emoji: "🧘‍♀️" },
  { label: "Other", emoji: "⚡" },
];

const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

function Card({ children, style = {} }) {
  return <div style={{ background: "#231419", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #2e1f22", ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", style = {}, disabled = false }) {
  const styles = {
    primary: { background: "#c9504a", color: "white" },
    ghost: { background: "transparent", color: "#c9504a", border: "1px solid #c9504a" },
    soft: { background: "#2e1f22", color: "#f2c4c4" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: "9px 18px", borderRadius: 100, border: "none", fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, fontFamily: "inherit", ...styles[variant], ...style }}>{children}</button>
  );
}

function Input({ value, onChange, placeholder, type = "text", style = {} }) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%", ...style }} />;
}

function Select({ value, onChange, children }) {
  return <select value={value} onChange={onChange} style={{ background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%", cursor: "pointer" }}>{children}</select>;
}

function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", background: "#1a1014", borderBottom: "1px solid #2e1f22", overflowX: "auto" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{ flex: "0 0 auto", padding: "14px 18px", background: "none", border: "none", borderBottom: active === t.id ? "2px solid #c9504a" : "2px solid transparent", color: active === t.id ? "#f2c4c4" : "#888", fontSize: 13, fontFamily: "inherit", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{t.label}</button>
      ))}
    </div>
  );
}

function LogWorkout({ onSave }) {
  const [step, setStep] = useState("pick");
  const [chosenDay, setChosenDay] = useState(null);
  const [date, setDate] = useState(today());
  const [sets, setSets] = useState({});
  const [notes, setNotes] = useState("");

  const plan = chosenDay ? WORKOUT_PLAN[chosenDay] : null;

  function pickDay(d) {
    setChosenDay(d);
    const initial = {};
    WORKOUT_PLAN[d].exercises.forEach(ex => { initial[ex] = [{ reps: "", weight: "", unit: "kg" }]; });
    setSets(initial);
    setStep("log");
  }

  function addSet(ex) { setSets(prev => ({ ...prev, [ex]: [...prev[ex], { reps: "", weight: "", unit: "kg" }] })); }
  function removeSet(ex, i) { setSets(prev => ({ ...prev, [ex]: prev[ex].filter((_, idx) => idx !== i) })); }
  function updateSet(ex, i, field, val) { setSets(prev => ({ ...prev, [ex]: prev[ex].map((s, idx) => idx === i ? { ...s, [field]: val } : s) })); }

  async function handleSave() {
    await onSave({ id: Date.now(), type: "workout", date, day: chosenDay, emoji: plan.emoji, color: plan.color, sets, notes });
    setStep("done");
  }

  if (step === "done") return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: "serif", fontSize: 26, color: "#f2c4c4", marginBottom: 8 }}>Workout Saved!</h2>
      <p style={{ color: "#888", marginBottom: 28 }}>Great work. Recovery starts now.</p>
      <Btn onClick={() => { setStep("pick"); setChosenDay(null); setNotes(""); }}>Log Another</Btn>
    </div>
  );

  if (step === "pick") return (
    <div>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>Which workout today?</p>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 6 }}>DATE</label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      {Object.entries(WORKOUT_PLAN).map(([name, info]) => (
        <button key={name} onClick={() => pickDay(name)} style={{ width: "100%", background: "#1a1014", border: `1px solid ${info.color}44`, borderRadius: 14, padding: "16px 20px", marginBottom: 10, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 28 }}>{info.emoji}</span>
          <div>
            <div style={{ color: "#f0e0e0", fontWeight: 600, fontSize: 15 }}>{name}</div>
            <div style={{ color: "#666", fontSize: 12, marginTop: 3 }}>{info.exercises.join(" · ")}</div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setStep("pick")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 20 }}>←</button>
        <span style={{ fontSize: 22 }}>{plan.emoji}</span>
        <h2 style={{ fontSize: 18, color: "#f2c4c4", margin: 0 }}>{chosenDay}</h2>
      </div>
      {plan.exercises.map(ex => (
        <Card key={ex}>
          <div style={{ fontWeight: 700, color: "#f2c4c4", marginBottom: 12 }}>{ex}</div>
          {sets[ex].map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px 32px", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <Input value={s.reps} onChange={e => updateSet(ex, i, "reps", e.target.value)} placeholder="Reps" type="number" />
              <Input value={s.weight} onChange={e => updateSet(ex, i, "weight", e.target.value)} placeholder="Weight" type="number" />
              <Select value={s.unit} onChange={e => updateSet(ex, i, "unit", e.target.value)}>
                <option>kg</option><option>lbs</option><option>bw</option>
              </Select>
              <button onClick={() => removeSet(ex, i)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18 }}>×</button>
            </div>
          ))}
          <Btn variant="soft" onClick={() => addSet(ex)} style={{ fontSize: 12, padding: "6px 14px", marginTop: 4 }}>+ Set</Btn>
        </Card>
      ))}
      <Card>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 8 }}>NOTES</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="How did it feel? Any PRs? 💪" style={{ width: "100%", background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 80, resize: "vertical" }} />
      </Card>
      <Btn onClick={handleSave} style={{ width: "100%", padding: 14, fontSize: 15, borderRadius: 14 }}>💾 Save Workout</Btn>
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
      <h2 style={{ fontFamily: "serif", fontSize: 26, color: "#f2c4c4", marginBottom: 8 }}>Activity Logged!</h2>
      <p style={{ color: "#888", marginBottom: 28 }}>Every move counts.</p>
      <Btn onClick={() => { setDone(false); setDuration(""); setDistance(""); setNotes(""); }}>Log Another</Btn>
    </div>
  );

  return (
    <div>
      <Card>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 8 }}>ACTIVITY TYPE</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ACTIVITY_TYPES.map(a => (
            <button key={a.label} onClick={() => setType(a.label)} style={{ padding: "8px 14px", borderRadius: 100, border: "1px solid", borderColor: type === a.label ? "#c9504a" : "#2e1f22", background: type === a.label ? "#2e1f22" : "transparent", color: type === a.label ? "#f2c4c4" : "#666", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{a.emoji} {a.label}</button>
          ))}
        </div>
      </Card>
      <Card>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 8 }}>DATE</label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </Card>
      <Card>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 8 }}>DURATION (minutes)</label>
        <Input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 45" type="number" />
      </Card>
      <Card>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 8 }}>DISTANCE (optional)</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 8 }}>
          <Input value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 3.5" type="number" />
          <Select value={distUnit} onChange={e => setDistUnit(e.target.value)}>
            <option>km</option><option>miles</option><option>m</option><option>laps</option>
          </Select>
        </div>
      </Card>
      <Card>
        <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 8 }}>NOTES / GARMIN STATS</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Paste Garmin stats here..." style={{ width: "100%", background: "#1a1014", border: "1px solid #3a2530", borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 80, resize: "vertical" }} />
      </Card>
      <Btn onClick={handleSave} disabled={!duration} style={{ width: "100%", padding: 14, fontSize: 15, borderRadius: 14 }}>💾 Save Activity</Btn>
    </div>
  );
}

function History({ entries, onDelete }) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  if (!sorted.length) return <div style={{ textAlign: "center", padding: "48px 24px", color: "#555" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📋</div><p>No entries yet!</p></div>;
  return (
    <div>
      {sorted.map(entry => (
        <Card key={entry.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 24 }}>{entry.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#f2c4c4", fontSize: 15 }}>{entry.type === "workout" ? entry.day : entry.activityType}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{fmtDate(entry.date)}</div>
              </div>
            </div>
            <button onClick={() => onDelete(entry.id)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 16 }}>🗑</button>
          </div>
          {entry.type === "workout" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(entry.sets).map(([ex, setArr]) => {
                const valid = setArr.filter(s => s.reps || s.weight);
                if (!valid.length) return null;
                return <div key={ex} style={{ background: "#1a1014", borderRadius: 8, padding: "6px 10px", fontSize: 12 }}><span style={{ color: "#888" }}>{ex}: </span>{valid.map((s, i) => <span key={i} style={{ color: "#f2c4c4" }}>{s.reps ? `${s.reps}×` : ""}{s.weight ? `${s.weight}${s.unit}` : "bw"}{i < valid.length - 1 ? " / " : ""}</span>)}</div>;
              })}
            </div>
          )}
          {entry.type === "activity" && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {entry.duration && <span style={{ background: "#1a1014", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#f2c4c4" }}>⏱ {entry.duration} mins</span>}
              {entry.distance && <span style={{ background: "#1a1014", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#f2c4c4" }}>📍 {entry.distance} {entry.distUnit}</span>}
            </div>
          )}
          {entry.notes && <div style={{ marginTop: 10, fontSize: 12, color: "#777", fontStyle: "italic", borderTop: "1px solid #2e1f22", paddingTop: 10 }}>{entry.notes}</div>}
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
          exerciseMap[ex].push({ date: w.date, weight: parseFloat(s.weight), unit: s.unit });
        }
      });
    });
  });
  const chartData = {};
  Object.entries(exerciseMap).forEach(([ex, records]) => {
    const byDate = {};
    records.forEach(r => { if (!byDate[r.date] || r.weight > byDate[r.date].weight) byDate[r.date] = { weight: r.weight, unit: r.unit }; });
    chartData[ex] = Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, { weight, unit }]) => ({ date: fmtDate(date), weight, unit }));
  });
  const exercises = Object.keys(chartData).filter(ex => chartData[ex].length >= 1);
  const [selectedEx, setSelectedEx] = useState(null);
  useEffect(() => { if (!selectedEx && exercises.length) setSelectedEx(exercises[0]); }, [exercises.length]);

  const activitySummary = {};
  activities.forEach(a => {
    if (!activitySummary[a.activityType]) activitySummary[a.activityType] = { count: 0, totalMins: 0, emoji: a.emoji };
    activitySummary[a.activityType].count++;
    activitySummary[a.activityType].totalMins += parseFloat(a.duration) || 0;
  });

  if (!entries.length) return <div style={{ textAlign: "center", padding: "48px 24px", color: "#555" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📈</div><p>Log some workouts to see progress!</p></div>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[{ label: "Workouts", value: workouts.length, emoji: "💪" }, { label: "Activities", value: activities.length, emoji: "🏃‍♀️" }, { label: "Total Days", value: new Set(entries.map(e => e.date)).size, emoji: "📅" }].map(s => (
          <Card key={s.label} style={{ padding: "16px 12px", textAlign: "center", marginBottom: 0 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f2c4c4" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      {exercises.length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, color: "#f2c4c4", marginBottom: 14 }}>💪 Strength Progress</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {exercises.map(ex => (
              <button key={ex} onClick={() => setSelectedEx(ex)} style={{ padding: "6px 12px", borderRadius: 100, border: "1px solid", borderColor: selectedEx === ex ? "#c9504a" : "#2e1f22", background: selectedEx === ex ? "#2e1f22" : "transparent", color: selectedEx === ex ? "#f2c4c4" : "#666", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{ex}</button>
            ))}
          </div>
          {selectedEx && <ResponsiveContainer width="100%" height={200}><LineChart data={chartData[selectedEx]}><CartesianGrid strokeDasharray="3 3" stroke="#2e1f22" /><XAxis dataKey="date" tick={{ fill: "#666", fontSize: 11 }} /><YAxis tick={{ fill: "#666", fontSize: 11 }} /><Tooltip contentStyle={{ background: "#231419", border: "1px solid #2e1f22", borderRadius: 10, color: "#f2c4c4" }} /><Line type="monotone" dataKey="weight" stroke="#c9504a" strokeWidth={2} dot={{ fill: "#c9504a", r: 4 }} /></LineChart></ResponsiveContainer>}
        </Card>
      )}
      {Object.keys(activitySummary).length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, color: "#f2c4c4", marginBottom: 14 }}>🏃‍♀️ Activity Summary</div>
          {Object.entries(activitySummary).map(([type, data]) => (
            <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2e1f22" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 20 }}>{data.emoji}</span><span style={{ color: "#f0e0e0", fontSize: 14 }}>{type}</span></div>
              <div style={{ textAlign: "right" }}><div style={{ color: "#f2c4c4", fontWeight: 700 }}>{data.count}×</div><div style={{ color: "#666", fontSize: 11 }}>{data.totalMins} mins</div></div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("log");
  const [entries, setEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fitness-entries");
    if (saved) setEntries(JSON.parse(saved));
    setLoaded(true);
  }, []);

  async function addEntry(entry) {
    const updated = [...entries, entry];
    setEntries(updated);
    localStorage.setItem("fitness-entries", JSON.stringify(updated));
  }

  async function deleteEntry(id) {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem("fitness-entries", JSON.stringify(updated));
  }

  const TABS = [
    { id: "log", label: "🏋️ Workout" },
    { id: "activity", label: "🚶 Activity" },
    { id: "history", label: "📋 History" },
    { id: "progress", label: "📈 Progress" },
  ];

  if (!loaded) return <div style={{ background: "#120d0f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9504a", fontSize: 32 }}>⏳</div>;

  return (
    <div style={{ background: "#120d0f", minHeight: "100vh", fontFamily: "sans-serif", color: "#f0e0e0" }}>
      <div style={{ padding: "24px 20px 16px", background: "linear-gradient(180deg, #1e0f13 0%, #120d0f 100%)" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#c9504a", marginBottom: 4 }}>Your Fitness Journal</div>
        <h1 style={{ fontSize: 26, color: "#f2c4c4", margin: 0 }}>Train. Log. <em>Glow.</em></h1>
      </div>
      <TabBar tabs={TABS} active={tab} onSelect={setTab} />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 80px" }}>
        {tab === "log" && <LogWorkout onSave={addEntry} />}
        {tab === "activity" && <LogActivity onSave={addEntry} />}
        {tab === "history" && <History entries={entries} onDelete={deleteEntry} />}
        {tab === "progress" && <Progress entries={entries} />}
      </div>
    </div>
  );
}
