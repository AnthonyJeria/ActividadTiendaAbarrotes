import { Injectable } from "@angular/core";
import { AlumnoModel } from "../models/UsersModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from "rxjs";



@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Alumno'


    constructor(private _httpclient: HttpClient) {

    }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmRhcWF3bXVpdW1ua2V3cGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjgzNjIsImV4cCI6MjAxMTM0NDM2Mn0.NhD9PBIZTowZ3aGJAeBY6hCR4cBDpcKT2A-2M2r659Y')

    getUserListSupaBase(): Observable<AlumnoModel[]> {
        console.log(this.supabaseheaders);
        return this._httpclient.get<AlumnoModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders, responseType: 'json' });
    }

    getUser(id_alumno: number): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASE+'?id_alumno=eq.'+id_alumno,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }
   
    getLoginUser(correo_alumno: string, password: string): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASE+'?correo_alumno=eq.'+correo_alumno+'&clave_alumno=eq.'+password+'&select=*',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }
    
}