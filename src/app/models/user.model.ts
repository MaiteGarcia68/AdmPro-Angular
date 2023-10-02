import { environment } from "src/environments/enviroment";

const base_url = environment.base_url;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public uid?: string,
  )  {}

  get imgUrl() {
    // {{url}}/api/upload/users/863812a1-8697-4c57-91a8-61ed509578a.JPG

    if ( this.img?.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${base_url}/upload/users/${this.img}`
    } else {
      return `${base_url}/upload/users/no-image`
    }
  }
}
