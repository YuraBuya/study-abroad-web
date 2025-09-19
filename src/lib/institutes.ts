export type Institute = {
  id: string;
  name: string;
  nameKo?: string;
  country?: string;
  city?: string;
  logoUrl: string;
  desc?: string;
  siteUrl?: string;
  applyUrl?: string;
  brochureUrl?: string;
  detailsUrl?: string;
};

export const INSTITUTES: Institute[] = [
  {
    id: "gachon-kli",
    name: "Gachon University Korean Language Institute",
    nameKo: "가천대학교 한국어학당",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Гачон Их Сургуулийн хэлний институт нь гадаад оюутнуудад солонгос хэлийг бүх түвшинд заадаг бөгөөд соёлын хөтөлбөрүүдээр баялаг.",
    siteUrl: "https://www.gachon.ac.kr",
    applyUrl: "/apply?school=gachon-kli",
    brochureUrl: "/uploads/brochures/gachon-kli-sample.pdf",
    detailsUrl: "/uploads/brochures/gachon-kli-sample.pdf"
  },
  {
    id: "chonnam-kli",
    name: "Chonnam National University Korean Language Institute",
    nameKo: "전남대학교 한국어학당",
    country: "Korea",
    city: "Гванжу",
    logoUrl: "/images/default-logo.svg",
    desc: "Чоннам Их Сургуулийн хэлний төв нь чанартай сургалтын хөтөлбөр, орчин үеийн анги танхимаар хангадаг.",
    siteUrl: "https://www.jnu.ac.kr",
    applyUrl: "/apply?school=chonnam-kli",
    brochureUrl: "/uploads/brochures/chonnam-kli-sample.pdf",
    detailsUrl: "/language-institutes/chonnam-kli"
  },
  {
    id: "seoyoung-kli",
    name: "Seoyoung University Korean Language Institute",
    nameKo: "서영대학교 한국어학당",
    country: "Korea",
    city: "Гванжу",
    logoUrl: "/images/default-logo.svg",
    desc: "Сөён Их Сургуулийн хэлний сургалт нь дасан зохицоход хялбар орчин, туршлагатай багш нартай.",
    siteUrl: "https://www.seoyeong.ac.kr",
    applyUrl: "/apply?school=seoyoung-kli",
    detailsUrl: "/language-institutes/seoyoung-kli"
  },
  {
    id: "hansung-kli",
    name: "Hansung University Korean Language Institute",
    nameKo: "한성대학교 한국어학당",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Хансонг Их Сургуулийн хэлний институт нь Сөүл хотын төвд байрладаг ба өдөр тутмын амьдралд хэрэгцээтэй солонгос хэлийг заадаг.",
    siteUrl: "https://www.hansung.ac.kr",
    applyUrl: "/apply?school=hansung-kli",
    brochureUrl: "/uploads/brochures/hansung-kli-sample.pdf",
    detailsUrl: "/uploads/brochures/hansung-kli-sample.pdf"
  },
  {
    id: "sungshin-kli",
    name: "Sungshin Women's University Korean Language Institute",
    nameKo: "성신여자대학교 한국어학당",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Сонсин Эмэгтэйчүүдийн Их Сургууль нь оюутнуудад найрсаг орчинд хэлний мэдлэг олгодог.",
    siteUrl: "https://www.sungshin.ac.kr",
    applyUrl: "/apply?school=sungshin-kli",
    detailsUrl: "/language-institutes/sungshin-kli"
  },
  {
    id: "dongmyung-kli",
    name: "Dongmyung University Korean Language Institute",
    nameKo: "동명대학교 한국어학당",
    country: "Korea",
    city: "Пусан",
    logoUrl: "/images/default-logo.svg",
    desc: "Донмён Их Сургуулийн хэлний институт нь далайн эргийн хотод байрлах ба олон улсын оюутнуудад тохиромжтой.",
    siteUrl: "https://www.tu.ac.kr",
    applyUrl: "/apply?school=dongmyung-kli",
    detailsUrl: "/language-institutes/dongmyung-kli"
  },
  {
    id: "wonkwang-kli",
    name: "Wonkwang University Korean Language Institute",
    nameKo: "원광대학교 한국어학당",
    country: "Korea",
    city: "Иксан",
    logoUrl: "/images/default-logo.svg",
    desc: "Вонгван Их Сургууль нь гадаад оюутнуудад зориулсан тусгайлан боловсруулсан сургалтын хөтөлбөртэй.",
    siteUrl: "https://www.wku.ac.kr",
    applyUrl: "/apply?school=wonkwang-kli",
    detailsUrl: "/language-institutes/wonkwang-kli"
  },
  {
    id: "sangmyung-kli",
    name: "Sangmyung University Korean Language Institute",
    nameKo: "상명대학교 한국어학당",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Санмён Их Сургуулийн хэлний төв нь соёлын үйл ажиллагааг багтаасан хэлний сургалтуудыг санал болгодог.",
    siteUrl: "https://www.smu.ac.kr",
    applyUrl: "/apply?school=sangmyung-kli",
    detailsUrl: "/language-institutes/sangmyung-kli"
  },
  {
    id: "baekseok-kli",
    name: "Baekseok University Korean Language Institute",
    nameKo: "백석대학교 한국어학당",
    country: "Korea",
    city: "Чонан",
    logoUrl: "/images/default-logo.svg",
    desc: "Бэксок Их Сургууль нь оюутнуудад зохион байгуулалт сайтай, урт болон богино хугацааны сургалтуудыг санал болгодог.",
    siteUrl: "https://www.bu.ac.kr",
    applyUrl: "/apply?school=baekseok-kli",
    detailsUrl: "/language-institutes/baekseok-kli"
  },
  {
    id: "sungkyunkwan-kli",
    name: "Sungkyunkwan University Korean Language Institute",
    nameKo: "성균관대학교 한국어학당",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Сөнгүнгван Их Сургууль нь олон улсын нэр хүндтэй бөгөөд тогтмол TOPIK бэлтгэлийн ангитай.",
    siteUrl: "https://www.skku.edu",
    applyUrl: "/apply?school=sungkyunkwan-kli",
    detailsUrl: "/language-institutes/sungkyunkwan-kli"
  },
  {
    id: "ili-d2",
    name: "International Language Institute (D-2)",
    nameKo: "국제언어대학교 / D-2",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Олон улсын хэлний институт нь D-2 визийн сургалт санал болгодог.",
    siteUrl: "#",
    applyUrl: "/apply?school=ili-d2",
    detailsUrl: "/language-institutes/ili-d2"
  },
  {
    id: "cheongju-kli",
    name: "Cheongju University Korean Language Institute",
    nameKo: "청주대학교 한국어학당",
    country: "Korea",
    city: "Чонжу",
    logoUrl: "/images/default-logo.svg",
    desc: "Чонжу Их Сургууль нь төвийн бүсэд байрлах ба соёлын баялаг үйл ажиллагаатай.",
    siteUrl: "https://www.cju.ac.kr",
    applyUrl: "/apply?school=cheongju-kli",
    detailsUrl: "/language-institutes/cheongju-kli"
  },
  {
    id: "semyung-kli",
    name: "Semyung University Korean Language Institute",
    nameKo: "세명대학교 한국어학당",
    country: "Korea",
    city: "Жечон",
    logoUrl: "/images/default-logo.svg",
    desc: "Семён Их Сургуулийн хэлний төв нь жижиг анги, хувийн хичээлээрээ алдартай.",
    siteUrl: "https://www.semyung.ac.kr",
    applyUrl: "/apply?school=semyung-kli",
    detailsUrl: "/language-institutes/semyung-kli"
  },
  {
    id: "jeonju-kli",
    name: "Jeonju University Korean Language Institute",
    nameKo: "전주대학교 한국어학당",
    country: "Korea",
    city: "Жонжу",
    logoUrl: "/images/default-logo.svg",
    desc: "Жонжу Их Сургууль нь уламжлалт соёлыг сургалттайгаа уялдуулан заадаг.",
    siteUrl: "https://www.jj.ac.kr",
    applyUrl: "/apply?school=jeonju-kli",
    detailsUrl: "/language-institutes/jeonju-kli"
  },
  {
    id: "kangmyung-kli",
    name: "Kangmyung University Korean Language Institute",
    nameKo: "강명대학교 한국어학당",
    country: "Korea",
    city: "Сөүл",
    logoUrl: "/images/default-logo.svg",
    desc: "Канмён Их Сургууль нь найрсаг орчин, хичээл заах туршлагатай багш нараар хангадаг.",
    siteUrl: "#",
    applyUrl: "/apply?school=kangmyung-kli",
    detailsUrl: "/language-institutes/kangmyung-kli"
  },
  {
    id: "chungnam-kli",
    name: "Chungnam National University Korean Language Institute",
    nameKo: "충남대학교 한국어학당",
    country: "Korea",
    city: "ДэЖон",
    logoUrl: "/images/default-logo.svg",
    desc: "Чүннам Их Сургуулийн хэлний төв нь шинжлэх ухааны хот ДэЖонд байрлах бөгөөд чанартай сургалтаараа алдартай.",
    siteUrl: "https://www.cnu.ac.kr",
    applyUrl: "/apply?school=chungnam-kli",
    detailsUrl: "/language-institutes/chungnam-kli"
  },
  {
    id: "gyeonginwomen-kli",
    name: "Gyeongin Women's University Korean Language Institute",
    nameKo: "경인여자대학교 한국어학당",
    country: "Korea",
    city: "Инчон",
    logoUrl: "/images/default-logo.svg",
    desc: "Гён Ин Эмэгтэйчүүдийн Их Сургууль нь гадаад оюутнуудад тохиромжтой орчин, найрсаг сургалт санал болгодог.",
    siteUrl: "https://www.gwu.ac.kr",
    applyUrl: "/apply?school=gyeonginwomen-kli",
    detailsUrl: "/language-institutes/gyeonginwomen-kli"
  }
];
