'use client';

// Using inline styles instead of CSS modules

type Props = {
  plan: string;
  summary?: string;
};

type DayPlan = {
  day: string;
  meals: { name: string; details: string; portions: string; recipe: string }[];
};

type GroceryItem = { item: string; amount: string };

function generateFallbackRecipe(details: string, mealName: string): string {
  const detailsLower = details.toLowerCase();
  
  // Extract specific ingredients to create tailored recipes
  const hasOats = detailsLower.includes('oat');
  const hasEggs = detailsLower.includes('egg');
  const hasChicken = detailsLower.includes('chicken');
  const hasFish = detailsLower.includes('salmon') || detailsLower.includes('cod') || detailsLower.includes('fish');
  const hasBeef = detailsLower.includes('beef') || detailsLower.includes('steak');
  const hasRice = detailsLower.includes('rice');
  const hasQuinoa = detailsLower.includes('quinoa');
  const hasPasta = detailsLower.includes('pasta');
  const hasTuna = detailsLower.includes('tuna');
  const hasBroccoli = detailsLower.includes('broccoli');
  const hasAsparagus = detailsLower.includes('asparagus');
  const hasSpinach = detailsLower.includes('spinach');
  const hasKale = detailsLower.includes('kale');
  const hasTomatoes = detailsLower.includes('tomato');
  const hasAvocado = detailsLower.includes('avocado');
  const hasMilk = detailsLower.includes('milk');
  const hasSalad = detailsLower.includes('salad') || detailsLower.includes('greens');
  const hasFrenchToast = detailsLower.includes('french toast');
  const hasLentilSoup = detailsLower.includes('lentil') || detailsLower.includes('soup');
  const hasMashedPotatoes = detailsLower.includes('mashed potato');
  const hasCauliflower = detailsLower.includes('cauliflower');
  const hasGravy = detailsLower.includes('gravy');
  const hasStrawberries = detailsLower.includes('strawberry');
  const hasMapleSyrup = detailsLower.includes('maple syrup');
  const hasBread = detailsLower.includes('bread') || detailsLower.includes('toast');
  const hasPotato = detailsLower.includes('potato');
  const hasSweetPotato = detailsLower.includes('sweet potato');
  const hasCouscous = detailsLower.includes('couscous');
  const hasTurkey = detailsLower.includes('turkey');
  const hasPork = detailsLower.includes('pork');
  const hasShrimp = detailsLower.includes('shrimp') || detailsLower.includes('prawn');
  const hasLentils = detailsLower.includes('lentil');
  const hasSoup = detailsLower.includes('soup');
  const hasRoll = detailsLower.includes('roll');
  const hasCheese = detailsLower.includes('cheese') || detailsLower.includes('cheddar');
  const hasPear = detailsLower.includes('pear');
  const hasApple = detailsLower.includes('apple');
  const hasBanana = detailsLower.includes('banana');
  const hasOrange = detailsLower.includes('orange');
  const hasBlueberries = detailsLower.includes('blueberry');
  const hasGranola = detailsLower.includes('granola');
  const hasHoney = detailsLower.includes('honey');
  const hasButter = detailsLower.includes('butter');
  const hasOliveOil = detailsLower.includes('olive oil');
  const hasMayo = detailsLower.includes('mayo') || detailsLower.includes('mayonnaise');
  const hasHummus = detailsLower.includes('hummus');
  const hasDressing = detailsLower.includes('dressing') || detailsLower.includes('vinaigrette');
  
  // Breakfast combinations
  if (hasOats && hasMilk) {
    return '🔹 Prep: 1) Heat milk in pot 3min, 2) Add oats and salt, 3) Cook 3min stirring, 4) Top with fruits and honey';
  }
  
  if (hasOats && hasBlueberries) {
    return '🔹 Prep: 1) Heat milk in pot 3min, 2) Add oats and salt, 3) Cook 3min stirring, 4) Top with blueberries and honey';
  }
  
  if (hasOats && hasStrawberries) {
    return '🔹 Prep: 1) Heat milk in pot 3min, 2) Add oats and salt, 3) Cook 3min stirring, 4) Top with sliced strawberries and honey';
  }
  
  if (hasOats && hasBanana) {
    return '🔹 Prep: 1) Heat milk in pot 3min, 2) Add oats and salt, 3) Cook 3min stirring, 4) Top with sliced banana and honey';
  }
  
  if (detailsLower.includes('yogurt') || detailsLower.includes('greek yogurt')) {
    return '🔹 Prep: 1) Spoon yogurt into bowl, 2) Add granola, 3) Slice banana, 4) Drizzle honey, 5) Serve cold';
  }
  
  if (detailsLower.includes('yogurt') && hasGranola) {
    return '🔹 Prep: 1) Spoon yogurt into bowl, 2) Add granola, 3) Slice banana, 4) Drizzle honey, 5) Serve cold';
  }
  
  if (detailsLower.includes('yogurt') && hasStrawberries) {
    return '🔹 Prep: 1) Spoon yogurt into bowl, 2) Add granola, 3) Slice strawberries, 4) Drizzle honey, 5) Serve cold';
  }
  
  if (hasFrenchToast) {
    return '🔹 Prep: 1) Whisk egg and milk, 2) Dip bread in mixture, 3) Cook 3min per side, 4) Serve with syrup and strawberries';
  }
  
  if (hasEggs) {
    if (detailsLower.includes('scramble') || detailsLower.includes('scrambled')) {
      return '🔹 Prep: 1) Crack eggs in bowl, 2) Whisk eggs, 3) Pour in hot pan, 4) Scramble 3min until set, 5) Serve with toast';
    } else {
      return '🔹 Prep: 1) Crack eggs in hot pan, 2) Cook 3min until set, 3) Serve with toast';
    }
  }
  
  // Lunch combinations
  if (hasChicken && hasSalad) {
    return '🔹 Prep: 1) Season chicken with salt/pepper, 2) Pan-fry 6min per side, 3) Rest 5min, 4) Slice over salad with dressing';
  }
  
  if (hasChicken && hasRice) {
    return '🔹 Prep: 1) Boil rice 20min, 2) Pan-fry chicken 6min per side, 3) Steam veggies 5min, 4) Combine and season';
  }
  
  if (hasChicken && hasQuinoa) {
    return '🔹 Prep: 1) Boil quinoa 15min, 2) Pan-fry chicken 6min per side, 3) Steam veggies 5min, 4) Combine ingredients';
  }
  
  if (hasLentilSoup) {
    return '🔹 Prep: 1) Heat soup in pot 5min, 2) Warm bread roll 2min, 3) Slice cheese and pear, 4) Serve together';
  }
  
  if (hasSoup && hasRoll) {
    return '🔹 Prep: 1) Heat soup in pot 5min, 2) Warm bread roll 2min, 3) Slice cheese and pear, 4) Serve together';
  }
  
  if (hasTurkey && hasBread) {
    return '🔹 Prep: 1) Warm wrap/bread 30sec, 2) Spread hummus/dressing, 3) Layer turkey slices, 4) Add veggies, 5) Roll/wrap and serve';
  }
  
  if (hasTuna && hasBread) {
    return '🔹 Prep: 1) Drain tuna, 2) Mix with mayo, 3) Toast bread 2min, 4) Spread tuna mixture, 5) Add veggies and serve';
  }
  
  if (hasCouscous && hasChicken) {
    return '🔹 Prep: 1) Boil couscous 5min, 2) Pan-fry chicken 6min per side, 3) Steam veggies 5min, 4) Combine and season';
  }
  
  if (hasCouscous && hasBeef) {
    return '🔹 Prep: 1) Boil couscous 5min, 2) Sear beef 3min per side, 3) Rest 5min, 4) Steam veggies 5min, 5) Serve together';
  }
  
  // Wrap/Sandwich combinations
  if (detailsLower.includes('wrap') || detailsLower.includes('sandwich') || detailsLower.includes('bread')) {
    if (detailsLower.includes('turkey') || detailsLower.includes('chicken')) {
      return '🔹 Prep: 1) Warm wrap/bread 30sec, 2) Spread hummus/dressing, 3) Layer turkey/chicken, 4) Add veggies, 5) Roll/wrap and serve';
    } else if (detailsLower.includes('tuna')) {
      return '🔹 Prep: 1) Drain tuna, 2) Mix with mayo, 3) Toast bread 2min, 4) Spread tuna mixture, 5) Add veggies and serve';
    } else {
      return '🔹 Prep: 1) Warm wrap/bread 30sec, 2) Add protein and veggies, 3) Roll/wrap and serve';
    }
  }
  
  // Dinner combinations
  if (hasFish && hasRice) {
    return '🔹 Prep: 1) Boil rice 20min, 2) Pan-fry fish 4min per side, 3) Steam veggies 5min, 4) Plate together';
  }
  
  if (hasFish && hasQuinoa) {
    return '🔹 Prep: 1) Boil quinoa 15min, 2) Pan-fry fish 4min per side, 3) Steam broccoli 5min, 4) Plate together';
  }
  
  if (hasFish && hasAsparagus) {
    return '🔹 Prep: 1) Roast asparagus 15min, 2) Pan-fry fish 4min per side, 3) Cook rice 20min, 4) Plate together';
  }
  
  if (hasBeef && hasRice) {
    return '🔹 Prep: 1) Boil rice 20min, 2) Sear beef 3min per side, 3) Rest 5min, 4) Slice and serve';
  }
  
  if (hasBeef && hasPasta) {
    return '🔹 Prep: 1) Boil pasta 10min, 2) Sear beef 3min per side, 3) Sauté veggies 5min, 4) Combine with sauce';
  }
  
  if (hasBeef && (detailsLower.includes('potato') || detailsLower.includes('baked'))) {
    return '🔹 Prep: 1) Bake potato 45min, 2) Sear beef 3min per side, 3) Rest 5min, 4) Steam broccoli 5min, 5) Serve together';
  }
  
  if (detailsLower.includes('pork') || detailsLower.includes('pork chop')) {
    return '🔹 Prep: 1) Season pork with salt/pepper, 2) Pan-fry 4min per side, 3) Rest 5min, 4) Prepare sides, 5) Serve together';
  }
  
  if (detailsLower.includes('shrimp') || detailsLower.includes('prawn')) {
    return '🔹 Prep: 1) Boil pasta 10min, 2) Cook shrimp 3min per side, 3) Heat sauce, 4) Steam veggies 5min, 5) Combine and serve';
  }
  
  // Pasta combinations
  if (hasPasta && hasTuna) {
    return '🔹 Prep: 1) Boil pasta 10min, 2) Sauté veggies 5min, 3) Mix with tuna and oil, 4) Combine and serve';
  }
  
  if (hasPasta && hasChicken) {
    return '🔹 Prep: 1) Boil pasta 10min, 2) Pan-fry chicken 6min per side, 3) Sauté veggies 5min, 4) Combine with sauce';
  }
  
  // Vegetable-specific recipes
  if (hasBroccoli || hasAsparagus) {
    return '🔹 Prep: steam veggies 5min until bright green, season with salt/pepper';
  }
  
  if (hasSpinach || hasKale) {
    return '🔹 Prep: sauté greens in oil 2min until wilted, season to taste';
  }
  
  if (hasTomatoes && hasSalad) {
    return '🔹 Prep: wash and slice tomatoes, combine with salad greens, add dressing';
  }
  
  if (hasAvocado) {
    return '🔹 Prep: cut avocado, remove pit, slice or mash as needed';
  }
  
  // Protein + vegetable combinations
  if (hasChicken && hasBroccoli) {
    return '🔹 Prep: 1) Pan-fry chicken 6min per side, 2) Steam broccoli 5min, 3) Serve together';
  }
  
  if (hasFish && hasBroccoli) {
    return '🔹 Prep: 1) Pan-fry fish 4min per side, 2) Steam broccoli 5min, 3) Serve together';
  }
  
  if (hasBeef && hasBroccoli) {
    return '🔹 Prep: 1) Sear beef 3min per side, 2) Rest 5min, 3) Steam broccoli 5min, 4) Serve together';
  }
  
  if (hasChicken && hasMashedPotatoes) {
    return '🔹 Prep: 1) Grill chicken 8min per side, 2) Heat mashed potatoes 3min, 3) Steam cauliflower 5min, 4) Add gravy and serve';
  }
  
  if (hasPork && hasSweetPotato) {
    return '🔹 Prep: 1) Season pork with salt/pepper, 2) Pan-fry 4min per side, 3) Rest 5min, 4) Heat sweet potato, 5) Steam spinach 2min, 6) Serve together';
  }
  
  if (hasShrimp && hasPasta) {
    return '🔹 Prep: 1) Boil pasta 10min, 2) Cook shrimp 3min per side, 3) Heat sauce, 4) Steam veggies 5min, 5) Combine and serve';
  }
  
  if (hasBeef && hasPotato) {
    return '🔹 Prep: 1) Bake potato 45min, 2) Sear beef 3min per side, 3) Rest 5min, 4) Steam broccoli 5min, 5) Serve together';
  }
  
  if (hasFish && hasPotato) {
    return '🔹 Prep: 1) Bake potato 45min, 2) Pan-fry fish 4min per side, 3) Steam veggies 5min, 4) Serve together';
  }
  
  if (hasCauliflower) {
    return '🔹 Prep: 1) Steam cauliflower 5min until tender, 2) Season with salt/pepper, 3) Serve hot';
  }
  
  if (hasSweetPotato) {
    return '🔹 Prep: 1) Bake sweet potato 45min, 2) Mash with butter, 3) Season with salt/pepper, 4) Serve hot';
  }
  
  if (hasPotato && hasButter) {
    return '🔹 Prep: 1) Bake potato 45min, 2) Split and add butter, 3) Season with salt/pepper, 4) Serve hot';
  }
  
  if (hasSpinach && hasOliveOil) {
    return '🔹 Prep: 1) Sauté spinach in olive oil 2min, 2) Season with salt/pepper, 3) Serve hot';
  }
  
  if (hasBroccoli && hasOliveOil) {
    return '🔹 Prep: 1) Steam broccoli 5min, 2) Drizzle with olive oil, 3) Season with salt/pepper, 4) Serve hot';
  }
  
  // Grain + protein combinations
  if (hasRice && hasChicken) {
    return '🔹 Prep: 1) Boil rice 20min, 2) Pan-fry chicken 6min per side, 3) Steam veggies 5min, 4) Combine and season';
  }
  
  if (hasRice && hasFish) {
    return '🔹 Prep: 1) Boil rice 20min, 2) Pan-fry fish 4min per side, 3) Steam veggies 5min, 4) Serve together';
  }
  
  if (hasRice && hasBeef) {
    return '🔹 Prep: 1) Boil rice 20min, 2) Sear beef 3min per side, 3) Rest 5min, 4) Steam veggies 5min, 5) Serve together';
  }
  
  if (hasQuinoa && hasChicken) {
    return '🔹 Prep: 1) Boil quinoa 15min, 2) Pan-fry chicken 6min per side, 3) Steam veggies 5min, 4) Combine ingredients';
  }
  
  if (hasQuinoa && hasFish) {
    return '🔹 Prep: 1) Boil quinoa 15min, 2) Pan-fry fish 4min per side, 3) Steam broccoli 5min, 4) Plate together';
  }
  
  if (hasQuinoa && hasBeef) {
    return '🔹 Prep: 1) Boil quinoa 15min, 2) Sear beef 3min per side, 3) Rest 5min, 4) Steam veggies 5min, 5) Serve together';
  }
  
  // Generic fallbacks based on meal type
  if (mealName.toLowerCase().includes('breakfast')) {
    return '🔹 Prep: 1) Prepare main ingredients, 2) Combine in bowl/plate, 3) Add toppings, 4) Serve immediately';
  }
  
  if (mealName.toLowerCase().includes('lunch')) {
    return '🔹 Prep: 1) Cook protein 6-8min, 2) Prepare vegetables, 3) Combine ingredients, 4) Add dressing/sauce, 5) Serve';
  }
  
  if (mealName.toLowerCase().includes('dinner')) {
    return '🔹 Prep: 1) Cook protein 6-8min, 2) Prepare grains 15-20min, 3) Steam vegetables 5min, 4) Plate together, 5) Season to taste';
  }
  
  // Default fallback
  return '🔹 Prep: 1) Cook main protein 6-8min, 2) Prepare sides 5-15min, 3) Combine ingredients, 4) Season to taste, 5) Serve hot';
}

function splitPlan(plan: string): { daysRaw: string; groceryRaw: string } {
  const idx = plan.search(/^\s*Grocery\s+List\s*:/im);
  if (idx === -1) return { daysRaw: plan, groceryRaw: '' };
  const before = plan.slice(0, idx).trim();
  const after = plan.slice(idx).replace(/^\s*Grocery\s+List\s*:\s*/i, '').trim();
  return { daysRaw: before, groceryRaw: after };
}

function parsePlanToDays(plan: string): DayPlan[] {
  const lines = plan.split(/\r?\n/);
  const days: DayPlan[] = [];
  let current: DayPlan | null = null;
  const dayHeader = /^\s*Day\s+(\d+)\s*:/i;
  const bullet = /^\s*[-•]\s*(.*)$/;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const dh = line.match(dayHeader);
    if (dh) {
      current = { day: `Day ${dh[1]}`, meals: [] };
      days.push(current);
      continue;
    }
    const bm = line.match(bullet);
    if (bm && current) {
      const txt = bm[1];
      const [name, rest] = txt.split(/\s+—\s+|\s+-\s+|:\s+/, 2);
      
      // Keep amounts inline with ingredients in details
      let details = rest || txt;
      let recipe = '';
      
      // Debug: log the original text to see the format
      console.log('Original meal text:', txt);
      console.log('Details before parsing:', details);
      
      // Extract recipe from the details if it exists
      const recipeMatch = details.match(/\|\s*Recipe:\s*(.*)/);
      if (recipeMatch) {
        recipe = recipeMatch[1].trim();
        // Remove recipe from details for cleaner display
        details = details.replace(/\|\s*Recipe:.*/, '').trim();
        console.log('Found recipe with | Recipe: pattern:', recipe);
      } else {
        // Try alternative recipe patterns
        const altRecipeMatch = details.match(/\|\s*Recipe\s+(.*)/);
        if (altRecipeMatch) {
          recipe = altRecipeMatch[1].trim();
          details = details.replace(/\|\s*Recipe\s+.*/, '').trim();
          console.log('Found recipe with | Recipe pattern:', recipe);
        } else {
          // Check if there's just "| Recipe" without content
          if (details.includes('| Recipe')) {
            // Remove the "| Recipe" part from details
            details = details.replace(/\|\s*Recipe.*/, '').trim();
            
            // Generate a fallback recipe based on the ingredients
            recipe = generateFallbackRecipe(details, name);
            console.log('Found | Recipe but no content, generated fallback:', recipe);
          } else {
            // Try to extract recipe that comes after the meal details (separated by tab or multiple spaces)
            const parts = details.split(/\t+|\s{3,}/);
            if (parts.length > 1) {
              details = parts[0].trim();
              recipe = parts[1].trim();
              console.log('Found recipe with tab/space separation:', recipe);
            } else {
              // Try to find recipe after the last semicolon (which separates meal info from recipe)
              const lastSemicolonIndex = details.lastIndexOf(';');
              if (lastSemicolonIndex !== -1) {
                const beforeSemicolon = details.substring(0, lastSemicolonIndex).trim();
                const afterSemicolon = details.substring(lastSemicolonIndex + 1).trim();
                
                console.log('After last semicolon:', afterSemicolon);
                
                // If after semicolon looks like a recipe (starts with "Prep:" or contains cooking words)
                if (afterSemicolon.startsWith('Prep:') || afterSemicolon.includes('cook') || afterSemicolon.includes('stir') || afterSemicolon.includes('add')) {
                  details = beforeSemicolon;
                  recipe = afterSemicolon;
                  console.log('Found recipe after semicolon:', recipe);
                }
              }
            }
            
            // If no recipe was found at all, generate a fallback
            if (!recipe) {
              recipe = generateFallbackRecipe(details, name);
              console.log('No recipe found, generated fallback:', recipe);
            }
          }
        }
      }
      
      console.log('Final details:', details);
      console.log('Final recipe:', recipe);
      
      current.meals.push({ 
        name: (name || 'Meal').trim(), 
        details: details,
        portions: '', // No longer using separate portions column
        recipe: recipe
      });
    }
  }
  return days.length ? days : [{ day: 'Plan', meals: [{ name: 'Meals', details: plan, portions: '', recipe: '' }] }];
}

function parseGroceryList(grocery: string): GroceryItem[] {
  if (!grocery) return [];
  const lines = grocery.split(/\r?\n/);
  const bullet = /^\s*[-•]\s*(.*)$/;
  const items: GroceryItem[] = [];
  for (const raw of lines) {
    const m = raw.match(bullet);
    if (!m) continue;
    const txt = m[1];
    // Try multiple separators to extract item and amount
    const separators = [/\s+—\s+/, /\s+-\s+/, /\s*:\s*/, /\s+\(/, /\s+(\d+)/];
    let item = txt.trim();
    let amount = '';
    
    for (const sep of separators) {
      const parts = txt.split(sep, 2);
      if (parts.length > 1) {
        item = parts[0].trim();
        amount = parts[1].trim();
        break;
      }
    }
    
    // If no separator found, try to extract amount from parentheses at the end
    if (!amount) {
      const amountMatch = txt.match(/\(([^)]+)\)\s*$/);
      if (amountMatch) {
        item = txt.replace(/\([^)]+\)\s*$/, '').trim();
        amount = amountMatch[1];
      }
    }
    
    items.push({ item: item || txt.trim(), amount: amount });
  }
  return items;
}

function openPrintWindow(title: string, htmlContent: string) {
  const printHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #1f2f3a; }
    h1 { font-size: 22px; margin: 0 0 12px; }
    .summary { color: #3e86d1; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
    th, td { text-align: left; border: 1px solid #c9d9e6; padding: 8px 10px; vertical-align: top; }
    th { background: #f0f6ff; }
    .day { margin: 18px 0 8px; font-weight: bold; }
    .wrap { max-width: 900px; margin: 0 auto; }
    @page { size: A4; margin: 12mm; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>${title}</h1>
    <div class="summary">${new Date().toLocaleDateString()} • ${location.origin}</div>
    ${htmlContent}
  </div>
  <script>window.onload = () => { window.print(); };</script>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(printHtml);
  w.document.close();
}

const MealPlan: React.FC<Props> = ({ plan, summary }) => {
  const { daysRaw, groceryRaw } = splitPlan(plan);
  const days = parsePlanToDays(daysRaw);
  const groceries = parseGroceryList(groceryRaw);

  const handleSave = () => {
    const tableHtml = days.map(d => `
      <div class="day">${d.day}</div>
      <table>
        <thead><tr><th>Meal</th><th>Details</th><th>Recipe</th></tr></thead>
        <tbody>
          ${d.meals.map(m => `<tr><td>${m.name}</td><td>${m.details}</td><td>${m.recipe || 'No recipe provided'}</td></tr>`).join('')}
        </tbody>
      </table>
    `).join('');
    const groceryHtml = groceries.length ? `
      <h2>Grocery List</h2>
      <table>
        <thead><tr><th>Item</th><th>Total Amount</th></tr></thead>
        <tbody>
          ${groceries.map(g => `<tr><td>${g.item}</td><td>${g.amount}</td></tr>`).join('')}
        </tbody>
      </table>
    ` : '';
    const title = 'Meal Plan';
    const summaryHtml = summary ? `<div class="summary">${summary}</div>` : '';
    openPrintWindow(title, `${summaryHtml}${tableHtml}${groceryHtml}`);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '20px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        {summary && (
          <div style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            <span>{summary}</span>
          </div>
        )}
        <div>
          {days.map((d) => (
            <div key={d.day} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, margin: '8px 0' }}>{d.day}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', border: '1px solid #c9d9e6', padding: '6px 8px', background: '#f0f6ff' }}>Meal</th>
                    <th style={{ textAlign: 'left', border: '1px solid #c9d9e6', padding: '6px 8px', background: '#f0f6ff' }}>Details</th>
                    <th style={{ textAlign: 'left', border: '1px solid #c9d9e6', padding: '6px 8px', background: '#f0f6ff' }}>Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  {d.meals.map((m, i) => (
                    <tr key={i}>
                      <td style={{ border: '1px solid #c9d9e6', padding: '6px 8px', verticalAlign: 'top' }}>{m.name}</td>
                      <td style={{ border: '1px solid #c9d9e6', padding: '6px 8px', whiteSpace: 'pre-wrap' }}>{m.details}</td>
                      <td style={{ border: '1px solid #c9d9e6', padding: '6px 8px', whiteSpace: 'pre-wrap' }}>{m.recipe || 'No recipe provided'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {groceries.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontWeight: '700', margin: '8px 0', fontSize: '1.2rem', color: '#1a202c' }}>Grocery List</div>
              
              {/* Check if groceries are already categorized */}
              {groceries.some(g => g.item.toLowerCase().includes('proteins') || g.item.toLowerCase().includes('grains') || g.item.toLowerCase().includes('vegetables')) ? (
                // Display categorized groceries
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {groceries.map((g, i) => (
                    <div key={i} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: '#f8fafc',
                        padding: '12px 16px',
                        borderBottom: '1px solid #e5e7eb',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '1rem'
                      }}>
                        {g.item}
                      </div>
                      <div style={{
                        padding: '16px',
                        background: 'white',
                        color: '#4b5563',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap'
                      }}>
                        <div style={{
                          fontWeight: '500',
                          color: '#059669',
                          marginBottom: '8px',
                          fontSize: '0.9rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Total Amounts Needed:
                        </div>
                        <div style={{
                          color: '#1f2937',
                          fontWeight: '500'
                        }}>
                          {g.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Display traditional grocery list table
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', border: '1px solid #c9d9e6', padding: '6px 8px', background: '#f0f6ff' }}>Item</th>
                      <th style={{ textAlign: 'left', border: '1px solid #c9d9e6', padding: '6px 8px', background: '#f0f6ff' }}>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groceries.map((g, i) => (
                      <tr key={i}>
                        <td style={{ border: '1px solid #c9d9e6', padding: '6px 8px' }}>{g.item}</td>
                        <td style={{ border: '1px solid #c9d9e6', padding: '6px 8px' }}>{g.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px 0',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <button style={{
            background: '#1da1f2',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }} onClick={handleSave}>Save plan</button>
        </div>
      </div>
    </div>
  );
};

export default MealPlan; 