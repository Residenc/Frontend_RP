export class Customer {
    constructor(
        public credential_id: number,
        public cust_id: number,
        public names: string,
        public paternal: string,
        public maternal: string,
        public email: string,
        public passwd: string,
        public gender: string,
        public defaultaddress_id: string,
        public phone: string,
        public role: string,
        public registration_date: string,
    ){}
}