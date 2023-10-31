import { Type } from "@angular/core"

export interface AlumnoModel {

    id_alumno: number
    rut: number
    dv: string
    nombre: string
    appaterno: string
    apmaterno: string
    id_carrera: number
    correo_alumno: string
    clave_alumno: string
}

export interface ProfesorModel {

    id_profesor: number
    rut: number
    dv: string
    nombre: string
    appaterno: string
    apmaterno: string
    correo_electronico: string
    clave_profe: string
}