const words = {
    levels: [
        {
            level: 1,
            name: "רמה 1: יסודות",
            words: [
                { hebrew: "שלום", spanish: "Hola" },
                { hebrew: "להתראות", spanish: "Adiós" },
                { hebrew: "תודה", spanish: "Gracias" },
                { hebrew: "בבקשה", spanish: "Por favor" },
                { hebrew: "סליחה", spanish: "Perdón" },
                { hebrew: "כן", spanish: "Sí" },
                { hebrew: "לא", spanish: "No" },
                { hebrew: "בוקר טוב", spanish: "Buenos días" },
                { hebrew: "ערב טוב", spanish: "Buenas tardes" },
                { hebrew: "לילה טוב", spanish: "Buenas noches" },
                { hebrew: "מה שלומך?", spanish: "¿Cómo estás?" },
                { hebrew: "טוב", spanish: "Bien" },
                { hebrew: "רע", spanish: "Mal" },
                { hebrew: "שם", spanish: "Nombre" },
                { hebrew: "אני", spanish: "Yo" },
                { hebrew: "את/ה", spanish: "Tú" }
            ]
        },
        {
            level: 2,
            name: "רמה 2: אנשים ומשפחה",
            words: [
                { hebrew: "איש", spanish: "Hombre" },
                { hebrew: "אישה", spanish: "Mujer" },
                { hebrew: "ילד", spanish: "Niño" },
                { hebrew: "ילדה", spanish: "Niña" },
                { hebrew: "חבר", spanish: "Amigo" },
                { hebrew: "חברה", spanish: "Amiga" },
                { hebrew: "משפחה", spanish: "Familia" },
                { hebrew: "אבא", spanish: "Padre" },
                { hebrew: "אמא", spanish: "Madre" },
                { hebrew: "אח", spanish: "Hermano" },
                { hebrew: "אחות", spanish: "Hermana" },
                { hebrew: "תינוק", spanish: "Bebé" },
                { hebrew: "סבא", spanish: "Abuelo" },
                { hebrew: "סבתא", spanish: "Abuela" }
            ]
        },
        {
            level: 3,
            name: "רמה 3: מספרים",
            words: [
                { hebrew: "אחת", spanish: "Uno" },
                { hebrew: "שתיים", spanish: "Dos" },
                { hebrew: "שלוש", spanish: "Tres" },
                { hebrew: "ארבע", spanish: "Cuatro" },
                { hebrew: "חמש", spanish: "Cinco" },
                { hebrew: "שש", spanish: "Seis" },
                { hebrew: "שבע", spanish: "Siete" },
                { hebrew: "שמונה", spanish: "Ocho" },
                { hebrew: "תשע", spanish: "Nueve" },
                { hebrew: "עשר", spanish: "Diez" },
                { hebrew: "אחת עשרה", spanish: "Once" },
                { hebrew: "שתים עשרה", spanish: "Doce" },
                { hebrew: "עשרים", spanish: "Veinte" },
                { hebrew: "שלושים", spanish: "Treinta" },
                { hebrew: "מאה", spanish: "Cien" }
            ]
        },
        {
            level: 4,
            name: "רמה 4: צבעים",
            words: [
                { hebrew: "אדום", spanish: "Rojo" },
                { hebrew: "כחול", spanish: "Azul" },
                { hebrew: "ירוק", spanish: "Verde" },
                { hebrew: "צהוב", spanish: "Amarillo" },
                { hebrew: "שחור", spanish: "Negro" },
                { hebrew: "לבן", spanish: "Blanco" },
                { hebrew: "כתום", spanish: "Naranja" },
                { hebrew: "סגול", spanish: "Morado" },
                { hebrew: "ורוד", spanish: "Rosa" },
                { hebrew: "חום", spanish: "Marrón" },
                { hebrew: "אפור", spanish: "Gris" },
                { hebrew: "צבע", spanish: "Color" }
            ]
        },
        {
            level: 5,
            name: "רמה 5: חיות",
            words: [
                { hebrew: "כלב", spanish: "Perro" },
                { hebrew: "חתול", spanish: "Gato" },
                { hebrew: "סוס", spanish: "Caballo" },
                { hebrew: "פרה", spanish: "Vaca" },
                { hebrew: "ציפור", spanish: "Pájaro" },
                { hebrew: "דג", spanish: "Pez" },
                { hebrew: "אריה", spanish: "León" },
                { hebrew: "פיל", spanish: "Elefante" },
                { hebrew: "קוף", spanish: "Mono" },
                { hebrew: "נחש", spanish: "Serpiente" }
            ]
        },
        {
            level: 6,
            name: "רמה 6: אוכל ושתיה",
            words: [
                { hebrew: "מים", spanish: "Agua" },
                { hebrew: "לחם", spanish: "Pan" },
                { hebrew: "גבינה", spanish: "Queso" },
                { hebrew: "תפוח", spanish: "Manzana" },
                { hebrew: "בננה", spanish: "Plátano" },
                { hebrew: "עוף", spanish: "Pollo" },
                { hebrew: "אורז", spanish: "Arroz" },
                { hebrew: "ביצה", spanish: "Huevo" },
                { hebrew: "חלב", spanish: "Leche" },
                { hebrew: "קפה", spanish: "Café" },
                { hebrew: "יין", spanish: "Vino" },
                { hebrew: "סלט", spanish: "Ensalada" },
                { hebrew: "מרק", spanish: "Sopa" },
                { hebrew: "סוכר", spanish: "Azúcar" }
            ]
        },
        {
            level: 7,
            name: "רמה 7: פעלים נפוצים",
            words: [
                { hebrew: "להיות", spanish: "Ser/Estar" },
                { hebrew: "יש לי", spanish: "Tener" },
                { hebrew: "לעשות", spanish: "Hacer" },
                { hebrew: "ללכת", spanish: "Ir" },
                { hebrew: "לרצות", spanish: "Querer" },
                { hebrew: "יכול", spanish: "Poder" },
                { hebrew: "לדבר", spanish: "Hablar" },
                { hebrew: "לאכול", spanish: "Comer" },
                { hebrew: "לחיות", spanish: "Vivir" },
                { hebrew: "לראות", spanish: "Ver" },
                { hebrew: "לשמוע", spanish: "Oír" },
                { hebrew: "לדעת", spanish: "Saber" },
                { hebrew: "לתת", spanish: "Dar" }
            ]
        },
        {
            level: 8,
            name: "רמה 8: שמות תואר",
            words: [
                { hebrew: "גדול", spanish: "Grande" },
                { hebrew: "קטן", spanish: "Pequeño" },
                { hebrew: "טוב", spanish: "Bueno" },
                { hebrew: "רע", spanish: "Malo" },
                { hebrew: "יפה", spanish: "Bonito/Hermoso" },
                { hebrew: "מכוער", spanish: "Feo" },
                { hebrew: "קל", spanish: "Fácil" },
                { hebrew: "קשה", spanish: "Difícil" },
                { hebrew: "חם", spanish: "Caliente" },
                { hebrew: "קר", spanish: "Frío" },
                { hebrew: "חדש", spanish: "Nuevo" },
                { hebrew: "ישן", spanish: "Viejo" },
                { hebrew: "שמח", spanish: "Feliz" },
                { hebrew: "עצוב", spanish: "Triste" }
            ]
        },
        {
            level: 9,
            name: "רמה 9: בגדים",
            words: [
                { hebrew: "חולצה", spanish: "Camisa" },
                { hebrew: "מכנסיים", spanish: "Pantalones" },
                { hebrew: "שמלה", spanish: "Vestido" },
                { hebrew: "נעליים", spanish: "Zapatos" },
                { hebrew: "כובע", spanish: "Sombrero" },
                { hebrew: "מעיל", spanish: "Abrigo" },
                { hebrew: "גרביים", spanish: "Calcetines" },
                { hebrew: "חצאית", spanish: "Falda" },
                { hebrew: "בגדים", spanish: "Ropa" }
            ]
        },
        {
            level: 10,
            name: "רמה 10: חלקי גוף",
            words: [
                { hebrew: "ראש", spanish: "Cabeza" },
                { hebrew: "יד", spanish: "Mano" },
                { hebrew: "רגל", spanish: "Pie" },
                { hebrew: "עין", spanish: "Ojo" },
                { hebrew: "אוזן", spanish: "Oído" },
                { hebrew: "אף", spanish: "Nariz" },
                { hebrew: "פה", spanish: "Boca" },
                { hebrew: "שיער", spanish: "Pelo" },
                { hebrew: "אצבע", spanish: "Dedo" },
                { hebrew: "גוף", spanish: "Cuerpo" }
            ]
        },
        {
            level: 11,
            name: "רמה 11: הבית",
            words: [
                { hebrew: "בית", spanish: "Casa" },
                { hebrew: "דלת", spanish: "Puerta" },
                { hebrew: "חלון", spanish: "Ventana" },
                { hebrew: "חדר", spanish: "Habitación" },
                { hebrew: "מטבח", spanish: "Cocina" },
                { hebrew: "אמבטיה", spanish: "Baño" },
                { hebrew: "מיטה", spanish: "Cama" },
                { hebrew: "שולחן", spanish: "Mesa" },
                { hebrew: "כיסא", spanish: "Silla" },
                { hebrew: "גג", spanish: "Techo" }
            ]
        },
        {
            level: 12,
            name: "רמה 12: עיר ותחבורה",
            words: [
                { hebrew: "עיר", spanish: "Ciudad" },
                { hebrew: "רחוב", spanish: "Calle" },
                { hebrew: "מכונית", spanish: "Coche" },
                { hebrew: "אוטובוס", spanish: "Autobús" },
                { hebrew: "רכבת", spanish: "Tren" },
                { hebrew: "אופניים", spanish: "Bicicleta" },
                { hebrew: "חנות", spanish: "Tienda" },
                { hebrew: "בנק", spanish: "Banco" },
                { hebrew: "בית חולים", spanish: "Hospital" },
                { hebrew: "גשר", spanish: "Puente" }
            ]
        },
        {
            level: 13,
            name: "רמה 13: טיולים ומקומות",
            words: [
                { hebrew: "מטוס", spanish: "Avión" },
                { hebrew: "שדה תעופה", spanish: "Aeropuerto" },
                { hebrew: "מלון", spanish: "Hotel" },
                { hebrew: "חוף", spanish: "Playa" },
                { hebrew: "מסעדה", spanish: "Restaurante" },
                { hebrew: "מפה", spanish: "Mapa" },
                { hebrew: "מזוודה", spanish: "Maleta" },
                { hebrew: "תייר", spanish: "Turista" },
                { hebrew: "הר", spanish: "Montaña" },
                { hebrew: "יער", spanish: "Bosque" },
                { hebrew: "נהר", spanish: "Río" }
            ]
        },
        {
            level: 14,
            name: "רמה 14: טבע ומזג אוויר",
            words: [
                { hebrew: "שמש", spanish: "Sol" },
                { hebrew: "ירח", spanish: "Luna" },
                { hebrew: "כוכב", spanish: "Estrella" },
                { hebrew: "שמיים", spanish: "Cielo" },
                { hebrew: "ענן", spanish: "Nube" },
                { hebrew: "גשם", spanish: "Lluvia" },
                { hebrew: "שלג", spanish: "Nieve" },
                { hebrew: "רוח", spanish: "Viento" },
                { hebrew: "פרח", spanish: "Flor" },
                { hebrew: "עץ", spanish: "Árbol" }
            ]
        },
        {
            level: 15,
            name: "רמה 15: זמן ולוח שנה",
            words: [
                { hebrew: "יום", spanish: "Día" },
                { hebrew: "שבוע", spanish: "Semana" },
                { hebrew: "חודש", spanish: "Mes" },
                { hebrew: "שנה", spanish: "Año" },
                { hebrew: "שעה", spanish: "Hora" },
                { hebrew: "דקה", spanish: "Minuto" },
                { hebrew: "שנייה", spanish: "Segundo" },
                { hebrew: "היום", spanish: "Hoy" },
                { hebrew: "מחר", spanish: "Mañana" },
                { hebrew: "אתמול", spanish: "Ayer" },
                { hebrew: "תמיד", spanish: "Siempre" },
                { hebrew: "אף פעם", spanish: "Nunca" }
            ]
        }
    ]
};
