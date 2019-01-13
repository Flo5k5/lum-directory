/** Specifies a literal type to be used in props for theming purpose. */
export type COLOR = 'primary' | 'secondary' | 'danger';

/** Specifies a mapped object type for theming purpose. */
export type ColorType = { [c in COLOR]: string };
