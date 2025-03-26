//

import {FloatingContext, FloatingFocusManager, FloatingPortal} from "@floating-ui/react";
import {ForwardedRef, ReactElement, ReactNode, useCallback, useState} from "react";
import {createWithRef} from "/renderer/component/create";
import {AdditionalProps, data} from "/renderer/util/data";


export const MenuPane = createWithRef(
  require("./menu-pane.scss"), "MenuPane",
  function ({
    open,
    mounted,
    status,
    context,
    combobox = false,
    usePortal = true,
    onFocusSet,
    children,
    ...rest
  }: {
    open: boolean,
    mounted: boolean,
    status: "unmounted" | "initial" | "open" | "close",
    context: FloatingContext,
    combobox?: boolean,
    usePortal?: boolean,
    onFocusSet?: (focus: boolean) => unknown,
    children?: ReactNode,
    className?: string,
    ref: ForwardedRef<HTMLDivElement>
  } & AdditionalProps): ReactElement | null {

    const initialFocus = (combobox) ? -1 : undefined;

    const [prevOpen, setPrevOpen] = useState(open);
    if (open !== prevOpen) {
      if (!open) {
        onFocusSet?.(false);
      }
      setPrevOpen(open);
    }

    const handleFocus = useCallback(function (): void {
      onFocusSet?.(true);
    }, [onFocusSet]);

    const handleBlur = useCallback(function (): void {
      onFocusSet?.(false);
    }, [onFocusSet]);

    return (mounted) ? (usePortal) ? (
      <FloatingPortal>
        <FloatingFocusManager context={context} visuallyHiddenDismiss={true} initialFocus={initialFocus}>
          <div styleName="root" onFocus={handleFocus} onBlur={handleBlur} {...data({status})} {...rest}>
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    ) : (
      <FloatingFocusManager context={context} visuallyHiddenDismiss={true} initialFocus={initialFocus}>
        <div styleName="root" onFocus={handleFocus} onBlur={handleBlur} {...data({status})} {...rest}>
          {children}
        </div>
      </FloatingFocusManager>
    ) : null;

  }
);