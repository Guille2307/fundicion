import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';

// MY PROFILE
//    Pages
import { MyProfileComponent } from './pages/myProfile/myProfile.component';
//    Tabs
import { MyInfoComponent } from './pages/myProfile/tabs/myInfo/myInfo.component';
import { MyCompanyProfileComponent } from './pages/myProfile/tabs/myCompanyProfile/myCompanyProfile.component';
import { MyPurseComponent } from './pages/myProfile/tabs/myPurse/myPurse.component';
import { MyMeetingsComponent } from './pages/myProfile/tabs/myMeetings/myMeetings.component';

// NOTIFICATIONS
import { NotificationsComponent } from './pages/notifications/notifications.component';

// CHATS
//    Pages
import { ChatsComponent } from './pages/chats/chats.component';

// AGENDA
//    Pages
import { AgendaComponent } from './pages/agenda/agenda.component';
import { InfoActivityComponent } from './pages/agenda/pages/infoActivity/infoActivity.component';
import { SetEventAgendaComponent } from 'src/app/shared/pages/setEventAgenda/setEventAgenda.component';

// INFOEVENT
//    Pages
import { InfoEventComponent } from './pages/infoEvent/infoEvent.component';
import { InfoSpeakerComponent } from './pages/infoEvent/tabs/artists/pages/infoSpeaker/infoSpeaker.component';

// STREAMINGS
//    Pages
import { StreamingsComponent } from './pages/streamings/streamings.component';
//    Components
import { RoomComponent } from './pages/streamings/pages/room/room.component';
// Guards
import { CheckStreamingGuard } from 'src/app/shared/guards/checkStreaming/checkStreaming.guard';

// COMPANIES
//    Pages
import { CompaniesComponent } from './pages/companies/companies.component';
import { InfoCompanyComponent } from './pages/companies/pages/infoCompany/infoCompany.component';

// JOBOFFERS
//    Pages
import { JobOffersComponent } from './pages/jobOffers/jobOffers.component';
import { JobOfferComponent } from 'src/app/shared/pages/jobOffer/jobOffer.component';
import { SetJobOfferComponent } from 'src/app/shared/pages/setJobOffer/setJobOffer.component';

// MEETINGS
//    Pages
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { RequestMeetingComponent } from './pages/meetings/pages/requestMeeting/requestMeeting.component';
import { ReviewMeetComponent } from './pages/meetings/pages/reviewMeeting/reviewMeeting.component';
import { MeetingComponent } from './pages/meetings/pages/meeting/meeting.component';
import { SetUpMeetingHoursComponent } from './pages/meetings/pages/setUpMeetingHours/setUpMeetingHours.component';
import { AssociateNewMeetDateComponent } from './pages/meetings/pages/associateNewMeetDate/associate-new-meet-date.component';

// SPONSORS
//    Pages
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
//    Components
import { SponsorProfileComponent } from './pages/sponsors/pages/sponsorProfile/sponsorProfile.component';

// GALLERY
//    Pages
import { GalleryComponent } from './pages/gallery/gallery.component';

// ASSISTANTS
//    Pages
import { AssistantsComponent } from './pages/assistants/assistants.component';
import { InfoAssistantComponent } from './pages/assistants/pages/infoAssistant/infoAssistant.component';

// CHAT HELP
//    Pages
import { ChatHelpComponent } from './pages/chatHelp/chatHelp.component';

// LEGALINFO
//    Pages
import { LegalInfoSideComponent } from './pages/legalInfoSide/legalInfoSide.component';
//    Tabs
import { TermsOfUseSideComponent } from './pages/legalInfoSide/tabs/termsOfUse/termsOfUse.component';
import { CookiesPoliciesSideComponent } from './pages/legalInfoSide/tabs/cookiesPolicies/cookiesPolicies.component';
import { PrivacyPoliciesSideComponent } from './pages/legalInfoSide/tabs/privacyPolicies/privacyPolicies.component';

// ACTIVITIES
//    Pages
import { ActivitiesComponent } from './pages/activities/activities.component';
//    Tabs
import { FoodtrucksComponent } from './pages/activities/tabs/foodtrucks/foodtrucks.component';
import { PollsComponent } from './pages/activities/tabs/polls/polls.component';

// MAP EVENT
//    Pages
import { MapEventComponent } from './pages/mapEvent/mapEvent.component';

// GAMIFICATION
//    Pages
import { GamificationComponent } from './pages/gamification/gamification.component';

// ACCREDITATION
//    Pages
import { AccreditationComponent } from './pages/accreditation/accreditation.component';

// PLAN
//    Pages
import { PlanComponent } from './pages/plan/plan.component';

// Guards
import { ModulesGuard } from 'src/app/shared/guards/modules/modules.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'gamification',
        component: GamificationComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'gamification'}
      },
      {
        path: 'agenda',
        component: AgendaComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'agenda'}
      },
      {
        path: 'agenda/set-event',
        component: SetEventAgendaComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'agenda'}
      },
      {
        path: 'agenda/edit-event/:id',
        component: SetEventAgendaComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'agenda'}
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'notifications'}
      },
      {
        path: 'info/activity/:activity',
        component: InfoActivityComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'eventInfo'}
      },
      {
        path: 'info/speaker/:speaker',
        component: InfoSpeakerComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'eventInfo'}
      },
      {
        path: 'event',
        component: InfoEventComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'eventInfo'}
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'gallery'}
      },
      {
        path: 'meetings',
        component: MeetingsComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'meetings'}
      },
      {
        path: 'request-meeting/:idCompany',
        component: RequestMeetingComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'meetings'}
      },
      {
        path: 'review-meet/:id',
        component: ReviewMeetComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'meetings'}
      },
      {
        path: 'meeting/:id',
        component: MeetingComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'meetings'}
      },
      {
        path: 'set-hours-meetings',
        component: SetUpMeetingHoursComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'meetings'}
      },
      {
        path: 'associate-new-date',
        component: AssociateNewMeetDateComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'meetings'}
      },
      {
        path: 'activities',
        component: ActivitiesComponent,
        children: [
          {
            path: 'foodtrucks',
            component: FoodtrucksComponent,
            canActivate: [
              ModulesGuard
            ],
            data: {module: 'foodtrucks'}
          },
          {
            path: 'polls',
            component: PollsComponent,
            canActivate: [
              ModulesGuard
            ],
            data: {module: 'polls'}
          },
          {
            path: '',
            redirectTo: 'foodtrucks',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'streamings',
        component: StreamingsComponent,
        canActivate: [
          CheckStreamingGuard,
          ModulesGuard
        ],
        data: {module: 'streamings'}
      },
      {
        path: 'streamings/id/:id',
        component: RoomComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'streamings'}
      },
      // {
      //   // path: 'map/:event',
      //   path: 'map/event',
      //   component: MapEventComponent
      // },
      // {
      //   path: 'map',
      //   // path: 'map/:event',
      //   redirectTo: 'map/event',
      //   pathMatch: 'full'
      // },
      {
        path: 'profile',
        component: MyProfileComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'myInfo'},
        children: [
          {
            path: 'my-info',
            component: MyInfoComponent
          },
          // {
          //   path: 'my-purse',
          //   component: MyPurseComponent
          // },
          {
            path: 'my-company-profile',
            component: MyCompanyProfileComponent
          },
          // {
          //   path: 'my-meetings',
          //   component: MyMeetingsComponent
          // },
          {
            path: '',
            redirectTo: 'my-info',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'companies'}
      },
      {
        path: 'info/company/:company',
        component: InfoCompanyComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'companies'}
      },
      {
        path: 'job-offers',
        component: JobOffersComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'jobOffers'}
      },
      {
        path: 'job-offer/:id',
        component: JobOfferComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'jobOffers'}
      },
      {
        path: 'set-job-offer',
        component: SetJobOfferComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'jobOffers'}
      },
      {
        path: 'edit-job-offer/:id',
        component: SetJobOfferComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'jobOffers'}
      },
      {
        path: 'assistants',
        component: AssistantsComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'assistants'}
      },
      {
        path: 'info/assistant/:assistant',
        component: InfoAssistantComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'assistants'}
      },
      {
        path: 'chats',
        component: ChatsComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'chat'}
      },
      {
        path: 'sponsors',
        component: SponsorsComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'sponsors'}
      },
      {
        path: 'sponsor/:sponsor',
        component: SponsorProfileComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'sponsors'}
      },
      {
        path: 'chat-help',
        component: ChatHelpComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'chatHelp'}
      },
      {
        path: 'accreditation',
        component: AccreditationComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'accreditation'}
      },
      {
        path: 'plan',
        component: PlanComponent,
        canActivate: [
          ModulesGuard
        ],
        data: {module: 'plan'}
      },
      {
        path: 'legal-info',
        component: LegalInfoSideComponent,
        children: [
          {
            path: 'terms-of-use',
            component: TermsOfUseSideComponent
          },
          {
            path: 'policies-cookies',
            component: CookiesPoliciesSideComponent
          },
          {
            path: 'policies-privacy',
            component: PrivacyPoliciesSideComponent
          },
          {
            path: '',
            redirectTo: 'terms-of-use',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'event',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'event',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class MenuRoutingModule { }
