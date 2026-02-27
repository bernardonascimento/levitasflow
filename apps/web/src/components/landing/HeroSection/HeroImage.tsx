"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

type PointerState = {
  rotateX: number;
  rotateY: number;
  scale: number;
  shineX: number;
  shineY: number;
};

const lerp = (from: number, to: number, factor: number): number => from + (to - from) * factor;

const HeroImage = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const lastMoveAtRef = useRef(0);
  const canTrackRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const floatCurrentRef = useRef(0);
  const targetRef = useRef<PointerState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shineX: 52,
    shineY: 36
  });
  const currentRef = useRef<PointerState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shineX: 52,
    shineY: 36
  });

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const desktopPointerQuery = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapabilities = (): void => {
      canTrackRef.current = desktopPointerQuery.matches && !reduceMotionQuery.matches;
      reduceMotionRef.current = reduceMotionQuery.matches;
    };

    const render = (timestamp: number): void => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const timeSinceMove = timestamp - lastMoveAtRef.current;
      const pointerIsActive = canTrackRef.current && timeSinceMove < 140;

      const targetRotateX = pointerIsActive ? targetRef.current.rotateX : 0;
      const targetRotateY = pointerIsActive ? targetRef.current.rotateY : 0;
      const targetScale = pointerIsActive ? targetRef.current.scale : 1;
      const targetShineX = pointerIsActive ? targetRef.current.shineX : 52;
      const targetShineY = pointerIsActive ? targetRef.current.shineY : 36;

      currentRef.current.rotateX = lerp(currentRef.current.rotateX, targetRotateX, 0.08);
      currentRef.current.rotateY = lerp(currentRef.current.rotateY, targetRotateY, 0.08);
      currentRef.current.scale = lerp(currentRef.current.scale, targetScale, 0.08);
      currentRef.current.shineX = lerp(currentRef.current.shineX, targetShineX, 0.08);
      currentRef.current.shineY = lerp(currentRef.current.shineY, targetShineY, 0.08);

      const elapsed = timestamp - startTimeRef.current;
      const period = 6000;
      const phase = (elapsed % period) / period;
      const wave = Math.cos(phase * Math.PI * 2);
      const idleFloat = reduceMotionRef.current ? -2 + 2 * wave : -5 + 5 * wave;
      const targetFloat = pointerIsActive ? 0 : idleFloat;
      floatCurrentRef.current = lerp(floatCurrentRef.current, targetFloat, 0.08);

      const rotateX = 4 + currentRef.current.rotateX;
      const rotateY = -6 + currentRef.current.rotateY;
      const rotateZ = -2;
      const scale = currentRef.current.scale;
      const shadowX = -currentRef.current.rotateY * 2.2;
      const shadowY = 30 + Math.abs(currentRef.current.rotateX) * 3;
      const shadowBlur = 80 + Math.abs(currentRef.current.rotateY) * 7;

      card.style.transform = `translate3d(0, ${floatCurrentRef.current.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ}deg) scale(${scale.toFixed(4)})`;
      card.style.setProperty("--hero-shadow-x", `${shadowX.toFixed(2)}px`);
      card.style.setProperty("--hero-shadow-y", `${shadowY.toFixed(2)}px`);
      card.style.setProperty("--hero-shadow-blur", `${shadowBlur.toFixed(2)}px`);
      card.style.setProperty("--hero-shine-x", `${currentRef.current.shineX.toFixed(2)}%`);
      card.style.setProperty("--hero-shine-y", `${currentRef.current.shineY.toFixed(2)}%`);

      frameRef.current = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent): void => {
      if (!canTrackRef.current) {
        return;
      }

      const bounds = card.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;
      const normalizedX = Math.max(-1, Math.min(1, px * 2 - 1));
      const normalizedY = Math.max(-1, Math.min(1, py * 2 - 1));

      targetRef.current.rotateY = normalizedX * 2.2;
      targetRef.current.rotateX = -normalizedY * 1.6;
      targetRef.current.scale = Math.min(
        1.02,
        1 + (Math.abs(normalizedX) + Math.abs(normalizedY)) * 0.008
      );
      targetRef.current.shineX = 52 + normalizedX * 18;
      targetRef.current.shineY = 36 + normalizedY * 14;
      lastMoveAtRef.current = performance.now();
    };

    const handlePointerLeave = (): void => {
      targetRef.current.rotateX = 0;
      targetRef.current.rotateY = 0;
      targetRef.current.scale = 1;
      targetRef.current.shineX = 52;
      targetRef.current.shineY = 36;
    };

    updateCapabilities();
    card.style.willChange = "transform";
    frameRef.current = window.requestAnimationFrame(render);

    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);
    desktopPointerQuery.addEventListener("change", updateCapabilities);
    reduceMotionQuery.addEventListener("change", updateCapabilities);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      desktopPointerQuery.removeEventListener("change", updateCapabilities);
      reduceMotionQuery.removeEventListener("change", updateCapabilities);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="hero-media-card relative overflow-hidden rounded-[28px]"
      style={{
        transformStyle: "preserve-3d",
        transform: "translate3d(0,0,0) rotateX(4deg) rotateY(-6deg) rotateZ(-2deg)"
      }}
    >
      <Image
        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=960&q=80"
        alt={translate("landing.hero.images.mainAlt")}
        width={960}
        height={1360}
        priority
        className="h-[29rem] w-full object-cover md:h-[37rem]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/8 to-transparent" />
      <div aria-hidden className="hero-image-shine pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-media-noise pointer-events-none absolute inset-0" />

      <span className="hero-media-chip left-[8%] top-[10%]">
        {translate("landing.hero.preview.schedule")}
      </span>
      <span className="hero-media-chip right-[8%] top-[43%]">
        {translate("landing.hero.preview.repertoire")}
      </span>
      <span className="hero-media-chip bottom-[9%] left-[17%]">
        {translate("landing.hero.preview.sunday")} • {translate("landing.hero.preview.tasks")}
      </span>
    </div>
  );
};

export default HeroImage;
