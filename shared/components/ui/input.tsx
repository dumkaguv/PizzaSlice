import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { CircleX, Search } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  onIconClearClick?: (
    event: React.MouseEvent<SVGSVGElement> | React.KeyboardEvent<SVGSVGElement>,
  ) => void;
  isShowIconSearch?: boolean;
  isShowIconClear?: boolean;
  isShowIcons?: boolean;
}

const Input: React.FC<InputProps> = ({
  className,
  type = "text",
  value,
  isShowIconSearch = false,
  isShowIconClear = false,
  isShowIcons = false,
  onIconClearClick,
  ...props
}) => {
  return (
    <div className="relative z-0 h-full w-full">
      <input
        type={type}
        value={value}
        data-slot="input"
        className={cn(
          "hover:border-primary border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
      {type === "text" && (
        <>
          {(isShowIconSearch || isShowIcons) && (
            <Search
              size={20}
              className="pointer-events-none absolute top-[50%] left-3 z-1 translate-y-[-50%] text-gray-400"
            />
          )}
          {(isShowIconClear || isShowIcons) && value && (
            <CircleX
              size={20}
              onClick={onIconClearClick}
              onKeyDown={onIconClearClick}
              tabIndex={0}
              className="absolute top-[50%] right-3 z-1 translate-y-[-50%] cursor-pointer text-gray-400"
            />
          )}
        </>
      )}
    </div>
  );
};

export { Input };
