export {};

declare global {
  // tslint:disable-next-line: interface-name
  interface String {
    /**
     * Extend String's prototype, capitalize first letter of the current string.
     *
     * @returns {string}
     * @memberof String
     */
    capitalizeFirstLetter(): string;
  }
}

// tslint:disable-next-line: typedef
String.prototype.capitalizeFirstLetter = function(this: string) {
  if (!this) {
    return this;
  }

  const firstLetter: string = this[0] || this.charAt(0);
  return firstLetter ? firstLetter.toLocaleUpperCase() + this.substr(1) : '';
};
