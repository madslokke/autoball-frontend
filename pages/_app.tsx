import '../styles/globals.css'
import type {AppProps} from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import {config} from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import {createTheme, NextUIProvider, Text} from "@nextui-org/react"

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#ffffff',

      // ...  more colors
    },
    space: {},
    fonts: {
      sans: "Arial, sans-serif"
    }
  }
})

function MyApp({Component, pageProps}: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
