import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading$ = this.loadingServ.isLoading$;
  constructor(private loadingServ: LoadingService) { }

  ngOnInit(): void {

  }
}
