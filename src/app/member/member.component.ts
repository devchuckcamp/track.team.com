import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { MemberService } from '../service/member.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class MemberComponent implements OnInit {
  project_name: string;
  project_id: number;
  users : User[];
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'action'];
  // MatPaginator Inputs
  length = 5;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 15, 25, 100];
  // Form
  memberFormShow:boolean;
  showMemberSearchForm:boolean;
  memberForm: FormGroup;
  memberToAdd:any =  {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
    private projectService:ProjectService,
    private memberService:MemberService,
  ) { }

  ngOnInit() {
    this.memberFormShow = false;
    this.showMemberSearchForm = false;

    this.memberToAdd.title = '';
    this.memberToAdd.description = '';
    this.memberToAdd.assigned_to = null;
    this.memberToAdd.status_id = null;
    this.length = 0;

    this.memberForm = new FormGroup({
      'title': new FormControl('', [Validators.required,]),
      'description': new FormControl('', [Validators.required,]),
      'assigned_to': new FormControl('', [Validators.required,]),
    });
    
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined) {
          this.project_name = params['project_name'];
          this.projectService.getProject(params['project_name']).subscribe( res=>{
            if(res) this.project_id = res.id;
          });
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

  toggleMemberForm(){
    if(! this.memberFormShow ) this.memberFormShow = true;
    else  this.memberFormShow = false;
    console.log("New Ticket Form");
    
    return false;
  }

  toggleMemberSearchForm(){
    if(! this.showMemberSearchForm ) this.showMemberSearchForm = true;
    else  this.showMemberSearchForm = false;

    return false;
  }

  memberSearch(term:string){
    console.log(term,'term');
    this.memberService.searchMember(term).subscribe(res=>{
      console.log(res, 'member search result');
    });
    return false;
  }

}
