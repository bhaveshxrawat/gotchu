import { Popover } from "@base-ui/react/popover";
import { QuestionIcon } from "@phosphor-icons/react";

export default function HelpPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex items-center justify-center rounded-md select-none hover:bg-gray-100 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-popup-open:bg-gray-100">
        <QuestionIcon size={28} aria-label="Help" weight="bold" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} align="end">
          <Popover.Popup className="origin-(--transform-origin) max-w-2xs rounded-lg bg-[canvas] px-6 py-4 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Popover.Title className="text-base font-medium">
              How it goes:
            </Popover.Title>
            <Popover.Description className="text-gray-600 text-sm">
              Clicking on “Unslouch me!” gives you notification as a subtle
              nudge to fix your posture at random durations because sometimes,
              that is all one needs ;)
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
