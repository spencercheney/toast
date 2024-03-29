import { Props } from "./ToastTypes"
import styles from "./toast.module.css"
import { useIsClosed, useLocation } from "./toastHooks"
import { useEffect } from "react"

export default function Toast({ values, dispatch } : Props) {
  //all in seconds
  const timeToastIsOpenFor = 20
  const closeAnimationDuration = 0.3
  const openAnimationDuration = 0.1

  const isClosed = useIsClosed(values.initiateClose, values.initiateOpen, closeAnimationDuration, openAnimationDuration, dispatch)
  const location = useLocation(values.location, isClosed, dispatch)

  //close the toast the specified amount of time after opening it
  useEffect(() => {
    if(values.initiateOpen)  {{
      setTimeout(() => {
        dispatch({ type: "close"  })
      }, timeToastIsOpenFor * 1000)
    }}
  }, [values.initiateOpen])

  return (
    <div className={ [styles.wrapper, location].join(' ') }>
      {isClosed ? <></> :
      <div className={ values.initiateClose ? [styles.toast, styles.close].join(' ') : styles.toast }>
        <div className={ styles.text }>
          { values.content }
        </div>
        <div>
          <button onClick={() => dispatch({type: "close"}) } className={ styles.closeBtn }>x</button>
        </div>
      </div>}
    </div>
  )
}