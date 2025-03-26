/* eslint-disable react/jsx-closing-bracket-location */

import {ReactElement, ReactNode, useMemo} from "react";
import {MenuContextProvider} from "/renderer/component/atom/menu/menu-context";
import {MenuPane} from "/renderer/component/atom/menu/menu-pane";
import {create} from "/renderer/component/create";
import {AsyncSelectFloatingSpec, AsyncSelectInteractionSpec} from "./async-select-hook";


export const AsyncSelectMenuPane = create(
  null, "AsyncSelectMenuPane",
  function ({
    floatingSpec,
    interactionSpec,
    onFocusSet,
    children
  }: {
    floatingSpec: AsyncSelectFloatingSpec,
    interactionSpec: AsyncSelectInteractionSpec,
    onFocusSet: (focus: boolean) => unknown,
    children: ReactNode
  }): ReactElement {

    const {
      refs,
      floatingStyles,
      context,
      mounted,
      status,
      open,
      setOpen
    } = floatingSpec;
    const {
      listRef,
      activeIndex,
      getFloatingProps,
      getItemProps
    } = interactionSpec;

    return (
      <MenuPane
        open={open}
        mounted={mounted}
        status={status}
        context={context}
        combobox={true}
        style={floatingStyles}
        onFocusSet={onFocusSet}
        ref={refs.setFloating}
        {...getFloatingProps()}
      >
        <MenuContextProvider value={useMemo(() => ({setOpen, listRef, activeIndex, getItemProps}), [setOpen, listRef, activeIndex, getItemProps])}>
          {children}
        </MenuContextProvider>
      </MenuPane>
    );

  }
);
