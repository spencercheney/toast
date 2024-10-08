import { toastReducer } from "./reducer";
import { Content, LocationInterface, CssStyle } from "./Types";
import { updateStatus, useLocation, useOpenFunction } from "./Hooks";
import { DEFAULT_TOAST_CONTAINER } from "./DefaultValues";
import { useContainer } from "./useContainer";
import { useReducer, JSX } from "react";

export default function useToast(): [
  ({
    style,
    timeToastIsOpenFor,
    openAnimationDuration,
    closeAnimationDuration,
    numOfToasts
  } : {
    style?: Partial<CssStyle>,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number,
    numOfToasts?: number
  }) => JSX.Element,
  (content: Content) => void,
  Readonly<LocationInterface>
] {

  const [values, dispatch] = useReducer(toastReducer, DEFAULT_TOAST_CONTAINER)

  updateStatus(values.toasts, dispatch, values.timeToastIsOpenFor, values.openAnimationDuration, values.closeAnimationDuration)

  const open = useOpenFunction(dispatch)
  const Location = useLocation(dispatch)

  return [ useContainer(values, dispatch), open, Location ]
}