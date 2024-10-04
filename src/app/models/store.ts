export class Store {
    storeName: string;
    storeBranches: string[];
    storeLogo: string;
  
    constructor(name: string, branches: string[], logo: string) {
      this.storeName = name;
      this.storeBranches = branches;
      this.storeLogo = logo;
    }
}
