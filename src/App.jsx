import { useState, useEffect } from "react";

const C = {
  bg: "#120d0f", card: "#231419", border: "#2e1f22",
  rose: "#c9504a", blush: "#f2c4c4", muted: "#888", dark: "#1a1014",
  green: "#7adf8a", greenDark: "#0f1f18", greenBorder: "#2a4a3a",
};

const PLAN = [
  {
    id: "d1", day: "Day 1", schedule: "Monday",
    title: "Glutes, Hamstrings & Core", emoji: "🍑", color: "#c9504a",
    exercises: [
      { id: "e1", name: "Hip Thrust", sets: "4 sets · 12–15 reps · 60s rest", tip: "Squeeze hard at the top. Drive through your heels.", video: "https://www.youtube.com/results?search_query=hip+thrust+form+tutorial+women" },
      { id: "e2", name: "Romanian Deadlift", sets: "3 sets · 10–12 reps · 60s rest", tip: "Hinge at hips. Feel the stretch down your legs. Flat back.", video: "https://www.youtube.com/results?search_query=romanian+deadlift+women+tutorial" },
      { id: "e3", name: "Donkey Kick + Fire Hydrant", sets: "3 sets · 15 reps/side · 45s rest", tip: "Back-to-back no rest. Burns glute medius for that round shape.", video: "https://www.youtube.com/results?search_query=donkey+kick+fire+hydrant+glutes+tutorial" },
      { id: "e4", name: "Plank to Knee Tap", sets: "3 sets · 20 reps · 45s rest", tip: "From plank, tap opposite knee. Hold form.", video: "https://www.youtube.com/results?search_query=plank+knee+tap+core+exercise+tutorial" },
    ],
  },
  {
    id: "d2", day: "Day 2", schedule: "Wednesday",
    title: "Upper Body & Shoulders", emoji: "💪", color: "#7a6fa8",
    exercises: [
      { id: "e5", name: "Dumbbell Lateral Raise", sets: "4 sets · 15 reps · 45s rest", tip: "Light weight, full range. Arms parallel to floor.", video: "https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form+women+shoulder" },
      { id: "e6", name: "Seated Shoulder Press", sets: "3 sets · 10–12 reps · 60s rest", tip: "Sit upright. Elbows at 90° at bottom.", video: "https://www.youtube.com/results?search_query=seated+dumbbell+shoulder+press+form+tutorial" },
      { id: "e7", name: "Bent-Over Dumbbell Row", sets: "3 sets · 12 reps/side · 60s rest", tip: "Pull toward your hip. Squeeze at the top.", video: "https://www.youtube.com/results?search_query=dumbbell+bent+over+row+form+tutorial+women" },
      { id: "e8", name: "Bicep Curl + Tricep Extension", sets: "3 rounds · 12+12 reps · 60s rest", tip: "Superset back-to-back. Curls: elbows pinned to sides.", video: "https://www.youtube.com/results?search_query=bicep+curl+tricep+extension+superset+women+dumbbell" },
    ],
  },
  {
    id: "d3", day: "Day 3", schedule: "Friday",
    title: "Legs, Quads & Inner Thighs", emoji: "🦵", color: "#4a8b7a",
    exercises: [
      { id: "e9", name: "Goblet Squat", sets: "4 sets · 12–15 reps · 60s rest", tip: "Hold dumbbell at chest. Toes slightly out. Sit deep.", video: "https://www.youtube.com/results?search_query=goblet+squat+form+tutorial+women" },
      { id: "e10", name: "Reverse Lunge", sets: "3 sets · 10 reps/leg · 60s rest", tip: "Step backward. Front knee over ankle.", video: "https://www.youtube.com/results?search_query=reverse+lunge+dumbbell+women+tutorial" },
      { id: "e11", name: "Sumo Squat Pulse", sets: "3 sets · 30 sec · 45s rest", tip: "Wide stance, toes out 45°. Pulse 2 inches.", video: "https://www.youtube.com/results?search_query=sumo+squat+pulse+inner+thigh+women" },
      { id: "e12", name: "Leg Press", sets: "3 sets · 12 reps · 75s rest", tip: "Feet high and wide to target glutes. Go heavy.", video: "https://www.youtube.com/results?search_query=leg+press+high+foot+placement+glutes+tutorial" },
    ],
  },
  {
    id: "d4", day: "Day 4", schedule: "Saturday",
    title: "Full Body Burn & Abs", emoji: "🔥", color: "#c87c2a",
    exercises: [
      { id: "e13", name: "Dumbbell Deadlift", sets: "4 sets · 10 reps · 75s rest", tip: "Full-body compound. Push the floor away as you stand.", video: "https://www.youtube.com/results?search_query=dumbbell+deadlift+women+form+tutorial" },
      { id: "e14", name: "Push-Up", sets: "3 sets · 8–12 reps · 60s rest", tip: "Start on knees if needed. Chest to ground.", video: "https://www.youtube.com/results?search_query=push+up+form+women+modified+tutorial" },
      { id: "e15", name: "Glute Bridge Abduction", sets: "3 sets · 15 reps · 45s rest", tip: "Band above knees. Drive knees out in bridge.", video: "https://www.youtube.com/results?search_query=glute+bridge+band+abduction+tutorial+women" },
      { id: "e16", name: "Bicycle Crunch", sets: "3 sets · 20 reps · 45s rest", tip: "Slow and controlled. Elbow to opposite knee.", video: "https://www.youtube.com/results?search_query=bicycle+crunch+correct+form+tutorial" },
    ],
  },
];

const CARDIO_OPTIONS = ["Swim", "Treadmill", "Stair Master", "Elliptical", "Walking"];

const ACTIVITY_TYPES = [
  { label: "Walking", emoji: "🚶‍♀️" }, { label: "Running", emoji: "🏃" },
  { label: "Swimming", emoji: "🏊‍♀️" }, { label: "Cycling", emoji: "🚴‍♀️" },
  { label: "Jump Rope", emoji: "🪢" }, { label: "Yoga", emoji: "🧘‍♀️" }, { label: "Other", emoji: "⚡" },
];

const MEALS = [
  { day: "Monday", tag: "Workout Day 🍑", meals: [
    { type: "Meal 1", time: "11:00am", name: "Scrambled Eggs & Smoked Salmon on Sourdough", cal: 380, protein: 34, ingredients: ["3 large eggs", "50g smoked salmon", "1 slice sourdough", "Spinach", "Lemon"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Chicken & Quinoa Power Bowl", cal: 390, protein: 42, ingredients: ["150g grilled chicken", "70g quinoa", "Cherry tomatoes", "Cucumber", "Mixed leaves"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Baked Salmon with Broccoli & Sweet Potato", cal: 490, protein: 38, ingredients: ["180g salmon", "1 sweet potato", "Tenderstem broccoli", "Garlic", "Lemon"] },
  ]},
  { day: "Tuesday", tag: "Rest Day 🌸", meals: [
    { type: "Meal 1", time: "11:00am", name: "Greek Yoghurt Bowl with Berries & Granola", cal: 320, protein: 24, ingredients: ["200g Greek yoghurt 0%", "Handful berries", "1 tbsp honey", "30g granola"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Leftover Chicken & Quinoa Bowl", cal: 430, protein: 40, ingredients: ["150g chicken (leftover)", "70g quinoa (leftover)", "½ avocado", "Mixed leaves"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Chicken Stir Fry with Brown Rice", cal: 400, protein: 36, ingredients: ["150g chicken breast", "70g brown rice", "Pak choi", "Red pepper", "Soy sauce"] },
  ]},
  { day: "Wednesday", tag: "Workout Day 💪", meals: [
    { type: "Meal 1", time: "11:00am", name: "Protein Oats with Banana & Peanut Butter", cal: 420, protein: 30, ingredients: ["60g rolled oats", "1 scoop protein powder", "200ml oat milk", "1 banana"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Tuna & Avocado Wrap", cal: 380, protein: 34, ingredients: ["1 wholemeal wrap", "1 tin tuna", "½ avocado", "Mixed leaves", "Lemon juice"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Chicken Thighs with Roasted Veg & Couscous", cal: 460, protein: 40, ingredients: ["2 chicken thighs", "70g couscous", "Courgette", "Red pepper", "Paprika"] },
  ]},
  { day: "Thursday", tag: "Rest Day 🌸", meals: [
    { type: "Meal 1", time: "11:00am", name: "Smoked Salmon & Egg Muffins", cal: 260, protein: 26, ingredients: ["2 egg muffins (batch baked)", "3 eggs + 50g salmon + spinach per batch"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Lentil & Roasted Veg Soup", cal: 340, protein: 20, ingredients: ["Red lentils", "Carrots", "Celery", "Onion", "Veg stock", "Cumin"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Sea Bass with Asparagus & New Potatoes", cal: 420, protein: 36, ingredients: ["2 sea bass fillets", "180g new potatoes", "Asparagus", "Lemon", "Capers"] },
  ]},
  { day: "Friday", tag: "Workout Day 🦵", meals: [
    { type: "Meal 1", time: "11:00am", name: "Scrambled Eggs & Smoked Salmon on Sourdough", cal: 380, protein: 34, ingredients: ["3 large eggs", "50g smoked salmon", "1 slice sourdough", "Spinach"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Prawn & Mango Salad", cal: 280, protein: 30, ingredients: ["150g king prawns", "½ mango", "Mixed leaves", "Cucumber", "Lime dressing"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Chicken Fajita Bowl", cal: 460, protein: 40, ingredients: ["150g chicken breast", "Peppers & red onion", "70g brown rice", "Salsa", "Greek yoghurt"] },
  ]},
  { day: "Saturday", tag: "Workout Day 🔥", meals: [
    { type: "Meal 1", time: "11:00am", name: "Smashed Avocado & Poached Eggs", cal: 460, protein: 20, ingredients: ["2 poached eggs", "1 avocado", "2 slices sourdough", "Cherry tomatoes", "Lemon"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Grilled Chicken Caesar Salad", cal: 380, protein: 40, ingredients: ["150g grilled chicken", "Romaine lettuce", "Parmesan", "Croutons", "Greek yoghurt dressing"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Baked Cod with Salsa Verde & Roasted Potatoes", cal: 420, protein: 38, ingredients: ["200g cod fillet", "180g baby potatoes", "Green beans", "Salsa verde"] },
  ]},
  { day: "Sunday", tag: "Rest & Prep 🥘", meals: [
    { type: "Meal 1", time: "11:00am", name: "Full Protein Omelette", cal: 360, protein: 32, ingredients: ["3 eggs", "50g smoked salmon or chicken", "Mushrooms", "Spinach", "Red pepper"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Homemade Chicken & Veg Soup", cal: 360, protein: 36, ingredients: ["2 chicken breasts", "Carrots", "Celery", "Onion", "Chicken stock", "Parsley"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Teriyaki Salmon with Jasmine Rice & Edamame", cal: 520, protein: 40, ingredients: ["180g salmon", "70g jasmine rice", "Edamame", "Broccoli", "Teriyaki sauce"] },
  ]},
];

const today = () => new Date().toISOString().slice(0, 10);
const todayDayName = () => new Date().toLocaleDateString("en-US", { weekday: "long" });
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const DRAFT_KEY = "workout-draft";
const MEAL_LOG_KEY = "meal-log";
const emptyCardio = () => ({ type: "Treadmill", time: "", distance: "", incline: "", speed: "" });

function loadLocal(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveLocal(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", background: C.dark, borderBottom: `1px solid ${C.border}`, overflowX: "auto" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          flex: "0 0 auto", padding: "13px 16px", background: "none", border: "none",
          borderBottom: active === t.id ? `2px solid ${C.rose}` : "2px solid transparent",
          color: active === t.id ? C.blush : C.muted, fontSize: 12, fontWeight: 600,
          cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
        }}>{t.label}</button>
      ))}
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: C.card, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${C.border}`, ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", style = {}, disabled = false }) {
  const bg = variant === "primary" ? C.rose : variant === "soft" ? C.border : "transparent";
  const col = variant === "ghost" ? C.rose : C.blush;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: bg, borderRadius: 100, padding: "9px 18px", border: variant === "ghost" ? `1px solid ${C.rose}` : "none",
      color: col, fontWeight: 600, fontSize: 13, cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.4 : 1, fontFamily: "inherit", ...style,
    }}>{children}</button>
  );
}

function CardioSection({ cardio, onChange }) {
  return (
    <div style={{ background: C.greenDark, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${C.greenBorder}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.green, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>🏃‍♀️ Cardio</div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Type</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {CARDIO_OPTIONS.map(opt => (
          <button key={opt} onClick={() => onChange({ ...cardio, type: opt })} style={{
            padding: "7px 14px", borderRadius: 100, border: `1px solid ${cardio.type === opt ? C.green : C.greenBorder}`,
            background: cardio.type === opt ? "#1a3a28" : "transparent",
            color: cardio.type === opt ? C.green : "#4a7a5a", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>{opt}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        {[
          { label: "Time (mins)", key: "time", placeholder: "e.g. 20" },
          { label: "Distance (km)", key: "distance", placeholder: "e.g. 2.5" },
        ].map(f => (
          <div key={f.key}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</div>
            <input type="number" value={cardio[f.key]} onChange={e => onChange({ ...cardio, [f.key]: e.target.value })}
              placeholder={f.placeholder} style={{ width: "100%", background: C.bg, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Incline %", key: "incline", placeholder: "e.g. 8" },
          { label: "Speed (km/h)", key: "speed", placeholder: "e.g. 5.5" },
        ].map(f => (
          <div key={f.key}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</div>
            <input type="number" value={cardio[f.key]} onChange={e => onChange({ ...cardio, [f.key]: e.target.value })}
              placeholder={f.placeholder} style={{ width: "100%", background: C.bg, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanWorkoutTab({ onSave }) {
  const [openDay, setOpenDay] = useState(null);
  const [checked, setChecked] = useState(() => loadLocal("plan-checked", {}));
  const [loggingDay, setLoggingDay] = useState(null);
  const [draft, setDraft] = useState({});
  const [cardio, setCardio] = useState(emptyCardio());
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const d = loadLocal(DRAFT_KEY, null);
    if (d) {
      setDraft(d.sets || {}); setNotes(d.notes || "");
      setCardio(d.cardio || emptyCardio());
      if (d.dayId) setLoggingDay(d.dayId);
    }
  }, []);

  function persist(dayId, sets, c, n) {
    saveLocal(DRAFT_KEY, { dayId, sets, cardio: c, notes: n });
  }

  function toggleCheck(dayId, exId) {
    const key = `${dayId}-${exId}`;
    const u = { ...checked, [key]: !checked[key] };
    setChecked(u); saveLocal("plan-checked", u);
  }

  function resetDay(dayId) {
    const u = { ...checked };
    Object.keys(u).forEach(k => { if (k.startsWith(dayId)) delete u[k]; });
    setChecked(u); saveLocal("plan-checked", u);
  }

  function startLogging(day) {
    if (loggingDay !== day.id) {
      const init = {};
      day.exercises.forEach(e => { init[e.name] = [{ reps: "", weight: "" }]; });
      const c = emptyCardio();
      setDraft(init); setCardio(c); setNotes(""); setLoggingDay(day.id);
      persist(day.id, init, c, "");
    }
    setSaved(false); setOpenDay(day.id);
  }

  function addSet(ex) {
    const u = { ...draft, [ex]: [...(draft[ex] || []), { reps: "", weight: "" }] };
    setDraft(u); persist(loggingDay, u, cardio, notes);
  }
  function removeSet(ex, i) {
    const u = { ...draft, [ex]: draft[ex].filter((_, idx) => idx !== i) };
    setDraft(u); persist(loggingDay, u, cardio, notes);
  }
  function updSet(ex, i, f, v) {
    const u = { ...draft, [ex]: draft[ex].map((s, idx) => idx === i ? { ...s, [f]: v } : s) };
    setDraft(u); persist(loggingDay, u, cardio, notes);
  }
  function updCardio(c) { setCardio(c); persist(loggingDay, draft, c, notes); }
  function updNotes(v) { setNotes(v); persist(loggingDay, draft, cardio, v); }

  function handleSave() {
    const day = PLAN.find(d => d.id === loggingDay);
    onSave({ id: Date.now(), type: "workout", date: today(), day: day.title, emoji: day.emoji, color: day.color, sets: draft, cardio, notes });
    saveLocal(DRAFT_KEY, null); localStorage.removeItem(DRAFT_KEY);
    setLoggingDay(null); setDraft({}); setCardio(emptyCardio()); setNotes(""); setSaved(true);
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    setLoggingDay(null); setDraft({}); setCardio(emptyCardio()); setNotes("");
  }

  const activeDay = loggingDay ? PLAN.find(d => d.id === loggingDay) : null;

  if (saved) return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h2 style={{ color: C.blush, marginBottom: 8 }}>Workout Saved!</h2>
      <p style={{ color: C.muted, marginBottom: 28 }}>Great work. Recovery starts now.</p>
      <Btn onClick={() => setSaved(false)}>Back to Plan</Btn>
    </div>
  );

  return (
    <div>
      {loggingDay && (
        <div style={{ background: "#2a1a10", borderRadius: 14, padding: 14, marginBottom: 14, border: "1px solid #c87c2a55", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#c87c2a", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>In Progress</div>
            <div style={{ fontSize: 14, color: C.blush, fontWeight: 600 }}>{activeDay?.emoji} {activeDay?.title}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Auto-saved — expand day below to continue 👇</div>
          </div>
          <button onClick={clearDraft} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
      )}

      <div style={{ background: "#1e0f13", borderRadius: 20, padding: 20, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.rose, marginBottom: 8, textTransform: "uppercase" }}>Your 4-Week Plan</div>
        <h2 style={{ fontSize: 22, color: C.blush, fontStyle: "italic", marginBottom: 6 }}>Train Hard, Glow Harder</h2>
        <p style={{ fontSize: 12, color: C.muted }}>4 days · 50–60 mins · Tone, lift & burn 🍑</p>
      </div>

      {PLAN.map(day => {
        const done = day.exercises.filter(e => checked[`${day.id}-${e.id}`]).length;
        const isOpen = openDay === day.id;
        const isDrafting = loggingDay === day.id;
        const pct = (done / day.exercises.length) * 100;

        return (
          <div key={day.id} style={{ background: C.card, borderRadius: 16, marginBottom: 12, border: `1px solid ${isOpen ? day.color + "66" : isDrafting ? "#c87c2a55" : C.border}`, overflow: "hidden" }}>
            <div onClick={() => setOpenDay(isOpen ? null : day.id)} style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                <span style={{ fontSize: 28 }}>{day.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: day.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>{day.day} · {day.schedule}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#f0e0e0" }}>{day.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <div style={{ height: 4, width: 80, background: C.dark, borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: day.color, borderRadius: 10 }} />
                    </div>
                    <span style={{ fontSize: 11, color: C.muted }}>{done}/{day.exercises.length} done</span>
                    {isDrafting && <span style={{ fontSize: 11, color: "#c87c2a", fontWeight: 700 }}>• logging</span>}
                  </div>
                </div>
              </div>
              <span style={{ color: C.muted, fontSize: 18 }}>{isOpen ? "▾" : "▸"}</span>
            </div>

            {isOpen && (
              <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
                {day.exercises.map(ex => {
                  const isChecked = !!checked[`${day.id}-${ex.id}`];
                  const exSets = isDrafting ? draft[ex.name] : null;
                  return (
                    <div key={ex.id} style={{ background: C.dark, borderRadius: 12, padding: 14, marginTop: 12, border: `1px solid ${isChecked ? day.color + "55" : C.border}`, opacity: isChecked ? 0.75 : 1 }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <button onClick={() => toggleCheck(day.id, ex.id)} style={{
                          width: 24, height: 24, borderRadius: 6, border: `2px solid ${isChecked ? day.color : "#3a2530"}`,
                          background: isChecked ? day.color : "transparent", cursor: "pointer", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                        }}>{isChecked && <span style={{ color: "white", fontSize: 13 }}>✓</span>}</button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: isChecked ? C.muted : "#f0e0e0", textDecoration: isChecked ? "line-through" : "none", marginBottom: 3 }}>{ex.name}</div>
                          <div style={{ fontSize: 12, color: C.rose, marginBottom: 3 }}>{ex.sets}</div>
                          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6 }}>{ex.tip}</div>
                        </div>
                      </div>
                      <a href={ex.video} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.card, color: C.blush, borderRadius: 100, padding: "6px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none", border: `1px solid ${C.border}`, marginBottom: isDrafting ? 14 : 0 }}>▶ Watch Tutorial</a>

                      {isDrafting && exSets && (
                        <div style={{ marginTop: 12 }}>
                          <div style={{ fontSize: 10, color: C.muted, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Log Your Sets</div>
                          {exSets.map((s, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr 1fr 24px", gap: 10, marginBottom: 10, alignItems: "end" }}>
                              <span style={{ color: C.muted, fontSize: 13, textAlign: "center", paddingBottom: 8 }}>{i + 1}</span>
                              <div>
                                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>Reps</div>
                                <input type="number" value={s.reps} onChange={e => updSet(ex.name, i, "reps", e.target.value)} placeholder="0"
                                  style={{ width: "100%", background: C.bg, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "10px 12px", fontSize: 15, fontFamily: "inherit", outline: "none", textAlign: "center", boxSizing: "border-box" }} />
                              </div>
                              <div>
                                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>Weight (kg)</div>
                                <input type="number" value={s.weight} onChange={e => updSet(ex.name, i, "weight", e.target.value)} placeholder="0"
                                  style={{ width: "100%", background: C.bg, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "10px 12px", fontSize: 15, fontFamily: "inherit", outline: "none", textAlign: "center", boxSizing: "border-box" }} />
                              </div>
                              <button onClick={() => removeSet(ex.name, i)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 20, paddingBottom: 8 }}>×</button>
                            </div>
                          ))}
                          <button onClick={() => addSet(ex.name)} style={{ background: C.border, border: "none", borderRadius: 100, padding: "7px 16px", color: C.blush, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 2 }}>+ Add Set</button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {isDrafting ? (
                  <div style={{ marginTop: 16 }}>
                    <CardioSection cardio={cardio} onChange={updCardio} />
                    <Card>
                      <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Notes</div>
                      <textarea value={notes} onChange={e => updNotes(e.target.value)} placeholder="How did it feel? Any PRs? 💪"
                        style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: 10, fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} />
                    </Card>
                    <Btn onClick={handleSave} style={{ width: "100%", padding: 14, borderRadius: 14 }}>💾 Save Workout</Btn>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <Btn onClick={() => startLogging(day)} style={{ flex: 1 }}>🏋️ Start Logging</Btn>
                    <Btn onClick={() => resetDay(day.id)} variant="soft">↺ Reset</Btn>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ background: "#1a1410", borderRadius: 16, padding: 20, marginBottom: 12, border: "1px solid #2e2a1f", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🌸</div>
        <div style={{ fontWeight: 700, color: "#e0d0a0", marginBottom: 6 }}>Tue, Thu, Sun — Rest Days</div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Recovery is training. This is when your glutes actually grow. 💪</div>
      </div>
    </div>
  );
}

function MealsTab() {
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const defaultIdx = Math.max(0, dayNames.indexOf(todayDayName()));
  const [selectedDay, setSelectedDay] = useState(defaultIdx);
  const [mealLog, setMealLog] = useState(() => loadLocal(MEAL_LOG_KEY, {}));
  const [editingMeal, setEditingMeal] = useState(null);
  const [noteText, setNoteText] = useState("");

  function toggleMeal(dayIdx, mealIdx) {
    const key = `${dayIdx}-${mealIdx}`;
    const existing = mealLog[key] || {};
    const updated = { ...mealLog, [key]: { ...existing, eaten: !existing.eaten } };
    setMealLog(updated); saveLocal(MEAL_LOG_KEY, updated);
  }

  function saveNote(dayIdx, mealIdx) {
    const key = `${dayIdx}-${mealIdx}`;
    const existing = mealLog[key] || {};
    const updated = { ...mealLog, [key]: { ...existing, note: noteText } };
    setMealLog(updated); saveLocal(MEAL_LOG_KEY, updated);
    setEditingMeal(null); setNoteText("");
  }

  const dayData = MEALS[selectedDay];

  return (
    <div>
      <div style={{ background: "#1a1014", borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 22 }}>🌙</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.blush, marginBottom: 2 }}>16:8 Intermittent Fasting</div>
          <div style={{ fontSize: 11, color: C.muted }}>Eating window: <span style={{ color: C.green }}>11am – 7pm</span></div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>☕ Morning tea with oat milk splash is fine</div>
        </div>
      </div>

      <div style={{ background: C.greenDark, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${C.greenBorder}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 4 }}>🥬 Daily Smoothie — Every Day</div>
        <div style={{ fontSize: 11, color: "#4a7a5a", lineHeight: 1.6 }}>½ cup chia/flax · 1.5L kale · ½L forest fruits · tropical fruit · water. Sip 11am–7pm.</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {["~580 kcal","23g protein","30g+ fibre","Omega-3s ✓"].map(s => (
            <span key={s} style={{ background: "rgba(122,223,138,0.1)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: C.green, border: `1px solid ${C.greenBorder}` }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
        {dayNames.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)} style={{
            flexShrink: 0, padding: "7px 14px", borderRadius: 100, border: `1px solid ${selectedDay === i ? C.rose : C.border}`,
            background: selectedDay === i ? "#2e1f22" : "transparent", color: selectedDay === i ? C.blush : C.muted,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>{d.slice(0,3)}{i === defaultIdx ? " 📍" : ""}</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.blush }}>{dayData.day}</div>
        <div style={{ fontSize: 11, color: C.rose, fontWeight: 600 }}>{dayData.tag}</div>
      </div>

      {dayData.meals.map((meal, mealIdx) => {
        const key = `${selectedDay}-${mealIdx}`;
        const log = mealLog[key] || {};
        const isEaten = !!log.eaten;
        const hasNote = !!log.note;
        return (
          <div key={mealIdx} style={{ background: C.card, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${isEaten ? "#2a4a3a" : C.border}`, opacity: isEaten ? 0.85 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: C.rose, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{meal.type}</span>
                  <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>⏰ {meal.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: isEaten ? C.muted : "#f0e0e0", textDecoration: isEaten ? "line-through" : "none", marginBottom: 4 }}>{meal.name}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ background: C.dark, borderRadius: 8, padding: "3px 8px", fontSize: 11, color: C.muted }}><strong style={{ color: C.blush }}>{meal.cal}</strong> kcal</span>
                  <span style={{ background: C.dark, borderRadius: 8, padding: "3px 8px", fontSize: 11, color: C.muted }}><strong style={{ color: C.blush }}>{meal.protein}g</strong> protein</span>
                </div>
              </div>
              <button onClick={() => toggleMeal(selectedDay, mealIdx)} style={{
                width: 28, height: 28, borderRadius: 8, border: `2px solid ${isEaten ? C.green : "#3a2530"}`,
                background: isEaten ? "#1a3a28" : "transparent", cursor: "pointer", marginLeft: 10, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}>{isEaten && <span style={{ color: C.green }}>✓</span>}</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {meal.ingredients.map((ing, i) => (
                <span key={i} style={{ background: C.dark, borderRadius: 8, padding: "3px 8px", fontSize: 10, color: "#666" }}>{ing}</span>
              ))}
            </div>
            {hasNote && <div style={{ background: C.dark, borderRadius: 8, padding: 8, marginBottom: 8, fontSize: 11, color: "#888", fontStyle: "italic" }}>📝 {log.note}</div>}
            <button onClick={() => { setEditingMeal({ dayIdx: selectedDay, mealIdx }); setNoteText(log.note || ""); }}
              style={{ background: "none", border: "none", color: C.muted, fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>
              {hasNote ? "✏️ Edit note" : "+ Add note"}
            </button>
          </div>
        );
      })}

      <div style={{ background: "#1e0f13", borderRadius: 14, padding: 14, border: "1px solid #3a1f22" }}>
        <div style={{ fontSize: 11, color: C.rose, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Daily Totals (meals + smoothie)</div>
        {[
          { label: "Calories", val: `${dayData.meals.reduce((a,m) => a+m.cal, 580)} kcal`, color: C.rose },
          { label: "Protein", val: `${dayData.meals.reduce((a,m) => a+m.protein, 23)}g`, color: "#7a6fa8" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.muted }}>{s.label}</span>
            <strong style={{ fontSize: 13, color: s.color }}>{s.val}</strong>
          </div>
        ))}
      </div>

      {editingMeal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
          <div style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: 24, width: "100%", boxSizing: "border-box" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.blush, marginBottom: 16 }}>Add Note</div>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} autoFocus
              placeholder="e.g. Swapped chicken for tuna..." style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 12, color: "#f0e0e0", padding: 14, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 80, marginBottom: 16, resize: "vertical", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => setEditingMeal(null)} variant="soft" style={{ flex: 1 }}>Cancel</Btn>
              <Btn onClick={() => saveNote(editingMeal.dayIdx, editingMeal.mealIdx)} style={{ flex: 1 }}>Save Note</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LogActivity({ onSave }) {
  const [type, setType] = useState("Walking");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  function handleSave() {
    onSave({ id: Date.now(), type: "activity", activityType: type, emoji: ACTIVITY_TYPES.find(a => a.label === type)?.emoji || "⚡", date: today(), duration, distance, notes });
    setDone(true);
  }

  if (done) return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
      <h2 style={{ color: C.blush, marginBottom: 8 }}>Activity Logged!</h2>
      <p style={{ color: C.muted, marginBottom: 28 }}>Every move counts.</p>
      <Btn onClick={() => { setDone(false); setDuration(""); setDistance(""); setNotes(""); }}>Log Another</Btn>
    </div>
  );

  return (
    <div>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, letterSpacing: 2, textTransform: "uppercase" }}>Activity Type</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ACTIVITY_TYPES.map(a => (
            <button key={a.label} onClick={() => setType(a.label)} style={{
              padding: "7px 14px", borderRadius: 100, border: `1px solid ${type === a.label ? C.rose : C.border}`,
              background: type === a.label ? C.border : "transparent", color: type === a.label ? C.blush : C.muted,
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>{a.emoji} {a.label}</button>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Duration (minutes)</div>
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 45"
          style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
      </Card>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Distance in km (optional)</div>
        <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 3.5"
          style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
      </Card>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 7, letterSpacing: 2, textTransform: "uppercase" }}>Notes</div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Paste Garmin stats here..."
          style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "10px 14px", fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 70, resize: "vertical", boxSizing: "border-box" }} />
      </Card>
      <Btn onClick={handleSave} style={{ width: "100%", padding: 14, borderRadius: 14 }}>💾 Save Activity</Btn>
    </div>
  );
}

function History({ entries, onDelete, onUpdate }) {
  const [editingEntry, setEditingEntry] = useState(null);
  const [editDraft, setEditDraft] = useState({});
  const [editCardio, setEditCardio] = useState(emptyCardio());
  const [editNotes, setEditNotes] = useState("");

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  function startEdit(entry) {
    setEditingEntry(entry);
    setEditDraft(JSON.parse(JSON.stringify(entry.sets || {})));
    setEditCardio(entry.cardio || emptyCardio());
    setEditNotes(entry.notes || "");
  }

  function updEditSet(ex, i, f, v) {
    setEditDraft(prev => ({ ...prev, [ex]: prev[ex].map((s, idx) => idx === i ? { ...s, [f]: v } : s) }));
  }
  function addEditSet(ex) {
    setEditDraft(prev => ({ ...prev, [ex]: [...(prev[ex] || []), { reps: "", weight: "" }] }));
  }
  function removeEditSet(ex, i) {
    setEditDraft(prev => ({ ...prev, [ex]: prev[ex].filter((_, idx) => idx !== i) }));
  }

  function saveEdit() {
    onUpdate({ ...editingEntry, sets: editDraft, cardio: editCardio, notes: editNotes });
    setEditingEntry(null);
  }

  if (!sorted.length) return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: C.muted }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
      <p>No entries yet. Log your first workout!</p>
    </div>
  );

  if (editingEntry) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setEditingEntry(null)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 22 }}>←</button>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.blush }}>Edit {editingEntry.emoji} {fmtDate(editingEntry.date)}</div>
      </div>
      {editingEntry.type === "workout" && Object.entries(editDraft).map(([ex, sets]) => (
        <Card key={ex}>
          <div style={{ fontWeight: 700, color: C.blush, marginBottom: 10, fontSize: 14 }}>{ex}</div>
          {sets.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr 1fr 24px", gap: 8, marginBottom: 8, alignItems: "end" }}>
              <span style={{ color: C.muted, fontSize: 12, textAlign: "center", paddingBottom: 8 }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>Reps</div>
                <input type="number" value={s.reps} onChange={e => updEditSet(ex, i, "reps", e.target.value)} placeholder="0"
                  style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>Weight (kg)</div>
                <input type="number" value={s.weight} onChange={e => updEditSet(ex, i, "weight", e.target.value)} placeholder="0"
                  style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => removeEditSet(ex, i)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18, paddingBottom: 8 }}>×</button>
            </div>
          ))}
          <button onClick={() => addEditSet(ex)} style={{ background: C.border, border: "none", borderRadius: 100, padding: "6px 14px", color: C.blush, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>+ Set</button>
        </Card>
      ))}
      {editingEntry.type === "workout" && <CardioSection cardio={editCardio} onChange={setEditCardio} />}
      <Card>
        <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Notes</div>
        <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Notes..."
          style={{ width: "100%", background: C.dark, border: `1px solid #3a2530`, borderRadius: 10, color: "#f0e0e0", padding: 10, fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} />
      </Card>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn onClick={() => setEditingEntry(null)} variant="soft" style={{ flex: 1 }}>Cancel</Btn>
        <Btn onClick={saveEdit} style={{ flex: 1 }}>💾 Save Changes</Btn>
      </div>
    </div>
  );

  return (
    <div>
      {sorted.map(e => (
        <Card key={e.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
              <span style={{ fontSize: 22 }}>{e.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, color: C.blush, fontSize: 14 }}>{e.type === "workout" ? e.day : e.activityType}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{fmtDate(e.date)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {e.type === "workout" && <button onClick={() => startEdit(e)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4 }}>✏️</button>}
              <button onClick={() => onDelete(e.id)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 16, padding: 4 }}>🗑</button>
            </div>
          </div>
          {e.type === "workout" && (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: e.cardio?.time ? 8 : 0 }}>
                {Object.entries(e.sets || {}).map(([ex, setArr]) => {
                  const valid = (setArr || []).filter(s => s.reps || s.weight);
                  if (!valid.length) return null;
                  return <div key={ex} style={{ background: C.dark, borderRadius: 8, padding: "5px 10px", fontSize: 11 }}><span style={{ color: C.muted }}>{ex}: </span><span style={{ color: C.blush }}>{valid.map(s => `${s.reps ? s.reps+"×" : ""}${s.weight ? s.weight+"kg" : "bw"}`).join(" / ")}</span></div>;
                })}
              </div>
              {e.cardio?.time && (
                <div style={{ background: C.greenDark, borderRadius: 8, padding: "7px 10px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>🏃‍♀️ {e.cardio.type}</span>
                  {e.cardio.time && <span style={{ fontSize: 11, color: "#4a8a5a" }}>⏱ {e.cardio.time}m</span>}
                  {e.cardio.distance && <span style={{ fontSize: 11, color: "#4a8a5a" }}>📍 {e.cardio.distance}km</span>}
                  {e.cardio.speed && <span style={{ fontSize: 11, color: "#4a8a5a" }}>💨 {e.cardio.speed}km/h</span>}
                  {e.cardio.incline && <span style={{ fontSize: 11, color: "#4a8a5a" }}>📐 {e.cardio.incline}%</span>}
                </div>
              )}
            </div>
          )}
          {e.type === "activity" && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {e.duration && <div style={{ background: C.dark, borderRadius: 8, padding: "5px 10px", fontSize: 11, color: C.blush }}>⏱ {e.duration} mins</div>}
              {e.distance && <div style={{ background: C.dark, borderRadius: 8, padding: "5px 10px", fontSize: 11, color: C.blush }}>📍 {e.distance} km</div>}
            </div>
          )}
          {e.notes && <div style={{ marginTop: 8, fontSize: 11, color: "#666", fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>{e.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("plan");
  const [entries, setEntries] = useState(() => loadLocal("fitness-entries", []));

  function addEntry(entry) {
    const updated = [...entries, entry];
    setEntries(updated); saveLocal("fitness-entries", updated);
  }

  function deleteEntry(id) {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated); saveLocal("fitness-entries", updated);
  }

  function updateEntry(updated) {
    const all = entries.map(e => e.id === updated.id ? updated : e);
    setEntries(all); saveLocal("fitness-entries", all);
  }

  const TABS = [
    { id: "plan", label: "📋 Plan & Log" },
    { id: "meals", label: "🥗 Meals" },
    { id: "activity", label: "🚶 Activity" },
    { id: "history", label: "🕐 History" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif", color: "#f0e0e0" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { display: none; } input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }`}</style>
      <div style={{ padding: "20px 18px 12px", background: "linear-gradient(180deg, #1e0f13 0%, #120d0f 100%)" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.rose, marginBottom: 3 }}>Your Fitness Journal</div>
        <h1 style={{ fontSize: 22, color: C.blush, margin: 0, fontStyle: "italic" }}>Train. Log. Glow. 🔥</h1>
      </div>
      <TabBar tabs={TABS} active={tab} onSelect={setTab} />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "18px 14px 80px" }}>
        {tab === "plan" && <PlanWorkoutTab onSave={addEntry} />}
        {tab === "meals" && <MealsTab />}
        {tab === "activity" && <LogActivity onSave={addEntry} />}
        {tab === "history" && <History entries={entries} onDelete={deleteEntry} onUpdate={updateEntry} />}
      </div>
    </div>
  );
}
