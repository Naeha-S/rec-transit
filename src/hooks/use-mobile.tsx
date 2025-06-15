
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Set initial value based on window width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    checkMobile()
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      checkMobile()
    }
    
    // Use modern event listener with better support
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      // Fallback for older browsers
      mql.addListener(onChange)
    }
    
    window.addEventListener("resize", onChange)
    window.addEventListener("orientationchange", onChange)
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        // Fallback for older browsers
        mql.removeListener(onChange)
      }
      window.removeEventListener("resize", onChange)
      window.removeEventListener("orientationchange", onChange)
    }
  }, [])

  return isMobile
}
