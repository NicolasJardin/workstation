import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

export function Fade(props: CSSTransitionProps) {
  return (
    <CSSTransition
      {...props}
      classNames={{
        appear: 'opacity-0',
        appearActive: 'transition-opacity duration-300 opacity-100',
        enter: 'opacity-0',
        enterActive: 'transition-opacity duration-300 opacity-100',
        exitActive: 'transition-opacity duration-200 opacity-0'
      }}
    />
  )
}
