//

import {ForwardRefExoticComponent, ForwardedRef, FunctionComponent, PropsWithoutRef, Ref, RefAttributes, forwardRef} from "react";
import cssModules from "react-css-modules";


export function create<C extends FunctionComponent<any>>(css: any, component: C): C;
export function create<C extends FunctionComponent<any>>(css: any, name: string, component: C): C;
export function create<C extends FunctionComponent<any>>(...args: [any, C] | [any, string, C]): C {
  let [css, component, name] = (args.length === 2) ? [args[0], args[1]] : [args[0], args[2], args[1]];
  if (css !== null && css !== undefined) {
    component = cssModules(css.default, {allowMultiple: true, handleNotFoundStyleName: "ignore"})(component);
  }
  component.displayName = name ?? "<unknown>";
  return component;
}

export function createWithRef<T, P>(css: any, component: FunctionComponentWithForwardedRef<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
export function createWithRef<T, P>(css: any, name: string, component: FunctionComponentWithForwardedRef<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
export function createWithRef<T, P>(...args: [any, FunctionComponentWithForwardedRef<T, P>] | [any, string, FunctionComponentWithForwardedRef<T, P>]): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  let [css, component, name] = (args.length === 2) ? [args[0], args[1]] : [args[0], args[2], args[1]];
  if (css !== null && css !== undefined) {
    component = cssModules(component, css.default, {allowMultiple: true, handleNotFoundStyleName: "ignore"});
  }
  const forwardedComponent = forwardRef<T, P>((props, ref) => component({...props, ref} as any));
  forwardedComponent.displayName = name ?? "<unknown>";
  return forwardedComponent;
}

type FunctionComponentWithForwardedRef<T, P> = FunctionComponent<P & {ref: ForwardedRef<T>}>;
type FunctionComponentWithRef<T, P> = FunctionComponent<P & {ref: Ref<T>}>;