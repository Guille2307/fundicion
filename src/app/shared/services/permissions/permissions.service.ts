import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

export enum style {
  NO_CORNERS = 1,
  ROUND,
}

@Injectable({
  providedIn: "root",
})
export class PermissionsService {
  private sub;

  public showBackground = true;
  public showName = false;
  public showDate = true;
  public showScrim = true;

  public showAccessWithoutAccount = false;

  public styleLogo = style.NO_CORNERS;

  private permissions = {
    // AGENDA
    crearEvento: false,
    // PERFIL
    iniciarChat: false,
    hacerAnotación: false,
    mostrarBotonChat: false,
    mostrarBotonMeet: false,
    mostrarVideo: false,
    // MEETINGS
    gestionarCalendario: false,
    solicitarMeeting: false,
    editarMeeting: false,
    verMeeting: false,
    // OFERTAS DE EMPLEO
    editarOfertasEmpleo: false,
    verOfertasEmpleo: false,
    inscribirseEnOferta: false,
    // STREAMINGS
    verListaEspectadores: false,
    banearEspectador: false,
    adminChat: false,
    verPerfilEspectador: false,
    verStreaming: false,
    // EMPRESAS
    verEmpresas: false, // verSpots
    // PATROCINADORES
    editarPatrocinador: false,
    // GALERIA
    editarImagen: false,
    editarVideo: false,
    // ASISTENTES
    verAsistentes: false,
    verPerfiles: false,
    verTodosLosAsistentes: false,
    verAsistentesContactos: false,
    verAsistentesEventoComun: false,
    // ATT. CLIENTE
    adminAttCliente: false,
    // INFO. LEGAL
    editarInfoLegal: false,
    // CHAT
    crearGrupo: false,
    crearNotificacionesGlobal: false,
  };

  constructor() {}

  setSub() {
    this.sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];
  }

  getSub() {
    return this.sub;
  }

  setPermissions() {
    this.setSub();
    switch (this.sub) {
      case "EMPLOYEE":
        this.permissions = {
          // AGENDA
          crearEvento: false,
          // PERFIL
          iniciarChat: true,
          hacerAnotación: false,
          mostrarBotonChat: false,
          mostrarBotonMeet: false,
          mostrarVideo: false,
          // MEETINGS
          gestionarCalendario: false,
          solicitarMeeting: true,
          editarMeeting: false,
          verMeeting: true,
          // OFERTAS DE EMPLEO
          editarOfertasEmpleo: false,
          verOfertasEmpleo: true,
          inscribirseEnOferta: true,
          // STREAMINGS
          verListaEspectadores: false,
          banearEspectador: false,
          adminChat: false,
          verPerfilEspectador: false,
          verStreaming: false,
          // EMPRESAS
          verEmpresas: false, // verSpots
          // PATROCINADORES
          editarPatrocinador: false,
          // GALERIA
          editarImagen: false,
          editarVideo: false,
          // ASISTENTES
          verAsistentes: false,
          verPerfiles: false,
          verTodosLosAsistentes: false,
          verAsistentesContactos: false,
          verAsistentesEventoComun: false,
          // ATT. CLIENTE
          adminAttCliente: false,
          // INFO. LEGAL
          editarInfoLegal: false,
          // CHAT
          crearGrupo: true,
          crearNotificacionesGlobal: false,
        };
        break;
      case "BASIC":
      case "MEDIUM":
      case "PREMIUM":
        this.permissions = {
          // AGENDA
          crearEvento: true,
          // PERFIL
          iniciarChat: true,
          hacerAnotación: true,
          mostrarBotonChat: true,
          mostrarBotonMeet: true,
          mostrarVideo: true,
          // MEETINGS
          gestionarCalendario: true,
          solicitarMeeting: true,
          editarMeeting: true,
          verMeeting: true,
          // OFERTAS DE EMPLEO
          editarOfertasEmpleo: true,
          verOfertasEmpleo: true,
          inscribirseEnOferta: true,
          // STREAMINGS
          verListaEspectadores: true,
          banearEspectador: true,
          adminChat: true,
          verPerfilEspectador: true,
          verStreaming: true,
          // EMPRESAS
          verEmpresas: true, // verSpots
          // PATROCINADORES
          editarPatrocinador: true,
          // GALERIA
          editarImagen: true,
          editarVideo: true,
          // ASISTENTES
          verAsistentes: true,
          verPerfiles: true,
          verTodosLosAsistentes: true,
          verAsistentesContactos: true,
          verAsistentesEventoComun: true,
          // ATT. CLIENTE
          adminAttCliente: true,
          // INFO. LEGAL
          editarInfoLegal: true,
          // CHAT
          crearGrupo: true,
          crearNotificacionesGlobal: true,
        };
        break;
      case "ADMIN":
        this.permissions = {
          // AGENDA
          crearEvento: true,
          // PERFIL
          iniciarChat: true,
          hacerAnotación: true,
          mostrarBotonChat: true,
          mostrarBotonMeet: true,
          mostrarVideo: true,
          // MEETINGS
          gestionarCalendario: true,
          solicitarMeeting: true,
          editarMeeting: true,
          verMeeting: true,
          // OFERTAS DE EMPLEO
          editarOfertasEmpleo: true,
          verOfertasEmpleo: true,
          inscribirseEnOferta: true,
          // STREAMINGS
          verListaEspectadores: true,
          banearEspectador: true,
          adminChat: true,
          verPerfilEspectador: true,
          verStreaming: true,
          // EMPRESAS
          verEmpresas: true, // verSpots
          // PATROCINADORES
          editarPatrocinador: true,
          // GALERIA
          editarImagen: true,
          editarVideo: true,
          // ASISTENTES
          verAsistentes: true,
          verPerfiles: true,
          verTodosLosAsistentes: true,
          verAsistentesContactos: true,
          verAsistentesEventoComun: true,
          // ATT. CLIENTE
          adminAttCliente: true,
          // INFO. LEGAL
          editarInfoLegal: true,
          // CHAT
          crearGrupo: true,
          crearNotificacionesGlobal: true,
        };
        break;
    }
  }

  getPermissions() {
    return this.permissions;
  }
}
