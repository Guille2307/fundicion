// Dependencias angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Ionic
import { IonicModule } from "@ionic/angular";

// Material Components
import { MatTabsModule } from "@angular/material/tabs";

// Traducciones
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// Componentes compartidos
import { LanguageSelectionComponent } from "../shared/components/languageSelection/languageSelection.component";
import { FormControlErrorComponent } from "../shared/components/formControlError/formControlError.component";
import { PublicProfileToShowComponent } from "../shared/components/publicProfileToShow/publicProfileToShow.component";
import { LegalInfoTabsComponent } from "../shared/components/legalInfoTabs/legalInfoTabs.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { WoutickLogoComponent } from "../shared/components/woutickLogo/woutickLogo.component";
import { SponsorsIninityBarComponent } from "../shared/components/sponsorsInfinityBar/sponsorsInfinityBar.component";
import { MeetingHourCardComponent } from "../shared/components/meetingHourCard/meetingHourCard.component";
import { OfferCardComponent } from "../shared/components/offerCard/offerCard.component";
import { InfoOfferForAssistantComponent } from "../shared/components/infoOfferForAssistant/infoOfferForAssistant.component";
import { ChatAndProfileComponent } from "../shared/components/chatAndProfile/chatAndProfile.component";
import { SearchbarComponent } from "../shared/components/searchbar/searchbar.component";
import { RequestCardComponent } from "../shared/components/requestCard/requestCard.component";
import { TooltipErrorComponent } from "../shared/components/tooltipError/tooltipError.component";
import { AssistantsContainerComponent } from "../shared/components/chat/assistantsContainer/assistantsContainer.component";
import { ChatsContainerComponent } from "../shared/components/chat/chatsContainer/chatsContainer.component";
import { ConversationContainerComponent } from "../shared/components/chat/conversationContainer/conversationContainer.component";
import { GroupContainerComponent } from "../shared/components/chat/groupContainer/groupContainer.component";
import { ListAssistantsGroupComponent } from "../shared/components/chat/groupContainer/components/listAssistantsGroup/listAssistantsGroup.component";
import { VideocallContainerComponent } from "../shared/components/chat/videocallContainer/videocallContainer.component";
import { ButtonSaveComponent } from "../shared/components/buttonSave/buttonSave.component";
import { ChatItemComponent } from "../shared/components/chat/chatItem/chatItem.component";
import { AnnotationsComponent } from "../shared/components/annotations/annotations.component";
import { FormPasswordComponent } from "../shared/components/formPassword/formPassword.component";
import { InfoContainerComponent } from "../shared/components/chat/infoContainer/infoContainer.component";
import { AddPeopleToGroupComponent } from "../shared/components/chat/infoContainer/pages/addPeopleToGroup/addPeopleToGroup.component";
import { SocialmediaComponent } from "../shared/components/socialmedia/socialmedia.component";
import { EmbedVideoComponent } from "../shared/components/embedVideo/embedVideo.component";
// Custom
import { ButtonComponent } from "../shared/components/custom/button/button.component";
import { CheckboxComponent } from "../shared/components/custom/checkbox/checkbox.component";

// Pipes
import { ImageSpeakerPipe } from "../shared/pipes/imageSpeaker/imageSpeaker.pipe";
import { FilterPipe } from "../shared/pipes/filter/filter.pipe";
import { ImageProfilePipe } from "../shared/pipes/imageProfile/imageProfile.pipe";
import { FileUserPipe } from "../shared/pipes/fileUser/fileUser.pipe";
import { VirtualListIndexPipe } from "../shared/pipes/virtualListIndex/virtualListIndex.pipe";
import { ImageSponsorPipe } from "../shared/pipes/imageSponsor/imageSponsor.pipe";
import { ActivityCardComponent } from "../shared/components/activityCard/activityCard.component";
import { ImageGalleryPipe } from "../shared/pipes/imageGallery/imageGallery.pipe";
import { NamePipe } from "../shared/pipes/chat/name/name.pipe";
import { SurnamesPipe } from "../shared/pipes/chat/surnames/surnames.pipe";
import { IdPipe } from "../shared/pipes/chat/id/id.pipe";
import { UsernamePipe } from "../shared/pipes/chat/username/username.pipe";
import { UserGroupPipe } from "../shared/pipes/chat/userGroup/userGroup.pipe";
import { ChatUserPipe } from "../shared/pipes/chatUser/chatUser.pipe";
import { KeysPipe } from "../shared/pipes/keys/keys.pipe";
import { ImageSchedulePipe } from "../shared/pipes/imageSchedule/imageSchedule.pipe";
import { VideoUrlPipe } from "../shared/pipes/videoUrl/videoUrl.pipe";
import { FilterWithStartsPipe } from "../shared/pipes/filterWithStarts/filterWithStarts.pipe";
import { imageEventPipe } from "../shared/pipes/imageEvent/imageEvent.pipe";
import { ConfirmacionComponent } from "../shared/components/confirmacion/confirmacion.component";

@NgModule({
  declarations: [
    LanguageSelectionComponent,
    FormControlErrorComponent,
    ImageSpeakerPipe,
    FilterPipe,
    PublicProfileToShowComponent,
    LegalInfoTabsComponent,
    ImageProfilePipe,
    WoutickLogoComponent,
    FooterComponent,
    SponsorsIninityBarComponent,
    FileUserPipe,
    MeetingHourCardComponent,
    OfferCardComponent,
    InfoOfferForAssistantComponent,
    ChatAndProfileComponent,
    SearchbarComponent,
    VirtualListIndexPipe,
    ImageSponsorPipe,
    ActivityCardComponent,
    ImageGalleryPipe,
    RequestCardComponent,
    TooltipErrorComponent,
    NamePipe,
    SurnamesPipe,
    UsernamePipe,
    IdPipe,
    UserGroupPipe,
    AssistantsContainerComponent,
    ChatsContainerComponent,
    ConversationContainerComponent,
    GroupContainerComponent,
    ListAssistantsGroupComponent,
    VideocallContainerComponent,
    ButtonSaveComponent,
    ChatItemComponent,
    AnnotationsComponent,
    ChatUserPipe,
    FormPasswordComponent,
    InfoContainerComponent,
    AddPeopleToGroupComponent,
    CheckboxComponent,
    ButtonComponent,
    SocialmediaComponent,
    KeysPipe,
    ImageSchedulePipe,
    EmbedVideoComponent,
    VideoUrlPipe,
    FilterWithStartsPipe,
    imageEventPipe,
    ConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    IonicModule,
    MatTabsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    IonicModule,
    LanguageSelectionComponent,
    FormControlErrorComponent,
    ImageSpeakerPipe,
    FilterPipe,
    PublicProfileToShowComponent,
    LegalInfoTabsComponent,
    ImageProfilePipe,
    WoutickLogoComponent,
    FooterComponent,
    SponsorsIninityBarComponent,
    FileUserPipe,
    OfferCardComponent,
    MeetingHourCardComponent,
    InfoOfferForAssistantComponent,
    ChatAndProfileComponent,
    SearchbarComponent,
    VirtualListIndexPipe,
    ImageSponsorPipe,
    ActivityCardComponent,
    ImageGalleryPipe,
    RequestCardComponent,
    TooltipErrorComponent,
    NamePipe,
    SurnamesPipe,
    UsernamePipe,
    IdPipe,
    UserGroupPipe,
    AssistantsContainerComponent,
    ChatsContainerComponent,
    ConversationContainerComponent,
    GroupContainerComponent,
    ListAssistantsGroupComponent,
    VideocallContainerComponent,
    ButtonSaveComponent,
    ChatItemComponent,
    AnnotationsComponent,
    ChatUserPipe,
    FormPasswordComponent,
    InfoContainerComponent,
    AddPeopleToGroupComponent,
    CheckboxComponent,
    ButtonComponent,
    SocialmediaComponent,
    KeysPipe,
    EmbedVideoComponent,
    VideoUrlPipe,
    FilterWithStartsPipe,
    imageEventPipe,
  ],
  providers: [],
})
export class SharedModule {}
