export {};

declare global {
  // tslint:disable-next-line: interface-name
  interface String {
    /**
     *
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
