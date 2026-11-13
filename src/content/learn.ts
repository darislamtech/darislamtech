import type { BookFile, BookSeries, LevelVideo, Localized, RoadmapDomain, RoadmapLevel, RoadmapTopic } from "./types";

// The program plan, shown on the Learn page as the external track (what to study, in order, from recommended outside
// sources, in the spirit of roadmap.sh) and the platform track (lessons and series made by Dar, under construction).
// The owner is working on the external track only for now: the platform track is frozen (changed only when the owner
// asks, as with its trusted-sources wording) and shown blurred, so a change to the external plan must not reach it
// (split a shared domain before changing it). No timing: each learner goes at their own pace (except the reading time
// of a recommended book series, which the owner asked for). Sources and lessons are added per topic once chosen;
// Islamic material only from trusted references, reviewed by the qualified. The owner's working plan for technology is the Notion page «رود ماب المسار التقني».

const text = (ar: string, en: string): Localized => ({ ar, en });

const topic = (id: string, title: Localized, points?: { ar: string[]; en: string[] }): RoadmapTopic => ({
  id,
  title,
  points,
});

// Islamic knowledge and da'wah, platform track (frozen): first the educational path, then the practical one.

const shariaSubjects: RoadmapTopic[] = [
  topic("aqeedah", text("العقيدة", "Creed (Aqeedah)")),
  topic("fiqh", text("الفقه", "Jurisprudence (Fiqh)")),
  topic("tarbiyah", text("التربية الإسلامية", "Islamic character (Tarbiyah)")),
  topic("hadith", text("الحديث", "Hadith")),
  topic("seerah", text("السيرة", "The Prophet's biography (Seerah)")),
  topic("tafsir", text("التفسير", "Quran exegesis (Tafsir)")),
  topic("arabic", text("اللغة العربية", "Arabic language")),
];

const levelNames = [
  text("المستوى الأول", "Level one"),
  text("المستوى الثاني", "Level two"),
  text("المستوى الثالث", "Level three"),
  text("المستوى الرابع", "Level four"),
];

const responseProject = text(
  "ردود على أشهر شبهاتهم، معتمدةً على مصادر موثوقة، ثم تُنشر محتوى (فيديو أو مقال).",
  "Answers to their best-known claims, based on trusted sources, then published as content (a video or an article).",
);

const practicalFields: RoadmapLevel[] = [
  {
    id: "preaching",
    title: text("العلم الشرعي والوعظ", "Islamic knowledge and preaching"),
    topics: [],
    project: text(
      "سلسلة دروس أو مواعظ قصيرة في موضوع واحد، تُعدّ من مصادر موثوقة وتُنشر.",
      "A series of short lessons or sermons on one subject, prepared from trusted sources and published.",
    ),
  },
  {
    id: "dawah",
    title: text("الدعوة إلى الإسلام", "Calling to Islam (Da'wah)"),
    topics: [],
    project: text(
      "محتوى يعرّف غير المسلمين بالإسلام بأسلوب واضح، يُنشر على قناته أو حساباته.",
      "Content that introduces Islam to non-Muslims clearly, published on their channel or accounts.",
    ),
  },
  { id: "atheism", title: text("الرد على الإلحاد والشبهات", "Answering atheism and doubts"), topics: [], project: responseProject },
  {
    id: "quranists",
    title: text("الرد على القرآنيين ومنكري السنة", "Answering Quranists and Sunnah deniers"),
    topics: [],
    project: responseProject,
  },
  { id: "feminism", title: text("الرد على النسوية", "Answering feminism"), topics: [], project: responseProject },
  { id: "secularism", title: text("الرد على العلمانية", "Answering secularism"), topics: [], project: responseProject },
  {
    id: "spirituality",
    title: text("الرد على دعاوى الطاقة والروحانيات الحديثة", "Answering \"energy\" and modern spirituality claims"),
    topics: [],
    project: responseProject,
  },
];

const platformShariaDomain: RoadmapDomain = {
  id: "sharia",
  title: text("المسار الديني والدعوي", "Islamic knowledge and da'wah"),
  description: text(
    "علمٌ ثم عمل: مسار تعليمي يؤسّس العلم الشرعي، ثم مسار عملي يُطبَّق فيه العلم في الدعوة والرد على الشبهات.",
    "Knowledge, then action: an educational path that lays the foundations of Islamic knowledge, then a practical path that puts it to work in da'wah and in answering doubts.",
  ),
  paths: [
    {
      id: "educational",
      title: text("المسار التعليمي", "The educational path"),
      description: text(
        "ما لا يسع المسلمَ جهلُه في دينه، على أربعة مستويات متدرّجة في المواد نفسها.",
        "What every Muslim must know of their religion, in four progressive levels of the same subjects.",
      ),
      levels: levelNames.map((title, index) => ({ id: `level-${index + 1}`, title, topics: shariaSubjects })),
    },
    {
      id: "practical",
      title: text("المسار العملي", "The practical path"),
      description: text(
        "يختار الدارس مجالًا أو أكثر، ويطبّق فيه ما تعلّمه بمشاريع حقيقية تُنشر للناس، مستعينًا بمهارات المسار التقني في صناعة المحتوى.",
        "Learners choose one field or more and apply what they learned in real projects published for people, using the technology track's content-making skills.",
      ),
      levels: practicalFields,
    },
  ],
};

// Islamic knowledge and da'wah, external track: first what no Muslim may be ignorant of, then at least one da'wah
// project defending Islam: the learner studies its field in depth and makes content about it. The fields' topics
// await the owner's sources and review.

const contentProject = text(
  "يصنع محتوى في هذا المجال (فيديوهات أو مقاطع قصيرة أو مقالات) بمهارات المسار التقني، معتمدًا على مصادر موثوقة.",
  "Make content in this field (videos, shorts or articles) with the technology track's skills, based on trusted sources.",
);

const field = (id: string, title: Localized, study: { ar: string[]; en: string[] }, videos?: LevelVideo[]): RoadmapLevel => ({
  id,
  title,
  topics: [topic(`${id}-study`, text("ما يدرسه في المجال", "What to study in the field"), study)],
  videos,
  project: contentProject,
});

// Zad Academy's book series («سلسلة زاد العلمية»): four levels, each with one book in each of seven subjects, studied
// level by level in «ما لا يسع المسلمَ جهلُه». Contents from Zad's curriculum page and the books' tables of contents;
// page counts (2019 edition) only give the reading time. The books are «جميع الحقوق محفوظة»; Zad Academy allowed us in
// writing (2026-11-12) to offer them free for learning, never sold, translated or printed. The files, on the
// darislamtech Google Drive: Arabic, the published first edition; English, Zad Group's English edition (both from
// archive.org).
type ZadBook = {
  id: (typeof subjectOrder)[number];
  title: Localized;
  pages: number;
  contents: Localized;
  file?: Localized<BookFile>;
};

const aqeedah = text("العقيدة", "Creed (Aqeedah)");
const seerah = text("السيرة النبوية", "The Prophet's biography (Seerah)");
const fiqh = text("الفقه", "Jurisprudence (Fiqh)");
const tafsir = text("التفسير", "Quran exegesis (Tafsir)");
const hadith = text("الحديث", "Hadith");
const tarbiyah = text("التربية الإسلامية", "Islamic character (Tarbiyah)");
const arabic = text("اللغة العربية", "Arabic language");

// A book on the darislamtech Google Drive: read in Drive's viewer, or download straight to the device.
const drive = (id: string) => ({
  read: `https://drive.google.com/file/d/${id}/view`,
  download: `https://drive.google.com/uc?export=download&id=${id}`,
});

// Each level's books are read in our order of the subjects (the owner's choice), not Zad's.
const subjectOrder = ["aqeedah", "fiqh", "tarbiyah", "hadith", "seerah", "tafsir", "arabic"] as const;

const zadLevels: ZadBook[][] = [
  [
    {
      id: "aqeedah",
      title: aqeedah,
      pages: 89,
      file: { ar: drive("1TrGbgk0jCSEHH2aOpkLVDuNC2Z9PI4fm"), en: drive("1hsldTyURBF7m3DB_cWR4Cw8iD6Bp7YL5") },
      contents: text(
        "معنى العقيدة وأهميتها، والتوحيد وأركانه وأقسامه، وتوحيد الربوبية، وأدلة وجود الله.",
        "What creed is and why it matters; tawheed, its pillars and kinds; the oneness of Lordship; proofs of Allah's existence.",
      ),
    },
    {
      id: "seerah",
      title: seerah,
      pages: 102,
      file: { ar: drive("1n7JX-1iMQ8ZmnMfNOW9EbxrGLo3ffTdX"), en: drive("1kQVVlmdAb3b-1mObgnJgQRBakP-kEZIL") },
      contents: text(
        "نسبه ومولده ونشأته ﷺ، والعهد المكي، والعهد المدني، والغزوات، وفتح مكة، وحجه، ووفاته ﷺ.",
        "His lineage, birth and upbringing ﷺ; the Makkan period; the Madinan period; the battles; the conquest of Makkah; his Hajj; his death ﷺ.",
      ),
    },
    {
      id: "fiqh",
      title: fiqh,
      pages: 132,
      file: { ar: drive("1z7wLlCSjVkCg5NX1wfABlObCnu80MMS3"), en: drive("1u8QL2ciMcMDBZ0nX77B22VerLpprl-MP") },
      contents: text("الطهارة والمياه، والحيض والنفاس، والصلاة.", "Purification and water; menstruation and postnatal bleeding; prayer."),
    },
    {
      id: "tafsir",
      title: tafsir,
      pages: 84,
      file: { ar: drive("1nEcbPf00AlXNDJdB1T8nxdSKRlxyYcfo"), en: drive("1QMXSzjbbnmRdIsKHjqkN5qAxnn_zkjdx") },
      contents: text(
        "مدخل إلى علم التفسير، وتفسير سورة الفاتحة، وآية الكرسي، وخواتيم سورة البقرة.",
        "An introduction to tafsir; Surat al-Fatihah; Ayat al-Kursi; the closing verses of Surat al-Baqarah.",
      ),
    },
    {
      id: "hadith",
      title: hadith,
      pages: 110,
      file: { ar: drive("1qklfktH6sYspeG0TRR8RDrAwxcJF-FWf"), en: drive("1mcQnl9a7q3WM2fNbNW3g7qdJVj3A5zB2") },
      contents: text(
        "شرح 21 حديثًا، منها: «بُني الإسلام على خمس»، وحديث جبريل «أخبرني عن الإسلام»، و«إنما الأعمال بالنيات»، و«الإيمان بضع وستون شعبة»، و«المؤمن القوي خير».",
        "21 hadiths explained, among them “Islam is built on five”, the hadith of Jibril, “Actions are by intentions”, “Faith has sixty-odd branches” and “The strong believer is better”.",
      ),
    },
    {
      id: "tarbiyah",
      title: tarbiyah,
      pages: 94,
      file: { ar: drive("1GmE9_36sQWblls_hHURotE0LcFf9I21O"), en: drive("1eYMK3dqwXqlOmoK0eOO40xwHsMMTJa2f") },
      contents: text(
        "الحقوق: حق الله، وحق النبي ﷺ، والصحابة، والعلماء، والوالدين، والأبناء، والزوجين، والأرحام، والجار، والضيف، والراعي والرعية.",
        "Rights: of Allah, of the Prophet ﷺ, the Companions, scholars, parents, children, spouses, relatives, neighbours, guests, and rulers and the ruled.",
      ),
    },
    {
      id: "arabic",
      title: arabic,
      pages: 103,
      file: { ar: drive("1qKXwdF1TwD_okGt5ojPQMJnm-uRvTxL6"), en: drive("1pQj2-2znzDUR9Ih7T80kt_5Zsoh1eumm") },
      contents: text(
        "مدخل إلى النحو، وأقسام الكلام، والإعراب والبناء، والمثنى، وجمع المذكر السالم، وجمع التكسير، والأسماء الخمسة، والأفعال الخمسة.",
        "An introduction to grammar; parts of speech; declension and fixed endings; the dual; sound masculine and broken plurals; the five nouns; the five verbs.",
      ),
    },
  ],
  [
    {
      id: "aqeedah",
      title: aqeedah,
      pages: 93,
      file: { ar: drive("1dvaSxENLZYZeRX1ToCaWNKoWJ8K8I91A"), en: drive("1dkifdjcCRg1upwvE_esSehVGMjVFX_Nm") },
      contents: text(
        "توحيد الألوهية، وتوحيد الأسماء والصفات وقواعده، والعبادة وأركانها وشروطها.",
        "The oneness of worship; the oneness of Allah's names and attributes and its rules; worship, its pillars and conditions.",
      ),
    },
    {
      id: "seerah",
      title: seerah,
      pages: 84,
      file: { ar: drive("1xgI6T6TNRIXrxmRXWtflGLDTsXhOC2Ql"), en: drive("1-pAO4Sue9sxz--kv4thrKEpan6Nysdur") },
      contents: text(
        "الشمائل النبوية: خِلقته ﷺ، ولباسه، ومشيته، وأكله، وكلامه، ونومه، وعبادته، وتواضعه، وأخلاقه.",
        "His features and manners ﷺ: appearance, clothing, walk, eating, speech, sleep, worship, humility and character.",
      ),
    },
    {
      id: "fiqh",
      title: fiqh,
      pages: 120,
      file: { ar: drive("1c_uiJ6g0vlgoU5ccUlP9NaKYSueYi7MJ"), en: drive("1ElOI1b5grmQ4QCi6vilusvDic5gcdw1O") },
      contents: text("تتمة أحكام الصلاة، والزكاة.", "The rest of prayer; zakat."),
    },
    {
      id: "tafsir",
      title: tafsir,
      pages: 110,
      file: { ar: drive("13FdW0ORoaAvehcYVHI8gucf39e7JdweP"), en: drive("1-q6EyfrTPttDHrzwdb39-wgBWZvvE8pb") },
      contents: text(
        "تفسير سور: النبأ، والنازعات، وعبس، والتكوير، والانفطار، والمطففين.",
        "Surahs an-Naba', an-Nazi'at, 'Abasa, at-Takwir, al-Infitar and al-Mutaffifin.",
      ),
    },
    {
      id: "hadith",
      title: hadith,
      pages: 97,
      file: { ar: drive("172jPb1hf9VuYXutMVKDyKWvIzeS_2ezP"), en: drive("1fXlQosEQrHLqNvvpjc77gRGzHZahGTPo") },
      contents: text(
        "شرح 21 حديثًا، منها: «من عادى لي وليًا»، و«كن في الدنيا كأنك غريب»، و«حُفّت الجنة بالمكاره»، و«ازهد في الدنيا يحبك الله».",
        "21 hadiths explained, among them “Whoever shows enmity to an ally of Mine”, “Be in this world as a stranger”, “Paradise is surrounded by hardships” and “Renounce the world and Allah will love you”.",
      ),
    },
    {
      id: "tarbiyah",
      title: tarbiyah,
      pages: 98,
      file: { ar: drive("1o-BfjNHDlGoVMZS310DwHDx9LoEon5Ll"), en: drive("1PMem-lV1zwFgNOrxQqQB416ROC5aSLo7") },
      contents: text(
        "أعمال القلوب: الإخلاص، والتقوى، والخوف، والرجاء، والمحبة، والصبر، والشكر، والورع، والرضا، والتفكر، والمحاسبة، والتوكل.",
        "Deeds of the heart: sincerity, piety, fear, hope, love, patience, gratitude, scrupulousness, contentment, reflection, self-accounting and trust in Allah.",
      ),
    },
    {
      id: "arabic",
      title: arabic,
      pages: 89,
      file: { ar: drive("1eOMEPVjIMakCOErtnP4qa88eq14vnxMd"), en: drive("1HpMlDl6aJhvqJlU0mxyWXDdC8WJiGFHZ") },
      contents: text(
        "النكرة والمعرفة، والمبتدأ والخبر، وكان وأخواتها، وكاد وأخواتها، وإنّ وأخواتها، ولا النافية للجنس، والأفعال.",
        "Indefinite and definite nouns; subject and predicate; kana, kada and inna and their sisters; the la of absolute negation; verbs.",
      ),
    },
  ],
  [
    {
      id: "aqeedah",
      title: aqeedah,
      pages: 96,
      file: { ar: drive("117ZK2zuVD3r7y0VimI6pRZ5sFMVq4R_w"), en: drive("1Is7-jzTORy7mANup0VUPkAEBBLJHNhQT") },
      contents: text(
        "الإيمان بالملائكة والكتب والرسل واليوم الآخر والقدر، ونواقض التوحيد، وأنواع الكفر والشرك، والتوسل، والإلحاد.",
        "Belief in the angels, books, messengers, the Last Day and divine decree; what nullifies tawheed; kinds of disbelief and shirk; tawassul; atheism.",
      ),
    },
    {
      id: "seerah",
      title: seerah,
      pages: 78,
      file: { ar: drive("1pU92vPA3aQ_G7Vo0K4Luk7oWGNSXexEY"), en: drive("1huz42HpGIy-swws91zG60LpoHXkWYLbi") },
      contents: text(
        "تعاملاته ﷺ: مع زوجاته، وأقاربه، وجيرانه، وخدمه، والفقراء والأغنياء، وغير المسلمين، والعصاة، والنساء، والكبار، والأطفال.",
        "How he ﷺ treated his wives, relatives, neighbours, servants, the poor and the rich, non-Muslims, sinners, women, the elderly and children.",
      ),
    },
    {
      id: "fiqh",
      title: fiqh,
      pages: 110,
      file: { ar: drive("1R8Hty7-lHwGXReafbRuWV9fW3kHjlDvB"), en: drive("1dlcblXoMIxfcZPYvmEGxsr1kb84g64SG") },
      contents: text("الصيام، والحج والعمرة.", "Fasting; Hajj and Umrah."),
    },
    {
      id: "tafsir",
      title: tafsir,
      pages: 102,
      file: { ar: drive("1jNg0XymhXtqAM8tNIYfGDYkae9wzJMWk"), en: drive("1E0Sx_yqqUBIIwr2K1eNjFuGzy505KXVf") },
      contents: text("تفسير السور من الانشقاق إلى الضحى.", "The surahs from al-Inshiqaq to ad-Duha."),
    },
    {
      id: "hadith",
      title: hadith,
      pages: 96,
      file: { ar: drive("1M_IEejLN703Nf3Ecf6IgzFob0y1Zbzhi"), en: drive("1-b5ONJowuy1Mr1Vbhge8S-qSzGVnSbpr") },
      contents: text(
        "شرح 20 حديثًا، منها: «إن الحلال بيّن»، و«ما نهيتكم عنه فاجتنبوه»، و«يا غلام إني أعلمك كلمات»، و«اتق الله حيثما كنت».",
        "20 hadiths explained, among them “The lawful is clear”, “What I forbid you, avoid”, “Young man, I will teach you some words” and “Fear Allah wherever you are”.",
      ),
    },
    {
      id: "tarbiyah",
      title: tarbiyah,
      pages: 93,
      file: { ar: drive("1qAtkJd5eC3OKDAbZI98-J1nerNp1zhjX"), en: drive("1cgqASMKj6Aam5lSxPI3SmSh-gZ5C8AcW") },
      contents: text(
        "الآداب الشرعية: مع الله ورسوله ﷺ، وآداب الطعام والشراب، والبيت، والطريق، والكلام، وعيادة المريض، والمساجد، والدعاء.",
        "Islamic manners: with Allah and His Messenger ﷺ, and of eating and drinking, the home, the road, speech, visiting the sick, mosques and supplication.",
      ),
    },
    {
      id: "arabic",
      title: arabic,
      pages: 108,
      file: { ar: drive("1sK_74TG_pFX27ugASixkZUIdmnsWZISw"), en: drive("1PFv3KM4_Ti19U4CeQUepvPgaMgQd6UaZ") },
      contents: text(
        "الفاعل، ونائب الفاعل، والمفاعيل، والاستثناء، والحال، والتمييز، وحروف الجر، والإضافة.",
        "The subject of a verb; the deputy subject; the objects; exception; the circumstantial; specification; prepositions; the construct.",
      ),
    },
  ],
  [
    {
      id: "aqeedah",
      title: aqeedah,
      pages: 82,
      file: { ar: drive("1AXu2FoYQt5mmXF1IFshNNZN1WNPU5uwn"), en: drive("1FrDiJtuaUB_iKEr1FeITuye4mBbXLAN2") },
      contents: text(
        "البدعة وضوابطها، والتكفير وضوابطه، وأشراط الساعة، والصحابة وآل البيت، والأولياء وكراماتهم، والشفاعة.",
        "Innovation and its criteria; declaring disbelief and its conditions; the signs of the Hour; the Companions and the Prophet's family; Allah's allies (awliya') and their karamat (wonders); intercession.",
      ),
    },
    {
      id: "seerah",
      title: seerah,
      pages: 84,
      file: { ar: drive("11QgTqGvTimfjun-J4f7lZpalmvaZXur2"), en: drive("1epZyOEJMOxJIqGJjax9qbWi9dLOevPtn") },
      contents: text(
        "أحواله ﷺ: كلامه، وما يحب وما يكره، وبكاؤه، وضحكه، وغضبه، وفرحه، وحزنه، وعتابه.",
        "His states ﷺ: his speech, what he loved and disliked, his weeping, laughter, anger, joy, sadness and reproach.",
      ),
    },
    {
      id: "fiqh",
      title: fiqh,
      pages: 94,
      file: { ar: drive("1r6PVA_h67vmRtEU9bXtlgOGvFWTi8koi"), en: drive("19XWmjapSI--q8kgENOGxYc0XvTXL38WD") },
      contents: text(
        "البيع وأحكامه، والإجارة، والنكاح، والطلاق، والأيمان والنذور، والأطعمة.",
        "Sales and their rulings; hire; marriage; divorce; oaths and vows; food.",
      ),
    },
    {
      id: "tafsir",
      title: tafsir,
      pages: 103,
      file: { ar: drive("1k_4dpBg68ZvwCJXsQxCYjEapelOE5JZJ"), en: drive("1tX8TOIxihsI45GtaegAKPMYUAguuL9ED") },
      contents: text("تفسير السور من الشرح إلى الناس.", "The surahs from ash-Sharh to an-Nas."),
    },
    {
      id: "hadith",
      title: hadith,
      pages: 111,
      file: { ar: drive("1Ex9nH8-fRpLh3NaLVgncAAnSdzwP-C-c"), en: drive("1iN4onGoV3M4axcKxK58ieD4SuKyEgN2A") },
      contents: text(
        "شرح 20 حديثًا، منها: «الدين النصيحة»، و«البر حسن الخلق»، و«من رأى منكم منكرًا فليغيّره»، و«لو يُعطى الناس بدعواهم».",
        "20 hadiths explained, among them “Religion is sincere advice”, “Righteousness is good character”, “Whoever sees a wrong, let him change it” and “If people were given what they claim”.",
      ),
    },
    {
      id: "tarbiyah",
      title: tarbiyah,
      pages: 74,
      file: { ar: drive("1PZX_G2NoWl96cE5HrHTXsa2BMZfbxoRe"), en: drive("1xwfBArPrtKZsCsFK9MTECAY4wBjD5iQi") },
      contents: text(
        "أمراض القلوب وعلاجها: الغفلة، واتباع الهوى، وحب الدنيا، والكِبر، والحسد، وغيرها، وقواعد معرفتها، وأهمية التوبة.",
        "Diseases of the heart and their cure (heedlessness, following desires, love of this world, arrogance, envy and others), how to recognise them, and the importance of repentance.",
      ),
    },
    {
      id: "arabic",
      title: arabic,
      pages: 82,
      file: { ar: drive("1NJkzwi9S07Ywy0H0kLx1zUB8OCGJyC6b"), en: drive("1lX1xD_mzAjb8hIyrZT--iOAaTyw6Pc_S") },
      contents: text(
        "التعجب، واسم التفضيل، وصيغ المدح والذم، والتوابع، والنداء، وإعراب الفعل المضارع، وأسلوب الشرط.",
        "Exclamation; the elative; praise and blame; followers; the vocative; the present tense's endings; conditionals.",
      ),
    },
  ],
];

// About a minute a page (the books run about 100 words a page), so the reading time follows from the page count.
const zadHours = Math.round(zadLevels.flat().reduce((sum, book) => sum + book.pages, 0) / 60);
const zadLevelHours = Math.round(zadHours / zadLevels.length);

const zadSeries: BookSeries = {
  reading: text(
    `قراءة كتب المستويات الأربعة تأخذ نحو ${zadHours} ساعة: نحو ${zadLevelHours} ساعة لكل مستوى، أي قرابة أسبوعين بمعدل ساعة يوميًا، وقرابة ستة أسابيع للسلسلة كاملة، وقد تتضاعف المدة مع المراجعة وحلّ التمارين.`,
    `Reading the books of all four levels takes about ${zadHours} hours: about ${zadLevelHours} hours per level, so around two weeks at an hour a day, and around six weeks for the whole series; reviewing and doing the exercises can double that.`,
  ),
  permission: text(
    "الكتب متاحة هنا بإذن من أكاديمية زاد، مجانًا وللاستفادة العلمية فقط: لا تُباع ولا تُترجم ولا تُطبع.",
    "The books are offered here with Zad Academy's permission, free and for learning only: they may not be sold, translated or printed.",
  ),
  levels: zadLevels.map((books, index) => ({
    id: `level-${index + 1}`,
    title: levelNames[index],
    books: books
      .toSorted((a, b) => subjectOrder.indexOf(a.id) - subjectOrder.indexOf(b.id))
      .map(({ id, title, contents, file }) => ({ id, title, contents, file })),
  })),
  study: {
    body: text(
      "ادرسه مع زاد نفسها سنتين، بمحاضرات وشهادة:",
      "Study it with Zad over two years, with lectures and a certificate:",
    ),
    label: text("سجّل في أكاديمية زاد", "Enroll at Zad Academy"),
    url: text("https://zad-academy.com/ar", "https://zad-academy.com/en"),
  },
};

const externalShariaDomain: RoadmapDomain = {
  id: "sharia",
  title: text("المسار الديني والدعوي", "Islamic knowledge and da'wah"),
  description: text(
    "يبدأ بما لا يسع المسلمَ جهلُه في دينه، ثم يتبنّى الدارس مشروعًا دعويًا يدافع به عن الإسلام، فيتعمّق في مجاله ويصنع محتوى ينفع الناس.",
    "It starts with what no Muslim may be ignorant of in their religion; then learners take on a da'wah project that defends Islam, study its field in depth, and make content in it that benefits people.",
  ),
  paths: [
    {
      id: "essentials",
      title: text("ما لا يسع المسلمَ جهلُه", "What no Muslim may be ignorant of"),
      description: text(
        "الحد الأدنى من العلم الشرعي الذي يحتاجه كل مسلم، قبل التخصص في أي مجال، من كتب «سلسلة زاد العلمية» لأكاديمية زاد.",
        "The minimum of Islamic knowledge every Muslim needs, before specializing in any field, from Zad Academy's book series.",
      ),
      levels: [],
      series: zadSeries,
    },
    {
      id: "field",
      title: text("مشاريع دعوية", "Da'wah projects"),
      description: text(
        "يتبنّى الدارس مشروعًا دعويًا واحدًا على الأقل للدفاع عن الإسلام: يتعمّق في مجاله علميًا، ثم يصنع فيه محتوى ينفع الناس، مستعينًا بمهارات المسار التقني.",
        "Learners take on at least one da'wah project to defend Islam: they study its field in depth, then make content in it that benefits people, using the technology track's skills.",
      ),
      levels: [
        // Spreading Islam so that people enter it.
        field("dawah", text("مشروع انتشار الإسلام", "Project: spreading Islam"), {
          ar: [
            "التعريف بالإسلام ومحاسنه",
            "فقه الدعوة وأساليبها ووسائلها",
            "مخاطبة غير المسلمين والإجابة عن أسئلتهم الشائعة",
            "رعاية المسلمين الجدد",
          ],
          en: [
            "Introducing Islam and its merits",
            "The understanding, methods and means of da'wah",
            "Speaking to non-Muslims and answering their common questions",
            "Caring for new Muslims",
          ],
        }, [
          // دعوة تك: the whole series «دورة الدعوة علي تيك توك», as a link to the playlist.
          "https://www.youtube.com/watch?v=WpLXtAmIpo4&list=PLU5S-DONgsA4",
          {
            // هشام صدقي الإبراشي (بودكاست ربوة), the series «مدخل الى دعوة الوثنيين بغرب إفريقيا»; after the first series, as the owner asked.
            url: "https://www.youtube.com/playlist?list=PL_Og7SMq1nHA5z-z3NiSwBPzO1GOi0lge",
            about: text(
              "مدخل إلى دعوة الوثنيين والتعريف بغرب إفريقيا وأهلها وأديانها، مع د. هشام صدقي الإبراشي في بودكاست ربوة.",
              "An introduction to calling pagans to Islam, and to West Africa, its peoples and religions, with Dr. Hisham Sedki El-Ebrashy on the Rabwa podcast.",
            ),
          },
          {
            // دعوة تك: the series that are not already inside «دورة الدعوة علي تيك توك».
            url: "https://www.youtube.com/playlist?list=PLcB1MiLrdnA8",
            about: text(
              "تحفيز لكل من يدعو إلى الإسلام، ومنها «القواعد العشر في دعوة غير المسلمين» للشيخ وليد السحيباني، والدعوة من الهاتف بدون لغة.",
              "Motivation for anyone calling people to Islam, including Shaykh Waleed Al-Suhaibani's «ten rules for calling non-Muslims», and calling from your phone without a foreign language.",
            ),
          },
          {
            url: "https://www.youtube.com/playlist?list=PLIA-l_D5M6HM",
            about: text(
              "مقاطع قصيرة لمن أسلموا عن طريق الدعوة على تيك توك: ثمار حقيقية تشجّعك على البدء.",
              "Short clips of people who embraced Islam through da'wah on TikTok: real results to encourage you to start.",
            ),
          },
          {
            url: "https://www.youtube.com/playlist?list=PLVkFnp3FuWak",
            about: text(
              "شرح تطبيق «خزينة الداعية» للدعاة المحاورين والمعلمين.",
              "A walkthrough of the «Khazinat Al-Da'iyah» app for those who call to Islam, debate and teach.",
            ),
          },
        ]),
        field("atheism", text("مشروع الرد على الإلحاد والشبهات", "Project: answering atheism and doubts"), {
          ar: ["أدلة وجود الله", "النبوة وصدق القرآن", "أصول الإلحاد وأشهر شبهاته", "أدب الحوار والرد"],
          en: ["The proofs of Allah's existence", "Prophethood and the truth of the Quran", "The roots of atheism and its best-known claims", "The manners of dialogue and response"],
        }, [
          // د. هيثم طلعت: «منهج لدراسة نقد الإلحاد | الكتب التي أحتاجها للرد على الملحدين ومناظرتهم».
          "https://www.youtube.com/watch?v=QIPzwDxDdJg",
          {
            url: "https://www.youtube.com/playlist?list=PL56IcDjrf3YJr__TEOJ2UOv3jCzht1_yc",
            about: text(
              "سلسلة د. إياد قنيبي لترسيخ اليقين بالله وبالإسلام والرد على الشبهات: الفطرة، وأدلة وجود الله من العقل والعلم، وأخلاق الإلحاد، ونقد نظرية التطور، والتفكير الناقد.",
              "Dr. Eyad Qunaibi's series to build certainty in Allah and Islam and answer doubts: the innate nature (fitrah), the rational and scientific proofs of Allah's existence, atheism's morals, a critique of evolution, and critical thinking.",
            ),
          },
          {
            url: "https://www.youtube.com/playlist?list=PLNZ5dcsJaeJ3uqnYiF0hnp7Q3a31j3pim",
            about: text(
              "برنامج د. هيثم طلعت على قناة البينة: نشأة الإلحاد وعقيدة الملحد، ومشكلة الشر، والوعي، والمعايرة الدقيقة للكون، وخرافة الأكوان المتعددة، ولماذا الإسلام، والرد على أشهر شبهات الملحدين.",
              "Dr. Haitham Talaat's program on Al-Bayyinah: the origins of atheism and the atheist's creed, the problem of evil, consciousness, the fine-tuning of the universe, the multiverse myth, why Islam, and answers to atheists' best-known claims.",
            ),
          },
        ]),
        field("comparative-religion", text("مشروع مقارنة الأديان", "Project: comparative religion"), {
          ar: ["الأديان الكبرى وعقائدها", "الكتب السابقة وتاريخها", "دلائل صدق النبوة والقرآن", "أدب الحوار والمناظرة"],
          en: [
            "The major religions and their beliefs",
            "The earlier scriptures and their history",
            "The signs of true prophethood and of the Quran",
            "The manners of dialogue and debate",
          ],
        }, [
          // معاذ عليان: «إزاي اتعلم مقارنة أديان؟».
          "https://www.youtube.com/watch?v=GKXWjpVAcnY",
          {
            url: "https://www.youtube.com/playlist?list=PLNZ5dcsJaeJ0hknrf6xWDtd4mCC8doOPs",
            about: text(
              "دروس منهجية مبسّطة عن النصرانية والكتاب المقدس مع أ. أحمد سبيع: مصطلحات أساسية، وأسفار التوراة والأنبياء، والأناجيل، والنص الماسوري والترجمة السبعينية.",
              "Simple, methodical lessons on Christianity and the Bible with Ahmad Sobaie: key terms, the books of the Torah and the Prophets, the Gospels, the Masoretic Text and the Septuagint.",
            ),
          },
          {
            url: "https://www.youtube.com/playlist?list=PLaeiqSJqUjhxbTxNIfF0gvsndy2Jlvz1L",
            about: text(
              "محاضرات منهجية لطلاب معهد آفاق للبناء العقدي عن الأديان الوضعية: الهندوسية، والبوذية، والجاينية والسيخية، والكونفوشية والطاوية، والشنتوية، والزرادشتية.",
              "Methodical lectures for the students of the Afaq Institute on the man-made religions: Hinduism, Buddhism, Jainism and Sikhism, Confucianism and Taoism, Shinto and Zoroastrianism.",
            ),
          },
          {
            url: "https://www.youtube.com/playlist?list=PLZmIJBHGeCLw",
            about: text(
              "نقد أصول الفلسفة البوذية من خلال أصول دين الأنبياء، مع هشام صدقي الإبراشي: إثبات الصانع، والعدل الإلهي في مقابل الكرما، والبعث في مقابل التناسخ، وضرورة النبوة، وحقيقة الروح، وفقه دعوة البوذيين.",
              "A critique of the foundations of Buddhist philosophy through the prophets' faith, with Hisham Sedki El-Ebrashy: the Creator, divine justice versus karma, resurrection versus reincarnation, the need for prophethood, the reality of the soul, and calling Buddhists to Islam.",
            ),
          },
        ]),
        field("quranists", text("مشروع الرد على القرآنيين ومنكري السنة", "Project: answering Quranists and Sunnah deniers"), {
          ar: ["حجية السنة ومكانتها", "علوم الحديث وتدوين السنة", "أشهر شبهاتهم"],
          en: ["The authority and place of the Sunnah", "The sciences of hadith and how the Sunnah was recorded", "Their best-known claims"],
        }),
        field("feminism", text("مشروع الرد على النسوية", "Project: answering feminism"), {
          ar: ["المرأة في الإسلام: الحقوق والواجبات", "نشأة النسوية وأصولها", "أشهر شبهاتها"],
          en: ["Women in Islam: rights and duties", "The origins and roots of feminism", "Its best-known claims"],
        }),
        field("secularism", text("مشروع الرد على العلمانية", "Project: answering secularism"), {
          ar: ["مفهوم العلمانية ونشأتها", "شمول الإسلام للحياة", "أشهر شبهاتها"],
          en: ["What secularism is and where it came from", "Islam as a whole way of life", "Its best-known claims"],
        }),
        field("kemetism", text("مشروع الرد على الكمايتة", "Project: answering Kemetism"), {
          ar: ["أفكار الكمايتة ونشأتها", "دعاوى الهوية والعرق", "موقف الإسلام من العصبية والوثنية", "أشهر شبهاتهم"],
          en: [
            "What Kemetism is and where it came from",
            "Its claims about identity and race",
            "Where Islam stands on tribalism and idolatry",
            "Their best-known claims",
          ],
        }),
        field("spirituality", text("مشروع الرد على دعاوى الطاقة والروحانيات الحديثة", "Project: answering \"energy\" and modern spirituality claims"), {
          ar: ["أصول هذه الدعاوى وجذورها", "موقف العقيدة منها", "أشهر صورها المنتشرة"],
          en: ["The origins and roots of these claims", "Where Islamic creed stands on them", "Their most widespread forms"],
        }),
        {
          // Builds on the first path itself (Zad's books), so it has no study list of its own.
          id: "preaching",
          title: text("مشروع العلم الشرعي والوعظ", "Project: Islamic knowledge and preaching"),
          topics: [],
          ready: true,
          project: text(
            "بما أنك درست كتب «ما لا يسع المسلمَ جهلُه»، فأنت الآن قادر على تبنّي هذا المشروع: تصنع مما تعلّمته فيديوهات تعليمية ووعظية ودعوية، بمهارات المسار التقني.",
            "Since you have studied the books of \"What no Muslim may be ignorant of\", you can now take on this project: turn what you learned into educational, preaching and da'wah videos, with the technology track's skills.",
          ),
        },
      ],
    },
  ],
};

// Technology: one path in two stages, the foundation path then the advanced one. Shared by both tracks for now.

const techDomain: RoadmapDomain = {
  id: "tech",
  title: text("المسار التقني", "Technology"),
  description: text(
    "مسار موحّد: يبدأ بالمسار التأسيسي ليستخدم الدارس التقنية استخدامًا جيدًا جدًا، ثم المسار المتقدم لفهم البرمجيات وبناء الأنظمة بتعمّق.",
    "One path: it starts with the foundation path, to use technology very well, then the advanced path, to understand software and build systems in depth.",
  ),
  paths: [
    {
      id: "foundation",
      title: text("المسار التأسيسي", "The foundation path"),
      description: text(
        "استخدام الكمبيوتر والإنترنت بثقة، وتنظيم الحياة، والتعمق في أدوات الذكاء الاصطناعي، وصناعة المحتوى الدعوي ونشره، وإنشاء المواقع. ومعه اللغة الإنجليزية حتى مستوى A2.",
        "Using the computer and the internet with confidence, organizing life, going deep into AI tools, making and publishing da'wah content, and building websites. With English up to A2.",
      ),
      levels: [
        {
          id: "level-1",
          title: text("المستوى الأول: الكمبيوتر والإنترنت", "Level one: the computer and the internet"),
          topics: [
            topic("computer", text("الكمبيوتر", "The computer"), {
              ar: ["نظام التشغيل", "الملفات والمجلدات", "تثبيت البرامج وتحديثها", "الاختصارات والكتابة بالعربية والإنجليزية"],
              en: ["The operating system", "Files and folders", "Installing and updating software", "Shortcuts and typing in Arabic and English"],
            }),
            topic("internet", text("الإنترنت", "The internet"), {
              ar: ["المتصفح", "البحث الذكي وتقييم المصادر", "البريد الإلكتروني", "التخزين السحابي ومشاركة الملفات"],
              en: ["The browser", "Smart searching and judging sources", "Email", "Cloud storage and sharing files"],
            }),
            topic("security", text("الأمان الرقمي", "Digital safety"), {
              ar: ["كلمات مرور قوية ومدير كلمات المرور", "التحقق بخطوتين", "كشف الاحتيال", "الخصوصية"],
              en: ["Strong passwords and a password manager", "Two-step verification", "Spotting scams", "Privacy"],
            }),
            topic("english-a1", text("اللغة الإنجليزية: A1", "English: A1"), {
              ar: ["الأساسيات ومصطلحات الكمبيوتر والإنترنت"],
              en: ["The basics, and computer and internet terms"],
            }),
          ],
          project: text(
            "يرتّب ملفات جهازه، وينشئ بريدًا احترافيًا، ويرفع ملفاته المهمة على التخزين السحابي، ويفعّل التحقق بخطوتين على حساباته.",
            "Organize your files, set up a professional email, upload your important files to cloud storage, and turn on two-step verification on your accounts.",
          ),
        },
        {
          id: "level-2",
          title: text(
            "المستوى الثاني: التنظيم والإنتاجية ومقدمة في استخدام الذكاء الاصطناعي",
            "Level two: organization, productivity and an introduction to using AI",
          ),
          topics: [
            topic("organization", text("التنظيم في Notion", "Organizing in Notion"), {
              ar: ["الصفحات والمهام", "قواعد البيانات (جدول، كانبان، تقويم)", "التقويم والتخطيط الأسبوعي", "تتبّع العادات (الورد اليومي، الأذكار، المذاكرة)"],
              en: ["Pages and tasks", "Databases (table, kanban, calendar)", "Calendar and weekly planning", "Habit tracking (daily Quran, adhkar, study)"],
            }),
            topic("office", text("أدوات المكتب", "Office tools"), {
              ar: ["المستندات والجداول (Google Docs وSheets)"],
              en: ["Documents and spreadsheets (Google Docs and Sheets)"],
            }),
            topic("ai-intro", text("مقدمة في الذكاء الاصطناعي", "Introduction to AI"), {
              ar: [
                "ما هو ببساطة",
                "أشهر أدواته (Claude، ChatGPT، Gemini، NotebookLM)",
                "حدوده وأخطاؤه، والخصوصية",
                "الضوابط الشرعية: لا يُعتمد عليه في الفتوى ولا في نقل الأحكام والأحاديث دون تحقق",
              ],
              en: [
                "What it is, simply",
                "Its best-known tools (Claude, ChatGPT, Gemini, NotebookLM)",
                "Its limits and mistakes, and privacy",
                "Islamic guidelines: never relied on for fatwas, nor for quoting rulings and hadiths without checking",
              ],
            }),
            topic("english-a1-a2", text("اللغة الإنجليزية: من A1 إلى A2", "English: A1 to A2"), {
              ar: ["قراءة الأدلة البسيطة وكتابة بريد قصير"],
              en: ["Reading simple guides and writing a short email"],
            }),
          ],
          project: text(
            "يبني «لوحة حياته» في Notion (مهامه وأهدافه وورده وخطة مذاكرته) ويستخدمها شهرًا كاملًا، ويستعين بالذكاء الاصطناعي في صياغة أهدافه وتقسيمها.",
            "Build your \"life dashboard\" in Notion (tasks, goals, daily Quran and study plan) and use it for a full month, with AI helping you write and break down your goals.",
          ),
        },
        {
          id: "level-3",
          title: text(
            "المستوى الثالث: التعمق في استخدام الذكاء الاصطناعي وصناعة المحتوى",
            "Level three: going deep into using AI, and making content",
          ),
          topics: [
            topic("prompting", text("كتابة الأوامر", "Prompting"), {
              ar: ["السياق والمطلوب والأمثلة", "تحسين الرد حتى يصح"],
              en: ["Context, the request and examples", "Refining the answer until it is right"],
            }),
            topic("assistants", text("Claude وChatGPT بكل مميزاتهما", "Claude and ChatGPT and all their features"), {
              ar: [
                "المشاريع والتعليمات المخصصة والذاكرة",
                "رفع الملفات وتحليلها",
                "البحث في الويب",
                "المحادثة الصوتية",
                "Artifacts وCanvas",
                "GPTs وربط الأدوات",
              ],
              en: [
                "Projects, custom instructions and memory",
                "Uploading and analyzing files",
                "Web search",
                "Voice conversations",
                "Artifacts and Canvas",
                "GPTs and connecting tools",
              ],
            }),
            topic("ai-life", text("الذكاء الاصطناعي في الحياة والعمل", "AI in life and work"), {
              ar: ["المذاكرة", "الكتابة والتقارير", "التخطيط", "الأتمتة البسيطة"],
              en: ["Studying", "Writing and reports", "Planning", "Simple automation"],
            }),
            topic("ai-content", text("صناعة المحتوى الدعوي بالذكاء الاصطناعي", "Making da'wah content with AI"), {
              ar: [
                "الأفكار",
                "السكريبت والعناوين والوصف",
                "الصور المصغّرة",
                "ضوابط المحتوى الدعوي: الآيات والأحاديث والأحكام من مصادرها الموثوقة",
              ],
              en: [
                "Ideas",
                "Scripts, titles and descriptions",
                "Thumbnails",
                "Da'wah content guidelines: verses, hadiths and rulings from their trusted sources",
              ],
            }),
            topic("english-a2", text("اللغة الإنجليزية: A2", "English: A2"), {
              ar: ["كتابة الأوامر بالإنجليزية وفهم الردود"],
              en: ["Writing prompts in English and understanding the answers"],
            }),
          ],
          project: text(
            "يُنشئ «مساعدًا شخصيًا» (مشروعًا في Claude أو ChatGPT بتعليماته وملفاته) ويستخدمه في مهمة حقيقية، ويجهّز به سكريبتات أول ثلاثة فيديوهات دعوية.",
            "Create a \"personal assistant\" (a project in Claude or ChatGPT with your instructions and files), use it for a real task, and prepare the scripts of your first three da'wah videos with it.",
          ),
        },
        {
          id: "level-4",
          title: text(
            "المستوى الرابع: النشر وصناعة الفيديو وإنشاء المواقع",
            "Level four: publishing, making videos and building websites",
          ),
          topics: [
            topic("channels", text("قناة يوتيوب وحسابات التواصل", "A YouTube channel and social media"), {
              ar: [
                "إنشاء القناة وتجهيزها",
                "رفع الفيديو والقوائم والمقاطع القصيرة",
                "الحسابات على المنصات وربطها",
                "خطة نشر وجدول محتوى",
                "قراءة الإحصائيات",
              ],
              en: [
                "Creating and setting up the channel",
                "Uploading videos, playlists and Shorts",
                "Accounts on the platforms, linked together",
                "A publishing plan and content calendar",
                "Reading the analytics",
              ],
            }),
            topic("video", text("المونتاج والموشن جرافيك", "Video editing and motion graphics"), {
              ar: [
                "القص والصوت والترجمة",
                "الاستعانة بـ Claude في خطة المونتاج وتقطيع المقاطع القصيرة",
                "موشن جرافيك بالذكاء الاصطناعي",
              ],
              en: ["Cutting, sound and subtitles", "Using Claude to plan the edit and cut Shorts", "Motion graphics with AI"],
            }),
            topic("web-basics", text("مبادئ الويب والاستضافة والسيو", "Web, hosting and SEO basics"), {
              ar: ["الدومين والاستضافة وSSL", "أنواع الاستضافة", "العنوان والوصف وGoogle Search Console", "سيو اليوتيوب"],
              en: ["Domains, hosting and SSL", "Kinds of hosting", "Titles, descriptions and Google Search Console", "YouTube SEO"],
            }),
            topic("websites", text("إنشاء المواقع ونشرها", "Building and publishing websites"), {
              ar: [
                "وصف الموقع للذكاء الاصطناعي وتطويره خطوة خطوة",
                "GitHub",
                "النشر على Vercel أو GitHub Pages وربط الدومين",
              ],
              en: [
                "Describing the site to AI and improving it step by step",
                "GitHub",
                "Publishing on Vercel or GitHub Pages and connecting a domain",
              ],
            }),
            topic("english-a2-practice", text("اللغة الإنجليزية: A2", "English: A2"), {
              ar: ["قراءة الشروح البسيطة للأدوات ومصطلحاتها بالإنجليزية"],
              en: ["Reading simple tool guides and their terms in English"],
            }),
          ],
        },
      ],
      graduation: text(
        "قناة يوتيوب وحسابات تواصل منشور عليها أول ثلاثة فيديوهات دعوية (من سكريبتات المستوى الثالث) بمونتاج وصور مصغّرة، وموقع نافع صغير منشور على الإنترنت: موقع شخصي، أو صفحة لمسجد أو حلقة تحفيظ، أو أداة بسيطة تخدم الناس.",
        "A YouTube channel and social accounts with your first three da'wah videos published (from the level-three scripts), edited and with thumbnails; and a small useful website published online: a personal site, a page for a mosque or Quran circle, or a simple tool that serves people.",
      ),
    },
    {
      id: "advanced",
      title: text("المسار المتقدم", "The advanced path"),
      description: text(
        "أساسيات البرمجيات بتعمّق، دون التقيد بلغة برمجة؛ فالذكاء الاصطناعي يساعد في التعلّم والكتابة، والمهم أن يفهم الدارس كل سطر وكل قرار ويُحسن مراجعة عمل الذكاء الاصطناعي.",
        "Software fundamentals in depth, not tied to one programming language: AI helps with learning and writing code, and what matters is understanding every line and every decision, and reviewing AI's work well.",
      ),
      levels: [
        {
          id: "level-1",
          title: text("المستوى الأول: مفاهيم البرمجة", "Level one: programming concepts"),
          topics: [
            topic("machine", text("كيف ينفّذ الكمبيوتر البرنامج", "How the computer runs a program"), {
              ar: ["الذاكرة والمعالج والملفات"],
              en: ["Memory, the processor and files"],
            }),
            topic("basics", text("أساسيات البرمجة", "Programming basics"), {
              ar: ["المتغيرات وأنواع البيانات", "الشروط والتكرار", "الدوال (Functions)"],
              en: ["Variables and data types", "Conditions and loops", "Functions"],
            }),
            topic("dsa", text("هياكل البيانات والخوارزميات", "Data structures and algorithms"), {
              ar: ["الهياكل الأساسية", "البحث والترتيب", "قياس الأداء (Big O)"],
              en: ["The basic structures", "Searching and sorting", "Measuring performance (Big O)"],
            }),
            topic("paradigms", text("أنماط البرمجة", "Programming paradigms"), {
              ar: ["البرمجة الكائنية (OOP)", "البرمجة الوظيفية"],
              en: ["Object-oriented programming (OOP)", "Functional programming"],
            }),
            topic("reading", text("قراءة الكود", "Reading code"), {
              ar: ["تصحيح الأخطاء (Debugging)", "فهم كود الآخرين", "التعلّم من الذكاء الاصطناعي بالسؤال والاختبار لا بالنسخ"],
              en: ["Debugging", "Understanding other people's code", "Learning from AI by asking and testing, not copying"],
            }),
            topic("tools", text("الأدوات", "Tools"), {
              ar: ["Git وGitHub", "سطر الأوامر (Terminal)"],
              en: ["Git and GitHub", "The command line (Terminal)"],
            }),
          ],
          project: text(
            "أدوات صغيرة يبنيها بالذكاء الاصطناعي، ويشرح كل جزء فيها بكلامه.",
            "Small tools built with AI, with every part explained in your own words.",
          ),
        },
        {
          id: "level-2",
          title: text("المستوى الثاني: هندسة البرمجيات", "Level two: software engineering"),
          topics: [
            topic("quality", text("جودة الكود", "Code quality"), {
              ar: ["Clean Code", "مبادئ SOLID"],
              en: ["Clean Code", "SOLID principles"],
            }),
            topic("patterns", text("أنماط التصميم (Design Patterns)", "Design patterns"), {
              ar: ["المشكلة التي يحلها كل نمط ومتى يُستخدم"],
              en: ["The problem each pattern solves, and when to use it"],
            }),
            topic("architecture", text("الأركيتكتشر", "Architecture"), {
              ar: ["الطبقات", "MVC", "Clean Architecture", "Monolith وMicroservices"],
              en: ["Layers", "MVC", "Clean Architecture", "Monoliths and microservices"],
            }),
            topic("testing", text("الاختبار والمراجعة", "Testing and review"), {
              ar: ["اختبارات الوحدات والتكامل", "مراجعة الكود", "كشف أخطاء الذكاء الاصطناعي وقراراته الخاطئة"],
              en: ["Unit and integration tests", "Code review", "Catching AI's mistakes and wrong decisions"],
            }),
          ],
          project: text(
            "يصمم أركيتكتشر مشروع قبل بنائه، ثم يبنيه بالذكاء الاصطناعي بكود نظيف ومختبَر.",
            "Design a project's architecture before building it, then build it with AI in clean, tested code.",
          ),
        },
        {
          id: "level-3",
          title: text(
            "المستوى الثالث: بناء الأنظمة والرفع والتعامل مع الاستضافة وأمان الموقع",
            "Level three: building systems, deploying them, working with hosting, and site security",
          ),
          topics: [
            topic("web", text("الإنترنت بتعمّق", "The internet in depth"), {
              ar: ["HTTP", "DNS", "CDN", "المتصفح والسيرفر"],
              en: ["HTTP", "DNS", "CDNs", "The browser and the server"],
            }),
            topic("components", text("مكونات النظام", "The parts of a system"), {
              ar: ["الواجهات والخلفية والـ API", "قواعد البيانات (SQL وNoSQL)"],
              en: ["Frontend, backend and APIs", "Databases (SQL and NoSQL)"],
            }),
            topic("security", text("الأمان", "Security"), {
              ar: ["تسجيل الدخول", "الصلاحيات", "الأسرار", "حماية البيانات"],
              en: ["Sign-in", "Permissions", "Secrets", "Protecting data"],
            }),
            topic("system-design", text("تصميم الأنظمة (System Design)", "System design"), {
              ar: ["الكاش", "الطوابير", "التوسع"],
              en: ["Caching", "Queues", "Scaling"],
            }),
            topic("hosting", text("الاستضافة بتعمّق", "Hosting in depth"), {
              ar: ["المشتركة", "VPS", "السحابية", "Serverless", "الدومين وDNS وSSL"],
              en: ["Shared", "VPS", "Cloud", "Serverless", "Domains, DNS and SSL"],
            }),
            topic("operations", text("تشغيل الأنظمة ونشرها", "Running and deploying systems"), {
              ar: ["البيئات", "CI/CD", "Docker", "المراقبة", "النسخ الاحتياطي"],
              en: ["Environments", "CI/CD", "Docker", "Monitoring", "Backups"],
            }),
          ],
          project: text(
            "تطبيق ويب كامل (واجهة وAPI وقاعدة بيانات وتسجيل دخول) منشور بنشر تلقائي ونسخ احتياطي.",
            "A complete web app (frontend, API, database and sign-in) published with automatic deployment and backups.",
          ),
        },
        {
          id: "level-4",
          title: text("المستوى الرابع: إدارة المشاريع والسيو والتسويق", "Level four: project management, SEO and marketing"),
          topics: [
            topic("management", text("إدارة المشاريع", "Project management"), {
              ar: ["Agile وScrum", "تقسيم المهام وتقدير الوقت", "GitHub Projects وNotion"],
              en: ["Agile and Scrum", "Breaking down tasks and estimating time", "GitHub Projects and Notion"],
            }),
            topic("teamwork", text("العمل في فريق", "Working in a team"), {
              ar: ["مراجعة الكود", "التوثيق", "إدارة وكلاء الذكاء الاصطناعي"],
              en: ["Code review", "Documentation", "Managing AI agents"],
            }),
            topic("product", text("التفكير بعقلية المنتج", "Product thinking"), {
              ar: ["مشكلة المستخدم", "النسخة الأولى (MVP)", "القياس"],
              en: ["The user's problem", "The first version (MVP)", "Measuring"],
            }),
            topic("seo", text("السيو بتعمّق", "SEO in depth"), {
              ar: ["السيو التقني", "المحتوى والكلمات المفتاحية", "البيانات المنظّمة", "سرعة الموقع", "Search Console"],
              en: ["Technical SEO", "Content and keywords", "Structured data", "Site speed", "Search Console"],
            }),
            topic("marketing", text("التسويق الرقمي", "Digital marketing"), {
              ar: ["وسائل التواصل", "الإعلانات", "البريد", "قمع التحويل", "التحليلات"],
              en: ["Social media", "Ads", "Email", "The conversion funnel", "Analytics"],
            }),
          ],
        },
      ],
      graduation: text(
        "منتج حقيقي يخدم الإسلام والمسلمين أو الناس: يُصمَّم ويُبنى ويُنشر، ويُدار كمشروع، ويُسوَّق ويظهر في محركات البحث.",
        "A real product that serves Islam, Muslims or people: designed, built and published, run as a project, marketed and found in search engines.",
      ),
    },
  ],
};

export const externalDomains: RoadmapDomain[] = [externalShariaDomain, techDomain];

/** Frozen: the owner works on the external track only for now. */
export const platformDomains: RoadmapDomain[] = [platformShariaDomain, techDomain];
