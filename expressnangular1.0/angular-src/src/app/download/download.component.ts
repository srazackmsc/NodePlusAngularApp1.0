import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
  providers:[FileService]
})
export class DownloadComponent implements OnInit {
  attachmentList :any = [];
  constructor(private _fileService:FileService){}
  download(ind,filename){
      //var filename = this.attachmentList[index].uploadname;

      this._fileService.downloadFile(filename)
      .subscribe(
          data => saveAs(data, filename),
          error => console.error(error)
      );
  }
  deleteFile(ind,filename){
   console.log(ind);
   this._fileService.deleteFile(filename)
    .subscribe(
        data => this.attachmentList.splice(ind,1),
        error => console.error(error)
    );
}
  ngOnInit() {
    this._fileService.getAllFiles().subscribe(
      data => this.attachmentList = data,
      error => console.error(error)
  );
  }

}
