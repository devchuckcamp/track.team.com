import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  project_name: string;
  users : User[];
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'action'];
  // MatPaginator Inputs
  length = 5;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 15, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
    private projectService:ProjectService,
  ) { }

  ngOnInit() {

    // this.getUser();
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined) {
          this.project_name = params['project_name'];
          this.getMember();
      }
    });
    this.dataSource.paginator = this.paginator;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    console.log(setPageSizeOptionsInput);
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  //Pagination Section
  onPageChange(event) {
    console.log(event);
    // alert(JSON.stringify("Current page index: " + event.pageIndex));
    //   this.currentPage = event.pageIndex+1;
    //    console.log(event,'event');
    //    this.per_page = event.pageSize;
    //    // this.config.currentPage = number;
    //    // this.getDoctors(number);
    //  this.filter = this.filter !== null ? this.filter : "";
    
    //  this.userService.getEmployees(event.pageIndex+1, event.pageSize, this.filter).subscribe( 
    //    (res)  =>  {
    //      console.log(res,'new employee list');
    //      this.length = res.total;
    //      this.employees = res.data;
    //      this.dataSource = new MatTableDataSource(res.data);

    //      this.loading =  false;
    //    },
    //    (err)  =>  {
    //      console.log("Error:"+err.status);
    //    }
    //    );
  }

  getMember(){
    this.projectService.getAllMember(this.project_name).subscribe( res => {
      console.log(res.data);
      this.dataSource = new MatTableDataSource(res.data);
      this.users = res.data;
      this.length = res.total;
    });
  }
}
