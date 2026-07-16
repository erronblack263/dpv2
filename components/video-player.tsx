"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Play, WifiOff, Loader2 } from "lucide-react";

interface VideoPlayerProps {
  readonly src: string;
  readonly thumbnail: string;
  readonly title: string;
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

export function VideoPlayer({ src, thumbnail, title }: VideoPlayerProps) {
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

      {/* Buffering spinner */}
      {started && buffering && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
          <Loader2 className="size-10 text-white animate-spin" />
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={started}
        preload="none"
        poster={thumbnail}
        className="w-full"
        style={{ maxHeight: "400px", display: "block" }}
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
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 pointer-events-none">
          <div
            className="absolute inset-y-0 left-0 bg-white/30 transition-all duration-300"
            style={{ width: `${bufferProgress}%` }}
          />
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-100"
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
