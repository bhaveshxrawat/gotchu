import { PlayIcon, StopIcon } from "@phosphor-icons/react";
import { Electroview } from "electrobun/view";
import { useCallback, useEffect, useRef, useState } from "react";
import HelpPopover from "@/components/question-mark";
import { cn } from "@/lib/utils";
import type { GotchuRPC } from "@/shared/rpc-types";

const rpc = Electroview.defineRPC<GotchuRPC>({ handlers: {} });
// const electroview = new Electroview({ rpc });

function App() {
  const [timerActive, setTimerActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  function handleClick() {
    setTimerActive((s) => !s);
  }

  const recursiveTimeout = useCallback(function recursiveTimeout() {
    // Random duration between 5 and 15 minutes
    const duration = (Math.floor(Math.random() * 11) + 5) * 60 * 1000;

    timeoutRef.current = window.setTimeout(() => {
      rpc.send.showPostureNotification({});
      recursiveTimeout();
    }, duration);
  }, []);

  useEffect(() => {
    if (timerActive) {
      recursiveTimeout();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timerActive, recursiveTimeout]);

  return (
    <main className="min-h-svh bg-[#F5F7F2] px-4 py-10 flex items-end">
      <div className="max-w-3xl mx-auto group">
        <figure className="max-w-170 grid grid-cols-1">
          <img
            src="/slouched.webp"
            alt=""
            className={cn(
              "col-span-full row-span-full group-has-[#start-btn:hover]:opacity-0 delay-100 transition-opacity",
              timerActive && "opacity-0",
            )}
            draggable="false"
          />
          <img
            src="/unslouched.webp"
            alt=""
            className={cn(
              "col-span-full row-span-full opacity-0 group-has-[#start-btn:hover]:opacity-100 delay-100 transition-opacity -translate-y-1.25",
              timerActive && "opacity-100",
            )}
            draggable="false"
          />
        </figure>
        <div className="flex flex-col items-center mt-10">
          <button
            type="button"
            onClick={handleClick}
            id="start-btn"
            className="bg-black py-4 px-5 gap-2.5 inline-flex text-white items-center font-bold rounded-xl shadow-[0_4px_4px_hsl(0_0_0/25%)] inset-shadow-[0_3px_6px_hsl(0_0_100/25%)]"
          >
            {timerActive ? (
              <>
                <StopIcon size={20} weight="bold" />
                Working...
              </>
            ) : (
              <>
                <PlayIcon size={20} weight="bold" />
                Unslouch me
              </>
            )}
          </button>
        </div>
      </div>
      <HelpPopover />
    </main>
  );
}

export default App;
