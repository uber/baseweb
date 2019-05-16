/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// Flag icons from [madebybowtie/FlagKit](https://github.com/madebybowtie/FlagKit)

import AD from './images/AD.png'; // Andorra
import AE from './images/AE.png'; // United Arab Emirates
import AF from './images/AF.png'; // Afghanistan
import AG from './images/AG.png'; // Antigua & Barbuda
import AI from './images/AI.png'; // Anguilla
import AL from './images/AL.png'; // Albania
import AM from './images/AM.png'; // Armenia
import AO from './images/AO.png'; // Angola
import AR from './images/AR.png'; // Argentina
import AS from './images/AS.png'; // American Samoa
import AT from './images/AT.png'; // Austria
import AU from './images/AU.png'; // Australia
import AW from './images/AW.png'; // Aruba
import AX from './images/AX.png'; // Åland Islands
import AZ from './images/AZ.png'; // Azerbaijan
import BA from './images/BA.png'; // Bosnia & Herzegovina
import BB from './images/BB.png'; // Barbados
import BD from './images/BD.png'; // Bangladesh
import BE from './images/BE.png'; // Belgium
import BF from './images/BF.png'; // Burkina Faso
import BG from './images/BG.png'; // Bulgaria
import BH from './images/BH.png'; // Bahrain
import BI from './images/BI.png'; // Burundi
import BJ from './images/BJ.png'; // Benin
import BL from './images/BL.png'; // St. Barthélemy
import BM from './images/BM.png'; // Bermuda
import BN from './images/BN.png'; // Brunei
import BO from './images/BO.png'; // Bolivia
import BR from './images/BR.png'; // Brazil
import BS from './images/BS.png'; // Bahamas
import BT from './images/BT.png'; // Bhutan
import BW from './images/BW.png'; // Botswana
import BY from './images/BY.png'; // Belarus
import BZ from './images/BZ.png'; // Belize
import CA from './images/CA.png'; // Canada
import CC from './images/CC.png'; // Cocos (Keeling) Islands
import CD from './images/CD.png'; // Congo - Kinshasa
import CF from './images/CF.png'; // Central African Republic
import CG from './images/CG.png'; // Congo - Brazzaville
import CH from './images/CH.png'; // Switzerland
import CI from './images/CI.png'; // Côte d’Ivoire
import CK from './images/CK.png'; // Cook Islands
import CL from './images/CL.png'; // Chile
import CM from './images/CM.png'; // Cameroon
import CN from './images/CN.png'; // China
import CO from './images/CO.png'; // Colombia
import CR from './images/CR.png'; // Costa Rica
import CU from './images/CU.png'; // Cuba
import CV from './images/CV.png'; // Cape Verde
import CW from './images/CW.png'; // Curaçao
import CX from './images/CX.png'; // Christmas Island
import CY from './images/CY.png'; // Cyprus
import CZ from './images/CZ.png'; // Czech Republic
import DE from './images/DE.png'; // Germany
import DJ from './images/DJ.png'; // Djibouti
import DK from './images/DK.png'; // Denmark
import DM from './images/DM.png'; // Dominica
import DO from './images/DO.png'; // Dominican Republic
import DZ from './images/DZ.png'; // Algeria
import EC from './images/EC.png'; // Ecuador
import EE from './images/EE.png'; // Estonia
import EG from './images/EG.png'; // Egypt
import ER from './images/ER.png'; // Eritrea
import ES from './images/ES.png'; // Spain
import ET from './images/ET.png'; // Ethiopia
import FI from './images/FI.png'; // Finland
import FJ from './images/FJ.png'; // Fiji
import FK from './images/FK.png'; // Falkland Islands
import FM from './images/FM.png'; // Micronesia
import FO from './images/FO.png'; // Faroe Islands
import FR from './images/FR.png'; // France
import GA from './images/GA.png'; // Gabon
import GB from './images/GB.png'; // United Kingdom
import GD from './images/GD.png'; // Grenada
import GE from './images/GE.png'; // Georgia
import GF from './images/GF.png'; // French Guiana
import GG from './images/GG.png'; // Guernsey
import GH from './images/GH.png'; // Ghana
import GI from './images/GI.png'; // Gibraltar
import GL from './images/GL.png'; // Greenland
import GM from './images/GM.png'; // Gambia
import GN from './images/GN.png'; // Guinea
import GP from './images/GP.png'; // Guadeloupe
import GQ from './images/GQ.png'; // Equatorial Guinea
import GR from './images/GR.png'; // Greece
import GT from './images/GT.png'; // Guatemala
import GU from './images/GU.png'; // Guam
import GW from './images/GW.png'; // Guinea-Bissau
import GY from './images/GY.png'; // Guyana
import HK from './images/HK.png'; // Hong Kong (China)
import HN from './images/HN.png'; // Honduras
import HR from './images/HR.png'; // Croatia
import HT from './images/HT.png'; // Haiti
import HU from './images/HU.png'; // Hungary
import ID from './images/ID.png'; // Indonesia
import IE from './images/IE.png'; // Ireland
import IL from './images/IL.png'; // Israel
import IM from './images/IM.png'; // Isle of Man
import IN from './images/IN.png'; // India
import IO from './images/IO.png'; // British Indian Ocean Territory
import IQ from './images/IQ.png'; // Iraq
import IR from './images/IR.png'; // Iran
import IS from './images/IS.png'; // Iceland
import IT from './images/IT.png'; // Italy
import JE from './images/JE.png'; // Jersey
import JM from './images/JM.png'; // Jamaica
import JO from './images/JO.png'; // Jordan
import JP from './images/JP.png'; // Japan
import KE from './images/KE.png'; // Kenya
import KG from './images/KG.png'; // Kyrgyzstan
import KH from './images/KH.png'; // Cambodia
import KI from './images/KI.png'; // Kiribati
import KM from './images/KM.png'; // Comoros
import KN from './images/KN.png'; // St. Kitts & Nevis
import KP from './images/KP.png'; // North Korea
import KR from './images/KR.png'; // South Korea
import KW from './images/KW.png'; // Kuwait
import KY from './images/KY.png'; // Cayman Islands
import KZ from './images/KZ.png'; // Kazakhstan
import LA from './images/LA.png'; // Laos
import LB from './images/LB.png'; // Lebanon
import LC from './images/LC.png'; // St. Lucia
import LI from './images/LI.png'; // Liechtenstein
import LK from './images/LK.png'; // Sri Lanka
import LR from './images/LR.png'; // Liberia
import LS from './images/LS.png'; // Lesotho
import LT from './images/LT.png'; // Lithuania
import LU from './images/LU.png'; // Luxembourg
import LV from './images/LV.png'; // Latvia
import LY from './images/LY.png'; // Libya
import MA from './images/MA.png'; // Morocco
import MC from './images/MC.png'; // Monaco
import MD from './images/MD.png'; // Moldova
import ME from './images/ME.png'; // Montenegro
import MF from './images/MF.png'; // St. Martin
import MG from './images/MG.png'; // Madagascar
import MH from './images/MH.png'; // Marshall Islands
import MK from './images/MK.png'; // Macedonia
import ML from './images/ML.png'; // Mali
import MM from './images/MM.png'; // Myanmar (Burma)
import MN from './images/MN.png'; // Mongolia
import MO from './images/MO.png'; // Macau (China)
import MP from './images/MP.png'; // Northern Mariana Islands
import MQ from './images/MQ.png'; // Martinique
import MR from './images/MR.png'; // Mauritania
import MS from './images/MS.png'; // Montserrat
import MT from './images/MT.png'; // Malta
import MU from './images/MU.png'; // Mauritius
import MV from './images/MV.png'; // Maldives
import MW from './images/MW.png'; // Malawi
import MX from './images/MX.png'; // Mexico
import MY from './images/MY.png'; // Malaysia
import MZ from './images/MZ.png'; // Mozambique
import NA from './images/NA.png'; // Namibia
import NC from './images/NC.png'; // New Caledonia
import NE from './images/NE.png'; // Niger
import NF from './images/NF.png'; // Norfolk Island
import NG from './images/NG.png'; // Nigeria
import NI from './images/NI.png'; // Nicaragua
import NL from './images/NL.png'; // Netherlands
import NO from './images/NO.png'; // Norway
import NP from './images/NP.png'; // Nepal
import NR from './images/NR.png'; // Nauru
import NU from './images/NU.png'; // Niue
import NZ from './images/NZ.png'; // New Zealand
import OM from './images/OM.png'; // Oman
import PA from './images/PA.png'; // Panama
import PE from './images/PE.png'; // Peru
import PF from './images/PF.png'; // French Polynesia
import PG from './images/PG.png'; // Papua New Guinea
import PH from './images/PH.png'; // Philippines
import PK from './images/PK.png'; // Pakistan
import PL from './images/PL.png'; // Poland
import PM from './images/PM.png'; // St. Pierre & Miquelon
import PR from './images/PR.png'; // Puerto Rico
import PS from './images/PS.png'; // Palestinian Territories
import PT from './images/PT.png'; // Portugal
import PW from './images/PW.png'; // Palau
import PY from './images/PY.png'; // Paraguay
import QA from './images/QA.png'; // Qatar
import RE from './images/RE.png'; // Réunion
import RO from './images/RO.png'; // Romania
import RS from './images/RS.png'; // Serbia
import RU from './images/RU.png'; // Russia
import RW from './images/RW.png'; // Rwanda
import SA from './images/SA.png'; // Saudi Arabia
import SB from './images/SB.png'; // Solomon Islands
import SC from './images/SC.png'; // Seychelles
import SD from './images/SD.png'; // Sudan
import SE from './images/SE.png'; // Sweden
import SG from './images/SG.png'; // Singapore
import SH from './images/SH.png'; // St. Helena
import SI from './images/SI.png'; // Slovenia
import SJ from './images/SJ.png'; // Svalbard & Jan Mayen
import SK from './images/SK.png'; // Slovakia
import SL from './images/SL.png'; // Sierra Leone
import SM from './images/SM.png'; // San Marino
import SN from './images/SN.png'; // Senegal
import SO from './images/SO.png'; // Somalia
import SR from './images/SR.png'; // Suriname
import SS from './images/SS.png'; // South Sudan
import ST from './images/ST.png'; // São Tomé & Príncipe
import SV from './images/SV.png'; // El Salvador
import SX from './images/SX.png'; // Sint Maarten
import SY from './images/SY.png'; // Syria
import SZ from './images/SZ.png'; // Swaziland
import TC from './images/TC.png'; // Turks & Caicos Islands
import TD from './images/TD.png'; // Chad
import TG from './images/TG.png'; // Togo
import TH from './images/TH.png'; // Thailand
import TJ from './images/TJ.png'; // Tajikistan
import TK from './images/TK.png'; // Tokelau
import TL from './images/TL.png'; // Timor-Leste
import TM from './images/TM.png'; // Turkmenistan
import TN from './images/TN.png'; // Tunisia
import TO from './images/TO.png'; // Tonga
import TR from './images/TR.png'; // Turkey
import TT from './images/TT.png'; // Trinidad & Tobago
import TV from './images/TV.png'; // Tuvalu
import TW from './images/TW.png'; // Taiwan
import TZ from './images/TZ.png'; // Tanzania
import UA from './images/UA.png'; // Ukraine
import UG from './images/UG.png'; // Uganda
import US from './images/US.png'; // United States
import UY from './images/UY.png'; // Uruguay
import UZ from './images/UZ.png'; // Uzbekistan
import VA from './images/VA.png'; // Vatican City
import VC from './images/VC.png'; // St. Vincent & Grenadines
import VE from './images/VE.png'; // Venezuela
import VG from './images/VG.png'; // British Virgin Islands
import VI from './images/VI.png'; // U.S. Virgin Islands
import VN from './images/VN.png'; // Vietnam
import VU from './images/VU.png'; // Vanuatu
import WF from './images/WF.png'; // Wallis & Futuna
import WS from './images/WS.png'; // Samoa
import XK from './images/XK.png'; // Kosovo
import YE from './images/YE.png'; // Yemen
import YT from './images/YT.png'; // Mayotte
import ZA from './images/ZA.png'; // South Africa
import ZM from './images/ZM.png'; // Zambia
import ZW from './images/ZW.png'; // Zimbabwe

export default {
  AD,
  AE,
  AF,
  AG,
  AI,
  AL,
  AM,
  AO,
  AR,
  AS,
  AT,
  AU,
  AW,
  AX,
  AZ,
  BA,
  BB,
  BD,
  BE,
  BF,
  BG,
  BH,
  BI,
  BJ,
  BL,
  BM,
  BN,
  BO,
  BR,
  BS,
  BT,
  BW,
  BY,
  BZ,
  CA,
  CC,
  CD,
  CF,
  CG,
  CH,
  CI,
  CK,
  CL,
  CM,
  CN,
  CO,
  CR,
  CU,
  CV,
  CW,
  CX,
  CY,
  CZ,
  DE,
  DJ,
  DK,
  DM,
  DO,
  DZ,
  EC,
  EE,
  EG,
  ER,
  ES,
  ET,
  FI,
  FJ,
  FK,
  FM,
  FO,
  FR,
  GA,
  GB,
  GD,
  GE,
  GF,
  GG,
  GH,
  GI,
  GL,
  GM,
  GN,
  GP,
  GQ,
  GR,
  GT,
  GU,
  GW,
  GY,
  HK,
  HN,
  HR,
  HT,
  HU,
  ID,
  IE,
  IL,
  IM,
  IN,
  IO,
  IQ,
  IR,
  IS,
  IT,
  JE,
  JM,
  JO,
  JP,
  KE,
  KG,
  KH,
  KI,
  KM,
  KN,
  KP,
  KR,
  KW,
  KY,
  KZ,
  LA,
  LB,
  LC,
  LI,
  LK,
  LR,
  LS,
  LT,
  LU,
  LV,
  LY,
  MA,
  MC,
  MD,
  ME,
  MF,
  MG,
  MH,
  MK,
  ML,
  MM,
  MN,
  MO,
  MP,
  MQ,
  MR,
  MS,
  MT,
  MU,
  MV,
  MW,
  MX,
  MY,
  MZ,
  NA,
  NC,
  NE,
  NF,
  NG,
  NI,
  NL,
  NO,
  NP,
  NR,
  NU,
  NZ,
  OM,
  PA,
  PE,
  PF,
  PG,
  PH,
  PK,
  PL,
  PM,
  PR,
  PS,
  PT,
  PW,
  PY,
  QA,
  RE,
  RO,
  RS,
  RU,
  RW,
  SA,
  SB,
  SC,
  SD,
  SE,
  SG,
  SH,
  SI,
  SJ,
  SK,
  SL,
  SM,
  SN,
  SO,
  SR,
  SS,
  ST,
  SV,
  SX,
  SY,
  SZ,
  TC,
  TD,
  TG,
  TH,
  TJ,
  TK,
  TL,
  TM,
  TN,
  TO,
  TR,
  TT,
  TV,
  TW,
  TZ,
  UA,
  UG,
  US,
  UY,
  UZ,
  VA,
  VC,
  VE,
  VG,
  VI,
  VN,
  VU,
  WF,
  WS,
  XK,
  YE,
  YT,
  ZA,
  ZM,
  ZW,
};
