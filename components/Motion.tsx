"use client";

import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.querySelector<HTMLElement>(".progress");

    // Se usa un data-attribute (no una clase): React no lo toca al volver a renderizar className.
    const show = (n: Element) => { (n as HTMLElement).dataset.visible = "true"; };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    const registered = new WeakSet<Element>();
    const observe = (node: Element) => {
      if (registered.has(node) || node.getAttribute("data-visible") === "true") return;
      registered.add(node);
      if (reduce) show(node);
      else io.observe(node);
    };
    document.querySelectorAll("[data-reveal]").forEach(observe);
    // También registra contenido que React reemplace después del primer montaje.
    const additions = new MutationObserver((changes) => {
      changes.forEach((change) => change.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches("[data-reveal]")) observe(node);
        node.querySelectorAll("[data-reveal]").forEach(observe);
      }));
    });
    additions.observe(document.body, { childList: true, subtree: true });

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar && max > 0) bar.style.transform = `scaleX(${Math.min(1, window.scrollY / max)})`;
      if (reduce) return;
      parallax.forEach((n) => {
        const r = n.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        n.style.setProperty("--py", `${Math.max(-40, Math.min(40, p * -48)).toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      additions.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="progress" aria-hidden="true" />;
}
