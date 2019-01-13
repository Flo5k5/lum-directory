/**
 * Interface used to describe login informations found in user informations from randomuser.me API.
 *
 * @export
 * @interface ILogin
 */
export interface ILogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}
