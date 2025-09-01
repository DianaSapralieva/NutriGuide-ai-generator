'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { useChat } from 'ai/react';
import MealPlan from '../components/MealPlan';
import Link from 'next/link';

const activityMultipliers: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const goals: Record<string, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

function calculateBmrMifflinStJeor(
  sex: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  age: number
): number {
  const s = sex === 'male' ? 5 : -161;
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + s);
}

export default function MealPlannerPage() {
  const [age, setAge] = useState<number>(28);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<string>('178');
  const [weightKg, setWeightKg] = useState<string>('80');
  const [activity, setActivity] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [dietPrefs, setDietPrefs] = useState<string>('');
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);
  const [days, setDays] = useState<number>(7);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>('');

  const { append } = useChat({
    api: '/api/gpt',
    onFinish: (message) => {
      console.log('Chat finished, message received:', message.content?.substring(0, 100) + '...');
      setError('');
      const cleaned = (message.content || '')
        .replace(/#[\w]+/g, '') // remove inline hashtags like #keto
        .replace(/^\s*#+\s*/gm, ''); // remove markdown heading hashes like ####
      setGeneratedPlan(cleaned);
      setLoading(false);
      console.log('Plan generated successfully');
    },
    onError: (e) => {
      console.error('Chat error:', e);
      setError(`An error occurred calling the OpenAI API: ${e}`);
      setLoading(false);
    },
    onResponse: (response) => {
      console.log('Response received:', response.status, response.statusText);
    },
  });

  const heightCmNum = useMemo(() => Number(heightCm), [heightCm]);
  const weightKgNum = useMemo(() => Number(weightKg), [weightKg]);

  const caloriesAndProtein = useMemo(() => {
    const bmr = calculateBmrMifflinStJeor(sex, weightKgNum, heightCmNum, age);
    const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
    const calorieTarget = Math.max(1200, tdee + (goals[goal] ?? 0));
    
    // Adjust protein based on goal
    let proteinMultiplier = 1.8; // default for maintain
    if (goal === 'lose') {
      proteinMultiplier = 2.2; // Higher protein for fat loss to preserve muscle
    } else if (goal === 'gain') {
      proteinMultiplier = 2.0; // Higher protein for muscle building
    }
    const proteinTarget = Math.round(weightKgNum * proteinMultiplier);
    
    return { bmr, tdee, calorieTarget, proteinTarget };
  }, [sex, weightKgNum, heightCmNum, age, activity, goal, days]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted!');
    setLoading(true);
    setError('');
    setGeneratedPlan('');

    const heightText = heightCm ? `${heightCm} cm` : 'not provided';
    const weightText = weightKg ? `${weightKg} kg` : 'not provided';

    const dailyCalories = Math.round(caloriesAndProtein.calorieTarget);
    const dailyProtein = Math.round(caloriesAndProtein.proteinTarget);
    
    // Calculate meal distribution based on number of meals
    let mealDistribution = '';
    if (mealsPerDay === 2) {
      mealDistribution = `- Meal 1: ~${Math.round(dailyCalories * 0.4)} kcal, ~${Math.round(dailyProtein * 0.4)}g protein
- Meal 2: ~${Math.round(dailyCalories * 0.6)} kcal, ~${Math.round(dailyProtein * 0.6)}g protein`;
    } else if (mealsPerDay === 3) {
      mealDistribution = `- Breakfast: ~${Math.round(dailyCalories * 0.25)} kcal, ~${Math.round(dailyProtein * 0.2)}g protein
- Lunch: ~${Math.round(dailyCalories * 0.35)} kcal, ~${Math.round(dailyProtein * 0.35)}g protein
- Dinner: ~${Math.round(dailyCalories * 0.4)} kcal, ~${Math.round(dailyProtein * 0.45)}g protein`;
    } else if (mealsPerDay === 4) {
      mealDistribution = `- Breakfast: ~${Math.round(dailyCalories * 0.2)} kcal, ~${Math.round(dailyProtein * 0.15)}g protein
- Lunch: ~${Math.round(dailyCalories * 0.3)} kcal, ~${Math.round(dailyProtein * 0.3)}g protein
- Dinner: ~${Math.round(dailyCalories * 0.35)} kcal, ~${Math.round(dailyProtein * 0.4)}g protein
- Snack: ~${Math.round(dailyCalories * 0.15)} kcal, ~${Math.round(dailyProtein * 0.15)}g protein`;
    } else if (mealsPerDay === 5) {
      mealDistribution = `- Breakfast: ~${Math.round(dailyCalories * 0.2)} kcal, ~${Math.round(dailyProtein * 0.15)}g protein
- Lunch: ~${Math.round(dailyCalories * 0.25)} kcal, ~${Math.round(dailyProtein * 0.25)}g protein
- Dinner: ~${Math.round(dailyCalories * 0.3)} kcal, ~${Math.round(dailyProtein * 0.35)}g protein
- Snack 1: ~${Math.round(dailyCalories * 0.15)} kcal, ~${Math.round(dailyProtein * 0.15)}g protein
- Snack 2: ~${Math.round(dailyCalories * 0.1)} kcal, ~${Math.round(dailyProtein * 0.1)}g protein`;
    }

    const prompt = `Create a ${days}-day meal plan with ${mealsPerDay} meals per day.

CRITICAL DAILY TARGETS TO MEET:
- Total Calories per day: ${dailyCalories} kcal
- Total Protein per day: ${dailyProtein}g

MEAL DISTRIBUTION (each day must match these targets):
${mealDistribution}

CRITICAL: Each day's meals must add up to approximately ${dailyCalories} kcal and ${dailyProtein}g protein. Do not exceed or fall significantly short of these targets.

MANDATORY MEAL TARGETS (copy these exact numbers):
${mealsPerDay === 2 ? `
- Meal 1: ${Math.round(dailyCalories * 0.4)} kcal, ${Math.round(dailyProtein * 0.4)}g protein
- Meal 2: ${Math.round(dailyCalories * 0.6)} kcal, ${Math.round(dailyProtein * 0.6)}g protein` : 
mealsPerDay === 3 ? `
- Breakfast: ${Math.round(dailyCalories * 0.25)} kcal, ${Math.round(dailyProtein * 0.2)}g protein
- Lunch: ${Math.round(dailyCalories * 0.35)} kcal, ${Math.round(dailyProtein * 0.35)}g protein
- Dinner: ${Math.round(dailyCalories * 0.4)} kcal, ${Math.round(dailyProtein * 0.45)}g protein` :
mealsPerDay === 4 ? `
- Breakfast: ${Math.round(dailyCalories * 0.2)} kcal, ${Math.round(dailyProtein * 0.15)}g protein
- Lunch: ${Math.round(dailyCalories * 0.3)} kcal, ${Math.round(dailyProtein * 0.3)}g protein
- Dinner: ${Math.round(dailyCalories * 0.35)} kcal, ${Math.round(dailyProtein * 0.4)}g protein
- Snack: ${Math.round(dailyCalories * 0.15)} kcal, ${Math.round(dailyProtein * 0.15)}g protein` :
`
- Breakfast: ${Math.round(dailyCalories * 0.2)} kcal, ${Math.round(dailyProtein * 0.15)}g protein
- Lunch: ${Math.round(dailyCalories * 0.25)} kcal, ${Math.round(dailyProtein * 0.25)}g protein
- Dinner: ${Math.round(dailyCalories * 0.3)} kcal, ${Math.round(dailyProtein * 0.35)}g protein
- Snack 1: ${Math.round(dailyCalories * 0.15)} kcal, ${Math.round(dailyProtein * 0.15)}g protein
- Snack 2: ${Math.round(dailyCalories * 0.1)} kcal, ${Math.round(dailyProtein * 0.1)}g protein`}

CRITICAL: Use these EXACT numbers for each meal. Do not use any other numbers.

Inputs:
- Age: ${age}
- Sex: ${sex}
- Height: ${heightText}
- Weight: ${weightText}
- Activity: ${activity}
- Goal: ${goal}
- Preferences/Restrictions: ${dietPrefs || 'none specified'}

Output requirements:
- Headings: Day 1:, Day 2:, ..., Day ${days}:
- Under each Day, list meals as bullets starting with a dash (-)
- Each bullet should include: meal name — key ingredients with PORTION SIZES (specify both pieces/units AND grams where applicable); ~[EXACT TARGET KCAL]kcal; ~[EXACT TARGET PROTEIN]g protein; quick prep (short) | Recipe: 1) step one, 2) step two, 3) step three
- CRITICAL: After &quot;| Recipe:&quot; you MUST write actual cooking steps like &quot;1) Boil water, 2) Add oats, 3) Cook 5min, 4) Add toppings&quot;
- CRITICAL: Steps must be numbered (1), 2), 3), etc.)
- CRITICAL: Each step should be a single action (no long combined sentences)
- CRITICAL: Include time cues whenever cooking (e.g., &quot;cook 6min&quot;, &quot;boil 5min&quot;, &quot;rest 5min&quot;)
- CRITICAL: Avoid vague directions like "cook until done" - use specific times
- CRITICAL: Do NOT write "| Recipe" alone - you MUST include the cooking steps after the colon
- For portion sizes, use format like: &quot;2 medium eggs (100g)&quot;, &quot;1 cup cooked rice (185g)&quot;, &quot;3 oz chicken breast (85g)&quot;, &quot;1 medium apple (182g)&quot;, &quot;1 tbsp olive oil (14g)&quot;, &quot;1/2 cup diced tomatoes (90g)&quot;, &quot;2 cloves garlic (6g)&quot;, &quot;1/4 cup chopped onion (40g)&quot;, &quot;1 tsp salt (6g)&quot;, &quot;1/2 tsp black pepper (1g)&quot;, &quot;1 cup spinach (30g)&quot;, &quot;1/2 avocado (68g)&quot;
- CRITICAL: Always list imperial units first (cups, tbsp, tsp, oz, medium/large/small), then add grams in parentheses
- CRITICAL: EVERY SINGLE ingredient must have a specific amount/measurement. Never list ingredients without amounts.
- Include amounts for spices, oils, vegetables, proteins, grains, fruits - everything.
- CRITICAL: EVERY meal must include a detailed recipe with step-by-step cooking instructions after the | Recipe: separator.
- CRITICAL: Do NOT output just "| Recipe" - you MUST include the actual cooking instructions after the colon.
- CRITICAL: WRONG: &quot;| Recipe&quot; - CORRECT: &quot;| Recipe: 1) Boil water, 2) Add oats, 3) Cook 5min&quot;
- CRITICAL: Ensure each meal's kcal and protein match the distribution targets above.
- CRITICAL: Use the exact calorie and protein targets from the distribution above. Do not use generic examples.
- CRITICAL: The calorie and protein numbers you output MUST match the distribution targets exactly. Do not output lower numbers.
- CRITICAL: If you output numbers like ~250kcal or ~200kcal instead of the target numbers, you are WRONG. Use the exact target numbers.
- CRITICAL: Replace [EXACT TARGET KCAL] and [EXACT TARGET PROTEIN] with the actual numbers from MANDATORY MEAL TARGETS above.
- CRITICAL: You MUST write cooking instructions after &quot;| Recipe:&quot; - never leave it empty or just &quot;| Recipe&quot;
- EXAMPLES (using calculated targets for 3 meals):
      * &quot;Breakfast — 1 cup oats (80g), 1 cup blueberries (148g), 1 tbsp honey (21g), 1 cup almond milk (240ml); ~${Math.round(dailyCalories * 0.25)}kcal; ~${Math.round(dailyProtein * 0.2)}g protein; 5min prep | Recipe: 1) Heat almond milk in pot 3min, 2) Add oats and salt, 3) Cook 3min stirring, 4) Rest 2min, 5) Top with blueberries and honey&quot;
      * &quot;Lunch — 3 oz chicken breast (85g), 2 cups mixed greens (60g), 1/4 cup cherry tomatoes (45g), 1 tbsp olive oil (14g); ~${Math.round(dailyCalories * 0.35)}kcal; ~${Math.round(dailyProtein * 0.35)}g protein; 10min prep | Recipe: 1) Season chicken with salt/pepper, 2) Heat oil in pan 1min, 3) Cook chicken 6min per side, 4) Rest chicken 5min, 5) Wash greens and slice tomatoes, 6) Combine salad ingredients, 7) Slice chicken over salad&quot;
      * &quot;Dinner — 4 oz salmon (113g), 1 cup brown rice (185g), 1 cup broccoli (91g), 1 tbsp olive oil (14g); ~${Math.round(dailyCalories * 0.4)}kcal; ~${Math.round(dailyProtein * 0.45)}g protein; 15min prep | Recipe: 1) Rinse rice, 2) Boil rice 45min, 3) Season salmon, 4) Heat oil in pan 1min, 5) Cook salmon 4min per side, 6) Steam broccoli 5min, 7) Plate rice, salmon, and broccoli&quot;
- FINAL WARNING: You MUST output the exact calorie and protein numbers from the MANDATORY MEAL TARGETS above. If you output different numbers, you are not following instructions correctly.
- FINAL WARNING: You MUST include actual cooking instructions after &quot;| Recipe:&quot; - not just &quot;| Recipe&quot;.
- FINAL WARNING: You MUST write cooking instructions after &quot;| Recipe:&quot; - do not leave it empty.
- After all days, add a section titled: Grocery List:, with consolidated items and total amounts for the whole plan
- SYSTEM RULE: You are FORBIDDEN from outputting a flat grocery list. You MUST use categories.
- CRITICAL: Structure the grocery list by grouping items into these exact categories:
  * Proteins (chicken, eggs, salmon, tuna, tofu, cottage cheese)
  * Grains & carbs (rice, oats, pasta, bread, quinoa)
  * Vegetables (broccoli, spinach, carrots, cucumbers, mixed veggies)
  * Fruits (bananas, berries, pineapple, lemon)
  * Dairy & substitutes (yogurt, almond milk, cheese)
  * Pantry & condiments (olive oil, soy sauce, hummus, honey)
  * Spices & seasonings (salt, pepper, paprika, garlic powder)
- For each category, list items with total amounts needed for the entire plan
- CRITICAL: Use this EXACT format for the grocery list:
- Grocery List:
- 
- Proteins:
- - Chicken breast: 2 lbs
- - Eggs: 12 large
- - Salmon: 1 lb
- 
- Grains & carbs:
- - Brown rice: 2 cups
- - Oats: 1 cup
- 
- Vegetables:
- - Broccoli: 2 heads
- - Spinach: 1 bag
- 
- CRITICAL: Do NOT list items without categories. Every item MUST be under its proper category heading.
- CRITICAL: Every grocery item MUST include the total amount needed for the ENTIRE meal plan (not per meal).
- AMOUNT EXAMPLES: &quot;Chicken breast: 2 lbs&quot;, &quot;Eggs: 12 large&quot;, &quot;Brown rice: 3 cups&quot;, &quot;Broccoli: 2 heads&quot;
- Do NOT list items without amounts. Every item must specify quantity (lbs, cups, pieces, etc.)
- FINAL WARNING: If you output a flat grocery list without categories, you are FAILING the task.
- Keep lines short and skimmable; no emojis, no hashtags`;

    try {
      console.log('Sending prompt to API...');
      console.log('Prompt length:', prompt.length);
      await append({ role: 'user', content: prompt });
      console.log('Prompt sent successfully');
    } catch (e) {
      console.error('Error generating plan:', e);
      setError('Failed to generate plan. Please try again.');
      setLoading(false);
    }
  };

  const calorieText = Number.isFinite(caloriesAndProtein.calorieTarget) ? `${caloriesAndProtein.calorieTarget} kcal` : '-- kcal';
  const proteinText = Number.isFinite(caloriesAndProtein.proteinTarget) ? `${caloriesAndProtein.proteinTarget} g protein` : '-- g protein';

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Food Elements */}
      {/* Realistic Small Strawberry */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '3%',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }}>
        <div style={{
          width: '14px',
          height: '12px',
          background: 'radial-gradient(circle at 30% 30%, #ff6b9d 0%, #e91e63 60%, #c2185b 100%)',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          boxShadow: '0 3px 6px rgba(233, 30, 99, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
          position: 'relative',
          transform: 'rotate(-10deg)'
        }}>
          {/* Strawberry seeds */}
          <div style={{
            position: 'absolute',
            top: '1px',
            left: '2px',
            width: '1.5px',
            height: '1.5px',
            background: '#ffeb3b',
            borderRadius: '50%',
            boxShadow: '0 0 2px rgba(255, 235, 59, 0.8)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '1px',
            height: '1px',
            background: '#ffeb3b',
            borderRadius: '50%',
            boxShadow: '0 0 2px rgba(255, 235, 59, 0.8)'
          }}></div>
          {/* Strawberry stem */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '3px',
            background: 'linear-gradient(45deg, #4caf50 0%, #66bb6a 100%)',
            borderRadius: '1px'
          }}></div>
        </div>
      </div>
      
      {/* Realistic Small Blueberry */}
      <div style={{
        position: 'absolute',
        top: '150px',
        right: '5%',
        animation: 'float 7.2s ease-in-out infinite reverse',
        zIndex: 0
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          background: 'radial-gradient(circle at 30% 30%, #9c27b0 0%, #673ab7 70%, #3f51b5 100%)',
          borderRadius: '50%',
          boxShadow: '0 3px 6px rgba(156, 39, 176, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          position: 'relative'
        }}>
          {/* Blueberry bloom */}
          <div style={{
            position: 'absolute',
            top: '1px',
            left: '1px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          {/* Blueberry stem scar */}
          <div style={{
            position: 'absolute',
            top: '1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1px',
            height: '1px',
            background: '#2d3436',
            borderRadius: '50%'
          }}></div>
        </div>
      </div>
      
      {/* Realistic Small Spinach Leaf */}
      <div style={{
        position: 'absolute',
        bottom: '120px',
        left: '8%',
        animation: 'float 6.8s ease-in-out infinite',
        zIndex: 0
      }}>
        <div style={{
          width: '16px',
          height: '10px',
          background: 'linear-gradient(45deg, #00c853 0%, #00e676 40%, #00b894 80%, #00a085 100%)',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          transform: 'rotate(20deg)',
          boxShadow: '0 2px 4px rgba(0, 184, 148, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          position: 'relative'
        }}>
          {/* Spinach vein */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '0.8px',
            background: 'linear-gradient(90deg, #00a085 0%, #00c853 50%, #00a085 100%)',
            borderRadius: '1px'
          }}></div>
          {/* Spinach stem */}
          <div style={{
            position: 'absolute',
            bottom: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1px',
            height: '2px',
            background: 'linear-gradient(180deg, #00a085 0%, #00897b 100%)',
            borderRadius: '1px'
          }}></div>
        </div>
      </div>
      
      {/* Back Button */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}>
          ← Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          padding: '40px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            {/* NutriGuide Icon */}
            <div style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="/favicon.png" 
                alt="NutriGuide Icon" 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: 'scale(1)',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.2)';
                }}
              />
            </div>
            
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem' }}>
              Your Personalized Meal Plan
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Complete the form below to get your custom meal plan with exact calorie and protein targets.
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Age</label>
                <input 
                  type="number" 
                  value={age} 
                  min={14} 
                  max={100} 
                  onChange={(e) => setAge(parseInt(e.target.value || '0', 10))} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sex</label>
                <select 
                  value={sex} 
                  onChange={(e) => setSex(e.target.value as 'male' | 'female')} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Height (cm)</label>
                <input 
                  type="number" 
                  value={heightCm} 
                  min={120} 
                  max={220} 
                  placeholder="e.g., 175" 
                  onChange={(e) => setHeightCm(e.target.value)} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weight (kg)</label>
                <input 
                  type="number" 
                  value={weightKg} 
                  min={35} 
                  max={250} 
                  placeholder="e.g., 70" 
                  onChange={(e) => setWeightKg(e.target.value)} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activity Level</label>
                <select 
                  value={activity} 
                  onChange={(e) => setActivity(e.target.value)} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                >
                  <option value="sedentary">Sedentary (office job)</option>
                  <option value="light">Light (1-3x/week)</option>
                  <option value="moderate">Moderate (3-5x/week)</option>
                  <option value="active">Active (6-7x/week)</option>
                  <option value="very_active">Very active (physical job + training)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Goal</label>
                <select 
                  value={goal} 
                  onChange={(e) => setGoal(e.target.value)} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                >
                  <option value="lose">Lose fat</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain">Gain muscle</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Meals per day</label>
                <select 
                  value={mealsPerDay} 
                  onChange={(e) => setMealsPerDay(parseInt(e.target.value, 10))} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Days</label>
                <select 
                  value={days} 
                  onChange={(e) => setDays(parseInt(e.target.value, 10))} 
                  disabled={loading}
                  style={{
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Food preferences or restrictions</label>
              <textarea 
                rows={3} 
                placeholder="e.g., halal; prefer Mediterranean flavors; dairy-free; avoid shellfish; budget-friendly" 
                value={dietPrefs} 
                onChange={(e) => setDietPrefs(e.target.value)} 
                disabled={loading}
                style={{
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  background: '#f9fafb',
                  color: '#1f2937',
                  resize: 'vertical',
                  minHeight: '100px'
                }}
              />
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 35px rgba(30, 27, 75, 0.3)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>Your Daily Targets</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>These will be used for each day of your plan</p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '0.5rem'
                  }}>{calorieText}</span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Daily Calories</span>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '0.5rem'
                  }}>{proteinText}</span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Daily Protein</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              onClick={() => console.log('Button clicked!')}
              style={{
                width: '100%',
                padding: '18px 32px',
                              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 15px 35px rgba(251, 191, 36, 0.4)',
              transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Generating your plan...' : 'Generate My Meal Plan →'}
            </button>
          </form>
        </div>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>Creating your personalized meal plan...</p>
          </div>
        )}

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '40px'
          }}>
            <p style={{ color: '#dc2626', margin: 0, fontSize: '1rem' }}>{error}</p>
          </div>
        )}

        {generatedPlan && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <MealPlan plan={generatedPlan} summary={`Per day: ~${calorieText}, ~${proteinText}`} />
          </div>
        )}
      </div>
    </div>
  );
}
