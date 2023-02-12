import clsx from 'clsx'
import React, { FC, useMemo } from 'react'

interface IconProps {
  value: string
  className?: string
  style?: React.CSSProperties | undefined
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const Icon: FC<IconProps> = (props) => {
  const { style, onClick } = props

  const value = useMemo(() => {
    if (props.value.startsWith('icon')) {
      return props.value
    } else {
      return 'icon-' + props.value
    }
  }, [props.value])

  return (
    <span
      className={clsx(value, props.className)}
      style={{ ...style, display: 'inline-flex', fontSize: 'inherit' }}
      onClick={onClick}
    ></span>
  )
}

