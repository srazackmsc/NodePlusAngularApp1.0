import { Component ,OnInit} from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../file.service';

//const uri = 'http://localhost:3000/api/upload';
const uri = 'http://192.168.0.103:3000/api/upload';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[FileService]
})
export class UploadComponent implements OnInit {

  uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = [];

    constructor(private _fileService:FileService){

        this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
        this.uploader.onBeforeUploadItem = (item) => {
          item.withCredentials = false;
        }
    }

  ngOnInit() { 
    // this._fileService.download().subscribe(
    //   data => console.log(data),
    //   error => console.log(error)
    // );
  }

}
