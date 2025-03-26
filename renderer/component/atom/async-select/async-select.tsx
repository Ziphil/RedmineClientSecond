/* eslint-disable quote-props, @typescript-eslint/naming-convention */

import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition
} from "react";
import {AsyncOrSync} from "ts-essentials";
import {LoadingIcon} from "/renderer/component/atom/loading-icon";
import {create} from "/renderer/component/create";
import {useDebouncedCallback} from "/renderer/hook/debounce";
import {aria, data} from "/renderer/util/data";
import {AsyncSelectContextProvider} from "./async-select-context";
import {useAsyncSelectFloating, useAsyncSelectInteraction} from "./async-select-hook";
import {AsyncSelectMenuPane} from "./async-select-menu-pane";


export const AsyncSelect = create(
  require("./async-select.scss"), "AsyncSelect",
  function <G, V extends G = G>({
    value,
    defaultValue,
    loadOptions,
    loadDuration = 300,
    onSet,
    renderLabel,
    children,
    className,
    ...rest
  }: {
    value?: G | null,
    defaultValue?: G | null,
    loadOptions: (pattern: string) => AsyncOrSync<Array<V>>,
    loadDuration?: number,
    onSet?: (value: V) => unknown,
    renderLabel: (value: G) => ReactNode,
    children: (value: V) => ReactElement,
    className?: string
  }): ReactElement {

    const [innerValue, setInnerValue] = useState(defaultValue);
    const actualValue = (value !== undefined) ? value : innerValue;
    const controlled = value !== undefined;

    const [options, setOptions] = useState<Array<V>>([]);
    const [loading, setLoading] = useState(false);
    const [, startTransition] = useTransition();

    const inputElementRef = useRef<HTMLInputElement>(null);
    const afterUpdateValueRef = useRef<boolean>(false);

    const floatingSpec = useAsyncSelectFloating();
    const interactionSpec = useAsyncSelectInteraction(floatingSpec.context);
    const {open, setOpen, refs} = floatingSpec;
    const {activeIndex, setActiveIndex, getReferenceProps} = interactionSpec;

    const updateValue = useCallback(function (nextValue: V): void {
      if (!controlled) {
        setInnerValue(nextValue);
      }
      afterUpdateValueRef.current = true;
      if (inputElementRef.current !== null) {
        inputElementRef.current.value = "";
      }
      onSet?.(nextValue);
    }, [controlled, onSet]);

    const updateOptions = useDebouncedCallback(async function (value: string): Promise<void> {
      const options = await loadOptions(value);
      startTransition(() => {
        setLoading(false);
        setOptions(options);
      });
    }, loadDuration, [loadOptions]);

    const handleChange = useCallback(async function (event: ChangeEvent<HTMLInputElement>): Promise<void> {
      const value = event.target.value;
      setOpen(true);
      setLoading(true);
      updateOptions(value);
    }, [updateOptions, setOpen]);

    const handleKeyDown = useCallback(function (event: KeyboardEvent<HTMLInputElement>): void {
      if (event.key === "Enter" && activeIndex !== null && options[activeIndex]) {
        updateValue(options[activeIndex]);
        setOpen(false);
        setActiveIndex(null);
      }
    }, [options, activeIndex, updateValue, setOpen, setActiveIndex]);

    const handleMenuFocusSet = useCallback(function (menuFocus: boolean): void {
      if (!menuFocus) {
        if (inputElementRef.current !== null) {
          inputElementRef.current.value = "";
        }
      }
    }, []);

    const handleFocus = useCallback(function (event: FocusEvent<HTMLInputElement>): void {
      if (!afterUpdateValueRef.current) {
        setOpen(true);
      }
      afterUpdateValueRef.current = false;
    }, [setOpen]);

    const handleBlur = useCallback(function (event: FocusEvent<HTMLInputElement>): void {
    }, []);

    return (
      <div styleName="root" className={className} ref={refs.setReference}>
        <div styleName="container">
          <input
            styleName="input"
            {...rest}
            {...getReferenceProps({
              ref: inputElementRef,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onFocus: handleFocus,
              onBlur: handleBlur
            })}
          />
          {(actualValue !== undefined && actualValue !== null) && (
            <div styleName="label" {...data({hidden: open})} {...aria({hidden: open})}>
              {renderLabel(actualValue)}
            </div>
          )}
        </div>
        <AsyncSelectMenuPane floatingSpec={floatingSpec} interactionSpec={interactionSpec} onFocusSet={handleMenuFocusSet}>
          <AsyncSelectContextProvider value={useMemo(() => ({updateValue}), [updateValue])}>
            {(loading) ? (
              <div styleName="loading">
                <LoadingIcon/>
              </div>
            ) : (
              options.map((value, index) => cloneElement(children(value), {index, value}))
            )}
          </AsyncSelectContextProvider>
        </AsyncSelectMenuPane>
      </div>
    );

  }
);