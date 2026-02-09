/**
 * Configuration for the AMI School Report Card Generator
 */
const CONFIG = {
    // Mapping Classe -> Professeur
    classes: {
        M01: { teacher: "Mawlana Djafar" },
        M02: { teacher: "Mawlana Zubair" },
        M03: { teacher: "Mawlana Haja" },
        M04: { teacher: "Mawlana Fayçal" },
        M05: { teacher: "Mawlana Ismaïl" },
        M06: { teacher: "Mawlana Djafar" },
        M07: { teacher: "Mawlana Haja" },
        M08: { teacher: "Mawlana Ismaïl" },
        M10A: { teacher: "Mawlana Zubair" },
        M10B: { teacher: "Mawlana Fayçal" },
        F01: { teacher: "Aapa Afrine" },
        F02: { teacher: "Aapa Tasnime" },
        F03: { teacher: "Aapa Nassima" },
        F04: { teacher: "Aapa Nassima" },
    },

    /**
     * Translates CSV headers to Arabic/Transliteration/French display names.
     * Format: CSV_HEADER: { ar: "Arabic Name", trans: "Transliteration", fr: "French Translation" }
     */
    subjects: {
        "QA'IDAH": { ar: "قاعدة", trans: "QĀ'IDAH", fr: "BASES" },
        "QUR'AN": { ar: "القرآن", trans: "QUR'ĀN", fr: "SAINT-CORAN" },
        KALIMAH: { ar: "كلمة", trans: "KALIMAH", fr: "PAROLES DE FOI" },
        "DOU'A": { ar: "دعاء", trans: "DOU'Ā", fr: "INVOCATIONS" },
        SURAH: { ar: "سورة", trans: "SŪRAH", fr: "SOURATES" },
        FIQH: { ar: "فقه", trans: "FIQH", fr: "JURISPRUDENCE" },
        SIRAH: { ar: "سيرة", trans: "SĪRAH", fr: "BIOGRAPHIE" },
        ARABIC: { ar: "لغة عربية", trans: "", fr: "LANGUE ARABE" },
        TAJWID: { ar: "تجويد", trans: "TAJWĪD", fr: "INTONATIONS" },
        "AQA'ID": { ar: "عقائد", trans: "AQA'ID", fr: "CROYANCES" },
        HADITH: { ar: "حديث", trans: "HADĪTH", fr: "HADITH" },
        HIFZ: { ar: "حفظ", trans: "HIFZ", fr: "MÉMORISATION" },
        AKHLAQ: { ar: "أخلاق", trans: "AKHLĀQ", fr: "COMPORTEMENT" },
        HUDUR: { ar: "حضور", trans: "HUDHŪR", fr: "ASSIDUITÉ" },
    },

    // Columns to explicitly ignore (not subjects)
    ignoredColumns: [
        "#",
        "NOM",
        "PRÉNOM",
        "PRENOM",
        "TOTAL",
        "RANG",
        "MENTION",
        "MOYENNE",
        "MOYENNE GÉNÉRALE",
        "MOYENNE GENERALE",
        "MOY",
        "APPRÉCIATIONS GÉNÉRALES",
        "APPRECIATIONS GENERALES",
        "APPRÉCIATION GÉNÉRALE",
        "OBSERVATIONS",
        "DATE_NAISSANCE",
        "M01",
        "M10",
        "CLASSE",
        "ELEVE_ID",
    ],

    // Default max score if missing from CSV Line 2
    defaultMaxScore: 20,

    /**
     * Calendar Configuration
     */
    calendar: {
        yearStart: 2025,
        yearEnd: 2026,
        months: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5], // Sep -> Jun (0=Jan)
        monthNames: ["JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"],
        days: ["L", "M", "M", "J", "V", "S", "D"],
        events: [
            { start: "2025-09-06", end: "2025-09-06", desc: "Rentrée scolaire 2025/2026", type: "special" },
            { start: "2025-12-27", end: "2026-01-04", desc: "Vacances de fin d'année 2025", type: "holiday" },
            { start: "2026-01-17", end: "2026-01-25", desc: "Examens 1er semestre", type: "exam" },
            { start: "2026-02-07", end: "2026-02-07", desc: "Remise des bulletins du 1er semestre", type: "special" },
            { start: "2026-03-09", end: "2026-03-20", desc: "Vacances Ramadan & Aïd-ul-Fitr", type: "holiday" },
            { start: "2026-05-25", end: "2026-05-28", desc: "Vacances Aïd-ul-Adha", type: "holiday" },
            { start: "2026-06-06", end: "2026-06-14", desc: "Examens 2nd semestre", type: "exam" },
            { start: "2026-06-27", end: "2026-06-27", desc: "Remise des bulletins du 2nd semestre", type: "special" },
        ],
    },
};
