import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

export type ReactFC<P> = FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement> & P>
>
