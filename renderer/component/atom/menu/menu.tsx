/* eslint-disable react/jsx-closing-bracket-location */

import {Placement, autoUpdate, flip as flipMiddleware, inline as inlineMiddleware, useFloating, useTransitionStatus} from "@floating-ui/react";
import {Children, Fragment, ReactElement, ReactNode, cloneElement, useMemo, useState} from "react";
import {isElement} from "react-is";
import {create} from "/renderer/component/create";
import {AdditionalProps} from "/renderer/util/data";
import {MenuContextProvider} from "./menu-context";
import {useMenuInteraction} from "./menu-hook";
import {MenuItem} from "./menu-item";
import {MenuPane} from "./menu-pane";


export const Menu = create(
  require("./menu.scss"), "Menu",
  function ({
    trigger,
    triggerType = "click",
    triggerRest = null,
    placement = "bottom-start",
    inline = false,
    children,
    className
  }: {
    trigger?: ReactElement,
    triggerType?: "click" | "focus" | "hover",
    triggerRest?: number | null,
    placement?: Placement,
    inline?: boolean,
    children?: ReactNode,
    className?: string
  } & AdditionalProps): ReactElement {

    const [open, setOpen] = useState(false);

    const {refs, floatingStyles, context} = useFloating({open, onOpenChange: setOpen, placement, whileElementsMounted: autoUpdate, middleware: [flipMiddleware(), inline && inlineMiddleware()]});
    const {isMounted: mounted, status} = useTransitionStatus(context, {duration: 100});
    const {
      listRef,
      activeIndex,
      getReferenceProps,
      getFloatingProps,
      getItemProps
    } = useMenuInteraction(context, triggerType, triggerRest);

    return (
      <Fragment>
        {(trigger !== undefined) && (
          cloneElement(trigger, {ref: refs.setReference, ...getReferenceProps()})
        )}
        <MenuPane
          className={className}
          open={open}
          mounted={mounted}
          status={status}
          context={context}
          style={floatingStyles}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          <MenuContextProvider value={useMemo(
            () => ({setOpen, listRef, activeIndex, getItemProps}),
            [setOpen, listRef, activeIndex, getItemProps]
          )}>
            {transformChildren(children)}
          </MenuContextProvider>
        </MenuPane>
      </Fragment>
    );

  }
);


function transformChildren(children: ReactNode): Array<ReactElement> | null | undefined {
  let index = -1;
  const nextChildren = Children.map(children, (child) => {
    if (isElement(child)) {
      if (child.type === MenuItem) {
        index ++;
        return cloneElement(child, {index});
      } else {
        return child;
      }
    } else {
      return undefined;
    }
  });
  return nextChildren;
};