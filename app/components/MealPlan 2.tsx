'use client';

import React from 'react';

type Props = {
  plan: string;
  summary?: string;
};

type RecipeData = {
  name: string;
  ingredients: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  prepTime: string;
  instructions: string;
};

function parseRecipe(plan: string): RecipeData {
  // Extract recipe name (everything before the first —)
  const nameMatch = plan.match(/^([^—]+)/);
  const name = nameMatch ? nameMatch[1].trim() : 'Recipe';

  // Extract ingredients (between — and nutrition info)
  const ingredientsMatch = plan.match(/—\s*([^~]+?)(?=\s*~)/);
  const ingredients = ingredientsMatch ? ingredientsMatch[1].trim() : '';

  // Extract nutrition info
  const caloriesMatch = plan.match(/~(\d+)kcal/);
  const proteinMatch = plan.match(/~(\d+)g\s*protein/);
  const carbsMatch = plan.match(/~(\d+)g\s*carbs/);
  const fatMatch = plan.match(/~(\d+)g\s*fat/);

  // Extract prep time
  const prepTimeMatch = plan.match(/prep\s*time\s*(\d+\s*minutes?)/i);
  const prepTime = prepTimeMatch ? prepTimeMatch[1] : '';

  // Extract recipe instructions (after | Recipe:)
  const instructionsMatch = plan.match(/\|\s*Recipe:?\s*(.+)/s);
  const instructions = instructionsMatch ? instructionsMatch[1].trim() : '';

  return {
    name,
    ingredients,
    nutrition: {
      calories: caloriesMatch ? caloriesMatch[1] : '',
      protein: proteinMatch ? proteinMatch[1] : '',
      carbs: carbsMatch ? carbsMatch[1] : '',
      fat: fatMatch ? fatMatch[1] : ''
    },
    prepTime,
    instructions
  };
}

const MealPlan: React.FC<Props> = ({ plan, summary }) => {
  const recipe = parseRecipe(plan);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      padding: '0',
      marginBottom: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden'
    }}>
      {/* Recipe Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 32px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '12px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          {recipe.name}
        </div>
        <div style={{
          fontSize: '1.1rem',
          opacity: '0.9',
          fontWeight: '500'
        }}>
          🍽️ Chef's Special Recipe
        </div>
        {summary && (
          <div style={{
            fontSize: '1rem',
            opacity: '0.8',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            {summary}
          </div>
        )}
      </div>

      {/* Recipe Content */}
      <div style={{ padding: '32px' }}>
        {/* Nutrition Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
      <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '2px solid #fbbf24'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔥</div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#92400e',
              marginBottom: '4px'
            }}>
              {recipe.nutrition.calories}
            </div>
                <div style={{
              fontSize: '0.9rem',
              color: '#78350f',
              fontWeight: '600'
            }}>
              Calories
            </div>
                </div>
                
                <div style={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '2px solid #3b82f6'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💪</div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#1e40af',
              marginBottom: '4px'
            }}>
              {recipe.nutrition.protein}g
            </div>
                    <div style={{
              fontSize: '0.9rem',
              color: '#1e3a8a',
              fontWeight: '600'
            }}>
              Protein
                    </div>
                  </div>
                  
          <div style={{
            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '2px solid #10b981'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌾</div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#047857',
              marginBottom: '4px'
            }}>
              {recipe.nutrition.carbs}g
                </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#065f46',
              fontWeight: '600'
            }}>
              Carbs
              </div>
          </div>
        
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '2px solid #ef4444'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🥑</div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#dc2626',
              marginBottom: '4px'
            }}>
              {recipe.nutrition.fat}g
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#b91c1c',
              fontWeight: '600'
            }}>
              Fat
            </div>
          </div>
        </div>

        {/* Prep Time */}
        {recipe.prepTime && (
          <div style={{
            background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
            padding: '16px 24px',
            borderRadius: '12px',
              textAlign: 'center',
            marginBottom: '32px',
            border: '2px solid #8b5cf6'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#6b21a8'
            }}>
              <span>⏰</span>
              <span>Prep Time: {recipe.prepTime}</span>
            </div>
          </div>
        )}

        {/* Ingredients Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            color: '#374151',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            whiteSpace: 'pre-wrap'
          }}>
            {recipe.ingredients || 'Ingredients not specified'}
          </div>
        </div>

        {/* Instructions Section */}
        {recipe.instructions && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
              }}>
                👨‍🍳
              </div>
              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: '700',
                color: '#dc2626',
                margin: '0'
              }}>
                Cooking Instructions
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #fecaca',
              color: '#7f1d1d',
              lineHeight: '1.8',
              fontSize: '1.1rem',
              whiteSpace: 'pre-wrap'
            }}>
              {recipe.instructions}
            </div>
          </div>
        )}

        {/* Chef's Tips */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #fbbf24'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'white',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}>
              💡
            </div>
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#92400e',
              margin: '0'
            }}>
              Chef's Tips
            </h4>
          </div>
          <div style={{
            color: '#78350f',
            lineHeight: '1.7',
            fontSize: '1rem'
          }}>
            • Prep all ingredients before starting for smooth cooking<br/>
            • Taste and adjust seasoning as you go<br/>
            • Don't rush the cooking process - good food takes time<br/>
            • Store leftovers in airtight containers for up to 3 days
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '24px 32px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <button style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 32px',
          fontSize: '1.1rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease'
        }} onClick={() => window.print()}>
          💾 Save Recipe
        </button>
        
        <button style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 32px',
          fontSize: '1.1rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(251, 191, 36, 0.3)',
          transition: 'all 0.3s ease'
        }} onClick={() => window.print()}>
          🖨️ Print Recipe
        </button>
      </div>
    </div>
  );
};

export default MealPlan; 
