// theme.js
import { extendTheme } from "@chakra-ui/react";

// Define your custom button styles
const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: {
          bg: "#0082FF",            // Default background for solid buttons
          color: "white",            // Default text color
          _hover: {
            bg: "#104490",          // Background on hover
          },
          _active: {
            bg: "#104490",          // Background on click
          }
        },
      },
    },
  },
});

export default theme;
