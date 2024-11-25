module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Consistent color palette across light and dark themes
          primary: {
            light: '#6b21a8',   // Purple
            dark: '#BB86FC',
          },
          secondary: {
            light: '#22d3ee',   // Cyan
            dark: '#03DAC6',
          },
          accent: {
            light: '#f43f5e',   // Rose
            dark: '#FF4081',
          },
          background: {
            light: '#FFFFFF',
            dark: '#121212',
          },
          surface: {
            light: '#F4F4F4',
            dark: '#1E1E1E',
          },
          text: {
            primary: {
              light: '#333333',
              dark: '#FFFFFF',
            },
            secondary: {
              light: '#666666',
              dark: '#B0B0B0',
            },
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            // Unified styling for both themes
            color: '#333333',
            'h1, h2, h3, h4': {
              color: '#1a202c',
              fontWeight: '700',
            },
            a: {
              color: '#6b21a8',
              textDecoration: 'underline',
              '&:hover': {
                color: '#4a148c',
              },
            },
            strong: {
              color: '#000000',
              fontWeight: '700',
            },
            code: {
              backgroundColor: '#f4f4f4',
              color: '#d53f8c',
              fontWeight: '500',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.5rem',
            },
            blockquote: {
              borderLeftColor: '#6b21a8',
              color: '#666666',
              fontStyle: 'italic',
            },
          },
        },
        dark: {
          css: {
            color: '#FFFFFF',
            'h1, h2, h3, h4': {
              color: '#FFFFFF',
              fontWeight: '700',
            },
            a: {
              color: '#BB86FC',
              '&:hover': {
                color: '#9456F3',
              },
            },
            strong: {
              color: '#FFFFFF',
              fontWeight: '700',
            },
            code: {
              backgroundColor: '#2C2C2C',
              color: '#03DAC6',
              fontWeight: '500',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.5rem',
            },
            blockquote: {
              borderLeftColor: '#BB86FC',
              color: '#B0B0B0',
              fontStyle: 'italic',
            },
          },
        },
      },
      boxShadow: {
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        dark: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      },
      transitionProperty: {
        'colors-all': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow',
      },
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
      boxShadow: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    function({ addBase, theme }) {
      addBase({
        'body': {
          transition: 'background-color 0.3s, color 0.3s',
        },
        '.dark': {
          backgroundColor: theme('colors.brand.background.dark'),
          color: theme('colors.brand.text.primary.dark'),
        },
        // Improved scrollbar styles
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.1)',
        },
        '::-webkit-scrollbar-thumb': {
          background: theme('colors.brand.primary.light'),
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: theme('colors.brand.primary.dark'),
        }
      })
    }
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#6b21a8',
          secondary: '#22d3ee',
          accent: '#f43f5e',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
        },
        dark: {
          primary: '#BB86FC',
          secondary: '#03DAC6',
          accent: '#FF4081',
          neutral: '#F5F5F5',
          'base-100': '#121212',
        },
      },
    ],
    darkTheme: 'dark',
  },
}