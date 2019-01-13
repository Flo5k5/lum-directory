/** Specifies a literal type to be used in props for theming purpose. */
export type FONT_SIZE = 'veryLarge' | 'large' | 'medium' | 'small';

/** Specifies a mapped object type for theming purpose. */
export type FontSizeType = { [f in FONT_SIZE]: string };
