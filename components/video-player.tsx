"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
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

export function VideoPlayer({
  src,
  thumbnail,
  title,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [toast, setToast] = useState<{ visible: boolean; dismissed: boolean }>({
    visible: false,
    dismissed: false,
  });

  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const networkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Network Toast ──────────────────────────────────────────────── */
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

  /* ── Video Action Handlers ─────────────────────────────────────── */
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

  const handleFullscreen = useCallback(() => {
    const container = containerRef.current || videoRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (container.requestFullscreen) {
      container.requestFullscreen().catch(() => {});
    }
  }, []);

  /* ── Mouse Movement & Controls Visibility ──────────────────────── */
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  }, [isPlaying]);

  /* ── Video Event Handlers ───────────────────────────────────────── */
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
  }, []);

  const handleWaiting = useCallback(() => {
    setBuffering(true);
    armNetworkToast();
  }, [armNetworkToast]);

  const handlePlaying = useCallback(() => {
    setBuffering(false);
    setIsPlaying(true);
    clearNetworkToast();
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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center group select-none"
    >
      {/* ─── Video Tag ─── */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        poster={thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onProgress={handleProgress}
        onEnded={handleEnded}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* ─── Thumbnail & Initial Play Overlay ─── */}
      {!started && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Big Circular Green Play Button */}
          <button
            onClick={togglePlay}
            aria-label={`Play ${title}`}
            className="relative z-30 size-16 sm:size-20 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.6)] ring-4 ring-emerald-500/30 transition-all duration-300 hover:scale-110 focus:outline-none"
          >
            <Play className="size-8 sm:size-10 fill-black translate-x-0.5" />
          </button>
        </div>
      )}

      {/* ─── Paused / Hover Play Button ─── */}
      {started && !isPlaying && !buffering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/20">
          <button
            onClick={togglePlay}
            aria-label="Play"
            className="pointer-events-auto size-16 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] ring-4 ring-emerald-500/30 transition-transform hover:scale-110"
          >
            <Play className="size-8 fill-black translate-x-0.5" />
          </button>
        </div>
      )}

      {/* ─── Buffering Spinner ─── */}
      {started && buffering && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm gap-2">
          <div className="size-10 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-emerald-400">Loading...</span>
        </div>
      )}

      {/* ─── Custom Bottom Controls Overlay ─── */}
      {started && (
        <div
          className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-8 flex flex-col gap-2 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Seek Progress Bar */}
          <div className="relative w-full h-1.5 flex items-center group/slider cursor-pointer">
            {/* Buffer Background Track */}
            <div className="absolute inset-x-0 h-1 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white/30 rounded-full transition-all duration-300"
                style={{ width: `${bufferProgress}%` }}
              />
            </div>

            {/* Played Progress Track (Emerald Green) */}
            <div
              className="absolute left-0 h-1 rounded-full bg-emerald-500 transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Seek Range Input Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercent || 0}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Handle Thumb */}
            <div
              className="absolute size-3.5 rounded-full bg-emerald-400 shadow-md transform -translate-x-1/2 pointer-events-none scale-0 group-hover/slider:scale-100 transition-transform"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Buttons & Time Row */}
          <div className="flex items-center justify-between text-white text-xs font-mono">
            {/* Left Controls */}
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

              {/* Time display */}
              <div className="text-[11px] font-bold text-zinc-300">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-zinc-500">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls */}
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
                aria-label="Fullscreen"
              >
                <Maximize className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Network Toast */}
      {toast.visible && (
        <div className="absolute top-3 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-red-600/90 text-white px-3 py-1.5 text-xs shadow-lg backdrop-blur-sm">
          <WifiOff className="size-3.5" />
          <span>Slow connection detected</span>
        </div>
      )}
    </div>
  );
}
