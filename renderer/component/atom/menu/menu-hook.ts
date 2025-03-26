//

import {
  FloatingContext,
  safePolygon,
  useClick,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useListNavigation,
  useRole
} from "@floating-ui/react";
import {
  MutableRefObject,
  useRef,
  useState
} from "react";


type MenuInteractionSpec = ReturnType<typeof useInteractions> & {
  listRef: MutableRefObject<Array<HTMLElement>>,
  activeIndex: number | null
};

export function useMenuInteraction(context: FloatingContext, triggerType: "click" | "focus" | "hover", triggerRest: number | null): MenuInteractionSpec {
  const listRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const click = useClick(context, {enabled: triggerType === "click"});
  const focus = useFocus(context, {enabled: triggerType === "focus"});
  const hover = useHover(context, {enabled: triggerType === "hover", restMs: triggerRest ?? 0, handleClose: safePolygon()});
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {listRef, activeIndex, onNavigate: setActiveIndex});
  const role = useRole(context, {role: "menu"});
  const {getReferenceProps, getFloatingProps, getItemProps} = useInteractions([click, focus, hover, dismiss, listNavigation, role]);
  return {
    listRef,
    activeIndex,
    getReferenceProps,
    getFloatingProps,
    getItemProps
  };
}