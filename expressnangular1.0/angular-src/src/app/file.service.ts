import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
//import 'rxjs/Rx';
//import {Observable} from 'rxjs';

const uri = 'http://192.168.0.103:3000/api/download';
const dlisturi = 'http://192.168.0.103:3000/api/downloadlist';
const dfileuri = 'http://192.168.0.103:3000/api/deleteFile';
@Injectable()

export class FileService {

    constructor(private _http:HttpClient){}

    downloadFile(file:String){
        var body = {filename:file};

        return this._http.post(uri,body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }
    getAllFiles(){
      return this._http.get(dlisturi,{ });
    }
    deleteFile(filename){
        var body = {filename:filename};
        return this._http.post(dfileuri,body,{
            responseType : 'json',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }
}