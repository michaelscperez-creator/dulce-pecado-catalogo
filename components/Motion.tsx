"use client";

import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) {
      reveals.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -5%" });
    reveals.forEach((node) => observer.observe(node));

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      parallax.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        node.style.setProperty("--parallax-y", `${Math.max(-28, Math.min(28, progress * -34))}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const cleanups = magnetic.map((node) => {
      const move = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--magnetic-x", `${(event.clientX - rect.left - rect.width / 2) * 0.12}px`);
        node.style.setProperty("--magnetic-y", `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`);
      };
      const leave = () => {
        node.style.setProperty("--magnetic-x", "0px");
        node.style.setProperty("--magnetic-y", "0px");
      };
      node.addEventListener("mousemove", move);
      node.addEventListener("mouseleave", leave);
      return () => { node.removeEventListener("mousemove", move); node.removeEventListener("mouseleave", leave); };
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  return null;
}
