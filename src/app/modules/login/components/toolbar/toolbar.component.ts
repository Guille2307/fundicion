import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language/language.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    public languageService: LanguageService
  ) { }

  ngOnInit() {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
