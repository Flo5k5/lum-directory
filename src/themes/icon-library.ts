/**
 * Library for all icons used in library
 * Only icons explicitly imported will be used in application
 *
 * To import an entire library:
 * import brands from '@fortawesome/fontawesome-free-brands'
 * library.add(brands);
 *
 *
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMars,
  faSpinner,
  faVenus,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';

export default {
  init: (): void => library.add(faMars, faSpinner, faVenus, faVenusMars),
};

// <FontAwesomeIcon icon={item.icon as any} fixedWidth={true} />
