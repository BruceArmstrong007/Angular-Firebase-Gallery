import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router,ActivatedRoute } from '@angular/router';
import { GalleryService } from './gallery.service';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  id : string;
  Date : Date;
  Name : string;
  downloadURL: string;
  documentPhotos;
  basepath : string;
  ref;
  constructor(private firebase : AngularFirestore,private router : Router,private firestorage : AngularFireStorage,private route : ActivatedRoute,private gallery : GalleryService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    this.firebase.collection('users').doc(this.id).collection('photos').get().subscribe(res =>{
      this.documentPhotos = res.docs;
      console.log(res.docs);
      });


  }

  deleteData(imgId:string,imgName:string){
    this.basepath = 'images/'+this.id+'/';
    this.ref = this.firestorage.ref(this.basepath);
    this.firebase.collection('users').doc(this.id).collection('photos').doc(imgId).delete().then(res => {
      console.log(res);
      this.ref.child(imgName).delete().subscribe(res => {
         console.log(res);
         window.location.reload();
       });
    });
  }

}
