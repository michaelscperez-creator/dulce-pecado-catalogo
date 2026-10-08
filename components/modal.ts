/**
 * Utilidades para diálogos modales accesibles.
 * - inertOutside: deja todo lo que está fuera del modal inerte (sin foco ni lectura).
 * - restoreFocus: devuelve el foco al elemento que abrió el modal.
 */
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "LINK", "NEXT-ROUTE-ANNOUNCER"]);

export function inertOutside(modal: HTMLElement, keep: Array<HTMLElement | null | undefined> = []): () => void {
  const keepers = [modal, ...keep.filter((el): el is HTMLElement => Boolean(el))];
  // Todo elemento que sea el modal, algo a conservar o un ancestro de ellos queda "en el camino".
  const path = new Set<Element>();
  keepers.forEach((el) => {
    for (let n: Element | null = el; n; n = n.parentElement) path.add(n);
  });

  const changed: Array<{ el: HTMLElement; was: boolean }> = [];
  path.forEach((parent) => {
    // El contenido del propio modal (o de lo que se conserva) no se toca.
    if (keepers.includes(parent as HTMLElement)) return;
    Array.from(parent.children).forEach((child) => {
      if (!(child instanceof HTMLElement) || path.has(child) || SKIP_TAGS.has(child.tagName)) return;
      // Regiones en vivo (toast, anunciador de rutas) deben seguir anunciando.
      if (child.matches("[aria-live], [role='status'], [role='alert']")) return;
      changed.push({ el: child, was: child.inert });
      child.inert = true;
    });
  });
  // Atrapa el Tab: del último elemento enfocable vuelve al primero (y al revés con Shift+Tab).
  const onTab = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const items = keepers
      .flatMap((k) => Array.from(k.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])")))
      .filter((el) => el.tabIndex >= 0 && !el.hasAttribute("disabled") && !el.closest("[inert]") && el.getClientRects().length > 0);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !keepers.some((k) => k.contains(active)))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (active === last || !keepers.some((k) => k.contains(active)))) { e.preventDefault(); first.focus(); }
  };
  document.addEventListener("keydown", onTab);
  return () => { document.removeEventListener("keydown", onTab); changed.forEach(({ el, was }) => { el.inert = was; }); };
}

export function restoreFocus(trigger: HTMLElement | null) {
  window.requestAnimationFrame(() => {
    const usable = trigger && document.contains(trigger) && !trigger.closest("[inert]") && trigger.getClientRects().length > 0;
    if (usable) {
      trigger.focus();
      return;
    }
    // El disparador ya no existe o está oculto (p. ej. el botón del menú): lleva el foco al contenido.
    const main = document.querySelector<HTMLElement>("main");
    if (main) {
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  });
}
