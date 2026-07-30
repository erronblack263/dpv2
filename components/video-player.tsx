"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Play, WifiOff, Maximize } from "lucide-react";

interface VideoPlayerProps {
  readonly src: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly maxHeight?: number;
}

const NETWORK_TIMEOUT_MS = 5000;
const TOAST_DURATION_MS = 4000;

/** Schedules an auto-dismiss for the toast. Extracted to reduce nesting depth. */
function scheduleAutoDismiss(
  timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>,
  setToast: React.Dispatch<
    React.SetStateAction<{ visible: boolean; dismissed: boolean }>
  >,
  durationMs: number,
) {
  timerRef.current = setTimeout(
    () => setToast((t) => ({ ...t, visible: false })),
    durationMs,
  );
}

export function VideoPlayer({ src, thumbnail, title, maxHeight = 300 }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [playProgress, setPlayProgress] = useState(0);
  const [toast, setToast] = useState<{ visible: boolean; dismissed: boolean }>({
    visible: false,
    dismissed: false,
  });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const networkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNetworkToast = useCallback(() => {
    toastTimer.current && clearTimeout(toastTimer.current);
    setToast({ visible: true, dismissed: false });
    scheduleAutoDismiss(toastTimer, setToast, TOAST_DURATION_MS);
  }, []);

  /** Arm a delayed toast — fires if no buffering data arrives in time. */
  const armNetworkToast = useCallback(() => {
    networkTimer.current && clearTimeout(networkTimer.current);
    networkTimer.current = setTimeout(showNetworkToast, NETWORK_TIMEOUT_MS);
  }, [showNetworkToast]);

  const clearNetworkToast = useCallback(() => {
    networkTimer.current && clearTimeout(networkTimer.current);
  }, []);

  const handlePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    armNetworkToast();
    el.play().catch(() => {});
  }, [armNetworkToast]);

  const handleWaiting = useCallback(() => {
    setBuffering(true);
    armNetworkToast();
  }, [armNetworkToast]);

  const handlePlaying = useCallback(() => {
    setBuffering(false);
    clearNetworkToast();
    toastTimer.current && clearTimeout(toastTimer.current);
    setToast({ visible: false, dismissed: false });
  }, [clearNetworkToast]);

  const handleProgress = useCallback(() => {
    const el = videoRef.current;
    if (!el?.duration) return;
    if (el.buffered.length > 0) {
      const bufferedEnd = el.buffered.end(el.buffered.length - 1);
      setBufferProgress((bufferedEnd / el.duration) * 100);
      clearNetworkToast();
    }
  }, [clearNetworkToast]);

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el?.duration) return;
    setPlayProgress((el.currentTime / el.duration) * 100);
  }, []);

  const handleError = useCallback(() => {
    setBuffering(false);
    clearNetworkToast();
    toastTimer.current && clearTimeout(toastTimer.current);
    setToast({ visible: true, dismissed: false });
    scheduleAutoDismiss(toastTimer, setToast, TOAST_DURATION_MS);
  }, [clearNetworkToast]);

  const dismissToast = useCallback(() => {
    toastTimer.current && clearTimeout(toastTimer.current);
    setToast({ visible: false, dismissed: true });
  }, []);

  const handleFullscreen = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as HTMLVideoElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
      (el as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    }
  }, []);

  useEffect(() => {
    return () => {
      networkTimer.current && clearTimeout(networkTimer.current);
      toastTimer.current && clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <div className="relative bg-black rounded-t-2xl overflow-hidden">
      {/* Thumbnail overlay — shown before play is triggered */}
      {!started && (
        <div className="absolute inset-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
          />
          {/* Dark scrim */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Play button */}
          <button
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            className="absolute inset-0 flex items-center justify-center group focus:outline-none"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/50 transition-transform group-hover:scale-110 group-focus-visible:ring-white">
              <Play className="size-6 text-white fill-white translate-x-0.5" />
            </span>
          </button>
        </div>
      )}

      {/* Fullscreen button — visible when playing */}
      {started && (
        <button
          onClick={handleFullscreen}
          aria-label="Fullscreen"
          className="absolute top-2 right-2 z-20 flex size-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          <Maximize className="size-4" />
        </button>
      )}

      {/* Persistent circular play-progress indicator — bottom-left corner */}
      {started && (
        <div className="absolute bottom-8 left-3 z-20 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
              <defs>
                <linearGradient id="ringGradientSmall" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {/* Background track */}
              <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              {/* Play progress arc */}
              <circle
                cx="22" cy="22" r="17"
                fill="none"
                stroke={playProgress >= 99 ? "#22c55e" : "url(#ringGradientSmall)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 17}`}
                strokeDashoffset={`${2 * Math.PI * 17 * (1 - Math.min(playProgress, 100) / 100)}`}
                className="transition-all duration-100"
              />
            </svg>
            <span className="absolute text-[9px] font-bold tabular-nums" style={{ color: playProgress >= 99 ? "#22c55e" : "white" }}>
              {playProgress >= 99 ? "✓" : `${Math.round(playProgress)}%`}
            </span>
          </div>
        </div>
      )}

      {started && buffering && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-[2px]">
          {/* Circular progress ring */}
          <div className="relative flex items-center justify-center">
            <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {/* Background track */}
              <circle
                cx="36" cy="36" r="30"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
              />
              {/* Progress arc */}
              <circle
                cx="36" cy="36" r="30"
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 30}`}
                strokeDashoffset={`${2 * Math.PI * 30 * (1 - bufferProgress / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            {/* Centre percentage */}
            <span className="absolute text-sm font-bold text-white tabular-nums">
              {Math.round(bufferProgress)}%
            </span>
          </div>

          {/* Linear track */}
          <div className="relative w-40 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-500"
              style={{ width: `${bufferProgress}%` }}
            />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <span className="text-[10px] font-medium text-white/50 tracking-wide uppercase">Loading video</span>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={started}
        preload="metadata"
        poster={thumbnail}
        className="w-full"
        style={{ maxHeight: `${maxHeight}px`, display: "block" }}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>

      {/* Progress bar: buffer track + playhead */}
      {started && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20 pointer-events-none">
          {/* Buffer track */}
          <div
            className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-500 rounded-full"
            style={{ width: `${bufferProgress}%` }}
          />
          {/* Playhead */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-100 rounded-full"
            style={{ width: `${playProgress}%` }}
          />
        </div>
      )}

      {/* Network error toast */}
      {toast.visible && (
        <div
          role="alert"
          aria-live="assertive"
          className="absolute top-3 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2.5 rounded-xl bg-destructive px-4 py-2.5 text-xs font-medium text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <WifiOff className="size-3.5 shrink-0" />
          <span>Slow or no network — video may not load</span>
          <button
            onClick={dismissToast}
            aria-label="Dismiss"
            className="ml-1 opacity-70 hover:opacity-100 focus:outline-none"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
