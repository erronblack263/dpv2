"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Wifi, WifiOff, X } from "lucide-react";

type NetworkState = "online" | "poor" | "offline" | "restored";

type Connection = {
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
};

const HEARTBEAT_INTERVAL_MS = 10000;
const HEARTBEAT_TIMEOUT_MS = 4500;

function getNetworkState(): NetworkState {
  if (!navigator.onLine) return "offline";

  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  const isSlowType =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";
  const isLowBandwidth =
    typeof connection?.downlink === "number" && connection.downlink < 1.5;

  return isSlowType || isLowBandwidth ? "poor" : "online";
}

export function NetworkStatus() {
  const [networkState, setNetworkState] = useState<NetworkState>("online");
  const [dismissed, setDismissed] = useState(false);
  const retryCheckRef = useRef<(() => void | Promise<void>) | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    let heartbeatInFlight = false;

    const setReachability = (reachable: boolean) => {
      setDismissed(false);
      setNetworkState((currentState) => {
        if (
          reachable &&
          (currentState === "offline" || currentState === "poor")
        ) {
          return "restored";
        }
        if (!reachable) return "offline";
        return getNetworkState();
      });
    };

    const checkReachability = async () => {
      if (heartbeatInFlight) return;
      heartbeatInFlight = true;

      const controller = new AbortController();
      const timeout = window.setTimeout(
        () => controller.abort(),
        HEARTBEAT_TIMEOUT_MS,
      );

      try {
        await fetch("https://www.gstatic.com/generate_204", {
          method: "GET",
          mode: "no-cors",
          cache: "no-store",
          signal: controller.signal,
        });
        setReachability(true);
      } catch {
        setReachability(false);
      } finally {
        window.clearTimeout(timeout);
        heartbeatInFlight = false;
      }
    };
    retryCheckRef.current = checkReachability;

    const updateNetworkState = () => {
      setDismissed(false);
      if (!navigator.onLine) {
        setNetworkState("offline");
        return;
      }
      setNetworkState(getNetworkState());
    };
    const handleOnline = () => {
      setDismissed(false);
      setNetworkState("restored");
    };
    const handleOffline = () => {
      setDismissed(false);
      setNetworkState("offline");
    };
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    connection?.addEventListener?.("change", updateNetworkState);
    updateNetworkState();
    checkReachability();
    const reachabilityTimer = window.setInterval(
      checkReachability,
      HEARTBEAT_INTERVAL_MS,
    );

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      connection?.removeEventListener?.("change", updateNetworkState);
      window.clearInterval(reachabilityTimer);
      retryCheckRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (networkState !== "restored") return;
    const timeout = window.setTimeout(() => setNetworkState("online"), 3500);
    return () => window.clearTimeout(timeout);
  }, [networkState]);

  if (process.env.NODE_ENV !== "production") return null;

  if (networkState === "offline") {
    return (
      <div className="fixed inset-0 z-[200] flex min-h-dvh items-center justify-center overflow-hidden bg-background px-6 text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(244,63,94,0.06)_50%,transparent_100%)]" />
        <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-3xl border border-rose-500/30 bg-rose-500/10 text-rose-500 shadow-[0_0_45px_rgba(244,63,94,0.16)]">
            <WifiOff className="size-9" />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Connection interrupted
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            You&apos;re offline
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Your internet connection is unavailable. Sage is waiting for the
            connection to return, and some features may be temporarily paused.
          </p>
          <div className="mt-7 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm">
            <LoaderCircle className="size-3.5 animate-spin text-rose-500" />
            Reconnecting automatically...
          </div>
          <button
            type="button"
            onClick={() => retryCheckRef.current?.()}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background transition-opacity hover:opacity-80"
          >
            <Wifi className="size-3.5" />
            Try again
          </button>
        </main>
      </div>
    );
  }

  if (dismissed || networkState === "online") return null;

  const isRestored = networkState === "restored";
  let icon = <LoaderCircle className="size-4 animate-spin" />;
  let message = "Poor network connection. Some features may be unavailable.";
  let colorClass =
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300";

  if (isRestored) {
    icon = <Wifi className="size-4" />;
    message = "Connection restored.";
    colorClass =
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[150] flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto inline-flex max-w-xl items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2 ${colorClass}`}
      >
        {icon}
        <span>{message}</span>
        {!isRestored && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="ml-1 rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Dismiss network status"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
