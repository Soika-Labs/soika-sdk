'use client'

import { useEffect } from 'react'

export default function ClientHydrationFix() {
  useEffect(() => {
    // Clean up browser extension attributes that cause hydration mismatches
    const removeExtensionAttributes = () => {
      const elementsWithBIS = document.querySelectorAll('[bis_skin_checked]')
      elementsWithBIS.forEach((element) => {
        element.removeAttribute('bis_skin_checked')
      })

      const elementsWithProcessed = document.querySelectorAll('[__processed_f10b2264-0a83-480a-8171-e6b3d2746618__]')
      elementsWithProcessed.forEach((element) => {
        element.removeAttribute('__processed_f10b2264-0a83-480a-8171-e6b3d2746618__')
      })

      const elementsWithRegister = document.querySelectorAll('[bis_register]')
      elementsWithRegister.forEach((element) => {
        element.removeAttribute('bis_register')
      })
    }

    // Run immediately and also set up a mutation observer
    removeExtensionAttributes()

    // Set up mutation observer to clean up attributes added by extensions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element
          if (target.hasAttribute('bis_skin_checked')) {
            target.removeAttribute('bis_skin_checked')
          }
          if (target.hasAttribute('bis_register')) {
            target.removeAttribute('bis_register')
          }
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['bis_skin_checked', 'bis_register'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
