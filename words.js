var words = {
    levels: [
        {
            level: 1,
            name: "רמה 1: יסודות",
            words: [
                { hebrew: "שלום", foreign: "Hola" },
                { hebrew: "להתראות", foreign: "Adiós" },
                { hebrew: "תודה", foreign: "Gracias" },
                { hebrew: "בבקשה", foreign: "Por favor" },
                { hebrew: "סליחה", foreign: "Perdón" },
                { hebrew: "כן", foreign: "Sí" },
                { hebrew: "לא", foreign: "No" },
                { hebrew: "בוקר טוב", foreign: "Buenos días" },
                { hebrew: "ערב טוב", foreign: "Buenas tardes" },
                { hebrew: "לילה טוב", foreign: "Buenas noches" },
                { hebrew: "מה שלומך?", foreign: "¿Cómo estás?" },
                { hebrew: "טוב", foreign: "Bien" },
                { hebrew: "רע", foreign: "Mal" },
                { hebrew: "שם", foreign: "Nombre" },
                { hebrew: "אני", foreign: "Yo" },
                { hebrew: "את/ה", foreign: "Tú" }
            ]
        },
        {
            level: 2,
            name: "רמה 2: אנשים ומשפחה",
            words: [
                { hebrew: "איש", foreign: "Hombre" },
                { hebrew: "אישה", foreign: "Mujer" },
                { hebrew: "ילד", foreign: "Niño" },
                { hebrew: "ילדה", foreign: "Niña" },
                { hebrew: "חבר", foreign: "Amigo" },
                { hebrew: "חברה", foreign: "Amiga" },
                { hebrew: "משפחה", foreign: "Familia" },
                { hebrew: "אבא", foreign: "Padre" },
                { hebrew: "אמא", foreign: "Madre" },
                { hebrew: "אח", foreign: "Hermano" },
                { hebrew: "אחות", foreign: "Hermana" },
                { hebrew: "תינוק", foreign: "Bebé" },
                { hebrew: "סבא", foreign: "Abuelo" },
                { hebrew: "סבתא", foreign: "Abuela" },
                { hebrew: "בן", foreign: "Hijo" },
                { hebrew: "בת", foreign: "Hija" }
            ]
        },
        {
            level: 3,
            name: "רמה 3: מספרים",
            words: [
                { hebrew: "אחת", foreign: "Uno" },
                { hebrew: "שתיים", foreign: "Dos" },
                { hebrew: "שלוש", foreign: "Tres" },
                { hebrew: "ארבע", foreign: "Cuatro" },
                { hebrew: "חמש", foreign: "Cinco" },
                { hebrew: "שש", foreign: "Seis" },
                { hebrew: "שבע", foreign: "Siete" },
                { hebrew: "שמונה", foreign: "Ocho" },
                { hebrew: "תשע", foreign: "Nueve" },
                { hebrew: "עשר", foreign: "Diez" },
                { hebrew: "אחת עשרה", foreign: "Once" },
                { hebrew: "שתים עשרה", foreign: "Doce" },
                { hebrew: "עשרים", foreign: "Veinte" },
                { hebrew: "שלושים", foreign: "Treinta" },
                { hebrew: "מאה", foreign: "Cien" }
            ]
        },
        {
            level: 4,
            name: "רמה 4: צבעים",
            words: [
                { hebrew: "אדום", foreign: "Rojo" },
                { hebrew: "כחול", foreign: "Azul" },
                { hebrew: "ירוק", foreign: "Verde" },
                { hebrew: "צהוב", foreign: "Amarillo" },
                { hebrew: "שחור", foreign: "Negro" },
                { hebrew: "לבן", foreign: "Blanco" },
                { hebrew: "כתום", foreign: "Naranja" },
                { hebrew: "סגול", foreign: "Morado" },
                { hebrew: "ורוד", foreign: "Rosa" },
                { hebrew: "חום", foreign: "Marrón" },
                { hebrew: "אפור", foreign: "Gris" },
                { hebrew: "צבע", foreign: "Color" }
            ]
        },
        {
            level: 5,
            name: "רמה 5: חיות",
            words: [
                { hebrew: "כלב", foreign: "Perro" },
                { hebrew: "חתול", foreign: "Gato" },
                { hebrew: "סוס", foreign: "Caballo" },
                { hebrew: "פרה", foreign: "Vaca" },
                { hebrew: "ציפור", foreign: "Pájaro" },
                { hebrew: "דג", foreign: "Pez" },
                { hebrew: "אריה", foreign: "León" },
                { hebrew: "פיל", foreign: "Elefante" },
                { hebrew: "קוף", foreign: "Mono" },
                { hebrew: "נחש", foreign: "Serpiente" },
                { hebrew: "ארנב", foreign: "Conejo" },
                { hebrew: "עכבר", foreign: "Ratón" }
            ]
        },
        {
            level: 6,
            name: "רמה 6: אוכל ושתיה",
            words: [
                { hebrew: "מים", foreign: "Agua" },
                { hebrew: "לחם", foreign: "Pan" },
                { hebrew: "גבינה", foreign: "Queso" },
                { hebrew: "תפוח", foreign: "Manzana" },
                { hebrew: "בננה", foreign: "Plátano" },
                { hebrew: "עוף", foreign: "Pollo" },
                { hebrew: "אורז", foreign: "Arroz" },
                { hebrew: "ביצה", foreign: "Huevo" },
                { hebrew: "חלב", foreign: "Leche" },
                { hebrew: "קפה", foreign: "Café" },
                { hebrew: "יין", foreign: "Vino" },
                { hebrew: "סלט", foreign: "Ensalada" },
                { hebrew: "מרק", foreign: "Sopa" },
                { hebrew: "סוכר", foreign: "Azúcar" },
                { hebrew: "בשר", foreign: "Carne" }
            ]
        },
        {
            level: 7,
            name: "רמה 7: פעלים נפוצים",
            words: [
                { hebrew: "להיות", foreign: "Ser/Estar" },
                { hebrew: "יש לי", foreign: "Tener" },
                { hebrew: "לעשות", foreign: "Hacer" },
                { hebrew: "ללכת", foreign: "Ir" },
                { hebrew: "לרצות", foreign: "Querer" },
                { hebrew: "יכול", foreign: "Poder" },
                { hebrew: "לדבר", foreign: "Hablar" },
                { hebrew: "לאכול", foreign: "Comer" },
                { hebrew: "לחיות", foreign: "Vivir" },
                { hebrew: "לראות", foreign: "Ver" },
                { hebrew: "לשמוע", foreign: "Oír" },
                { hebrew: "לדעת", foreign: "Saber" },
                { hebrew: "לתת", foreign: "Dar" },
                { hebrew: "לקחת", foreign: "Tomar" },
                { hebrew: "למצוא", foreign: "Encontrar" }
            ]
        },
        {
            level: 8,
            name: "רמה 8: שמות תואר",
            words: [
                { hebrew: "גדול", foreign: "Grande" },
                { hebrew: "קטן", foreign: "Pequeño" },
                { hebrew: "טוב", foreign: "Bueno" },
                { hebrew: "רע", foreign: "Malo" },
                { hebrew: "יפה", foreign: "Bonito/Hermoso" },
                { hebrew: "מכוער", foreign: "Feo" },
                { hebrew: "קל", foreign: "Fácil" },
                { hebrew: "קשה", foreign: "Difícil" },
                { hebrew: "חם", foreign: "Caliente" },
                { hebrew: "קר", foreign: "Frío" },
                { hebrew: "חדש", foreign: "Nuevo" },
                { hebrew: "ישן", foreign: "Viejo" },
                { hebrew: "שמח", foreign: "Feliz" },
                { hebrew: "עצוב", foreign: "Triste" },
                { hebrew: "עשיר", foreign: "Rico" },
                { hebrew: "עני", foreign: "Pobre" }
            ]
        },
        {
            level: 9,
            name: "רמה 9: בגדים",
            words: [
                { hebrew: "חולצה", foreign: "Camisa" },
                { hebrew: "מכנסיים", foreign: "Pantalones" },
                { hebrew: "שמלה", foreign: "Vestido" },
                { hebrew: "נעליים", foreign: "Zapatos" },
                { hebrew: "כובע", foreign: "Sombrero" },
                { hebrew: "מעיל", foreign: "Abrigo" },
                { hebrew: "גרביים", foreign: "Calcetines" },
                { hebrew: "חצאית", foreign: "Falda" },
                { hebrew: "בגדים", foreign: "Ropa" },
                { hebrew: "חליפה", foreign: "Traje" }
            ]
        },
        {
            level: 10,
            name: "רמה 10: חלקי גוף",
            words: [
                { hebrew: "ראש", foreign: "Cabeza" },
                { hebrew: "יד", foreign: "Mano" },
                { hebrew: "רגל", foreign: "Pie" },
                { hebrew: "עין", foreign: "Ojo" },
                { hebrew: "אוזן", foreign: "Oído" },
                { hebrew: "אף", foreign: "Nariz" },
                { hebrew: "פה", foreign: "Boca" },
                { hebrew: "שיער", foreign: "Pelo" },
                { hebrew: "אצבע", foreign: "Dedo" },
                { hebrew: "גוף", foreign: "Cuerpo" },
                { hebrew: "לב", foreign: "Corazón" },
                { hebrew: "דם", foreign: "Sangre" }
            ]
        },
        {
            level: 11,
            name: "רמה 11: הבית",
            words: [
                { hebrew: "בית", foreign: "Casa" },
                { hebrew: "דלת", foreign: "Puerta" },
                { hebrew: "חלון", foreign: "Ventana" },
                { hebrew: "חדר", foreign: "Habitación" },
                { hebrew: "מטבח", foreign: "Cocina" },
                { hebrew: "אמבטיה", foreign: "Baño" },
                { hebrew: "מיטה", foreign: "Cama" },
                { hebrew: "שולחן", foreign: "Mesa" },
                { hebrew: "כיסא", foreign: "Silla" },
                { hebrew: "גג", foreign: "Techo" },
                { hebrew: "רצפה", foreign: "Suelo" },
                { hebrew: "קיר", foreign: "Pared" }
            ]
        },
        {
            level: 12,
            name: "רמה 12: עיר ותחבורה",
            words: [
                { hebrew: "עיר", foreign: "Ciudad" },
                { hebrew: "רחוב", foreign: "Calle" },
                { hebrew: "מכונית", foreign: "Coche" },
                { hebrew: "אוטובוס", foreign: "Autobús" },
                { hebrew: "רכבת", foreign: "Tren" },
                { hebrew: "אופניים", foreign: "Bicicleta" },
                { hebrew: "חנות", foreign: "Tienda" },
                { hebrew: "בנק", foreign: "Banco" },
                { hebrew: "בית חולים", foreign: "Hospital" },
                { hebrew: "גשר", foreign: "Puente" },
                { hebrew: "כיכר", foreign: "Plaza" }
            ]
        },
        {
            level: 13,
            name: "רמה 13: טיולים ומקומות",
            words: [
                { hebrew: "מטוס", foreign: "Avión" },
                { hebrew: "שדה תעופה", foreign: "Aeropuerto" },
                { hebrew: "מלון", foreign: "Hotel" },
                { hebrew: "חוף", foreign: "Playa" },
                { hebrew: "מסעדה", foreign: "Restaurante" },
                { hebrew: "מפה", foreign: "Mapa" },
                { hebrew: "מזוודה", foreign: "Maleta" },
                { hebrew: "תייר", foreign: "Turista" },
                { hebrew: "הר", foreign: "Montaña" },
                { hebrew: "יער", foreign: "Bosque" },
                { hebrew: "נהר", foreign: "Río" },
                { hebrew: "אגם", foreign: "Lago" }
            ]
        },
        {
            level: 14,
            name: "רמה 14: טבע ומזג אוויר",
            words: [
                { hebrew: "שמש", foreign: "Sol" },
                { hebrew: "ירח", foreign: "Luna" },
                { hebrew: "כוכב", foreign: "Estrella" },
                { hebrew: "שמיים", foreign: "Cielo" },
                { hebrew: "ענן", foreign: "Nube" },
                { hebrew: "גשם", foreign: "Lluvia" },
                { hebrew: "שלג", foreign: "Nieve" },
                { hebrew: "רוח", foreign: "Viento" },
                { hebrew: "פרח", foreign: "Flor" },
                { hebrew: "עץ", foreign: "Árbol" },
                { hebrew: "אש", foreign: "Fuego" }
            ]
        },
        {
            level: 15,
            name: "רמה 15: זמן ולוח שנה",
            words: [
                { hebrew: "יום", foreign: "Día" },
                { hebrew: "שבוע", foreign: "Semana" },
                { hebrew: "חודש", foreign: "Mes" },
                { hebrew: "שנה", foreign: "Año" },
                { hebrew: "שעה", foreign: "Hora" },
                { hebrew: "דקה", foreign: "Minuto" },
                { hebrew: "שנייה", foreign: "Segundo" },
                { hebrew: "היום", foreign: "Hoy" },
                { hebrew: "מחר", foreign: "Mañana" },
                { hebrew: "אתמול", foreign: "Ayer" },
                { hebrew: "תמיד", foreign: "Siempre" },
                { hebrew: "אף פעם", foreign: "Nunca" },
                { hebrew: "עכשיו", foreign: "Ahora" }
            ]
        }
    ]
};
