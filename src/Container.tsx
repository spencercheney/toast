import React, { memo } from "react"
import { getLocationCSS, getAnimationVariables, getCSSClasses, getContainerStyle, getToastStyle } from "./StyleFunctions"
import { Toast } from "./Toast"
import { CssStyle, ToastLocation, ToastValues } from "./Types"
import styles from "./toast.module.css"

/**
 * The container for the toast that will set it's location and styling
 * @param style see {@link CssStyle}
 * @param toasts an array of the toasts that will be displayed
 * @param location see {@link ToastLocation}
 * @param openAnimationDuration how long it takes the toast to open
 * @param closeAnimationDuration how long it takes the toast to close
 * @param numOfToasts the max number of toasts in the container
 * @param close used to close the toast
 */
export function Container(
  {
    style,
    toasts,
    location,
    openAnimationDuration,
    closeAnimationDuration,
    numOfToasts,
    close,
  } : {
    /** see {@link Style} */
    style: CssStyle,
    /** an array of the toasts that will be displayed */
    toasts: ToastValues[],
    /** see {@link ToastLocation} */
    location: ToastLocation,
    /** how long it takes the toast to open */
    openAnimationDuration: number,
    /** how long it takes the toast to close */
    closeAnimationDuration: number,
    /** the max number of toasts in the container */
    numOfToasts: number,
    /** used to close a specified toast */
    close: (toastId: string) => void
  }
) {

  return (
    <div className={ [styles.container, getLocationCSS(location)].join(' ') } style={{ ...getAnimationVariables(openAnimationDuration, closeAnimationDuration), ...getContainerStyle(style) }}>
      {toasts.map(toast =>
        <Toast toast={ toast } location={ location } style={ getToastStyle(style, numOfToasts > 1) } close={ close } key={ toast.id }/>
      )}
    </div>
  )
}