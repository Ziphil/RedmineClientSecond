
//

import {useMergeRefs} from "@floating-ui/react";
import {ComponentProps, ForwardedRef, MouseEvent, ReactElement, ReactNode, useCallback, useContext} from "react";
import {createWithRef} from "/renderer/component/create";
import {AdditionalProps, aria} from "/renderer/util/data";
import {menuContext} from "./menu-context";


export const MenuItem = createWithRef(
  require("./menu-item.scss"), "MenuItem",
  function ({
    onClick,
    children,
    ref,
    ...restAndInternal
  }: {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown,
    children?: ReactNode,
    className?: string,
    ref: ForwardedRef<HTMLButtonElement>
  } & AdditionalProps): ReactElement {

    const {index, ...rest} = restAndInternal as MenuItemPropsWithInternal;

    const {setOpen, listRef, activeIndex, getItemProps} = useContext(menuContext);
    const mergedRef = useMergeRefs<HTMLButtonElement>([ref, (element) => listRef.current[index] = element]);

    const handleClick = useCallback(function (event: MouseEvent<HTMLButtonElement>): void {
      setOpen(false);
      onClick?.(event);
    }, [setOpen, onClick]);

    return (
      <button
        styleName="root"
        type="button"
        role="option"
        ref={mergedRef}
        {...getItemProps({
          tabIndex: activeIndex === index ? 0 : -1,
          onClick: handleClick
        })}
        {...aria({selected: activeIndex === index})}
        {...rest}
      >
        {children}
      </button>
    );

  }
);


type MenuItemPropsWithInternal = Omit<ComponentProps<typeof MenuItem>, "scheme" | "onClick" | "children" | "ref"> & {index: number};