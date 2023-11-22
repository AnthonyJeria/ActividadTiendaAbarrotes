import { Injectable } from "@angular/core";
import { ClaseModel } from "../models/ServiciosModel";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ClaseService {

    constructor(private _httpclient: HttpClient) {}

    URL_SUPACLASE = 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Clase'

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmRhcWF3bXVpdW1ua2V3cGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjgzNjIsImV4cCI6MjAxMTM0NDM2Mn0.NhD9PBIZTowZ3aGJAeBY6hCR4cBDpcKT2A-2M2r659Y')

    getClases(): Observable<ClaseModel>{
        return this._httpclient.get<ClaseModel>(this.URL_SUPACLASE+'&select=*',{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }
}