import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { SharedModule } from "../shared.module";
import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./pages/menu/menu.component";

// Material Components
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";

//    Components
import { NavbarComponent } from "./components/navbar/navbar.component";

// MY PROFILE
//    Pages
import { MyProfileComponent } from "./pages/myProfile/myProfile.component";
//    Tabs
import { MyInfoComponent } from "./pages/myProfile/tabs/myInfo/myInfo.component";
import { MyCompanyProfileComponent } from "./pages/myProfile/tabs/myCompanyProfile/myCompanyProfile.component";
import { MyPurseComponent } from "./pages/myProfile/tabs/myPurse/myPurse.component";
import { MyMeetingsComponent } from "./pages/myProfile/tabs/myMeetings/myMeetings.component";
//    Components
import { PublicProfileComponent } from "./pages/myProfile/tabs/myInfo/components/publicProfile/publicProfile.component";
import { PrivateProfileComponent } from "./pages/myProfile/tabs/myInfo/components/privateProfile/privateProfile.component";

// NOTIFICATIONS
import { NotificationsComponent } from "./pages/notifications/notifications.component";

// CHATS
//    Pages
import { ChatsComponent } from "./pages/chats/chats.component";

// AGENDA
//    Pages
import { AgendaComponent } from "./pages/agenda/agenda.component";
import { InfoActivityComponent } from "./pages/agenda/pages/infoActivity/infoActivity.component";
import { SetEventAgendaComponent } from "src/app/shared/pages/setEventAgenda/setEventAgenda.component";
//    Components
import { DayContentProgramComponent } from "./pages/agenda/components/dayContentProgram/dayContentProgram.component";
import { DayContentMyAgendaComponent } from "./pages/agenda/components/dayContentMyAgenda/dayContentMyAgenda.component";
import { InfoScheduleComponent } from "./pages/agenda/components/infoSchedule/infoSchedule.component";

// INFOEVENT
//    Pages
import { InfoEventComponent } from "./pages/infoEvent/infoEvent.component";
import { InfoSpeakerComponent } from "./pages/infoEvent/tabs/artists/pages/infoSpeaker/infoSpeaker.component";
//    Tabs
import { InfoComponent } from "./pages/infoEvent/tabs/info/info.component";
import { ProgramComponent } from "./pages/infoEvent/tabs/program/program.component";
import { ArtistsComponent } from "./pages/infoEvent/tabs/artists/artists.component";
import { MeetersComponent } from "./pages/infoEvent/tabs/meeters/meeters.component";
//    Components
import { SpeakerCardComponent } from "./pages/infoEvent/tabs/artists/components/speaker-card/speakerCard.component";

// STREAMINGS
//    Pages
import { StreamingsComponent } from "./pages/streamings/streamings.component";
//    Components
import { RoomComponent } from "./pages/streamings/pages/room/room.component";
import { RoomCardComponent } from "./pages/streamings/components/roomCard/roomCard.component";

// COMPANIES
//    Pages
import { CompaniesComponent } from "./pages/companies/companies.component";
import { InfoCompanyComponent } from "./pages/companies/pages/infoCompany/infoCompany.component";
//    Components
import { CompanyCardComponent } from "./pages/companies/components/companyCard/companyCard.component";

// JOBOFFERS
//    Pages
import { JobOffersComponent } from "./pages/jobOffers/jobOffers.component";
import { JobOfferComponent } from "src/app/shared/pages/jobOffer/jobOffer.component";
import { SetJobOfferComponent } from "src/app/shared/pages/setJobOffer/setJobOffer.component";

// MEETINGS
//    Pages
import { MeetingsComponent } from "./pages/meetings/meetings.component";
import { RequestMeetingComponent } from "./pages/meetings/pages/requestMeeting/requestMeeting.component";
import { ReviewMeetComponent } from "./pages/meetings/pages/reviewMeeting/reviewMeeting.component";
import { MeetingComponent } from "./pages/meetings/pages/meeting/meeting.component";
import { SetUpMeetingHoursComponent } from "./pages/meetings/pages/setUpMeetingHours/setUpMeetingHours.component";
import { AssociateNewMeetDateComponent } from "./pages/meetings/pages/associateNewMeetDate/associate-new-meet-date.component";
//    Components
import { ContentCardsComponent } from "./pages/meetings/components/contentCards/contentCards.component";
import { MeetingCardComponent } from "./pages/meetings/components/meetingCard/meetingCard.component";

// SPONSORS
//    Pages
import { SponsorsComponent } from "./pages/sponsors/sponsors.component";
//    Components
import { SponsorProfileComponent } from "./pages/sponsors/pages/sponsorProfile/sponsorProfile.component";

// GALLERY
//    Pages
import { GalleryComponent } from "./pages/gallery/gallery.component";

// ASSISTANTS
//    Pages
import { AssistantsComponent } from "./pages/assistants/assistants.component";
import { InfoAssistantComponent } from "./pages/assistants/pages/infoAssistant/infoAssistant.component";

// CHAT HELP
//    Pages
import { ChatHelpComponent } from "./pages/chatHelp/chatHelp.component";

// LEGALINFO
//    Pages
import { LegalInfoSideComponent } from "./pages/legalInfoSide/legalInfoSide.component";
//    Tabs
import { TermsOfUseSideComponent } from "./pages/legalInfoSide/tabs/termsOfUse/termsOfUse.component";
import { CookiesPoliciesSideComponent } from "./pages/legalInfoSide/tabs/cookiesPolicies/cookiesPolicies.component";
import { PrivacyPoliciesSideComponent } from "./pages/legalInfoSide/tabs/privacyPolicies/privacyPolicies.component";

// ACTIVITIES
//    Pages
import { ActivitiesComponent } from "./pages/activities/activities.component";
//    Tabs
import { FoodtrucksComponent } from "./pages/activities/tabs/foodtrucks/foodtrucks.component";
import { PollsComponent } from "./pages/activities/tabs/polls/polls.component";

// MAP EVENT
//    Pages
import { MapEventComponent } from "./pages/mapEvent/mapEvent.component";

// GAMIFICATION
//    Pages
import { GamificationComponent } from "./pages/gamification/gamification.component";

// ACCREDITATION
//    Pages
import { AccreditationComponent } from "./pages/accreditation/accreditation.component";

// PLAN
//    Pages
import { PlanComponent } from "./pages/plan/plan.component";

// LIBRARIES
import { AgendaModule } from "agenda";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    MenuComponent,
    AgendaComponent,
    InfoEventComponent,
    ActivitiesComponent,
    StreamingsComponent,
    MapEventComponent,
    MyProfileComponent,
    AssistantsComponent,
    ChatsComponent,
    SponsorsComponent,
    InfoComponent,
    ProgramComponent,
    ArtistsComponent,
    GalleryComponent,
    MeetersComponent,
    FoodtrucksComponent,
    PollsComponent,
    MyInfoComponent,
    MyPurseComponent,
    MyCompanyProfileComponent,
    MyMeetingsComponent,
    DayContentProgramComponent,
    DayContentMyAgendaComponent,
    PublicProfileComponent,
    PrivateProfileComponent,
    SpeakerCardComponent,
    InfoActivityComponent,
    InfoScheduleComponent,
    InfoSpeakerComponent,
    InfoAssistantComponent,
    LegalInfoSideComponent,
    CookiesPoliciesSideComponent,
    PrivacyPoliciesSideComponent,
    TermsOfUseSideComponent,
    MeetingsComponent,
    MeetingCardComponent,
    CompaniesComponent,
    RequestMeetingComponent,
    InfoCompanyComponent,
    ReviewMeetComponent,
    SetUpMeetingHoursComponent,
    JobOffersComponent,
    AssociateNewMeetDateComponent,
    JobOffersComponent,
    RoomComponent,
    RoomCardComponent,
    SponsorProfileComponent,
    JobOfferComponent,
    SetJobOfferComponent,
    ChatHelpComponent,
    MeetingComponent,
    ContentCardsComponent,
    SetEventAgendaComponent,
    NotificationsComponent,
    GamificationComponent,
    AccreditationComponent,
    PlanComponent,
    CompanyCardComponent,
  ],
  imports: [
    SharedModule,
    MenuRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    ScrollingModule,
    AgendaModule,
    MatDialogModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {}
