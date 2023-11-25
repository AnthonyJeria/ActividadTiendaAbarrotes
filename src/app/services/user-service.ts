import { Injectable } from "@angular/core";
import { AlumnoModel, ProfesorModel } from "../models/UsersModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from "rxjs";



@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASEALUMNO = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Alumno'

    URL_SUPABASEPROFE = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Profesor'

  static this: any;


    constructor(private _httpclient: HttpClient) {

    }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmRhcWF3bXVpdW1ua2V3cGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjgzNjIsImV4cCI6MjAxMTM0NDM2Mn0.NhD9PBIZTowZ3aGJAeBY6hCR4cBDpcKT2A-2M2r659Y')
   
    getLoginUser(correo_alumno: string, password: string): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASEALUMNO+'?correo_alumno=eq.'+correo_alumno+'&clave_alumno=eq.'+password+'&select=*',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getClaveAlumno(correo_alumno: string): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASEALUMNO+'?correo_alumno=eq.'+correo_alumno+'&select=clave_alumno',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getLoginProfe(correo_profesor: string, password: string): Observable<ProfesorModel>{
        return this._httpclient.get<ProfesorModel>(this.URL_SUPABASEPROFE+'?correo_electronico=eq.'+correo_profesor+'&clave_profe=eq.'+password+'&select=*',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }
}