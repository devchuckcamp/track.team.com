import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../../service/chat.service';
import { ProjectService } from '../../service/project.service';

import { Project } from '../../model/project';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked  {
  chats: Observable<string[]>;
  currentChat: number;
  message: string;
  messages: any[] = [];
  messagesTotal:number;
  messagesPerPage:number;
  messagesPage:number;
  project:Project;
  projectID:  number;
  projectsList:any = [];
  projectThreadLoaded:boolean;
  private _docSub: Subscription;
  @ViewChild('chatBox') private myScrollContainer: ElementRef;
  constructor(
    private projectService:ProjectService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.messagesPerPage = 5;
    this.projectThreadLoaded = false;
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined){
        //console.log(params['project_name']);
        this.projectService.projects.subscribe( (res:any) => {
          this.projectsList = res;
          if(res.length) {
            this.project =  res.find( (proj:any) => proj.slug == params['project_name'] );
            console.log(this.project);
            if(this.project){
              // Subscribe only once to an observable
              if(!this.projectThreadLoaded){
                this.projectThreadLoaded = true;
                this.loadMessages();
                this.getMessages();
              }
            }
          }
        });
      }
    });

    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
    //this.grow(116);
}
  ngOnDestroy() {
  }

  loadMessages(){
    this.chatService.getMessagesOnload(this.project.id, this.messagesPerPage).subscribe((msg:any) => {
      console.log('updated message 1', msg.data);
      this.messages = msg.data.reverse();
      this.messagesTotal = msg.total;
    });
  }
  getMessages(){
    this.chatService
          .getMessages(this.project.id)
          .subscribe((message: any) => {
            console.log('updated message 2');
            this.messages.push(message);
          });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {
    let chat = {message: this.message};
    this.chatService.sendMessage(JSON.stringify(chat), this.project.id);
    this.message = '';
  }

  replaceAll(txt) {
    return txt.replace(new RegExp("<br />", 'g'),"\n");
  }

  viewMoreThread(){
    this.messagesPerPage +=5;
    console.log(this.messagesPerPage);
    this.loadMessages();
    return false;
  }
  grow(element:any) {
    console.log(element);
    let  textArea = document.getElementById('chat-'+element);
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    let height =  textArea.scrollHeight + 'px';
    textArea.style.minHeight =height;
    textArea.style.maxHeight =height;
    // let style = {'min-height': height,'max-height':height };
    // return style;
  }



}