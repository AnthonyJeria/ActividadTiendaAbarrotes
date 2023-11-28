import { Injectable, NgModule } from "@angular/core";
import { ClaseModel } from "../models/ServiciosModel";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Observable, map, catchError } from "rxjs";
import { createClient } from "@supabase/supabase-js";

@Injectable({ providedIn: 'root' })
export class ClaseService {

    URL_SUPACLASE = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Clase'

    URL_QRGENERATOR = 'http://api.qrserver.com/v1/create-qr-code/?data='

    static this: any;
   
    constructor(private http: HttpClient) {

    }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmRhcWF3bXVpdW1ua2V3cGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjgzNjIsImV4cCI6MjAxMTM0NDM2Mn0.NhD9PBIZTowZ3aGJAeBY6hCR4cBDpcKT2A-2M2r659Y')

    getClases(): Observable<ClaseModel>{
        return this.http.get<any>(this.URL_SUPACLASE+'&select=*',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    QRgenerator(fecha: string) {
        const qr = this.URL_QRGENERATOR+fecha+'&size=100x100'
        return qr;
    }
}