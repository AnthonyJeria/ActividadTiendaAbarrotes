export class UserModel {

    constructor(
        public id_num: number,
        public rut: String,
        public email: string,
        public name: string,
        public last_name: string,
        public password: string,
        public user_type: string,
    ) {
    }

    //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
    static crearUsuario(event: {
        name: string,
        last_name: string,
        email: string
    }){
        return {
            name: event.email,
            last_name: event.last_name,
            email: event.email
        }
    }
}