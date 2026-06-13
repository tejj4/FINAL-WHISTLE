// API INTEGRATION POINT: Replace static exports with real API/fetch calls.

export const sports = [
  { id: 'football',          name: 'Football',          icon: '⚽', allowsDraw: true,  formatType: 'groups'  },
  { id: 'football_league',   name: 'Football',          icon: '⚽', allowsDraw: true,  formatType: 'league'  },
  { id: 'basketball',        name: 'Basketball',        icon: '🏀', allowsDraw: false, formatType: 'bracket' },
  { id: 'tennis',            name: 'Tennis',            icon: '🎾', allowsDraw: false, formatType: 'bracket' },
  { id: 'american_football', name: 'American Football', icon: '🏈', allowsDraw: false, formatType: 'league'  },
];

// strength: 60–98 (used to calculate popular pick percentages)
// bg/fg: placeholder brand colours — TODO replace comp-avatar div with <img src={comp.logoUrl} />
export const competitors = {

  // ── FIFA World Cup 2026 national teams (48) — official draw Dec 2024 ───────
  // Group A
  wc_mex: { id:'wc_mex', name:'Mexico',          abbr:'MEX', bg:'#006847', fg:'#fff',    strength:82 },
  wc_rsa: { id:'wc_rsa', name:'South Africa',    abbr:'RSA', bg:'#007A4D', fg:'#FFD700', strength:71 },
  wc_kor: { id:'wc_kor', name:'South Korea',     abbr:'KOR', bg:'#003478', fg:'#CD2E3A', strength:74 },
  wc_cze: { id:'wc_cze', name:'Czech Republic',  abbr:'CZE', bg:'#D7141A', fg:'#fff',    strength:75 },
  // Group B
  wc_can: { id:'wc_can', name:'Canada',          abbr:'CAN', bg:'#FF0000', fg:'#fff',    strength:78 },
  wc_bih: { id:'wc_bih', name:'Bosnia & Herz.',  abbr:'BIH', bg:'#003399', fg:'#FFCC00', strength:71 },
  wc_qat: { id:'wc_qat', name:'Qatar',           abbr:'QAT', bg:'#8D1B3D', fg:'#fff',    strength:65 },
  wc_sui: { id:'wc_sui', name:'Switzerland',     abbr:'SUI', bg:'#D52B1E', fg:'#fff',    strength:79 },
  // Group C
  wc_bra: { id:'wc_bra', name:'Brazil',          abbr:'BRA', bg:'#009C3B', fg:'#FEDD00', strength:93 },
  wc_mar: { id:'wc_mar', name:'Morocco',         abbr:'MAR', bg:'#C1272D', fg:'#fff',    strength:80 },
  wc_hai: { id:'wc_hai', name:'Haiti',           abbr:'HAI', bg:'#00209F', fg:'#D21034', strength:60 },
  wc_sco: { id:'wc_sco', name:'Scotland',        abbr:'SCO', bg:'#003DA5', fg:'#fff',    strength:72 },
  // Group D
  wc_usa: { id:'wc_usa', name:'USA',             abbr:'USA', bg:'#B22234', fg:'#fff',    strength:80 },
  wc_par: { id:'wc_par', name:'Paraguay',        abbr:'PAR', bg:'#D52B1E', fg:'#fff',    strength:72 },
  wc_aus: { id:'wc_aus', name:'Australia',       abbr:'AUS', bg:'#00843D', fg:'#FFD700', strength:69 },
  wc_tur: { id:'wc_tur', name:'Türkiye',         abbr:'TUR', bg:'#E30A17', fg:'#fff',    strength:77 },
  // Group E
  wc_ger: { id:'wc_ger', name:'Germany',         abbr:'GER', bg:'#2C2C2C', fg:'#fff',    strength:86 },
  wc_cur: { id:'wc_cur', name:'Curaçao',         abbr:'CUR', bg:'#002B7F', fg:'#F9E300', strength:61 },
  wc_civ: { id:'wc_civ', name:"Ivory Coast",     abbr:'CIV', bg:'#F77F00', fg:'#fff',    strength:74 },
  wc_ecu: { id:'wc_ecu', name:'Ecuador',         abbr:'ECU', bg:'#FFD100', fg:'#034694', strength:72 },
  // Group F
  wc_ned: { id:'wc_ned', name:'Netherlands',     abbr:'NED', bg:'#CC4400', fg:'#fff',    strength:85 },
  wc_jpn: { id:'wc_jpn', name:'Japan',           abbr:'JPN', bg:'#BC002D', fg:'#fff',    strength:75 },
  wc_swe: { id:'wc_swe', name:'Sweden',          abbr:'SWE', bg:'#006AA7', fg:'#FECC02', strength:78 },
  wc_tun: { id:'wc_tun', name:'Tunisia',         abbr:'TUN', bg:'#E70013', fg:'#fff',    strength:68 },
  // Group G
  wc_bel: { id:'wc_bel', name:'Belgium',         abbr:'BEL', bg:'#000',    fg:'#ED2939', strength:83 },
  wc_egy: { id:'wc_egy', name:'Egypt',           abbr:'EGY', bg:'#CE1126', fg:'#fff',    strength:70 },
  wc_irn: { id:'wc_irn', name:'Iran',            abbr:'IRN', bg:'#239F40', fg:'#fff',    strength:70 },
  wc_nzl: { id:'wc_nzl', name:'New Zealand',     abbr:'NZL', bg:'#00247D', fg:'#fff',    strength:63 },
  // Group H
  wc_esp: { id:'wc_esp', name:'Spain',           abbr:'ESP', bg:'#AA151B', fg:'#F1BF00', strength:91 },
  wc_cpv: { id:'wc_cpv', name:'Cabo Verde',      abbr:'CPV', bg:'#003893', fg:'#CF2027', strength:62 },
  wc_ksa: { id:'wc_ksa', name:'Saudi Arabia',    abbr:'KSA', bg:'#165D31', fg:'#fff',    strength:67 },
  wc_uru: { id:'wc_uru', name:'Uruguay',         abbr:'URU', bg:'#5AAAD0', fg:'#fff',    strength:82 },
  // Group I
  wc_fra: { id:'wc_fra', name:'France',          abbr:'FRA', bg:'#002395', fg:'#fff',    strength:92 },
  wc_sen: { id:'wc_sen', name:'Senegal',         abbr:'SEN', bg:'#00853F', fg:'#FDEF42', strength:78 },
  wc_irq: { id:'wc_irq', name:'Iraq',            abbr:'IRQ', bg:'#CE1126', fg:'#000',    strength:63 },
  wc_nor: { id:'wc_nor', name:'Norway',          abbr:'NOR', bg:'#EF2B2D', fg:'#fff',    strength:80 },
  // Group J
  wc_arg: { id:'wc_arg', name:'Argentina',       abbr:'ARG', bg:'#74ACDF', fg:'#fff',    strength:95 },
  wc_alg: { id:'wc_alg', name:'Algeria',         abbr:'ALG', bg:'#006233', fg:'#fff',    strength:73 },
  wc_aut: { id:'wc_aut', name:'Austria',         abbr:'AUT', bg:'#ED2939', fg:'#fff',    strength:78 },
  wc_jor: { id:'wc_jor', name:'Jordan',          abbr:'JOR', bg:'#007A3D', fg:'#fff',    strength:66 },
  // Group K
  wc_por: { id:'wc_por', name:'Portugal',        abbr:'POR', bg:'#006600', fg:'#fff',    strength:88 },
  wc_cod: { id:'wc_cod', name:'DR Congo',        abbr:'COD', bg:'#007FFF', fg:'#F7D900', strength:69 },
  wc_uzb: { id:'wc_uzb', name:'Uzbekistan',      abbr:'UZB', bg:'#1EB53A', fg:'#fff',    strength:65 },
  wc_col: { id:'wc_col', name:'Colombia',        abbr:'COL', bg:'#B8A000', fg:'#003087', strength:81 },
  // Group L
  wc_eng: { id:'wc_eng', name:'England',         abbr:'ENG', bg:'#012169', fg:'#fff',    strength:88 },
  wc_cro: { id:'wc_cro', name:'Croatia',         abbr:'CRO', bg:'#0D3C96', fg:'#fff',    strength:83 },
  wc_gha: { id:'wc_gha', name:'Ghana',           abbr:'GHA', bg:'#006B3F', fg:'#FCD116', strength:68 },
  wc_pan: { id:'wc_pan', name:'Panama',          abbr:'PAN', bg:'#DA121A', fg:'#fff',    strength:64 },

  // ── UEFA Champions League clubs (16) ─────────────────────────────────────
  cl_rma: { id:'cl_rma', name:'Real Madrid',     abbr:'RMA', bg:'#5A3E85', fg:'#FEBE10', strength:96 },
  cl_mci: { id:'cl_mci', name:'Man City',         abbr:'MCI', bg:'#6CABDD', fg:'#1C2C5B', strength:94 },
  cl_ars: { id:'cl_ars', name:'Arsenal',          abbr:'ARS', bg:'#EF0107', fg:'#fff',    strength:88 },
  cl_fcb: { id:'cl_fcb', name:'Barcelona',        abbr:'FCB', bg:'#004D98', fg:'#A50044', strength:91 },
  cl_bay: { id:'cl_bay', name:'Bayern',           abbr:'BAY', bg:'#DC052D', fg:'#fff',    strength:92 },
  cl_psg: { id:'cl_psg', name:'PSG',              abbr:'PSG', bg:'#004170', fg:'#DA291C', strength:89 },
  cl_liv: { id:'cl_liv', name:'Liverpool',        abbr:'LIV', bg:'#C8102E', fg:'#F6EB61', strength:90 },
  cl_atm: { id:'cl_atm', name:'Atlético',         abbr:'ATM', bg:'#CE3524', fg:'#fff',    strength:86 },
  cl_int: { id:'cl_int', name:'Inter',            abbr:'INT', bg:'#010E80', fg:'#fff',    strength:84 },
  cl_bvb: { id:'cl_bvb', name:'Dortmund',         abbr:'BVB', bg:'#B8A000', fg:'#2C2C2C',strength:83 },
  cl_juv: { id:'cl_juv', name:'Juventus',         abbr:'JUV', bg:'#2C2C2C', fg:'#fff',    strength:81 },
  cl_nap: { id:'cl_nap', name:'Napoli',           abbr:'NAP', bg:'#12A0C3', fg:'#fff',    strength:80 },
  cl_por: { id:'cl_por', name:'Porto',            abbr:'POR', bg:'#003087', fg:'#FEDD00', strength:79 },
  cl_aja: { id:'cl_aja', name:'Ajax',             abbr:'AJA', bg:'#D2122E', fg:'#fff',    strength:78 },
  cl_slb: { id:'cl_slb', name:'Benfica',          abbr:'SLB', bg:'#B22222', fg:'#fff',    strength:77 },
  cl_cel: { id:'cl_cel', name:'Celtic',           abbr:'CEL', bg:'#169B62', fg:'#fff',    strength:74 },

  // ── Premier League 2026/27 (20 teams) ────────────────────────────────────
  epl_mci: { id:'epl_mci', name:'Man City',        abbr:'MCI', bg:'#6CABDD', fg:'#1C2C5B', strength:94 },
  epl_liv: { id:'epl_liv', name:'Liverpool',       abbr:'LIV', bg:'#C8102E', fg:'#F6EB61', strength:91 },
  epl_ars: { id:'epl_ars', name:'Arsenal',         abbr:'ARS', bg:'#EF0107', fg:'#fff',    strength:88 },
  epl_avl: { id:'epl_avl', name:'Aston Villa',     abbr:'AVL', bg:'#95BFE5', fg:'#670E36', strength:84 },
  epl_che: { id:'epl_che', name:'Chelsea',         abbr:'CHE', bg:'#034694', fg:'#fff',    strength:86 },
  epl_new: { id:'epl_new', name:'Newcastle',       abbr:'NEW', bg:'#241F20', fg:'#fff',    strength:82 },
  epl_mun: { id:'epl_mun', name:'Man United',      abbr:'MUN', bg:'#DA291C', fg:'#fff',    strength:83 },
  epl_tot: { id:'epl_tot', name:'Spurs',           abbr:'TOT', bg:'#132257', fg:'#fff',    strength:80 },
  epl_bha: { id:'epl_bha', name:'Brighton',        abbr:'BHA', bg:'#0057B8', fg:'#fff',    strength:78 },
  epl_whu: { id:'epl_whu', name:'West Ham',        abbr:'WHU', bg:'#7A263A', fg:'#1BB1E7', strength:76 },
  epl_nfo: { id:'epl_nfo', name:'Nott\'m Forest',  abbr:'NFO', bg:'#DD0000', fg:'#fff',    strength:74 },
  epl_ful: { id:'epl_ful', name:'Fulham',          abbr:'FUL', bg:'#CC0000', fg:'#fff',    strength:74 },
  epl_bou: { id:'epl_bou', name:'Bournemouth',     abbr:'BOU', bg:'#DA291C', fg:'#000',    strength:73 },
  epl_cry: { id:'epl_cry', name:'Crystal Palace',  abbr:'CRY', bg:'#1B458F', fg:'#C4122E', strength:73 },
  epl_bre: { id:'epl_bre', name:'Brentford',       abbr:'BRE', bg:'#E30613', fg:'#fff',    strength:75 },
  epl_wol: { id:'epl_wol', name:'Wolves',          abbr:'WOL', bg:'#FDB913', fg:'#231F20', strength:72 },
  epl_eve: { id:'epl_eve', name:'Everton',         abbr:'EVE', bg:'#003399', fg:'#fff',    strength:71 },
  epl_lee: { id:'epl_lee', name:'Leeds United',    abbr:'LEE', bg:'#FFCD00', fg:'#1D428A', strength:76 },
  epl_bur: { id:'epl_bur', name:'Burnley',         abbr:'BUR', bg:'#6C1D45', fg:'#99D6EA', strength:72 },
  epl_sun: { id:'epl_sun', name:'Sunderland',      abbr:'SUN', bg:'#EB172B', fg:'#000',    strength:70 },

  // ── La Liga 2026/27 (20 teams) ────────────────────────────────────────────
  ll_rma: { id:'ll_rma', name:'Real Madrid',      abbr:'RMA', bg:'#5A3E85', fg:'#FEBE10', strength:96 },
  ll_bar: { id:'ll_bar', name:'Barcelona',        abbr:'BAR', bg:'#004D98', fg:'#A50044', strength:91 },
  ll_atm: { id:'ll_atm', name:'Atlético Madrid',  abbr:'ATM', bg:'#CE3524', fg:'#fff',    strength:86 },
  ll_ath: { id:'ll_ath', name:'Athletic Bilbao',  abbr:'ATH', bg:'#EE2523', fg:'#fff',    strength:81 },
  ll_rso: { id:'ll_rso', name:'Real Sociedad',    abbr:'RSO', bg:'#0059A4', fg:'#fff',    strength:80 },
  ll_vil: { id:'ll_vil', name:'Villarreal',       abbr:'VIL', bg:'#FFCB00', fg:'#1A4C99', strength:79 },
  ll_sev: { id:'ll_sev', name:'Sevilla',          abbr:'SEV', bg:'#D71920', fg:'#fff',    strength:80 },
  ll_bet: { id:'ll_bet', name:'Real Betis',       abbr:'BET', bg:'#00954C', fg:'#fff',    strength:79 },
  ll_val: { id:'ll_val', name:'Valencia',         abbr:'VAL', bg:'#EE7200', fg:'#000',    strength:78 },
  ll_gir: { id:'ll_gir', name:'Girona',           abbr:'GIR', bg:'#CD1519', fg:'#fff',    strength:77 },
  ll_cel: { id:'ll_cel', name:'Celta Vigo',       abbr:'CEL', bg:'#87CEEB', fg:'#fff',    strength:73 },
  ll_osa: { id:'ll_osa', name:'Osasuna',          abbr:'OSA', bg:'#B22222', fg:'#fff',    strength:72 },
  ll_mal: { id:'ll_mal', name:'Mallorca',         abbr:'MAL', bg:'#DC143C', fg:'#000',    strength:72 },
  ll_get: { id:'ll_get', name:'Getafe',           abbr:'GET', bg:'#0056A2', fg:'#fff',    strength:71 },
  ll_ray: { id:'ll_ray', name:'Rayo Vallecano',   abbr:'RAY', bg:'#FF0000', fg:'#fff',    strength:70 },
  ll_lpa: { id:'ll_lpa', name:'Las Palmas',       abbr:'LPA', bg:'#F5C518', fg:'#003087', strength:70 },
  ll_esp: { id:'ll_esp', name:'Espanyol',         abbr:'ESP', bg:'#0070B8', fg:'#FFD700', strength:69 },
  ll_ala: { id:'ll_ala', name:'Alavés',           abbr:'ALA', bg:'#003087', fg:'#fff',    strength:68 },
  ll_gra: { id:'ll_gra', name:'Granada',          abbr:'GRA', bg:'#DA291C', fg:'#1F6B2B', strength:67 },
  ll_cad: { id:'ll_cad', name:'Cádiz',            abbr:'CAD', bg:'#F5C518', fg:'#003087', strength:66 },

  // ── Ligue 1 McDonald's 2026/27 (18 teams) ────────────────────────────────
  l1_psg: { id:'l1_psg', name:'PSG',             abbr:'PSG', bg:'#004170', fg:'#DA291C', strength:93 },
  l1_mar: { id:'l1_mar', name:'Marseille',       abbr:'MAR', bg:'#00A0E9', fg:'#fff',    strength:84 },
  l1_lyo: { id:'l1_lyo', name:'Lyon',            abbr:'LYO', bg:'#0044A9', fg:'#DA291C', strength:82 },
  l1_mon: { id:'l1_mon', name:'Monaco',          abbr:'MON', bg:'#DA291C', fg:'#fff',    strength:83 },
  l1_lil: { id:'l1_lil', name:'Lille',           abbr:'LIL', bg:'#C8102E', fg:'#fff',    strength:81 },
  l1_len: { id:'l1_len', name:'Lens',            abbr:'LEN', bg:'#F8B91C', fg:'#DA291C', strength:80 },
  l1_nic: { id:'l1_nic', name:'Nice',            abbr:'NIC', bg:'#000000', fg:'#DA291C', strength:79 },
  l1_ren: { id:'l1_ren', name:'Rennes',          abbr:'REN', bg:'#DA291C', fg:'#000',    strength:78 },
  l1_brs: { id:'l1_brs', name:'Brest',           abbr:'BRS', bg:'#DA291C', fg:'#fff',    strength:77 },
  l1_str: { id:'l1_str', name:'Strasbourg',      abbr:'STR', bg:'#003087', fg:'#DA291C', strength:73 },
  l1_rei: { id:'l1_rei', name:'Reims',           abbr:'REI', bg:'#DA291C', fg:'#fff',    strength:72 },
  l1_nan: { id:'l1_nan', name:'Nantes',          abbr:'NAN', bg:'#F5C518', fg:'#000',    strength:71 },
  l1_tou: { id:'l1_tou', name:'Toulouse',        abbr:'TOU', bg:'#8A1A2C', fg:'#fff',    strength:72 },
  l1_mon2:{ id:'l1_mon2',name:'Montpellier',     abbr:'MTP', bg:'#F77F00', fg:'#003087', strength:70 },
  l1_lhv: { id:'l1_lhv', name:'Le Havre',        abbr:'LHV', bg:'#0044A9', fg:'#fff',    strength:68 },
  l1_aux: { id:'l1_aux', name:'Auxerre',         abbr:'AUX', bg:'#003087', fg:'#fff',    strength:67 },
  l1_ang: { id:'l1_ang', name:'Angers',          abbr:'ANG', bg:'#000', fg:'#fff',        strength:66 },
  l1_metz:{ id:'l1_metz',name:'Metz',            abbr:'MTZ', bg:'#8B0000', fg:'#FFD700', strength:69 },

  // ── Süper Lig 2026/27 (18 teams) ─────────────────────────────────────────
  sl_gal: { id:'sl_gal', name:'Galatasaray',     abbr:'GAL', bg:'#DA291C', fg:'#F5C518', strength:85 },
  sl_fen: { id:'sl_fen', name:'Fenerbahçe',      abbr:'FEN', bg:'#003087', fg:'#F5C518', strength:84 },
  sl_bes: { id:'sl_bes', name:'Beşiktaş',        abbr:'BES', bg:'#000', fg:'#fff',        strength:81 },
  sl_tra: { id:'sl_tra', name:'Trabzonspor',      abbr:'TRA', bg:'#8B0000', fg:'#FFA500', strength:79 },
  sl_bas: { id:'sl_bas', name:'Başakşehir',      abbr:'BAS', bg:'#FF6600', fg:'#fff',    strength:78 },
  sl_eyu: { id:'sl_eyu', name:'Eyüpspor',        abbr:'EYU', bg:'#6B2D8B', fg:'#fff',    strength:73 },
  sl_sam: { id:'sl_sam', name:'Samsunspor',      abbr:'SAM', bg:'#DA291C', fg:'#fff',    strength:70 },
  sl_ank: { id:'sl_ank', name:'Ankaragücü',      abbr:'ANK', bg:'#003087', fg:'#DA291C', strength:69 },
  sl_bod: { id:'sl_bod', name:'Bodrum FK',       abbr:'BOD', bg:'#003087', fg:'#fff',    strength:67 },
  sl_ant: { id:'sl_ant', name:'Antalyaspor',     abbr:'ANT', bg:'#DA291C', fg:'#fff',    strength:69 },
  sl_gaz: { id:'sl_gaz', name:'Gaziantep',       abbr:'GAZ', bg:'#CC0000', fg:'#fff',    strength:68 },
  sl_hat: { id:'sl_hat', name:'Hatayspor',       abbr:'HAT', bg:'#006400', fg:'#fff',    strength:68 },
  sl_kon: { id:'sl_kon', name:'Konyaspor',       abbr:'KON', bg:'#006400', fg:'#fff',    strength:70 },
  sl_siv: { id:'sl_siv', name:'Sivasspor',       abbr:'SIV', bg:'#DC143C', fg:'#FFD700', strength:71 },
  sl_kay: { id:'sl_kay', name:'Kayserispor',     abbr:'KAY', bg:'#DA291C', fg:'#FFD700', strength:70 },
  sl_kas: { id:'sl_kas', name:'Kasımpaşa',       abbr:'KAS', bg:'#DA291C', fg:'#fff',    strength:71 },
  sl_riz: { id:'sl_riz', name:'Rizespor',        abbr:'RIZ', bg:'#006400', fg:'#fff',    strength:67 },
  sl_ala: { id:'sl_ala', name:'Alanyaspor',      abbr:'ALA', bg:'#FF6600', fg:'#fff',    strength:72 },

  // ── NBA Playoffs 2026 (16 teams) ─────────────────────────────────────────
  // Eastern Conference
  nba_bos: { id:'nba_bos', name:'Boston',        abbr:'BOS', bg:'#007A33', fg:'#BA9653', strength:91 },
  nba_cle: { id:'nba_cle', name:'Cleveland',     abbr:'CLE', bg:'#860038', fg:'#FDBB30', strength:85 },
  nba_mil: { id:'nba_mil', name:'Milwaukee',     abbr:'MIL', bg:'#00471B', fg:'#EEE1C6', strength:84 },
  nba_nyk: { id:'nba_nyk', name:'New York',      abbr:'NYK', bg:'#006BB6', fg:'#F58426', strength:83 },
  nba_ind: { id:'nba_ind', name:'Indiana',       abbr:'IND', bg:'#002D62', fg:'#FDBB30', strength:79 },
  nba_phi: { id:'nba_phi', name:'Philadelphia',  abbr:'PHI', bg:'#006BB6', fg:'#ED174C', strength:78 },
  nba_mia: { id:'nba_mia', name:'Miami',         abbr:'MIA', bg:'#98002E', fg:'#F9A01B', strength:76 },
  nba_atl: { id:'nba_atl', name:'Atlanta',       abbr:'ATL', bg:'#C1D32F', fg:'#E03A3E', strength:73 },
  // Western Conference
  nba_okc: { id:'nba_okc', name:'OKC Thunder',   abbr:'OKC', bg:'#007AC1', fg:'#EF3B24', strength:88 },
  nba_min: { id:'nba_min', name:'Minnesota',     abbr:'MIN', bg:'#0C2340', fg:'#236192', strength:87 },
  nba_lal: { id:'nba_lal', name:'LA Lakers',     abbr:'LAL', bg:'#552583', fg:'#FDB927', strength:84 },
  nba_den: { id:'nba_den', name:'Denver',        abbr:'DEN', bg:'#0E2240', fg:'#FEC524', strength:86 },
  nba_gsw: { id:'nba_gsw', name:'Golden State',  abbr:'GSW', bg:'#1D428A', fg:'#FFC72C', strength:82 },
  nba_sac: { id:'nba_sac', name:'Sacramento',    abbr:'SAC', bg:'#5A2D81', fg:'#63727A', strength:79 },
  nba_dal: { id:'nba_dal', name:'Dallas',        abbr:'DAL', bg:'#00538C', fg:'#B8C4CA', strength:81 },
  nba_nop: { id:'nba_nop', name:'New Orleans',   abbr:'NOP', bg:'#0C2340', fg:'#85714D', strength:74 },

  // ── Wimbledon 2026 — top 32 players ──────────────────────────────────────
  w_sin:  { id:'w_sin',  name:'J. Sinner',    abbr:'SIN', bg:'#2D6A4F', fg:'#fff', strength:97 },
  w_alca: { id:'w_alca', name:'C. Alcaraz',   abbr:'ALC', bg:'#E85D04', fg:'#fff', strength:96 },
  w_djok: { id:'w_djok', name:'N. Djokovic',  abbr:'DJO', bg:'#C8102E', fg:'#fff', strength:95 },
  w_med:  { id:'w_med',  name:'D. Medvedev',  abbr:'MED', bg:'#1D3557', fg:'#fff', strength:90 },
  w_zve:  { id:'w_zve',  name:'A. Zverev',    abbr:'ZVE', bg:'#C15000', fg:'#fff', strength:89 },
  w_fri:  { id:'w_fri',  name:'T. Fritz',     abbr:'FRI', bg:'#A0001A', fg:'#fff', strength:86 },
  w_run:  { id:'w_run',  name:'H. Rune',      abbr:'RUN', bg:'#7B2D8B', fg:'#fff', strength:85 },
  w_hum:  { id:'w_hum',  name:'A. Humbert',   abbr:'HUM', bg:'#023E8A', fg:'#fff', strength:84 },
  w_tsi:  { id:'w_tsi',  name:'S. Tsitsipas', abbr:'TSI', bg:'#0066CC', fg:'#fff', strength:83 },
  w_dim:  { id:'w_dim',  name:'G. Dimitrov',  abbr:'DIM', bg:'#006400', fg:'#fff', strength:82 },
  w_she:  { id:'w_she',  name:'B. Shelton',   abbr:'SHE', bg:'#003087', fg:'#fff', strength:81 },
  w_pau:  { id:'w_pau',  name:'T. Paul',      abbr:'PAU', bg:'#B22234', fg:'#fff', strength:80 },
  w_dem:  { id:'w_dem',  name:'A. de Minaur', abbr:'DEM', bg:'#003087', fg:'#FFD700', strength:80 },
  w_mus:  { id:'w_mus',  name:'L. Musetti',   abbr:'MUS', bg:'#009246', fg:'#fff', strength:79 },
  w_nor:  { id:'w_nor',  name:'C. Norrie',    abbr:'NOR', bg:'#012169', fg:'#fff', strength:78 },
  w_ber:  { id:'w_ber',  name:'M. Berrettini',abbr:'BER', bg:'#009246', fg:'#fff', strength:78 },
  w_dra:  { id:'w_dra',  name:'J. Draper',    abbr:'DRA', bg:'#012169', fg:'#fff', strength:77 },
  w_ruu:  { id:'w_ruu',  name:'C. Ruud',      abbr:'RUU', bg:'#003087', fg:'#fff', strength:77 },
  w_cer:  { id:'w_cer',  name:'F. Cerundolo', abbr:'CER', bg:'#74ACDF', fg:'#fff', strength:76 },
  w_tia:  { id:'w_tia',  name:'F. Tiafoe',    abbr:'TIA', bg:'#B22234', fg:'#fff', strength:75 },
  w_kha:  { id:'w_kha',  name:'K. Khachanov', abbr:'KHA', bg:'#CC0000', fg:'#fff', strength:75 },
  w_bub:  { id:'w_bub',  name:'A. Bublik',    abbr:'BUB', bg:'#003087', fg:'#FFD700', strength:74 },
  w_mac:  { id:'w_mac',  name:'T. Machac',    abbr:'MAC', bg:'#003087', fg:'#DA291C', strength:74 },
  w_str:  { id:'w_str',  name:'J-L. Struff',  abbr:'STR', bg:'#2C2C2C', fg:'#fff', strength:73 },
  w_kok:  { id:'w_kok',  name:'T. Kokkinakis',abbr:'KOK', bg:'#003087', fg:'#FFD700', strength:73 },
  w_nav:  { id:'w_nav',  name:'M. Navone',    abbr:'NAV', bg:'#74ACDF', fg:'#fff', strength:73 },
  w_dar:  { id:'w_dar',  name:'L. Darderi',   abbr:'DAR', bg:'#009246', fg:'#fff', strength:72 },
  w_com:  { id:'w_com',  name:'S. Comesana',  abbr:'COM', bg:'#74ACDF', fg:'#fff', strength:72 },
  w_bor:  { id:'w_bor',  name:'N. Borges',    abbr:'BOR', bg:'#006600', fg:'#fff', strength:71 },
  w_nak:  { id:'w_nak',  name:'B. Nakashima', abbr:'NAK', bg:'#B22234', fg:'#fff', strength:71 },
  w_fog:  { id:'w_fog',  name:'F. Fognini',   abbr:'FOG', bg:'#009246', fg:'#fff', strength:70 },
  w_laj:  { id:'w_laj',  name:'D. Lajovic',   abbr:'LAJ', bg:'#C6363C', fg:'#fff', strength:70 },

  // ── NFL 2026/27 (32 teams) ───────────────────────────────────────────────
  // NFC East
  nfl_phi: { id:'nfl_phi', name:'Eagles',      abbr:'PHI', bg:'#004C54', fg:'#A5ACAF', strength:82 },
  nfl_nyg: { id:'nfl_nyg', name:'Giants',      abbr:'NYG', bg:'#0B2265', fg:'#A71930', strength:72 },
  nfl_dal: { id:'nfl_dal', name:'Cowboys',     abbr:'DAL', bg:'#003594', fg:'#869397', strength:83 },
  nfl_was: { id:'nfl_was', name:'Commanders',  abbr:'WAS', bg:'#5A1414', fg:'#FFB612', strength:75 },
  // NFC North
  nfl_gnb: { id:'nfl_gnb', name:'Packers',     abbr:'GNB', bg:'#203731', fg:'#FFB612', strength:80 },
  nfl_chi: { id:'nfl_chi', name:'Bears',       abbr:'CHI', bg:'#0B162A', fg:'#C83803', strength:71 },
  nfl_min: { id:'nfl_min', name:'Vikings',     abbr:'MIN', bg:'#4F2683', fg:'#FFC62F', strength:78 },
  nfl_det: { id:'nfl_det', name:'Lions',       abbr:'DET', bg:'#0076B6', fg:'#B0B7BC', strength:82 },
  // NFC South
  nfl_tam: { id:'nfl_tam', name:'Buccaneers',  abbr:'TAM', bg:'#D50A0A', fg:'#FF7900', strength:76 },
  nfl_nor: { id:'nfl_nor', name:'Saints',      abbr:'NOR', bg:'#D3BC8D', fg:'#101820', strength:73 },
  nfl_atl: { id:'nfl_atl', name:'Falcons',     abbr:'ATL', bg:'#A71930', fg:'#000',    strength:74 },
  nfl_car: { id:'nfl_car', name:'Panthers',    abbr:'CAR', bg:'#0085CA', fg:'#101820', strength:68 },
  // NFC West
  nfl_sfo: { id:'nfl_sfo', name:'49ers',       abbr:'SFO', bg:'#AA0000', fg:'#B3995D', strength:86 },
  nfl_sea: { id:'nfl_sea', name:'Seahawks',    abbr:'SEA', bg:'#002244', fg:'#69BE28', strength:76 },
  nfl_lar: { id:'nfl_lar', name:'Rams',        abbr:'LAR', bg:'#003594', fg:'#FFA300', strength:79 },
  nfl_ari: { id:'nfl_ari', name:'Cardinals',   abbr:'ARI', bg:'#97233F', fg:'#000',    strength:70 },
  // AFC East
  nfl_nwe: { id:'nfl_nwe', name:'Patriots',    abbr:'NWE', bg:'#002244', fg:'#C60C30', strength:72 },
  nfl_buf: { id:'nfl_buf', name:'Bills',       abbr:'BUF', bg:'#00338D', fg:'#C60C30', strength:85 },
  nfl_nyj: { id:'nfl_nyj', name:'Jets',        abbr:'NYJ', bg:'#125740', fg:'#fff',    strength:73 },
  nfl_mia: { id:'nfl_mia', name:'Dolphins',    abbr:'MIA', bg:'#008E97', fg:'#FC4C02', strength:80 },
  // AFC North
  nfl_rav: { id:'nfl_rav', name:'Ravens',      abbr:'RAV', bg:'#241773', fg:'#9E7C0C', strength:87 },
  nfl_pit: { id:'nfl_pit', name:'Steelers',    abbr:'PIT', bg:'#FFB612', fg:'#101820', strength:78 },
  nfl_cin: { id:'nfl_cin', name:'Bengals',     abbr:'CIN', bg:'#FB4F14', fg:'#000',    strength:82 },
  nfl_cle: { id:'nfl_cle', name:'Browns',      abbr:'CLE', bg:'#311D00', fg:'#FF3C00', strength:75 },
  // AFC South
  nfl_ind: { id:'nfl_ind', name:'Colts',       abbr:'IND', bg:'#002C5F', fg:'#A2AAAD', strength:74 },
  nfl_hou: { id:'nfl_hou', name:'Texans',      abbr:'HOU', bg:'#03202F', fg:'#A71930', strength:80 },
  nfl_jax: { id:'nfl_jax', name:'Jaguars',     abbr:'JAX', bg:'#006778', fg:'#D7A22A', strength:73 },
  nfl_ten: { id:'nfl_ten', name:'Titans',      abbr:'TEN', bg:'#0C2340', fg:'#4B92DB', strength:70 },
  // AFC West
  nfl_kan: { id:'nfl_kan', name:'Chiefs',      abbr:'KAN', bg:'#E31837', fg:'#FFB81C', strength:92 },
  nfl_lvr: { id:'nfl_lvr', name:'Raiders',     abbr:'LVR', bg:'#000', fg:'#A5ACAF',    strength:71 },
  nfl_lac: { id:'nfl_lac', name:'Chargers',    abbr:'LAC', bg:'#0080C6', fg:'#FFC20E', strength:78 },
  nfl_den: { id:'nfl_den', name:'Broncos',     abbr:'DEN', bg:'#FB4F14', fg:'#002244', strength:73 },
};

export const tournaments = [

  // ════════════════════════════════════════════════════════════════
  // FOOTBALL — WORLD CUP 2026  (LIVE)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'world-cup-2026',
    sportId: 'football',
    name: 'FIFA World Cup 2026',
    startDate: '2026-06-11',
    endDate:   '2026-07-19',
    formatType: 'groups',
    groups: [
      { id:'A', name:'Group A', competitorIds:['wc_mex','wc_rsa','wc_kor','wc_cze']  },
      { id:'B', name:'Group B', competitorIds:['wc_can','wc_bih','wc_qat','wc_sui']  },
      { id:'C', name:'Group C', competitorIds:['wc_bra','wc_mar','wc_hai','wc_sco']  },
      { id:'D', name:'Group D', competitorIds:['wc_usa','wc_par','wc_aus','wc_tur']  },
      { id:'E', name:'Group E', competitorIds:['wc_ger','wc_cur','wc_civ','wc_ecu']  },
      { id:'F', name:'Group F', competitorIds:['wc_ned','wc_jpn','wc_swe','wc_tun']  },
      { id:'G', name:'Group G', competitorIds:['wc_bel','wc_egy','wc_irn','wc_nzl']  },
      { id:'H', name:'Group H', competitorIds:['wc_esp','wc_cpv','wc_ksa','wc_uru']  },
      { id:'I', name:'Group I', competitorIds:['wc_fra','wc_sen','wc_irq','wc_nor']  },
      { id:'J', name:'Group J', competitorIds:['wc_arg','wc_alg','wc_aut','wc_jor']  },
      { id:'K', name:'Group K', competitorIds:['wc_por','wc_cod','wc_uzb','wc_col']  },
      { id:'L', name:'Group L', competitorIds:['wc_eng','wc_cro','wc_gha','wc_pan']  },
    ],
    // Top 2 from each group (24) + best 8 third-placed = 32 teams in R32.
    // Matches 12–15 use best3rd sources (resolved dynamically in format.js).
    knockoutRounds: [
      {
        id:'r32', name:'Round of 32',
        matches: [
          { id:'wc_r32_0',  homeSource:{type:'group',groupId:'A',pos:1}, awaySource:{type:'group',groupId:'B',pos:2} },
          { id:'wc_r32_1',  homeSource:{type:'group',groupId:'C',pos:2}, awaySource:{type:'group',groupId:'D',pos:1} },
          { id:'wc_r32_2',  homeSource:{type:'group',groupId:'B',pos:1}, awaySource:{type:'group',groupId:'A',pos:2} },
          { id:'wc_r32_3',  homeSource:{type:'group',groupId:'D',pos:2}, awaySource:{type:'group',groupId:'C',pos:1} },
          { id:'wc_r32_4',  homeSource:{type:'group',groupId:'E',pos:1}, awaySource:{type:'group',groupId:'F',pos:2} },
          { id:'wc_r32_5',  homeSource:{type:'group',groupId:'G',pos:2}, awaySource:{type:'group',groupId:'H',pos:1} },
          { id:'wc_r32_6',  homeSource:{type:'group',groupId:'F',pos:1}, awaySource:{type:'group',groupId:'E',pos:2} },
          { id:'wc_r32_7',  homeSource:{type:'group',groupId:'H',pos:2}, awaySource:{type:'group',groupId:'G',pos:1} },
          { id:'wc_r32_8',  homeSource:{type:'group',groupId:'I',pos:1}, awaySource:{type:'group',groupId:'J',pos:2} },
          { id:'wc_r32_9',  homeSource:{type:'group',groupId:'K',pos:2}, awaySource:{type:'group',groupId:'L',pos:1} },
          { id:'wc_r32_10', homeSource:{type:'group',groupId:'J',pos:1}, awaySource:{type:'group',groupId:'I',pos:2} },
          { id:'wc_r32_11', homeSource:{type:'group',groupId:'L',pos:2}, awaySource:{type:'group',groupId:'K',pos:1} },
          { id:'wc_r32_12', homeSource:{type:'best3rd',rank:1}, awaySource:{type:'best3rd',rank:2} },
          { id:'wc_r32_13', homeSource:{type:'best3rd',rank:3}, awaySource:{type:'best3rd',rank:4} },
          { id:'wc_r32_14', homeSource:{type:'best3rd',rank:5}, awaySource:{type:'best3rd',rank:6} },
          { id:'wc_r32_15', homeSource:{type:'best3rd',rank:7}, awaySource:{type:'best3rd',rank:8} },
        ],
      },
      {
        id:'r16', name:'Round of 16',
        matches: [
          { id:'wc_r16_0', homeSource:{type:'match',matchId:'wc_r32_0'},  awaySource:{type:'match',matchId:'wc_r32_1'}  },
          { id:'wc_r16_1', homeSource:{type:'match',matchId:'wc_r32_2'},  awaySource:{type:'match',matchId:'wc_r32_3'}  },
          { id:'wc_r16_2', homeSource:{type:'match',matchId:'wc_r32_4'},  awaySource:{type:'match',matchId:'wc_r32_5'}  },
          { id:'wc_r16_3', homeSource:{type:'match',matchId:'wc_r32_6'},  awaySource:{type:'match',matchId:'wc_r32_7'}  },
          { id:'wc_r16_4', homeSource:{type:'match',matchId:'wc_r32_8'},  awaySource:{type:'match',matchId:'wc_r32_9'}  },
          { id:'wc_r16_5', homeSource:{type:'match',matchId:'wc_r32_10'}, awaySource:{type:'match',matchId:'wc_r32_11'} },
          { id:'wc_r16_6', homeSource:{type:'match',matchId:'wc_r32_12'}, awaySource:{type:'match',matchId:'wc_r32_13'} },
          { id:'wc_r16_7', homeSource:{type:'match',matchId:'wc_r32_14'}, awaySource:{type:'match',matchId:'wc_r32_15'} },
        ],
      },
      {
        id:'qf', name:'Quarter-Finals',
        matches: [
          { id:'wc_qf_0', homeSource:{type:'match',matchId:'wc_r16_0'}, awaySource:{type:'match',matchId:'wc_r16_1'} },
          { id:'wc_qf_1', homeSource:{type:'match',matchId:'wc_r16_2'}, awaySource:{type:'match',matchId:'wc_r16_3'} },
          { id:'wc_qf_2', homeSource:{type:'match',matchId:'wc_r16_4'}, awaySource:{type:'match',matchId:'wc_r16_5'} },
          { id:'wc_qf_3', homeSource:{type:'match',matchId:'wc_r16_6'}, awaySource:{type:'match',matchId:'wc_r16_7'} },
        ],
      },
      {
        id:'sf', name:'Semi-Finals',
        matches: [
          { id:'wc_sf_0', homeSource:{type:'match',matchId:'wc_qf_0'}, awaySource:{type:'match',matchId:'wc_qf_1'} },
          { id:'wc_sf_1', homeSource:{type:'match',matchId:'wc_qf_2'}, awaySource:{type:'match',matchId:'wc_qf_3'} },
        ],
      },
      {
        id:'f', name:'Final',
        matches:[{ id:'wc_final', homeSource:{type:'match',matchId:'wc_sf_0'}, awaySource:{type:'match',matchId:'wc_sf_1'} }],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // FOOTBALL — UEFA CHAMPIONS LEAGUE  (UPCOMING)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'ucl-2627',
    sportId: 'football',
    name: 'UEFA Champions League',
    startDate: '2026-09-17',
    endDate:   '2027-05-29',
    formatType: 'bracket',
    rounds: [
      {
        id:'r16', name:'Round of 16',
        matches: [
          { id:'cl_r16_0', homeId:'cl_rma', awayId:'cl_mci' },
          { id:'cl_r16_1', homeId:'cl_fcb', awayId:'cl_bay' },
          { id:'cl_r16_2', homeId:'cl_liv', awayId:'cl_psg' },
          { id:'cl_r16_3', homeId:'cl_atm', awayId:'cl_bvb' },
          { id:'cl_r16_4', homeId:'cl_ars', awayId:'cl_int' },
          { id:'cl_r16_5', homeId:'cl_juv', awayId:'cl_nap' },
          { id:'cl_r16_6', homeId:'cl_por', awayId:'cl_aja' },
          { id:'cl_r16_7', homeId:'cl_slb', awayId:'cl_cel' },
        ],
      },
      { id:'qf', name:'Quarter-Finals', matches:[{id:'cl_qf_0'},{id:'cl_qf_1'},{id:'cl_qf_2'},{id:'cl_qf_3'}] },
      { id:'sf', name:'Semi-Finals',    matches:[{id:'cl_sf_0'},{id:'cl_sf_1'}] },
      { id:'f',  name:'Final',          matches:[{id:'cl_final'}] },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // FOOTBALL — PREMIER LEAGUE  (UPCOMING)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'epl-2627',
    sportId: 'football_league',
    name: 'Premier League',
    startDate: '2026-08-15',
    endDate:   '2027-05-23',
    formatType: 'league',
    competitorIds: [
      'epl_mci','epl_liv','epl_ars','epl_avl','epl_che',
      'epl_new','epl_mun','epl_tot','epl_bha','epl_whu',
      'epl_nfo','epl_ful','epl_bou','epl_cry','epl_bre',
      'epl_wol','epl_eve','epl_lee','epl_bur','epl_sun',
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // FOOTBALL — LA LIGA  (UPCOMING)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'laliga-2627',
    sportId: 'football_league',
    name: 'La Liga',
    startDate: '2026-08-16',
    endDate:   '2027-05-30',
    formatType: 'league',
    competitorIds: [
      'll_rma','ll_bar','ll_atm','ll_ath','ll_rso',
      'll_vil','ll_sev','ll_bet','ll_val','ll_gir',
      'll_cel','ll_osa','ll_mal','ll_get','ll_ray',
      'll_lpa','ll_esp','ll_ala','ll_gra','ll_cad',
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // FOOTBALL — LIGUE 1 McDONALD'S  (UPCOMING)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'ligue1-2627',
    sportId: 'football_league',
    name: "Ligue 1 McDonald's",
    startDate: '2026-08-08',
    endDate:   '2027-05-22',
    formatType: 'league',
    competitorIds: [
      'l1_psg','l1_mar','l1_lyo','l1_mon','l1_lil',
      'l1_len','l1_nic','l1_ren','l1_brs','l1_str',
      'l1_rei','l1_nan','l1_tou','l1_mon2','l1_lhv',
      'l1_aux','l1_ang','l1_metz',
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // FOOTBALL — SÜPER LIG  (UPCOMING)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'superlig-2627',
    sportId: 'football_league',
    name: 'Trendyol Süper Lig',
    startDate: '2026-08-08',
    endDate:   '2027-05-23',
    formatType: 'league',
    competitorIds: [
      'sl_gal','sl_fen','sl_bes','sl_tra','sl_bas',
      'sl_eyu','sl_sam','sl_ank','sl_bod','sl_ant',
      'sl_gaz','sl_hat','sl_kon','sl_siv','sl_kay',
      'sl_kas','sl_riz','sl_ala',
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // BASKETBALL — NBA PLAYOFFS 2026  (LIVE)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'nba-2026',
    sportId: 'basketball',
    name: 'NBA Playoffs 2026',
    startDate: '2026-04-18',
    endDate:   '2026-06-22',
    formatType: 'bracket',
    rounds: [
      {
        id:'r1', name:'First Round',
        matches: [
          { id:'nba_r1_0', homeId:'nba_bos', awayId:'nba_atl' },
          { id:'nba_r1_1', homeId:'nba_nyk', awayId:'nba_ind' },
          { id:'nba_r1_2', homeId:'nba_mil', awayId:'nba_phi' },
          { id:'nba_r1_3', homeId:'nba_cle', awayId:'nba_mia' },
          { id:'nba_r1_4', homeId:'nba_okc', awayId:'nba_nop' },
          { id:'nba_r1_5', homeId:'nba_dal', awayId:'nba_gsw' },
          { id:'nba_r1_6', homeId:'nba_lal', awayId:'nba_sac' },
          { id:'nba_r1_7', homeId:'nba_den', awayId:'nba_min' },
        ],
      },
      { id:'r2', name:'Conference Semis',  matches:[{id:'nba_r2_0'},{id:'nba_r2_1'},{id:'nba_r2_2'},{id:'nba_r2_3'}] },
      { id:'r3', name:'Conference Finals', matches:[{id:'nba_r3_0'},{id:'nba_r3_1'}] },
      { id:'f',  name:'NBA Finals',        matches:[{id:'nba_final'}] },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // TENNIS — WIMBLEDON 2026  (UPCOMING)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'wimbledon-2026',
    sportId: 'tennis',
    name: 'Wimbledon 2026',
    startDate: '2026-06-29',
    endDate:   '2026-07-12',
    formatType: 'bracket',
    rounds: [
      {
        id:'r32', name:'Round of 32',
        matches: [
          // Q1: seeds 1,16,9,8 vs 32,17,24,25
          { id:'wim_r32_0',  homeId:'w_sin',  awayId:'w_laj'  },
          { id:'wim_r32_1',  homeId:'w_ber',  awayId:'w_dra'  },
          { id:'wim_r32_2',  homeId:'w_tsi',  awayId:'w_str'  },
          { id:'wim_r32_3',  homeId:'w_hum',  awayId:'w_kok'  },
          // Q2: seeds 5,12,13,4 vs 28,21,20,29
          { id:'wim_r32_4',  homeId:'w_zve',  awayId:'w_com'  },
          { id:'wim_r32_5',  homeId:'w_pau',  awayId:'w_kha'  },
          { id:'wim_r32_6',  homeId:'w_dem',  awayId:'w_tia'  },
          { id:'wim_r32_7',  homeId:'w_med',  awayId:'w_bor'  },
          // Q3: seeds 3,14,11,6 vs 30,19,22,27
          { id:'wim_r32_8',  homeId:'w_djok', awayId:'w_nak'  },
          { id:'wim_r32_9',  homeId:'w_mus',  awayId:'w_cer'  },
          { id:'wim_r32_10', homeId:'w_she',  awayId:'w_bub'  },
          { id:'wim_r32_11', homeId:'w_fri',  awayId:'w_dar'  },
          // Q4: seeds 7,10,15,2 vs 26,23,18,31
          { id:'wim_r32_12', homeId:'w_run',  awayId:'w_nav'  },
          { id:'wim_r32_13', homeId:'w_dim',  awayId:'w_mac'  },
          { id:'wim_r32_14', homeId:'w_nor',  awayId:'w_ruu'  },
          { id:'wim_r32_15', homeId:'w_alca', awayId:'w_fog'  },
        ],
      },
      { id:'r16', name:'Round of 16',   matches:[{id:'wim_r16_0'},{id:'wim_r16_1'},{id:'wim_r16_2'},{id:'wim_r16_3'},{id:'wim_r16_4'},{id:'wim_r16_5'},{id:'wim_r16_6'},{id:'wim_r16_7'}] },
      { id:'qf',  name:'Quarter-Finals',matches:[{id:'wim_qf_0'},{id:'wim_qf_1'},{id:'wim_qf_2'},{id:'wim_qf_3'}] },
      { id:'sf',  name:'Semi-Finals',   matches:[{id:'wim_sf_0'},{id:'wim_sf_1'}] },
      { id:'f',   name:'Final',         matches:[{id:'wim_final'}] },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // AMERICAN FOOTBALL — NFL 2026/27  (UPCOMING)
  // Fixtures are generated algorithmically by format.js (generateNFLSchedule).
  // ════════════════════════════════════════════════════════════════
  {
    id: 'nfl-2627',
    sportId: 'american_football',
    name: 'NFL Season 2026/27',
    startDate: '2026-09-10',
    endDate:   '2027-01-04',
    formatType: 'league',
    competitorIds: [
      'nfl_phi','nfl_nyg','nfl_dal','nfl_was',
      'nfl_gnb','nfl_chi','nfl_min','nfl_det',
      'nfl_tam','nfl_nor','nfl_atl','nfl_car',
      'nfl_sfo','nfl_sea','nfl_lar','nfl_ari',
      'nfl_nwe','nfl_buf','nfl_nyj','nfl_mia',
      'nfl_rav','nfl_pit','nfl_cin','nfl_cle',
      'nfl_ind','nfl_hou','nfl_jax','nfl_ten',
      'nfl_kan','nfl_lvr','nfl_lac','nfl_den',
    ],
    // Division structure — used by generateNFLSchedule for authentic matchup weighting
    divisions: {
      'NFC East':  ['nfl_phi','nfl_nyg','nfl_dal','nfl_was'],
      'NFC North': ['nfl_gnb','nfl_chi','nfl_min','nfl_det'],
      'NFC South': ['nfl_tam','nfl_nor','nfl_atl','nfl_car'],
      'NFC West':  ['nfl_sfo','nfl_sea','nfl_lar','nfl_ari'],
      'AFC East':  ['nfl_nwe','nfl_buf','nfl_nyj','nfl_mia'],
      'AFC North': ['nfl_rav','nfl_pit','nfl_cin','nfl_cle'],
      'AFC South': ['nfl_ind','nfl_hou','nfl_jax','nfl_ten'],
      'AFC West':  ['nfl_kan','nfl_lvr','nfl_lac','nfl_den'],
    },
  },
];
