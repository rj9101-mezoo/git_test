import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upload-image';

  imgFile: string = '';

  private httpOptions = {
    headers: new HttpHeaders({
      contentType: 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  uploadForm = new FormGroup({
    name: new FormControl(''),
    file: new FormControl(''),
    imgSrc: new FormControl('')
  })

  constructor(private http: HttpClient) {}

  get uf() {
    return this.uploadForm.controls;
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      console.log(e.target.files[0])
      // this.http.post<any>('http://192.168.0.101:3000/upload', {file: e.target.files[0]}, this.httpOptions).subscribe();;
      this.http.post<any>('http://192.168.0.101:3000/upload', {file: 1}, this.httpOptions).subscribe();;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result
        })
      }
    }
  }

  upload() {
    console.log(this.uploadForm.value);
  }
}
