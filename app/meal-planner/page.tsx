'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { useChat } from 'ai/react';
import MealPlan from '../components/MealPlan';
import Link from 'next/link';

// Define types for quiz steps
type QuizStepOption = {
  value: string;
  label: string;
  icon: string;
  description: string;
};

type QuizStep = {
  id: string;
  title: string;
  subtitle: string;
  options?: QuizStepOption[];
  multiSelect?: boolean;
  type?: 'textarea';
  placeholder?: string;
  optional?: boolean;
  min?: number;
  max?: number;
  unit?: string;
};

// Quiz steps configuration for dinner planning
const quizSteps: QuizStep[] = [
  {
    id: 'dietary',
    title: 'Any dietary pattern?',
    subtitle: 'This helps me suggest recipes that fit your lifestyle',
    options: [
      { value: 'none', label: 'No restrictions', icon: '🍽️', description: 'I eat everything' },
      { value: 'vegetarian', label: 'Vegetarian', icon: '🥬', description: 'No meat, but dairy and eggs are fine' },
      { value: 'vegan', label: 'Vegan', icon: '🌱', description: 'Plant-based only, no animal products' },
      { value: 'pescatarian', label: 'Pescatarian', icon: '🐟', description: 'Fish and seafood, no other meat' },
      { value: 'halal', label: 'Halal', icon: '☪️', description: 'Following Islamic dietary laws' },
      { value: 'kosher', label: 'Kosher', icon: '✡️', description: 'Following Jewish dietary laws' }
    ]
  },
  {
    id: 'allergies',
    title: 'Any allergies or intolerances?',
    subtitle: 'I\'ll make sure to avoid these ingredients',
    options: [
      { value: 'none', label: 'None', icon: '✅', description: 'No allergies or intolerances' },
      { value: 'peanuts', label: 'Peanuts', icon: '🥜', description: 'Avoid peanut products' },
      { value: 'tree_nuts', label: 'Tree Nuts', icon: '🌰', description: 'Avoid almonds, walnuts, etc.' },
      { value: 'dairy', label: 'Dairy', icon: '🥛', description: 'Avoid milk, cheese, yogurt' },
      { value: 'eggs', label: 'Eggs', icon: '🥚', description: 'Avoid egg products' },
      { value: 'soy', label: 'Soy', icon: '🫘', description: 'Avoid soy products' },
      { value: 'gluten', label: 'Gluten', icon: '🌾', description: 'Avoid wheat, barley, rye' },
      { value: 'shellfish', label: 'Shellfish', icon: '🦐', description: 'Avoid shrimp, crab, lobster' }
    ],
    multiSelect: true
  },
  {
    id: 'dislikes',
    title: 'Ingredients you dislike or want to avoid?',
    subtitle: 'Tell me what you don\'t enjoy eating',
    type: 'textarea',
    placeholder: 'e.g., mushrooms, olives, cilantro, spicy food, bitter vegetables...',
    optional: true
  },
  {
    id: 'protein',
    title: 'What proteins do you enjoy?',
    subtitle: 'Choose all the protein sources you like',
    options: [
      { value: 'chicken', label: 'Chicken', icon: '🍗', description: 'Chicken breast, thighs, ground' },
      { value: 'beef', label: 'Beef', icon: '🥩', description: 'Steak, ground beef, roast' },
      { value: 'fish', label: 'Fish', icon: '🐟', description: 'Salmon, cod, tuna, tilapia' },
      { value: 'tofu', label: 'Tofu/Tempeh', icon: '🧈', description: 'Plant-based protein options' },
      { value: 'legumes', label: 'Legumes', icon: '🫘', description: 'Beans, lentils, chickpeas' },
      { value: 'eggs', label: 'Eggs', icon: '🥚', description: 'Scrambled, fried, boiled' }
    ],
    multiSelect: true
  },
  {
    id: 'cooking_time',
    title: 'How much time do you have tonight?',
    subtitle: 'I\'ll suggest recipes that fit your schedule',
    options: [
      { value: '10', label: '10 minutes', icon: '⚡', description: 'Super quick, minimal prep' },
      { value: '20', label: '20 minutes', icon: '⏰', description: 'Quick and easy' },
      { value: '30', label: '30 minutes', icon: '🕐', description: 'Moderate time investment' },
      { value: '45', label: '45 minutes', icon: '🕐', description: 'Some time to cook' },
      { value: '60', label: '60+ minutes', icon: '🍳', description: 'I have time to cook properly' }
    ]
  },
  {
    id: 'skill_level',
    title: 'What\'s your cooking skill level?',
    subtitle: 'I\'ll adjust recipe complexity accordingly',
    options: [
      { value: 'beginner', label: 'Beginner', icon: '🌱', description: 'New to cooking, need simple steps' },
      { value: 'comfortable', label: 'Comfortable', icon: '👨‍🍳', description: 'I can follow recipes well' },
      { value: 'advanced', label: 'Advanced', icon: '🔥', description: 'Experienced cook, can handle complex techniques' }
    ]
  },
  {
    id: 'kitchen_gear',
    title: 'What cooking equipment do you have?',
    subtitle: 'Choose all the equipment available to you',
    options: [
      { value: 'stovetop', label: 'Stovetop', icon: '🔥', description: 'Gas or electric burners' },
      { value: 'oven', label: 'Oven', icon: '🔥', description: 'For baking and roasting' },
      { value: 'microwave', label: 'Microwave', icon: '📱', description: 'Quick heating and cooking' },
      { value: 'air_fryer', label: 'Air Fryer', icon: '🍟', description: 'For crispy cooking' },
      { value: 'grill', label: 'Grill', icon: '🔥', description: 'Indoor or outdoor grilling' }
    ],
    multiSelect: true
  },
  {
    id: 'cuisine',
    title: 'What cuisine vibe are you feeling?',
    subtitle: 'Choose your preferred flavor profile',
    options: [
      { value: 'no_preference', label: 'No preference', icon: '🌍', description: 'I\'m open to anything' },
      { value: 'mediterranean', label: 'Mediterranean', icon: '🫒', description: 'Fresh, olive oil, herbs' },
      { value: 'mexican', label: 'Mexican', icon: '🌮', description: 'Spicy, flavorful, colorful' },
      { value: 'asian', label: 'Asian', icon: '🥢', description: 'Umami, soy sauce, ginger' },
      { value: 'italian', label: 'Italian', icon: '🍝', description: 'Pasta, tomatoes, basil' },
      { value: 'american_comfort', label: 'American Comfort', icon: '🍔', description: 'Classic, hearty, familiar' },
      { value: 'indian', label: 'Indian', icon: '🍛', description: 'Spices, curry, aromatic' },
      { value: 'middle_eastern', label: 'Middle Eastern', icon: '🥙', description: 'Hummus, falafel, tahini' }
    ]
  },
  {
    id: 'budget',
    title: 'What\'s your budget per serving?',
    subtitle: 'I\'ll suggest recipes that fit your budget',
    options: [
      { value: 'low', label: 'Low budget', icon: '💰', description: 'Affordable ingredients, under $5/serving' },
      { value: 'medium', label: 'Medium budget', icon: '💰💰', description: 'Moderate cost, $5-10/serving' },
      { value: 'high', label: 'High budget', icon: '💰💰💰', description: 'Premium ingredients, $10+/serving' }
    ]
  },
  {
    id: 'nutrition',
    title: 'What\'s your nutrition priority?',
    subtitle: 'I\'ll focus on what matters most to you',
    options: [
      { value: 'balanced', label: 'Balanced', icon: '⚖️', description: 'Good mix of all nutrients' },
      { value: 'high_protein', label: 'High Protein', icon: '💪', description: 'Focus on protein content' },
      { value: 'lower_carb', label: 'Lower Carb', icon: '🥗', description: 'Reduce carbohydrate intake' },
      { value: 'lower_fat', label: 'Lower Fat', icon: '🥬', description: 'Reduce fat content' },
      { value: 'calorie_light', label: 'Calorie Light', icon: '⚡', description: 'Lower calorie options' }
    ]
  },
  {
    id: 'servings',
    title: 'How many people are you cooking for?',
    subtitle: 'I\'ll adjust recipe quantities accordingly',
    options: [
      { value: '1', label: 'Just me', icon: '👤', description: 'Single serving' },
      { value: '2', label: '2 people', icon: '👥', description: 'Couple or small family' },
      { value: '3', label: '3 people', icon: '👥👤', description: 'Small family' },
      { value: '4', label: '4 people', icon: '👥👥', description: 'Family of four' },
      { value: '5', label: '5 people', icon: '👥👥👤', description: 'Larger family' },
      { value: '6', label: '6+ people', icon: '👥👥👥', description: 'Big family or gathering' }
    ]
  },
  {
    id: 'pantry',
    title: 'What pantry items do you already have?',
    subtitle: 'This helps me avoid suggesting ingredients you need to buy',
    type: 'textarea',
    placeholder: 'e.g., rice, pasta, olive oil, salt, pepper, garlic, onions, canned tomatoes...',
    optional: true
  }
];

export default function MealPlannerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const { append } = useChat({
    api: '/api/gpt',
    onFinish: async (message) => {
      console.log('Chat finished, message received:', message.content?.substring(0, 100) + '...');
      setError('');
      const cleaned = (message.content || '')
        .replace(/#[\w]+/g, '') // remove inline hashtags like #keto
        .replace(/^\s*#+\s*/gm, ''); // remove markdown heading hashes like ####
      setGeneratedPlan(cleaned);
      setLoading(false);
      console.log('Plan generated successfully');
      console.log('Full generated plan:', cleaned);
      
      // Extract recipe name and cuisine for image generation
      try {
        const recipeMatch = cleaned.match(/^([^-]+)/);
        if (recipeMatch) {
          const recipeName = recipeMatch[1].trim();
          const cuisine = answers.cuisine || 'international';
          await generateImage(recipeName, cuisine);
        }
      } catch (error) {
        console.error('Error generating image:', error);
      }
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

  const handleAnswer = (stepId: string, value: any) => {
    if (quizSteps.find(step => step.id === stepId)?.multiSelect) {
      // Handle multi-select answers
      setAnswers(prev => {
        const current = prev[stepId] || [];
              if (current.includes(value)) {
        return { ...prev, [stepId]: current.filter((v: string) => v !== value) };
      } else {
          return { ...prev, [stepId]: [...current, value] };
        }
      });
    } else {
      // Handle single-select answers
      setAnswers(prev => ({ ...prev, [stepId]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const currentStepData = quizSteps[currentStep];
    if (currentStepData.optional) return true;
    
    const answer = answers[currentStepData.id];
    if (currentStepData.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  };

  const progressPercentage = ((currentStep + 1) / quizSteps.length) * 100;

  const generateImage = async (recipeName: string, cuisine: string) => {
    try {
      setImageLoading(true);
      const imagePrompt = `A beautiful, appetizing, professional food photography shot of ${recipeName}. ${cuisine} cuisine style. High-quality, well-lit, on a clean plate with garnishes. Food styling that makes it look delicious and restaurant-quality.`;
      
      const response = await fetch('/api/dall-e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      // Don't show error to user for image generation
    } finally {
      setImageLoading(false);
    }
  };

  const onSubmit = async () => {
    if (!canProceed()) return;
    
    console.log('Quiz completed!');
    setLoading(true);
    setError('');
    setGeneratedPlan('');
    setGeneratedImage('');

    const prompt = `Hey there! I'm Chef ${Math.random() > 0.5 ? 'Marco' : 'Sarah'}, and I'm excited to create the perfect dinner recipe just for you! 🍳

Based on your preferences, I'm going to whip up something delicious that fits your lifestyle perfectly. Let me create a personalized dinner experience!

ABOUT YOUR DINNER PREFERENCES:
- Dietary Pattern: ${answers.dietary || 'Not specified'}
- Allergies/Intolerances: ${Array.isArray(answers.allergies) ? answers.allergies.join(', ') : answers.allergies || 'None'}
- Dislikes to Avoid: ${answers.dislikes || 'None specified'}
- Protein Preferences: ${Array.isArray(answers.protein) ? answers.protein.join(', ') : answers.protein || 'Not specified'}
- Cooking Time Available: ${answers.cooking_time || 'Not specified'} minutes
- Skill Level: ${answers.skill_level || 'Not specified'}
- Kitchen Equipment: ${Array.isArray(answers.kitchen_gear) ? answers.kitchen_gear.join(', ') : answers.kitchen_gear || 'Not specified'}
- Cuisine Preference: ${answers.cuisine || 'No preference'}
- Budget: ${answers.budget || 'Not specified'}
- Nutrition Priority: ${answers.nutrition || 'Not specified'}
- Servings: ${answers.servings || 'Not specified'}
- Pantry Items Available: ${answers.pantry || 'Not specified'}

NOW, LET ME CREATE YOUR PERFECT DINNER! ✨

I'll give you a complete dinner recipe that includes:
- A mouthwatering recipe name
- Fresh, affordable ingredients with perfect portions
- Exact nutritional information
- Quick prep time estimate
- My secret chef techniques for maximum flavor
- Step-by-step cooking instructions tailored to your skill level

FORMAT FOR YOUR DINNER RECIPE:
"Recipe Name — ingredients with amounts; ~[CALORIES]kcal; ~[PROTEIN]g protein; ~[CARBS]g carbs; ~[FAT]g fat; prep time

| Recipe: 

1) First step
2) Second step  
3) Third step..."

IMPORTANT CHEF NOTES:
- Every ingredient gets a specific amount - no guessing!
- I'll use both familiar measurements (cups, tbsp) and grams for precision
- The recipe will be completely unique and tailored to your preferences
- Cooking times will be realistic for your available time
- I'll choose the best cooking method for your equipment and skill level
- Everything will fit your dietary restrictions and preferences

CRITICAL RECIPE REQUIREMENTS:
- The recipe must be 100% unique and detailed - never generic or vague
- Every cooking step must directly reference specific ingredients that are actually listed
- NO vague steps like "prepare ingredients," "season to taste," or "cook until done"
- Each step should be specific and actionable with exact times and techniques
- If an ingredient is listed, it must be used in the cooking steps
- If a cooking step mentions an ingredient, it must be in the ingredient list
- Maintain the exact format: "Recipe Name — ingredients with amounts; ~[CALORIES]kcal; ~[PROTEIN]g protein; ~[CARBS]g carbs; ~[FAT]g fat; prep time

| Recipe: 

1) First step
2) Second step  
3) Third step..."



Ready to get cooking? Let's make some magic happen! 🎉`;

    try {
      console.log('Sending prompt to API...');
      console.log('Prompt length:', prompt.length);
      await append({ role: 'user', content: prompt });
      console.log('Prompt sent successfully');
    } catch (e) {
      console.error('Error generating plan:', e);
      setError('Failed to generate recipe. Please try again.');
      setLoading(false);
    }
  };

  const currentStepData = quizSteps[currentStep];
  const isLastStep = currentStep === quizSteps.length - 1;

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
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Progress Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1.1rem' }}>
              Step {currentStep + 1} of {quizSteps.length}
            </h3>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progressPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
          </div>
        </div>

        {/* Quiz Step */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          padding: '40px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          {/* Step Header */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1a202c', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {currentStepData.title}
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#64748b', 
              maxWidth: '500px', 
              margin: '0 auto', 
              lineHeight: '1.6' 
            }}>
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Step Content */}
          <div style={{ marginBottom: '40px' }}>
            {currentStepData.options ? (
              // Multiple choice options
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {currentStepData.options.map((option) => {
                  const isSelected = currentStepData.multiSelect 
                    ? (answers[currentStepData.id] || []).includes(option.value)
                    : answers[currentStepData.id] === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentStepData.id, option.value)}
                      style={{
                        padding: '24px',
                        border: `3px solid ${isSelected ? '#fbbf24' : '#e5e7eb'}`,
                        borderRadius: '16px',
                        background: isSelected ? '#fef3c7' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left',
                        width: '100%',
                        boxShadow: isSelected ? '0 10px 25px rgba(251, 191, 36, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#fbbf24';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {currentStepData.multiSelect && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? '#fbbf24' : '#e5e7eb'}`,
                          background: isSelected ? '#fbbf24' : 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {isSelected && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'white'
                            }}></div>
                          )}
                        </div>
                      )}
                      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{option.icon}</div>
                      <div style={{ fontWeight: '600', color: '#1a202c', marginBottom: '8px', fontSize: '1.1rem' }}>
                        {option.label}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {option.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : currentStepData.type === 'textarea' ? (
              // Textarea input
              <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <textarea
                  value={answers[currentStepData.id] || ''}
                  onChange={(e) => handleAnswer(currentStepData.id, e.target.value)}
                  placeholder={currentStepData.placeholder}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '20px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    fontSize: '1rem',
                    background: '#f9fafb',
                    color: '#1f2937',
                    resize: 'vertical',
                    minHeight: '120px',
                    fontFamily: 'inherit'
                  }}
                />
                {currentStepData.optional && (
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '8px' }}>
                    This is optional - you can skip if you prefer
                  </p>
                )}
              </div>
            ) : (
              // Number input
              <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={answers[currentStepData.id] || ''}
                    onChange={(e) => handleAnswer(currentStepData.id, parseInt(e.target.value) || '')}
                    placeholder={currentStepData.placeholder}
                    min={currentStepData.min}
                    max={currentStepData.max}
                    style={{
                      width: '100%',
                      padding: '24px 20px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '16px',
                      fontSize: '1.5rem',
                      background: '#f9fafb',
                      color: '#1f2937',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}
                  />
                  {currentStepData.unit && (
                    <div style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b',
                      fontSize: '1.2rem',
                      fontWeight: '500'
                    }}>
                      {currentStepData.unit}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{
                padding: '16px 24px',
                border: '2px solid #e5e7eb',
                background: currentStep === 0 ? '#f3f4f6' : 'white',
                color: currentStep === 0 ? '#9ca3af' : '#374151',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: currentStep === 0 ? 0.5 : 1
              }}
            >
              ← Previous
            </button>

            {isLastStep ? (
              <button
                onClick={onSubmit}
                disabled={!canProceed() || loading}
                style={{
                  padding: '16px 32px',
                  background: canProceed() && !loading ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : '#e5e7eb',
                  color: canProceed() && !loading ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: canProceed() && !loading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  boxShadow: canProceed() && !loading ? '0 10px 25px rgba(251, 191, 36, 0.4)' : 'none'
                }}
              >
                {loading ? 'Creating Your Recipe...' : 'Get My Dinner Recipe! 🎉'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                style={{
                  padding: '16px 32px',
                  background: canProceed() ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e5e7eb',
                  color: canProceed() ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: canProceed() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  boxShadow: canProceed() ? '0 10px 25px rgba(102, 126, 234, 0.4)' : 'none'
                }}
              >
                Next →
              </button>
            )}
          </div>
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
            <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>Creating your personalized dinner recipe...</p>
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
            {/* Recipe Image Section */}
            {(generatedImage || imageLoading) && (
              <div style={{
                padding: '30px',
                borderBottom: '1px solid #e5e7eb',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1a202c',
                  marginBottom: '20px'
                }}>
                  🍽️ Your Recipe Visual
                </h3>
                {imageLoading ? (
                  <div style={{
                    padding: '40px',
                    background: '#f9fafb',
                    borderRadius: '16px',
                    border: '2px dashed #d1d5db'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #e2e8f0',
                      borderTop: '4px solid #667eea',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 16px'
                    }}></div>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>
                      Creating your recipe image...
                    </p>
                  </div>
                ) : generatedImage ? (
                  <div style={{
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}>
                    <img
                      src={generatedImage}
                      alt="Generated recipe image"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        border: '3px solid white'
                      }}
                    />
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      marginTop: '12px',
                      fontStyle: 'italic'
                    }}>
                      AI-generated visualization of your recipe
                    </p>
                  </div>
                ) : null}
              </div>
            )}
            
            <MealPlan plan={generatedPlan} summary="Your personalized dinner recipe from Chef AI" />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}