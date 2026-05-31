import { useState, useEffect } from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
  TextInput, StatusBar, SafeAreaView, Linking, Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const C = {
  bg: '#120d0f', card: '#231419', border: '#2e1f22',
  rose: '#c9504a', blush: '#f2c4c4', muted: '#888', dark: '#1a1014',
  green: '#7adf8a', greenDark: '#0f1f18', greenBorder: '#2a4a3a',
};

const PLAN = [
  {
    id: 'd1', day: 'Day 1', schedule: 'Monday',
    title: 'Glutes, Hamstrings & Core', emoji: '🍑', color: '#c9504a',
    exercises: [
      { id: 'e1', name: 'Hip Thrust', sets: '4 sets · 12–15 reps · 60s rest', tip: 'Squeeze hard at the top. Drive through your heels.', video: 'https://www.youtube.com/results?search_query=hip+thrust+form+tutorial+women' },
      { id: 'e2', name: 'Romanian Deadlift', sets: '3 sets · 10–12 reps · 60s rest', tip: 'Hinge at hips. Feel the stretch down your legs. Flat back.', video: 'https://www.youtube.com/results?search_query=romanian+deadlift+women+tutorial' },
      { id: 'e3', name: 'Donkey Kick + Fire Hydrant', sets: '3 sets · 15 reps/side · 45s rest', tip: 'Back-to-back no rest. Burns glute medius for that round shape.', video: 'https://www.youtube.com/results?search_query=donkey+kick+fire+hydrant+glutes+tutorial' },
      { id: 'e4', name: 'Plank to Knee Tap', sets: '3 sets · 20 reps · 45s rest', tip: 'From plank, tap opposite knee. Hold form.', video: 'https://www.youtube.com/results?search_query=plank+knee+tap+core+exercise+tutorial' },
    ],
  },
  {
    id: 'd2', day: 'Day 2', schedule: 'Wednesday',
    title: 'Upper Body & Shoulders', emoji: '💪', color: '#7a6fa8',
    exercises: [
      { id: 'e5', name: 'Dumbbell Lateral Raise', sets: '4 sets · 15 reps · 45s rest', tip: 'Light weight, full range. Arms parallel to floor.', video: 'https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form+women+shoulder' },
      { id: 'e6', name: 'Seated Shoulder Press', sets: '3 sets · 10–12 reps · 60s rest', tip: 'Sit upright. Elbows at 90° at bottom.', video: 'https://www.youtube.com/results?search_query=seated+dumbbell+shoulder+press+form+tutorial' },
      { id: 'e7', name: 'Bent-Over Dumbbell Row', sets: '3 sets · 12 reps/side · 60s rest', tip: 'Pull toward your hip. Squeeze at the top.', video: 'https://www.youtube.com/results?search_query=dumbbell+bent+over+row+form+tutorial+women' },
      { id: 'e8', name: 'Bicep Curl + Tricep Extension', sets: '3 rounds · 12+12 reps · 60s rest', tip: 'Superset back-to-back. Curls: elbows pinned to sides.', video: 'https://www.youtube.com/results?search_query=bicep+curl+tricep+extension+superset+women+dumbbell' },
    ],
  },
  {
    id: 'd3', day: 'Day 3', schedule: 'Friday',
    title: 'Legs, Quads & Inner Thighs', emoji: '🦵', color: '#4a8b7a',
    exercises: [
      { id: 'e9', name: 'Goblet Squat', sets: '4 sets · 12–15 reps · 60s rest', tip: 'Hold dumbbell at chest. Toes slightly out. Sit deep.', video: 'https://www.youtube.com/results?search_query=goblet+squat+form+tutorial+women' },
      { id: 'e10', name: 'Reverse Lunge', sets: '3 sets · 10 reps/leg · 60s rest', tip: 'Step backward. Front knee over ankle.', video: 'https://www.youtube.com/results?search_query=reverse+lunge+dumbbell+women+tutorial' },
      { id: 'e11', name: 'Sumo Squat Pulse', sets: '3 sets · 30 sec · 45s rest', tip: 'Wide stance, toes out 45°. Pulse 2 inches.', video: 'https://www.youtube.com/results?search_query=sumo+squat+pulse+inner+thigh+women' },
      { id: 'e12', name: 'Leg Press', sets: '3 sets · 12 reps · 75s rest', tip: 'Feet high and wide to target glutes. Go heavy.', video: 'https://www.youtube.com/results?search_query=leg+press+high+foot+placement+glutes+tutorial' },
    ],
  },
  {
    id: 'd4', day: 'Day 4', schedule: 'Saturday',
    title: 'Full Body Burn & Abs', emoji: '🔥', color: '#c87c2a',
    exercises: [
      { id: 'e13', name: 'Dumbbell Deadlift', sets: '4 sets · 10 reps · 75s rest', tip: 'Full-body compound. Push the floor away as you stand.', video: 'https://www.youtube.com/results?search_query=dumbbell+deadlift+women+form+tutorial' },
      { id: 'e14', name: 'Push-Up', sets: '3 sets · 8–12 reps · 60s rest', tip: 'Start on knees if needed. Chest to ground.', video: 'https://www.youtube.com/results?search_query=push+up+form+women+modified+tutorial' },
      { id: 'e15', name: 'Glute Bridge Abduction', sets: '3 sets · 15 reps · 45s rest', tip: 'Band above knees. Drive knees out in bridge.', video: 'https://www.youtube.com/results?search_query=glute+bridge+band+abduction+tutorial+women' },
      { id: 'e16', name: 'Bicycle Crunch', sets: '3 sets · 20 reps · 45s rest', tip: 'Slow and controlled. Elbow to opposite knee.', video: 'https://www.youtube.com/results?search_query=bicycle+crunch+correct+form+tutorial' },
    ],
  },
];

const CARDIO_OPTIONS = ['Swim', 'Treadmill', 'Stair Master', 'Elliptical', 'Walking'];

const ACTIVITY_TYPES = [
  { label: 'Walking', emoji: '🚶‍♀️' }, { label: 'Running', emoji: '🏃‍♀️' },
  { label: 'Swimming', emoji: '🏊‍♀️' }, { label: 'Cycling', emoji: '🚴‍♀️' },
  { label: 'Jump Rope', emoji: '🪢' }, { label: 'Yoga', emoji: '🧘‍♀️' }, { label: 'Other', emoji: '⚡' },
];

const MEALS = [
  {
    day: 'Monday', tag: 'Workout Day 🍑',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Scrambled Eggs & Smoked Salmon on Sourdough', cal: 380, protein: 34, ingredients: ['3 large eggs', '50g smoked salmon', '1 slice sourdough', 'Spinach', 'Lemon'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Chicken & Quinoa Power Bowl', cal: 390, protein: 42, ingredients: ['150g grilled chicken', '70g quinoa', 'Cherry tomatoes', 'Cucumber', 'Mixed leaves'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Baked Salmon with Broccoli & Sweet Potato', cal: 490, protein: 38, ingredients: ['180g salmon', '1 sweet potato', 'Tenderstem broccoli', 'Garlic', 'Lemon'] },
    ]
  },
  {
    day: 'Tuesday', tag: 'Rest Day 🌸',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Greek Yoghurt Bowl with Berries & Granola', cal: 320, protein: 24, ingredients: ['200g Greek yoghurt 0%', 'Handful berries', '1 tbsp honey', '30g granola'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Leftover Chicken & Quinoa Bowl', cal: 430, protein: 40, ingredients: ['150g chicken (leftover)', '70g quinoa (leftover)', '½ avocado', 'Mixed leaves'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Chicken Stir Fry with Brown Rice', cal: 400, protein: 36, ingredients: ['150g chicken breast', '70g brown rice', 'Pak choi', 'Red pepper', 'Soy sauce'] },
    ]
  },
  {
    day: 'Wednesday', tag: 'Workout Day 💪',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Protein Oats with Banana & Peanut Butter', cal: 420, protein: 30, ingredients: ['60g rolled oats', '1 scoop protein powder', '200ml oat milk', '1 banana'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Tuna & Avocado Wrap', cal: 380, protein: 34, ingredients: ['1 wholemeal wrap', '1 tin tuna', '½ avocado', 'Mixed leaves', 'Lemon juice'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Chicken Thighs with Roasted Veg & Couscous', cal: 460, protein: 40, ingredients: ['2 chicken thighs', '70g couscous', 'Courgette', 'Red pepper', 'Paprika'] },
    ]
  },
  {
    day: 'Thursday', tag: 'Rest Day 🌸',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Smoked Salmon & Egg Muffins', cal: 260, protein: 26, ingredients: ['2 egg muffins (batch baked)', '3 eggs + 50g salmon + spinach per batch'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Lentil & Roasted Veg Soup', cal: 340, protein: 20, ingredients: ['Red lentils', 'Carrots', 'Celery', 'Onion', 'Veg stock', 'Cumin'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Sea Bass with Asparagus & New Potatoes', cal: 420, protein: 36, ingredients: ['2 sea bass fillets', '180g new potatoes', 'Asparagus', 'Lemon', 'Capers'] },
    ]
  },
  {
    day: 'Friday', tag: 'Workout Day 🦵',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Scrambled Eggs & Smoked Salmon on Sourdough', cal: 380, protein: 34, ingredients: ['3 large eggs', '50g smoked salmon', '1 slice sourdough', 'Spinach'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Prawn & Mango Salad', cal: 280, protein: 30, ingredients: ['150g king prawns', '½ mango', 'Mixed leaves', 'Cucumber', 'Lime dressing'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Chicken Fajita Bowl', cal: 460, protein: 40, ingredients: ['150g chicken breast', 'Peppers & red onion', '70g brown rice', 'Salsa', 'Greek yoghurt'] },
    ]
  },
  {
    day: 'Saturday', tag: 'Workout Day 🔥',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Smashed Avocado & Poached Eggs', cal: 460, protein: 20, ingredients: ['2 poached eggs', '1 avocado', '2 slices sourdough', 'Cherry tomatoes', 'Lemon'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Grilled Chicken Caesar Salad', cal: 380, protein: 40, ingredients: ['150g grilled chicken', 'Romaine lettuce', 'Parmesan', 'Croutons', 'Greek yoghurt dressing'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Baked Cod with Salsa Verde & Roasted Potatoes', cal: 420, protein: 38, ingredients: ['200g cod fillet', '180g baby potatoes', 'Green beans', 'Salsa verde'] },
    ]
  },
  {
    day: 'Sunday', tag: 'Rest & Prep 🥘',
    meals: [
      { type: 'Meal 1', time: '11:00am', name: 'Full Protein Omelette', cal: 360, protein: 32, ingredients: ['3 eggs', '50g smoked salmon or chicken', 'Mushrooms', 'Spinach', 'Red pepper'] },
      { type: 'Meal 2', time: '2:00–3:00pm', name: 'Homemade Chicken & Veg Soup', cal: 360, protein: 36, ingredients: ['2 chicken breasts', 'Carrots', 'Celery', 'Onion', 'Chicken stock', 'Parsley'] },
      { type: 'Meal 3', time: '6:00–7:00pm', name: 'Teriyaki Salmon with Jasmine Rice & Edamame', cal: 520, protein: 40, ingredients: ['180g salmon', '70g jasmine rice', 'Edamame', 'Broccoli', 'Teriyaki sauce'] },
    ]
  },
];

const today = () => new Date().toISOString().slice(0, 10);
const todayDayName = () => new Date().toLocaleDateString('en-US', { weekday: 'long' });
const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const DRAFT_KEY = 'workout-draft';
const MEAL_LOG_KEY = 'meal-log';
const emptyCardio = () => ({ type: 'Treadmill', time: '', distance: '', incline: '', speed: '' });

function TabBar({ tabs, active, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: C.dark, borderBottomWidth: 1, borderBottomColor: C.border }}>
      {tabs.map(t => (
        <TouchableOpacity key={t.id} onPress={() => onSelect(t.id)}
          style={{ paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 2, borderBottomColor: active === t.id ? C.rose : 'transparent' }}>
          <Text style={{ color: active === t.id ? C.blush : C.muted, fontSize: 12, fontWeight: '600' }}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function Card({ children, style }) {
  return (
    <View style={[{ backgroundColor: C.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: C.border }, style]}>
      {children}
    </View>
  );
}

function Btn({ label, onPress, variant = 'primary', style, disabled }) {
  const bg = variant === 'primary' ? C.rose : variant === 'soft' ? C.border : 'transparent';
  const col = variant === 'ghost' ? C.rose : C.blush;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}
      style={[{ backgroundColor: bg, borderRadius: 100, paddingHorizontal: 18, paddingVertical: 10, alignItems: 'center', borderWidth: variant === 'ghost' ? 1 : 0, borderColor: C.rose, opacity: disabled ? 0.4 : 1 }, style]}>
      <Text style={{ color: col, fontWeight: '600', fontSize: 13 }}>{label}</Text>
    </TouchableOpacity>
  );
}

function NumInput({ label, value, onChange, placeholder }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder || '0'}
        placeholderTextColor="#444" keyboardType="numeric"
        style={{ backgroundColor: C.bg, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 14, borderWidth: 1, borderColor: '#3a2530' }} />
    </View>
  );
}

function CardioSection({ cardio, onChange }) {
  return (
    <View style={{ backgroundColor: C.greenDark, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: C.greenBorder }}>
      <Text style={{ fontSize: 12, fontWeight: '700', color: C.green, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>🏃‍♀️ Cardio</Text>

      {/* Type selector */}
      <Text style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Type</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {CARDIO_OPTIONS.map(opt => (
          <TouchableOpacity key={opt} onPress={() => onChange({ ...cardio, type: opt })}
            style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: cardio.type === opt ? C.green : C.greenBorder, backgroundColor: cardio.type === opt ? '#1a3a28' : 'transparent' }}>
            <Text style={{ color: cardio.type === opt ? C.green : '#4a7a5a', fontSize: 13, fontWeight: '600' }}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 4 input boxes */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        <NumInput label="Time (mins)" value={cardio.time} onChange={v => onChange({ ...cardio, time: v })} placeholder="20" />
        <NumInput label="Distance (km)" value={cardio.distance} onChange={v => onChange({ ...cardio, distance: v })} placeholder="2.5" />
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <NumInput label="Incline %" value={cardio.incline} onChange={v => onChange({ ...cardio, incline: v })} placeholder="8" />
        <NumInput label="Speed (km/h)" value={cardio.speed} onChange={v => onChange({ ...cardio, speed: v })} placeholder="5.5" />
      </View>
    </View>
  );
}

function PlanWorkoutTab({ onSaveWorkout }) {
  const [openDay, setOpenDay] = useState(null);
  const [checked, setChecked] = useState({});
  const [loggingDay, setLoggingDay] = useState(null);
  const [draft, setDraft] = useState({});
  const [cardio, setCardio] = useState(emptyCardio());
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('plan-checked').then(v => { if (v) setChecked(JSON.parse(v)); });
    AsyncStorage.getItem(DRAFT_KEY).then(v => {
      if (v) {
        const d = JSON.parse(v);
        setDraft(d.sets || {}); setNotes(d.notes || '');
        setCardio(d.cardio || emptyCardio());
        if (d.dayId) setLoggingDay(d.dayId);
      }
    });
  }, []);

  function persist(dayId, sets, c, n) {
    AsyncStorage.setItem(DRAFT_KEY, JSON.stringify({ dayId, sets, cardio: c, notes: n }));
  }

  function toggleCheck(dayId, exId) {
    const key = `${dayId}-${exId}`;
    const u = { ...checked, [key]: !checked[key] };
    setChecked(u); AsyncStorage.setItem('plan-checked', JSON.stringify(u));
  }

  function resetDay(dayId) {
    const u = { ...checked };
    Object.keys(u).forEach(k => { if (k.startsWith(dayId)) delete u[k]; });
    setChecked(u); AsyncStorage.setItem('plan-checked', JSON.stringify(u));
  }

  function startLogging(day) {
    if (loggingDay !== day.id) {
      const init = {};
      day.exercises.forEach(e => { init[e.name] = [{ reps: '', weight: '' }]; });
      const c = emptyCardio();
      setDraft(init); setCardio(c); setNotes(''); setLoggingDay(day.id);
      persist(day.id, init, c, '');
    }
    setSaved(false); setOpenDay(day.id);
  }

  function addSet(ex) {
    const u = { ...draft, [ex]: [...(draft[ex] || []), { reps: '', weight: '' }] };
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

  async function handleSave() {
    const day = PLAN.find(d => d.id === loggingDay);
    await onSaveWorkout({ id: Date.now(), type: 'workout', date: today(), day: day.title, emoji: day.emoji, color: day.color, sets: draft, cardio, notes });
    await AsyncStorage.removeItem(DRAFT_KEY);
    setLoggingDay(null); setDraft({}); setCardio(emptyCardio()); setNotes(''); setSaved(true);
  }

  function clearDraft() {
    AsyncStorage.removeItem(DRAFT_KEY);
    setLoggingDay(null); setDraft({}); setCardio(emptyCardio()); setNotes('');
  }

  const activeDay = loggingDay ? PLAN.find(d => d.id === loggingDay) : null;

  if (saved) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: C.bg }}>
      <Text style={{ fontSize: 56, marginBottom: 16 }}>🎉</Text>
      <Text style={{ fontSize: 24, color: C.blush, fontWeight: '700', marginBottom: 8 }}>Workout Saved!</Text>
      <Text style={{ color: C.muted, marginBottom: 28, textAlign: 'center' }}>Great work. Recovery starts now.</Text>
      <Btn label="Back to Plan" onPress={() => setSaved(false)} />
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, paddingBottom: 80 }}>

      {loggingDay && (
        <View style={{ backgroundColor: '#2a1a10', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#c87c2a55', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#c87c2a', fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>In Progress</Text>
            <Text style={{ fontSize: 14, color: C.blush, fontWeight: '600' }}>{activeDay?.emoji} {activeDay?.title}</Text>
            <Text style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Auto-saved — tap day below to continue 👇</Text>
          </View>
          <TouchableOpacity onPress={clearDraft} style={{ padding: 6 }}>
            <Text style={{ color: '#555', fontSize: 20 }}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ backgroundColor: '#1e0f13', borderRadius: 20, padding: 20, marginBottom: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 11, letterSpacing: 3, color: C.rose, marginBottom: 8, textTransform: 'uppercase' }}>Your 4-Week Plan</Text>
        <Text style={{ fontSize: 22, color: C.blush, fontStyle: 'italic', marginBottom: 6 }}>Train Hard, Glow Harder</Text>
        <Text style={{ fontSize: 12, color: C.muted, textAlign: 'center' }}>4 days · 50–60 mins · Tone, lift & burn 🍑</Text>
      </View>

      {PLAN.map(day => {
        const done = day.exercises.filter(e => checked[`${day.id}-${e.id}`]).length;
        const isOpen = openDay === day.id;
        const isDrafting = loggingDay === day.id;
        const pct = (done / day.exercises.length) * 100;

        return (
          <View key={day.id} style={{ backgroundColor: C.card, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: isOpen ? day.color + '66' : (isDrafting ? '#c87c2a55' : C.border), overflow: 'hidden' }}>

            <TouchableOpacity onPress={() => setOpenDay(isOpen ? null : day.id)}
              style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                <Text style={{ fontSize: 28 }}>{day.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, color: day.color, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>{day.day} · {day.schedule}</Text>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#f0e0e0' }}>{day.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <View style={{ height: 4, width: 80, backgroundColor: C.dark, borderRadius: 10, overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${pct}%`, backgroundColor: day.color, borderRadius: 10 }} />
                    </View>
                    <Text style={{ fontSize: 11, color: C.muted }}>{done}/{day.exercises.length} done</Text>
                    {isDrafting && <Text style={{ fontSize: 11, color: '#c87c2a', fontWeight: '700' }}>• logging</Text>}
                  </View>
                </View>
              </View>
              <Text style={{ color: C.muted, fontSize: 18 }}>{isOpen ? '▾' : '▸'}</Text>
            </TouchableOpacity>

            {isOpen && (
              <View style={{ paddingHorizontal: 16, paddingBottom: 16, borderTopWidth: 1, borderTopColor: C.border }}>

                {/* Exercises */}
                {day.exercises.map(ex => {
                  const isChecked = !!checked[`${day.id}-${ex.id}`];
                  const exSets = isDrafting ? draft[ex.name] : null;
                  return (
                    <View key={ex.id} style={{ backgroundColor: C.dark, borderRadius: 12, padding: 14, marginTop: 12, marginBottom: 2, borderWidth: 1, borderColor: isChecked ? day.color + '55' : C.border, opacity: isChecked ? 0.75 : 1 }}>

                      {/* Exercise header */}
                      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => toggleCheck(day.id, ex.id)}
                          style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: isChecked ? day.color : '#3a2530', backgroundColor: isChecked ? day.color : 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 }}>
                          {isChecked && <Text style={{ color: 'white', fontSize: 13 }}>✓</Text>}
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 15, fontWeight: '700', color: isChecked ? C.muted : '#f0e0e0', textDecorationLine: isChecked ? 'line-through' : 'none', marginBottom: 3 }}>{ex.name}</Text>
                          <Text style={{ fontSize: 12, color: C.rose, marginBottom: 3 }}>{ex.sets}</Text>
                          <Text style={{ fontSize: 11, color: '#666', lineHeight: 16 }}>{ex.tip}</Text>
                        </View>
                      </View>

                      {/* Video button */}
                      <TouchableOpacity onPress={() => Linking.openURL(ex.video)}
                        style={{ backgroundColor: C.card, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 7, alignSelf: 'flex-start', borderWidth: 1, borderColor: C.border, marginBottom: isDrafting ? 14 : 0 }}>
                        <Text style={{ color: C.blush, fontSize: 12, fontWeight: '600' }}>▶ Watch Tutorial</Text>
                      </TouchableOpacity>

                      {/* Set logging — only shows when Start Logging is tapped */}
                      {isDrafting && exSets && (
                        <View>
                          <Text style={{ fontSize: 10, color: C.muted, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Log Your Sets</Text>
                          {exSets.map((s, i) => (
                            <View key={i} style={{ flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                              <Text style={{ color: C.muted, fontSize: 13, width: 22, textAlign: 'center' }}>{i + 1}</Text>
                              <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Reps</Text>
                                <TextInput value={s.reps} onChangeText={v => updSet(ex.name, i, 'reps', v)}
                                  placeholder="0" placeholderTextColor="#444" keyboardType="numeric"
                                  style={{ backgroundColor: C.bg, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 15, borderWidth: 1, borderColor: '#3a2530', textAlign: 'center' }} />
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Weight (kg)</Text>
                                <TextInput value={s.weight} onChangeText={v => updSet(ex.name, i, 'weight', v)}
                                  placeholder="0" placeholderTextColor="#444" keyboardType="numeric"
                                  style={{ backgroundColor: C.bg, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 15, borderWidth: 1, borderColor: '#3a2530', textAlign: 'center' }} />
                              </View>
                              <TouchableOpacity onPress={() => removeSet(ex.name, i)} style={{ marginTop: 16 }}>
                                <Text style={{ color: '#555', fontSize: 20 }}>×</Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                          <TouchableOpacity onPress={() => addSet(ex.name)}
                            style={{ backgroundColor: C.border, borderRadius: 100, paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start', marginTop: 2 }}>
                            <Text style={{ color: C.blush, fontSize: 13, fontWeight: '600' }}>+ Add Set</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })}

                {/* Cardio + Notes + Save — only when logging */}
                {isDrafting ? (
                  <View style={{ marginTop: 16 }}>
                    <CardioSection cardio={cardio} onChange={updCardio} />
                    <Card>
                      <Text style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Notes</Text>
                      <TextInput value={notes} onChangeText={updNotes}
                        placeholder="How did it feel? Any PRs? 💪" placeholderTextColor="#444" multiline
                        style={{ backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 13, borderWidth: 1, borderColor: '#3a2530', minHeight: 60 }} />
                    </Card>
                    <Btn label="💾 Save Workout" onPress={handleSave} style={{ paddingVertical: 14 }} />
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
                    <Btn label="🏋️ Start Logging" onPress={() => startLogging(day)} style={{ flex: 1 }} />
                    <Btn label="↺ Reset" onPress={() => resetDay(day.id)} variant="soft" />
                  </View>
                )}
              </View>
            )}
          </View>
        );
      })}

      <View style={{ backgroundColor: '#1a1410', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#2e2a1f', alignItems: 'center' }}>
        <Text style={{ fontSize: 28, marginBottom: 8 }}>🌸</Text>
        <Text style={{ fontWeight: '700', color: '#e0d0a0', marginBottom: 6 }}>Tue, Thu, Sun — Rest Days</Text>
        <Text style={{ fontSize: 12, color: C.muted, textAlign: 'center', lineHeight: 18 }}>Recovery is training. This is when your glutes actually grow. 💪</Text>
      </View>
    </ScrollView>
  );
}

function MealsTab() {
  const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const currentDayName = todayDayName();
  const defaultIdx = Math.max(0, dayNames.indexOf(currentDayName));
  const [selectedDay, setSelectedDay] = useState(defaultIdx);
  const [mealLog, setMealLog] = useState({});
  const [editingMeal, setEditingMeal] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(MEAL_LOG_KEY).then(v => { if (v) setMealLog(JSON.parse(v)); });
  }, []);

  function saveMealLog(updated) {
    setMealLog(updated);
    AsyncStorage.setItem(MEAL_LOG_KEY, JSON.stringify(updated));
  }

  function toggleMeal(dayIdx, mealIdx) {
    const key = `${dayIdx}-${mealIdx}`;
    const existing = mealLog[key] || {};
    saveMealLog({ ...mealLog, [key]: { ...existing, eaten: !existing.eaten } });
  }

  function saveNote(dayIdx, mealIdx) {
    const key = `${dayIdx}-${mealIdx}`;
    const existing = mealLog[key] || {};
    saveMealLog({ ...mealLog, [key]: { ...existing, note: noteText } });
    setEditingMeal(null); setNoteText('');
  }

  const dayData = MEALS[selectedDay];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, paddingBottom: 80 }}>
      <View style={{ backgroundColor: '#1a1014', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: C.border, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 22 }}>🌙</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: C.blush, marginBottom: 2 }}>16:8 Intermittent Fasting</Text>
          <Text style={{ fontSize: 11, color: C.muted }}>Eating window: <Text style={{ color: C.green }}>11am – 7pm</Text></Text>
          <Text style={{ fontSize: 11, color: '#555', marginTop: 2 }}>☕ Morning tea with oat milk splash is fine</Text>
        </View>
      </View>

      <View style={{ backgroundColor: C.greenDark, borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: C.greenBorder }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: C.green, marginBottom: 4 }}>🥬 Daily Smoothie — Every Day</Text>
        <Text style={{ fontSize: 11, color: '#4a7a5a', lineHeight: 17 }}>½ cup chia/flax · 1.5L kale · ½L forest fruits · tropical fruit · water. Sip 11am–7pm.</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {['~580 kcal','23g protein','30g+ fibre','Omega-3s ✓'].map(s => (
            <View key={s} style={{ backgroundColor: 'rgba(122,223,138,0.1)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: C.greenBorder }}>
              <Text style={{ color: C.green, fontSize: 11 }}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {dayNames.map((d, i) => (
            <TouchableOpacity key={d} onPress={() => setSelectedDay(i)}
              style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: selectedDay === i ? C.rose : C.border, backgroundColor: selectedDay === i ? '#2e1f22' : 'transparent' }}>
              <Text style={{ color: selectedDay === i ? C.blush : C.muted, fontSize: 12, fontWeight: '600' }}>
                {d.slice(0,3)}{i === defaultIdx ? ' 📍' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: C.blush }}>{dayData.day}</Text>
        <Text style={{ fontSize: 11, color: C.rose, fontWeight: '600' }}>{dayData.tag}</Text>
      </View>

      {dayData.meals.map((meal, mealIdx) => {
        const key = `${selectedDay}-${mealIdx}`;
        const log = mealLog[key] || {};
        const isEaten = !!log.eaten;
        const hasNote = !!log.note;

        return (
          <View key={mealIdx} style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: isEaten ? '#2a4a3a' : C.border, opacity: isEaten ? 0.85 : 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Text style={{ fontSize: 11, color: C.rose, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' }}>{meal.type}</Text>
                  <Text style={{ fontSize: 11, color: C.green, fontWeight: '600' }}>⏰ {meal.time}</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: isEaten ? C.muted : '#f0e0e0', textDecorationLine: isEaten ? 'line-through' : 'none', marginBottom: 4 }}>{meal.name}</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={{ backgroundColor: C.dark, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 11, color: C.muted }}><Text style={{ color: C.blush, fontWeight: '700' }}>{meal.cal}</Text> kcal</Text>
                  </View>
                  <View style={{ backgroundColor: C.dark, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 11, color: C.muted }}><Text style={{ color: C.blush, fontWeight: '700' }}>{meal.protein}g</Text> protein</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleMeal(selectedDay, mealIdx)}
                style={{ width: 28, height: 28, borderRadius: 8, borderWidth: 2, borderColor: isEaten ? C.green : '#3a2530', backgroundColor: isEaten ? '#1a3a28' : 'transparent', alignItems: 'center', justifyContent: 'center', marginLeft: 10, flexShrink: 0 }}>
                {isEaten && <Text style={{ color: C.green, fontSize: 14 }}>✓</Text>}
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {meal.ingredients.map((ing, i) => (
                <View key={i} style={{ backgroundColor: C.dark, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={{ fontSize: 10, color: '#666' }}>{ing}</Text>
                </View>
              ))}
            </View>

            {hasNote && (
              <View style={{ backgroundColor: C.dark, borderRadius: 8, padding: 8, marginBottom: 8 }}>
                <Text style={{ fontSize: 11, color: '#888', fontStyle: 'italic' }}>📝 {log.note}</Text>
              </View>
            )}

            <TouchableOpacity onPress={() => { setEditingMeal({ dayIdx: selectedDay, mealIdx }); setNoteText(log.note || ''); }}>
              <Text style={{ fontSize: 12, color: C.muted, textDecorationLine: 'underline' }}>{hasNote ? '✏️ Edit note' : '+ Add note'}</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <View style={{ backgroundColor: '#1e0f13', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#3a1f22' }}>
        <Text style={{ fontSize: 11, color: C.rose, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Daily Totals (meals + smoothie)</Text>
        {[
          { label: 'Calories', val: `${dayData.meals.reduce((a,m) => a+m.cal, 580)} kcal`, color: C.rose },
          { label: 'Protein', val: `${dayData.meals.reduce((a,m) => a+m.protein, 23)}g`, color: '#7a6fa8' },
        ].map(s => (
          <View key={s.label} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.border }}>
            <Text style={{ fontSize: 13, color: C.muted }}>{s.label}</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: s.color }}>{s.val}</Text>
          </View>
        ))}
      </View>

      <Modal visible={!!editingMeal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ backgroundColor: C.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: C.blush, marginBottom: 16 }}>Add Note</Text>
            <TextInput value={noteText} onChangeText={setNoteText} multiline autoFocus
              placeholder="e.g. Swapped chicken for tuna..." placeholderTextColor="#555"
              style={{ backgroundColor: C.dark, borderRadius: 12, color: '#f0e0e0', padding: 14, fontSize: 14, borderWidth: 1, borderColor: '#3a2530', minHeight: 80, marginBottom: 16 }} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Btn label="Cancel" onPress={() => setEditingMeal(null)} variant="soft" style={{ flex: 1 }} />
              <Btn label="Save Note" onPress={() => saveNote(editingMeal.dayIdx, editingMeal.mealIdx)} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function LogActivity({ onSave }) {
  const [type, setType] = useState('Walking');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);

  async function handleSave() {
    await onSave({ id: Date.now(), type: 'activity', activityType: type, emoji: ACTIVITY_TYPES.find(a => a.label === type)?.emoji || '⚡', date: today(), duration, distance, notes });
    setDone(true);
  }

  if (done) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 56, marginBottom: 16 }}>✅</Text>
      <Text style={{ fontSize: 24, color: C.blush, fontWeight: '700', marginBottom: 8 }}>Activity Logged!</Text>
      <Text style={{ color: C.muted, marginBottom: 28 }}>Every move counts.</Text>
      <Btn label="Log Another" onPress={() => { setDone(false); setDuration(''); setDistance(''); setNotes(''); }} />
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, paddingBottom: 80 }}>
      <Card>
        <Text style={{ fontSize: 11, color: C.muted, marginBottom: 10, letterSpacing: 2, textTransform: 'uppercase' }}>Activity Type</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {ACTIVITY_TYPES.map(a => (
            <TouchableOpacity key={a.label} onPress={() => setType(a.label)}
              style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: type === a.label ? C.rose : C.border, backgroundColor: type === a.label ? C.border : 'transparent' }}>
              <Text style={{ color: type === a.label ? C.blush : C.muted, fontSize: 13 }}>{a.emoji} {a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
      <Card>
        <Text style={{ fontSize: 11, color: C.muted, marginBottom: 7, letterSpacing: 2, textTransform: 'uppercase' }}>Duration (minutes)</Text>
        <TextInput value={duration} onChangeText={setDuration} placeholder="e.g. 45" placeholderTextColor="#555" keyboardType="numeric"
          style={{ backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 14, borderWidth: 1, borderColor: '#3a2530' }} />
      </Card>
      <Card>
        <Text style={{ fontSize: 11, color: C.muted, marginBottom: 7, letterSpacing: 2, textTransform: 'uppercase' }}>Distance in km (optional)</Text>
        <TextInput value={distance} onChangeText={setDistance} placeholder="e.g. 3.5" placeholderTextColor="#555" keyboardType="numeric"
          style={{ backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 14, borderWidth: 1, borderColor: '#3a2530' }} />
      </Card>
      <Card>
        <Text style={{ fontSize: 11, color: C.muted, marginBottom: 7, letterSpacing: 2, textTransform: 'uppercase' }}>Notes</Text>
        <TextInput value={notes} onChangeText={setNotes} placeholder="Paste Garmin stats here..." placeholderTextColor="#555" multiline
          style={{ backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 13, borderWidth: 1, borderColor: '#3a2530', minHeight: 70 }} />
      </Card>
      <Btn label="💾 Save Activity" onPress={handleSave} style={{ paddingVertical: 14 }} />
    </ScrollView>
  );
}

function History({ entries, onDelete, onUpdate }) {
  const [editingEntry, setEditingEntry] = useState(null);
  const [editDraft, setEditDraft] = useState({});
  const [editCardio, setEditCardio] = useState(emptyCardio());
  const [editNotes, setEditNotes] = useState('');

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  function startEdit(entry) {
    setEditingEntry(entry);
    setEditDraft(JSON.parse(JSON.stringify(entry.sets || {})));
    setEditCardio(entry.cardio || emptyCardio());
    setEditNotes(entry.notes || '');
  }

  function updEditSet(ex, i, f, v) {
    setEditDraft(prev => ({ ...prev, [ex]: prev[ex].map((s, idx) => idx === i ? { ...s, [f]: v } : s) }));
  }

  function addEditSet(ex) {
    setEditDraft(prev => ({ ...prev, [ex]: [...(prev[ex] || []), { reps: '', weight: '' }] }));
  }

  function removeEditSet(ex, i) {
    setEditDraft(prev => ({ ...prev, [ex]: prev[ex].filter((_, idx) => idx !== i) }));
  }

  function saveEdit() {
    onUpdate({ ...editingEntry, sets: editDraft, cardio: editCardio, notes: editNotes });
    setEditingEntry(null);
  }

  if (!sorted.length) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 48, marginBottom: 12 }}>📋</Text>
      <Text style={{ color: C.muted }}>No entries yet. Log your first workout!</Text>
    </View>
  );

  if (editingEntry) return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, paddingBottom: 80 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setEditingEntry(null)}>
          <Text style={{ color: C.muted, fontSize: 22 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '700', color: C.blush }}>Edit {editingEntry.emoji} {fmtDate(editingEntry.date)}</Text>
      </View>

      {editingEntry.type === 'workout' && Object.entries(editDraft).map(([ex, sets]) => (
        <Card key={ex}>
          <Text style={{ fontWeight: '700', color: C.blush, marginBottom: 10, fontSize: 14 }}>{ex}</Text>
          {sets.map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <Text style={{ color: C.muted, fontSize: 12, width: 18 }}>{i + 1}.</Text>
              <TextInput value={s.reps} onChangeText={v => updEditSet(ex, i, 'reps', v)}
                placeholder="Reps" placeholderTextColor="#444" keyboardType="numeric"
                style={{ flex: 1, backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 9, fontSize: 13, borderWidth: 1, borderColor: '#3a2530' }} />
              <TextInput value={s.weight} onChangeText={v => updEditSet(ex, i, 'weight', v)}
                placeholder="kg" placeholderTextColor="#444" keyboardType="numeric"
                style={{ flex: 1, backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 9, fontSize: 13, borderWidth: 1, borderColor: '#3a2530' }} />
              <TouchableOpacity onPress={() => removeEditSet(ex, i)}>
                <Text style={{ color: '#444', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => addEditSet(ex)}
            style={{ backgroundColor: C.border, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start', marginTop: 2 }}>
            <Text style={{ color: C.blush, fontSize: 12, fontWeight: '600' }}>+ Set</Text>
          </TouchableOpacity>
        </Card>
      ))}

      {editingEntry.type === 'workout' && <CardioSection cardio={editCardio} onChange={setEditCardio} />}

      <Card>
        <Text style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Notes</Text>
        <TextInput value={editNotes} onChangeText={setEditNotes} placeholder="Notes..." placeholderTextColor="#444" multiline
          style={{ backgroundColor: C.dark, borderRadius: 10, color: '#f0e0e0', padding: 10, fontSize: 13, borderWidth: 1, borderColor: '#3a2530', minHeight: 60 }} />
      </Card>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Btn label="Cancel" onPress={() => setEditingEntry(null)} variant="soft" style={{ flex: 1 }} />
        <Btn label="💾 Save Changes" onPress={saveEdit} style={{ flex: 1 }} />
      </View>
    </ScrollView>
  );

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, paddingBottom: 80 }}>
      {sorted.map(e => (
        <Card key={e.id}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 22 }}>{e.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: C.blush, fontSize: 14 }}>{e.type === 'workout' ? e.day : e.activityType}</Text>
                <Text style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{fmtDate(e.date)}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {e.type === 'workout' && (
                <TouchableOpacity onPress={() => startEdit(e)} style={{ padding: 4 }}>
                  <Text style={{ fontSize: 16 }}>✏️</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => onDelete(e.id)} style={{ padding: 4 }}>
                <Text style={{ color: '#444', fontSize: 16 }}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>

          {e.type === 'workout' && (
            <View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: e.cardio?.time ? 8 : 0 }}>
                {Object.entries(e.sets || {}).map(([ex, setArr]) => {
                  const valid = (setArr || []).filter(s => s.reps || s.weight);
                  if (!valid.length) return null;
                  return (
                    <View key={ex} style={{ backgroundColor: C.dark, borderRadius: 8, padding: 6, paddingHorizontal: 10 }}>
                      <Text style={{ fontSize: 11, color: C.muted }}>{ex}: <Text style={{ color: C.blush }}>{valid.map(s => `${s.reps ? s.reps+'×' : ''}${s.weight ? s.weight+'kg' : 'bw'}`).join(' / ')}</Text></Text>
                    </View>
                  );
                })}
              </View>
              {e.cardio?.time && (
                <View style={{ backgroundColor: C.greenDark, borderRadius: 8, padding: 8, paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  <Text style={{ fontSize: 11, color: C.green, fontWeight: '600' }}>🏃‍♀️ {e.cardio.type}</Text>
                  {e.cardio.time ? <Text style={{ fontSize: 11, color: '#4a8a5a' }}>⏱ {e.cardio.time}m</Text> : null}
                  {e.cardio.distance ? <Text style={{ fontSize: 11, color: '#4a8a5a' }}>📍 {e.cardio.distance}km</Text> : null}
                  {e.cardio.speed ? <Text style={{ fontSize: 11, color: '#4a8a5a' }}>💨 {e.cardio.speed}km/h</Text> : null}
                  {e.cardio.incline ? <Text style={{ fontSize: 11, color: '#4a8a5a' }}>📐 {e.cardio.incline}%</Text> : null}
                </View>
              )}
            </View>
          )}

          {e.type === 'activity' && (
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              {e.duration ? <View style={{ backgroundColor: C.dark, borderRadius: 8, padding: 6, paddingHorizontal: 10 }}><Text style={{ color: C.blush, fontSize: 11 }}>⏱ {e.duration} mins</Text></View> : null}
              {e.distance ? <View style={{ backgroundColor: C.dark, borderRadius: 8, padding: 6, paddingHorizontal: 10 }}><Text style={{ color: C.blush, fontSize: 11 }}>📍 {e.distance} km</Text></View> : null}
            </View>
          )}
          {e.notes ? <Text style={{ marginTop: 8, fontSize: 11, color: '#666', fontStyle: 'italic', borderTopWidth: 1, borderTopColor: C.border, paddingTop: 8 }}>{e.notes}</Text> : null}
        </Card>
      ))}
    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState('plan');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('fitness-entries').then(v => { if (v) setEntries(JSON.parse(v)); });
  }, []);

  async function addEntry(entry) {
    const updated = [...entries, entry];
    setEntries(updated);
    AsyncStorage.setItem('fitness-entries', JSON.stringify(updated));
  }

  async function deleteEntry(id) {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    AsyncStorage.setItem('fitness-entries', JSON.stringify(updated));
  }

  async function updateEntry(updated) {
    const all = entries.map(e => e.id === updated.id ? updated : e);
    setEntries(all);
    AsyncStorage.setItem('fitness-entries', JSON.stringify(all));
  }

  const TABS = [
    { id: 'plan', label: '📋 Plan & Log' },
    { id: 'meals', label: '🥗 Meals' },
    { id: 'activity', label: '🚶 Activity' },
    { id: 'history', label: '🕐 History' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" />
      <View style={{ padding: 16, paddingBottom: 8, backgroundColor: '#1e0f13' }}>
        <Text style={{ fontSize: 10, letterSpacing: 4, color: C.rose, textTransform: 'uppercase', marginBottom: 2 }}>Your Fitness Journal</Text>
        <Text style={{ fontSize: 22, color: C.blush, fontStyle: 'italic' }}>Train. Log. Glow. 🔥</Text>
      </View>
      <TabBar tabs={TABS} active={tab} onSelect={setTab} />
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        {tab === 'plan' && <PlanWorkoutTab onSaveWorkout={addEntry} />}
        {tab === 'meals' && <MealsTab />}
        {tab === 'activity' && <LogActivity onSave={addEntry} />}
        {tab === 'history' && <History entries={entries} onDelete={deleteEntry} onUpdate={updateEntry} />}
      </View>
    </SafeAreaView>
  );
}
