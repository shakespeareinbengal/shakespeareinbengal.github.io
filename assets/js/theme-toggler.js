/*!
 * This is a slightly modified version of color mode toggler for Bootstrap's docs (https://getbootstrap.com/).
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  // Return stored "light" or "dark" theme or fallback to "auto"
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }
    return 'auto'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  const showActiveTheme = (theme, focus = false) => {
    const themeIcons = document.querySelectorAll('.theme-icon-active use')
    const btnToActivate = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    if (!btnToActivate) return

    const iconUse = btnToActivate.querySelector('svg use')
    const href = iconUse.getAttribute('href') || iconUse.getAttribute('xlink:href')

    // Remove previous active
    document.querySelectorAll('[data-bs-theme-value]').forEach(el => {
      el.classList.remove('active')
      el.setAttribute('aria-pressed', 'false')
    })

    // Activate current
    btnToActivate.classList.add('active')
    btnToActivate.setAttribute('aria-pressed', 'true')

    // Swap all visible icons
    themeIcons.forEach(icon => icon.setAttribute('href', href))

    const themeSwitcher = document.querySelector('#bd-theme-desktop') || document.querySelector('#bd-theme-mobile')
    const themeSwitcherText = document.querySelector('#bd-theme-text')
    if (themeSwitcher && themeSwitcherText) {
      const label = `${themeSwitcherText.textContent} (${btnToActivate.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', label)
      if (focus) themeSwitcher.focus()
    }
  }

  // React to system dark/light changes only if in auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  // Init
  window.addEventListener('DOMContentLoaded', () => {
    const preferredTheme = getPreferredTheme()
    setTheme(preferredTheme)
    showActiveTheme(preferredTheme)

    // Listen for toggles
    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value')
        setStoredTheme(theme)
        setTheme(theme)
        showActiveTheme(theme, true)
      })
    })
  })
})()
