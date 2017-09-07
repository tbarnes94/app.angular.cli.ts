import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { TranslateService as TranslateServiceDep } from '@ngx-translate/core';

import { CommonService } from '../../../commons';
import { TranslateTranslations } from '../store/translate.actions';

/**
 * https://angular.io/tutorial/toh-pt4
 */
@Injectable()
export class TranslateService {

  /**
   * @param o   https://github.com/ngx-translate/core
   */
  public onLanguageChange(o: string): void {
    this.translate.use(o);
  }

  /**
   * @param e   https://github.com/ngx-translate/core
   */
  public onTranslationsChange(e: LangChangeEvent): void {
    this.common.dispatch(new TranslateTranslations(e.translations));
    this.title.setTitle(e.translations.app.root.title);
  }

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param translate   https://github.com/ngx-translate/core
   * @param title       https://angular.io/api/platform-browser/Title
   */
  public constructor(protected readonly common: CommonService,
                     protected readonly translate: TranslateServiceDep,
                     protected readonly title: Title) {
    this.common.select<string>([ 'translate', 'language' ]).subscribe(this.onLanguageChange.bind(this));
    // this.translate.onDefaultLangChange.subscribe( this.onTranslationsChange.bind( this ) ) ;
    this.translate.onLangChange.subscribe(this.onTranslationsChange.bind(this));
  }

}
