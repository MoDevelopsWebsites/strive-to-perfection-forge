import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'purple': 'var(--shadow-purple)',
				'elevated': 'var(--shadow-elevated)'
			},
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
				'gaming': ['Inter', 'sans-serif'],
				'display': ['Inter', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-left': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'floatSlow': {
					'0%, 100%': {
						transform: 'translateY(0px) scale(1)'
					},
					'50%': {
						transform: 'translateY(-20px) scale(1.02)'
					}
				},
				'morphShape1': {
					'0%, 100%': {
						d: 'M0,400 C300,200 600,600 1200,300 L1200,0 L0,0 Z'
					},
					'50%': {
						d: 'M0,300 C400,100 700,500 1200,250 L1200,0 L0,0 Z'
					}
				},
				'morphShape2': {
					'0%, 100%': {
						d: 'M0,600 C400,300 800,700 1200,400 L1200,800 L0,800 Z'
					},
					'50%': {
						d: 'M0,500 C500,200 900,600 1200,350 L1200,800 L0,800 Z'
					}
				},
				'floatBubble1': {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)',
						opacity: '0.03'
					},
					'50%': {
						transform: 'translate(30px, -20px) scale(1.1)',
						opacity: '0.05'
					}
				},
				'floatBubble2': {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)',
						opacity: '0.04'
					},
					'50%': {
						transform: 'translate(-25px, 15px) scale(0.9)',
						opacity: '0.06'
					}
				},
				'gradientShift': {
					'0%, 100%': {
						background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), transparent, hsl(var(--secondary) / 0.05))'
					},
					'50%': {
						background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.03), transparent, hsl(var(--accent) / 0.07))'
					}
				},
				'textureFloat': {
					'0%': {
						transform: 'translate(0, 0)'
					},
					'100%': {
						transform: 'translate(32px, 32px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'floatSlow': 'floatSlow 20s ease-in-out infinite',
				'morphShape1': 'morphShape1 15s ease-in-out infinite',
				'morphShape2': 'morphShape2 18s ease-in-out infinite reverse',
				'floatBubble1': 'floatBubble1 12s ease-in-out infinite',
				'floatBubble2': 'floatBubble2 16s ease-in-out infinite reverse',
				'gradientShift': 'gradientShift 25s ease-in-out infinite',
				'textureFloat': 'textureFloat 30s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
