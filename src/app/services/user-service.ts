import { Injectable } from "@angular/core";
import { AlumnoModel } from "../models/UsersModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from "rxjs";



@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASEALUMNO = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Alumno'

    URL_SUPABASEASISTENCIA = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Asistencia'
  static this: any;


    constructor(private _httpclient: HttpClient) {

    }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmRhcWF3bXVpdW1ua2V3cGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjgzNjIsImV4cCI6MjAxMTM0NDM2Mn0.NhD9PBIZTowZ3aGJAeBY6hCR4cBDpcKT2A-2M2r659Y')

    getUserListSupaBase(): Observable<AlumnoModel[]> {
        console.log(this.supabaseheaders);
        return this._httpclient.get<AlumnoModel[]>(this.URL_SUPABASEALUMNO, { headers: this.supabaseheaders, responseType: 'json' });
    }

    getUser(id_alumno: number): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASEALUMNO+'?id_alumno=eq.'+id_alumno,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }
   
    getLoginUser(correo_alumno: string, password: string): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASEALUMNO+'?correo_alumno=eq.'+correo_alumno+'&clave_alumno=eq.'+password+'&select=*',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getClave(correo_alumno: string): Observable<AlumnoModel>{
        return this._httpclient.get<AlumnoModel>(this.URL_SUPABASEALUMNO+'?correo_alumno=eq.'+correo_alumno+'&select=clave_alumno',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    

    updateAsistencia(id_alumno: number): Observable<any>{
        
        const newBodyData = {
            "estado": true
          };
          

        return this._httpclient.patch<any>(this.URL_SUPABASEASISTENCIA+'id_alumno=eq.'+id_alumno,newBodyData,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }
    
}