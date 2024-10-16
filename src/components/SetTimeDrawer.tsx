import { SetTimeForm } from "@/components/set-time/Form.tsx";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { Settings } from "lucide-react";
import { memo, useState } from "react";

export const SetTimeDrawer = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={"flex gap-3 p-2 transition-all"}>
        <Tooltip>
          <TooltipTrigger>
            <Settings />
          </TooltipTrigger>
          <TooltipContent>
            <p>Setup counter</p>
          </TooltipContent>
        </Tooltip>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Setup Timer</SheetTitle>
          <SheetDescription>You can set rounds and period of time</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 pt-5">
          <div>
            <SetTimeForm handleSubmit={() => setIsOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});
