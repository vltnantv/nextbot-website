import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'nb-navy': '#0A1628',
  			'nb-navy-mid': '#1A2E4A',
  			'nb-navy-light': '#2A4A6B',
  			'nb-gold': '#C9A84C',
  			'nb-gold-hover': '#B8923E',
  			'nb-gold-dark': '#7A5C1A',
  			'nb-cream': '#FAFAF8',
  			'nb-warm': '#F0EDE8',
  			'nb-warm-dark': '#E8E4DC',
  			'nb-text': '#0A1628',
  			'nb-text-secondary': '#3D4F63',
  			'nb-text-muted': '#7A8A9A',
  			'nb-border': '#DDD9D0',
  			'nb-border-light': '#ECEAE3',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			text: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'Courier New',
  				'monospace'
  			]
  		},
  		spacing: {
  			'96': '24rem',
  			'128': '32rem',
  			'160': '40rem',
  			'192': '48rem',
  			'256': '64rem',
  			'safe-top': 'env(safe-area-inset-top)',
  			'safe-bottom': 'env(safe-area-inset-bottom)',
  			'safe-left': 'env(safe-area-inset-left)',
  			'safe-right': 'env(safe-area-inset-right)'
  		},
  		borderRadius: {
  			xl: '1rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			glass: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  			apple: '0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(40px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-40px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideInRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(40px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			gradientShift: {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0) translateX(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px) translateX(10px)'
  				}
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(0deg) translateX(80px) rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg) translateX(80px) rotate(-360deg)'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%',
  					backgroundSize: '200% 200%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%',
  					backgroundSize: '200% 200%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
  			'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
  			'slide-in-right': 'slideInRight 0.6s ease-out forwards',
  			'scale-in': 'scaleIn 0.5s ease-out forwards',
  			shimmer: 'shimmer 2s linear infinite',
  			'gradient-shift': 'gradientShift 15s ease infinite',
  			'gradient-x': 'gradient-x 3s ease infinite',
  			float: 'float 6s ease-in-out infinite',
  			'float-delayed': 'float 6s ease-in-out 2s infinite',
  			'float-slow': 'float 8s ease-in-out 1s infinite',
  			orbit: 'orbit 20s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".text-gradient": {
          background: "linear-gradient(135deg, #0A1628 0%, #C9A84C 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-neo-gradient": {
          background: "linear-gradient(135deg, #0A1628 0%, #C9A84C 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".bg-neo-gradient": {
          background: "linear-gradient(135deg, #0A1628 0%, #1A2E4A 100%)",
        },
        ".neo-glow": {
          "box-shadow": "0 0 40px rgba(201, 168, 76, 0.2)",
        },
        // Mobile-specific touch action utilities
        ".touch-pan-x": {
          "touch-action": "pan-x",
        },
        ".touch-pan-y": {
          "touch-action": "pan-y",
        },
        ".touch-none": {
          "touch-action": "none",
        },
        ".touch-manipulation": {
          "touch-action": "manipulation",
        },
      });
    }),
      require("tailwindcss-animate")
],
};

export default config;
