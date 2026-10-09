export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "tunes-theme";
const CHANGE_EVENT = "tunes-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Runs synchronously in <head> before first paint so the stored theme is applied
 * without a flash. Must stay dependency-free and mirror `applyTheme`.
 */
export const themeInitScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}");if(p!=="light"&&p!=="dark")p="system";var d=p==="dark"||(p==="system"&&matchMedia("${DARK_QUERY}").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})()`;

function isPreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isPreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const resolved = resolveTheme(preference);
  root.classList.add("theme-switching");
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
  // Force a reflow so the transition suppression applies before it is removed.
  void root.offsetWidth;
  root.classList.remove("theme-switching");
}

export function setPreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage may be unavailable (private mode); the choice then lasts for this page view.
  }
  applyTheme(preference);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    if (readPreference() === "system") applyTheme("system");
    onChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyTheme(readPreference());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystemChange);
  };
}
