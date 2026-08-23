"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  WifiOff,
} from "lucide-react";

interface VideoPlayerProps {
  readonly src: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly maxHeight?: number;
}

const NETWORK_TIMEOUT_MS = 5000;
const TOAST_DURATION_MS = 4000;

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ src, thumbnail, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [mediaError, setMediaError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cssFullscreen, setCssFullscreen] = useState(false);
  const [isPortraitVideo, setIsPortraitVideo] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; dismissed: boolean }>({
    visible: false,
    dismissed: false,
  });

  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const networkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNetworkToast = useCallback(() => {
    toastTimer.current && clearTimeout(toastTimer.current);
    setToast({ visible: true, dismissed: false });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      TOAST_DURATION_MS,
    );
  }, []);

  const armNetworkToast = useCallback(() => {
    networkTimer.current && clearTimeout(networkTimer.current);
    networkTimer.current = setTimeout(showNetworkToast, NETWORK_TIMEOUT_MS);
  }, [showNetworkToast]);

  const clearNetworkToast = useCallback(() => {
    networkTimer.current && clearTimeout(networkTimer.current);
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!started) {
      setStarted(true);
      armNetworkToast();
    }

    if (el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, [started, armNetworkToast]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  }, []);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const el = videoRef.current;
      if (!el || !duration) return;
      const targetTime = (parseFloat(e.target.value) / 100) * duration;
      el.currentTime = targetTime;
      setCurrentTime(targetTime);
    },
    [duration],
  );

  const exitFullscreen = useCallback(async () => {
    setCssFullscreen(false);
    setIsFullscreen(false);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void> | void;
      };
      if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    if (isFullscreen || cssFullscreen || document.fullscreenElement) {
      await exitFullscreen();
      return;
    }

    // Keep the recording inside a controlled overlay so portrait videos retain
    // their phone-like shape instead of expanding into native browser fullscreen.
    setCssFullscreen(true);
    setIsFullscreen(true);
  }, [isFullscreen, cssFullscreen, exitFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const active =
        !!document.fullscreenElement &&
        (document.fullscreenElement === containerRef.current ||
          !!containerRef.current?.contains(document.fullscreenElement));
      if (!cssFullscreen) {
        setIsFullscreen(active);
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullscreenChange,
      );
    };
  }, [cssFullscreen]);

  useEffect(() => {
    if (!cssFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [cssFullscreen]);

  useEffect(() => {
    if (!cssFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exitFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cssFullscreen, exitFullscreen]);

  const revealControls = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime);
    if (el.duration && !isNaN(el.duration)) {
      setDuration(el.duration);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.duration && !isNaN(el.duration)) {
      setDuration(el.duration);
    }
    if (el.videoWidth && el.videoHeight) {
      setIsPortraitVideo(el.videoHeight > el.videoWidth);
    }
  }, []);

  const handleWaiting = useCallback(() => {
    setBuffering(true);
    armNetworkToast();
  }, [armNetworkToast]);

  const handlePlaying = useCallback(() => {
    setBuffering(false);
    setMediaError(false);
    setIsPlaying(true);
    clearNetworkToast();
    setToast({ visible: false, dismissed: false });
  }, [clearNetworkToast]);

  const handleError = useCallback(() => {
    setBuffering(false);
    setMediaError(true);
  }, []);

  const handleProgress = useCallback(() => {
    const el = videoRef.current;
    if (!el?.duration) return;
    if (el.buffered.length > 0) {
      const bufferedEnd = el.buffered.end(el.buffered.length - 1);
      setBufferProgress((bufferedEnd / el.duration) * 100);
      clearNetworkToast();
    }
  }, [clearNetworkToast]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  useEffect(() => {
    return () => {
      networkTimer.current && clearTimeout(networkTimer.current);
      toastTimer.current && clearTimeout(toastTimer.current);
      controlsTimeoutRef.current && clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const expanded = isFullscreen || cssFullscreen;

  const videoFitClass = expanded
    ? isPortraitVideo
      ? "h-[88dvh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-[0_0_0_8px_rgba(24,24,27,0.9),0_25px_80px_rgba(0,0,0,0.75)]"
      : "max-w-[92vw] max-h-[88dvh] w-auto h-auto rounded-2xl object-contain shadow-[0_0_0_8px_rgba(24,24,27,0.9),0_25px_80px_rgba(0,0,0,0.75)]"
    : isPortraitVideo
      ? "w-full h-full object-contain"
      : "w-full h-full object-cover";

  return (
    <div
      ref={containerRef}
      onMouseMove={revealControls}
      onTouchStart={revealControls}
      onMouseLeave={() => isPlaying && !cssFullscreen && setShowControls(false)}
      className={`bg-black overflow-hidden flex items-center justify-center group select-none ${
        cssFullscreen
          ? "fixed inset-0 z-[200] w-screen h-[100dvh] rounded-none bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          : `relative w-full h-full ${expanded ? "rounded-none" : "rounded-xl"}`
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="auto"
        poster={thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onProgress={handleProgress}
        onEnded={handleEnded}
        onError={handleError}
        onClick={togglePlay}
        className={`cursor-pointer bg-black ${videoFitClass}`}
      />

      {mediaError && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-black/75 px-4 text-center">
          <span className="text-xs font-semibold text-white">
            Video playback paused
          </span>
          <button
            type="button"
            onClick={() => {
              setMediaError(false);
              videoRef.current?.load();
              videoRef.current?.play().catch(() => {});
            }}
            className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
          >
            Retry video
          </button>
        </div>
      )}

      {!started && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <img
            src={thumbnail}
            alt={title}
            className={`absolute inset-0 w-full h-full ${
              isPortraitVideo ? "object-contain" : "object-cover"
            }`}
          />
          <div className="absolute inset-0 bg-black/40" />

          <button
            onClick={togglePlay}
            aria-label={`Play ${title}`}
            className="relative z-30 size-16 sm:size-20 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.6)] ring-4 ring-emerald-500/30 transition-all duration-300 hover:scale-110 focus:outline-none"
          >
            <Play className="size-8 sm:size-10 fill-black translate-x-0.5" />
          </button>
        </div>
      )}

      {started && !isPlaying && !buffering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/20">
          <button
            onClick={togglePlay}
            aria-label="Play"
            className="pointer-events-auto size-14 sm:size-16 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] ring-4 ring-emerald-500/30 transition-transform hover:scale-110"
          >
            <Play className="size-7 sm:size-8 fill-black translate-x-0.5" />
          </button>
        </div>
      )}

      {started && buffering && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm gap-2">
          <div className="size-10 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-emerald-400">
            Loading...
          </span>
        </div>
      )}

      {started && (
        <div
          className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-8 flex flex-col gap-2 transition-opacity duration-300 ${
            showControls || !isPlaying
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full h-1.5 flex items-center group/slider cursor-pointer">
            <div className="absolute inset-x-0 h-1 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white/30 rounded-full transition-all duration-300"
                style={{ width: `${bufferProgress}%` }}
              />
            </div>
            <div
              className="absolute left-0 h-1 rounded-full bg-emerald-500 transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercent || 0}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="absolute size-3.5 rounded-full bg-emerald-400 shadow-md transform -translate-x-1/2 pointer-events-none scale-0 group-hover/slider:scale-100 transition-transform"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1 rounded-md text-white hover:text-emerald-400 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="size-4 fill-white" />
                ) : (
                  <Play className="size-4 fill-white" />
                )}
              </button>

              <div className="text-[11px] font-bold text-zinc-300">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-zinc-500">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-1 rounded-md text-white hover:text-emerald-400 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="size-4 text-rose-400" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>

              <button
                className="p-1 rounded-md text-white hover:text-emerald-400 transition-colors"
                aria-label="Settings"
              >
                <Settings className="size-4" />
              </button>

              <button
                onClick={handleFullscreen}
                className="p-1 rounded-md text-white hover:text-emerald-400 transition-colors"
                aria-label={expanded ? "Exit fullscreen" : "Fullscreen"}
              >
                {expanded ? (
                  <Minimize className="size-4" />
                ) : (
                  <Maximize className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.visible && (
        <div className="absolute top-3 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-red-600/90 text-white px-3 py-1.5 text-xs shadow-lg backdrop-blur-sm">
          <WifiOff className="size-3.5" />
          <span>Slow connection detected</span>
        </div>
      )}
    </div>
  );
}
