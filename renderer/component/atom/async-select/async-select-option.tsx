//

import {ComponentProps, ForwardedRef, MouseEvent, ReactElement, ReactNode, useCallback, useContext} from "react";
import {MenuItem} from "/renderer/component/atom/menu";
import {createWithRef} from "/renderer/component/create";
import {AdditionalProps} from "/renderer/util/data";
import {asyncSelectContext} from "./async-select-context";


export const AsyncSelectOption = createWithRef(
  null, "AsyncSelectOption",
  function ({
    children,
    ...restAndInternal
  }: {
    children?: ReactNode,
    className?: string,
    ref: ForwardedRef<HTMLButtonElement>
  } & AdditionalProps): ReactElement {

    const {value, ...rest} = restAndInternal as AsyncSelectOptionPropsWithInternal;

    const {updateValue} = useContext(asyncSelectContext);

    const handleClick = useCallback(function (event: MouseEvent<HTMLButtonElement>): void {
      updateValue(value);
    }, [value, updateValue]);

    return (
      <MenuItem onClick={handleClick} {...rest}>
        {children}
      </MenuItem>
    );

  }
);


type AsyncSelectOptionPropsWithInternal = Omit<ComponentProps<typeof AsyncSelectOption>, "scheme" | "children"> & {value: any};