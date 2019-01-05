export {};

declare global {
  interface String {
    capitalizeFirstLetter(): string;
  }
}

String.prototype.capitalizeFirstLetter = function(this: string) {
  if (!this) {
    return this;
  }

  const firstLetter: string = this[0] || this.charAt(0);
  return firstLetter ? firstLetter.toLocaleUpperCase() + this.substr(1) : '';
};
