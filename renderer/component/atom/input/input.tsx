/* eslint-disable quote-props, @typescript-eslint/naming-convention */

import {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  ReactElement,
  useCallback
} from "react";
import {createWithRef} from "/renderer/component/create";


export const Input = createWithRef(
  require("./input.scss"), "Input",
  function ({
    value,
    defaultValue,
    name,
    onSet,
    onChange,
    onBlur,
    className,
    ref
  }: {
    value?: string,
    defaultValue?: string,
    name?: string,
    onSet?: (value: string) => unknown,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown,
    onBlur?: (event: FocusEvent<HTMLInputElement>) => unknown,
    className?: string,
    ref: ForwardedRef<HTMLInputElement>
  }): ReactElement {

    const handleChange = useCallback(function (event: ChangeEvent<HTMLInputElement>): void {
      const value = event.target.value;
      onSet?.(value);
      onChange?.(event);
    }, [onSet, onChange]);

    return (
      <div styleName="root" className={className}>
        <input
          styleName="input"
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          name={name}
          onChange={handleChange}
          onBlur={onBlur}
        />
      </div>
    );

  }
);