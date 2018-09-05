/* 
This script is used to replace massively in an xml file things like 
    'xml:lang="x-default">Vitesse d\'air' to 'xml:lang="de-DE">Luftgeschwindigkeit'

More info : http://redmine.altima.fr/projects/babyliss-paris/wiki/BaByliss-Traduction (see importation of meta datas)

toDo: error with text like this Präzision & Einstellung because of the &

 is replaced with &apos;
" is replaced with &quot;
& is replaced with &amp;
< is replaced with &lt;
> is replaced with &gt;

*/


var fs = require('fs');
var file = 'source.xml'; // if no argv
var replacedFile = 'sortieXmlReplassor.xml'
if (process.argv[2] != undefined) { 
    file = process.argv[2];
    replacedFile = 'replaced_' + file;
}
var str = fs.readFileSync(`${__dirname}/${file}`, 'utf8');

var o = toReplaceObject = { //
    'xml:lang="fr-FR">Alias Name': 'xml:lang="es-ES">Alias Nombre',
    'xml:lang="fr-FR">Pas de zoom produit': 'xml:lang="es-ES">Sin zoom del producto',
    'xml:lang="fr-FR">Article minimized bloc': 'xml:lang="es-ES">Artículo minimizado bloq.',
    'xml:lang="fr-FR">Article tags': 'xml:lang="es-ES">Etiquetas de artículo',
    'xml:lang="fr-FR">Coiffure': 'xml:lang="es-ES">Pelo',
    'xml:lang="fr-FR">Boucles': 'xml:lang="es-ES">Rizos',
    'xml:lang="fr-FR">Barbe Homme': 'xml:lang="es-ES">Barba Hombre',
    'xml:lang="fr-FR">Lissage': 'xml:lang="es-ES">Alisado',
    'xml:lang="fr-FR">Cheveux Homme': 'xml:lang="es-ES">Cabello Hombre',
    'xml:lang="fr-FR">épilation': 'xml:lang="es-ES">depilación',
    'xml:lang="fr-FR">Beauté': 'xml:lang="es-ES">Belleza',
    'xml:lang="fr-FR">tuto coiffure': 'xml:lang="es-ES">tutorial cabello',
    'xml:lang="fr-FR">Image bloc (page list)': 'xml:lang="es-ES">Image bloc (lista de página)',
    'xml:lang="fr-FR">Image bloc tag': 'xml:lang="es-ES">Image bloc tag',
    'xml:lang="fr-FR">Image header': 'xml:lang="es-ES">Encabezado de imagen',
    'xml:lang="fr-FR">Name plus court': 'xml:lang="es-ES">Nombre más corto',
    'xml:lang="fr-FR">Products linked': 'xml:lang="es-ES">Productos vinculados',
    'xml:lang="fr-FR">Description de la category': 'xml:lang="es-ES">Descripción de la categoría',
    'xml:lang="fr-FR">Titre de la category': 'xml:lang="es-ES">Título de la categoría',
    'xml:lang="fr-FR">Bannière': 'xml:lang="es-ES">Banner',
    'xml:lang="fr-FR">Accessoires': 'xml:lang="es-ES">Accesorios',
    'xml:lang="fr-FR">Accessoire diamètre': 'xml:lang="es-ES">Accesorio diámetro',
    'xml:lang="fr-FR">Nombre d\'accessoires': 'xml:lang="es-ES">Número de accesorios',
    'xml:lang="fr-FR">Type de brosse soufflante': 'xml:lang="es-ES">Tipo de cepillo moldeador',
    'xml:lang="fr-FR">Type de sèche-cheveux': 'xml:lang="es-ES">Tipo de secador',
    'xml:lang="fr-FR">Flux d\'air': 'xml:lang="es-ES">Flujo de aire',
    'xml:lang="fr-FR">Amazon Retailer': 'xml:lang="es-ES">Amazon Retailer',
    'xml:lang="fr-FR">Nombre de brosses': 'xml:lang="es-ES">Número de cepillos',
    'xml:lang="fr-FR">Couleur': 'xml:lang="es-ES">Color',
    'xml:lang="fr-FR">Confort ressenti lors de la séance (vs douleur)': 'xml:lang="es-ES">Sensación de comodidad durante la sesión (vs dolor)',
    'xml:lang="fr-FR">Fonction boucleur': 'xml:lang="es-ES">Función rizador',
    'xml:lang="fr-FR">Type de boucleur': 'xml:lang="es-ES">Tipo de rizador',
    'xml:lang="fr-FR">Système de coupe': 'xml:lang="es-ES">Sistema de corte',
    'xml:lang="fr-FR">Description slot product': 'xml:lang="es-ES">Descripción slot product',
    'xml:lang="fr-FR">Diametre': 'xml:lang="es-ES">Diámetro',
    'xml:lang="fr-FR">Diamètre (hors poils)': 'xml:lang="es-ES">Diámetro (sin cerdas)',
    'xml:lang="fr-FR">Différentes fonctionnalités': 'xml:lang="es-ES">Diferentes funciones',
    'xml:lang="fr-FR">Choix du sens de rotation': 'xml:lang="es-ES">Elección del sentido de rotación',
    'xml:lang="fr-FR">Technique d\'épilation': 'xml:lang="es-ES">Técnica de depilación',
    'xml:lang="fr-FR">Avis de l\'expert': 'xml:lang="es-ES">Consejo del experto',
    'xml:lang="fr-FR">Nombre de face': 'xml:lang="es-ES">Número de cara',
    'xml:lang="fr-FR">product FAQ & Advice': 'xml:lang="es-ES">Preguntas frecuentes y Consejos de producto',
    'xml:lang="fr-FR">Accessoires': 'xml:lang="es-ES">Accesorios',
    'xml:lang="fr-FR">Coffret de rangement': 'xml:lang="es-ES">Estuche',
    'xml:lang="fr-FR">Trousse de rangement': 'xml:lang="es-ES">Neceser',
    'xml:lang="fr-FR">Peigne': 'xml:lang="es-ES">Peine',
    'xml:lang="fr-FR">Capot de protection': 'xml:lang="es-ES">Funda de protección',
    'xml:lang="fr-FR">Tondeuse de précision': 'xml:lang="es-ES">Cortapelos de precisión',
    'xml:lang="fr-FR">Concentrateur': 'xml:lang="es-ES">Concentrador',
    'xml:lang="fr-FR">Diffuseur': 'xml:lang="es-ES">Difusor',
    'xml:lang="fr-FR">Peigne rétractable': 'xml:lang="es-ES">Peine retráctil',
    'xml:lang="fr-FR">Peigne amovible': 'xml:lang="es-ES">Peine extraíble',
    'xml:lang="fr-FR">Brosse brushing': 'xml:lang="es-ES">Cepillo para brushing',
    'xml:lang="fr-FR">Pochette de rangement': 'xml:lang="es-ES">Neceser',
    'xml:lang="fr-FR">Tapis thermorésistant': 'xml:lang="es-ES">Alfombrilla termorresistente',
    'xml:lang="fr-FR">Peigne à moustache': 'xml:lang="es-ES">Peine para bigote',
    'xml:lang="fr-FR">Ciseaux': 'xml:lang="es-ES">Tijeras',
    'xml:lang="fr-FR">Brosse enfilable': 'xml:lang="es-ES">Cepillo intercambiable',
    'xml:lang="fr-FR">Gant isolant': 'xml:lang="es-ES">Guante aislante',
    'xml:lang="fr-FR">Socle de charge et rangement': 'xml:lang="es-ES">Base de carga y almacenaje',
    'xml:lang="fr-FR">Tapis isolant': 'xml:lang="es-ES">Alfombrilla aislante',
    'xml:lang="fr-FR">Tête lissante': 'xml:lang="es-ES">Cabezal alisador',
    'xml:lang="fr-FR">Pochette/Trousse': 'xml:lang="es-ES">Bolsa/estuche',
    'xml:lang="fr-FR">Pinces et épingles': 'xml:lang="es-ES">Pinzas y horquillas',
    'xml:lang="fr-FR">Auto-clip system': 'xml:lang="es-ES">Sistema Auto-clip',
    'xml:lang="fr-FR">Tête de précision': 'xml:lang="es-ES">Cabezal de precisión',
    'xml:lang="fr-FR">Réducteur de zone': 'xml:lang="es-ES">Reductor de zona',
    'xml:lang="fr-FR">Socle de rangement': 'xml:lang="es-ES">Base para soporte',
    'xml:lang="fr-FR">Besoins': 'xml:lang="es-ES">Requisitos',
    'xml:lang="fr-FR">Séchage rapide': 'xml:lang="es-ES">Secado rápido',
    'xml:lang="fr-FR">Brushing professionnel': 'xml:lang="es-ES">Cepillado profesional',
    'xml:lang="fr-FR">Respect du cheveu': 'xml:lang="es-ES">Protección del cabello',
    'xml:lang="fr-FR">Praticité/Compact': 'xml:lang="es-ES">Práctico/compacto',
    'xml:lang="fr-FR">Economie d\'énergie': 'xml:lang="es-ES">Ahorro de energía',
    'xml:lang="fr-FR">Boucler': 'xml:lang="es-ES">Rizar',
    'xml:lang="fr-FR">Lisser': 'xml:lang="es-ES">Alisar',
    'xml:lang="fr-FR">Gauffrer': 'xml:lang="es-ES">Ondular',
    'xml:lang="fr-FR">Démêlage': 'xml:lang="es-ES">Desenredado',
    'xml:lang="fr-FR">Brushing': 'xml:lang="es-ES">Cepillado',
    'xml:lang="fr-FR">Soin': 'xml:lang="es-ES">Cuidado',
    'xml:lang="fr-FR">Raser': 'xml:lang="es-ES">Rasurar',
    'xml:lang="fr-FR">Epiler': 'xml:lang="es-ES">Depilar',
    'xml:lang="fr-FR">L\'appareil': 'xml:lang="es-ES">El aparato',
    'xml:lang="fr-FR">Les accessoires': 'xml:lang="es-ES">Los accesorios',
    'xml:lang="fr-FR">Brosser/Peigner': 'xml:lang="es-ES">Cepillar/peinar',
    'xml:lang="fr-FR">Couper/Tailler': 'xml:lang="es-ES">Cortar/recortar',
    'xml:lang="fr-FR">Boucles': 'xml:lang="es-ES">Rizos',
    'xml:lang="fr-FR">Serrées': 'xml:lang="es-ES">Cerrados',
    'xml:lang="fr-FR">Aérées': 'xml:lang="es-ES">Sueltos',
    'xml:lang="fr-FR">Naturelles': 'xml:lang="es-ES">Naturales',
    'xml:lang="fr-FR">Larges': 'xml:lang="es-ES">Anchos',
    'xml:lang="fr-FR">Brosses': 'xml:lang="es-ES">Cepillos',
    'xml:lang="fr-FR">Poils de sanglier': 'xml:lang="es-ES">Cerdas de jabalí',
    'xml:lang="fr-FR">Thermique': 'xml:lang="es-ES">Térmico',
    'xml:lang="fr-FR">Picots en plastique': 'xml:lang="es-ES">Púas de plástico',
    'xml:lang="fr-FR">Collections': 'xml:lang="es-ES">Colecciones',
    'xml:lang="fr-FR">Ipanema': 'xml:lang="es-ES">Ipanema',
    'xml:lang="fr-FR">Chevrons': 'xml:lang="es-ES">Chevrons',
    'xml:lang="fr-FR">Arabesques': 'xml:lang="es-ES">Arabescas',
    'xml:lang="fr-FR">Tribal': 'xml:lang="es-ES">Tribal',
    'xml:lang="fr-FR">Sport': 'xml:lang="es-ES">Sport',
    'xml:lang="fr-FR">Mode': 'xml:lang="es-ES">Moda',
    'xml:lang="fr-FR">Bijoux': 'xml:lang="es-ES">Joyas',
    'xml:lang="fr-FR">Indispensables': 'xml:lang="es-ES">Básicos',
    'xml:lang="fr-FR">Ethnique': 'xml:lang="es-ES">Étnica',
    'xml:lang="fr-FR">Fonctions': 'xml:lang="es-ES">Funciones',
    'xml:lang="fr-FR">Ionic': 'xml:lang="es-ES">Iónico',
    'xml:lang="fr-FR">Turbo': 'xml:lang="es-ES">Turbo',
    'xml:lang="fr-FR">Air froid': 'xml:lang="es-ES">Aire frío',
    'xml:lang="fr-FR">Quick charge': 'xml:lang="es-ES">Quick Charge',
    'xml:lang="fr-FR">Wet & Dry': 'xml:lang="es-ES">Wet &amp; Dry',
    'xml:lang="fr-FR">Effilage': 'xml:lang="es-ES">Desfilado',
    'xml:lang="fr-FR">Affichage digital': 'xml:lang="es-ES">Indicador digital',
    'xml:lang="fr-FR">Waterproof': 'xml:lang="es-ES">Impermeable',
    'xml:lang="fr-FR">Brosse rotative': 'xml:lang="es-ES">Cepillo giratorio',
    'xml:lang="fr-FR">Fonction mémoire': 'xml:lang="es-ES">Función memoria',
    'xml:lang="fr-FR">Collecteur de poils': 'xml:lang="es-ES">Recolector de vello',
    'xml:lang="fr-FR">Rasage': 'xml:lang="es-ES">Afeitado',
    'xml:lang="fr-FR">Grossissante': 'xml:lang="es-ES">De aumento',
    'xml:lang="fr-FR">Normale': 'xml:lang="es-ES">Normal',
    'xml:lang="fr-FR">Pédicure': 'xml:lang="es-ES">Pedicura',
    'xml:lang="fr-FR">Manucure': 'xml:lang="es-ES">Manicura',
    'xml:lang="fr-FR">Skin sensor': 'xml:lang="es-ES">Skin sensor',
    'xml:lang="fr-FR">Connexion Bluetooth': 'xml:lang="es-ES">Conexión Bluetooth',
    'xml:lang="fr-FR">Vapeur': 'xml:lang="es-ES">Vapor',
    'xml:lang="fr-FR">Boucleur': 'xml:lang="es-ES">Rizador',
    'xml:lang="fr-FR">Air frais': 'xml:lang="es-ES">Aire frío',
    'xml:lang="fr-FR">Nettoyage facile': 'xml:lang="es-ES">Limpieza fácil',
    'xml:lang="fr-FR">Format': 'xml:lang="es-ES">Formato',
    'xml:lang="fr-FR">Galet': 'xml:lang="es-ES">Rodillo',
    'xml:lang="fr-FR">Pistolet': 'xml:lang="es-ES">Pistola',
    'xml:lang="fr-FR">Hauteurs de Coupe': 'xml:lang="es-ES">Alturas de corte',
    'xml:lang="fr-FR">4-34 mm': 'xml:lang="es-ES">4-34 mm',
    'xml:lang="fr-FR">3-36 mm': 'xml:lang="es-ES">3-36 mm',
    'xml:lang="fr-FR">3-25 mm': 'xml:lang="es-ES">3-25 mm',
    'xml:lang="fr-FR">1-35 mm': 'xml:lang="es-ES">1-35 mm',
    'xml:lang="fr-FR">1-20 mm': 'xml:lang="es-ES">1-20 mm',
    'xml:lang="fr-FR">0,4-10 mm': 'xml:lang="es-ES">0,4-10 mm',
    'xml:lang="fr-FR">0,4-12 mm': 'xml:lang="es-ES">0,4-12 mm',
    'xml:lang="fr-FR">Longueur de cheveux': 'xml:lang="es-ES">Longitud del cabello',
    'xml:lang="fr-FR">Court': 'xml:lang="es-ES">Corto',
    'xml:lang="fr-FR">Mi-long': 'xml:lang="es-ES">Media melena',
    'xml:lang="fr-FR">Long': 'xml:lang="es-ES">Largo',
    'xml:lang="fr-FR">Matières': 'xml:lang="es-ES">Materiales',
    'xml:lang="fr-FR">Polyester': 'xml:lang="es-ES">Poliéster',
    'xml:lang="fr-FR">Denim': 'xml:lang="es-ES">Denim',
    'xml:lang="fr-FR">Moteurs': 'xml:lang="es-ES">Motores',
    'xml:lang="fr-FR">Professionnel': 'xml:lang="es-ES">Profesional',
    'xml:lang="fr-FR">Classique': 'xml:lang="es-ES">Clásico',
    'xml:lang="fr-FR">Nombre de Flashs': 'xml:lang="es-ES">Número de pulsaciones',
    'xml:lang="fr-FR">300 000': 'xml:lang="es-ES">300 000',
    'xml:lang="fr-FR">200 000': 'xml:lang="es-ES">200 000',
    'xml:lang="fr-FR">100 000': 'xml:lang="es-ES">100 000',
    'xml:lang="fr-FR">Options': 'xml:lang="es-ES">Opciones',
    'xml:lang="fr-FR">Tête Sourcil': 'xml:lang="es-ES">Cabezal ceja',
    'xml:lang="fr-FR">Rasage contours nets': 'xml:lang="es-ES">Afeitado contornos definidos',
    'xml:lang="fr-FR">Nez/Oreille': 'xml:lang="es-ES">Nariz/orejas',
    'xml:lang="fr-FR">Massage': 'xml:lang="es-ES">Masaje',
    'xml:lang="fr-FR">Ventouses': 'xml:lang="es-ES">Ventosas',
    'xml:lang="fr-FR">Eclairage': 'xml:lang="es-ES">Iluminación',
    'xml:lang="fr-FR">Pédicure': 'xml:lang="es-ES">Pedicura',
    'xml:lang="fr-FR">Rouleau(x) massant(s)': 'xml:lang="es-ES">Rodillo(s) de masaje',
    'xml:lang="fr-FR">Lumière de précision': 'xml:lang="es-ES">Luz de precisión',
    'xml:lang="fr-FR">1 tête Corps': 'xml:lang="es-ES">1 cabezal Cuerpo',
    'xml:lang="fr-FR">1 tête Visage/Zones sensibles': 'xml:lang="es-ES">1 cabezal Cara / Zonas sensibles',
    'xml:lang="fr-FR">Picots/Poils': 'xml:lang="es-ES">Púas/Cerdas',
    'xml:lang="fr-FR">Nylon/Sanglier': 'xml:lang="es-ES">Nailon/jabalí',
    'xml:lang="fr-FR">Sanglier': 'xml:lang="es-ES">Jabalí',
    'xml:lang="fr-FR">Précision': 'xml:lang="es-ES">Precisión',
    'xml:lang="fr-FR">3 mm': 'xml:lang="es-ES">3 mm',
    'xml:lang="fr-FR">2 mm': 'xml:lang="es-ES">2 mm',
    'xml:lang="fr-FR">1 mm': 'xml:lang="es-ES">1 mm',
    'xml:lang="fr-FR">0,7 mm': 'xml:lang="es-ES">0,7 mm',
    'xml:lang="fr-FR">0,6 mm': 'xml:lang="es-ES">0,6 mm',
    'xml:lang="fr-FR">0,5 mm': 'xml:lang="es-ES">0,5 mm',
    'xml:lang="fr-FR">0,2 mm': 'xml:lang="es-ES">0,2 mm',
    'xml:lang="fr-FR">Réglage Hauteur': 'xml:lang="es-ES">Ajuste Altura',
    'xml:lang="fr-FR">Motorisé': 'xml:lang="es-ES">Motorizado',
    'xml:lang="fr-FR">Manuel': 'xml:lang="es-ES">Manual',
    'xml:lang="fr-FR">Sens de bouclage': 'xml:lang="es-ES">Sentido del rizo',
    'xml:lang="fr-FR">Droite': 'xml:lang="es-ES">Derecha',
    'xml:lang="fr-FR">Gauche': 'xml:lang="es-ES">Izquierda',
    'xml:lang="fr-FR">Alterné': 'xml:lang="es-ES">Alterno',
    'xml:lang="fr-FR">Styles': 'xml:lang="es-ES">Estilos',
    'xml:lang="fr-FR">Nomade': 'xml:lang="es-ES">Nómada',
    'xml:lang="fr-FR">Urbain': 'xml:lang="es-ES">Urbano',
    'xml:lang="fr-FR">Systèmes': 'xml:lang="es-ES">Sistemas',
    'xml:lang="fr-FR">Double tête': 'xml:lang="es-ES">Doble cabezal',
    'xml:lang="fr-FR">1 tête': 'xml:lang="es-ES">1 cabezal',
    'xml:lang="fr-FR">Type de cheveux': 'xml:lang="es-ES">Tipo de cabello',
    'xml:lang="fr-FR">Fins ou fragilisés': 'xml:lang="es-ES">Finos o débiles',
    'xml:lang="fr-FR">Normaux': 'xml:lang="es-ES">Normales',
    'xml:lang="fr-FR">Epais ou frisés': 'xml:lang="es-ES">Gruesos o rizos',
    'xml:lang="fr-FR">Tous types de cheveux': 'xml:lang="es-ES">Todo tipo de cabello',
    'xml:lang="fr-FR">Fins': 'xml:lang="es-ES">Finos',
    'xml:lang="fr-FR">Epais': 'xml:lang="es-ES">Gruesos',
    'xml:lang="fr-FR">Usages': 'xml:lang="es-ES">Usos',
    'xml:lang="fr-FR">Corps': 'xml:lang="es-ES">Cuerpo',
    'xml:lang="fr-FR">Cheveux': 'xml:lang="es-ES">Cabello',
    'xml:lang="fr-FR">Barbe': 'xml:lang="es-ES">Barba',
    'xml:lang="fr-FR">Utilisations': 'xml:lang="es-ES">Usos',
    'xml:lang="fr-FR">Washable': 'xml:lang="es-ES">Lavable',
    'xml:lang="fr-FR">Sans fil': 'xml:lang="es-ES">Sin cable',
    'xml:lang="fr-FR">Sur secteur': 'xml:lang="es-ES">Conectado a la red eléctrica',
    'xml:lang="fr-FR">Wet & Dry': 'xml:lang="es-ES">Wet &amp; Dry',
    'xml:lang="fr-FR">Vitesse d\'air': 'xml:lang="es-ES">Velocidad de aire',
    'xml:lang="fr-FR">50 - 85 km/h': 'xml:lang="es-ES">50 - 85 km/h',
    'xml:lang="fr-FR">90 - 170 km/h': 'xml:lang="es-ES">90 - 170 km/h',
    'xml:lang="fr-FR">> 200 km/h': 'xml:lang="es-ES">> 200 km/h',
    'xml:lang="fr-FR">Finition': 'xml:lang="es-ES">Acabado',
    'xml:lang="fr-FR">Liberté de mouvement': 'xml:lang="es-ES">Libertad de movimiento',
    'xml:lang="fr-FR">Touche air frais': 'xml:lang="es-ES">botón de aire frío',
    'xml:lang="fr-FR">Position air frais': 'xml:lang="es-ES">Posición de aire frío',
    'xml:lang="fr-FR">Type haardroger': 'xml:lang="es-ES">Tipo de secador',
    'xml:lang="fr-FR">Hauteur de coupe de cheveux': 'xml:lang="es-ES">Altura del corte de cabello',
    'xml:lang="fr-FR">Type de cheveux': 'xml:lang="es-ES">Tipo de cabello',
    'xml:lang="fr-FR">Type de tête': 'xml:lang="es-ES">Tipo de cabezal',
    'xml:lang="fr-FR">Hauteur de coupe': 'xml:lang="es-ES">Altura de corte',
    'xml:lang="fr-FR">Hauteur de Coupe': 'xml:lang="es-ES">Altura de corte',
    'xml:lang="fr-FR">Ionique': 'xml:lang="es-ES">Iónico',
    'xml:lang="fr-FR">Choix du temps de pose': 'xml:lang="es-ES">Elección del tiempo de marcado',
    'xml:lang="fr-FR">Eclairage': 'xml:lang="es-ES">Iluminación',
    'xml:lang="fr-FR">Grossissement': 'xml:lang="es-ES">Aumento',
    'xml:lang="fr-FR">Revêtement': 'xml:lang="es-ES">Revestimiento',
    'xml:lang="fr-FR">Modèle Lisseur': 'xml:lang="es-ES">Modelo plancha',
    'xml:lang="fr-FR">Sans mini-lisseur': 'xml:lang="es-ES">Sin miniplancha',
    'xml:lang="fr-FR">Avec mini-lisseur': 'xml:lang="es-ES">Con miniplancha',
    'xml:lang="fr-FR">Modele Lisseur Variation': 'xml:lang="es-ES">Modelo plancha variación',
    'xml:lang="fr-FR">Revêtement des plaques': 'xml:lang="es-ES">Revestimiento de las placas',
    'xml:lang="fr-FR">Alimentation': 'xml:lang="es-ES">Alimentación',
    'xml:lang="fr-FR">Précision et réglage': 'xml:lang="es-ES">Precisión y ajuste',
    'xml:lang="fr-FR">Fonction quick charge': 'xml:lang="es-ES">Función Quick Charge',
    'xml:lang="fr-FR">Prix de vente conseillé*': 'xml:lang="es-ES">Precio de venta recomendado*',
    'xml:lang="fr-FR">Taille': 'xml:lang="es-ES">Tamaño',
    'xml:lang="fr-FR">Starified Page product Assets n°5': 'xml:lang="es-ES">Starified Page product Assets n°5',
    'xml:lang="fr-FR">Rapidité d\'utilisation': 'xml:lang="es-ES">Rapidez de uso',
    'xml:lang="fr-FR">Pochette de rangement': 'xml:lang="es-ES">Neceser',
    'xml:lang="fr-FR">Type de lisseur': 'xml:lang="es-ES">Tipo de plancha',
    'xml:lang="fr-FR">Pérennité': 'xml:lang="es-ES">Duración',
    'xml:lang="fr-FR">Températures': 'xml:lang="es-ES">Temperaturas',
    'xml:lang="fr-FR">Températures / Vitesses': 'xml:lang="es-ES">Temperaturas/Velocidades',
    'xml:lang="fr-FR">Type Ciseaux Variation': 'xml:lang="es-ES">Tipo Tijeras Variación',
    'xml:lang="fr-FR">Fonction vapeur': 'xml:lang="es-ES">Función vapor',
    'xml:lang="fr-FR">Watts': 'xml:lang="es-ES">Vatios',
    'xml:lang="fr-FR">Wet & Dry': 'xml:lang="es-ES">Wet &amp; Dry',
    'xml:lang="fr-FR">Zone du Corps': 'xml:lang="es-ES">Zona del cuerpo',
    'xml:lang="fr-FR">Cheveux': 'xml:lang="es-ES">Cabello',
    'xml:lang="fr-FR">Barbe': 'xml:lang="es-ES">Barba',
    'xml:lang="fr-FR">Corps': 'xml:lang="es-ES">Cuerpo',
    'xml:lang="fr-FR">Moustache': 'xml:lang="es-ES">Bigote',
    'xml:lang="fr-FR">Hatch - Retaillers order': 'xml:lang="es-ES">Hatch - Retaillers order',
    'xml:lang="fr-FR">Silverpop Babyliss DB ID': 'xml:lang="es-ES">Silverpop Babyliss DB ID'
}
var replacement;
var notReplacedNb = 0;
var oKeys = Object.keys(o);
var oKeysL = oKeys.length;
var o2 = toReplaceObject2 = {};
var log = '';
oKeys.forEach(toBeReplace => {
    replacement = o[toBeReplace];
    str = str.replace(toBeReplace, replacement);
    log += toBeReplace + '\n';
    log += replacement + '\n\n';
});
fs.writeFileSync('log.txt', log, 'utf8');
fs.writeFileSync(replacedFile, str, 'utf8');