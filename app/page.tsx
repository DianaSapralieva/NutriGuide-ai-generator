'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Favicon Icon */}
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
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Craft meal plans you'll love
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '3rem',
            opacity: '0.9',
            lineHeight: '1.6',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Create personalized meal plans tailored to your unique dietary restrictions in just minutes
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <span style={{
                display: 'block',
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>400+</span>
              <span style={{
                fontSize: '0.9rem',
                opacity: '0.8',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Protein-rich recipes</span>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <span style={{
                display: 'block',
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>10x</span>
              <span style={{
                fontSize: '0.9rem',
                opacity: '0.8',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Faster planning</span>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <span style={{
                display: 'block',
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>100%</span>
              <span style={{
                fontSize: '0.9rem',
                opacity: '0.8',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Personalized</span>
            </div>
          </div>
          <Link href="/meal-planner">
            <button 
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '18px 40px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 20px 40px rgba(251, 191, 36, 0.4)',
                marginTop: '2rem',
                transition: 'all 0.3s ease'
              }}
            >
              Let's Start →
            </button>
          </Link>
        </div>
        {/* Floating Food Elements */}
        {/* Realistic Strawberry */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '5%',
          animation: 'float 7s ease-in-out infinite',
          zIndex: 0
        }}>
          <div style={{
            width: '20px',
            height: '18px',
            background: 'radial-gradient(circle at 30% 30%, #ff6b9d 0%, #e91e63 40%, #c2185b 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: '0 4px 8px rgba(233, 30, 99, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
            position: 'relative',
            transform: 'rotate(-15deg)'
          }}>
            {/* Strawberry seeds */}
            <div style={{
              position: 'absolute',
              top: '2px',
              left: '3px',
              width: '2px',
              height: '2px',
              background: '#ffeb3b',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(255, 235, 59, 0.8)'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '1.5px',
              height: '1.5px',
              background: '#ffeb3b',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(255, 235, 59, 0.8)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '3px',
              left: '6px',
              width: '1.8px',
              height: '1.8px',
              background: '#ffeb3b',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(255, 235, 59, 0.8)'
            }}></div>
            {/* Strawberry stem */}
            <div style={{
              position: 'absolute',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '6px',
              background: 'linear-gradient(45deg, #4caf50 0%, #66bb6a 100%)',
              borderRadius: '2px',
              boxShadow: '0 1px 2px rgba(76, 175, 80, 0.6)'
            }}></div>
            {/* Strawberry leaves */}
            <div style={{
              position: 'absolute',
              top: '-2px',
              left: '40%',
              width: '3px',
              height: '4px',
              background: 'linear-gradient(45deg, #4caf50 0%, #66bb6a 100%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transform: 'rotate(-25deg)'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '-1px',
              right: '35%',
              width: '2.5px',
              height: '3px',
              background: 'linear-gradient(45deg, #4caf50 0%, #66bb6a 100%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transform: 'rotate(20deg)'
            }}></div>
          </div>
        </div>
        
        {/* Realistic Blueberry */}
        <div style={{
          position: 'absolute',
          top: '90px',
          right: '8%',
          animation: 'float 6.8s ease-in-out infinite reverse',
          zIndex: 0
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            background: 'radial-gradient(circle at 30% 30%, #9c27b0 0%, #673ab7 50%, #3f51b5 100%)',
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(156, 39, 176, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
            position: 'relative'
          }}>
            {/* Blueberry bloom (white powdery coating) */}
            <div style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              width: '4px',
              height: '4px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '3px',
              right: '2px',
              width: '3px',
              height: '3px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            {/* Blueberry stem scar */}
            <div style={{
              position: 'absolute',
              top: '1px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '2px',
              background: '#2d3436',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
        
        {/* Realistic Spinach Leaf */}
        <div style={{
          position: 'absolute',
          top: '120px',
          left: '15%',
          animation: 'float 8.2s ease-in-out infinite',
          zIndex: 0
        }}>
          <div style={{
            width: '24px',
            height: '16px',
            background: 'linear-gradient(45deg, #00c853 0%, #00e676 30%, #00b894 70%, #00a085 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: 'rotate(-15deg)',
            boxShadow: '0 3px 6px rgba(0, 184, 148, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            position: 'relative'
          }}>
            {/* Spinach vein */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '1px',
              background: 'linear-gradient(90deg, #00a085 0%, #00c853 50%, #00a085 100%)',
              borderRadius: '1px'
            }}></div>
            {/* Secondary veins */}
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              width: '6px',
              height: '0.5px',
              background: '#00a085',
              borderRadius: '1px',
              transform: 'rotate(-20deg)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '30%',
              right: '20%',
              width: '5px',
              height: '0.5px',
              background: '#00a085',
              borderRadius: '1px',
              transform: 'rotate(20deg)'
            }}></div>
            {/* Spinach stem */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '4px',
              background: 'linear-gradient(180deg, #00a085 0%, #00897b 100%)',
              borderRadius: '1px'
            }}></div>
          </div>
        </div>
        
        {/* Realistic Sliced Cucumber */}
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '25%',
          animation: 'float 7.5s ease-in-out infinite reverse',
          zIndex: 0
        }}>
          <div style={{
            width: '22px',
            height: '10px',
            background: 'linear-gradient(45deg, #66bb6a 0%, #81c784 30%, #a5d6a7 70%, #c8e6c9 100%)',
            borderRadius: '50%',
            boxShadow: '0 3px 6px rgba(102, 187, 106, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
            position: 'relative'
          }}>
            {/* Cucumber seeds */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '20%',
              transform: 'translate(-50%, -50%)',
              width: '3px',
              height: '1.5px',
              background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(76, 175, 80, 0.6)'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '20%',
              transform: 'translate(-50%, -50%)',
              width: '2.5px',
              height: '1.2px',
              background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(76, 175, 80, 0.6)'
            }}></div>
            {/* Cucumber center line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '0.8px',
              background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 50%, #4caf50 100%)',
              borderRadius: '1px'
            }}></div>
            {/* Cucumber skin texture */}
            <div style={{
              position: 'absolute',
              top: '1px',
              left: '2px',
              width: '18px',
              height: '1px',
              background: 'linear-gradient(90deg, #388e3c 0%, transparent 50%, #388e3c 100%)',
              borderRadius: '1px',
              opacity: 0.6
            }}></div>
          </div>
        </div>
        
        {/* Realistic Raspberry */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '8%',
          animation: 'float 6.5s ease-in-out infinite',
          zIndex: 0
        }}>
          <div style={{
            width: '18px',
            height: '16px',
            background: 'radial-gradient(circle at 30% 30%, #e91e63 0%, #c2185b 60%, #ad1457 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: '0 4px 8px rgba(233, 30, 99, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
            position: 'relative',
            transform: 'rotate(10deg)'
          }}>
            {/* Raspberry drupelets (individual segments) */}
            <div style={{
              position: 'absolute',
              top: '1px',
              left: '2px',
              width: '3px',
              height: '3px',
              background: 'radial-gradient(circle, #e91e63 0%, #c2185b 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '3px',
              right: '2px',
              width: '2.5px',
              height: '2.5px',
              background: 'radial-gradient(circle, #e91e63 0%, #c2185b 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '2px',
              left: '4px',
              width: '2.8px',
              height: '2.8px',
              background: 'radial-gradient(circle, #e91e63 0%, #c2185b 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}></div>
            {/* Raspberry center */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4px',
              height: '4px',
              background: 'radial-gradient(circle, #c2185b 0%, #ad1457 100%)',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
        
        {/* Realistic Blackberry */}
        <div style={{
          position: 'absolute',
          bottom: '150px',
          right: '15%',
          animation: 'float 8.7s ease-in-out infinite reverse',
          zIndex: 0
        }}>
          <div style={{
            width: '16px',
            height: '14px',
            background: 'radial-gradient(circle at 30% 30%, #424242 0%, #212121 70%, #000000 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
            position: 'relative',
            transform: 'rotate(-5deg)'
          }}>
            {/* Blackberry drupelets */}
            <div style={{
              position: 'absolute',
              top: '1px',
              left: '1px',
              width: '2.5px',
              height: '2.5px',
              background: 'radial-gradient(circle, #424242 0%, #212121 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '2px',
              right: '1px',
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, #424242 0%, #212121 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '1px',
              left: '3px',
              width: '2.2px',
              height: '2.2px',
              background: 'radial-gradient(circle, #424242 0%, #212121 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}></div>
            {/* Blackberry center */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '3px',
              height: '3px',
              background: 'radial-gradient(circle, #212121 0%, #000000 100%)',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
        
        {/* Realistic Kale Leaf */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '35%',
          animation: 'float 7.8s ease-in-out infinite reverse',
          zIndex: 0
        }}>
          <div style={{
            width: '20px',
            height: '14px',
            background: 'linear-gradient(45deg, #2e7d32 0%, #388e3c 30%, #4caf50 70%, #66bb6a 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: 'rotate(25deg)',
            boxShadow: '0 3px 6px rgba(46, 125, 50, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            position: 'relative'
          }}>
            {/* Kale main vein */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '1px',
              background: 'linear-gradient(90deg, #1b5e20 0%, #2e7d32 50%, #1b5e20 100%)',
              borderRadius: '1px'
            }}></div>
            {/* Kale ruffled edges */}
            <div style={{
              position: 'absolute',
              top: '1px',
              left: '1px',
              width: '18px',
              height: '1px',
              background: 'linear-gradient(90deg, #1b5e20 0%, transparent 50%, #1b5e20 100%)',
              borderRadius: '1px',
              opacity: 0.7
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '1px',
              left: '1px',
              width: '18px',
              height: '1px',
              background: 'linear-gradient(90deg, #1b5e20 0%, transparent 50%, #1b5e20 100%)',
              borderRadius: '1px',
              opacity: 0.7
            }}></div>
            {/* Kale stem */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '4px',
              background: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 100%)',
              borderRadius: '1px'
            }}></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '3rem'
          }}>Why choose our meal planner?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem' }}>Lightning Fast</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem' }}>
                Generate complete meal plans in under 2 minutes
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem' }}>Precise Nutrition</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem' }}>
                Exact calorie and protein targets for your goals
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem' }}>All Diets Welcome</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem' }}>
                Vegan, keto, paleo, gluten-free, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}