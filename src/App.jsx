
import { useState, useEffect } from "react";

const C = {
  bg: "#fdf8f9",
  card: "#ffffff",
  border: "#f0d9e0",
  rose: "#d4688a",
  roseDark: "#b8476a",
  roseLight: "#f8e8ed",
  rosePale: "#fdf0f3",
  blush: "#e8a0b4",
  muted: "#a08090",
  dark: "#5a3a45",
  text: "#3a2030",
  green: "#6ab88a",
  greenLight: "#f0f9f4",
  greenBorder: "#c0e8d0",
  gold: "#c8a060",
  goldLight: "#fdf8f0",
};

const API = "https://fitness-backend-production-35ef.up.railway.app";

const PLAN = [
  {
    id: "d1", day: "Day 1", schedule: "Monday",
    title: "Glutes, Hamstrings & Core", emoji: "🍑", color: "#d4688a",
    location: "🏋️ Gym",
    exercises: [
      { id: "e1", name: "Hip Thrust", sets: "4 sets · 12–15 reps · 60s rest", tip: "Squeeze hard at the top. Drive through your heels.", video: "https://www.youtube.com/results?search_query=hip+thrust+form+tutorial+women" },
      { id: "e2", name: "Romanian Deadlift", sets: "3 sets · 10–12 reps · 60s rest", tip: "Hinge at hips. Feel the stretch down your legs. Flat back.", video: "https://www.youtube.com/results?search_query=romanian+deadlift+women+tutorial" },
      { id: "e3", name: "Donkey Kick + Fire Hydrant", sets: "3 sets · 15 reps/side · 45s rest", tip: "Back-to-back no rest. Burns glute medius for that round shape.", video: "https://www.youtube.com/results?search_query=donkey+kick+fire+hydrant+glutes+tutorial" },
      { id: "e4", name: "Plank to Knee Tap", sets: "3 sets · 20 reps · 45s rest", tip: "From plank, tap opposite knee. Hold form.", video: "https://www.youtube.com/results?search_query=plank+knee+tap+core+exercise+tutorial" },
      { id: "e5", name: "Dead Bug", sets: "3 sets · 10 reps/side · 45s rest", tip: "Lie on back, arms up, knees at 90°. Lower opposite arm and leg slowly. Back stays flat.", video: "https://www.youtube.com/results?search_query=dead+bug+exercise+core+tutorial" },
    ],
  },
  {
    id: "d2", day: "Day 2", schedule: "Wednesday",
    title: "Upper Body & Shoulders", emoji: "💪", color: "#9068a8",
    location: "🏋️ Gym",
    exercises: [
      { id: "e6", name: "Dumbbell Lateral Raise", sets: "4 sets · 15 reps · 45s rest", tip: "Light weight, full range. Arms parallel to floor.", video: "https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form+women+shoulder" },
      { id: "e7", name: "Seated Shoulder Press", sets: "3 sets · 10–12 reps · 60s rest", tip: "Sit upright. Elbows at 90° at bottom.", video: "https://www.youtube.com/results?search_query=seated+dumbbell+shoulder+press+form+tutorial" },
      { id: "e8", name: "Bent-Over Dumbbell Row", sets: "3 sets · 12 reps/side · 60s rest", tip: "Pull toward your hip. Squeeze at the top.", video: "https://www.youtube.com/results?search_query=dumbbell+bent+over+row+form+tutorial+women" },
      { id: "e9", name: "Bicep Curl + Tricep Extension", sets: "3 rounds · 12+12 reps · 60s rest", tip: "Superset back-to-back. Curls: elbows pinned to sides.", video: "https://www.youtube.com/results?search_query=bicep+curl+tricep+extension+superset+women+dumbbell" },
      { id: "e10", name: "Russian Twist", sets: "3 sets · 20 reps · 45s rest", tip: "Sit at 45°, feet raised, rotate side to side. Hold a weight for more challenge.", video: "https://www.youtube.com/results?search_query=russian+twist+obliques+tutorial+women" },
    ],
  },
  {
    id: "d3", day: "Day 3", schedule: "Friday",
    title: "Legs, Quads & Inner Thighs", emoji: "🦵", color: "#6898b8",
    location: "🏋️ Gym",
    exercises: [
      { id: "e11", name: "Goblet Squat", sets: "4 sets · 12–15 reps · 60s rest", tip: "Hold dumbbell at chest. Toes slightly out. Sit deep.", video: "https://www.youtube.com/results?search_query=goblet+squat+form+tutorial+women" },
      { id: "e12", name: "Reverse Lunge", sets: "3 sets · 10 reps/leg · 60s rest", tip: "Step backward. Front knee over ankle.", video: "https://www.youtube.com/results?search_query=reverse+lunge+dumbbell+women+tutorial" },
      { id: "e13", name: "Sumo Squat Pulse", sets: "3 sets · 30 sec · 45s rest", tip: "Wide stance, toes out 45°. Pulse 2 inches.", video: "https://www.youtube.com/results?search_query=sumo+squat+pulse+inner+thigh+women" },
      { id: "e14", name: "Leg Press", sets: "3 sets · 12 reps · 75s rest", tip: "Feet high and wide to target glutes. Go heavy.", video: "https://www.youtube.com/results?search_query=leg+press+high+foot+placement+glutes+tutorial" },
      { id: "e15", name: "Side Plank Hip Dip", sets: "3 sets · 12 dips/side · 45s rest", tip: "In side plank, dip hip to floor and back up. Best for sides and obliques.", video: "https://www.youtube.com/results?search_query=side+plank+hip+dip+obliques+tutorial" },
    ],
  },
  {
    id: "d4", day: "Day 4", schedule: "Saturday",
    title: "Full Body Burn & Abs", emoji: "🔥", color: "#c87850",
    location: "🏋️ Gym",
    exercises: [
      { id: "e16", name: "Dumbbell Deadlift", sets: "4 sets · 10 reps · 75s rest", tip: "Full-body compound. Push the floor away as you stand.", video: "https://www.youtube.com/results?search_query=dumbbell+deadlift+women+form+tutorial" },
      { id: "e17", name: "Push-Up", sets: "3 sets · 8–12 reps · 60s rest", tip: "Start on knees if needed. Chest to ground.", video: "https://www.youtube.com/results?search_query=push+up+form+women+modified+tutorial" },
      { id: "e18", name: "Glute Bridge Abduction", sets: "3 sets · 15 reps · 45s rest", tip: "Band above knees. Drive knees out in bridge.", video: "https://www.youtube.com/results?search_query=glute+bridge+band+abduction+tutorial+women" },
      { id: "e19", name: "Bicycle Crunch", sets: "3 sets · 20 reps · 45s rest", tip: "Slow and controlled. Elbow to opposite knee.", video: "https://www.youtube.com/results?search_query=bicycle+crunch+correct+form+tutorial" },
      { id: "e20", name: "Dumbbell Woodchop", sets: "3 sets · 12 reps/side · 45s rest", tip: "Hold one dumbbell, rotate diagonally from hip to opposite shoulder.", video: "https://www.youtube.com/results?search_query=dumbbell+woodchop+obliques+core+tutorial" },
    ],
  },
  {
    id: "d5", day: "Day 5", schedule: "Any Day",
    title: "Full Body Home Workout", emoji: "🏠", color: "#6ab88a",
    location: "🏠 Home",
    exercises: [
      { id: "e21", name: "Dumbbell Squat to Press", sets: "3 sets · 12 reps · 60s rest", tip: "Squat down, as you stand press dumbbells overhead. Full body in one movement.", video: "https://www.youtube.com/results?search_query=dumbbell+squat+to+press+tutorial+women" },
      { id: "e22", name: "Resistance Band Glute Kickback", sets: "3 sets · 15 reps/side · 45s rest", tip: "Band around ankles. On all fours, kick back and up. Squeeze glute at top.", video: "https://www.youtube.com/results?search_query=resistance+band+glute+kickback+tutorial" },
      { id: "e23", name: "Dumbbell Romanian Deadlift", sets: "3 sets · 12 reps · 60s rest", tip: "Hinge at hips, feel the hamstring stretch. Keep dumbbells close to legs.", video: "https://www.youtube.com/results?search_query=dumbbell+romanian+deadlift+home+women" },
      { id: "e24", name: "Resistance Band Lateral Walk", sets: "3 sets · 20 steps each way · 45s rest", tip: "Band above knees. Squat slightly, step side to side. Burns glute medius.", video: "https://www.youtube.com/results?search_query=resistance+band+lateral+walk+glutes+tutorial" },
      { id: "e25", name: "Push-Up to Shoulder Tap", sets: "3 sets · 10 reps · 60s rest", tip: "Do a push-up then tap each shoulder alternately. Core and upper body together.", video: "https://www.youtube.com/results?search_query=push+up+shoulder+tap+tutorial" },
      { id: "e26", name: "Side Plank Hip Dip", sets: "3 sets · 12 dips/side · 45s rest", tip: "Dip hip to floor and back up. Targets obliques and love handles.", video: "https://www.youtube.com/results?search_query=side+plank+hip+dip+obliques+tutorial" },
      { id: "e27", name: "Dead Bug", sets: "3 sets · 10 reps/side · 45s rest", tip: "Lie on back, arms up, knees at 90°. Lower opposite arm and leg slowly. Back stays flat.", video: "https://www.youtube.com/results?search_query=dead+bug+exercise+core+tutorial" },
    ],
  },

  {
    id: "d6", day: "Day 5b", schedule: "Any Day",
    title: "Full Body Home — No Equipment", emoji: "🧘‍♀️", color: "#b868a8",
    location: "🏠 Home · No Equipment",
    exercises: [
      { id: "e28", name: "Bodyweight Squat", sets: "3 sets · 20 reps · 45s rest", tip: "Feet shoulder-width apart, toes slightly out. Sit back and down. Drive through heels to stand.", video: "https://www.youtube.com/results?search_query=bodyweight+squat+form+women+tutorial" },
      { id: "e29", name: "Reverse Lunge", sets: "3 sets · 12 reps/leg · 45s rest", tip: "Step back, lower back knee toward floor. Front knee stays over ankle. Alternate legs.", video: "https://www.youtube.com/results?search_query=reverse+lunge+bodyweight+women+tutorial" },
      { id: "e30", name: "Glute Bridge", sets: "3 sets · 20 reps · 45s rest", tip: "Lie on back, feet flat. Drive hips up, squeeze glutes hard at top. Hold 1 second.", video: "https://www.youtube.com/results?search_query=glute+bridge+bodyweight+tutorial+women" },
      { id: "e31", name: "Push-Up", sets: "3 sets · 10 reps · 60s rest", tip: "On knees or toes. Chest to ground. Elbows at 45°. Full range of motion.", video: "https://www.youtube.com/results?search_query=push+up+form+women+modified+tutorial" },
      { id: "e32", name: "Mountain Climber", sets: "3 sets · 30 seconds · 45s rest", tip: "Plank position, drive knees to chest alternately. Keep hips level. Burns calories fast!", video: "https://www.youtube.com/results?search_query=mountain+climber+exercise+tutorial+women" },
      { id: "e33", name: "Side Plank Hip Dip", sets: "3 sets · 12 dips/side · 45s rest", tip: "In side plank, dip hip to floor and back up. Targets obliques and love handles.", video: "https://www.youtube.com/results?search_query=side+plank+hip+dip+obliques+tutorial" },
      { id: "e34", name: "Dead Bug", sets: "3 sets · 10 reps/side · 45s rest", tip: "Lie on back, arms up, knees at 90°. Lower opposite arm and leg slowly. Back stays flat.", video: "https://www.youtube.com/results?search_query=dead+bug+exercise+core+tutorial" },
    ],
  },
  


  

];

const CARDIO_OPTIONS = ["Swim", "Treadmill", "Stair Master", "Elliptical", "Walking", "Bike"];

const ACTIVITY_TYPES = [
  { label: "Walking", emoji: "🚶‍♀️" }, { label: "Running", emoji: "🏃‍♀️" },
  { label: "Swimming", emoji: "🏊‍♀️" }, { label: "Cycling", emoji: "🚴‍♀️" },
  { label: "Jump Rope", emoji: "🪢" }, { label: "Yoga", emoji: "🧘‍♀️" }, { label: "Other", emoji: "⚡" },
];

const MEALS = [
  { day: "Monday", tag: "Workout Day 🍑", meals: [
    { type: "Meal 1", time: "11:00am", name: "Scrambled Eggs & Smoked Salmon", cal: 260, protein: 28, ingredients: ["2 large eggs", "40g smoked salmon", "Handful spinach", "Black pepper", "Lemon"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Chicken & Cucumber Salad", cal: 220, protein: 30, ingredients: ["120g grilled chicken", "Cucumber", "Mixed leaves", "Cherry tomatoes", "Lemon & olive oil"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Baked Salmon with Steamed Broccoli", cal: 320, protein: 36, ingredients: ["150g salmon fillet", "Large head broccoli", "Garlic", "Lemon", "Olive oil"] },
  ]},
  { day: "Tuesday", tag: "Rest Day 🌸", meals: [
    { type: "Meal 1", time: "11:00am", name: "Greek Yoghurt with Berries", cal: 180, protein: 18, ingredients: ["150g Greek yoghurt 0%", "Handful mixed berries", "1 tsp honey"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Tuna Salad Bowl", cal: 220, protein: 28, ingredients: ["1 tin tuna in spring water", "Mixed leaves", "Cherry tomatoes", "Cucumber", "Lemon dressing"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Sea Bass with Asparagus", cal: 280, protein: 32, ingredients: ["150g sea bass fillet", "Asparagus", "Lemon", "Capers", "Olive oil"] },
  ]},
  { day: "Wednesday", tag: "Workout Day 💪", meals: [
    { type: "Meal 1", time: "11:00am", name: "Egg White Omelette with Veg", cal: 200, protein: 24, ingredients: ["4 egg whites", "1 whole egg", "Mushrooms", "Spinach", "Red pepper"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Prawn & Avocado Salad", cal: 240, protein: 26, ingredients: ["120g cooked prawns", "½ avocado", "Mixed leaves", "Cucumber", "Lime dressing"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Chicken Thigh with Roasted Veg", cal: 280, protein: 34, ingredients: ["1 skinless chicken thigh", "Courgette", "Red pepper", "Red onion", "Paprika & herbs"] },
  ]},
  { day: "Thursday", tag: "Rest Day 🌸", meals: [
    { type: "Meal 1", time: "11:00am", name: "Smoked Salmon & Egg Muffins", cal: 180, protein: 22, ingredients: ["2 egg muffins (batch baked)", "Eggs + smoked salmon + spinach"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Miso Soup with Tofu & Edamame", cal: 180, protein: 18, ingredients: ["Miso paste", "Silken tofu", "Edamame", "Spring onion", "Seaweed"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Grilled Cod with Green Beans", cal: 240, protein: 34, ingredients: ["180g cod fillet", "Green beans", "Garlic", "Lemon", "Olive oil"] },
  ]},
  { day: "Friday", tag: "Workout Day 🦵", meals: [
    { type: "Meal 1", time: "11:00am", name: "Cottage Cheese & Cucumber", cal: 160, protein: 22, ingredients: ["200g cottage cheese", "Cucumber slices", "Cherry tomatoes", "Black pepper", "Fresh herbs"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Chicken & Mango Lettuce Wraps", cal: 220, protein: 28, ingredients: ["120g grilled chicken", "½ mango diced", "Butter lettuce leaves", "Red chilli", "Lime juice"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Prawn Stir Fry with Pak Choi", cal: 240, protein: 28, ingredients: ["150g king prawns", "Pak choi", "Mushrooms", "Soy sauce", "Ginger", "Sesame oil"] },
  ]},
  { day: "Saturday", tag: "Workout Day 🔥", meals: [
    { type: "Meal 1", time: "11:00am", name: "Poached Eggs & Smashed Avocado", cal: 280, protein: 16, ingredients: ["2 poached eggs", "½ avocado", "1 slice sourdough", "Chilli flakes", "Lemon"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Grilled Chicken Caesar (no croutons)", cal: 220, protein: 32, ingredients: ["130g grilled chicken", "Romaine lettuce", "Small amount parmesan", "Greek yoghurt dressing"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Salmon with Edamame & Cucumber", cal: 280, protein: 34, ingredients: ["160g salmon", "Edamame", "Cucumber", "Soy sauce", "Pickled ginger", "Sesame seeds"] },
  ]},
  { day: "Sunday", tag: "Rest & Prep 🥘", meals: [
    { type: "Meal 1", time: "11:00am", name: "Protein Omelette", cal: 240, protein: 28, ingredients: ["3 eggs", "50g smoked salmon", "Mushrooms", "Spinach", "Fresh herbs"] },
    { type: "Meal 2", time: "2:00–3:00pm", name: "Homemade Chicken Broth & Veg", cal: 200, protein: 24, ingredients: ["120g chicken breast", "Carrots", "Celery", "Onion", "Chicken stock", "Parsley"] },
    { type: "Meal 3", time: "6:00–7:00pm", name: "Teriyaki Salmon with Edamame", cal: 300, protein: 34, ingredients: ["160g salmon", "Edamame", "Broccoli", "Low-sugar teriyaki sauce", "Sesame seeds"] },
  ]},
];

const today = () => new Date().toISOString().slice(0, 10);
const todayDayName = () => new Date().toLocaleDateString("en-US", { weekday: "long" });
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const DRAFT_KEY = "workout-draft";
const MEAL_LOG_KEY = "meal-log";
const emptyCardio = () => ({ type: "Treadmill", time: "", distance: "", incline: "", speed: "" });

async function loadFromServer(key, fallback) {
  try {
    const res = await fetch(`${API}/data`);
    const data = await res.json();
    if (key === "fitness-entries") return data.entries || fallback;
    if (key === MEAL_LOG_KEY) return data.mealLog || fallback;
    if (key === "plan-checked") return data.planChecked || fallback;
    if (key === DRAFT_KEY) return data.workoutDraft || fallback;
    if (key === "metrics") return data.metrics || fallback;
    return fallback;
  } catch { return fallback; }
}

async function saveToServer(key, val) {
  try {
    const map = {
      "fitness-entries": ["/entries", { entries: val }],
      [MEAL_LOG_KEY]: ["/meallog", { mealLog: val }],
      "plan-checked": ["/planchecked", { planChecked: val }],
      [DRAFT_KEY]: ["/draft", { draft: val }],
      "metrics": ["/metrics", { metrics: val }],
    };
    const [path, body] = map[key] || [];
    if (path) await fetch(`${API}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {}
}

// ── UI PRIMITIVES ──────────────────────────────────────────────────────
function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", background: "#fff", borderBottom: `2px solid ${C.border}`, overflowX: "auto", boxShadow: "0 2px 8px rgba(212,104,138,0.08)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          flex: "0 0 auto", padding: "14px 16px", background: "none", border: "none",
          borderBottom: active === t.id ? `3px solid ${C.rose}` : "3px solid transparent",
          color: active === t.id ? C.rose : C.muted, fontSize: 11, fontWeight: 700,
          cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", marginBottom: -2,
        }}>{t.label}</button>
      ))}
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(212,104,138,0.06)", ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", style = {}, disabled = false }) {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${C.rose}, ${C.roseDark})`, color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(212,104,138,0.3)" },
    soft: { background: C.roseLight, color: C.rose, border: `1px solid ${C.border}` },
    ghost: { background: "transparent", color: C.rose, border: `1.5px solid ${C.rose}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      borderRadius: 100, padding: "10px 20px", fontWeight: 700, fontSize: 13,
      cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1,
      fontFamily: "inherit", ...styles[variant], ...style,
    }}>{children}</button>
  );
}

function CardioSection({ cardio, onChange }) {
  return (
    <div style={{ background: C.greenLight, borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${C.greenBorder}` }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 12 }}>🏃‍♀️ Cardio</div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Type</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {CARDIO_OPTIONS.map(opt => (
          <button key={opt} onClick={() => onChange({ ...cardio, type: opt })} style={{
            padding: "7px 16px", borderRadius: 100, fontFamily: "inherit",
            border: `1.5px solid ${cardio.type === opt ? C.green : C.greenBorder}`,
            background: cardio.type === opt ? "#fff" : "transparent",
            color: cardio.type === opt ? C.green : C.muted,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            boxShadow: cardio.type === opt ? "0 2px 8px rgba(106,184,138,0.2)" : "none",
          }}>{opt}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        {[{ label: "Time (mins)", key: "time", placeholder: "e.g. 20" }, { label: "Distance (km)", key: "distance", placeholder: "e.g. 2.5" }].map(f => (
          <div key={f.key}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{f.label}</div>
            <input type="number" value={cardio[f.key]} onChange={e => onChange({ ...cardio, [f.key]: e.target.value })}
              placeholder={f.placeholder} style={{ width: "100%", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[{ label: "Incline %", key: "incline", placeholder: "e.g. 8" }, { label: "Speed (km/h)", key: "speed", placeholder: "e.g. 5.5" }].map(f => (
          <div key={f.key}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{f.label}</div>
            <input type="number" value={cardio[f.key]} onChange={e => onChange({ ...cardio, [f.key]: e.target.value })}
              placeholder={f.placeholder} style={{ width: "100%", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PLAN & LOG ─────────────────────────────────────────────────────────
function PlanWorkoutTab({ onSave }) {
  const [openDay, setOpenDay] = useState(null);
  const [checked, setChecked] = useState({});
  const [loggingDay, setLoggingDay] = useState(null);
  const [draft, setDraft] = useState({});
  const [cardio, setCardio] = useState(emptyCardio());
  const [notes, setNotes] = useState("");
const [date, setDate] = useState(today());
const [saved, setSaved] = useState(false);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([loadFromServer("plan-checked", {}), loadFromServer(DRAFT_KEY, null)]).then(([ch, dr]) => {
      setChecked(ch);
      if (dr) { setDraft(dr.sets || {}); setNotes(dr.notes || ""); setCardio(dr.cardio || emptyCardio()); if (dr.dayId) setLoggingDay(dr.dayId); }
      setLoading(false);
    });
  }, []);

  function persist(dayId, sets, c, n) { saveToServer(DRAFT_KEY, { dayId, sets, cardio: c, notes: n }); }
  function toggleCheck(dayId, exId) { const key = `${dayId}-${exId}`; const u = { ...checked, [key]: !checked[key] }; setChecked(u); saveToServer("plan-checked", u); }
  function resetDay(dayId) { const u = { ...checked }; Object.keys(u).forEach(k => { if (k.startsWith(dayId)) delete u[k]; }); setChecked(u); saveToServer("plan-checked", u); }

  function startLogging(day) {
    if (loggingDay !== day.id) {
      const init = {}; day.exercises.forEach(e => { init[e.name] = [{ reps: "", weight: "" }]; });
      const c = emptyCardio(); setDraft(init); setCardio(c); setNotes(""); setLoggingDay(day.id); persist(day.id, init, c, "");
    }
    setSaved(false); setOpenDay(day.id);
  }

  function addSet(ex) { const u = { ...draft, [ex]: [...(draft[ex] || []), { reps: "", weight: "" }] }; setDraft(u); persist(loggingDay, u, cardio, notes); }
  function removeSet(ex, i) { const u = { ...draft, [ex]: draft[ex].filter((_, idx) => idx !== i) }; setDraft(u); persist(loggingDay, u, cardio, notes); }
  function updSet(ex, i, f, v) { const u = { ...draft, [ex]: draft[ex].map((s, idx) => idx === i ? { ...s, [f]: v } : s) }; setDraft(u); persist(loggingDay, u, cardio, notes); }
  function updCardio(c) { setCardio(c); persist(loggingDay, draft, c, notes); }
  function updNotes(v) { setNotes(v); persist(loggingDay, draft, cardio, v); }

  function handleSave() {
    const day = PLAN.find(d => d.id === loggingDay);
    onSave({ id: Date.now(), type: "workout", date: date, day: day.title, emoji: day.emoji, color: day.color, sets: draft, cardio, notes });
    saveToServer(DRAFT_KEY, null); setLoggingDay(null); setDraft({}); setCardio(emptyCardio()); setNotes(""); setSaved(true);
  }

  function clearDraft() { saveToServer(DRAFT_KEY, null); setLoggingDay(null); setDraft({}); setCardio(emptyCardio()); setNotes(""); }

  const activeDay = loggingDay ? PLAN.find(d => d.id === loggingDay) : null;

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: C.muted }}>Loading... ✨</div>;
  if (saved) return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h2 style={{ color: C.rose, marginBottom: 8, fontFamily: "Georgia, serif" }}>Workout Saved!</h2>
      <p style={{ color: C.muted, marginBottom: 28 }}>Wonderful work. Rest and recover! 🌸</p>
      <Btn onClick={() => setSaved(false)}>Back to Plan</Btn>
    </div>
  );

  return (
    <div>
      {loggingDay && (
        <div style={{ background: "#fff9e8", borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${C.gold}44`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>⏳ In Progress</div>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 700 }}>{activeDay?.emoji} {activeDay?.title}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Auto-saved — expand day below to continue 👇</div>
          </div>
          <button onClick={clearDraft} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
      )}
      <div style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.roseDark})`, borderRadius: 20, padding: 24, marginBottom: 16, textAlign: "center", boxShadow: "0 8px 24px rgba(212,104,138,0.25)" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "rgba(255,255,255,0.8)", marginBottom: 8, textTransform: "uppercase" }}>Your Training Plan</div>
        <h2 style={{ fontSize: 24, color: "#fff", fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 6 }}>Train Hard, Glow Harder</h2>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0 }}>5 workouts · 4 gym · 1 home · Tone & burn 🍑</p>
      </div>
      {PLAN.map(day => {
        const done = day.exercises.filter(e => checked[`${day.id}-${e.id}`]).length;
        const isOpen = openDay === day.id;
        const isDrafting = loggingDay === day.id;
        const pct = (done / day.exercises.length) * 100;
        const isHome = day.id === "d5";
        return (
          <div key={day.id} style={{ background: "#fff", borderRadius: 18, marginBottom: 12, border: `1.5px solid ${isOpen ? day.color + "88" : isDrafting ? C.gold + "88" : C.border}`, overflow: "hidden", boxShadow: isOpen ? `0 4px 20px ${day.color}22` : "0 2px 10px rgba(212,104,138,0.06)" }}>
            <div onClick={() => setOpenDay(isOpen ? null : day.id)} style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: day.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{day.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <div style={{ fontSize: 11, color: day.color, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{day.day} · {day.schedule}</div>
                    <span style={{ fontSize: 10, background: isHome ? C.greenLight : C.roseLight, color: isHome ? C.green : C.rose, borderRadius: 100, padding: "2px 8px", fontWeight: 600 }}>{day.location}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 6 }}>{day.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ height: 5, width: 80, background: C.roseLight, borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${day.color}, ${day.color}cc)`, borderRadius: 10 }} />
                    </div>
                    <span style={{ fontSize: 11, color: C.muted }}>{done}/{day.exercises.length} done</span>
                    {isDrafting && <span style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>• logging</span>}
                  </div>
                </div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 50, background: C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.rose, fontSize: 14, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▾</div>
            </div>
            {isOpen && (
              <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
                {day.exercises.map(ex => {
                  const isChecked = !!checked[`${day.id}-${ex.id}`];
                  const exSets = isDrafting ? draft[ex.name] : null;
                  const isCore = ["Dead Bug", "Russian Twist", "Side Plank Hip Dip", "Dumbbell Woodchop", "Bicycle Crunch"].includes(ex.name);
                  return (
                    <div key={ex.id} style={{ background: isChecked ? "#f9f9f9" : isCore ? "#fdf8ff" : "#fff", borderRadius: 14, padding: 14, marginTop: 12, border: `1.5px solid ${isChecked ? C.green + "66" : isCore ? "#e8d8f8" : C.border}`, opacity: isChecked ? 0.75 : 1 }}>
                      {isCore && !isChecked && <div style={{ fontSize: 10, color: "#9068a8", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>💜 Core & Waist</div>}
                      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <button onClick={() => toggleCheck(day.id, ex.id)} style={{ width: 26, height: 26, borderRadius: 8, border: `2px solid ${isChecked ? C.green : C.border}`, background: isChecked ? C.green : "#fff", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, boxShadow: isChecked ? "0 2px 8px rgba(106,184,138,0.3)" : "none" }}>
                          {isChecked && <span style={{ color: "white", fontSize: 14 }}>✓</span>}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: isChecked ? C.muted : C.text, textDecoration: isChecked ? "line-through" : "none", marginBottom: 3 }}>{ex.name}</div>
                          <div style={{ fontSize: 12, color: day.color, fontWeight: 600, marginBottom: 4 }}>{ex.sets}</div>
                          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{ex.tip}</div>
                        </div>
                      </div>
                      <a href={ex.video} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.roseLight, color: C.rose, borderRadius: 100, padding: "7px 16px", fontSize: 12, fontWeight: 700, textDecoration: "none", border: `1px solid ${C.border}`, marginBottom: isDrafting ? 14 : 0 }}>▶ Watch Tutorial</a>
                      {isDrafting && exSets && (
                        <div style={{ marginTop: 14 }}>
                          <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Log Your Sets</div>
                          {exSets.map((s, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 28px", gap: 10, marginBottom: 10, alignItems: "end" }}>
                              <div style={{ width: 24, height: 24, borderRadius: 50, background: C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.rose, marginBottom: 2 }}>{i + 1}</div>
                              <div>
                                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Reps</div>
                                <input type="number" value={s.reps} onChange={e => updSet(ex.name, i, "reps", e.target.value)} placeholder="0" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 15, fontFamily: "inherit", outline: "none", textAlign: "center", boxSizing: "border-box", fontWeight: 600 }} />
                              </div>
                              <div>
                                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Weight (kg)</div>
                                <input type="number" value={s.weight} onChange={e => updSet(ex.name, i, "weight", e.target.value)} placeholder="0" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 15, fontFamily: "inherit", outline: "none", textAlign: "center", boxSizing: "border-box", fontWeight: 600 }} />
                              </div>
                              <button onClick={() => removeSet(ex.name, i)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20, paddingBottom: 8 }}>×</button>
                            </div>
                          ))}
                          <button onClick={() => addSet(ex.name)} style={{ background: C.roseLight, border: `1px solid ${C.border}`, borderRadius: 100, padding: "7px 16px", color: C.rose, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Add Set</button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {isDrafting ? (
                  <div style={{ marginTop: 16 }}>
                    <CardioSection cardio={cardio} onChange={updCardio} />
                    <Card>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Notes</div>
                      <textarea value={notes} onChange={e => updNotes(e.target.value)} placeholder="How did it feel? Any PRs? 💪" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: 12, fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} />
                    </Card>
                    <div style={{ marginBottom: 12 }}>
  <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Workout Date</div>
  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
</div>
<Btn onClick={handleSave} style={{ width: "100%", padding: 14, borderRadius: 14, fontSize: 15 }}>💾 Save Workout</Btn>
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
      <div style={{ background: `linear-gradient(135deg, #fdf4f8, #fff8fb)`, borderRadius: 16, padding: 20, marginBottom: 12, border: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🌸</div>
        <div style={{ fontWeight: 700, color: C.rose, marginBottom: 6 }}>Rest Days — Tue, Thu, Sun</div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>Recovery is training. Sleep, stretch, walk gently. 💕</div>
      </div>
    </div>
  );
}

// ── MEALS ──────────────────────────────────────────────────────────────
function MealsTab() {
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const defaultIdx = Math.max(0, dayNames.indexOf(todayDayName()));
  const [selectedDay, setSelectedDay] = useState(defaultIdx);
  const [mealLog, setMealLog] = useState({});
  const [editingMeal, setEditingMeal] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [addingExtra, setAddingExtra] = useState(false);
  const [extraFood, setExtraFood] = useState({ name: "", cal: "", protein: "", notes: "" });

  useEffect(() => { loadFromServer(MEAL_LOG_KEY, {}).then(v => setMealLog(v)); }, []);

  function saveMealLog(updated) { setMealLog(updated); saveToServer(MEAL_LOG_KEY, updated); }
  function toggleMeal(dayIdx, mealIdx) { const key = `${dayIdx}-${mealIdx}`; const existing = mealLog[key] || {}; saveMealLog({ ...mealLog, [key]: { ...existing, eaten: !existing.eaten } }); }
  function saveNote(dayIdx, mealIdx) { const key = `${dayIdx}-${mealIdx}`; const existing = mealLog[key] || {}; saveMealLog({ ...mealLog, [key]: { ...existing, note: noteText } }); setEditingMeal(null); setNoteText(""); }
  function saveExtraFood() { if (!extraFood.name) return; const key = `extra-${selectedDay}`; const existing = mealLog[key] || []; saveMealLog({ ...mealLog, [key]: [...existing, { ...extraFood, id: Date.now() }] }); setExtraFood({ name: "", cal: "", protein: "", notes: "" }); setAddingExtra(false); }
  function deleteExtra(dayIdx, id) { const key = `extra-${dayIdx}`; const existing = mealLog[key] || []; saveMealLog({ ...mealLog, [key]: existing.filter(e => e.id !== id) }); }

  const dayData = MEALS[selectedDay];
  const extraItems = mealLog[`extra-${selectedDay}`] || [];
  const extraCal = extraItems.reduce((a, e) => a + (parseInt(e.cal) || 0), 0);
  const extraProtein = extraItems.reduce((a, e) => a + (parseInt(e.protein) || 0), 0);

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, #1a2a3a, #2a3a4a)`, borderRadius: 14, padding: 14, marginBottom: 14, display: "flex", gap: 10, alignItems: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
        <span style={{ fontSize: 22 }}>🌙</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e8d8c8", marginBottom: 2 }}>16:8 Intermittent Fasting</div>
          <div style={{ fontSize: 11, color: "#a09080" }}>Eating window: <span style={{ color: "#90e8a8" }}>11am – 7pm</span></div>
          <div style={{ fontSize: 11, color: "#706050", marginTop: 2 }}>☕ Morning tea with oat milk splash is fine</div>
        </div>
      </div>
      <div style={{ background: C.greenLight, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${C.greenBorder}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 4 }}>🥬 Daily Smoothie — Every Day</div>
        <div style={{ fontSize: 11, color: "#508060", lineHeight: 1.6, marginBottom: 10 }}>½ cup chia/flax · 1.5L kale · ½L forest fruits · tropical fruit · 1.5 scoops Leanfit vanilla protein · water</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["~890 kcal","57g protein","30g+ fibre","Omega-3s ✓"].map(s => (
            <span key={s} style={{ background: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: C.green, border: `1px solid ${C.greenBorder}`, fontWeight: 600 }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        {dayNames.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)} style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 100, border: `1.5px solid ${selectedDay === i ? C.rose : C.border}`, background: selectedDay === i ? `linear-gradient(135deg, ${C.rose}, ${C.roseDark})` : "#fff", color: selectedDay === i ? "#fff" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: selectedDay === i ? "0 4px 12px rgba(212,104,138,0.3)" : "none" }}>{d.slice(0,3)}{i === defaultIdx ? " 📍" : ""}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>{dayData.day}</div>
        <div style={{ fontSize: 11, color: C.rose, fontWeight: 700, background: C.roseLight, padding: "4px 12px", borderRadius: 100 }}>{dayData.tag}</div>
      </div>
      {dayData.meals.map((meal, mealIdx) => {
        const key = `${selectedDay}-${mealIdx}`;
        const log = mealLog[key] || {};
        const isEaten = !!log.eaten;
        const hasNote = !!log.note;
        return (
          <div key={mealIdx} style={{ background: isEaten ? "#f8fdf9" : "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: `1.5px solid ${isEaten ? C.greenBorder : C.border}`, boxShadow: "0 2px 10px rgba(212,104,138,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: C.rose, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{meal.type}</span>
                  <span style={{ fontSize: 11, color: C.green, fontWeight: 700, background: C.greenLight, padding: "2px 8px", borderRadius: 100 }}>⏰ {meal.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: isEaten ? C.muted : C.text, textDecoration: isEaten ? "line-through" : "none", marginBottom: 6, fontFamily: "Georgia, serif" }}>{meal.name}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ background: C.rosePale, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: C.muted }}><strong style={{ color: C.rose }}>{meal.cal}</strong> kcal</span>
                  <span style={{ background: C.rosePale, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: C.muted }}><strong style={{ color: C.rose }}>{meal.protein}g</strong> protein</span>
                </div>
              </div>
              <button onClick={() => toggleMeal(selectedDay, mealIdx)} style={{ width: 32, height: 32, borderRadius: 10, border: `2px solid ${isEaten ? C.green : C.border}`, background: isEaten ? C.green : "#fff", cursor: "pointer", marginLeft: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: isEaten ? "0 2px 8px rgba(106,184,138,0.3)" : "none" }}>
                {isEaten ? <span style={{ color: "white" }}>✓</span> : <span style={{ color: C.border }}>○</span>}
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {meal.ingredients.map((ing, i) => <span key={i} style={{ background: C.rosePale, borderRadius: 8, padding: "3px 10px", fontSize: 10, color: C.muted, fontWeight: 500 }}>{ing}</span>)}
            </div>
            {hasNote && <div style={{ background: "#fff9e8", borderRadius: 8, padding: "8px 12px", marginBottom: 10, fontSize: 11, color: C.gold, fontStyle: "italic", border: `1px solid ${C.gold}33` }}>📝 {log.note}</div>}
            <button onClick={() => { setEditingMeal({ dayIdx: selectedDay, mealIdx }); setNoteText(log.note || ""); }} style={{ background: "none", border: "none", color: C.rose, fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit", fontWeight: 600 }}>{hasNote ? "✏️ Edit note" : "+ Add note / substitution"}</button>
          </div>
        );
      })}
      {extraItems.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>🍪 Additional Food Logged</div>
          {extraItems.map(item => (
            <div key={item.id} style={{ background: "#fff9e8", borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: `1px solid ${C.gold}44`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.name}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {item.cal && <span style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>{item.cal} kcal</span>}
                  {item.protein && <span style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>{item.protein}g protein</span>}
                </div>
                {item.notes && <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontStyle: "italic" }}>{item.notes}</div>}
              </div>
              <button onClick={() => deleteExtra(selectedDay, item.id)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>🗑</button>
            </div>
          ))}
        </div>
      )}
      {addingExtra ? (
        <div style={{ background: "#fff9e8", borderRadius: 16, padding: 16, marginBottom: 14, border: `1px solid ${C.gold}44` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 12 }}>🍪 Log Additional Food</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Food Name *</div>
            <input value={extraFood.name} onChange={e => setExtraFood(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Handful of almonds" style={{ width: "100%", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {[{ key: "cal", label: "Calories (approx)", placeholder: "e.g. 150" }, { key: "protein", label: "Protein (g)", placeholder: "e.g. 5" }].map(f => (
              <div key={f.key}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</div>
                <input type="number" value={extraFood[f.key]} onChange={e => setExtraFood(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Notes (optional)</div>
            <input value={extraFood.notes} onChange={e => setExtraFood(p => ({ ...p, notes: e.target.value }))} placeholder="e.g. Post-workout snack" style={{ width: "100%", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => setAddingExtra(false)} variant="soft" style={{ flex: 1 }}>Cancel</Btn>
            <Btn onClick={saveExtraFood} style={{ flex: 1 }}>💾 Save</Btn>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddingExtra(true)} style={{ width: "100%", background: "#fff", border: `1.5px dashed ${C.gold}88`, borderRadius: 14, padding: 14, color: C.gold, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 14 }}>🍪 + Log Additional Food</button>
      )}
      <div style={{ background: `linear-gradient(135deg, ${C.roseLight}, #fff)`, borderRadius: 14, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 12, color: C.rose, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Daily Totals</div>
        {[
          { label: "🥬 Smoothie", val: "~890 kcal · 57g protein", color: C.green },
          { label: "🍽️ Meals", val: `${dayData.meals.reduce((a,m) => a+m.cal, 0)} kcal · ${dayData.meals.reduce((a,m) => a+m.protein, 0)}g protein`, color: C.rose },
          extraItems.length > 0 ? { label: "🍪 Extra", val: `${extraCal} kcal · ${extraProtein}g protein`, color: C.gold } : null,
          { label: "🔥 Total", val: `${dayData.meals.reduce((a,m) => a+m.cal, 890) + extraCal} kcal · ${dayData.meals.reduce((a,m) => a+m.protein, 57) + extraProtein}g protein`, color: C.roseDark },
        ].filter(Boolean).map(s => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>{s.label}</span>
            <strong style={{ fontSize: 13, color: s.color }}>{s.val}</strong>
          </div>
        ))}
      </div>
      {editingMeal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,32,48,0.5)", display: "flex", alignItems: "flex-end", zIndex: 1000, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", boxSizing: "border-box" }}>
            <div style={{ width: 40, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16, fontFamily: "Georgia, serif" }}>Add Note or Substitution</div>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} autoFocus placeholder="e.g. Swapped chicken for tuna..." style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 14, color: C.text, padding: 14, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 90, marginBottom: 16, resize: "vertical", boxSizing: "border-box" }} />
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

// ── METRICS ────────────────────────────────────────────────────────────
function MetricsTab() {
  const [metrics, setMetrics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: today(), weight: "", chest: "", waist: "", hips: "" });
  const [activeChart, setActiveChart] = useState("waist");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadFromServer("metrics", []).then(v => { setMetrics(v); setLoading(false); }); }, []);

  function saveMetrics(updated) { setMetrics(updated); saveToServer("metrics", updated); }

  function handleAdd() {
    if (!form.date) return;
    const existing = metrics.findIndex(m => m.date === form.date);
    let updated;
    if (existing >= 0) { updated = metrics.map((m, i) => i === existing ? { ...m, ...form } : m); }
    else { updated = [...metrics, { ...form, id: Date.now() }].sort((a, b) => a.date.localeCompare(b.date)); }
    saveMetrics(updated); setShowForm(false); setForm({ date: today(), weight: "", chest: "", waist: "", hips: "" });
  }

  const sorted = [...metrics].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];

  const CHART_OPTIONS = [
    { key: "weight", label: "Weight", unit: "kg", color: "#d4688a" },
    { key: "waist", label: "Waist", unit: "cm", color: "#9068a8" },
    { key: "hips", label: "Hips", unit: "cm", color: "#c87850" },
    { key: "chest", label: "Chest", unit: "cm", color: "#6ab88a" },
  ];

  const chartOption = CHART_OPTIONS.find(c => c.key === activeChart);
  const chartData = sorted.filter(m => m[activeChart]).map(m => ({ date: fmtDate(m.date), val: parseFloat(m[activeChart]) }));
  const chartMin = chartData.length ? Math.min(...chartData.map(d => d.val)) - 2 : 0;
  const chartMax = chartData.length ? Math.max(...chartData.map(d => d.val)) + 2 : 100;
  const chartRange = chartMax - chartMin || 1;
  const chartW = 320; const chartH = 160;
  const padL = 40; const padR = 16; const padT = 16; const padB = 32;
  const innerW = chartW - padL - padR; const innerH = chartH - padT - padB;
  function cx(i) { return padL + (i / Math.max(chartData.length - 1, 1)) * innerW; }
  function cy(v) { return padT + (1 - (v - chartMin) / chartRange) * innerH; }
  const polyline = chartData.map((d, i) => `${cx(i)},${cy(d.val)}`).join(" ");

  function diff(key) {
    if (!latest || !first || latest === first) return null;
    const d = parseFloat(latest[key]) - parseFloat(first[key]);
    return isNaN(d) ? null : d;
  }

  const STATS = [
    { key: "weight", label: "Weight", unit: "kg", emoji: "⚖️", color: "#d4688a" },
    { key: "chest", label: "Chest", unit: "cm", emoji: "👙", color: "#6ab88a" },
    { key: "waist", label: "Waist", unit: "cm", emoji: "🎀", color: "#9068a8" },
    { key: "hips", label: "Hips", unit: "cm", emoji: "🍑", color: "#c87850" },
  ];

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: C.muted }}>Loading... ✨</div>;

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.roseDark})`, borderRadius: 20, padding: 24, marginBottom: 16, textAlign: "center", boxShadow: "0 8px 24px rgba(212,104,138,0.25)" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "rgba(255,255,255,0.8)", marginBottom: 8, textTransform: "uppercase" }}>Body Metrics</div>
        <h2 style={{ fontSize: 22, color: "#fff", fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 6 }}>Track Your Transformation</h2>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0 }}>Log weekly · Watch yourself change 🌸</p>
      </div>

      {latest && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {STATS.map(s => {
            const d = diff(s.key);
            const isGood = d !== null && d < 0;
            const isBad = d !== null && d > 0;
            return (
              <div key={s.key} style={{ background: "#fff", borderRadius: 16, padding: 16, border: `1.5px solid ${C.border}`, boxShadow: "0 2px 10px rgba(212,104,138,0.06)" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: C.text, fontFamily: "Georgia, serif" }}>
                  {latest[s.key] || "—"}
                  <span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>{latest[s.key] ? ` ${s.unit}` : ""}</span>
                </div>
                {d !== null && (
                  <div style={{ fontSize: 11, color: isGood ? C.green : isBad ? C.rose : C.muted, fontWeight: 700, marginTop: 4 }}>
                    {d > 0 ? "▲" : "▼"} {Math.abs(d).toFixed(1)}{s.unit} since start
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {chartData.length > 1 && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, border: `1.5px solid ${C.border}`, boxShadow: "0 2px 10px rgba(212,104,138,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>📈 Progress Chart</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {CHART_OPTIONS.map(o => (
              <button key={o.key} onClick={() => setActiveChart(o.key)} style={{ padding: "6px 14px", borderRadius: 100, fontFamily: "inherit", border: `1.5px solid ${activeChart === o.key ? o.color : C.border}`, background: activeChart === o.key ? o.color + "18" : "#fff", color: activeChart === o.key ? o.color : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{o.label}</button>
            ))}
          </div>
          <div style={{ overflowX: "auto" }}>
            <svg width={Math.max(chartW, chartData.length * 60)} height={chartH} style={{ display: "block" }}>
              {[0, 0.25, 0.5, 0.75, 1].map(t => {
                const y = padT + t * innerH;
                const val = (chartMax - t * chartRange).toFixed(1);
                return (
                  <g key={t}>
                    <line x1={padL} y1={y} x2={Math.max(chartW, chartData.length * 60) - padR} y2={y} stroke={C.border} strokeWidth={1} />
                    <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9} fill={C.muted}>{val}</text>
                  </g>
                );
              })}
              {chartData.length > 1 && <polygon points={`${cx(0)},${padT + innerH} ${polyline} ${cx(chartData.length - 1)},${padT + innerH}`} fill={chartOption.color + "18"} />}
              {chartData.length > 1 && <polyline points={polyline} fill="none" stroke={chartOption.color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />}
              {chartData.map((d, i) => (
                <g key={i}>
                  <circle cx={cx(i)} cy={cy(d.val)} r={5} fill="#fff" stroke={chartOption.color} strokeWidth={2.5} />
                  <text x={cx(i)} y={cy(d.val) - 10} textAnchor="middle" fontSize={9} fill={chartOption.color} fontWeight="700">{d.val}</text>
                  <text x={cx(i)} y={chartH - 6} textAnchor="middle" fontSize={9} fill={C.muted}>{d.date}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.rose}, ${C.roseDark})`, border: "none", borderRadius: 14, padding: 14, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(212,104,138,0.3)", marginBottom: 16 }}>
          + Log This Week's Measurements
        </button>
      )}

      {showForm && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 16, border: `1.5px solid ${C.border}`, boxShadow: "0 4px 20px rgba(212,104,138,0.1)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16, fontFamily: "Georgia, serif" }}>📏 Log Measurements</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Date</div>
            <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { key: "weight", label: "Weight (kg)", placeholder: "e.g. 62.5", emoji: "⚖️" },
              { key: "chest", label: "Chest (cm)", placeholder: "e.g. 88", emoji: "👙" },
              { key: "waist", label: "Waist (cm)", placeholder: "e.g. 72", emoji: "🎀" },
              { key: "hips", label: "Hips (cm)", placeholder: "e.g. 96", emoji: "🍑" },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{f.emoji} {f.label}</div>
                <input type="number" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} step="0.1" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", fontWeight: 600 }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => setShowForm(false)} variant="soft" style={{ flex: 1 }}>Cancel</Btn>
            <Btn onClick={handleAdd} style={{ flex: 1 }}>💾 Save</Btn>
          </div>
        </div>
      )}

      {sorted.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>All Entries</div>
          {[...sorted].reverse().map(m => (
            <div key={m.id} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1.5px solid ${C.border}`, boxShadow: "0 2px 8px rgba(212,104,138,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>📅 {fmtDate(m.date)}</div>
                <button onClick={() => saveMetrics(metrics.filter(x => x.id !== m.id))} style={{ background: "#f8f8f8", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🗑</button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { key: "weight", label: "Weight", unit: "kg", emoji: "⚖️", color: "#d4688a" },
                  { key: "chest", label: "Chest", unit: "cm", emoji: "👙", color: "#6ab88a" },
                  { key: "waist", label: "Waist", unit: "cm", emoji: "🎀", color: "#9068a8" },
                  { key: "hips", label: "Hips", unit: "cm", emoji: "🍑", color: "#c87850" },
                ].map(s => m[s.key] ? (
                  <div key={s.key} style={{ background: C.rosePale, borderRadius: 10, padding: "8px 12px", textAlign: "center", minWidth: 68 }}>
                    <div style={{ fontSize: 14 }}>{s.emoji}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{m[s.key]}</div>
                    <div style={{ fontSize: 9, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{s.unit}</div>
                  </div>
                ) : null)}
              </div>
            </div>
          ))}
        </div>
      )}

      {sorted.length === 0 && !showForm && (
        <div style={{ textAlign: "center", padding: "32px 24px", color: C.muted }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📏</div>
          <p style={{ fontSize: 14, marginBottom: 6 }}>No measurements yet.</p>
          <p style={{ fontSize: 12 }}>Tap above to log your first entry and start tracking your transformation! 🌸</p>
        </div>
      )}
    </div>
  );
}

// ── ACTIVITY ───────────────────────────────────────────────────────────
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
      <h2 style={{ color: C.rose, marginBottom: 8, fontFamily: "Georgia, serif" }}>Activity Logged!</h2>
      <p style={{ color: C.muted, marginBottom: 28 }}>Every movement counts. 💕</p>
      <Btn onClick={() => { setDone(false); setDuration(""); setDistance(""); setNotes(""); }}>Log Another</Btn>
    </div>
  );

  return (
    <div>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Activity Type</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ACTIVITY_TYPES.map(a => (
            <button key={a.label} onClick={() => setType(a.label)} style={{ padding: "8px 16px", borderRadius: 100, border: `1.5px solid ${type === a.label ? C.rose : C.border}`, background: type === a.label ? `linear-gradient(135deg, ${C.rose}, ${C.roseDark})` : "#fff", color: type === a.label ? "#fff" : C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: type === a.label ? "0 4px 12px rgba(212,104,138,0.3)" : "none" }}>{a.emoji} {a.label}</button>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 7, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Duration (minutes)</div>
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 45" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "11px 14px", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", fontWeight: 600 }} />
      </Card>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 7, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Distance in km (optional)</div>
        <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 3.5" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "11px 14px", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", fontWeight: 600 }} />
      </Card>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 7, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Notes</div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Paste Garmin stats here..." style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "11px 14px", fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 70, resize: "vertical", boxSizing: "border-box" }} />
      </Card>
      <Btn onClick={handleSave} style={{ width: "100%", padding: 14, borderRadius: 14, fontSize: 15 }}>💾 Save Activity</Btn>
    </div>
  );
}

// ── HISTORY ────────────────────────────────────────────────────────────
function History({ entries, onDelete, onUpdate }) {
  const [editingEntry, setEditingEntry] = useState(null);
  const [editDraft, setEditDraft] = useState({});
  const [editCardio, setEditCardio] = useState(emptyCardio());
  const [editNotes, setEditNotes] = useState("");

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  function startEdit(entry) { setEditingEntry(entry); setEditDraft(JSON.parse(JSON.stringify(entry.sets || {}))); setEditCardio(entry.cardio || emptyCardio()); setEditNotes(entry.notes || ""); }
  function updEditSet(ex, i, f, v) { setEditDraft(prev => ({ ...prev, [ex]: prev[ex].map((s, idx) => idx === i ? { ...s, [f]: v } : s) })); }
  function addEditSet(ex) { setEditDraft(prev => ({ ...prev, [ex]: [...(prev[ex] || []), { reps: "", weight: "" }] })); }
  function removeEditSet(ex, i) { setEditDraft(prev => ({ ...prev, [ex]: prev[ex].filter((_, idx) => idx !== i) })); }
  function saveEdit() { onUpdate({ ...editingEntry, sets: editDraft, cardio: editCardio, notes: editNotes }); setEditingEntry(null); }

  if (!sorted.length) return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: C.muted }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
      <p style={{ fontSize: 15 }}>No entries yet. Log your first workout!</p>
    </div>
  );

  if (editingEntry) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setEditingEntry(null)} style={{ width: 36, height: 36, borderRadius: 50, background: C.roseLight, border: "none", color: C.rose, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Edit {editingEntry.emoji} {fmtDate(editingEntry.date)}</div>
      </div>
      {editingEntry.type === "workout" && Object.entries(editDraft).map(([ex, sets]) => (
        <Card key={ex}>
          <div style={{ fontWeight: 700, color: C.rose, marginBottom: 10, fontSize: 14 }}>{ex}</div>
          {sets.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 28px", gap: 8, marginBottom: 8, alignItems: "end" }}>
              <div style={{ width: 24, height: 24, borderRadius: 50, background: C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.rose, marginBottom: 2 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Reps</div>
                <input type="number" value={s.reps} onChange={e => updEditSet(ex, i, "reps", e.target.value)} placeholder="0" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Weight (kg)</div>
                <input type="number" value={s.weight} onChange={e => updEditSet(ex, i, "weight", e.target.value)} placeholder="0" style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => removeEditSet(ex, i)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18, paddingBottom: 8 }}>×</button>
            </div>
          ))}
          <button onClick={() => addEditSet(ex)} style={{ background: C.roseLight, border: `1px solid ${C.border}`, borderRadius: 100, padding: "7px 16px", color: C.rose, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>+ Set</button>
        </Card>
      ))}
      {editingEntry.type === "workout" && <CardioSection cardio={editCardio} onChange={setEditCardio} />}
      <Card>
        <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Notes</div>
        <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Notes..." style={{ width: "100%", background: C.rosePale, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, padding: 12, fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} />
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
            <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{e.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 14, fontFamily: "Georgia, serif" }}>{e.type === "workout" ? e.day : e.activityType}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontWeight: 500 }}>{fmtDate(e.date)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {e.type === "workout" && <button onClick={() => startEdit(e)} style={{ width: 32, height: 32, borderRadius: 8, background: C.roseLight, border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✏️</button>}
              <button onClick={() => onDelete(e.id)} style={{ width: 32, height: 32, borderRadius: 8, background: "#f8f8f8", border: "none", color: C.muted, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🗑</button>
            </div>
          </div>
          {e.type === "workout" && (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: e.cardio?.time ? 8 : 0 }}>
                {Object.entries(e.sets || {}).map(([ex, setArr]) => {
                  const valid = (setArr || []).filter(s => s.reps || s.weight);
                  if (!valid.length) return null;
                  return <div key={ex} style={{ background: C.rosePale, borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 500 }}><span style={{ color: C.muted }}>{ex}: </span><span style={{ color: C.rose, fontWeight: 700 }}>{valid.map(s => `${s.reps ? s.reps+"×" : ""}${s.weight ? s.weight+"kg" : "bw"}`).join(" / ")}</span></div>;
                })}
              </div>
              {e.cardio?.time && (
                <div style={{ background: C.greenLight, borderRadius: 8, padding: "8px 12px", display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>🏃‍♀️ {e.cardio.type}</span>
                  {e.cardio.time && <span style={{ fontSize: 11, color: "#508060", fontWeight: 600 }}>⏱ {e.cardio.time}m</span>}
                  {e.cardio.distance && <span style={{ fontSize: 11, color: "#508060", fontWeight: 600 }}>📍 {e.cardio.distance}km</span>}
                  {e.cardio.speed && <span style={{ fontSize: 11, color: "#508060", fontWeight: 600 }}>💨 {e.cardio.speed}km/h</span>}
                  {e.cardio.incline && <span style={{ fontSize: 11, color: "#508060", fontWeight: 600 }}>📐 {e.cardio.incline}%</span>}
                </div>
              )}
            </div>
          )}
          {e.type === "activity" && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {e.duration && <div style={{ background: C.greenLight, borderRadius: 8, padding: "5px 12px", fontSize: 11, color: C.green, fontWeight: 700 }}>⏱ {e.duration} mins</div>}
              {e.distance && <div style={{ background: C.greenLight, borderRadius: 8, padding: "5px 12px", fontSize: 11, color: C.green, fontWeight: 700 }}>📍 {e.distance} km</div>}
            </div>
          )}
          {e.notes && <div style={{ marginTop: 10, fontSize: 11, color: C.muted, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>{e.notes}</div>}
        </Card>
      ))}
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("plan");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromServer("fitness-entries", []).then(v => { setEntries(v); setLoading(false); });
  }, []);

  function addEntry(entry) { const updated = [...entries, entry]; setEntries(updated); saveToServer("fitness-entries", updated); }
  function deleteEntry(id) { const updated = entries.filter(e => e.id !== id); setEntries(updated); saveToServer("fitness-entries", updated); }
  function updateEntry(updated) { const all = entries.map(e => e.id === updated.id ? updated : e); setEntries(all); saveToServer("fitness-entries", all); }

  const TABS = [
    { id: "plan", label: "📋 Plan & Log" },
    { id: "meals", label: "🥗 Meals" },
    { id: "metrics", label: "📏 Metrics" },
    { id: "activity", label: "🚶 Activity" },
    { id: "history", label: "🕐 History" },
  ];

  if (loading) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
        <div style={{ color: C.muted, fontSize: 14 }}>Loading your fitness journal...</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif", color: C.text }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { display: none; } input[type=number]::-webkit-inner-spin-button { opacity: 0.3; } button { transition: all 0.15s; } button:active { transform: scale(0.97); }`}</style>
      <div style={{ padding: "24px 18px 14px", background: `linear-gradient(135deg, #fff5f8, #fff)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.blush, marginBottom: 4, fontWeight: 700 }}>Your Fitness Journal</div>
        <h1 style={{ fontSize: 26, color: C.rose, margin: 0, fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>Train. Nourish. Glow. 🌸</h1>
      </div>
      <TabBar tabs={TABS} active={tab} onSelect={setTab} />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "18px 14px 80px" }}>
        {tab === "plan" && <PlanWorkoutTab onSave={addEntry} />}
        {tab === "meals" && <MealsTab />}
        {tab === "metrics" && <MetricsTab />}
        {tab === "activity" && <LogActivity onSave={addEntry} />}
        {tab === "history" && <History entries={entries} onDelete={deleteEntry} onUpdate={updateEntry} />}
      </div>
    </div>
  );
}
