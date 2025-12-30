import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// TARJETA ESPECIAL: HOTELES EMBLEMÁTICOS DE LA HABANA
// Con mapa interactivo y descripciones detalladas

// Datos de los 10 hoteles más importantes de La Habana
const hotelesData = [
  {
    id: 1,
    nombre: "Hotel Nacional de Cuba",
    ubicacion: { lat: 23.143379, lng: -82.380702 },
    direccion: "Calle 21 y O, Vedado",
    inauguracion: "30 de diciembre de 1930",
    categoria: "5 estrellas",
    imagen: "/hoteles/nacional.jpeg",
    breveDescripcion: "Hotel insignia de la hotelería cubana, Monumento Nacional",
    historiaCompleta: `El Hotel Nacional de Cuba, construido sobre la colina donde se ubicaba la Batería de Santa Clara del siglo XVIII, es el hotel más emblemático de Cuba y símbolo de la hotelería nacional. Inaugurado el 30 de diciembre de 1930, diseñado por las firmas americanas McKim, Mead & White y Purdy Henderson Co, el hotel muestra arquitectura ecléctica que combina Art Déco, reminiscencias árabes y neocolonial.

Declarado Monumento Nacional en 1998 y Hotel Museo en 2001, el Nacional ha hospedado a cientos de personalidades notables: Frank Sinatra, Ava Gardner, Winston Churchill, Ernest Hemingway, Marlene Dietrich, la mafia italiana-norteamericana en su famosa reunión de 1946, y tras la Revolución, a figuras como Fidel Castro, Gabriel García Márquez y estrellas del Festival Internacional del Nuevo Cine Latinoamericano. 

El hotel conserva en sus jardines los cañones históricos de la antigua Batería de Santa Clara, declarados Patrimonio de la Humanidad. Durante la intervención de 1990-1992 se le devolvió el esplendor arquitectónico original, rescatando pisos y mobiliario de época. Con vista privilegiada al Malecón, el Nacional representa el glamour de La Habana y ha sido elegido Hotel Líder de Cuba por World Travel Awards múltiples veces.`
  },
  {
    id: 2,
    nombre: "Hotel Habana Libre (Tryp Habana Libre)",
    ubicacion: { lat: 23.139531, lng: -82.382226 },
    direccion: "Calle 23 y L, Vedado",
    inauguracion: "19 de marzo de 1958",
    categoria: "5 estrellas",
    imagen: "/hoteles/habana-libre.jpeg",
    breveDescripcion: "Emblemático rascacielos de La Habana, sede del Capablanca",
    historiaCompleta: `El Hotel Habana Libre, originalmente construido por la cadena Hilton e inaugurado el 19 de marzo de 1958, es uno de los edificios más emblemáticos de La Habana. Ubicado en la famosa esquina de 23 y L en pleno corazón del Vedado, cerca de la Universidad de La Habana y del Malecón, este rascacielos de 25 pisos fue el hotel más moderno de su época.

Durante su construcción, los trabajadores gastronómicos que financiaron la obra con sus fondos de retiro fueron protagonistas de intensa actividad revolucionaria contra la dictadura de Batista. En la obra aparecían constantemente banderas del Movimiento 26 de Julio. Cuando triunfó la Revolución en enero de 1959, Fidel Castro estableció temporalmente su comando en el hotel.

El edificio fue proyectado por Welton Beckett y dirigido por los arquitectos cubanos Nicolás Arroyo y Gabriela Menéndez. Con más de 500 habitaciones, el Habana Libre ha sido desde 1962 sede tradicional del torneo de ajedrez Capablanca in Memoriam, uno de los más importantes de América Latina, celebrado en su elegante Salón de los Embajadores. Actualmente administrado por Meliá Hotels International, mantiene su posición como uno de los hoteles más importantes de la capital.`
  },
  {
    id: 3,
    nombre: "Hotel Saratoga",
    ubicacion: { lat: 23.133651, lng: -82.357528 },
    direccion: "Prado y Dragones",
    inauguracion: "1933 (reconstruido 2005)",
    categoria: "5 estrellas Gran Lujo",
    imagen: "/hoteles/saratoga.jpeg",
    breveDescripcion: "Hotel boutique de lujo frente al Capitolio",
    historiaCompleta: `El Hotel Saratoga, situado en la importante esquina de Paseo del Prado y Dragones, tiene una historia que se remonta a 1879 cuando Gregorio Palacio mandó construir el edificio original para viviendas, almacenes y casa de huéspedes. Hacia 1933 se instaló definitivamente como hotel.

En los años 30 y 40, el Saratoga fue famoso por sus "Aires Libres", funciones en la terraza donde actuaban las mejores orquestas cubanas ejecutando son y otros ritmos nacionales. Fue allí donde se iniciaron Las Anacaona, primera orquesta cubana enteramente femenina. El hotel atraía multitudes que se agolpaban en los portales y la esquina para disfrutar del espectáculo musical.

El hotel mantuvo su vitalidad hasta los años 60, cuando quedó convertido en casa de vecindad. Fue completamente reconstruido y reabierto como hotel de gran lujo en 2005, manteniendo solo la fachada ecléctica original. Ubicado frente al Capitolio Nacional y la Fuente de la India, el Saratoga se convirtió en uno de los hoteles boutique más elegantes de La Habana.

Trágicamente, el 6 de mayo de 2022, una explosión accidental durante trasiego de gas licuado causó graves daños estructurales en el edificio y provocó 47 fallecidos. El siniestro afectó también edificios adyacentes y el cercano Teatro Martí. La tragedia conmocionó a toda Cuba y el hotel permanece cerrado.`
  },
  {
    id: 4,
    nombre: "Hotel Inglaterra",
    ubicacion: { lat: 23.137336, lng: -82.35962 },
    direccion: "Prado 416, Parque Central",
    inauguracion: "1875 (ampliado 1886)",
    categoria: "4 estrellas",
    imagen: "/hoteles/inglaterra.jpeg",
    breveDescripcion: "El hotel más antiguo de Cuba, Monumento Nacional desde 1981",
    historiaCompleta: `El Hotel Inglaterra es el hotel más antiguo de Cuba en operación continua. Sus orígenes se remontan a 1844 cuando existía el Café y Salón Escauriza. En 1875 se unificó con el contiguo Le Grand Hotel y Restaurante Inglaterra, dando origen al actual establecimiento.

En 1886, el capitán español Francisco Villamil arrendó el hotel y le añadió la tercera planta, convirtiéndolo en "el Hotel de los Hoteles de La Habana, comparable con los mejores del mundo", según registros de época. El Inglaterra se convirtió en centro de la vida cultural y política habanera. En su famosa "Acera del Louvre" (el portal frente al Paseo del Prado) se reunían intelectuales y políticos cubanos.

José Martí pronunció allí en 1879 un discurso incisivo contra el autonomismo en homenaje al periodista Adolfo Márquez Sterling. Durante la Guerra de Independencia de 1895, el corresponsal Winston Churchill se hospedó en el hotel relatando los combates. En 1901 se le dotó de luz eléctrica, teléfono en cada habitación y baño privado con agua fría y caliente.

Declarado Monumento Nacional en 1981, el Inglaterra fue remodelado en 1989 manteniendo su esplendor. El hotel conserva su arquitectura neoclásica con elementos moriscos, destacando sus azulejos sevillanos y su elegante vestíbulo. Ubicado frente al Parque Central, muy cerca del Gran Teatro y del Museo de Bellas Artes, es testimonio viviente de la historia de Cuba.`
  },
  {
    id: 5,
    nombre: "Hotel Santa Isabel",
    ubicacion: { lat: 23.140222, lng: -82.348806 },
    direccion: "Baratillo 9, Plaza de Armas",
    inauguracion: "1867 (como hotel)",
    categoria: "5 estrellas",
    imagen: "/hoteles/santa-isabel.jpeg",
    breveDescripcion: "Palacio colonial del siglo XVIII en la Plaza de Armas",
    historiaCompleta: `El Hotel Santa Isabel ocupa la antigua mansión de los Condes de Jaruco y luego Santovenia, uno de los palacios coloniales más hermosos de La Habana. El inmueble data de principios del siglo XVIII, aunque fue remodelado en 1784 añadiéndole portales similares a los del Palacio de los Capitanes Generales.

El palacio perteneció a la familia Beltrán de Santa Cruz. José María Martínez de Campos, segundo conde de Santovenia, celebró en 1833 extraordinarios festejos frente al palacio en honor de la jura de la Princesa Isabel de Borbón, con "tres mil vasos encendidos de varios colores" iluminando la fachada. En estos festejos se realizó la segunda ascensión de globos aerostáticos en Cuba.

En 1867, el estadounidense Luis Lay transformó la mansión en hotel. A finales del siglo XIX era considerado uno de los mejores hoteles de La Habana, destacando por sus servicios personalizados y su magnífica ubicación cerca del Consulado Americano y la bahía.

Restaurado por la Oficina del Historiador bajo Habaguanex S.A., el Santa Isabel reabrió como hotel boutique de lujo manteniendo la arquitectura colonial original. Situado en la Plaza de Armas, la plaza más antigua de La Habana, junto al Museo de la Ciudad y el Castillo de la Real Fuerza, el hotel ha hospedado a personalidades como Sting y Bruce Willis. Es ejemplo perfecto de cómo el patrimonio arquitectónico habanero puede preservarse mediante turismo cultural de calidad.`
  },
  {
    id: 6,
    nombre: "Hotel Ambos Mundos",
    ubicacion: { lat: 23.139319, lng: -82.350522 },
    direccion: "Obispo 153 esquina Mercaderes",
    inauguracion: "1 de enero de 1925",
    categoria: "4 estrellas",
    imagen: "/hoteles/ambos-mundos.jpeg",
    breveDescripcion: "Hotel de Hemingway en La Habana Vieja",
    historiaCompleta: `El Hotel Ambos Mundos, inaugurado el 1 de enero de 1925, es inseparable de la figura de Ernest Hemingway. Ubicado en la esquina de las emblemáticas calles Obispo y Mercaderes en pleno corazón de La Habana Vieja, el hotel fue diseñado por el arquitecto Luis Hernández Savio para el comerciante español Antolín Blanco Arias.

En los años 20 y 30, el hotel fue punto de reunión del Grupo Minorista, movimiento intelectual cubano. Escritores y artistas habaneros se reunían allí todos los sábados para almorzar, convirtiendo el Ambos Mundos en centro de efervescencia cultural.

A principios de los años 30, Ernest Hemingway se hospedó en el hotel, ocupando siempre la habitación 511. Allí escribió sus "Crónicas de Pesca" para Esquire Magazine y los primeros capítulos de su novela "Por quién doblan las campanas". Hemingway mantuvo su habitación en el Ambos Mundos incluso después de comprar Finca Vigía, regresando frecuentemente al hotel.

La habitación 511 ha sido convertida en pequeño museo dedicado al escritor, preservando el ambiente de la época con máquina de escribir, libros y fotografías. El hotel mantiene su encanto colonial con mobiliario de época. Su terraza en el último piso ofrece vistas espectaculares de La Habana Vieja. Gestionado por Habaguanex, el Ambos Mundos es destino obligado para admiradores de Hemingway y amantes de la historia literaria.`
  },
  {
    id: 7,
    nombre: "Hotel Riviera",
    ubicacion: { lat: 23.139635, lng: -82.404247 },
    direccion: "Paseo y Malecón",
    inauguracion: "Diciembre 1957",
    categoria: "4 estrellas",
    imagen: "/hoteles/riviera.jpeg",
    breveDescripcion: "Icono del Movimiento Moderno frente al Malecón",
    historiaCompleta: `El Hotel Riviera, inaugurado en diciembre de 1957, es notable ejemplo de la arquitectura racionalista del Movimiento Moderno en Cuba. Diseñado en forma de Y para aprovechar las vistas al mar desde múltiples ángulos, el hotel se inserta armónicamente en el privilegiado paisaje del Malecón.

El hotel fue construido por el mafioso Meyer Lansky en la época pre-revolucionaria, con inversión de $14 millones. Su inauguración durante Acción de Gracias de 1957 fue evento espectacular con la presencia del actor George Raft, quien actuó como relaciones públicas del casino del hotel, atrayendo clientes adinerados de Estados Unidos.

En sus primeros años, el Riviera recibió a estrellas de Hollywood: la bailarina Ginger Rogers inauguró el Cabaret Copa Room, se hospedaron Abbot y Costello, William Holden, Stewart Granger. También llegaron campeones de boxeo como Joe Louis, Rocky Marciano y Kid Chocolate.

Después de 1959, el hotel se convirtió en residencia de figuras políticas y culturales: Salvador Allende antes de ser presidente de Chile, Angela Davis, Valentina Tereshkova la cosmonauta soviética, Gabriel García Márquez. El hotel conserva obras de arte de Hipólito Hidalgo de Caviedes, Rolando López Dirube, Florencio Gelabert y Cundo Bermúdez.

Declarado Monumento Nacional con Grado de Protección I, el Riviera mantiene integridad y autenticidad en uso, decoración y mobiliario. Su cúpula del antiguo casino, revestida con cerámicas verdes y azules, es visible desde el Malecón. Representa un período único de la arquitectura y la historia cubana.`
  },
  {
    id: 8,
    nombre: "Hotel Sevilla",
    ubicacion: { lat: 23.140375, lng: -82.357957 },
    direccion: "Trocadero 55, Prado",
    inauguracion: "22 de marzo de 1908",
    categoria: "4 estrellas",
    imagen: "/hoteles/sevilla.jpeg",
    breveDescripcion: "Arquitectura mudéjar inspirada en la Alhambra",
    historiaCompleta: `El Hotel Sevilla, inaugurado el 22 de marzo de 1908, destaca por su marcada influencia mudéjar. Su arquitectura fue copiada del famoso Patio de los Leones del Palacio Alhambra de Granada, distinguiéndose por sus arcadas, columnas y paredes recubiertas de azulejos sevillanos.

La construcción se inició en 1880 por la compañía El Guardián, presidida por Perfecto López, completándose en 1908. El hotel forma parte del conjunto de cuatro grandes hoteles históricos alrededor del Parque Central (Inglaterra, Plaza, Sevilla y Saratoga), en la transición entre La Habana Vieja y Centro Habana.

El Sevilla fue escenario de eventos importantes de la historia cubana. Por sus salones pasaron el pintor español José María López Mesquita, la rumbera Tongolele, Herbert Matthews del New York Times, Al Capone (quien alquiló todo el piso 6), Josephine Baker, Joe Louis, Ted Williams y los Medias Rojas de Boston.

En enero de 1959, tras el triunfo revolucionario, el hotel fue intervenido por el gobierno cuando su propietario Battisti, vinculado a la dictadura batistiana y la mafia, se asiló en la embajada de Uruguay. Cerrado por reparaciones, fue reabierto en 1993 operado por compañía francesa.

El hotel mantiene sus espacios emblemáticos: el Patio Sevillano con su frescura y música tradicional, el elegante Restaurante Roof Garden con vista panorámica de la ciudad, y los salones de reuniones ambientados en estilo hispano-morisco. Su arquitectura mudéjar lo convierte en uno de los hoteles más pintorescos de La Habana.`
  },
  {
    id: 9,
    nombre: "Hotel Presidente",
    ubicacion: { lat: 23.142747, lng: -82.394446 },
    direccion: "Avenida de los Presidentes y Calzada",
    inauguracion: "28 de diciembre de 1928",
    categoria: "4 estrellas",
    imagen: "/hoteles/presidente.jpeg",
    breveDescripcion: "Primer rascacielos de La Habana con escudo cubano",
    historiaCompleta: `El Hotel Presidente, inaugurado el 28 de diciembre de 1928, fue el primer rascacielos de La Habana, símbolo de modernidad en la época. Ubicado en la elegante Avenida de los Presidentes, a 300 metros del Malecón y próximo al Teatro Amadeo Roldán, el Presidente es único por lucir el escudo cubano en su fachada.

El hotel impresiona por su arquitectura art déco y su amplio vestíbulo enchapado en mármol, con antigüedades y candelabros sorprendentes. La torre del Presidente domina el paisaje de la avenida, que recibe su nombre por las estatuas de presidentes latinoamericanos que la adornan.

Durante la República, el Presidente fue hotel preferido de personalidades políticas y empresariales. Su ubicación estratégica entre el Vedado y el Malecón lo convertía en punto de encuentro elegante. El hotel contaba con servicios de primera clase para su época, incluyendo elevadores modernos y sistemas avanzados de confort.

Después de 1959, el Presidente continuó operando como hotel importante de la capital. En años recientes fue renovado manteniendo su estilo original. Cuenta con 158 habitaciones, dos restaurantes (uno buffet y otro a la carta), bar, piscina iluminada especialmente atractiva de noche, y salón de masajes. El décimo piso está reservado para clientes privilegiados.

El hotel mantiene tradiciones culinarias con su famoso Restaurante Chez Merito, de larga trayectoria. Su ubicación permite fácil acceso al Centro Histórico y al corazón del Vedado. El Presidente representa la elegancia arquitectónica de La Habana de los años 20, cuando la ciudad se modernizaba aceleradamente.`
  },
  {
    id: 10,
    nombre: "Hotel Plaza",
    ubicacion: { lat: 23.138762, lng: -82.358032 },
    direccion: "Zulueta 267, Parque Central",
    inauguracion: "1909",
    categoria: "4 estrellas",
    imagen: "/hoteles/plaza.jpeg",
    breveDescripcion: "Hotel centenario en esquina del Parque Central",
    historiaCompleta: `El Hotel Plaza, inaugurado en 1909, se encuentra en la esquina de las calles Zulueta, Virtudes y Neptuno, en una de las esquinas del Parque Central. El edificio original se construyó en 1895 sobre las ruinas del antiguo barrio de "Las Murallas", en la zona donde estuvieron las fortificaciones coloniales.

Inicialmente fue mansión de la familia Pedroso, inmueble de dos plantas que tres años después se convertiría en oficina central del "Diario de la Marina", compartiendo edificio con el Hotel "Leal". El terreno donde se construyó era propiedad de Gaspar Arteaga, tatarabuelo de Gertrudis Gómez de Avellaneda, la gran poetisa cubana.

El Plaza forma parte del conjunto de cuatro grandes hoteles históricos alrededor del Parque Central, junto con el Inglaterra, el Sevilla y el Saratoga. Esta concentración de hoteles convirtió la zona en centro neurálgico de la actividad turística habanera durante el siglo XX.

El hotel cuenta con 188 habitaciones, incluyendo 15 suites, y conserva mobiliario de antaño. Sus paredes exhiben cuadros originales de pintores españoles y cubanos como Esteban Valderrama Peña, Esteban Domech, Federico Siroca y Juan Gil García, convirtiendo el hotel en pequeña galería de arte.

La ubicación del Plaza es excepcional: frente al Parque Central con su famosa Fuente de la India, a pasos del Gran Teatro de La Habana, del Capitolio Nacional, del Museo Nacional de Bellas Artes y de La Habana Vieja. Representa la tradición hotelera habanera del primer tercio del siglo XX, cuando La Habana competía con las grandes capitales del mundo en elegancia y servicios turísticos.`
  }
];

// Texto sobre la situación actual del turismo en Cuba
const situacionActualTurismo = `El turismo en Cuba enfrenta su crisis más profunda de las últimas dos décadas. En 2025, la isla registra su peor desempeño turístico desde 2003, excluyendo los años de pandemia COVID-19. Entre enero y octubre de 2025, Cuba recibió apenas 1.48 millones de visitantes internacionales, un 20% menos que en 2024, con una tasa de ocupación hotelera crítica de solo 18.9%, equivalente a cuatro de cada cinco habitaciones vacías.

Esta crisis contrasta dramáticamente con los años dorados pre-pandemia, cuando Cuba alcanzó cifras récord de 4.7 millones de turistas en 2018. El colapso turístico actual responde a múltiples factores estructurales: la grave crisis energética con apagones prolongados que afectan servicios hoteleros, escasez de productos básicos y alimentos en instalaciones turísticas, deterioro de infraestructura por falta de mantenimiento e inversión, problemas de conectividad aérea, y creciente competencia de destinos caribeños como República Dominicana y México que han superado niveles prepandemia.

Los principales mercados emisores muestran caídas alarmantes. Canadá, tradicionalmente el mayor emisor, redujo sus visitantes un 20%. Rusia experimentó colapso del 37%. Mercados europeos como España, Francia, Alemania e Italia registran descensos entre 24-40%. La inclusión de Cuba en la lista estadounidense de países patrocinadores del terrorismo desincentiva visitantes europeos que pierden privilegio de exención de visa a Estados Unidos.

Paradójicamente, mientras el turismo internacional se desploma, el gobierno cubano continúa priorizando inversiones masivas en construcción de hoteles de lujo (22-35% de inversión total nacional), principalmente controlados por GAESA (Grupo de Administración Empresarial militar). Esta estrategia es cuestionada por economistas que señalan la irracionalidad de construir nuevas habitaciones cuando las existentes permanecen vacías.

Pese a la crisis, los hoteles históricos de La Habana—muchos restaurados en décadas anteriores—mantienen su esplendor arquitectónico y representan el patrimonio turístico más valioso de Cuba. Estos establecimientos, con siglos de historia, testimonian la época dorada cuando La Habana competía con las grandes capitales mundiales en elegancia y servicios. Su recuperación dependerá de resolver las profundas crisis estructurales que afectan al país.`;


// Componente del Mapa Interactivo de Hoteles


// Componente principal de la tarjeta de Hoteles
// Componente de Hoteles Emblemáticos - REFINADO con Leaflet Map

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Crear iconos personalizados para cada hotel
const createCustomIcon = (number) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-pin">
             <span class="marker-number">${number}</span>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

// Componente helper para acceder a la instancia del mapa
const MapUpdater = ({ hotelSeleccionado }) => {
  const map = useMap();
  
  useEffect(() => {
    if (hotelSeleccionado && map) {
      map.flyTo(
        [hotelSeleccionado.ubicacion.lat, hotelSeleccionado.ubicacion.lng],
        15,
        { duration: 1.5 }
      );
    }
  }, [hotelSeleccionado, map]);
  
  return null;
};

const MapaHotelesInteractivo = ({ hotelSeleccionadoExterno }) => {
  const [hotelSeleccionado, setHotelSeleccionado] = useState(hotelSeleccionadoExterno);
  const center = [23.137, -82.370]; // Centro ajustado de La Habana

  // Actualizar cuando cambia la selección externa
  useEffect(() => {
    if (hotelSeleccionadoExterno) {
      setHotelSeleccionado(hotelSeleccionadoExterno);
    }
  }, [hotelSeleccionadoExterno]);

  return (
    <div className="mapa-hoteles-container">
      <h3 className="mapa-title">Mapa de Hoteles Emblemáticos de La Habana</h3>
      
      <div className="mapa-layout">
        {/* Mapa real con Leaflet */}
        <div className="mapa-wrapper">
          <MapContainer 
            center={center} 
            zoom={13} 
            style={{ height: '600px', width: '100%', borderRadius: '8px' }}
            className="leaflet-map"
          >
            <MapUpdater hotelSeleccionado={hotelSeleccionado} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {hotelesData.map((hotel) => (
              <Marker 
                key={hotel.id}
                position={[hotel.ubicacion.lat, hotel.ubicacion.lng]}
                icon={createCustomIcon(hotel.id)}
                eventHandlers={{
                  click: () => setHotelSeleccionado(hotel)
                }}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <strong style={{ fontSize: '16px' }}>{hotel.nombre}</strong>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}>{hotel.direccion}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Panel de detalles */}
        <div className="detalles-panel">
          {hotelSeleccionado ? (
            <div className="hotel-detalle-card">
              <div className="hotel-detalle-image">
                <img src={hotelSeleccionado.imagen} alt={hotelSeleccionado.nombre} />
              </div>
              
              <h4 className="hotel-detalle-titulo">{hotelSeleccionado.nombre}</h4>
              
              <div className="hotel-detalle-info">
                <p><strong>Inauguración:</strong> {hotelSeleccionado.inauguracion}</p>
                <p><strong>Categoría:</strong> {hotelSeleccionado.categoria}</p>
                <p><strong>Dirección:</strong> {hotelSeleccionado.direccion}</p>
              </div>
              
              <div className="hotel-detalle-historia">
                <h5>Historia:</h5>
                <div className="historia-scroll">
                  {hotelSeleccionado.historiaCompleta}
                </div>
              </div>
              
              <button 
                onClick={() => setHotelSeleccionado(null)}
                className="hotel-detalle-cerrar"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <div className="detalles-placeholder">
              <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p>Selecciona un hotel en el mapa</p>
              <span>Haz clic en cualquier marcador</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Leyenda */}
      <div className="mapa-leyenda">
        <h4>Hoteles Emblemáticos:</h4>
        <div className="leyenda-grid">
          {hotelesData.map((hotel) => (
            <div 
              key={hotel.id}
              className="leyenda-item"
              onClick={() => setHotelSeleccionado(hotel)}
            >
              <div className="leyenda-numero">{hotel.id}</div>
              <span>{hotel.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HotelesHabanaCard = ({ onClose }) => {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);

  return (
    <>
      <div className="hoteles-modal-overlay" onClick={onClose}>
        <div className="hoteles-modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Header elegante */}
          <div className="hoteles-header">
            <button onClick={onClose} className="hoteles-close-btn">
              <X size={28} />
            </button>
            <div className="hoteles-header-text">
              <h2>Hoteles Emblemáticos de La Habana</h2>
              <p>Historia, elegancia y tradición hotelera habanera • Siglos XIX-XXI</p>
            </div>
          </div>

          {/* Contenido con scroll */}
          <div className="hoteles-body">
            {/* Imagen hero */}
            <div className="hoteles-hero">
              <img src="/hoteles/hoteles-habana-collage.jpeg" alt="Hoteles de La Habana" />
              <div className="hoteles-hero-overlay">
                <h3>Los Grandes Hoteles de La Habana</h3>
              </div>
            </div>

            {/* Situación actual */}
            <section className="hoteles-seccion">
              <div className="seccion-header">
                <div className="seccion-line"></div>
                <h3>Turismo en Cuba: Situación Actual (2025)</h3>
                <div className="seccion-line"></div>
              </div>
              <div className="turismo-text">
                {situacionActualTurismo}
              </div>
            </section>

            {/* Grid de hoteles */}
            <section className="hoteles-seccion">
              <div className="seccion-header">
                <div className="seccion-line"></div>
                <h3>Los 10 Hoteles Más Importantes</h3>
                <div className="seccion-line"></div>
              </div>
              <div className="hoteles-grid">
                {hotelesData.map((hotel) => (
                  <div 
                    key={hotel.id}
                    className="hotel-card"
                    onClick={() => {
                      setHotelSeleccionado(hotel);
                      setMostrarMapa(true);
                      setTimeout(() => {
                        document.querySelector('.mapa-hoteles-container')?.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }, 150);
                    }}
                  >
                    <div className="hotel-image-wrapper">
                      <img src={hotel.imagen} alt={hotel.nombre} />
                      <div className="hotel-numero">{hotel.id}</div>
                      <div className="hotel-overlay"></div>
                    </div>
                    <div className="hotel-info">
                      <h4>{hotel.nombre}</h4>
                      <div className="hotel-meta">
                        <span className="hotel-year">{hotel.inauguracion}</span>
                        <span className="hotel-stars">{hotel.categoria}</span>
                      </div>
                      <p className="hotel-descripcion">{hotel.breveDescripcion}</p>
                      <div className="hotel-accion">
                        <span>Ver en el mapa</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Botón mapa */}
            <section className="hoteles-seccion">
              <button 
                onClick={() => setMostrarMapa(!mostrarMapa)}
                className="mapa-toggle-btn"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>{mostrarMapa ? 'Ocultar Mapa Interactivo' : 'Ver Mapa Interactivo de Hoteles'}</span>
              </button>
            </section>

            {/* Mapa */}
            {mostrarMapa && (
              <section className="hoteles-seccion mapa-seccion">
                <MapaHotelesInteractivo hotelSeleccionadoExterno={hotelSeleccionado} />
              </section>
            )}

            {/* Nota final */}
            <div className="hoteles-footer-note">
              <div className="note-icon">ℹ</div>
              <div>
                <strong>Patrimonio Hotelero de La Habana</strong>
                <p>Estos hoteles representan más de 150 años de historia turística y arquitectónica de la capital cubana. Cada uno ha sido testigo de momentos cruciales de la historia, hospedando a personalidades de la política, el arte, la literatura y el deporte mundial.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS refinados */}
      <style>{`
        /* Overlay del modal */
        .hoteles-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Contenedor principal */
        .hoteles-modal-content {
          background: #0a0a0a;
          border-radius: 16px;
          width: 100%;
          max-width: 1400px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header */
        .hoteles-header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 32px 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .hoteles-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hoteles-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .hoteles-header-text h2 {
          color: #fff;
          font-size: 36px;
          font-weight: 300;
          letter-spacing: -0.5px;
          margin: 0 0 8px 0;
        }

        .hoteles-header-text p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin: 0;
          font-weight: 300;
        }

        /* Body */
        .hoteles-body {
          overflow-y: auto;
          padding: 40px;
          flex: 1;
          background: #0a0a0a;
        }

        .hoteles-body::-webkit-scrollbar {
          width: 8px;
        }

        .hoteles-body::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .hoteles-body::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        .hoteles-body::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        /* Hero Image */
        .hoteles-hero {
          position: relative;
          margin-bottom: 48px;
          border-radius: 12px;
          overflow: hidden;
          height: 400px;
        }

        .hoteles-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hoteles-hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 32px;
        }

        .hoteles-hero-overlay h3 {
          color: #fff;
          font-size: 32px;
          font-weight: 300;
          margin: 0;
          letter-spacing: -0.5px;
        }

        /* Secciones */
        .hoteles-seccion {
          margin-bottom: 48px;
        }

        .seccion-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .seccion-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
        }

        .seccion-header h3 {
          color: #fff;
          font-size: 24px;
          font-weight: 300;
          margin: 0;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        /* Texto turismo */
        .turismo-text {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 32px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          white-space: pre-line;
          font-size: 15px;
        }

        /* Grid de hoteles */
        .hoteles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .hotel-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .hotel-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .hotel-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .hotel-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .hotel-card:hover .hotel-image-wrapper img {
          transform: scale(1.05);
        }

        .hotel-numero {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hotel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .hotel-card:hover .hotel-overlay {
          opacity: 1;
        }

        .hotel-info {
          padding: 20px;
        }

        .hotel-info h4 {
          color: #fff;
          font-size: 18px;
          font-weight: 400;
          margin: 0 0 12px 0;
        }

        .hotel-meta {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 13px;
        }

        .hotel-year {
          color: rgba(255, 255, 255, 0.5);
        }

        .hotel-stars {
          color: rgba(255, 255, 255, 0.5);
        }

        .hotel-descripcion {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }

        .hotel-accion {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 500;
        }

        .hotel-card:hover .hotel-accion {
          color: #fff;
        }

        /* Botón mapa */
        .mapa-toggle-btn {
          width: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 20px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 400;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .mapa-toggle-btn:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Mapa section */
        .mapa-seccion {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 32px;
        }

        .mapa-hoteles-container {
          color: #fff;
        }

        .mapa-title {
          font-size: 24px;
          font-weight: 300;
          margin: 0 0 24px 0;
          text-align: center;
        }

        .mapa-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
          margin-bottom: 24px;
        }

        .mapa-wrapper {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .detalles-panel {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 24px;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hotel-detalle-card {
          width: 100%;
        }

        .hotel-detalle-image {
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .hotel-detalle-image img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .hotel-detalle-titulo {
          color: #fff;
          font-size: 20px;
          font-weight: 400;
          margin: 0 0 16px 0;
        }

        .hotel-detalle-info {
          margin-bottom: 16px;
          font-size: 14px;
        }

        .hotel-detalle-info p {
          color: rgba(255, 255, 255, 0.7);
          margin: 4px 0;
        }

        .hotel-detalle-historia h5 {
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          margin: 0 0 12px 0;
        }

        .historia-scroll {
          max-height: 200px;
          overflow-y: auto;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          line-height: 1.6;
          padding-right: 8px;
        }

        .historia-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .historia-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .historia-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .hotel-detalle-cerrar {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 12px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 16px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .hotel-detalle-cerrar:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .detalles-placeholder {
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
        }

        .detalles-placeholder svg {
          margin-bottom: 16px;
          opacity: 0.4;
        }

        .detalles-placeholder p {
          font-size: 16px;
          margin: 0 0 8px 0;
        }

        .detalles-placeholder span {
          font-size: 13px;
        }

        /* Leyenda */
        .mapa-leyenda {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 20px;
        }

        .mapa-leyenda h4 {
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          margin: 0 0 16px 0;
        }

        .leyenda-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .leyenda-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .leyenda-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .leyenda-numero {
          background: rgba(255, 255, 255, 0.1);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 13px;
          flex-shrink: 0;
        }

        /* Footer note */
        .hoteles-footer-note {
          background: rgba(255, 255, 255, 0.03);
          border-left: 3px solid rgba(255, 255, 255, 0.3);
          padding: 24px;
          border-radius: 8px;
          display: flex;
          gap: 20px;
        }

        .note-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .hoteles-footer-note strong {
          color: #fff;
          font-size: 16px;
          display: block;
          margin-bottom: 8px;
          font-weight: 400;
        }

        .hoteles-footer-note p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        /* Custom Leaflet markers */
        .custom-marker {
          background: none;
          border: none;
        }

        .marker-pin {
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #fff;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .marker-number {
          transform: rotate(45deg);
          color: #fff;
          font-weight: bold;
          font-size: 16px;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .mapa-layout {
            grid-template-columns: 1fr;
          }
          
          .detalles-panel {
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .hoteles-modal-content {
            border-radius: 0;
            max-height: 100vh;
          }

          .hoteles-header {
            padding: 24px;
          }

          .hoteles-header-text h2 {
            font-size: 24px;
          }

          .hoteles-body {
            padding: 24px;
          }

          .hoteles-grid {
            grid-template-columns: 1fr;
          }

          .leyenda-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

// Fin del componente HotelesHabanaCard

// ============================================
// COMPONENTE PRINCIPAL DEL TIMELINE
// ============================================


const HabanaTimeline = () => {
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [expandedPeriod, setExpandedPeriod] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [detailedEvent, setDetailedEvent] = useState(null);
  const [audioRefs] = useState(() => [
    new Audio('/audio/colonial.mp3'),
    new Audio('/audio/republica.mp3'),
    new Audio('/audio/revolucion.mp3'),
    new Audio('/audio/contemporanea.mp3')
  ]);
  const [currentAudio, setCurrentAudio] = useState(null);

  const colonialEvents = [
    {
      id: 0,
      title: "Descubrimiento de Cuba por Cristóbal Colón",
      date: "1492",
      description: "Llegada del Almirante Cristóbal Colón a las costas cubanas",
      image: "/eventos/colonial-1492-descubrimiento.jpeg",
      wideImage: "/eventos/wide/colonial-1492-descubrimiento-wide.jpeg",
      fullStory: `El 27 de octubre de 1492, cayendo la noche, el almirante Cristóbal Colón, al servicio del reino de Castilla, fondeó sus tres naves —la Pinta, la Niña y la Santa María— en una zona de la costa norte de Cuba, marcando uno de los momentos más trascendentales de la historia universal. Este encuentro entre dos mundos que se habían desarrollado de manera paralela cambiaría para siempre el curso de la humanidad.

Colón había partido del puerto de Palos de la Frontera el 3 de agosto de 1492, con el objetivo de encontrar una ruta más corta hacia las Indias navegando hacia el oeste. Tras 72 días de navegación, el 12 de octubre había llegado a la isla de Guanahaní en las Bahamas, a la que bautizó como San Salvador. Durante los días siguientes exploró otras islas del archipiélago, donde los indígenas taínos le hablaron de una isla grande llamada "Colba" (Cuba), que Colón creyó inicialmente que era Cipango (Japón), según las descripciones de Marco Polo.

El 28 de octubre de 1492, después de esperar un tiempo prudencial, Colón decidió continuar navegando hacia el oeste. En pocas horas llegó a un "río caudaloso" que describió en su bitácora como el "Río de los Mares". Allí, en ese lugar de la costa norte de lo que hoy es la provincia de Holguín —probablemente en Bariay— el Almirante pisó tierra cubana por primera vez. La isla fue bautizada por los europeos con el nombre de Juana, en honor al príncipe Juan, primogénito de los Reyes Católicos Fernando e Isabel.

En su diario de navegación, Colón escribió una de las frases más célebres de la historia: "Esta es la tierra más hermosa que ojos humanos hayan visto". Quedó deslumbrado por la exuberante vegetación tropical, los ríos cristalinos, las palmas diferentes a las de Guinea, las aves de colores brillantes y el canto de los pájaros. Describió árboles "hermosos y verdes y diversos de los nuestros, con flores y con su fruto cada uno de su manera", y una tierra llana y fértil que parecía un paraíso terrenal.

Durante su estancia en Cuba, Colón exploró la costa norte oriental de la isla desde el 28 de octubre hasta el 5 de diciembre de 1492. Navegó con sus hombres río arriba en pequeños botes, estableció contacto con los indígenas taínos que habitaban la región, observó sus costumbres y trató de comunicarse con ellos mediante señas y a través de los intérpretes taínos que traía de las Bahamas. Los nativos le hablaron de oro y perlas, alimentando las esperanzas del Almirante de encontrar las riquezas de Oriente.

Los pobladores originales de Cuba, principalmente taínos en la región oriental, vivían en una sociedad comunal organizada en cacicazgos, practicaban la agricultura de subsistencia cultivando yuca, maíz y otros tubérculos, pescaban en los ríos y el mar, y habían desarrollado una incipiente estructura social con caciques y behiques (sacerdotes). Se estima que al momento de la llegada de Colón, la población aborigen de Cuba alcanzaba aproximadamente los 300,000 habitantes.

El encuentro entre europeos y nativos americanos en Cuba fue inicialmente pacífico. Los taínos, asombrados por las grandes embarcaciones, las barbas de los españoles y sus armas de metal desconocidas para ellos, mostraron hospitalidad y curiosidad. Colón, por su parte, buscaba establecer relaciones amistosas para facilitar la exploración y la eventual explotación de los recursos de la isla. Sin embargo, este primer contacto marcaría el inicio de un proceso que transformaría radicalmente la vida de los pueblos originarios de Cuba y de toda América.

El 12 de diciembre de 1492, impaciente por encontrar las riquezas que tanto anhelaba, Colón izó velas y partió de Cuba hacia La Española (actual Haití y República Dominicana), donde pasaría la Navidad de ese año. Durante este primer viaje, Colón no se percató de que había llegado a un continente completamente desconocido para los europeos. Convencido hasta el final de sus días de que había alcanzado las costas de Asia, el navegante genovés murió en 1506 sin saber que su "error" geográfico había llevado al encuentro de dos mundos que habían evolucionado separadamente durante milenios.

El descubrimiento de Cuba por Colón abrió las puertas a la posterior conquista y colonización española de la isla, que comenzaría formalmente en 1511 con Diego Velázquez. Este acontecimiento marcó el fin de la era precolombina en Cuba y el inicio del período colonial español que se extendería durante más de cuatro siglos, hasta 1898. El encuentro de 1492 cambió para siempre la historia, la cultura, la demografía y el destino de Cuba, transformándola en un punto clave del imperio colonial español y, posteriormente, en una de las naciones más importantes del Caribe.

Hoy, el 28 de octubre se recuerda en Cuba como el día de la llegada de Colón a la isla, un momento histórico que, más allá de las controversias sobre el término "descubrimiento", representa el punto de encuentro entre dos civilizaciones que darían origen a la identidad cultural cubana: una mezcla única de herencias europea, africana e indígena que define la nación cubana contemporánea.`
    },
    {
      id: 1,
      title: "Fundación de San Cristóbal de La Habana",
      date: "1519",
      description: "Establecimiento de la villa en su ubicación definitiva junto al puerto natural",
      image: "/eventos/colonial-1519-fundacion.jpeg",
      wideImage: "/eventos/wide/colonial-1519-fundacion-wide.jpeg",
      fullStory: `El 16 de noviembre de 1519, el conquistador español Diego Velázquez estableció, en nombre de los Reyes de España, el tercer y definitivo asentamiento de la villa de San Cristóbal de La Habana junto a una privilegiada bahía de bolsa en la costa norte de Cuba.

Antes de este emplazamiento definitivo, la villa había tenido dos ubicaciones previas: la primera en 1514 en la desembocadura del río Onicaxinal en la costa sur (actual Playa Mayabeque), y otra en La Chorrera junto al río Almendares (que los indios llamaban Casiguaguas), donde aún se conservan los muros de contención de una represa, considerada la obra hidráulica más antigua del Caribe.

El nombre de la villa surge de la fusión del santo patrón San Cristóbal con "Habana", denominación derivada del nombre del cacique taíno Habaguanex, quien controlaba la zona de los primeros asentamientos. Entre los primeros vecinos fundadores se encontraban Juan de Rojas, Pedro Blasco, Antonio de la Torre, Juan de Lobera (futuro Alcaide de la Fuerza), y otros pioneros españoles que conformaron la base de lo que sería la futura capital colonial.

En la Plaza de Armas, centro de la vida oficial y pública colonial, se alza El Templete, monumento que conmemora el lugar donde se celebró la primera misa bajo una ceiba frondosa y donde se realizó el primer cabildo que recibió la guarda y custodia de los fueros y privilegios de la villa según las leyes de Castilla.`
    },
    {
      id: 2,
      title: "Ataque del pirata Jacques de Sores",
      date: "1555",
      description: "Devastador ataque pirata que destruyó gran parte de la ciudad",
      image: "/eventos/colonial-1555-pirata.jpeg",
      wideImage: "/eventos/wide/colonial-1555-pirata-wide.jpeg",
      fullStory: `El 10 de julio de 1555, la villa de San Cristóbal de La Habana sufrió uno de los ataques más devastadores de su historia colonial. El corsario francés Jacques de Sores, conocido como "El Ángel Exterminador", hugonote de Normandía y lugarteniente de François Le Clerc "Pata de Palo", arribó con 200 marineros a las costas habaneras.

Como parte de la política beligerante de Enrique II de Francia contra España, Sores ya había saqueado Santiago de Cuba el año anterior. La Habana se encontraba prácticamente indefensa: solo contaba con 16 hombres a caballo y 65 de a pie. El gobernador Gonzalo Pérez de Angulo, en un acto de cobardía que sería recordado con vergüenza, huyó despavorido a Guanabacoa con su familia al ver aproximarse las naves piratas.

Juan de Lobera, alcalde ordinario y alcaide de la Fuerza Vieja (la única fortaleza de la villa, armada apenas con un cañón llamado "el salvaje" y algunos falconetes), tomó el mando de la defensa. Durante casi un mes, Lobera y sus hombres resistieron heroicamente los embates de los corsarios, rechazando tres ataques consecutivos y evitando que los piratas tomaran puerto.

Sin embargo, al cuarto día, reducida su fuerza a solo cuatro hombres y con la fortaleza parcialmente incendiada, Lobera se vio obligado a capitular. Sores lo capturó y exigió un rescate de dos mil doscientos pesos por su vida. Cuando el padre dominico Alonso de Ulloa fue enviado a negociar, observó que los piratas estaban desprevenidos y lo comunicó a Angulo, quien organizó un torpe ataque con 95 españoles, 220 negros y 80 indígenas.

El fallido ataque enfureció a Sores, quien por venganza ejecutó a 25 personas. Cuando los vecinos solo pudieron reunir mil pesos para el rescate de la villa, el corsario hugonote, insatisfecho, incendió completamente la ciudad, quemó las naves del puerto, profanó las imágenes sagradas, colgó a los negros en la plaza y destruyó todo a su paso.

El 5 de agosto, a medianoche "con buena luna y próspero tiempo", Sores se hizo a la vela dejando La Habana reducida a cenizas y a sus habitantes en la miseria. Lobera partió a España con credenciales extraordinarias del Cabildo, mientras que Angulo fue enviado preso, acusado de cobardía e imprevisión. Este devastador ataque llevó a la Corona española a iniciar la construcción de las grandes fortalezas que protegerían La Habana en el futuro.`
    },
    {
      id: 3,
      title: "Construcción del Castillo de la Real Fuerza",
      date: "1558-1577",
      description: "Primera fortaleza de piedra construida para defender la ciudad de futuros ataques",
      image: "/eventos/colonial-1558-real-fuerza.jpeg",
      wideImage: "/eventos/wide/colonial-1558-real-fuerza-wide.jpeg",
      fullStory: `Tras el devastador ataque de Jacques de Sores en 1555 que dejó a La Habana en ruinas y demostró la vulnerabilidad de la Fuerza Vieja, la Corona española comprendió la urgente necesidad de construir fortificaciones sólidas para proteger la villa. En 1558 comenzó la construcción del Castillo de la Real Fuerza, la primera gran fortaleza de piedra de La Habana y una de las más antiguas de América.

La construcción se extendió durante casi dos décadas, finalizando en 1577. Esta fortaleza fue diseñada siguiendo los principios de la arquitectura militar renacentista, con gruesos muros de piedra, foso profundo y un sistema de bastiones que permitía el fuego cruzado contra posibles atacantes. Su ubicación estratégica cerca de la Plaza de Armas la convirtió en el centro del poder militar colonial.

El Castillo de la Real Fuerza no solo servía como defensa militar, sino también como residencia de los gobernadores y como depósito del tesoro real. Su construcción representó un enorme esfuerzo económico y humano, empleando mano de obra esclava, indígena y artesanos españoles especializados en fortificaciones.

Aunque posteriormente resultó menos efectiva para la defensa del puerto debido a su posición algo retirada de la entrada de la bahía, el Castillo de la Real Fuerza marcó el inicio de la transformación de La Habana en una plaza fuerte inexpugnable. Hoy en día, con su emblemática Giraldilla en la torre, es uno de los símbolos más representativos del patrimonio colonial habanero y ha sido declarado Patrimonio de la Humanidad por la UNESCO.`
    },
    {
      id: 4,
      title: "Puerto clave de la Flota de Indias",
      date: "1561",
      description: "La Habana se consolida como punto estratégico del comercio español en América",
      image: "/eventos/colonial-1561-flota.jpeg",
      wideImage: "/eventos/wide/colonial-1561-flota-wide.jpeg",
      fullStory: `En 1561, La Habana alcanzó su consolidación definitiva como el puerto estratégico más importante del Imperio Español en el Nuevo Mundo. La Corona española estableció oficialmente que todas las flotas procedentes de diversos puntos de América debían reunirse en el puerto habanero antes de emprender el peligroso viaje de regreso a España.

Esta decisión no fue arbitraria. La bahía de La Habana ofrecía condiciones excepcionales: era una bahía de bolsa profunda, muy abrigada y fácilmente defendible, con una estrecha entrada que podía ser vigilada y protegida eficazmente. Además, su posición geográfica era ideal como punto de encuentro, aprovechando las corrientes del Golfo de México y los vientos alisios favorables para la travesía atlántica.

El establecimiento del sistema de flotas transformó radicalmente a La Habana. De ser una modesta villa de unas cincuenta familias, pasó a convertirse en un bullicioso centro comercial que, dos veces al año, se llenaba de galeones, comerciantes, marineros y aventureros. Los convoyes traían oro y plata de México y Perú, esmeraldas de Nueva Granada, perlas de Venezuela y productos tropicales de toda América.

La ciudad se convirtió en el epicentro del comercio transatlántico. Se desarrolló una intensa actividad de avituallamiento de las flotas: construcción y reparación de barcos, provisión de alimentos frescos, agua potable, y todo tipo de suministros necesarios para la larga travesía oceánica. Los astilleros habaneros ganaron fama por la calidad de sus construcciones navales, aprovechando las excelentes maderas cubanas.

Este rol estratégico atrajo población, riqueza y la atención prioritaria de la Corona, que invirtió en fortificaciones y infraestructura para proteger esta joya del Imperio. El título de "Llave del Nuevo Mundo y Antemural de las Indias Occidentales", otorgado posteriormente a La Habana, reconocía formalmente la importancia vital de la ciudad en el entramado imperial español.`
    },
    {
      id: 5,
      title: "Construcción del Castillo del Morro",
      date: "1589-1630",
      description: "Icónica fortaleza construida a la entrada del puerto habanero",
      image: "/eventos/colonial-1589-morro.jpeg",
      wideImage: "/eventos/wide/colonial-1589-morro-wide.jpeg",
      fullStory: `En 1589 comenzó una de las obras de ingeniería militar más ambiciosas de la América colonial: la construcción del Castillo de los Tres Reyes Magos del Morro, comúnmente conocido como El Morro. Esta fortaleza icónica, situada sobre un promontorio rocoso a la entrada de la bahía de La Habana, se convertiría en el símbolo por excelencia de la ciudad.

El proyecto fue encomendado al ingeniero militar italiano Juan Bautista Antonelli, quien diseñó una fortaleza imponente capaz de controlar completamente el acceso al puerto. La elección del emplazamiento fue magistral: desde lo alto del Morro, la artillería podía barrer eficazmente la entrada del canal, haciendo prácticamente imposible cualquier intento de forzar el paso.

La construcción se extendió durante más de cuatro décadas, finalizando en 1630. Este prolongado período de obras se debió a la magnitud del proyecto, las dificultades técnicas de construir sobre roca viva, y los constantes problemas de financiamiento que obligaban a suspender y reanudar las obras. Se emplearon miles de trabajadores, incluyendo esclavos africanos, presidiarios y canteros especializados traídos de España.

El diseño del Morro incorporaba los últimos avances en arquitectura militar renacentista: murallas inclinadas para deflectar los proyectiles de cañón, baterías escalonadas para maximizar el fuego defensivo, polvorines subterráneos a prueba de explosiones, cisternas para almacenar agua en caso de asedio, y un complejo sistema de comunicación con la ciudad mediante señales.

La fortaleza incluía también el emblemático faro del Morro, añadido posteriormente, que se convirtió en referencia obligada para los navegantes que se aproximaban a La Habana. Con su característica torre de observación y sus imponentes baterías, El Morro transformó a La Habana en una plaza prácticamente inexpugnable, cumpliendo fielmente su misión defensiva durante más de 150 años hasta la llegada de los británicos en 1762.`
    },
    {
      id: 6,
      title: "Construcción de las murallas de La Habana",
      date: "1674-1797",
      description: "Sistema defensivo monumental que rodeaba completamente la ciudad colonial",
      image: "/eventos/colonial-1674-murallas.jpeg",
      wideImage: "/eventos/wide/colonial-1674-murallas-wide.jpeg",
      fullStory: `Entre 1674 y 1797, La Habana fue rodeada por un ambicioso sistema defensivo de murallas que convertiría a la ciudad en una de las plazas fuertes más impresionantes de América. Este proyecto monumental tardó más de un siglo en completarse y transformó definitivamente el paisaje urbano habanero.

Las murallas de La Habana formaban un perímetro defensivo de aproximadamente 5 kilómetros que encerraba completamente el núcleo urbano de la ciudad. Construidas con piedra de cantera local, tenían una altura promedio de 10 metros y un grosor de hasta 1.4 metros en su base. El sistema incluía nueve baluartes estratégicamente ubicados, múltiples garitas de vigilancia, varios portones monumentales para el acceso controlado a la ciudad, y un profundo foso perimetral que añadía una capa adicional de protección.

La construcción empleó mano de obra esclava, presidiarios y trabajadores libres durante generaciones. Los ingenieros militares españoles diseñaron un sistema integrado con las fortalezas existentes (El Morro, La Punta, y la Real Fuerza), creando un conjunto defensivo formidable. Las murallas no solo protegían contra ataques enemigos, sino que también servían como sistema de control aduanero y sanitario, regulando estrictamente quién y qué entraba o salía de la ciudad.

Los principales accesos eran la Puerta de Tierra, la Puerta de La Punta y la Puerta de Monserrate, cada una vigilada constantemente y cerrada durante la noche mediante elaboradas ceremonias que incluían el toque de queda. Dentro de las murallas, La Habana se desarrolló como una ciudad compacta y densa, con calles estrechas, plazas coloniales y arquitectura característica de piedra y madera.

El sistema de murallas representó una inversión económica extraordinaria para la Corona española, pero su valor estratégico era incuestionable: protegían el puerto más importante del Caribe y la llave del comercio con América. Durante más de 150 años, las murallas definieron el límite de La Habana intramuros, hasta que el crecimiento demográfico del siglo XIX obligó a su demolición parcial. Los fragmentos que sobreviven hoy son testimonio silencioso de la importancia militar y económica de la ciudad en la época colonial.`
    },
    {
      id: 7,
      title: "Toma británica de La Habana",
      date: "1762",
      description: "Breve ocupación inglesa que transformó profundamente el comercio local",
      image: "/eventos/colonial-1762-britanicos.jpeg",
      wideImage: "/eventos/wide/colonial-1762-britanicos-wide.jpeg",
      fullStory: `El verano de 1762 marcó uno de los episodios más dramáticos de la historia colonial habanera. Inglaterra, aliada con Portugal en la Guerra de los Siete Años contra España y Francia, decidió atacar la joya del Imperio Español en el Caribe. El 6 de junio, una imponente armada británica apareció frente a las costas de La Habana con 200 navíos transportando 14,000 soldados al mando del Almirante George Pocock y el General George Keppel, Conde de Albemarle.

La ofensiva británica fue meticulosamente planificada. En lugar de atacar frontalmente El Morro y las defensas del puerto, los invasores desembarcaron al este de la ciudad, en Cojímar, y establecieron su base de operaciones en las alturas de La Cabaña, desde donde podían bombardear El Morro. El comandante español Juan de Prado Portocarrero, consciente de la superioridad enemiga, organizó una resistencia heroica.

El asedio del Castillo del Morro se convirtió en una epopeya. El capitán Luis Vicente de Velasco, al mando de la fortaleza, rechazó valerosamente los asaltos británicos durante 44 días. Los combates fueron encarnizados: minas, contraminas, bombardeos incesantes y combates cuerpo a cuerpo en las brechas abiertas en las murallas. Velasco murió heroicamente defendiendo su posición el 30 de julio, convirtiéndose en héroe nacional. Cuando finalmente El Morro cayó, los británicos pudieron dominar la entrada del puerto.

El 13 de agosto de 1762, tras casi dos meses de asedio y con la ciudad sometida a constante bombardeo, el gobernador Prado Portocarrero capituló. Los británicos ocuparon La Habana durante 11 meses, un período que paradójicamente resultó transformador para la ciudad. Los ingleses abrieron el puerto al comercio libre, permitiendo que mercantes de todas las naciones atracaran en La Habana. En solo un año, entraron más barcos comerciales que en décadas anteriores bajo el restrictivo monopolio español.

Este breve período de comercio libre expuso a los hacendados cubanos a las ventajas del libre mercado, generando una prosperidad económica sin precedentes. El tráfico de esclavos africanos se multiplicó para satisfacer la creciente demanda de mano de obra en las plantaciones azucareras. Cuando España recuperó La Habana en 1763 mediante el Tratado de París (cediendo Florida a cambio), la ciudad ya había experimentado los beneficios del comercio internacional.

La toma británica tuvo consecuencias duraderas: demostró la vulnerabilidad de las defensas españolas (lo que llevó a la construcción de La Cabaña), aceleró el desarrollo de la industria azucarera, y sembró en la élite criolla el deseo de mayor libertad comercial que marcaría las relaciones con España en las décadas siguientes.`
    },
    {
      id: 8,
      title: "Desarrollo del comercio azucarero",
      date: "1760-1800",
      description: "Expansión masiva de la industria azucarera y su impacto en la economía cubana",
      image: "/eventos/colonial-1760-azucar.jpeg",
      wideImage: "/eventos/wide/colonial-1760-azucar-wide.jpeg",
      fullStory: `Entre 1760 y 1800, La Habana y su región circundante experimentaron una transformación económica radical que la convertiría en uno de los principales productores mundiales de azúcar. Este fenómeno, conocido como el "boom azucarero", cambió para siempre la estructura social, económica y demográfica de Cuba.

Varios factores convergieron para desencadenar esta explosión productiva. La revolución haitiana de 1791, que destruyó las plantaciones de Saint-Domingue (principal productor mundial de azúcar), creó un vacío en el mercado internacional que Cuba estaba perfectamente posicionada para llenar. La breve ocupación británica de 1762 había demostrado las ventajas del comercio libre y modernizado las prácticas agrícolas. Además, las reformas borbónicas liberalizaron gradualmente las restricciones comerciales españolas.

La tecnología azucarera evolucionó rápidamente en este período. Los antiguos trapiches movidos por bueyes fueron reemplazados por ingenios más sofisticados que incorporaban molinos de viento o hidráulicos. Los hacendados criollos, muchos de ellos miembros de familias aristocráticas habaneras, invirtieron masivamente en modernizar sus plantaciones. Francisco de Arango y Parreño, figura intelectual clave de la élite criolla, promovió activamente las innovaciones tecnológicas y las políticas favorables a la industria azucarera.

Esta expansión azucarera tuvo consecuencias profundas. La demanda de mano de obra esclava se disparó: entre 1790 y 1820, ingresaron a Cuba más de 325,000 esclavos africanos, transformando dramáticamente la composición demográfica de la isla. Los bosques de la región occidental fueron talados extensivamente para plantar caña y alimentar los hornos de los ingenios. El paisaje rural se llenó de plantaciones que se extendían hasta donde alcanzaba la vista.

La Habana, como puerto de exportación principal, se benefició enormemente de esta bonanza. Los almacenes portuarios se llenaban de cajas de azúcar destinadas a España, Estados Unidos y Europa. La ciudad se convirtió en centro financiero y comercial, con casas comerciales, bancos y prestamistas que facilitaban el comercio azucarero. La aristocracia hacendaria construyó mansiones palaciegas en La Habana, convirtiendo la ciudad en el "París de las Antillas".

Los ingresos del azúcar financiaron también obras públicas importantes: mejoras en el puerto, construcción de alamedas y paseos, teatros y espacios culturales. La Universidad de La Habana se benefició de donaciones de ricos hacendados. Sin embargo, esta prosperidad se construía sobre la institución brutal de la esclavitud, cuyas contradicciones morales y económicas marcarían el futuro de Cuba.

Para finales del siglo XVIII, Cuba había desplazado a Jamaica como principal productor de azúcar del Caribe, y La Habana consolidaba su posición como una de las ciudades más ricas y cosmopolitas de América. El azúcar se había convertido en el motor económico que definiría la historia cubana durante el próximo siglo.`
    },
    {
      id: 9,
      title: "Construcción de La Cabaña",
      date: "1763-1774",
      description: "La fortaleza militar más grande construida por España en toda América",
      image: "/eventos/colonial-1763-cabana.jpeg",
      wideImage: "/eventos/wide/colonial-1763-cabana-wide.jpeg",
      fullStory: `Tras la humillante toma británica de La Habana en 1762, cuando los invasores utilizaron las alturas de La Cabaña para bombardear El Morro, la Corona española comprendió que el sistema defensivo de la ciudad tenía una vulnerabilidad fatal. Para corregir este error estratégico, se emprendió la construcción de la fortaleza más grande y costosa jamás edificada por España en América: San Carlos de la Cabaña.

La construcción comenzó en 1763, inmediatamente después de recuperar La Habana, bajo la dirección del ingeniero militar Silvestre Abarca. El proyecto fue extraordinario tanto en sus dimensiones como en su complejidad técnica. La Cabaña se extendía a lo largo de 700 metros sobre la elevación que dominaba tanto el puerto como la ciudad, creando una línea defensiva impenetrable que complementaba perfectamente las fortificaciones existentes.

La fortaleza fue diseñada siguiendo los más avanzados principios de la ingeniería militar del siglo XVIII. Contaba con imponentes murallas de piedra, diez baluartes intercomunicados, profundos fosos, baterías escalonadas con 120 cañones de diversos calibres, cuarteles para alojar 2,000 soldados, amplios almacenes subterráneos para municiones y víveres, cisternas para agua, capilla, prisión y todos los servicios necesarios para sostener un asedio prolongado.

El esfuerzo de construcción fue titánico. Durante once años, miles de trabajadores (esclavos, presidiarios y trabajadores libres) extrajeron y transportaron enormes bloques de piedra de las canteras cercanas. La excavación del foso en roca viva fue particularmente ardua. Los costos se dispararon: se estima que la construcción de La Cabaña costó 14 millones de pesos, una suma astronómica para la época que hacía de esta obra la fortificación más cara del Imperio Español.

Cuenta la anécdota que cuando el Rey Carlos III recibió informes del costo final de La Cabaña, se asomó al balcón de su palacio con un telescopio, comentando que "por tanto dinero, debería poder ver las murallas de La Cabaña desde Madrid". Aunque apócrifa, la historia ilustra la magnitud de la inversión.

La fortaleza fue inaugurada oficialmente en 1774, aunque algunos trabajos continuaron posteriormente. Cumplió ejemplarmente su propósito: nunca más La Habana pudo ser atacada desde aquellas alturas. Junto con El Morro, La Punta y el Castillo de la Real Fuerza, La Cabaña completaba un sistema defensivo que convertía a La Habana en una plaza prácticamente inexpugnable.

A lo largo de su historia, La Cabaña sirvió no solo como fortaleza militar sino también como prisión para presos políticos y criminales comunes. Su famoso foso fue escenario de numerosas ejecuciones, particularmente durante las guerras de independencia del siglo XIX. Hoy en día, La Cabaña es un símbolo del patrimonio militar colonial de La Habana y atrae visitantes de todo el mundo, especialmente durante la ceremonia del cañonazo de las nueve, tradición que se mantiene desde la época colonial.`
    },
    {
      id: 10,
      title: "Grito de Yara",
      date: "1868",
      description: "Carlos Manuel de Céspedes inicia la primera guerra de independencia de Cuba",
      image: "/eventos/colonial-1868-yara.jpeg",
      wideImage: "/eventos/wide/colonial-1868-yara-wide.jpeg",
      fullStory: `El 10 de octubre de 1868 marcó un momento decisivo que cerraría simbólicamente la época colonial y abriría el camino hacia la independencia de Cuba. Ese día, en su ingenio azucarero La Demajagua, cerca del pueblo de Yara en la región oriental de la isla, el hacendado Carlos Manuel de Céspedes emitió una proclama revolucionaria que pasaría a la historia como el "Grito de Yara" o "Grito de Independencia".

Céspedes, abogado y hacendado culto, había conspirado durante años junto con otros patriotas cubanos descontentos con el gobierno colonial español. Las causas del descontento eran múltiples: los pesados impuestos impuestos por España para financiar sus guerras en Europa, la exclusión de los cubanos de los cargos públicos importantes, la falta de representación política, las restricciones al comercio, y la negativa española a discutir reformas, incluida la abolición gradual de la esclavitud.

El manifiesto de Céspedes, conocido como "Manifiesto del 10 de Octubre", exponía claramente los agravios del pueblo cubano y declaraba la independencia de Cuba de España. En un gesto revolucionario de enorme significado, Céspedes liberó a sus propios esclavos y los invitó a unirse a la lucha por la libertad. Este acto, aunque limitado, simbolizaba el reconocimiento de que la independencia de Cuba debía incluir el fin de la esclavitud.

Con un pequeño grupo de hombres armados precariamente (se dice que no llegaban a 150), Céspedes inició lo que sería la Guerra de los Diez Años (1868-1878), el primer gran conflicto independentista cubano. El movimiento se extendió rápidamente por la región oriental de Cuba, particularmente en Camagüey y Oriente, donde los mambises (guerrilleros independentistas) organizaron una resistencia formidable contra las tropas españolas.

La respuesta española fue brutal: enviaron decenas de miles de soldados para sofocar la rebelión, implementaron políticas de reconcentración de la población civil, y desataron una represión que cobraría cientos de miles de vidas. En La Habana, centro del poder colonial, las autoridades españolas declararon el estado de sitio, persiguieron implacablemente a los simpatizantes independentistas, confiscaron propiedades de quienes apoyaban la revolución y censuraron toda expresión de ideas separatistas.

Aunque la Guerra de los Diez Años terminó sin lograr la independencia (con el Pacto del Zanjón en 1878), el Grito de Yara había sembrado semillas que no podrían ser erradicadas. Había nacido una identidad nacional cubana forjada en la lucha armada, habían surgido líderes militares y políticos de talento (como Máximo Gómez, Antonio Maceo e Ignacio Agramonte), y se había demostrado que España no podía mantener su dominio colonial sin un costo humano y económico insostenible.

El legado del Grito de Yara resonaría en las décadas siguientes. La Guerra Chiquita (1879-1880) y finalmente la Guerra de Independencia de 1895 (iniciada por José Martí) continuarían la lucha iniciada por Céspedes. La Habana, que había sido durante tres siglos y medio el bastión del poder colonial español en el Caribe, sería testigo de cómo gradualmente se desmoronaba ese poder hasta el final definitivo del dominio español en 1898.

El 10 de octubre se celebra hoy en Cuba como el Día de la Independencia, reconociendo en el Grito de Yara el momento fundacional de la nación cubana independiente. Carlos Manuel de Céspedes es honrado como el "Padre de la Patria", y su gesto de ese día lejano de 1868 permanece como símbolo de coraje, sacrificio y anhelo de libertad que definió el nacimiento de Cuba como nación soberana.`
    }
  ];

  const republicaEvents = [
  {
    id: 1,
    title: "Instauración de la República Neocolonial",
    date: "1902",
    description: "Nacimiento de la República bajo la tutela y dominación estadounidense",
    image: "/eventos/republica-1902-instauracion.jpeg",
    wideImage: "/eventos/wide/republica-1902-instauracion-wide.jpeg",
    fullStory: `El 20 de mayo de 1902, a las 12 del mediodía, nació formalmente la República de Cuba. Después de más de tres décadas de luchas independentistas que habían costado la vida a cientos de miles de cubanos, finalmente se arriaba la bandera estadounidense en el Palacio Presidencial de La Habana y se izaba la enseña cubana. Sin embargo, esta aparente victoria de la independencia ocultaba una amarga realidad: Cuba nacía como una república neocolonial, atada a los intereses de Estados Unidos mediante un conjunto de tratados leoninos que anulaban la soberanía nacional por la que tanto se había luchado.

Tomás Estrada Palma, quien había sucedido a José Martí al frente del Partido Revolucionario Cubano tras la muerte del Apóstol en 1895, asumía la presidencia del país. Curiosamente, Estrada Palma era ciudadano estadounidense en el momento de su elección y tuvo que renunciar a esa ciudadanía para asumir el cargo. Este detalle simbolizaba perfectamente la naturaleza de la naciente república: un estado aparentemente independiente pero profundamente subordinado a Washington.

La República nacía "deforme", como la calificarían historiadores posteriores, lastrada por la Enmienda Platt, un apéndice constitucional que Estados Unidos había impuesto a la Constitución cubana de 1901. Este infame documento otorgaba a Estados Unidos derechos que violaban flagrantemente la soberanía cubana: el derecho de intervenir militarmente "para la conservación de la independencia cubana"; la prohibición de firmar tratados sin aprobación estadounidense; la obligación de ceder territorio para bases navales; y restricciones sobre las deudas públicas.

El gobernador militar estadounidense Leonard Wood expresó con cínica franqueza: "Por supuesto que a Cuba se le ha dejado poca o ninguna independencia con la Enmienda Platt... Es bien evidente que está absolutamente en nuestras manos... Con el control, que sin duda pronto se convertirá en posesión, en breve prácticamente controlaremos el comercio de azúcar en el mundo".

Para formalizar el yugo neocolonial, el gobierno de Estrada Palma firmó tratados que consolidarían la dependencia económica y política durante décadas. El Tratado de Reciprocidad Comercial de 1903 aseguraba a Estados Unidos el control del mercado cubano. El Tratado de Arrendamiento de Estaciones Navales concedía a Estados Unidos el control de Guantánamo. El Tratado Permanente de 1904 daba forma jurídica definitiva a la Enmienda Platt.

Las inversiones estadounidenses crecieron exponencialmente: para 1905, 29 ingenios azucareros eran de propiedad estadounidense y producían el 21% del azúcar cubano; en la industria tabacalera controlaban el 90%; en la minería dominaban el 80%. Los veteranos del Ejército Libertador se encontraban marginados, sin tierras, sin empleo, viendo cómo los ideales martianos de una república "con todos y para el bien de todos" se convertían en una cruel burla.

El 20 de mayo de 1902 no representó el triunfo de la independencia sino el inicio de un período de dominación imperial que duraría más de medio siglo. La verdadera independencia de Cuba no llegaría hasta el primero de enero de 1959, con el triunfo de la Revolución que finalmente desmanteló el sistema neocolonial y estableció la soberanía nacional que los mambises habían soñado.`
  },
  {
    id: 2,
    title: "Segunda Intervención Norteamericana",
    date: "1906",
    description: "Estados Unidos ocupa militarmente Cuba invocando la Enmienda Platt",
    image: "/eventos/republica-1906-intervencion.jpeg",
    wideImage: "/eventos/wide/republica-1906-intervencion-wide.jpeg",
    fullStory: `Apenas cuatro años después del establecimiento de la República, la farsa de la soberanía cubana quedó brutalmente expuesta cuando, en septiembre de 1906, tropas estadounidenses desembarcaron nuevamente en Cuba para iniciar una segunda ocupación militar que duraría hasta 1909. Este hecho demostró que la Enmienda Platt no era letra muerta sino un instrumento real de dominación imperial.

Los acontecimientos se originaron en las maniobras del presidente Tomás Estrada Palma para perpetuarse en el poder. A pesar de haber prometido no buscar la reelección, cedió a las presiones de su círculo oligárquico y manipuló descaradamente el proceso electoral de 1905: controló las juntas electorales, falsificó padrones, intimidó a la oposición y utilizó todos los recursos del Estado en beneficio de su candidatura.

El Partido Liberal se alzó en armas en agosto de 1906 en la "Guerrita de Agosto". Miles de veteranos de la independencia, profundamente desilusionados, se unieron al movimiento. En pocos días, gran parte del territorio cubano estaba en manos de los insurgentes. Ante esta situación, Estrada Palma tomó una decisión que quedaría grabada como uno de los actos más vergonzosos de traición nacional: invocó el artículo 3 de la Enmienda Platt y solicitó formalmente la intervención militar estadounidense.

El presidente Theodore Roosevelt respondió con entusiasmo. El 29 de septiembre de 1906, el secretario de Guerra William Howard Taft fue nombrado gobernador provisional. A principios de octubre, 5,600 marines desembarcaron en puertos cubanos, y la bandera estadounidense volvió a ondear sobre el Palacio Presidencial. Estrada Palma renunció y se retiró, despreciado por gran parte del pueblo cubano.

Charles Edward Magoon fue nombrado gobernador provisional. Su mandato se caracterizó por la corrupción sistémica y el saqueo del erario público. Magoon dilapidó aproximadamente cien millones de pesos del tesoro cubano, utilizando este dinero para sobornar políticos, comprar lealtades y crear una red de clientelismo que facilitaría el control imperial a largo plazo.

Durante la intervención, Estados Unidos perfeccionó los mecanismos de dominación neocolonial. Se creó el Ejército Permanente cubano en 1908, bajo oficialidad entrenada por instructores estadounidenses y leal a Washington. El objetivo era claro: contar con fuerzas armadas locales que garantizaran los intereses imperiales sin la necesidad de intervención directa constante.

Las inversiones estadounidenses en Cuba se aceleraron durante la intervención. Para 1909, el capital yanqui controlaba sectores cada vez más amplios: nuevos ingenios azucareros, plantaciones de tabaco, minas, empresas de servicios públicos, bancos, ferrocarriles. El 28 de enero de 1909, tras "elecciones" controladas, las tropas se retiraron oficialmente, pero la intervención había logrado su propósito: pacificar a Cuba mediante el soborno sistemático y demostrar que la Enmienda Platt era un mecanismo efectivo de control.

La segunda intervención dejó lecciones amargas: demostró que la República carecía de soberanía real, que la Enmienda Platt era una espada de Damocles permanente, y que la clase política estaba más interesada en mantener privilegios bajo tutela imperial que en luchar por la verdadera independencia. No sería hasta la Revolución de 1959 que Cuba finalmente se liberaría de la tutela imperial.`
  },
  {
    id: 3,
    title: "Masacre de los Independientes de Color",
    date: "1912",
    description: "Genocidio racista contra afrocubanos que reclamaban igualdad",
    image: "/eventos/republica-1912-masacre.jpeg",
    wideImage: "/eventos/wide/republica-1912-masacre-wide.jpeg",
    fullStory: `Entre mayo y julio de 1912 se produjo uno de los episodios más bochornosos de la República neocolonial: la masacre de más de 3,000 cubanos negros y mestizos que se habían alzado en protesta contra la discriminación racial sistemática y la ilegalización de su partido político. Este genocidio racista, perpetrado por el ejército bajo el gobierno del presidente José Miguel Gómez, constituye una traición flagrante al espíritu igualitario y antirracista de José Martí y Antonio Maceo.

El Partido Independiente de Color (PIC) se fundó en 1908 cuando el veterano Evaristo Estenoz, junto con el general Pedro Ivonet, crearon esta organización para luchar contra la discriminación que la población negra y mestiza sufría en la supuesta república democrática. El racismo, heredado de cuatro siglos de esclavitud colonial, se había institucionalizado: los negros y mestizos eran sistemáticamente excluidos de empleos públicos, instituciones educativas, clubes y sociedades.

El programa del PIC era profundamente progresista: demandaba jornada de ocho horas, acceso a educación gratuita, leyes contra el trabajo infantil, reforma del sistema penal discriminatorio, distribución de tierras a campesinos pobres, y fundamentalmente, el fin de la discriminación racial. Lejos de crear "un cisma racial", el PIC hacía suyo el reclamo martiano de una república "con todos y para el bien de todos".

Sin embargo, la oligarquía blanca vio al PIC como una amenaza. El senador mulato Martín Morúa Delgado presentó en 1910 una enmienda que prohibía partidos políticos basados en "raza, color o clase social". Esta "Enmienda Morúa", dirigida específicamente contra el PIC, fue aprobada en mayo de 1910, ilegalizando efectivamente al partido.

Ante el cierre de todos los canales legales, la mayoría de los militantes del PIC –muchos veteranos mambises– decidieron organizar una protesta armada. El 20 de mayo de 1912 estalló el levantamiento, principalmente en Oriente y Las Villas. Pedro Ivonet explicaba claramente su carácter: "El Partido Independiente de Color ha empuñado las armas para protestar de los errores cometidos... no son todos negros, pues también hay blancos". Era una protesta legítima contra la injusticia, no una "guerra racial".

La respuesta del gobierno fue brutal y genocida. El presidente estadounidense William Howard Taft ordenó el desembarco de marines. Con respaldo imperial, el gobierno desató una verdadera cacería humana. El general José de Jesús Monteagudo dirigió operaciones con brutalidad sistemática, empleando artillería pesada y ametralladoras contra campesinos mal armados que portaban principalmente machetes.

La llamada "ley de fuga" sirvió para encubrir centenares de ejecuciones sumarias. El 27 de junio de 1912, Evaristo Estenoz fue capturado y fusilado junto con cincuenta compañeros. El 12 de julio, Pedro Ivonet fue abatido tras su rendición. Con el asesinato de sus líderes, el movimiento colapsó.

El balance es aterrador: cifras oficiales admitieron más de 2,000 muertos; participantes de la oposición hablaron de 3,000; fuentes estadounidenses estimaron más de 5,000. El ejército gubernamental solo tuvo 12 bajas, demostrando que no hubo "guerra" sino exterminio de una población indefensa.

La masacre fue facilitada por una campaña de propaganda racista en la prensa burguesa que creó estereotipos demonizadores de los afrocubanos. Esta propaganda preparó el terreno para que sectores de la población blanca aceptaran el exterminio. Las consecuencias fueron devastadoras: el terror se apoderó de la población negra; la discriminación se intensificó; y durante décadas el solo mencionar el PIC era tabú.

La masacre de 1912 demuestra que la República neocolonial traicionó no solo la independencia nacional sino también la justicia social y la igualdad racial. Solo la Revolución de 1959, con sus programas de eliminación de la discriminación institucionalizada y acceso universal a educación y salud, comenzaría el proceso de saldar la deuda histórica con los descendientes de los esclavos que habían construido Cuba.`
  },
  {
    id: 4,
    title: "Revolución del 30 contra Machado",
    date: "1933",
    description: "Movimiento popular derroca la dictadura de Gerardo Machado",
    image: "/eventos/republica-1933-revolucion.jpeg",
    wideImage: "/eventos/wide/republica-1933-revolucion-wide.jpeg",
    fullStory: `La caída del dictador Gerardo Machado el 12 de agosto de 1933 marcó el clímax de uno de los movimientos revolucionarios más importantes de la historia republicana de Cuba. La Revolución del 30, como se conoce históricamente, fue el resultado de años de lucha popular contra una tiranía brutal que había convertido a Cuba en un estado policíaco al servicio de los intereses del imperialismo estadounidense y de la oligarquía criolla.

Gerardo Machado y Morales había llegado al poder en 1925 con un programa aparentemente progresista de "regeneración" nacional. Sin embargo, rápidamente mostró su verdadero rostro: prorrogó ilegalmente su mandato mediante una "reforma constitucional" fraudulenta, estableció un régimen de terror caracterizado por la persecución, tortura y asesinato de opositores, y consolidó una alianza estrecha con el embajador estadounidense Harry Guggenheim y las corporaciones yanquis que controlaban la economía cubana.

El machadato se caracterizó por una represión brutal. La "porra" (policía secreta) asesinaba a líderes estudiantiles, obreros y políticos opositores. Los cuerpos de las víctimas aparecían en las calles o eran arrojados a los tiburones en la bahía de La Habana. El caso del líder estudiantil Rafael Trejo, asesinado el 30 de septiembre de 1930 durante una manifestación pacífica, galvanizó a la opinión pública contra el régimen. Julio Antonio Mella, fundador de la Federación Estudiantil Universitaria y del primer Partido Comunista de Cuba, había sido asesinado en México en 1929 por sicarios al servicio de Machado.

La crisis económica mundial de 1929 agravó la situación. El precio del azúcar se desplomó, provocando desempleo masivo, miseria generalizada y la quiebra de pequeños y medianos propietarios. Mientras el pueblo pasaba hambre, Machado y su camarilla se enriquecían mediante la corrupción sistemática, otorgando concesiones leoninas a empresas estadounidenses, apropiándose de fondos públicos y manteniendo un nivel de vida ostentoso que contrastaba brutalmente con la miseria popular.

La oposición a Machado provino de múltiples sectores. Los estudiantes universitarios, organizados en la Federación Estudiantil Universitaria (FEU) y el Directorio Estudiantil Universitario, fueron la vanguardia del movimiento. Líderes como Antonio Guiteras, Rubén Martínez Villena (quien también dirigía el Partido Comunista), Carlos Prío Socarrás, y muchos otros, organizaron manifestaciones, huelgas y acciones armadas contra el régimen.

El movimiento obrero también jugó un papel crucial. La Confederación Nacional Obrera de Cuba (CNOC), dirigida por comunistas, organizó huelgas en los ingenios azucareros, en el transporte, en los puertos. Los obreros no solo demandaban mejoras salariales sino el derrocamiento de la dictadura. Las mujeres cubanas, a través de organizaciones como el Club Femenino de Cuba, también participaron activamente en la lucha antidictatorial.

Incluso sectores de la burguesía liberal que inicialmente habían apoyado a Machado, como el ABC, una organización clandestina de profesionales y comerciantes de clase media, se volvieron contra él cuando la represión y la crisis económica amenazaron sus intereses. El ABC organizó atentados con bombas y acciones terroristas contra funcionarios del régimen.

Antonio Guiteras Holmes emergió como una de las figuras más radicales y visionarias del movimiento revolucionario. Su programa iba más allá del simple derrocamiento de Machado: planteaba reformas sociales profundas, nacionalización de servicios públicos, reforma agraria, jornada de ocho horas, salario mínimo, y desmantelamiento del dominio imperialista sobre Cuba. Guiteras representaba una corriente revolucionaria antimperialista que anticipaba las transformaciones que solo se lograrían con la Revolución de 1959.

Para 1933, la situación de Machado era insostenible. Las huelgas paralizaban el país. El ejército mostraba signos de fisura. El embajador estadounidense Benjamin Sumner Welles, enviado por el presidente Franklin D. Roosevelt en el marco de la "política del buen vecino", trabajaba febrilmente para orquestar una "salida ordenada" que preservara los intereses estadounidenses mientras sacrificaba a Machado. Washington temía que la revolución popular derivara en un movimiento antimperialista radical que amenazara sus inversiones.

El 4 de agosto de 1933 estalló la huelga general revolucionaria. El país se paralizó completamente. Ni siquiera la feroz represión pudo quebrar el movimiento. El 12 de agosto, Machado, abandonado por el ejército y presionado por Estados Unidos, huyó a Nassau llevándose varios sacos con oro del tesoro nacional. Su partida desató escenas de júbilo popular pero también de venganza: la turba asaltó las casas de los machadistas, linchó a algunos de los más odiados esbirros del régimen, y destruyó símbolos del machadato.

Sin embargo, la victoria popular fue rápidamente traicionada. El embajador Welles impuso como presidente al conservador Carlos Manuel de Céspedes (hijo del iniciador de la independencia), quien duró apenas tres semanas. El 4 de septiembre, un golpe de estado protagonizado por sargentos del ejército, encabezados por Fulgencio Batista, y apoyado por estudiantes revolucionarios del Directorio, estableció la llamada "Pentarquía" y luego el gobierno de Ramón Grau San Martín.

El gobierno de los Cien Días de Grau San Martín (septiembre-diciembre 1933), con Antonio Guiteras como Secretario de Gobernación, intentó implementar reformas radicales: jornada de ocho horas, autonomía universitaria, rebaja de tarifas eléctricas, intervención de la Compañía Cubana de Electricidad (monopolio estadounidense), y un ambicioso programa de justicia social. Pero este gobierno revolucionario enfrentó la hostilidad implacable de Estados Unidos, que se negó a reconocerlo, y la traición de Batista, quien se convirtió en el hombre fuerte del ejército y aliado de Washington.

En enero de 1934, Batista derrocó a Grau con el beneplácito estadounidense. Guiteras intentó continuar la lucha revolucionaria pero fue asesinado por las fuerzas de Batista el 8 de mayo de 1935 en El Morrillo, Matanzas. Con su muerte, la Revolución del 30 fue definitivamente derrotada, aunque dejó un legado de lucha y conciencia antimperialista que nutriría a las generaciones futuras de revolucionarios cubanos.

La Revolución del 30, a pesar de su derrota, demostró que el pueblo cubano no aceptaba pasivamente la tiranía y la dominación imperialista. Las demandas de justicia social, soberanía nacional y democracia real que animaron ese movimiento solo se concretarían con el triunfo de la Revolución de 1959, que reivindicó y llevó a término el programa inconcluso de Guiteras y de toda una generación de revolucionarios que habían luchado contra Machado y el imperialismo.`
  },
  {
    id: 5,
    title: "Constitución de 1940",
    date: "1940",
    description: "Carta Magna progresista que establece derechos sociales avanzados",
    image: "/eventos/republica-1940-constitucion.jpeg",
    wideImage: "/eventos/wide/republica-1940-constitucion-wide.jpeg",
    fullStory: `El 10 de octubre de 1940, en el aniversario del Grito de Yara, entró en vigor la Constitución cubana de 1940, considerada una de las cartas magnas más progresistas y avanzadas de América Latina en su época. Este documento, resultado de intensas luchas populares y negociaciones políticas, recogía aspiraciones democráticas y sociales que habían animado la Revolución del 30, aunque su implementación efectiva sería constantemente saboteada por los gobiernos corruptos de la República neocolonial.

La Constitución de 1940 fue elaborada por una Asamblea Constituyente electa en noviembre de 1939, en la que participaron representantes de todos los sectores políticos cubanos, desde conservadores hasta comunistas. Este amplio espectro político dio como resultado un texto que, si bien contenía contradicciones y ambigüedades propias del compromiso entre fuerzas divergentes, incorporaba principios democráticos y sociales notablemente avanzados para la época.

En el aspecto de los derechos individuales, la Constitución establecía garantías amplias: libertad de expresión, prensa, reunión y asociación; inviolabilidad del domicilio y la correspondencia; igualdad ante la ley sin distinción de raza, color, sexo o clase; abolición de la pena de muerte excepto para delitos militares en tiempos de guerra y ciertos delitos graves; y el hábeas corpus para proteger contra detenciones arbitrarias. Estos derechos, aunque frecuentemente violados en la práctica por gobiernos autoritarios, representaban al menos un marco jurídico al cual apelar.

Pero donde la Constitución de 1940 mostraba su carácter verdaderamente progresista era en el Título VI, dedicado a los derechos sociales. Influenciada por las constituciones sociales de México (1917) y Weimar (1919), así como por las demandas del movimiento obrero y campesino cubano, esta sección establecía derechos laborales avanzados que anticipaban en décadas conquistas que otros países lograrían mucho después.

El artículo 65 establecía el derecho al trabajo como deber y derecho del individuo, y comprometía al Estado a proporcionar ocupación a todo trabajador. La jornada máxima de trabajo se fijó en ocho horas diarias; se estableció el salario mínimo; se reconoció el derecho de huelga y la libertad sindical; se prohibió el trabajo de menores de 14 años; se estableció la protección especial de la mujer trabajadora, incluyendo licencia de maternidad pagada; se instituyó el descanso retribuido; y se creó el derecho a vacaciones pagadas.

El artículo 77 establecía la seguridad social como derecho universal, comprometiendo al Estado a proporcionar protección contra enfermedad, invalidez, vejez y desempleo. Se creó el seguro de maternidad. Se estableció que los accidentes de trabajo eran responsabilidad del patrono. Estos derechos sociales, aunque su implementación fue deficiente durante la República, sentaron las bases jurídicas para futuras conquistas.

En materia educativa, la Constitución declaraba la educación como derecho fundamental y obligación del Estado. Se establecía la gratuidad y obligatoriedad de la enseñanza primaria, y se aspiraba a extender estos principios a la enseñanza secundaria y superior. Se garantizaba la libertad de cátedra y la autonomía universitaria, conquista que los estudiantes habían arrancado en la Revolución del 30. Se reconocía el derecho de los maestros a la estabilidad en sus cargos.

La Constitución también contenía disposiciones progresistas en materia agraria. Prohibía los latifundios y establecía que la propiedad de la tierra debía cumplir una función social. Aunque estos artículos nunca se implementaron efectivamente debido a la resistencia de los terratenientes y las corporaciones azucareras estadounidenses, al menos reconocían el derecho de los campesinos a la tierra y sentaban bases jurídicas para una futura reforma agraria.

En cuanto a la soberanía nacional, la Constitución de 1940 contenía una victoria histórica: no incluía la Enmienda Platt, que había sido finalmente derogada en 1934 mediante el Tratado de Relaciones entre Cuba y Estados Unidos firmado durante la administración de Franklin D. Roosevelt. Sin embargo, esta aparente conquista de la soberanía era ilusoria: Estados Unidos conservaba la Base Naval de Guantánamo mediante un tratado perpetuo, y el control económico imperialista sobre Cuba permanecía intacto.

La Constitución establecía un sistema presidencialista con separación de poderes entre el Ejecutivo, Legislativo y Judicial. El presidente sería electo por cuatro años sin posibilidad de reelección inmediata. Se creaba un sistema bicameral con Cámara de Representantes y Senado. Se establecía la independencia del Poder Judicial. Aunque en el papel estos mecanismos parecían garantizar la democracia, en la práctica la corrupción política, el fraude electoral y la violencia seguirían caracterizando la vida política cubana.

Uno de los aspectos más controvertidos de la Constitución era su artículo 87, que prohibía la confiscación de bienes excepto por sentencia firme dictada por autoridad competente. Esta disposición, que aparentemente protegía la propiedad privada de abusos gubernamentales, en realidad beneficiaba principalmente a los grandes propietarios latifundistas y a las corporaciones extranjeras, dificultando cualquier intento de redistribución de la riqueza o nacionalización de industrias en manos imperialistas.

La participación del Partido Socialista Popular (comunista) en la Asamblea Constituyente, con figuras destacadas como Juan Marinello, Blas Roca y Salvador García Agüero, aseguró que se incluyeran disposiciones progresistas que de otro modo habrían sido omitidas. Los comunistas, siguiendo la línea de la Internacional Comunista de formar frentes populares antifascistas, colaboraron con fuerzas democráticas burguesas para lograr la Constitución más avanzada posible dentro de los límites del sistema capitalista neocolonial.

Sin embargo, la tragedia de la Constitución de 1940 fue que, aunque representaba un marco legal progresista, su aplicación efectiva fue constantemente saboteada. Los gobiernos de Fulgencio Batista (1940-1944), Ramón Grau San Martín (1944-1948) y Carlos Prío Socarrás (1948-1952) se caracterizaron por la corrupción desenfrenada, el gangsterismo político, el fraude electoral y la violencia. Los derechos sociales quedaron mayormente en el papel, mientras la miseria, el desempleo y la desigualdad continuaban azotando a las masas populares.

El golpe de estado de Fulgencio Batista el 10 de marzo de 1952 fue la puntilla final para la Constitución de 1940. Batista suspendió la Constitución, disolvió el Congreso, e instauró una dictadura militar abierta. Esta violación flagrante del orden constitucional fue uno de los factores que motivó el alzamiento revolucionario del 26 de julio de 1953 contra el Cuartel Moncada, liderado por Fidel Castro.

En su alegato de autodefensa "La Historia me Absolverá", pronunciado tras el asalto al Moncada, Fidel Castro invocó precisamente la Constitución de 1940 como justificación legal y moral de la insurrección: "La Constitución de 1940 no ha muerto, ni morirá. Los principios de la Revolución Democrática, se alzarán triunfantes desde las ruinas del cuartel". El programa revolucionario que Castro esbozó en ese histórico alegato retomaba y radicalizaba las promesas incumplidas de la Constitución de 1940: reforma agraria, nacionalización de servicios públicos, derecho a la educación y la salud, justicia social.

Con el triunfo de la Revolución en 1959, muchas de las aspiraciones que la Constitución de 1940 había proclamado pero que la República neocolonial nunca había cumplido, se hicieron finalmente realidad. La reforma agraria de 1959, la nacionalización de industrias básicas, la campaña de alfabetización de 1961, el acceso universal a la salud y la educación gratuitas, representaron la concreción de los derechos sociales que la Constitución de 1940 había prometido pero que el sistema capitalista neocolonial nunca pudo o quiso implementar.

La Constitución de 1940 permanece en la memoria histórica cubana como un documento contradictorio: por un lado, representó las aspiraciones democráticas y sociales del pueblo cubano y condensó en texto legal las demandas de generaciones de luchadores; por otro lado, demostró los límites del reformismo dentro del marco neocolonial y capitalista, probando que los derechos proclamados en el papel solo podían hacerse realidad mediante una transformación revolucionaria profunda de la sociedad.`
  },
  {
    id: 6,
    title: "Golpe de Estado de Fulgencio Batista",
    date: "1952",
    description: "Batista destruye la democracia e instaura una dictadura sangrienta",
    image: "/eventos/republica-1952-golpe.jpeg",
    wideImage: "/eventos/wide/republica-1952-golpe-wide.jpeg",
    fullStory: `En la madrugada del 10 de marzo de 1952, el ex presidente y ex sargento Fulgencio Batista, respaldado por un sector del ejército cubano, perpetró un golpe de estado que destruyó el orden constitucional, suspendió las elecciones previstas para el 1 de junio, disolvió el Congreso, y estableció una dictadura militar que se convertiría en uno de los regímenes más brutales y corruptos de la historia cubana. Este golpe cerró todos los canales legales y pacíficos de cambio político, y demostró que la burguesía cubana, aliada con el imperialismo estadounidense, estaba dispuesta a sacrificar incluso la apariencia de democracia con tal de preservar sus privilegios.

Fulgencio Batista y Zaldívar, de origen humilde y mestizo, había ascendido en el ejército hasta alcanzar el grado de sargento taquígrafo. Había participado en el golpe del 4 de septiembre de 1933 que derrocó al gobierno de Carlos Manuel de Céspedes, convirtiéndose en el hombre fuerte detrás de varios gobiernos títere. En 1940 había sido elegido presidente constitucionalmente, gobernando hasta 1944. Tras ese período había vivido en Estados Unidos, desde donde planeaba su retorno al poder.

En 1952, Batista se presentó como candidato a la presidencia por el Partido Acción Unitaria, pero las encuestas mostraban que obtendría un distante tercer lugar tras Roberto Agramonte del Partido del Pueblo Cubano (Ortodoxo) y Carlos Hevia del Partido Auténtico. Ante la certeza de la derrota electoral, y contando con el apoyo de sectores militares, la oligarquía cubana temerosa de las promesas reformistas de los ortodoxos, y el beneplácito tácito de Estados Unidos, Batista optó por el golpe de estado.

En la madrugada del 10 de marzo, unidades militares comandadas por oficiales leales a Batista tomaron el campamento militar de Columbia (el más importante de La Habana), arrestaron al jefe del ejército, general Ruperto Cabrera, y ocuparon puntos estratégicos de la capital. El presidente Carlos Prío Socarrás, corrupto y cobarde, huyó sin ofrecer resistencia, primero a México y luego a Miami, llevándose millones de dólares del tesoro público. La burguesía política cubana, los partidos tradicionales, y los sectores pudientes de la sociedad acogieron el golpe con alivio o indiferencia.

Batista suspendió inmediatamente la Constitución de 1940, disolvió el Congreso, destituyó a los gobernadores provinciales y alcaldes, intervino la Universidad de La Habana, suspendió las garantías constitucionales, e instauró la censura de prensa. Aunque prometió convocar a elecciones, era evidente que su intención era perpetuarse en el poder mediante la fuerza. En 1954 organizó unas elecciones fraudulentas sin oposición real, en las que se proclamó ganador con el 100% de los votos.

La dictadura de Batista se caracterizó desde el inicio por la represión brutal de toda oposición. Se creó el Buró de Represión de Actividades Comunistas (BRAC), una policía política que torturaba y asesinaba a opositores. Los métodos de tortura incluían golpizas salvajes, aplicación de corriente eléctrica, arrancamiento de uñas, mutilaciones, y asesinatos que se presentaban como "suicidios" o "accidentes". Los cadáveres de jóvenes revolucionarios aparecían colgados en postes, acribillados a balazos, o arrojados en basureros como advertencia a otros opositores.

El régimen de Batista se convirtió en uno de los más corruptos de la historia cubana, y eso es decir mucho en una república que había conocido niveles extraordinarios de corrupción desde su fundación. Batista y su camarilla de militares y políticos venales se enriquecieron mediante el saqueo sistemático del erario público, la venta de concesiones a empresas estadounidenses, el control del juego y la prostitución, y el narcotráfico. La Habana se convirtió en el burdel y casino del imperialismo, con hoteles lujosos, casinos controlados por la mafia estadounidense, y una industria del sexo que explotaba la pobreza de mujeres cubanas.

La alianza entre Batista y el imperialismo estadounidense era estrecha y mutuamente beneficiosa. Estados Unidos veía en Batista un aliado confiable en el contexto de la Guerra Fría, dispuesto a reprimir cualquier movimiento de izquierda y a mantener a Cuba abierta a las inversiones estadounidenses. Corporaciones como la United Fruit Company, la Cuban Electric Company, y decenas de ingenios azucareros estadounidenses prosperaban bajo Batista. El embajador estadounidense Arthur Gardner y luego Earl E. T. Smith apoyaban abiertamente la dictadura.

Batista recibió apoyo militar de Washington: armas, entrenamiento para sus oficiales, y asesoría de expertos militares estadounidenses. Los aviones B-26 que bombardeaban poblaciones campesinas sospechosas de apoyar a los guerrilleros, las bombas de napalm que quemaban campos de caña, los tanques Sherman que atacaban las posiciones rebeldes en la Sierra Maestra, todo venía de Estados Unidos. El Pentágono veía a Batista como un baluarte contra el comunismo en el Caribe.

Sin embargo, la dictadura de Batista despertó la resistencia de amplios sectores del pueblo cubano. Los comunistas del Partido Socialista Popular, aunque inicialmente adoptaron una postura vacilante frente al golpe, eventualmente se incorporaron a la lucha contra la tiranía. Los obreros organizaron huelgas y protestas. Los estudiantes universitarios, fieles a su tradición de lucha revolucionaria, manifestaban y conspiraban contra el régimen. Organizaciones clandestinas urbanas como el Movimiento Nacional Revolucionario y el Directorio Revolucionario organizaban sabotajes y atentados.

Pero fue un joven abogado de 25 años, relativamente desconocido en ese momento, quien daría el golpe más audaz y significativo contra la dictadura. Fidel Castro Ruz, militante del Partido Ortodoxo y candidato a representante en las elecciones canceladas por el golpe, comprendió que tras el cuartelazo de Batista ya no había posibilidad de cambio por vías pacíficas y legales. "¿Qué armas luchan por la democracia? Las vuestras", declaró Castro denunciando a los militares golpistas.

Castro comenzó a organizar un movimiento revolucionario clandestino formado principalmente por jóvenes de extracción humilde o de clase media: obreros, campesinos, estudiantes, profesionales idealistas. Durante más de un año, este grupo se entrenó, consiguió armas, y planificó una acción revolucionaria que cambiaría el curso de la historia cubana y latinoamericana: el asalto a los cuarteles Moncada en Santiago de Cuba y Carlos Manuel de Céspedes en Bayamo, el 26 de julio de 1953.

El golpe de estado de Batista en 1952 cerró definitivamente cualquier posibilidad de cambio democrático dentro del marco institucional de la República neocolonial. Demostró que la burguesía cubana prefería la dictadura militar abierta antes que correr el riesgo de reformas sociales que pudieran amenazar sus privilegios. Reveló la complicidad del imperialismo estadounidense, dispuesto a apoyar cualquier tiranía que protegiera sus intereses económicos.

Pero el golpe de Batista también desencadenó las fuerzas que llevarían a su derrocamiento y a la transformación revolucionaria de Cuba. Al cerrar las vías pacíficas, empujó a una generación de jóvenes idealistas hacia la lucha armada. Al reprimir brutalmente toda oposición, radicalizó el descontento popular. Al demostrar que el sistema neocolonial era irreformable, preparó el terreno para una revolución social profunda.

Como diría Fidel Castro en su alegato "La Historia me Absolverá": "Cuando un gobierno establece la tiranía contra el pueblo, la insurrección es el más sagrado de los derechos y el más imperioso de los deberes". El golpe de Batista había hecho inevitable la revolución. La dictadura que se instauró el 10 de marzo de 1952 sería derrocada el 1 de enero de 1959 por la revolución popular armada que Batista mismo había hecho necesaria e inevitable con su traición a la democracia y su brutal represión del pueblo cubano.`
  },
  {
    id: 7,
    title: "Asalto al Cuartel Moncada",
    date: "1953",
    description: "Inicio de la lucha armada revolucionaria liderada por Fidel Castro",
    image: "/eventos/republica-1953-moncada.jpeg",
    wideImage: "/eventos/wide/republica-1953-moncada-wide.jpeg",
    fullStory: `El 26 de julio de 1953, 160 jóvenes revolucionarios liderados por Fidel Castro lanzaron un audaz ataque simultáneo contra el cuartel Moncada en Santiago de Cuba y el cuartel Carlos Manuel de Céspedes en Bayamo. Aunque militarmente el asalto fracasó, representó el inicio de la última fase de la lucha por la liberación nacional de Cuba y sembró las semillas de la Revolución que triunfaría el primero de enero de 1959. El Moncada se convirtió en el símbolo del despertar revolucionario de una generación dispuesta a ofrendar su vida por la libertad de la patria.

Tras el golpe de estado del 10 de marzo de 1952, Fidel Castro había llegado a la conclusión de que solo mediante la lucha armada podría derrocarse la dictadura de Batista. Durante más de un año, Castro y un grupo de compañeros reclutaron y entrenaron jóvenes dispuestos a empuñar las armas contra la tiranía. La mayoría provenían de sectores humildes: obreros, campesinos, empleados, estudiantes. Nombres como Abel Santamaría, su hermana Haydée, Raúl Castro (hermano menor de Fidel), Pedro Miret, Jesús Montané, Melba Hernández, entre otros, pasarían a la historia como los héroes del Moncada.

El plan era atreverse y sorprender al poderoso enemigo atacando la segunda fortaleza militar más importante del país. El Moncada albergaba más de mil soldados y gran cantidad de armamento. La estrategia de Castro era tomar el cuartel por sorpresa en las primeras horas del 26 de julio, aprovechando que muchos soldados estarían de licencia por las fiestas del carnaval santiaguero. Con las armas capturadas en el Moncada, los revolucionarios llamarían al pueblo a la insurrección general, esperando que el descontento popular contra Batista se transformara en un levantamiento masivo.

Los atacantes se dividieron en tres grupos. El grupo principal, comandado por Fidel Castro, atacaría la entrada principal del Moncada. Un segundo grupo, liderado por Abel Santamaría, tomaría el hospital militar adyacente. Un tercer grupo, encabezado por Raúl Castro, ocuparía el Palacio de Justicia para dominar los techos y proporcionar fuego de cobertura. Simultáneamente, otro contingente bajo el mando de Raúl Martínez Ararás atacaría el cuartel de Bayamo.

En la madrugada del 26 de julio, vestidos en su mayoría con uniformes militares para confundir a los guardias, los revolucionarios se aproximaron al Moncada en varios automóviles. Sin embargo, el factor sorpresa se perdió parcialmente cuando una patrulla militar los descubrió antes de tiempo. Se desató un combate feroz. Los revolucionarios lucharon valientemente contra un enemigo muy superior en número y armamento. Pero sin el elemento sorpresa y enfrentando el fuego de ametralladoras y la llegada de refuerzos militares, el asalto estaba condenado al fracaso.

Fidel Castro, al comprender que la situación era insostenible y que continuar el combate solo causaría más bajas inútiles, ordenó la retirada. Los sobrevivientes intentaron escapar y dispersarse por las montañas cercanas. Muchos fueron capturados en los días siguientes. De los 160 hombres que participaron en ambos ataques, 68 perdieron la vida: algunos murieron en combate, pero la mayoría fueron asesinados después de rendirse o ser capturados.

La represión fue brutal y genocida. Los soldados de Batista, enfurecidos por la audacia del ataque, desataron una orgía de sangre. Los prisioneros fueron torturados salvajemente: les sacaron los ojos, les arrancaron los testículos, los acribillaron a balazos, los colgaron. Abel Santamaría fue sometido a torturas especialmente crueles: le extrajeron los ojos mientras aún vivía. Su compañera Haydée Santamaría tuvo que soportar que los torturadores le mostraran los ojos de su hermano y los testículos de su novio Boris Luis Santa Coloma, intentando quebrarla psicológicamente. Ella resistió heroicamente, negándose a dar información.

Solo la intervención del Arzobispo de Santiago, Monseñor Enrique Pérez Serantes, quien medió para que los prisioneros fueran entregados vivos a las autoridades judiciales, salvó a Fidel Castro y a otros sobrevivientes de ser asesinados. Incluso así, de 160 participantes, solo 32 llegaron vivos al juicio.

El juicio a los atacantes del Moncada se convirtió en una tribuna revolucionaria. Fidel Castro, actuando como su propio abogado, pronunció el 16 de octubre de 1953 uno de los alegatos políticos más importantes de la historia latinoamericana: "La Historia me Absolverá". En este discurso de varias horas, Castro no solo defendió la legitimidad y necesidad del alzamiento contra la tiranía, sino que expuso un programa revolucionario completo de transformación social.

"La Historia me Absolverá" denunciaba las condiciones de miseria, desempleo, explotación y desigualdad que sufría el pueblo cubano bajo el sistema neocolonial. Exponía cifras demoledoras: 600,000 cubanos sin trabajo; 500,000 obreros del campo que trabajaban solo cuatro meses al año y pasaban hambre el resto; 400,000 obreros industriales sometidos a salarios miserables; 100,000 pequeños agricultores arruinados; 30,000 maestros y profesores mal pagados; 20,000 pequeños comerciantes abrumados por deudas.

El programa revolucionario que Castro esbozaba incluía: restitución plena de la Constitución de 1940; reforma agraria para entregar la tierra a los campesinos; derecho de los obreros a participar en las ganancias de las empresas; derecho de los colonos a controlar la mitad de la producción azucarera; confiscación de los bienes malversados; nacionalización de los servicios públicos (teléfonos, electricidad); reforma educativa que garantizara maestros, útiles y alimentación para todos los niños; y reforma tributaria para obligar a los ricos a pagar impuestos proporcionales a su riqueza.

Castro concluyó su alegato con palabras proféticas: "Condénenme, no importa. La Historia me Absolverá". Fue sentenciado a 15 años de prisión en el penal de Isla de Pinos (actual Isla de la Juventud). Otros compañeros recibieron sentencias menores. Las dos mujeres que participaron en el asalto, Haydée Santamaría y Melba Hernández, fueron sentenciadas a prisión pero con condenas más leves debido a los prejuicios machistas del tribunal.

En prisión, los moncadistas mantuvieron su disciplina revolucionaria y su moral elevada. Estudiaban, hacían ejercicio, debatían teoría política, y preparaban la continuación de la lucha. Fidel Castro escribió numerosas cartas que se contrabandeaban fuera de la prisión, manteniendo el contacto con el movimiento revolucionario.

Una intensa campaña nacional e internacional por la libertad de los presos políticos del Moncada obligó finalmente a Batista a decretar una amnistía en mayo de 1955. Los moncadistas salieron de prisión convertidos en símbolos de la resistencia contra la dictadura. Fidel Castro, consciente de que no podría organizar la lucha revolucionaria libremente en Cuba bajo la vigilancia de la policía política, partió hacia México en julio de 1955 para preparar una expedición armada que retornaría a Cuba a continuar la lucha.

El asalto al Moncada, aunque militarmente fallido, tuvo consecuencias políticas trascendentales. Demostró que existía una juventud dispuesta a dar su vida por la liberación de Cuba. Rompió el miedo y la pasividad que la represión batistiana había intentado imponer. Proporcionó un programa revolucionario claro y radical que iba mucho más allá de simplemente restaurar la constitucionalidad. Creó una épica de heroísmo y sacrificio que inspiró a miles de jóvenes a unirse posteriormente a la lucha revolucionaria.

Los mártires del Moncada – Abel Santamaría, Boris Luis Santa Coloma, Renato Guitart, Pedro Marrero, y decenas de otros – se convirtieron en símbolos sagrados de la revolución cubana. Su sangre regó el árbol de la libertad, como había dicho José Martí que era necesario. El 26 de julio se transformó en la fecha emblemática de la revolución, dando nombre al Movimiento 26 de Julio que dirigiría la lucha hasta la victoria de 1959.

Fidel Castro resumiría décadas después el significado del Moncada: "El Moncada fue la chispa que encendió la hoguera revolucionaria que consumió la dictadura y el sistema neocolonial. Sin el Moncada no habría habido Granma, ni Sierra Maestra, ni primero de enero de 1959. El Moncada fue el acto de fe de una generación en el destino revolucionario de Cuba".

El 26 de julio de 1953 marca el inicio de la fase final de más de un siglo de luchas por la verdadera independencia de Cuba, comenzando con el Grito de Yara de Carlos Manuel de Céspedes en 1868, continuando con las guerras independentistas del siglo XIX, frustradas por la intervención estadounidense, y culminando finalmente con el triunfo revolucionario de 1959 que estableció por primera vez en la historia de Cuba un gobierno verdaderamente soberano e independiente del imperialismo.`
  },
  {
    id: 8,
    title: "Fundación del Movimiento 26 de Julio",
    date: "1955",
    description: "Organización del movimiento revolucionario en el exilio mexicano",
    image: "/eventos/republica-1955-movimiento.jpeg",
    wideImage: "/eventos/wide/republica-1955-movimiento-wide.jpeg",
    fullStory: `El 7 de julio de 1955, tras salir de prisión bajo amnistía, Fidel Castro partió hacia México con la firme determinación de organizar una expedición armada que retornaría a Cuba para derrocar la dictadura de Batista. En el exilio mexicano se gestó el Movimiento 26 de Julio, la organización revolucionaria que lideraría la lucha armada que culminaría con el triunfo del primero de enero de 1959. Este período del exilio mexicano fue crucial para la formación político-militar de los cuadros revolucionarios y para la elaboración de la estrategia que permitiría la victoria.

Castro comprendía que no podría organizar efectivamente la lucha revolucionaria dentro de Cuba bajo la constante vigilancia de la policía política de Batista. México, con su tradición de asilo político para revolucionarios latinoamericanos, ofrecía un refugio seguro donde preparar el retorno armado a la patria. En México, Castro se reunió con otros exiliados cubanos antiimperialistas y comenzó el arduo trabajo de organización, reclutamiento y entrenamiento.

En junio de 1955, durante su estadía en México, Fidel Castro conoció a un joven médico argentino de 27 años que cambiaría el curso de su vida y de la revolución cubana: Ernesto Guevara de la Serna, a quien todos llamaban "Che". Guevara, que había viajado por América Latina siendo testigo de la miseria y la opresión que el imperialismo estadounidense imponía sobre los pueblos latinoamericanos, y que había vivido en Guatemala el golpe de estado contra el gobierno progresista de Jacobo Arbenz orquestado por la CIA, estaba convencido de que solo la revolución armada podría liberar a América Latina.

Raúl Castro fue quien presentó a su hermano Fidel con el Che. Cuenta la leyenda revolucionaria que conversaron toda la noche, y al amanecer Che Guevara ya estaba enlistado como el primer voluntario no cubano de la expedición. El Che aportaría no solo su valentía y sus conocimientos médicos, sino también una visión internacionalista de la lucha revolucionaria y un compromiso inquebrantable con la causa de los pueblos oprimidos.

Castro reunió gradualmente un grupo de revolucionarios comprometidos: además de su hermano Raúl y el Che, se unieron Camilo Cienfuegos (el legendario "Señor de la Vanguardia"), Juan Almeida Bosque, Universo Sánchez, Jesús Montané, y decenas de otros jóvenes dispuestos a jugarse la vida por la liberación de Cuba. Algunos venían del ataque al Moncada; otros eran nuevos reclutas que se sumaban al movimiento revolucionario.

El entrenamiento militar fue riguroso. Contrataron a Alberto Bayo, un veterano de la Guerra Civil Española que había combatido en el bando republicano, como instructor de guerrillas. Bayo, que había escrito un manual de guerra de guerrillas, entrenó a los futuros expedicionarios del Granma en tácticas de combate, manejo de armas, orientación en terreno montañoso, primeros auxilios de campaña, y los principios de la guerra irregular. Los entrenamientos se realizaban en el rancho Santa Rosa, en las afueras de la Ciudad de México.

Fidel Castro demostraba ya las cualidades de liderazgo que lo convertirían en uno de los grandes revolucionarios del siglo XX. Exigía disciplina férrea, pero también inspiraba con su carisma, su convicción inquebrantable, su capacidad de análisis político, y su ejemplo personal. Participaba en todos los entrenamientos, estudiaba incansablemente teoría militar y política, y trabajaba día y noche en la organización de la expedición.

Sin embargo, el camino no fue fácil. La dictadura de Batista, a través de su embajada en México, presionaba a las autoridades mexicanas para que deportaran o arrestaran a los exiliados cubanos. En junio de 1956, la policía mexicana arrestó a varios miembros del grupo, incluyendo a Fidel y Raúl Castro y al Che Guevara. Solo mediante la intervención de simpatizantes mexicanos influyentes, incluyendo el ex presidente Lázaro Cárdenas (quien había nacionalizado el petróleo mexicano desafiando a Estados Unidos), y mediante el pago de sobornos, lograron ser liberados.

Mientras el núcleo expedicionario se entrenaba en México, en Cuba se desarrollaba la lucha clandestina urbana bajo la dirección de Frank País, joven revolucionario santiaguero de apenas 22 años que demostraría ser un organizador excepcional. Frank País estructuró el Movimiento 26 de Julio en Cuba, organizando células clandestinas, consiguiendo armas y fondos, preparando la infraestructura de apoyo para la guerrilla que vendría de México, y coordinando acciones de sabotaje y propaganda contra la dictadura.

La estrategia de Castro era clara: la expedición del Granma desembarcaría en la costa oriental de Cuba, específicamente en Oriente, la provincia más pobre y con mayor tradición de rebeldía. Allí establecerían un foco guerrillero en la Sierra Maestra, las montañas donde 90 años antes Carlos Manuel de Céspedes había iniciado la primera guerra de independencia. Desde esa base montañosa, la guerrilla crecería, se fortalecería, y gradualmente extendería su control sobre el territorio hasta provocar el colapso del régimen batistiano.

Para financiar la expedición, Castro viajó a Estados Unidos en octubre-noviembre de 1955, donde pronunció discursos ante comunidades de exiliados cubanos en Nueva York, Filadelfia, Tampa, Cayo Hueso y otras ciudades. Explicaba el programa revolucionario del Movimiento 26 de Julio, denunciaba los crímenes de Batista, y solicitaba contribuciones económicas para la lucha. Los exiliados cubanos, principalmente trabajadores modestos, donaban generosamente sus ahorros para la causa revolucionaria.

Durante esta gira de recaudación de fondos, Castro pronunció un discurso profético en el Palm Garden de Nueva York el 30 de octubre de 1955: "En 1956 seremos libres o seremos mártires". Anunciaba públicamente que antes de que terminara 1956, los revolucionarios estarían combatiendo en Cuba. Esta declaración, que parecía una bravuconada, resultaría ser literal: el 2 de diciembre de 1956, el yate Granma desembarcaría en Cuba con 82 expedicionarios.

El Movimiento 26 de Julio adoptó como lema "Libertad o Muerte" y como símbolo los colores rojo y negro: el rojo por la sangre derramada por los mártires, el negro por el luto por esos caídos. El programa del Movimiento, basado en "La Historia me Absolverá", era radical: reforma agraria que entregara la tierra a los campesinos, nacionalización de servicios públicos monopolizados por corporaciones estadounidenses, industrialización del país para romper la dependencia del monocultivo azucarero, y justicia social para los sectores más empobrecidos del pueblo cubano.

El Movimiento 26 de Julio representaba una nueva generación revolucionaria que había aprendido de las lecciones de las luchas frustradas del pasado. Comprendían que no bastaría con derrocar a Batista; era necesaria una transformación social profunda que desmantelara las estructuras de dominación neocolonial. Aunque en 1955-1956 el programa del Movimiento aún no era explícitamente socialista, ya contenía elementos antimperialistas y anticapitalistas que lo ponían en colisión con los intereses del imperialismo estadounidense.

El Movimiento también se caracterizaba por su amplitud y flexibilidad táctica. Aglutinaba desde revolucionarios de clase media urbana hasta campesinos pobres, desde estudiantes universitarios hasta obreros. Algunos miembros, como el Che Guevara y Raúl Castro, tenían ya convicciones marxistas claras; otros, como Camilo Cienfuegos, provenían del anarquismo; muchos simplemente eran jóvenes patriotas indignados por la tiranía sin una ideología política definida. Esta diversidad sería una fortaleza durante la lucha, aunque después del triunfo generaría tensiones cuando había que definir el rumbo de la revolución.

En México, mientras se preparaba la expedición, Castro seguía estudiando incansablemente. Leía a Marx, Engels y Lenin; estudiaba las experiencias de la Revolución Rusa, la Revolución China, y otras luchas revolucionarias; analizaba las lecciones de las guerras de independencia cubanas del siglo XIX; y reflexionaba sobre la estrategia militar y política necesaria para derrotar a un enemigo muy superior en número y armamento.

Por fin, después de meses de preparación, llegó el momento de partir. El 25 de noviembre de 1956, 82 revolucionarios abordaron el yate Granma en el puerto de Tuxpan, México. La embarcación, construida para 12 pasajeros, estaba peligrosamente sobrecargada con 82 hombres más armas, municiones, alimentos y pertrechos. El Che Guevara describiría posteriormente la travesía como "un Vía Crucis": condiciones de hacinamiento extremo, mares agitados, muchos hombres mareados y vomitando, el motor con problemas, amenaza de hundimiento.

Pero nada de eso quebró la moral revolucionaria. Estos hombres estaban dispuestos a morir por la libertad de Cuba. Como había dicho José Martí, a quien citaban constantemente: "El pueblo más feliz es el que tenga mejor educados a sus hijos, en la instrucción del pensamiento, y en la dirección de los sentimientos. Un pueblo instruido ama el trabajo y sabe sacar provecho de él. Un pueblo virtuoso vivirá más feliz y más rico que otro lleno de vicios, y se defenderá mejor de todo ataque".

El Movimiento 26 de Julio, fundado en el exilio mexicano, representaba la vanguardia de una generación dispuesta a redimir a Cuba de la tiranía, la corrupción y el dominio imperialista. La expedición del Granma estaba a punto de desembarcar en Cuba para iniciar la fase final de más de un siglo de luchas por la verdadera independencia nacional.`
  },
  {
    id: 9,
    title: "Desembarco del Granma",
    date: "1956",
    description: "82 revolucionarios regresan a Cuba para iniciar la guerra de guerrillas",
    image: "/eventos/republica-1956-granma.jpeg",
    wideImage: "/eventos/wide/republica-1956-granma-wide.jpeg",
    fullStory: `El 2 de diciembre de 1956, en las primeras horas de la madrugada, el yate Granma encalló en un manglar de la playa Las Coloradas, en la costa suroriental de Cuba, cerca de Niquero, provincia de Oriente. Los 82 expedicionarios que desembarcaron ese día, agotados tras una travesía infernal de siete días por el Mar Caribe, inauguraron la fase final de la lucha armada que culminaría con el derrocamiento de la dictadura de Batista y el establecimiento del primer gobierno verdaderamente independiente en la historia de Cuba.

El desembarco fue un desastre desde el punto de vista militar. El plan original preveía llegar a Cuba el 30 de noviembre para coordinar con un levantamiento urbano que Frank País organizaría en Santiago de Cuba. Sin embargo, el Granma, sobrecargado con 82 hombres cuando su capacidad era para 12 pasajeros, sufrió problemas mecánicos, navegó más lentamente de lo previsto, y llegó con dos días de retraso. Para cuando los expedicionarios tocaron tierra cubana, el alzamiento de Santiago ya había sido sofocado por las fuerzas de Batista.

Peor aún, en lugar de desembarcar en la playa arenosa que habían planeado, el Granma encalló en un manglar pantanoso. Los expedicionarios tuvieron que vadear por ciénagas de lodo hasta la cintura, perdiendo equipos, armas, municiones y pertrechos. Exhaustos, desorientados, mojados y hambrientos, los revolucionarios se internaron en los cañaverales y campos de la zona, buscando alcanzar las estribaciones de la Sierra Maestra donde pensaban establecer su base guerrillera.

La dictadura, alertada por un guardacostas que había avistado el Granma, movilizó miles de soldados para cercar y aniquilar a los expedicionarios. El ejército de Batista contaba con aviones, artillería, ametralladoras, comunicaciones, y superioridad numérica abrumadora. La Fuerza Aérea bombardeó la zona del desembarco. Las columnas de infantería peinaron el área buscando a los revolucionarios.

El 5 de diciembre, apenas tres días después del desembarco, la vanguardia del Ejército Rebelde fue emboscada en Alegría de Pío mientras descansaba en un cañaveral. La aviación y la infantería de Batista atacaron simultáneamente. El combate fue confuso y desesperado. Los expedicionarios, dispersos y desorganizados, lucharon contra un enemigo muy superior. Muchos murieron en el combate; otros fueron capturados y ejecutados posteriormente; el resto logró escapar dispersándose en pequeños grupos.

El Che Guevara, herido durante el combate (un balazo le rozó el cuello), enfrentó un dilema que describió posteriormente con honestidad brutal: llevaba dos cajas, una con medicamentos y otra con balas; solo podía cargar una. "Sin pensarlo casi, agarré la caja de balas", escribiría. Este gesto simboliza la transformación del médico humanista en guerrillero revolucionario dispuesto a todo por la causa de la liberación.

Durante días, los sobrevivientes vagaron por campos y montes, hambrientos, sedientos, perseguidos. Algunos fueron capturados y asesinados. Juan Manuel Márquez, Ñico López, y otros compañeros cayeron heroicamente. Los campesinos de la zona, muchos aterrorizados por la represión del ejército pero otros inspirados por el coraje de los revolucionarios, ayudaron ocultándolos y guiándolos hacia las montañas.

De los 82 expedicionarios originales del Granma, solo lograron reagruparse inicialmente menos de 20. La prensa cubana, controlada por la dictadura, anunció triunfalmente la aniquilación total de los invasores. El periódico gubernamental proclamó: "Fidel Castro ha muerto". En México y en Estados Unidos, los exiliados cubanos creyeron que la expedición había terminado en tragedia total.

Pero Fidel Castro vivía. Con un puñado de compañeros, había logrado escapar del cerco militar y adentrarse en las estribaciones de la Sierra Maestra. El 18 de diciembre de 1956, en un lugar llamado Cinco Palmas, se produjo el reagrupamiento que salvaría la revolución. Fidel, Raúl, el Che, Camilo Cienfuegos, Juan Almeida, Ramiro Valdés, y otros pocos sobrevivientes se reencontraron. Aunque eran apenas un puñado de hombres mal armados frente a un ejército de miles, Fidel pronunció palabras que se harían legendarias: "Ahora sí ganamos la guerra".

Esta fe inquebrantable en la victoria, esta convicción de que la justicia de su causa prevalecería sobre la superioridad material del enemigo, caracterizaría toda la lucha revolucionaria. Los guerrilleros establecieron su primer campamento en la Sierra Maestra, la cordillera montañosa que había sido refugio de rebeldes desde las guerras de independencia del siglo XIX.

Los primeros meses en la Sierra fueron durísimos. Los guerrilleros carecían de alimentos suficientes, de medicinas, de pertrechos. El ejército de Batista lanzó ofensivas para aniquilarlos. Pero gradualmente, el Ejército Rebelde comenzó a fortalecerse. Campesinos de la zona, víctimas históricas del latifundio, de la explotación y de la marginación, empezaron a unirse a la guerrilla. El primer recluta campesino fue Guillermo García, quien se convertiría en Comandante.

La primera victoria militar del Ejército Rebelde se produjo el 17 de enero de 1957 en La Plata, cuando atacaron y derrotaron un cuartel de la Guardia Rural. Aunque era apenas un combate menor, demostró que los rebeldes podían derrotar al ejército de Batista. Confiscaron armas, pertrechos, y lo más importante, ganaron confianza en sus propias fuerzas.

La visita del periodista estadounidense Herbert Matthews del New York Times en febrero de 1957 fue crucial. Matthews viajó clandestinamente a la Sierra Maestra, entrevistó a Fidel Castro, y publicó una serie de reportajes que dieron a conocer internacionalmente la existencia de la guerrilla y desmintieron la propaganda gubernamental de que Castro había muerto. Aunque Matthews exageró el número de guerrilleros (Castro organizó un montaje para hacer parecer que tenía más hombres de los que realmente tenía), el impacto político fue enorme.

Mientras la guerrilla de la Sierra se consolidaba, en las ciudades el Movimiento 26 de Julio organizaba la lucha clandestina. Frank País dirigía brillantemente las operaciones urbanas: sabotajes, atentados, propaganda, recaudación de fondos, y abastecimiento de la guerrilla. El 30 de julio de 1957, Frank País fue asesinado por la policía de Batista en Santiago de Cuba. Su muerte provocó un alzamiento popular espontáneo y una huelga general de protesta que paralizó Santiago durante días.

La guerrilla de la Sierra Maestra aplicaba una estrategia que combinaba guerra de guerrillas, guerra psicológica, trabajo político con los campesinos, y construcción de un poder alternativo en las zonas liberadas. Fidel Castro demostró ser no solo un guerrillero valiente sino un estratega político brillante. Estableció tribunales revolucionarios para impartir justicia, organizó escuelas para alfabetizar a los campesinos, distribuyó tierras a los guajiros, estableció un hospital de campaña, y creó Radio Rebelde para transmitir el mensaje revolucionario.

El Ejército Rebelde trataba bien a los prisioneros de guerra (a diferencia del ejército de Batista que torturaba y asesinaba), lo cual contribuyó a minar la moral del enemigo. Muchos soldados conscriptos, reclutados forzosamente de los sectores populares, simpatizaban secretamente con los rebeldes. Algunos desertaban y se unían a la guerrilla.

El desembarco del Granma, que inicialmente pareció un desastre, se reveló como el inicio de una epopeya revolucionaria. Los 82 expedicionarios – o más bien los menos de 20 que sobrevivieron las primeras semanas – sembrarían la semilla de la revolución que transformaría Cuba. Desde ese manglar de Las Coloradas hasta el Palacio Presidencial de La Habana el primero de enero de 1959 median apenas 25 meses, pero fueron 25 meses de lucha heroica, sacrificio, y construcción de un ejército popular que derrotaría a un ejército profesional muchas veces superior.

Como diría Fidel Castro años después: "El Granma no trajo a 82 hombres; trajo la fe, la convicción, la voluntad de un pueblo entero de liberarse. Trajo las ideas que transformarían Cuba. Esos 82 hombres eran la semilla de la nueva Cuba que nacería el primero de enero de 1959".

El 2 de diciembre, aniversario del desembarco del Granma, se celebra en Cuba como el Día de las Fuerzas Armadas Revolucionarias, reconociendo ese momento fundacional del Ejército Rebelde que se convertiría después del triunfo revolucionario en las Fuerzas Armadas Revolucionarias, garantes de la soberanía nacional y la independencia conquistadas con la sangre de tantos mártires.`
  },
  {
    id: 10,
    title: "Batalla de Santa Clara",
    date: "1958",
    description: "Victoria decisiva del Che Guevara que abre el camino al triunfo revolucionario",
    image: "/eventos/republica-1958-santa-clara.jpeg",
    wideImage: "/eventos/wide/republica-1958-santa-clara-wide.jpeg",
    fullStory: `Entre el 28 de diciembre de 1958 y el 1 de enero de 1959, se libró en Santa Clara, capital de la provincia de Las Villas en el centro de Cuba, la batalla decisiva de la guerra revolucionaria. Bajo el mando del Comandante Ernesto "Che" Guevara, la Columna 8 "Ciro Redondo" del Ejército Rebelde, con apenas 300 guerrilleros mal armados, derrotó a más de 3,000 soldados del ejército de Batista, tomó la ciudad, y provocó el colapso final de la dictadura. La batalla de Santa Clara, y particularmente el ataque al tren blindado que se convertiría en leyenda, selló el destino de la tiranía y abrió las puertas al triunfo revolucionario del primero de enero de 1959.

La campaña de Las Villas había comenzado meses antes como parte de la estrategia final para derrocar a Batista. En agosto de 1958, cuando el Ejército Rebelde había derrotado la última gran ofensiva de la dictadura en la Sierra Maestra, Fidel Castro ordenó la invasión del territorio nacional: dos columnas guerrilleras marcharían desde Oriente hacia occidente para llevar la guerra al corazón de Cuba y partir el país en dos, aislando las tropas de Batista en Oriente.

El Che Guevara comandaba la Columna 8 con destino a Las Villas, mientras Camilo Cienfuegos dirigía la Columna 2 "Antonio Maceo" que también marcharía hacia esa provincia. La travesía fue una prueba durísima: más de 500 kilómetros a pie por terreno hostil, pantanos, zonas desérticas, bajo constante acoso de la aviación enemiga, sin alimentos suficientes, cargando heridos y enfermos. Muchos guerrilleros sucumbieron al agotamiento, al hambre, a enfermedades. Pero los que llegaron a Las Villas en octubre de 1958 estaban endurecidos y dispuestos a todo.

En Las Villas, el Che encontró una situación compleja. Además del Movimiento 26 de Julio, operaban otras organizaciones guerrilleras: el Directorio Revolucionario 13 de Marzo, que había tomado el Escambray desde 1957; el Partido Socialista Popular (comunista); y otros grupos menores. El Che, demostrando su capacidad de unidad y su visión estratégica, logró coordinar estas fuerzas dispares bajo un mando unificado, formando el Frente Revolucionario del Escambray.

Durante noviembre y diciembre de 1958, las fuerzas rebeldes tomaron gradualmente el control de la provincia. El Che demostró ser un estratega militar brillante, combinando ataques guerrilleros con guerra de posiciones cuando era necesario. Capturó varios pueblos y ciudades menores: Fomento, Cabaiguán, Placetas, Sancti Spíritus. Cada victoria sumaba moral, armas y hombres al Ejército Rebelde, mientras el ejército de Batista se desmoralizaba y desintegraba.

Para finales de diciembre, Santa Clara, la tercera ciudad más importante de Cuba con más de 150,000 habitantes, era el último bastión gubernamental en Las Villas. Batista había concentrado allí más de 3,000 soldados bien armados, con tanques, blindados, artillería, y el apoyo de la aviación. La dictadura estaba decidida a defender Santa Clara a toda costa, pues su caída significaría el fin del régimen.

El 28 de diciembre de 1958, el Che Guevara, con apenas 300 guerrilleros divididos en varias columnas, inició el ataque a Santa Clara. La estrategia rebelde era audaz: atacar simultáneamente varios puntos de la ciudad, crear confusión en las filas enemigas, aislar las guarniciones, y cortar las comunicaciones. La población civil de Santa Clara, harta de la tiranía, colaboraba activamente con los rebeldes: levantaban barricadas, proporcionaban información sobre las posiciones enemigas, curaban a los guerrilleros heridos.

El 29 de diciembre llegó a Santa Clara un tren blindado procedente de La Habana con refuerzos para el ejército sitiado: 22 vagones transportando 408 soldados de élite, abundante munición, armas pesadas, equipos de comunicación, e incluso un carro bomba con 1,000 galones de gasolina para quemar zonas rebeldes. Este tren blindado representaba una de las últimas esperanzas de Batista para contener el avance revolucionario.

El Che ordenó descarrilar el tren blindado en un punto estratégico de la ciudad. Los guerrilleros, usando tractores "bulldozer" requisados, arrancaron rieles de la vía férrea. Cuando el tren blindado intentó avanzar, descarriló parcialmente. Lo que siguió fue un combate épico que se convertiría en leyenda de la guerra revolucionaria.

Los guerrilleros atacaron el tren blindado con cócteles molotov (botellas con gasolina), granadas de fabricación casera, y fuego de fusil. Aunque los soldados del tren tenían armas muy superiores, estaban atrapados en los vagones de acero que se habían convertido en hornos bajo el sol tropical y el fuego de los molotovs. El humo, el calor insoportable, el ataque incesante de los guerrilleros, y sobre todo la certeza de que su causa estaba perdida, quebraron la moral de los soldados gubernamentales.

Tras cinco horas de combate, los soldados del tren blindado se rindieron. Fue un golpe devastador para la dictadura: perdieron 408 soldados de élite (que se rindieron prácticamente sin bajas), un arsenal enorme de armas modernas, y sobre todo, perdieron el mito de su invencibilidad. El Che, en un gesto que caracterizó toda la guerra revolucionaria, trató bien a los prisioneros, les proporcionó agua y alimentos, los curó si estaban heridos, y luego los dejó libres. Muchos de esos soldados, impresionados por el trato humanitario, posteriormente se unirían al Ejército Rebelde o al menos se negarían a seguir combatiendo contra la revolución.

Con las armas capturadas en el tren blindado, los rebeldes intensificaron el ataque a Santa Clara. Combatieron casa por casa, calle por calle. El cuartel 31 del Regimiento, el Cuartel de la Policía, y otras guarniciones fueron atacadas y tomadas una por una. Los francotiradores rebeldes, entre ellos muchas mujeres combatientes como Aleida March (quien se convertiría en compañera del Che), controlaban las calles.

El 31 de diciembre, mientras las fuerzas rebeldes completaban la toma de Santa Clara, Batista reunió en el campamento militar de Columbia en La Habana a sus generales para informarles que huía del país. Esa noche de fin de año, mientras el pueblo cubano esperaba ansiosamente noticias, Batista abordó un avión en el aeropuerto de Columbia junto con decenas de sus más cercanos colaboradores, cargando varios millones de dólares del tesoro público, y huyó a Santo Domingo.

La huida de Batista desató el júbilo popular en toda Cuba. En Santa Clara, cuando los últimos soldados leales a la dictadura supieron que Batista había huido, depusieron las armas. El primero de enero de 1959, Santa Clara amaneció completamente en manos del Ejército Rebelde. La bandera del Movimiento 26 de Julio ondeaba sobre los edificios públicos.

El triunfo en Santa Clara fue obra del genio militar del Che Guevara, pero también del heroísmo de centenares de guerrilleros que lucharon hasta el límite de sus fuerzas, y del apoyo incondicional del pueblo de Santa Clara que se había sumado activamente a la insurrección. Entre los héroes de Santa Clara destacan Roberto Rodríguez "El Vaquerito", francotirador legendario que cayó en combate en los últimos días de la batalla, y decenas de otros revolucionarios cuya sangre regó el árbol de la libertad.

La batalla de Santa Clara no fue solo una victoria militar; fue también una victoria moral y política. Demostró que un ejército popular, motivado por ideales de justicia y liberación nacional, podía derrotar a un ejército profesional muy superior en armamento cuando este ejército profesional defendía una causa injusta e ilegítima. Demostró que el pueblo cubano estaba dispuesto a luchar y morir por su libertad.

Tras la caída de Santa Clara y la huida de Batista, la columna del Che marchó hacia La Habana mientras la columna de Camilo Cienfuegos tomaba el campamento militar de Columbia. Fidel Castro, desde Santiago de Cuba, ordenó una huelga general revolucionaria para impedir que los militares batistianos intentaran perpetuarse en el poder mediante un golpe de estado "constitucionalista". El 2 de enero, Castro entró triunfalmente en Santiago. El 8 de enero, después de recorrer el país en caravana victorioso, Fidel Castro llegó a La Habana aclamado por multitudes.

La victoria de Santa Clara marca el fin de la República neocolonial y el inicio de la Revolución Cubana. El 1 de enero de 1959 no fue solo el derrocamiento de una dictadura; fue el inicio de una transformación social profunda que finalmente cumpliría los sueños de independencia nacional, justicia social y dignidad humana por los que habían luchado Céspedes, Martí, Maceo, Guiteras, y tantos otros patriotas cubanos durante más de un siglo.

El Che Guevara, héroe de Santa Clara, se convertiría en símbolo mundial de la lucha revolucionaria. Su imagen, su ejemplo de entrega total a la causa de los oprimidos, su internacionalismo consecuente que lo llevaría a luchar en el Congo y en Bolivia donde caería asesinado por el imperialismo en 1967, inspirarían a generaciones de revolucionarios en todo el mundo.

Santa Clara, la ciudad donde se decidió el destino de Cuba, honra hoy la memoria del Che con un imponente memorial que alberga sus restos, repatriados desde Bolivia en 1997. El tren blindado descarrilado ha sido convertido en museo. Y cada 28 de diciembre, el pueblo cubano recuerda la batalla que abrió las puertas a la libertad definitiva de la patria.`
  }
];

  const revolucionEvents = [
  {
    id: 1,
    title: "Triunfo de la Revolución y entrada de Fidel a La Habana",
    date: "1959",
    description: "La Caravana de la Libertad recorre Cuba desde Santiago hasta La Habana",
    image: "/eventos/revolucion-1959-triunfo.jpeg",
    wideImage: "/eventos/wide/revolucion-1959-triunfo-wide.jpeg",
    fullStory: `El 1 de enero de 1959 marcó el inicio de una nueva era para Cuba. Cuando Fulgencio Batista huyó del país en la madrugada llevándose millones robados del tesoro público, el pueblo cubano supo que había triunfado después de más de seis años de lucha revolucionaria. La victoria no solo significaba el fin de una dictadura sangrienta, sino el inicio de transformaciones sociales profundas que cambiarían para siempre el destino de la nación.

Fidel Castro, desde Santiago de Cuba, ordenó una huelga general revolucionaria para impedir que los restos del ejército batistiano intentaran perpetuarse en el poder. El pueblo respondió masivamente: fábricas, comercios y transportes se paralizaron. Era el sello definitivo del triunfo popular.

El 2 de enero comenzó la histórica Caravana de la Libertad. Fidel y sus guerrilleros barbudos partieron desde Santiago hacia La Habana, recorriendo toda la isla por la Carretera Central. Este no fue un simple desfile triunfal; fue una marcha revolucionaria que permitió al líder establecer contacto directo con el pueblo en cada ciudad, consolidar el poder revolucionario y explicar los objetivos de la Revolución.

Miles de cubanos se agolpaban en los caminos para ver pasar a los libertadores. En cada ciudad donde la Caravana se detenía, Fidel pronunciaba discursos de horas explicando las transformaciones que vendrían: reforma agraria, nacionalización de servicios públicos, educación y salud gratuitas, verdadera independencia nacional. Sus palabras electrizaban a las multitudes que veían en él al líder que finalmente cumpliría las promesas incumplidas desde 1902.

El 8 de enero de 1959, la Caravana entró en La Habana. El recibimiento fue apoteósico: cientos de miles de habaneros inundaron las calles en una explosión de júbilo sin precedentes. El grito unánime era "¡Fidel! ¡Fidel!" y "¡Viva la Revolución!". La ciudad entera celebraba la liberación.

La Caravana se dirigió primero al campamento de Columbia, el cuartel general del ejército batistiano que ahora estaba en manos del Ejército Rebelde bajo el mando de Camilo Cienfuegos. Columbia había sido durante décadas el símbolo del poder militar que sostenía las dictaduras. Ahora era el escenario del triunfo del pueblo.

En el polígono de Columbia, ante una multitud gigantesca, Fidel pronunció su primer gran discurso en La Habana. "Ganar la guerra fue relativamente fácil", advirtió. "Lo difícil es lo que viene ahora, lo difícil es la paz." Habló de la responsabilidad histórica, de la necesidad de unidad, de estar vigilantes contra las maniobras del imperialismo y los enemigos de la Revolución.

Cuando algunos sugirieron que el Ejército Rebelde debía desarmarse, Fidel respondió con su célebre pregunta: "¿Armas, para qué?" Y explicó que las armas del pueblo serían la garantía de que esta revolución no sería traicionada como lo había sido la de 1933. El pueblo en armas defendería sus conquistas contra cualquier agresión.

Después del discurso en Columbia, Fidel habló nuevamente desde el balcón del Palacio Presidencial. Reiteró los compromisos revolucionarios ante el pueblo congregado en las calles del centro de La Habana. El acto terminó pasadas las dos de la madrugada del 9 de enero.

Los días siguientes fueron de organización febril. Se formó el nuevo gobierno, se tomaron las primeras medidas revolucionarias: reducción de tarifas eléctricas, rebaja de alquileres, aumento de salarios. El pueblo comenzaba a sentir los beneficios concretos de la victoria.

Pero las fuerzas reaccionarias ya comenzaban a conspirar. Estados Unidos veía con preocupación el rumbo radical de los acontecimientos. La oligarquía cubana se organizaba para recuperar sus privilegios perdidos. Fidel lo sabía y por eso insistía en la vigilancia revolucionaria y la unidad del pueblo.

El triunfo del 1 de enero y la entrada de Fidel a La Habana el 8 de enero no fueron solo el fin de una dictadura; fueron el inicio de una revolución genuina que transformaría radicalmente a Cuba, desafiaría al imperialismo estadounidense y se convertiría en faro de esperanza para los pueblos oprimidos del mundo. La Revolución Cubana demostraba que era posible derrotar dictaduras militares, conquistar la independencia real y construir una sociedad más justa.`
  },
  {
    id: 2,
    title: "Primera Ley de Reforma Agraria",
    date: "17 de mayo de 1959",
    description: "Promulgación de la ley que entregó la tierra a los campesinos",
    image: "/eventos/revolucion-1959-reforma-agraria.jpeg",
    wideImage: "/eventos/wide/revolucion-1959-reforma-agraria-wide.jpeg",
    fullStory: `El 17 de mayo de 1959, en la Comandancia de La Plata en la Sierra Maestra, Fidel Castro firmó la Primera Ley de Reforma Agraria, la medida revolucionaria más trascendental de la Revolución Cubana. Esta ley liquidó el latifundio que durante siglos había sido la base de la explotación en Cuba y entregó la tierra a más de 100,000 familias campesinas.

La fecha elegida honraba la memoria de Niceto Pérez, un campesino asesinado el 17 de mayo de 1946 por sicarios de un terrateniente mientras luchaba contra los desalojos. La ceremonia en La Plata, donde había funcionado el cuartel general guerrillero durante la guerra, fue profundamente simbólica: la ley se firmaba entre los campesinos que habían apoyado la lucha revolucionaria.

La situación del campo cubano antes de la Revolución era dramática. El 1.5% de los propietarios poseían más del 46% de las tierras. Solo 2,336 latifundios controlaban vastas extensiones, mientras cientos de miles de familias campesinas no tenían tierra. Los latifundios estadounidenses eran inmensos: la United Fruit Company poseía 264,000 hectáreas. Estas tierras permanecían en gran parte improductivas mientras el pueblo pasaba hambre.

Los campesinos cubanos vivían en la miseria: el 60% en bohíos de piso de tierra, sin electricidad ni agua corriente. La desnutrición infantil era altísima, el analfabetismo superaba el 40% en el campo. No había escuelas, hospitales ni carreteras. El desempleo era crónico durante el "tiempo muerto" entre zafras azucareras.

La Reforma Agraria proscribió el latifundio fijando un máximo de 30 caballerías (402 hectáreas) que una persona podía poseer. Prohibió la propiedad extranjera sobre tierras cubanas, golpeando los intereses imperialistas. Entregó gratuitamente la tierra a arrendatarios, aparceros y precaristas, otorgándoles títulos de propiedad. Más de 100,000 familias se convirtieron en propietarios.

Las tierras nacionalizadas pasaron al Estado o se organizaron en cooperativas. Se creó el Instituto Nacional de Reforma Agraria (INRA) para aplicar la ley, con Fidel como presidente. El INRA se convirtió en el organismo más poderoso de Cuba, dirigiendo toda la transformación económica.

Miles de campesinos acudieron a La Plata para presenciar la firma. Muchos lloraban de emoción al comprender que finalmente la tierra sería suya. Fidel proclamó: "La tierra será de quien la trabaja. Se acabó para siempre la explotación del hombre por el hombre en el campo cubano."

La reacción de los enemigos fue inmediata. Los latifundistas cubanos comprendieron que enfrentaban una transformación radical que aniquilaría su poder. Comenzaron a conspirar, sabotear la producción y preparar acciones armadas. La oligarquía azucarera de Camagüey encabezó la resistencia.

Estados Unidos reaccionó con hostilidad. Las compañías estadounidenses expropiadas presionaron al gobierno de Eisenhower. Washington comenzó presiones económicas: reducción de importaciones de azúcar, negación de créditos, conspiración con contrarrevolucionarios. El imperialismo comprendía que la Reforma Agraria amenazaba su dominio sobre Cuba.

Las ceremonias de entrega de títulos de propiedad que se realizaron por toda Cuba fueron profundamente emotivas. Campesinos ancianos analfabetos que habían trabajado la tierra toda su vida sin poseerla recibían el documento que los hacía propietarios. Muchos no contenían las lágrimas, besaban el título, lo guardaban como el tesoro más preciado.

La Reforma Agraria transformó radicalmente la estructura económica y social de Cuba. Liquidó el latifundismo, liberó las fuerzas productivas del campo, creó un mercado interno al aumentar el poder adquisitivo campesino, sentó bases para la diversificación agrícola y el desarrollo industrial. Fundamentalmente, reivindicó la dignidad humana de los campesinos.

Como dijo Fidel: "Fue la Ley de Reforma Agraria lo que definió a la Revolución Cubana. Cuando se vio que de verdad se haría una ley agraria, se vio que había de verdad una revolución en Cuba."

La Reforma Agraria fue el parteaguas que obligó a definirse: o con la Revolución que transformaba las estructuras de opresión, o contra ella defendiendo privilegios. No había términos medios. La ley reveló el carácter de clase de la Revolución y aceleró la polarización que conduciría al socialismo.

El 17 de mayo se celebra en Cuba como el Día del Campesino, recordando cuando en las montañas de la Sierra Maestra se firmó la ley que entregó la tierra a quien la trabaja, cumpliendo la promesa martiana de una república "con todos y para el bien de todos".`
  },
  {
    id: 3,
    title: "Victoria de Playa Girón",
    date: "17-19 de abril de 1961",
    description: "Primera gran derrota militar del imperialismo en América Latina",
    image: "/eventos/revolucion-1961-playa-giron.jpeg",
    wideImage: "/eventos/wide/revolucion-1961-playa-giron-wide.jpeg",
    fullStory: `Entre el 17 y el 19 de abril de 1961, en apenas 72 horas, el pueblo cubano en armas derrotó a una fuerza mercenaria de 1,500 hombres organizada, entrenada, armada y transportada por Estados Unidos. La victoria de Playa Girón representó la primera gran derrota militar del imperialismo estadounidense en América Latina y consolidó definitivamente el carácter socialista de la Revolución.

La invasión fue parte de la "Operación Plutón", el proyecto más ambicioso de la CIA hasta ese momento. Aprobado por Eisenhower y continuado por Kennedy, contemplaba reclutar y entrenar cubanos contrarrevolucionarios en campamentos de Guatemala y Nicaragua para derrocar a Fidel e instalar un gobierno títere.

La Brigada de Asalto 2506 estaba compuesta por ex-terratenientes desposeídos por la Reforma Agraria, ex-oficiales del ejército de Batista, empresarios que habían huido cuando la Revolución nacionalizó sus propiedades. No era un ejército del pueblo sino una fuerza mercenaria defendiendo privilegios de clase.

El plan contemplaba establecer una cabeza de playa en Bahía de Cochinos, área aislada en la costa sur separada del resto del territorio por la Ciénaga de Zapata. Washington creía que el desembarco provocaría un levantamiento popular contra Fidel, pero se equivocaban trágicamente: no comprendían que la Revolución contaba con apoyo popular masivo.

El 15 de abril de 1961, dos días antes del desembarco, bombarderos B-26 estadounidenses pintados con insignias falsas atacaron aeródromos cubanos intentando destruir la aviación. El ataque no logró su objetivo pero alertó que la invasión era inminente, permitiendo movilizar las fuerzas defensivas.

El 16 de abril, durante el sepelio de las víctimas del bombardeo, Fidel proclamó por primera vez el carácter socialista de la Revolución: "¡Eso es lo que no pueden perdonarnos, que hayamos hecho una revolución socialista en las propias narices de Estados Unidos!" El pueblo respondió: "¡Patria o Muerte! ¡Venceremos!" Ese día se decretó alarma de combate para todo el país.

A la 1:30 AM del 17 de abril comenzó el desembarco por Playa Larga y Playa Girón. Los mercenarios traían tanques, morteros, ametralladoras y municiones abundantes. Pero no contaban con la determinación del pueblo cubano.

Las primeras fuerzas que enfrentaron el desembarco fueron milicianos del Batallón 339 de guardia en Playa Larga. Aunque superados en número y armamento, resistieron heroicamente causando las primeras bajas y dando tiempo para refuerzos.

Fidel se trasladó personalmente al frente de combate. Desde el central Australia dirigió la contraofensiva. Tropas del Ejército Rebelde, Milicias, Policía y unidades de tanques convergieron hacia Bahía de Cochinos por los tres terraplenes que atravesaban la ciénaga.

La batalla fue feroz. La pequeña aviación cubana atacaba incesantemente los buques invasores, hundiendo el Houston y dañando otros. El pueblo de la Ciénaga defendía con sus vidas las conquistas revolucionarias. Nemesia Rodríguez, adolescente cenaguera, murió cuando aviones mercenarios ametrallaron su bohío. Sus zapatitos blancos agujereados por balas inspirarían la "Elegía de los Zapaticos Blancos".

A las 5:30 PM del 19 de abril, después de 65 horas de combate, las fuerzas revolucionarias tomaron completamente Playa Girón. Más de 1,100 invasores fueron capturados. El resto había muerto o escapado. La Brigada 2506 estaba completamente derrotada.

Las bajas cubanas fueron 176 muertos y más de 300 heridos. Entre los caídos había estudiantes, obreros, campesinos, milicianos. Eduardo García Delgado escribió "Fidel" con su sangre antes de morir. Todos quedaron como héroes eternos de la patria.

La victoria tuvo consecuencias trascendentales. Militarmente, fue la primera derrota de una invasión estadounidense en la Guerra Fría. Políticamente, consolidó la Revolución: el pueblo estaba más unido que nunca. Internacionalmente, elevó el prestigio de Cuba en el mundo: los pueblos veían que el imperialismo no era invencible.

Para Estados Unidos fue una humillación que nunca perdonaría. Kennedy intensificaría las agresiones con la Operación Mangosta: sabotajes, terrorismo, planes de asesinato. Pero nunca más se atrevería a una invasión directa.

Los mercenarios capturados fueron juzgados públicamente. En lugar de ejecutarlos, fueron tratados humanamente y en diciembre de 1962 canjeados por 53 millones de dólares en alimentos y medicinas que Estados Unidos pagó como rescate.

Cada 19 de abril se conmemora Playa Girón como símbolo de la capacidad del pueblo de defender la Revolución. Las palabras de Fidel resuenan: "Por esta Revolución de los humildes, por los humildes y para los humildes, estamos dispuestos a dar la vida."

Girón demostró que un pueblo unido, armado de ideales justos y dirigido consecuentemente, puede derrotar enemigos inmensamente más poderosos. Esta lección resuena cuando pueblos del mundo luchan por liberación: la victoria es posible si se está dispuesto a luchar por ella.`
  },
  {
    id: 4,
    title: "Campaña Nacional de Alfabetización",
    date: "1961",
    description: "Cuba se declara Territorio Libre de Analfabetismo",
    image: "/eventos/revolucion-1961-alfabetizacion.jpeg",
    wideImage: "/eventos/wide/revolucion-1961-alfabetizacion-wide.jpeg",
    fullStory: `El 22 de diciembre de 1961, ante más de un millón de personas en la Plaza de la Revolución, Fidel Castro proclamó que Cuba era "Territorio Libre de Analfabetismo". Culminaba la Campaña Nacional de Alfabetización, la más grande movilización popular educativa jamás realizada en América Latina, que alfabetizó a 707,212 cubanos en un año, reduciendo el analfabetismo del 23.6% al 3.9%.

Antes de la Revolución, más de un millón de cubanos no sabían leer ni escribir. En el campo, el analfabetismo superaba el 40%. Los gobiernos republicanos habían abandonado al pueblo en la ignorancia, pues un pueblo educado era más difícil de manipular y explotar. La Revolución comprendió que no podía haber desarrollo ni justicia sin educación universal.

El 26 de septiembre de 1960, Fidel anunció en la ONU que Cuba erradicaría el analfabetismo en un año. El mundo escéptico consideró imposible semejante meta. Pero Cuba estaba decidida a lograrlo mediante la movilización masiva del pueblo.

El 1961 fue declarado "Año de la Educación". Se crearon las Brigadas Conrado Benítez, nombradas en honor al joven maestro voluntario asesinado por contrarrevolucionarios en enero de 1961 mientras alfabetizaba en el Escambray. Miles de estudiantes secundarios y universitarios se ofrecieron como brigadistas.

Los brigadistas, adolescentes de 12 a 18 años, dejaron sus hogares urbanos para ir a las montañas y campos más remotos de Cuba a enseñar a leer y escribir. Llevaban su uniforme de milicianos, una lámpara de gas, un manual de alfabetización "Venceremos", y una voluntad inquebrantable de servir al pueblo.

La experiencia fue transformadora para todos. Los jóvenes urbanos descubrieron la realidad de los campesinos: bohíos sin luz ni agua, familias numerosas en extrema pobrez, ancianos que jamás habían tenido oportunidad de ir a la escuela. Los campesinos descubrieron que aquellos muchachos de la ciudad los respetaban, los consideraban sus iguales, se sacrificaban para enseñarles.

Las clases se daban por las noches, después del trabajo en el campo, a la luz de las lámparas de gas. Los alfabetizandos, muchos ancianos con manos callosas de toda una vida de trabajo duro, aprendían a trazar las primeras letras con la misma emoción que un niño. Cuando finalmente lograban escribir su nombre o leer una frase simple, lloraban de alegría.

La Campaña enfrentó obstáculos inmensos. Los contrarrevolucionarios, especialmente en el Escambray, atacaban a los alfabetizadores. Conrado Benítez fue el primero en caer, ahorcado brutalmente. Manuel Ascunce Domenech, brigadista de 16 años, fue asesinado junto con el campesino Pedro Lantigua que lo acogía. En total, cayeron varios alfabetizadores mártires de la educación.

Pero el pueblo no se intimidó. Por cada alfabetizador caído, cientos más se ofrecían. Las madres que habían perdido hijos en la lucha revolucionaria enviaban a sus otros hijos a alfabetizar. Era un ejemplo de heroísmo colectivo que conmovía al mundo.

Además de las Brigadas Conrado Benítez, participaron las Brigadas Obreras (trabajadores que alfabetizaban después de su jornada laboral), las Brigadas Patria o Muerte (maestros profesionales), y los Alfabetizadores Populares (personas que enseñaban en sus propios barrios). En total, 271,000 alfabetizadores participaron.

El método cubano de alfabetización, basado en palabras generadoras relacionadas con la realidad revolucionaria, era pedagógicamente avanzado. No solo enseñaba a leer y escribir sino que educaba políticamente, creando conciencia de la transformación social en curso.

El 22 de diciembre de 1961, la Plaza de la Revolución se llenó con más de un millón de personas para la proclamación de Cuba como Territorio Libre de Analfabetismo. Los brigadistas marcharon con sus lámparas encendidas en una imagen inolvidable. Campesinos alfabetizados subieron a la tribuna a leer con orgullo. El pueblo celebraba una victoria que parecía imposible.

La UNESCO reconoció la Campaña como una hazaña sin precedentes. Cuba había logrado en un año lo que a otros países tomaba décadas. Pero más importante que las cifras fue el impacto social: la Campaña unió a la nación, hermanó a diferentes sectores sociales, demostró que cuando el pueblo se moviliza nada es imposible.

La alfabetización fue solo el inicio. La Revolución creó un sistema educativo que llevó la escuela hasta el último rincón del país. Se construyeron escuelas en montañas donde nunca las hubo. Se formaron maestros por decenas de miles. Se universalizó la educación secundaria y universitaria.

Los exbrigadistas, muchos apenas adolescentes en 1961, llevan con orgullo toda su vida la experiencia de haber participado en aquella epopeya. Aprendieron tanto o más que sus alfabetizandos: aprendieron sobre la realidad de su país, sobre el compromiso revolucionario, sobre el valor de la solidaridad.

La Campaña de Alfabetización fue una revolución dentro de la Revolución. Demostró que Cuba no solo derrotaba invasiones militares sino que construía una sociedad nueva donde la educación era derecho de todos. Como dijo Fidel: "El futuro de nuestra patria tiene que ser necesariamente un futuro de hombres de ciencia."

El 22 de diciembre se celebra en Cuba como Día del Educador, recordando aquella hazaña que llevó la luz del conocimiento hasta el último bohío campesino y cumplió la promesa martiana de que la educación es la llave de la emancipación humana.`
  },
  {
    id: 5,
    title: "Crisis de Octubre",
    date: "Octubre de 1962",
    description: "Cuba en el centro de la confrontación nuclear entre superpotencias",
    image: "/eventos/revolucion-1962-crisis-octubre.jpeg",
    wideImage: "/eventos/wide/revolucion-1962-crisis-octubre-wide.jpeg",
    fullStory: `Entre el 22 y el 28 de octubre de 1962, el mundo estuvo al borde de una guerra nuclear que habría destruido la civilización humana. Cuba se encontró en el epicentro de la confrontación más peligrosa de la Guerra Fría cuando Estados Unidos descubrió la presencia de cohetes nucleares soviéticos en territorio cubano y exigió su retiro, amenazando con invadir la isla. Durante trece días de tensión insoportable, la humanidad contuvo el aliento mientras dos superpotencias nucleares se miraban sobre el abismo del holocausto atómico.

El contexto de la crisis se remontaba a Playa Girón. Después de aquella derrota humillante, Kennedy intensificó las agresiones contra Cuba mediante la Operación Mangosta: sabotajes, terrorismo, planes de asesinato de dirigentes revolucionarios, guerra biológica. Cuba enfrentaba una amenaza existencial del imperialismo más poderoso del mundo.

En este contexto, el gobierno cubano aceptó la propuesta soviética de instalar cohetes nucleares en Cuba como elemento disuasivo. Si Estados Unidos tenía cohetes apuntando a la URSS desde Turquía e Italia, ¿por qué la URSS no podía tener cohetes en Cuba? La decisión fue soberana del gobierno cubano, aunque consultada con Moscú.

A partir de julio de 1962, barcos soviéticos comenzaron a transportar cohetes de alcance medio e intermedio, ojivas nucleares, bombarderos IL-28, y 42,000 técnicos y militares soviéticos. La operación se realizó en secreto absoluto. Los cohetes podían alcanzar la mayoría de las ciudades estadounidenses en minutos, modificando dramáticamente el equilibrio estratégico de la Guerra Fría.

El 14 de octubre, un avión espía U-2 estadounidense fotografió las instalaciones de cohetes en construcción cerca de San Cristóbal, Pinar del Río. Kennedy reunió inmediatamente al Comité Ejecutivo del Consejo de Seguridad Nacional. Durante una semana debatieron opciones: bombardeo aéreo de las instalaciones, invasión total de Cuba, o bloqueo naval. Kennedy eligió el bloqueo, eufemísticamente llamado "cuarentena".

El 22 de octubre, Kennedy anunció al mundo en un dramático discurso televisado la existencia de los cohetes y el bloqueo naval. Exigió el retiro inmediato de los cohetes, advirtiendo que cualquier lanzamiento desde Cuba contra cualquier país sería considerado ataque soviético que provocaría "una respuesta de represalia total contra la Unión Soviética".

El mundo reaccionó con pánico. La guerra nuclear parecía inevitable. Cientos de buques de guerra estadounidenses establecieron el bloqueo alrededor de Cuba. Bombarderos B-52 cargados con armas nucleares sobrevolaban continuamente. Las fuerzas armadas estadounidenses alcanzaron DEFCON 2, el máximo nivel de alerta antes de la guerra. La URSS puso sus fuerzas nucleares en alerta máxima.

Cuba respondió con dignidad y firmeza. Fidel movilizó todo el país para la defensa. Cientos de miles de milicianos ocuparon posiciones de combate. Las baterías antiaéreas estaban listas. El pueblo cubano, lejos de aterrorizarse, estaba dispuesto a luchar hasta las últimas consecuencias. "¡Patria o Muerte!" no era una consigna vacía sino un compromiso real.

El 24 de octubre, cuando buques soviéticos se aproximaban a la línea de bloqueo, el mundo contuvo el aliento. Si los barcos la cruzaban, Estados Unidos los atacaría, iniciando la guerra. En el último momento, los barcos soviéticos se detuvieron. Dean Rusk, Secretario de Estado estadounidense, dijo: "Estábamos frente a frente y creo que el otro parpadeó".

Pero la crisis continuaba. Los cohetes permanecían en Cuba. El 27 de octubre, "Sábado Negro", la tensión alcanzó su punto máximo. Un U-2 fue derribado sobre Cuba, matando al piloto. Otro U-2 se desvió accidentalmente al espacio aéreo soviético. Cualquier error podía desencadenar el apocalipsis.

Esa noche, Fidel redactó una carta a Khrushchev argumentando que si Estados Unidos invadía Cuba, la URSS debía responder con un ataque nuclear preventivo contra Estados Unidos. Fidel no pedía que se lanzaran los cohetes por gusto, sino que comprendía que una invasión era inminente y que si Cuba sería destruida, el imperialismo también debía pagar el precio.

Khrushchev, aterrorizado por la posibilidad de guerra nuclear, negoció secretamente con Kennedy. El 28 de octubre anunció que retiraría los cohetes de Cuba a cambio de que Estados Unidos se comprometiera a no invadir Cuba y retirara sus cohetes de Turquía (esto último se mantuvo secreto inicialmente).

La decisión soviética se tomó sin consultar a Cuba. Fidel se enteró por la radio. La indignación cubana fue inmensa. Cuba no era un peón en el tablero de las superpotencias sino una nación soberana. El gobierno cubano se negó a permitir inspecciones de la ONU en territorio nacional, ejerciendo su soberanía.

En un discurso memorable del 1 de noviembre, Fidel enumeró las "Cinco Puntos de Cuba" para una solución genuina: fin del bloqueo económico, cese de actividades subversivas, fin de ataques piratas desde bases estadounidenses, cese de violaciones del espacio aéreo y naval, y devolución de la Base Naval de Guantánamo. Estados Unidos ignoró estos puntos.

Los cohetes fueron retirados, pero Cuba mantuvo su dignidad. La promesa estadounidense de no invasión, aunque no escrita en un tratado formal, significaba que la agresión militar directa ya no era opción viable para Washington. En ese sentido, la disuasión había funcionado.

La Crisis de Octubre dejó lecciones profundas. Cuba comprendió que no podía depender totalmente de aliados externos para su defensa. Se fortaleció la doctrina de "Guerra de Todo el Pueblo": cada cubano preparado para defender la Revolución. Se construyeron refugios antiaéreos, se organizaron milicias territoriales, se desarrolló una industria de defensa propia.

Para el mundo, la crisis demostró que la guerra nuclear debía evitarse a toda costa. Se estableció la línea directa "teléfono rojo" entre Washington y Moscú. Comenzó un proceso de distensión que eventualmente llevaría a tratados de control de armamentos.

Para Cuba, octubre de 1962 fue una prueba de fuego. El pueblo demostró que no se intimidaba ante amenazas del imperialismo más poderoso. Estaba dispuesto a defender su Revolución aunque significara desaparecer del mapa. Esta determinación, más que los cohetes, fue la verdadera garantía de la supervivencia revolucionaria.

Décadas después, cuando archivos se desclasificaron, se supo cuán cerca estuvo el mundo de la catástrofe. Submarinos soviéticos con torpedos nucleares casi los lanzaron cuando fueron hostigados por destructores estadounidenses. Comandantes locales tenían autorización de usar armas nucleares tácticas si se producía invasión. Solo la fortuna y algunos individuos sensatos evitaron el holocausto.

La Crisis de Octubre quedó como símbolo de la voluntad inquebrantable del pueblo cubano de defender su soberanía y su Revolución. Como dijo Fidel: "La dignidad de un pueblo no se negocia." Cuba había estado dispuesta a pagar el precio máximo por su independencia. Esa determinación es la razón por la cual, más de seis décadas después, la Revolución Cubana continúa resistiendo contra todo pronóstico.`
  },
  {
    id: 6,
    title: "Ofensiva Revolucionaria",
    date: "1968",
    description: "Nacionalización de pequeños negocios y profundización socialista",
    image: "/eventos/revolucion-1968-ofensiva-revolucionaria.jpeg",
    wideImage: "/eventos/wide/revolucion-1968-ofensiva-revolucionaria-wide.jpeg",
    fullStory: `El 13 de marzo de 1968, en el décimo aniversario del asalto al Palacio Presidencial que costó la vida a José Antonio Echeverría y otros jóvenes del Directorio Revolucionario 13 de Marzo, Fidel Castro anunció la Ofensiva Revolucionaria: la nacionalización de todos los pequeños negocios privados que aún quedaban en Cuba. Esta medida, que eliminó 58,000 pequeñas empresas privadas en cuestión de semanas, representó la culminación del proceso de socialización de la economía cubana y el intento más radical de construir una sociedad comunista pura, libre de toda forma de propiedad privada sobre medios de producción.

Desde 1959, la Revolución había nacionalizado los grandes medios de producción: latifundios, ingenios azucareros, compañías estadounidenses, bancos, industrias. Pero se había permitido la existencia de pequeños negocios privados: bodegas, restaurantes, talleres de reparación, barberías, pequeños talleres. Muchos de estos pequeños comerciantes habían apoyado la Revolución en 1959 y se consideraban revolucionarios.

Sin embargo, para 1968 la dirección revolucionaria consideraba que estos pequeños negocios privados eran incompatibles con la construcción del socialismo. Fidel argumentó que muchos se habían enriquecido excesivamente mediante el mercado negro y la especulación. En un contexto de escasez producto del bloqueo estadounidense, estos comerciantes acaparaban productos subsidiados por el Estado para revenderlos a precios especulativos, obteniendo ganancias que la Revolución consideraba inmorales.

La decisión de lanzar la Ofensiva se tomó en un contexto internacional específico. En 1968, movimientos revolucionarios sacudían el mundo: el Mayo francés, la Primavera de Praga, el movimiento estudiantil en México. Cuba quería demostr que estaba a la vanguardia de la revolución mundial, construyendo no solo socialismo sino avanzando hacia el comunismo puro que eliminaría toda forma de mercado y propiedad privada.

Ideológicamente, la Ofensiva se inspiraba en las ideas del Che Guevara sobre el "hombre nuevo" y la construcción comunista. El Che había argumentado que no se podía construir comunismo usando herramientas capitalistas como el mercado y los incentivos materiales. Había que crear incentivos morales, desarrollar la conciencia revolucionaria, trabajar no por dinero sino por el bien colectivo. Aunque el Che había sido asesinado en Bolivia en octubre de 1967, sus ideas influían profundamente en la Revolución.

La implementación de la Ofensiva fue rápida y masiva. En pocas semanas, 58,000 pequeños negocios fueron nacionalizados sin compensación. Los antiguos propietarios fueron reubicados como empleados estatales. Las bodegas se convirtieron en tiendas del pueblo. Los restaurantes en comedores obreros. Los talleres en empresas estatales.

La población recibió la medida con sentimientos encontrados. Los sectores más revolucionarios y los trabajadores asalariados la apoyaron entusiastamente, viendo en ella la eliminación de la "burguesía pequeña" que especulaba con las necesidades del pueblo. Pero los pequeños propietarios, aunque muchos eran revolucionarios, se sintieron traicionados. Habían apoyado la Revolución desde 1959, habían trabajado honestamente (la mayoría), y ahora perdían sus medios de vida.

La Ofensiva fue acompañada de una movilización ideológica masiva. Se organizaron asambleas en cada barrio explicando que la medida era necesaria para avanzar hacia el comunismo. Se denunciaban públicamente casos de especulación y enriquecimiento ilícito. La presión social sobre los pequeños propietarios era inmensa: si no entregaban "voluntariamente" sus negocios, eran señalados como contrarrevolucionarios.

Fidel pronunció discursos argumentando que Cuba se convertir en el primer país comunista genuino del mundo, superando incluso a la URSS que mantenía elementos de mercado y desigualdad salarial. "Vamos a construir el comunismo a la vez que construimos la base material del comunismo", declaró, invirtiendo la teoría marxista tradicional que sostenía que primero debía desarrollarse la abundancia material antes de transitar al comunismo.

La Ofensiva fue parte de un proyecto más amplio de transformación social radical. Simultáneamente se eliminaban los salarios diferenciados, se promovían el trabajo voluntario masivo, se intentaba eliminar el dinero como mediador de relaciones sociales. La visión era crear una sociedad donde las personas trabajaran no por incentivos materiales sino por conciencia revolucionaria y solidaridad colectiva.

Sin embargo, la Ofensiva tuvo consecuencias económicas negativas no previstas. La eliminación de los pequeños negocios privados eliminó válvulas de escape importantes en la economía. Los pequeños talleres de reparación, aunque a veces cobraban caro, reparaban rápidamente electrodomésticos, zapatos, bicicletas. Las bodegas privadas, aunque especulaban, distribuían productos cuando las tiendas estatales estaban vacías. Al nacionalizarlo todo, la burocracia estatal se volvió aún más ineficiente.

Los servicios de reparación prácticamente desaparecieron. Las tiendas estatales, sin competencia y sin incentivos, ofrecían servicio pésimo. La escasez, lejos de reducirse, empeoró. Paradójicamente, el mercado negro que la Ofensiva intentaba eliminar creció aún más porque la economía estatal no podía satisfacer las necesidades básicas de la población.

A nivel internacional, la Ofensiva fue vista con escepticismo incluso por países socialistas. La URSS consideraba que Cuba estaba siendo ultra-izquierdista, intentando quemar etapas históricas necesarias del desarrollo socialista. Los partidos comunistas europeos, que defendían el "eurocomunismo" con elementos de mercado, criticaban el extremismo cubano.

La Ofensiva Revolucionaria representó el punto máximo del idealismo revolucionario cubano. Era el intento de crear el comunismo por voluntarismo, por voluntad política y movilización de masas, sin esperar a que maduraran las condiciones materiales. Este enfoque reflejaba tanto la audacia como la ingenuidad de la Revolución en su fase más radical.

Con el tiempo, la propia dirección revolucionaria reconocería que la Ofensiva había sido excesiva. En los años 70, Cuba adoptó un modelo más pragmático, aceptando cierta diferenciación salarial e incentivos materiales. En los 90, durante el Período Especial, se volvería a autorizar el trabajo por cuenta propia precisamente porque la economía estatal no podía proveer todos los servicios necesarios.

Pero en 1968, en la embriaguez revolucionaria, Cuba creía que estaba a punto de alcanzar el comunismo puro. La Ofensiva fue expresión de esa convicción, de esa fe en que la voluntad humana organizada podía transformar la realidad material. Fue un experimento social sin precedentes que, aunque económicamente problemático, demostró la audacia de una revolución dispuesta a experimentar con formas radicales de organización social.

La experiencia de la Ofensiva enseñó que la construcción socialista es más compleja que la simple voluntad política, que requiere considerar realidades económicas objetivas, que el voluntarismo tiene límites. Pero también demostró la capacidad de Cuba de atreverse a experimentar, de intentar caminos no transitados, de no aceptar que "no hay alternativa" al capitalismo.

La Ofensiva Revolucionaria permanece como uno de los episodios más controversiales de la historia revolucionaria cubana: ejemplo tanto de la audacia transformadora como de los riesgos del voluntarismo extremo.`
  },
  {
    id: 7,
    title: "Zafra de los 10 Millones",
    date: "1970",
    description: "Esfuerzo nacional por alcanzar 10 millones de toneladas de azúcar",
    image: "/eventos/revolucion-1970-zafra-10-millones.jpeg",
    wideImage: "/eventos/wide/revolucion-1970-zafra-10-millones-wide.jpeg",
    fullStory: `La Zafra de los 10 Millones de 1970 fue el esfuerzo económico más grande, ambicioso y controvertido jamás emprendido por la Revolución Cubana. Durante más de 18 meses, toda la nación se movilizó para alcanzar la meta de producir 10 millones de toneladas de azúcar, una cifra récord que duplicaría la producción normal y que la dirección revolucionaria consideraba crucial para el desarrollo económico del país. Aunque la meta no se alcanzó —se produjeron 8.5 millones— la Zafra fue un evento definitorio que demostró tanto la capacidad de movilización revolucionaria como los límites del voluntarismo económico.

El origen de la meta de los 10 millones se remonta a 1963, cuando Fidel anunció que Cuba alcanzaría esa producción para 1970. El objetivo tenía múltiples motivaciones. Económicamente, el azúcar era prácticamente la única fuente de divisas para Cuba bajo el bloqueo estadounidense. Los 10 millones generarían ingresos masivos para financiar la industrialización. Políticamente, sería una demostración al mundo de que Cuba podía superar obstáculos "imposibles" mediante la movilización revolucionaria.

La cifra de 10 millones no era arbitraria. En 1952, antes de la Revolución, Cuba había producido 7.2 millones, la mayor zafra hasta entonces. Fidel argumentaba que con la Revolución, con el pueblo movilizado y la tecnificación de la agricultura, Cuba podía superar ese récord y establecer un nuevo estándar de productividad socialista.

Sin embargo, alcanzar 10 millones requería un esfuerzo extraordinario. Las zafras normales en los años 60 oscilaban entre 4 y 6 millones. Duplicar la producción implicaba no solo cortar más caña sino resolver problemas de transporte, maquinaria, molinos, almacenamiento. La infraestructura azucarera de Cuba, aunque considerable, no estaba diseñada para semejante volumen.

A partir de 1968, la preparación de la zafra se convirtió en prioridad absoluta nacional. Se importaron cortadoras de caña soviéticas, se repararon todos los centrales azucareros, se construyeron nuevos almacenes, se tendieron vías férreas adicionales. La inversión fue masiva, desviando recursos de otras áreas de la economía.

En julio de 1969 comenzó oficialmente "la zafra de los 10 millones", un año antes de lo normal. Las zafras cubanas normalmente duraban 4-5 meses (diciembre a abril). Esta zafra duraría más de 18 meses para maximizar el tiempo de corte y molienda.

La movilización de cortadores de caña fue masiva y sin precedentes. Se movilizaron 350,000 trabajadores voluntarios de todos los sectores: estudiantes universitarios, médicos, ingenieros, oficinistas, todos fueron a los cañaverales. Fidel mismo cortaba caña regularmente, dando ejemplo personal. Ministros, generales, intelectuales, todos empuñaban machetes bajo el sol tropical.

La consigna era "Los 10 Millones Van". Aparecía en murales por toda Cuba. Los carteles mostraban puños levantados cortando caña. La radio y televisión transmitían diariamente informes de la producción. Era una movilización propagandística sin precedentes.

El trabajo era brutal. Cortar caña es uno de los trabajos agrícolas más duros: bajo el sol ardiente, con temperaturas superiores a 30 grados, cortando tallos duros con machetes filosos, cargando toneladas de caña. Muchos voluntarios urbanos sufrían golpes de calor, cortes, agotamiento extremo. Pero la moral revolucionaria exigía continuar.

Para mantener el esfuerzo, se competía entre provincias, centrales, brigadas. Los que cortaban más caña recibían reconocimiento público. Se otorgaban títulos de "Machetero de Vanguardia". La emulación socialista se llevó a extremos nunca vistos.

Sin embargo, problemas aparecían por doquier. Las cortadoras mecánicas soviéticas se rompían constantemente en las condiciones tropicales. No había suficientes carretas ni trenes para transportar toda la caña cortada. La caña acumulada en los campos se deterioraba antes de llegar a los molinos. Los centrales trabajaban las 24 horas pero no daban abasto.

Más grave aún, la obsesión nacional con el azúcar paralizó el resto de la economía. Fábricas cerraban porque los trabajadores estaban en los cañaverales. La construcción se detuvo. Los servicios se deterioraron. Cuba se convirtió en un país de un solo producto, un solo objetivo: los 10 millones.

Para abril de 1970, fecha normal de fin de zafra, era evidente que no se alcanzaría la meta. Pero la dirección revolucionaria no podía admitir el fracaso. La zafra continuó hasta julio. Finalmente, el 19 de julio de 1970, con 8.5 millones de toneladas producidas, Fidel anunció que la meta no se había alcanzado.

El discurso de Fidel del 26 de julio de 1970 fue uno de los más notables de su carrera. En lugar de evadir la responsabilidad o buscar excusas, asumió públicamente el fracaso. "Convertimos en meta lo que debió haber sido un máximo esfuerzo", admitió. Ofreció su renuncia si el pueblo así lo decidía.

El pueblo respondió masivamente en apoyo. Un millón de personas en la Plaza de la Revolución gritaron "¡Fidel! ¡Fidel!" La legitimidad de la Revolución no dependía de una meta económica sino del vínculo entre el liderazgo y el pueblo.

Las consecuencias de la Zafra fueron complejas. Económicamente, aunque se produjeron 8.5 millones (récord histórico), el costo fue inmenso. El descuido de otros sectores provocó una caída general de la economía. El PIB decreció ese año. La escasez de productos aumentó. Cuba tardó años en recuperarse.

Políticamente, la Zafra enseñó lecciones importantes. Demostró los límites del voluntarismo revolucionario: la voluntad política y la movilización de masas no pueden por sí solas superar restricciones económicas objetivas. La economía tiene leyes propias que deben respetarse.

La experiencia llevó a cambios en la gestión económica cubana. A partir de los años 70, Cuba adoptó un modelo más pragmático, aceptando asistencia técnica soviética en planificación económica, implementando incentivos materiales diferenciados, profesionalizando la gestión empresarial. Se abandonó el voluntarismo extremo de los años 60.

Sin embargo, la Zafra también demostró aspectos positivos. Mostró la capacidad de movilización del pueblo cubano cuando se le convoca para un objetivo nacional. Mostró que cientos de miles de personas estaban dispuestas a sacrificarse por la Revolución. Ese capital humano, esa disposición al sacrificio colectivo, era un activo que pocas naciones poseían.

Los 8.5 millones de toneladas fueron récord absoluto y permanecieron como tal durante décadas. Cuba demostró que, aunque no alcanzara los 10 millones, era capaz de esfuerzos productivos extraordinarios cuando se movilizaba nacionalmente.

La Zafra de los 10 Millones permanece como símbolo ambivalente en la memoria histórica cubana. Representa tanto la audacia revolucionaria como los riesgos del voluntarismo económico. Demuestra que los pueblos pueden lograr hazañas impresionantes cuando se movilizan por objetivos colectivos, pero también que la voluntad tiene límites que deben reconocerse.

Como dijo Fidel en su autocrítica: "Nuestros enemigos no podrán decir jamás que el pueblo no estuvo a la altura. Tendrán que decir que los dirigentes, el gobierno, estuvieron por debajo del pueblo."

La experiencia de 1970 educó a la Revolución en realismo económico sin renunciar a la audacia transformadora. Esa síntesis entre idealismo revolucionario y pragmatismo económico marcaría el desarrollo de Cuba en las décadas siguientes.`
  },
  {
    id: 8,
    title: "Misión Internacionalista en Angola",
    date: "1975-1991",
    description: "Cuba apoya la independencia y soberanía angolana",
    image: "/eventos/revolucion-1975-angola.jpeg",
    wideImage: "/eventos/wide/revolucion-1975-angola-wide.jpeg",
    fullStory: `Entre 1975 y 1991, más de 300,000 cubanos —soldados, médicos, maestros, técnicos— participaron en la misión internacionalista en Angola, la mayor operación militar en el extranjero jamás realizada por Cuba. Esta intervención, que costó la vida a más de 2,000 cubanos, fue decisiva para defender la independencia de Angola contra la invasión sudafricana del apartheid, contribuyó a la liberación de Namibia, aceleró el fin del apartheid en Sudáfrica, y se convirtió en símbolo del internacionalismo revolucionario cubano y de la solidaridad con los pueblos africanos en lucha por su liberación.

Angola, antigua colonia portuguesa en el suroeste de África, había conquistado su independencia en 1975 después de 14 años de guerra de liberación. El Movimiento Popular de Liberación de Angola (MPLA), organización de izquierda liderada por Agostinho Neto, controlaba la capital Luanda y gran parte del territorio. Pero dos organizaciones rivales apoyadas por Occidente —FNLA y UNITA— disputaban el poder con apoyo de Estados Unidos, Zaire y especialmente Sudáfrica.

El 11 de noviembre de 1975, día programado para la proclamación formal de la independencia angolana, Sudáfrica invadió Angola desde el sur con miles de tropas, tanques y artillería moderna. Simultáneamente, mercenarios apoyados por la CIA y tropas zairenses atacaban desde el norte. El objetivo era tomar Luanda antes del 11 de noviembre e impedir que el MPLA proclamara la independencia.

El gobierno del MPLA, enfrentando la aniquilación, solicitó ayuda urgente a Cuba. Fidel respondió inmediatamente. Cuba no tenía intereses económicos en Angola: ninguna inversión, ningún recurso estratégico, ningún vínculo comercial. La decisión de intervenir fue puramente solidaria e ideológica: no se podía permitir que las fuerzas racistas del apartheid destruyeran la independencia de un pueblo africano hermano.

El 7 de noviembre de 1975, cuatro días antes de la proclamación de independencia, comenzó la Operación Carlota (nombre en honor a una esclava negra que lideró una rebelión en Cuba en 1843). Aviones cubanos comenzaron un puente aéreo sin precedentes transportando tropas y equipos a Luanda. En pocas semanas, miles de soldados cubanos llegaron a Angola.

Los cubanos enfrentaron inmediatamente a las fuerzas sudafricanas en combates feroces. El ejército sudafricano, uno de los más poderosos de África con armamento moderno occidental, esperaba una victoria fácil. Se sorprendieron al encontrar resistencia firme de tropas cubanas bien entrenadas y motivadas que no solo resistieron sino contraatacaron.

La batalla decisiva de esta primera fase ocurrió en noviembre-diciembre de 1975 cerca de Luanda. Las fuerzas sudafricanas, a solo kilómetros de la capital, fueron detenidas y luego expulsadas por las tropas cubanas en combates donde los cubanos demostraron superioridad táctica a pesar de la inferioridad numérica inicial. El 11 de noviembre, con cubanos defendiendo Luanda, Angola proclamó su independencia. Sudáfrica tuvo que retirarse hacia el sur.

Durante los siguientes años, Cuba mantuvo decenas de miles de tropas en Angola apoyando al gobierno del MPLA contra UNITA (organización guerrillera anticomunista dirigida por Jonas Savimbi y apoyada por Estados Unidos y Sudáfrica). Las tropas cubanas entrenaron al ejército angolano, construyeron infraestructura, defendieron instalaciones estratégicas como refinerías de petróleo, y combatieron cuando era necesario.

Pero la misión cubana no era solo militar. Miles de médicos cubanos establecieron hospitales y clínicas en zonas rurales donde jamás había habido servicios de salud. Maestros cubanos alfabetizaron y educaron a decenas de miles de angolanos. Técnicos cubanos repararon carreteras, puentes, sistemas eléctricos destruidos por la guerra. Cuba compartía con Angola lo que tenía: su capital humano, su experiencia revolucionaria, su solidaridad.

En 1987-1988, la guerra alcanzó su punto culminante. Sudáfrica lanzó su mayor ofensiva intentando conquistar el sur de Angola y destruir definitivamente al MPLA. En la región de Cuito Cuanavale, tropas sudafricanas con apoyo de UNITA y mercenarios atacaron posiciones angolano-cubanas. Durante meses, la batalla se desarrolló en condiciones brutales: calor extremo, terreno difícil, minados extensos.

Cuba envió refuerzos masivos. Para marzo de 1988, más de 50,000 soldados cubanos estaban en Angola, el contingente más grande de la guerra. Las fuerzas cubanas no solo defendieron Cuito Cuanavale sino lanzaron una contraofensiva hacia el sur, amenazando la frontera misma de Namibia (entonces ocupada ilegalmente por Sudáfrica).

La batalla de Cuito Cuanavale fue decisiva. El ejército sudafricano, que durante décadas había operado con impunidad en el sur de África, fue detenido y derrotado. Las bajas sudafricanas fueron considerables. El mito de la invencibilidad del apartheid se desmoronó. Por primera vez, tropas africanas y latinoamericanas habían derrotado al poderoso ejército blanco sudafricano.

La victoria militar obligó a negociaciones. En diciembre de 1988, en Nueva York bajo auspicios de la ONU, se firmaron los Acuerdos Tripartitos que establecían: retirada de tropas cubanas de Angola, independencia de Namibia, fin del apoyo sudafricano a UNITA. Los acuerdos fueron triunfo diplomático: Cuba logró que su objetivo de liberar Namibia se cumpliera.

La retirada cubana fue gradual y condicional: solo cuando Namibia alcanzara la independencia y Sudáfrica se retirara. En 1990, Namibia se independizó. En 1991, las últimas tropas cubanas salieron de Angola después de 16 años de presencia. Regresaron con honor, habiendo cumplido su misión internacionalista.

Las consecuencias de la intervención cubana fueron históricas. Angola mantuvo su independencia y su gobierno elegido sobrevivió (aunque la guerra civil continuó hasta 2002). Namibia conquistó su independencia después de décadas de lucha. Más importante aún, la derrota sudafricana en Angola aceleró dramáticamente el fin del apartheid: el régimen racista comprendió que no podía mantener su dominio por la fuerza si ni siquiera podía vencer en Angola.

Nelson Mandela, después de su liberación en 1990, visitó Cuba y declaró: "La derrota del ejército racista en Cuito Cuanavale fue una inspiración para el pueblo sudafricano en lucha. La derrota del apartheid comenzó en Cuito Cuanavale." Los movimientos de liberación africanos reconocieron que sin Cuba, la historia habría sido diferente.

Para Cuba, el costo fue alto. Más de 2,000 soldados cubanos murieron en Angola, miles quedaron heridos. Familias cubanas lloraron la pérdida de hijos enviados a luchar a miles de kilómetros. Económicamente, la intervención fue costosa para un país pequeño bloqueado. Pero Cuba nunca dudó de que había sido correcto. No se puede poner precio a la solidaridad y la dignidad.

La misión en Angola demostró varios aspectos del internacionalismo cubano. Primero, que Cuba estaba dispuesta a sacrificarse por causas justas sin esperar beneficios materiales. Segundo, que un país pequeño del Tercer Mundo podía desafiar militarmente a potencias regionales aliadas del imperialismo. Tercero, que la solidaridad internacional no era solo retórica sino práctica concreta.

La experiencia también educó a toda una generación de cubanos. Los jóvenes que fueron a Angola regresaron transformados, habiendo visto la pobreza extrema, las consecuencias del colonialismo, la valentía de los pueblos africanos. Comprendieron que las dificultades de Cuba eran menores comparadas con lo que sufrían otros pueblos. El internacionalismo dejó de ser abstracción para convertirse en experiencia vivida.

Hoy, en Angola, Cuba Namibia y Sudáfrica, monumentos recuerdan a los internacionalistas cubanos caídos. Calles llevan nombres cubanos. Generaciones de angolanos y namibios educados o curados por cubanos mantienen gratitud profunda. El legado de Cuba en África trasciende lo militar: es de solidaridad humana, de compartir no lo que sobra sino lo que se tiene.

La misión en Angola fue la expresión más dramática del principio internacionalista de la Revolución Cubana: que los pueblos oprimidos del mundo están unidos en su lucha contra el imperialismo y la opresión, que la liberación de cada pueblo contribuye a la liberación de todos. Como dijo Fidel: "No fuimos a Angola a buscar gloria sino a cumplir con nuestro deber. La gloria vino después."

La historia de Cuito Cuanavale y de la participación cubana en África es poco conocida en Occidente, deliberadamente silenciada por medios que no quieren reconocer que Cuba cambió el curso de la historia africana. Pero en África, en los movimientos de liberación del mundo, en la memoria de los pueblos oprimidos, aquella gesta internacionalista permanece como ejemplo luminoso de lo que significa la verdadera solidaridad entre pueblos.`
  },
  {
    id: 9,
    title: "Éxodo del Mariel",
    date: "1980",
    description: "Éxodo masivo desde el puerto del Mariel hacia Estados Unidos",
    image: "/eventos/revolucion-1980-mariel.jpeg",
    wideImage: "/eventos/wide/revolucion-1980-mariel-wide.jpeg",
    fullStory: `Entre abril y octubre de 1980, aproximadamente 125,000 cubanos abandonaron la isla desde el puerto del Mariel hacia Estados Unidos en un éxodo masivo y caótico que expuso tensiones internas de la sociedad revolucionaria, desafió la política migratoria estadounidense, y se convirtió en una de las crisis más complejas enfrentadas por la Revolución Cubana. El Éxodo del Mariel fue simultáneamente una victoria propagandística para Estados Unidos, una válvula de escape para presiones sociales en Cuba, y un ejemplo de cómo las contradicciones del proceso revolucionario podían manifestarse en crisis migratorias masivas.

Los antecedentes del Mariel se remontaban a tensiones acumuladas durante los años 70. Aunque la Revolución había logrado avances sociales impresionantes —educación y salud universales, pleno empleo, igualdad racial— también había impuesto restricciones significativas: economía centralizada con escasez crónica de bienes de consumo, limitación de libertades políticas, prohibición de viajar libremente. Para algunos cubanos, especialmente jóvenes nacidos después de 1959 que no habían vivido la miseria pre-revolucionaria, estas restricciones pesaban más que los logros.

En 1978-1979, el gobierno revolucionario había implementado una apertura limitada permitiendo que cubanos exiliados visitaran la isla. Miles regresaron ostentando riqueza material: ropa nueva, aparatos electrónicos, dólares. Para algunos cubanos que vivían austeridad revolucionaria, estas visitas generaron resentimiento y el deseo de emigrar buscando prosperidad material.

La crisis del Mariel comenzó el 1 de abril de 1980 cuando seis cubanos se refugiaron en la embajada de Perú en La Habana. El gobierno cubano retiró la guardia de la embajada y declaró que quien quisiera irse podía hacerlo. En 48 horas, más de 10,000 personas se agolparon en los terrenos de la embajada peruana. Las imágenes transmitidas mundialmente mostraban multitudes desesperadas por abandonar Cuba, una humillación para la Revolución.

Fidel respondió con una decisión audaz y controvertida: el 20 de abril anunció que quien quisiera irse a Estados Unidos podía hacerlo desde el puerto del Mariel, y que la comunidad cubana de Miami podía venir en barcos a recoger a sus familiares. Era un desafío directo a Estados Unidos, que siempre criticaba la prohibición cubana de emigrar libremente pero ahora enfrentaría una crisis migratoria masiva.

La respuesta fue inmediata. Miles de barcos —yates, pesqueros, lanchas— partieron de Florida hacia Mariel. La comunidad cubano-americana, ansiosa por reunirse con familiares, organizó una flotilla improvisada. Estados Unidos inicialmente permitió la operación, creyendo que Cuba se desangraría con una emigración masiva.

Pero el gobierno cubano implementó una política controvertida: obligaba a los barcos que venían a recoger familiares a llevar también a otras personas que el gobierno quería expulsar, incluyendo presos comunes, pacientes de instituciones psiquiátricas y personas consideradas "indeseables" por el régimen. Esta mezcla de emigrantes voluntarios con expulsados forzosos complicó dramáticamente el Mariel.

En Cuba, se organizaron "actos de repudio" contra quienes querían emigrar. Turbas dirigidas por los Comités de Defensa de la Revolución atacaban las casas de emigrantes, gritaban insultos, arrojaban huevos y tomates. Los que querían irse eran denunciados como "escoria", "lumpen", traidores al pueblo. Estos actos de repudio fueron uno de los episodios más vergonzosos de la Revolución, violando principios básicos de dignidad humana incluso hacia quienes elegían abandonar el proceso revolucionario.

El discurso del 1 de mayo de 1980 en la Plaza de la Revolución fue memorable. Fidel defendió el derecho soberano de Cuba a dejar salir a quien quisiera, ridiculizó a Estados Unidos por su doble moral migratoria, y calificó a los emigrantes de "escoria" y "lumpen". El pueblo revolucionario movilizado coraba consignas contra los "gusanos" que se iban. Fue un momento de polarización extrema en la sociedad cubana.

Para julio-agosto, más de 100,000 personas habían abandonado Cuba. Estados Unidos, abrumado por el flujo, intentó frenarlo. El gobierno de Carter declaró emergencia nacional. Los refugiados eran procesados en campos improvisados en Florida y otras bases militares. La mayoría eran integrados a la sociedad estadounidense, pero descubrieron que muchos de los "marielitos" incluían criminales y enfermos mentales que Cuba había expulsado deliberadamente.

El gobierno de Reagan, que asumió en 1981, utilizó propaganda el hecho de que Cuba había mezclado refugiados genuinos con criminales. Películas como "Scarface" retrataron a los marielitos como delincuentes violentos. La comunidad cubano-americana inicial recibió con frialdad a los recién llegados, muchos considerados "problemáticos". Tomó años para que la mayoría de los marielitos se integrara exitosamente.

Para Cuba, el Mariel tuvo consecuencias complejas. Políticamente, fue embarazoso que 125,000 personas quisieran abandonar el país. La propaganda estadounidense lo presentó como fracaso del socialismo cubano. Pero también funcionó como válvula de escape: muchos de los descontentos se fueron, reduciendo presiones internas. Económicamente, la salida de trabajadores creó déficits temporales en algunos sectores, pero fueron cubiertos rápidamente.

El Mariel obligó a reflexión autocrítica dentro de Cuba. ¿Por qué tanta gente quería irse? Las razones eran variadas: algunos por genuina disidencia política, otros buscando prosperidad material, otros presionados por familiares en Estados Unidos, otros simplemente aventureros. La Revolución comprendió que no podía satisfacer todas las aspiraciones materiales de todo el pueblo, especialmente bajo el bloqueo estadounidense, pero debía mejorar condiciones de vida y espacios de expresión individual.

Los actos de repudio contra emigrantes fueron posteriormente reconocidos como error. Incluso quienes abandonaran el proceso revolucionario merecían respeto humano básico. Esta lección influyó en políticas posteriores: cuando hubo nuevas crisis migratorias en 1994 y después, los actos de repudio no se repitieron de manera generalizada.

El Mariel también evidenció que la emigración cubana no era fenómeno simple de "huida del comunismo" como simplificaba la propaganda occidental. Los motivaciones eran complejas: económicas, familiares, personales, políticas. Muchos de los marielitos no eran contrarrevolucionarios ideológicos sino personas buscando mejores condiciones materiales o reunificación familiar.

En octubre de 1980 terminó oficialmente el Mariel. Estados Unidos y Cuba negociaron acuerdos para normalizar la migración. Se estableció que Estados Unidos otorgaría 20,000 visas anuales a cubanos, reduciendo incentivos para emigración ilegal. Estos acuerdos se han mantenido con altibajos durante décadas.

La experiencia del Mariel transformó tanto a Cuba como a la comunidad cubano-americana. Los marielitos trajeron a Miami una cultura más afrocubana, más popular, menos ligada a la élite pre-revolucionaria. Enriquecieron la diversidad de la comunidad cubana en Estados Unidos. Muchos, después de años, se convirtieron en exitosos empresarios, artistas, profesionales.

En Cuba, el Mariel enseñó que el compromiso revolucionario no podía darse por sentado, que había que trabajar constantemente para renovar el consenso social, que las generaciones que no vivieron el capitalismo pre-revolucionario necesitaban razones presentes —no solo históricas— para apoyar la Revolución.

El Mariel permanece como momento controvertido en la historia cubana: para unos, evidencia de problemas del socialismo cubano; para otros, ejemplo de manipulación migratoria por ambos gobiernos. La verdad es compleja: fue crisis que expuso contradicciones reales pero no invalidó los logros revolucionarios, que demostró que las sociedades en transformación enfrentan tensiones pero también pueden aprender de ellas.

Décadas después, cuando se analiza el Mariel con perspectiva histórica, emerge como episodio donde tanto Cuba como Estados Unidos manipularon seres humanos para objetivos políticos, donde las víctimas fueron las familias divididas y las personas atrapadas entre dos sistemas antagónicos. Más allá de propaganda de ambos lados, el Mariel fue tragedia humana de miles de personas forzadas a elegir entre patria y familia, entre solidaridad colectiva y aspiración individual, entre dos modelos de sociedad que no permitían términos medios.`
  },
  {
    id: 10,
    title: "Inicio del Período Especial",
    date: "1990",
    description: "Crisis económica tras el colapso del campo socialista",
    image: "/eventos/revolucion-1990-periodo-especial.jpeg",
    wideImage: "/eventos/wide/revolucion-1990-periodo-especial-wide.jpeg",
    fullStory: `En 1990, con el colapso del campo socialista europeo y el inminente desmoronamiento de la Unión Soviética, Cuba entró en la crisis económica más profunda de su historia revolucionaria. Fidel declaró el inicio del "Período Especial en Tiempo de Paz", un eufemismo que describía condiciones de supervivencia casi comparables a una economía de guerra. Durante esta crisis que se extendería por toda la década de los 90, el PIB cubano cayó un 35%, el consumo eléctrico se redujo drásticamente, el transporte se paralizó, la alimentación se racionó severamente, pero la Revolución sobrevivió contra todos los pronósticos, demostrando una capacidad de resistencia que sorprendió al mundo.

Durante treinta años (1960-1990), la economía cubana había dependido estructuralmente del campo socialista, especialmente de la URSS. La Unión Soviética compraba el azúcar cubano a precios preferenciales muy superiores al mercado mundial, vendía petróleo a Cuba a precios subsidiados, proporcionaba maquinaria, tecnología, alimentos, prácticamente todo lo que Cuba necesitaba. El 85% del comercio exterior cubano era con el campo socialista. Esta relación ventajosa permitió a Cuba desarrollarse a pesar del bloqueo estadounidense.

Pero entre 1989 y 1991, este sistema colapsó. El Muro de Berlín cayó en noviembre de 1989. Los regímenes socialistas de Europa del Este se desmoronaron uno tras otro. En diciembre de 1991, la propia Unión Soviética dejó de existir. De repente, Cuba quedó completamente aislada: sin su principal socio comercial, sin petróleo subsidiado, sin mercado garantizado para su azúcar, enfrentando el bloqueo estadounidense intensificado.

Estados Unidos, creyendo que finalmente Cuba caería sin apoyo soviético, intensificó la agresión. En 1992 aprobó la Ley Torricelli que endurecía el bloqueo prohibiendo a subsidiarias de compañías estadounidenses comerciar con Cuba. En 1996 aprobó la Ley Helms-Burton que penalizaba a empresas extranjeras que invirtieran en propiedades nacionalizadas en Cuba. El objetivo era asfixiar económicamente a la Revolución hasta su colapso.

El impacto en la vida cotidiana de los cubanos fue devastador. Las importaciones se desplomaron un 70%. El petróleo disponible se redujo de 13 millones de toneladas anuales a menos de 6 millones. Sin petróleo, el transporte público prácticamente desapareció. Los apagones duraban 12-16 horas diarias. Las fábricas cerraron por falta de electricidad y materias primas. El desempleo técnico afectó a miles.

La alimentación se redujo drásticamente. La libreta de racionamiento, que garantizaba desde 1962 una canasta básica mínima, ahora solo podía proveer una fracción. Las calorías diarias promedio cayeron de 3,000 a menos de 1,900. Los cubanos perdieron peso masivamente —un promedio de 9 kilos por persona entre 1990 y 1994. Niños y ancianos sufrían desnutrición. Se reportaron casos de polineuropatía epidémica causada por deficiencias nutricionales.

Sin transporte motorizado, Cuba se convirtió en el país de las bicicletas. China donó un millón de bicicletas. Los cubanos aprendieron a pedalear distancias enormes para llegar al trabajo. Se organizaron "camellos", remolques gigantes tirados por tractores que transportaban hasta 300 personas apretadas. Las calles de La Habana, antes llenas de autos, ahora tenían escasos vehículos y multitudes en bicicleta o esperando transporte escaso.

La agricultura urbana se desarrolló por necesidad. Terrenos baldíos en ciudades se convirtieron en huertos donde las familias cultivaban vegetales. Los patios y balcones se llenaron de plantas comestibles. Cuba se convirtió en laboratorio mundial de agricultura orgánica urbana por necesidad: no había fertilizantes ni pesticidas químicos importados.

A pesar de la crisis brutal, la Revolución mantuvo sus principios fundamentales. Ni un solo hospital cerró. Ni una sola escuela cerró. Los maestros y médicos siguieron recibiendo salarios aunque reducidos. La educación y la salud permanecieron gratuitas. Ningún niño quedó sin escuela, ningún enfermo sin atención médica. Esta decisión de mantener los logros sociales a pesar de la crisis fue lo que permitió que la Revolución sobreviviera: el pueblo sufría pero sabía que todos sufrían juntos y que los servicios esenciales se mantenían.

El gobierno implementó medidas de emergencia. En 1993 despenalizó la posesión de dólares, permitiendo que remesas de familiares en el extranjero ayudaran a las familias. En 1994 autorizó el trabajo por cuenta propia en más de 100 oficios, permitiendo que pequeños negocios privados proporcionaran servicios que el Estado no podía. Se abrieron mercados agropecuarios donde campesinos vendían excedentes a precios libres.

El turismo se desarrolló intensivamente como fuente de divisas. Hoteles se construyeron en Varadero y otras playas. Compañías extranjeras invirtieron en joint ventures turísticas. En pocos años, Cuba pasó de prácticamente cero turismo a millones de visitantes anuales. El turismo generó divisas pero también creó desigualdades: quienes trabajaban en turismo ganando propinas en dólares vivían mejor que médicos e ingenieros con salarios en pesos.

Estas desigualdades emergentes desafiaron el igualitarismo revolucionario. Un taxista particular ganaba más que un neurocirujano. Una camarera de hotel recibía más ingresos que un científico. Esta inversión de valores meritocrática generó frustraciones. Profesionales altamente calificados emigraban buscando mejores condiciones. El "robo hormiga" de recursos estatales se generalizó como forma de supervivencia.

En 1994, la crisis alcanzó su punto crítico con la llamada "Crisis de los Balseros". Miles de cubanos desesperados se lanzaron al mar en balsas precarias intentando llegar a Florida. Más de 30,000 fueron rescatados por la Guardia Costera estadounidense y llevados a la base naval de Guantánamo. La imagen de balseros desesperados fue utilizada propagandísticamente, pero también llevó a negociaciones migratorias que regularon los flujos.

Durante todo el Período Especial, los debates internacionales pronosticaban el inminente colapso de Cuba. "Expertos" en Miami hacían maletas esperando regresar. La CIA predecía que el régimen caería en meses. Pero la Revolución resistió. ¿Por qué? Por múltiples factores: el liderazgo de Fidel mantuvo unidad y moral; el pueblo tenía memoria histórica de lo que había ganado con la Revolución y temía lo que perdería si caía; el bloqueo estadounidense generó nacionalismo defensivo; los logros sociales mantenidos incluso en crisis demostraron compromiso gubernamental con el pueblo.

Gradualmente, a partir de mediados de los 90, la economía comenzó lenta recuperación. Las reformas económicas y las inversiones extranjeras generaron crecimiento. Para el año 2000, lo peor había pasado, aunque las condiciones nunca volvieron a ser como antes de 1990. Cuba aprendió a vivir en condiciones de escasez, desarrollando creatividad, ingenio y solidaridad para sobrevivir.

El Período Especial dejó cicatrices profundas en la sociedad cubana. Toda una generación creció en escasez. Muchos jóvenes perdieron fe en el socialismo viendo solo dificultades sin haber vivido los logros previos. La emigración se aceleró, especialmente de jóvenes profesionales. Las desigualdades creadas por el turismo y el dólar nunca se eliminaron completamente.

Pero el Período Especial también demostró algo extraordinario: que Cuba podía sobrevivir completamente aislada, sin su principal sostén económico, enfrentando el bloqueo del imperio más poderoso, y no solo sobrevivir sino mantener sus conquistas sociales fundamentales. Ningún otro país pequeño del Tercer Mundo habría resistido semejante crisis sin colapso social.

La resistencia cubana durante el Período Especial inspiró a movimientos progresistas mundiales. Demostró que había alternativas al neoliberalismo que dominaba el mundo post-Guerra Fría. Demostró que un pueblo unido con liderazgo consecuente podía resistir presiones económicas que parecían insuperables.

Como dijo Fidel en 1993: "Si China, con miles de millones de habitantes, pudo sobrevivir al aislamiento imperialista durante décadas, ¿cómo no va a sobrevivir Cuba con once millones?" Cuba sobrevivió. Y al hacerlo, preservó la posibilidad de que en el siglo XXI nuevos procesos revolucionarios en América Latina —Venezuela, Bolivia, Ecuador— pudieran mirar a Cuba como ejemplo de que la resistencia era posible, que el socialismo no había muerto con la URSS, que David podía todavía desafiar a Goliat.

El Período Especial fue la prueba de fuego definitiva de la Revolución Cubana. La pasó. No sin tremendos costos humanos y sociales, no sin contradicciones y problemas que persisten hasta hoy, pero la pasó. Y al hacerlo, demostró que más allá de teorías económicas y geopolíticas, la clave de la supervivencia fue algo que no se puede cuantificar: la voluntad inquebrantable de un pueblo de defender su dignidad y su soberanía contra viento y marea.`
  }
];

  const contemporaneaEvents = [
  {
    id: 1,
    title: "Agricultura Urbana y Organopónicos",
    date: "1990-1994",
    description: "La Habana se transforma en ciudad agrícola para sobrevivir la crisis",
    image: "/eventos/contemporanea-1990-agricultura-urbana.jpeg",
    wideImage: "/eventos/wide/contemporanea-1990-agricultura-urbana-wide.jpeg",
    fullStory: `En los años más duros del Período Especial, cuando La Habana y toda Cuba enfrentaban una crisis alimentaria sin precedentes, surgió un fenómeno extraordinario que transformaría el paisaje urbano y demostraría la capacidad de adaptación del pueblo cubano: la agricultura urbana. Entre 1990 y 1994, terrenos baldíos, patios, azoteas y cualquier espacio disponible en la capital se convirtieron en huertos y organopónicos donde las familias cultivaban vegetales para sobrevivir. Lo que comenzó como iniciativa desesperada de supervivencia se convirtió en un movimiento nacional organizado que hizo de Cuba líder mundial en agricultura urbana y orgánica.

Cuando colapsó el campo socialista y Cuba perdió el 85% de su comercio exterior, las importaciones de alimentos se desplomaron un 70%. El país que durante décadas había importado gran parte de sus alimentos de repente no tenía cómo alimentar a su población. El hambre se convirtió en realidad cotidiana para millones de cubanos. Las calorías diarias promedio cayeron de 3,000 a menos de 1,900. Los niños y ancianos sufrían desnutrición. Se reportaron casos de polineuropatía epidémica causada por deficiencias nutricionales.

Simultáneamente, la agricultura convencional cubana colapsó. Sin petróleo soviético no había combustible para tractores. Sin importaciones del campo socialista no había fertilizantes químicos, pesticidas ni pienso animal. Los grandes latifundios estatales, diseñados para monocultivo intensivo dependiente de insumos importados, simplemente dejaron de funcionar. La producción agrícola nacional cayó dramáticamente justo cuando más se necesitaba.

En este contexto desesperado, el pueblo cubano respondió con creatividad y determinación extraordinarias. Por indicación del entonces Ministro de las Fuerzas Armadas Revolucionarias, General de Ejército Raúl Castro, se comenzaron a fomentar los organopónicos: unidades intensivas de producción de hortalizas sobre canteros elevados dotados de sustrato orgánico. La idea se basaba en experiencias previas de cultivo hidropónico pero adaptadas a la realidad de escasez cubana utilizando solo recursos locales.

Los organopónicos se construían sobre el suelo usando materiales locales para los contenedores laterales: bloques, ladrillos, madera, planchuelas metálicas, bambú. Se llenaban con mezcla de tierra y materia orgánica—compost, estiércol, residuos de cosechas. No se usaban fertilizantes ni pesticidas químicos sino solo métodos orgánicos: control biológico de plagas, plantas repelentes, rotación de cultivos, compostaje intensivo.

Simultáneamente surgieron los huertos intensivos y la producción en patios y parcelas familiares. Cada familia con un pedazo de tierra, por pequeño que fuera, comenzó a cultivar vegetales. Los balcones de apartamentos se llenaron de macetas con tomates, lechugas, hierbas aromáticas. Las azoteas se convirtieron en jardines. Terrenos baldíos urbanos que habían permanecido improductivos durante décadas de repente florecieron con vegetación comestible.

El movimiento fue espontáneo inicialmente, pero rápidamente la Revolución lo organizó y apoyó. En 1994 se creó la Comisión Nacional de Organopónicos. En 1997 se constituyó el Grupo Nacional de Agricultura Urbana, dirigido por el Dr. Adolfo Rodríguez Nodals del Instituto de Investigaciones Fundamentales en Agricultura Tropical, quien dedicaría su vida a desarrollar y perfeccionar esta modalidad agrícola.

El programa se expandió masivamente. Para 1998 existían 988 hectáreas de organopónicos en Cuba. Para 2005, solo en las provincias orientales el programa había establecido 5,750 hectáreas con modernos sistemas de riego. La Habana producía más de 100,000 toneladas de hortalizas y condimentos frescos anualmente solo de organopónicos, sin contar la producción de parcelas y microhuertos caseros.

Los rendimientos eran impresionantes: hasta 239 toneladas por hectárea anualmente, basados en no menos de 6 rotaciones de siembra, más del 50% de intercalamiento de cultivos, y manejo muy eficiente del sistema productivo. Cada organopónico exigía mínimo 10 especies diferentes durante todo el año para asegurar biodiversidad y nutrición balanceada.

La agricultura urbana generó empleo masivo. Para 2005 laboraban 384,000 personas en el sector. El 21% eran mujeres, el 10% jubilados reincorporados, el 20% jóvenes. Esta modalidad revalorizó a personas de la tercera edad permitiéndoles reintegrarse productivamente a la sociedad.

La transformación de La Habana fue visible y dramática. La ciudad gris y polvorienta del Período Especial se llenó de manchas verdes. Terrenos abandonados donde se acumulaba basura se convirtieron en jardines productivos bellamente mantenidos. Los organopónicos no solo producían alimentos sino embellecían el paisaje urbano. Surgieron en cada barrio: Alamar, con su famoso organopónico que se convirtió en modelo nacional; Cojímar, Marianao, Centro Habana, donde cada comunidad organizó su producción.

La experiencia cubana atrajo atención internacional. Organizaciones como FAO, OXFAM, y expertos de todo el mundo visitaron Cuba para estudiar el modelo. Cuba había creado el sistema más avanzado de agricultura urbana y periurbana del mundo. La agricultura urbana tuvo impacto más allá de la producción de alimentos. Educó a toda una generación urbana sobre agricultura, ecología, sostenibilidad. Fortaleció lazos comunitarios: vecinos trabajaban juntos en organopónicos colectivos. Mejoró nutrición: vegetales frescos diariamente disponibles en cada barrio.

Cuando el Período Especial comenzó a superarse a partir de finales de los 90, la agricultura urbana no desapareció sino que se consolidó. Se había demostrado que era ambientalmente superior, económicamente viable, socialmente beneficiosa. Cuba había convertido una crisis en oportunidad para desarrollar un modelo de agricultura sostenible.

Hoy, décadas después, la agricultura urbana permanece como componente esencial de la seguridad alimentaria cubana y del paisaje de La Habana. Los organopónicos siguen produciendo vegetales frescos orgánicos para las comunidades. Lo que comenzó como respuesta desesperada a una crisis se convirtió en parte permanente de la identidad habanera. La agricultura urbana de Cuba demuestra que las ciudades pueden producir gran parte de sus alimentos localmente de manera sostenible, y que cuando un pueblo se moviliza creativamente para resolver problemas, puede lograr lo que parecía imposible.`
  },
  {
    id: 2,
    title: "Crisis de los Balseros",
    date: "Agosto de 1994",
    description: "Éxodo masivo de cubanos en balsas hacia Estados Unidos",
    image: "/eventos/contemporanea-1994-crisis-balseros.jpeg",
    wideImage: "/eventos/wide/contemporanea-1994-crisis-balseros-wide.jpeg",
    fullStory: `En agosto de 1994, La Habana fue escenario de una de las crisis migratorias más dramáticas de la historia cubana. Miles de personas desesperadas, agobiadas por las penurias del Período Especial, se lanzaron al mar en balsas precarias intentando llegar a Florida. Durante semanas, el Malecón habanero se convirtió en punto de partida de un éxodo masivo que costó cientos de vidas y expuso las profundas tensiones sociales acumuladas durante los años más duros de la crisis económica.

Los antecedentes se remontaban al colapso del campo socialista en 1990. El Período Especial sumió a Cuba en profunda depresión económica. Escaseaban productos básicos, medios de transporte, alumbrado eléctrico. Las calorías diarias se habían reducido drásticamente. El descontento crecía especialmente entre jóvenes que no habían vivido la miseria pre-revolucionaria y solo veían las dificultades presentes.

Entre 1991 y 1994, las salidas ilegales se incrementaron dramáticamente. Estados Unidos recibió 12,808 inmigrantes ilegales cubanos en ese período, mientras solo aceptaba 3,794 solicitudes legales, incentivando deliberadamente la emigración ilegal.

La situación explotó el 5 de agosto de 1994 cuando ocurrieron disturbios en el Malecón habanero. Grupos de personas frustradas por las condiciones económicas se congregaron generando desórdenes públicos. Era la primera manifestación significativa de descontento masivo desde 1959.

Fidel Castro tomó entonces una decisión audaz y controvertida: el 13 de agosto anunció que el gobierno cubano retiraría las restricciones a la emigración ilegal. Quien quisiera irse a Estados Unidos podía hacerlo. Era un desafío directo al presidente Bill Clinton: si Estados Unidos tanto criticaba las restricciones cubanas a la emigración, ahora enfrentaría las consecuencias de una emigración masiva y descontrolada.

La respuesta fue inmediata. Decenas de miles de cubanos comenzaron a construir balsas con cualquier material disponible: neumáticos de camión, troncos, puertas de madera, bidones plásticos, cables de acero. El ingenio cubano, forjado en años de escasez, se aplicó a construir embarcaciones improvisadas destinadas a cruzar las 90 millas del Estrecho de Florida.

El Malecón se convirtió en astillero improvisado. Familias enteras trabajaban febrilmente construyendo sus balsas. Otros compraban pasajes en embarcaciones colectivas. La desesperación era palpable: padres que llevaban a hijos pequeños, ancianos que arriesgaban todo, jóvenes que veían la emigración como única salida.

Las escenas eran desgarradoras. Familias despidiéndose en el Malecón sin saber si volverían a verse. Madres llorando viendo partir a sus hijos en balsas que parecían incapaces de soportar olas del mar abierto. Entre agosto y septiembre se estima que más de 35,000 personas salieron de Cuba en balsas. Cientos murieron ahogados cuando sus balsas naufragaron.

Estados Unidos enfrentaba dilema político. El 19 de agosto de 1994, la administración Clinton dio un viraje de 180 grados. Anunció que se impediría la entrada de balseros cubanos a territorio estadounidense. Rompiendo una norma de 35 años, los balseros rescatados serían internados en campos fuera de territorio estadounidense, especialmente en la base naval de Guantánamo.

Miles fueron llevados a Guantánamo donde se establecieron campos de refugiados improvisados. Las condiciones eran difíciles: calor extremo, hacinamiento, incertidumbre. Muchos permanecieron meses allí esperando ser procesados.

La crisis forzó negociaciones entre Cuba y Estados Unidos. El 9 de septiembre de 1994 se firmaron nuevos acuerdos migratorios. Estados Unidos se comprometió a conceder mínimo 20,000 visas anuales a cubanos. Cuba se responsabilizó de controlar el flujo migratorio ilegal desde sus cosas.

Estos acuerdos establecieron nueva política conocida como "pies secos, pies mojados": cubanos interceptados en el mar serían devueltos a Cuba, mientras quienes lograran tocar tierra estadounidense podrían permanecer. Esta política duraría hasta 2017.

Para Cuba, la Crisis de los Balseros fue dolorosa pero también funcionó como válvula de escape. Muchos descontentos se fueron, reduciendo presiones internas en el momento más crítico del Período Especial. Sin embargo, también expuso fragilidad social: la Revolución no podía satisfacer todas las aspiraciones materiales de todo el pueblo.

La crisis también demostró que la emigración cubana no era fenómeno simple. Los motivos eran complejos: económicos, familiares, personales, políticos. Muchos no eran contrarrevolucionarios ideológicos sino personas buscando mejor vida material.

Para familias cubanas, la Crisis dejó trauma profundo. Miles de familias fueron divididas. La separación familiar, mantenida por décadas de políticas migratorias hostiles de ambos lados, causó sufrimiento incalculable.

Hoy, el Malecón habanero donde ocurrió la crisis es lugar de memoria. Los habaneros que vivieron aquellos días recuerdan con dolor las escenas de balsas partiendo, de familias despidiéndose, de la desesperación colectiva. La Crisis de los Balseros permanece como momento definitorio del Período Especial, símbolo de las contradicciones y tensiones de aquel tiempo extremo cuando miles tomaron la decisión desesperada de arriesgar sus vidas en el mar buscando alternativa que Cuba no podía ofrecerles en ese momento de crisis profunda.`
  },
  {
    id: 3,
    title: "Dolarización de la Economía",
    date: "1993",
    description: "Cuba autoriza el uso del dólar estadounidense como moneda circulante",
    image: "/eventos/contemporanea-1993-dolarizacion.jpeg",
    wideImage: "/eventos/wide/contemporanea-1993-dolarizacion-wide.jpeg",
    fullStory: `En julio de 1993, enfrentando la peor crisis económica de su historia revolucionaria, el gobierno cubano tomó una decisión radical que habría sido impensable años antes: despenalizó la tenencia y uso de dólares estadounidenses por ciudadanos cubanos. Esta medida, parte del paquete de reformas económicas del Período Especial, transformó radicalmente la economía y la sociedad cubana, creando un sistema de dual moneda que duraría más de dos décadas y generaría desigualdades que desafiaron el igualitarismo revolucionario.

Durante más de treinta años después del triunfo revolucionario, el peso cubano había sido la única moneda legal en Cuba. La Revolución había eliminado el dólar como símbolo de la liberación de la dependencia estadounidense. Poseer dólares era ilegal, considerado delito económico grave. Este monopolio monetario formaba parte del sistema económico centralizado que caracterizó al socialismo cubano.

Sin embargo, el colapso del campo socialista y el Período Especial cambiaron todo. La economía cubana se contrajo un 35%. El peso cubano perdió prácticamente todo su valor porque no había casi nada que comprar con pesos. Las tiendas estatales estaban vacías. La libreta de racionamiento solo proveía una fracción de las necesidades básicas.

Simultáneamente, las remesas desde el exterior—principalmente de cubanos en Estados Unidos enviando dinero a familias en Cuba—se convirtieron en línea vital de supervivencia para cientos de miles de familias. Estas remesas llegaban en dólares. Pero como poseer dólares era ilegal, se creó una situación absurda: familias recibían dinero que no podían usar legalmente.

Además, el gobierno necesitaba dólares desesperadamente para importar alimentos, medicinas, combustible. Las remesas representaban fuente potencial de cientos de millones de dólares anuales que podrían ayudar a la economía nacional.

Después de intensos debates internos, en julio de 1993 el gobierno despenalizó la tenencia de divisas. Los cubanos podían legalmente poseer y usar dólares. Se estableció sistema de economía dual con dos circuitos paralelos: uno en pesos cubanos con precios subsidiados pero productos escasos, y otro en dólares con productos abundantes pero precios altos.

Se crearon tiendas especiales en dólares donde se vendían productos importados, electrodomésticos, ropa, alimentos, todo lo que faltaba en tiendas en pesos. En 1994 se estableció oficialmente el Peso Convertible Cubano (CUC), moneda nacional equiparada al dólar estadounidense que circulaba paralelamente al peso cubano ordinario. El tipo de cambio se estableció en aproximadamente 1 CUC = 25 pesos cubanos.

Se crearon Casas de Cambio (CADECA) donde los cubanos podían cambiar pesos por CUC y viceversa a tasas oficiales.

El impacto social fue profundo y contradictorio. Por un lado, permitió supervivencia de cientos de miles de familias. Las remesas del exterior ayudaron a familias a complementar alimentación, comprar medicinas, sobrevivir la crisis. Se estima que remesas alcanzaron cerca de mil millones de dólares anuales en los años 90, flujo vital que complementó el colapso de la economía estatal.

Por otro lado, la dolarización creó desigualdades nunca vistas en la Cuba revolucionaria. Quienes recibían remesas del exterior vivían relativamente bien. Quienes no tenían familiares en el exterior vivían en pobreza extrema dependiendo solo de salarios estatales en pesos.

Se creó nueva estratificación: quienes tenían acceso a dólares vivían mejor que médicos, ingenieros, profesores universitarios con altos salarios en pesos pero sin acceso a dólares. Un taxista particular ganaba más que un neurocirujano. Una camarera de hotel recibía más propinas en una semana que el salario mensual de un científico.

Esta inversión de valores meritocráticos generó frustración profunda entre profesionales altamente calificados. Miles de profesionales emigraron o abandonaron sus profesiones para trabajar en turismo, conducir taxis, o abrir paladares donde ganarían dólares.

El turismo se expandió exponencialmente precisamente para captar dólares. Trabajar en turismo se convirtió en aspiración porque significaba acceso a la economía en dólares. Surgieron fenómenos como jineteras y jineteros buscando acceso a dólares de turistas extranjeros.

La dolarización también incentivó trabajo por cuenta propia y pequeña empresa privada. Se autorizaron paladares, alquiler de habitaciones a turistas, taxis privados. Estos negocios operaban principalmente en dólares y podían ser muy lucrativos.

Sin embargo, el Estado captaba gran parte de los dólares en circulación. Las tiendas en dólares eran estatales, generando ingresos masivos al gobierno. Se establecieron impuestos elevados a cuentapropistas y negocios privados.

La dolarización tuvo beneficios económicos innegables: permitió supervivencia durante la peor fase del Período Especial, generó ingresos en divisas vitales, incentivó remesas. Pero también tuvo costos sociales enormes: desigualdad sin precedentes, frustración de profesionales, emigración de capital humano calificado, surgimiento de estratificación social basada en acceso a dólares no en méritos.

Fidel defendió las medidas como necesarias pero temporales. Argumentó que las reformas económicas eran concesiones tácticas forzadas por circunstancias extremas pero no representaban cambio estratégico del socialismo.

En la práctica, el sistema dual monetario duró más de dos décadas. Recién en 2004 comenzó proceso gradual de des-dolarización. Solo en 2021 se unificó monetariamente eliminando el CUC, aunque las desigualdades económicas generadas durante aquellas décadas persistieron.

La dolarización de los años 90 transformó permanentemente la economía y sociedad cubanas. Demostró pragmatismo de la Revolución para adaptar modelos económicos a realidades cambiantes, incluso cuando implicaba comprometer ideales igualitarios. Demostró capacidad de supervivencia en condiciones extremas. Pero también demostró que las decisiones económicas tienen consecuencias sociales profundas que perduran mucho después de terminada la crisis que las motivó.

La experiencia quedó grabada en la memoria colectiva cubana como símbolo del Período Especial: el tiempo cuando la necesidad obligó a sacrificar ideales, cuando la supervivencia exigió pragmatismo, cuando Cuba descubrió que podía adoptar mecanismos capitalistas sin dejar de ser socialista, pero también cuando aprendió dolorosamente que toda decisión económica tiene precio social que alguien debe pagar.`
  },
  {
    id: 4,
    title: "Restauración del Centro Histórico de La Habana",
    date: "1990s-2000s",
    description: "La Oficina del Historiador salva el patrimonio colonial habanero",
    image: "/eventos/contemporanea-1990-restauracion-habana-vieja.jpeg",
    wideImage: "/eventos/wide/contemporanea-1990-restauracion-habana-vieja-wide.jpeg",
    fullStory: `Durante las décadas de los 90 y 2000, mientras Cuba enfrentaba la peor crisis económica de su historia, una empresa heroica se desarrollaba en las calles empedradas del Centro Histórico de La Habana: la restauración y rescate del patrimonio arquitectónico colonial más importante del Caribe. Bajo el liderazgo visionario del Dr. Eusebio Leal Spengler, Historiador de la Ciudad, la Habana Vieja—declarada Patrimonio de la Humanidad por UNESCO en 1982—fue salvada del colapso total y transformada en joya restaurada que hoy atrae millones de turistas, generando recursos para la restauración continua y beneficios sociales para sus habitantes.

La Habana Vieja, el núcleo fundacional de la ciudad establecido en 1519, contenía el conjunto arquitectónico colonial más importante de América: palacios barrocos, iglesias coloniales, fortalezas militares, plazas monumentales, casas señoriales, toda la memoria física de cuatro siglos de historia. Sin embargo, para finales de los años 80, este tesoro patrimonial estaba en peligro mortal.

Décadas de abandono y falta de mantenimiento habían deteriorado gravemente las estructuras. La Habana Vieja era barrio pobre y densamente poblado donde vivían más de 60,000 personas en condiciones precarias. Las casonas coloniales construidas para una familia ahora albergaban decenas de familias hacinadas. Los sistemas de plomería y electricidad eran precarios. Las fachadas se caían literalmente a pedazos.

El Período Especial empeoró dramáticamente la situación. Sin recursos, sin materiales de construcción, el deterioro se aceleró. Edificios centenarios colapsaban matando a habitantes. Las lluvias tropicales penetraban techos destruidos arruinando interiores. Cada día se perdían elementos arquitectónicos únicos e irreemplazables.

En 1982, UNESCO había declarado la Habana Vieja y su sistema de fortificaciones Patrimonio de la Humanidad, reconociendo su valor universal excepcional. Pero UNESCO no tenía recursos para salvar el patrimonio. La responsabilidad recaía en Cuba, que justamente en los años 90 no tenía recursos para nada.

El Dr. Eusebio Leal Spengler, nombrado Historiador de la Ciudad en 1967, había dedicado su vida a estudiar, documentar y defender el patrimonio habanero. Hombre de cultura excepcional, orador brillante, gestor incansable, Leal comprendió que sin acción inmediata, el Centro Histórico desaparecería. Convenció a Fidel Castro de la urgencia y de su visión: usar el turismo cultural como motor económico que financiara la restauración.

En 1993, mediante Decreto-Ley 143, se otorgó a la Oficina del Historiador autonomía financiera sin precedentes. La Oficina podía captar recursos de múltiples fuentes: turismo, inversión extranjera, cooperación internacional, y reinvertir esos recursos directamente en restauración sin pasar por el presupuesto estatal central. Era modelo único de autofinanciamiento dentro de la economía socialista cubana.

Leal y su equipo desarrollaron estrategia integral: identificar edificios en peor estado y priorizarlos, buscar inversionistas extranjeros interesados en desarrollar hoteles boutique en palacios restaurados, restaurar monumentos emblemáticos para atraer turismo, y crucialmente, mantener a la población residente integrándola en el proceso de renovación.

El trabajo de restauración era monumental. Cada edificio requería estudios históricos exhaustivos, arqueología arquitectónica, ingeniería estructural, artesanía especializada. Se necesitaban canteros, albañiles, carpinteros, herreros, vidrieros, pintores, todos con técnicas tradicionales casi olvidadas.

La Oficina creó escuelas técnicas donde se formaron generaciones de artesanos en oficios tradicionales. Jóvenes cubanos aprendieron a tallar piedra, forjar hierro ornamental, hacer vitrales emplomados, aplicar frescos murales. Se rescataron conocimientos que habían desaparecido.

Se priorizó restauración de las grandes plazas históricas. La Plaza de Armas fue completamente renovada: el Palacio de los Capitanes Generales, el Palacio del Segundo Cabo, el Castillo de la Real Fuerza. La Plaza de la Catedral recuperó su esplendor barroco. La Plaza Vieja, que había sido estacionamiento de autos, fue rescatada. La Plaza de San Francisco recuperó su dignidad colonial.

Los grandes monumentos religiosos fueron restaurados: la Catedral de La Habana, la Iglesia de San Francisco, el Convento de Santa Clara. Palacios nobiliarios se convirtieron en museos. Fortalezas militares fueron consolidadas.

Simultáneamente se desarrolló infraestructura turística. Palacios restaurados se convirtieron en hoteles boutique de lujo: Hotel Santa Isabel, Hotel Conde de Villanueva, Hotel Raquel. Restaurantes en casonas coloniales. Museos en palacios. Todo generando ingresos que se reinvertían en más restauración.

La estrategia económica fue exitosa. Para los 2000s, la Habana Vieja se había convertido en principal atracción turística de Cuba. Millones de visitantes caminaban por sus calles empedradas, visitaban sus museos, compraban en sus tiendas de artesanía. Los ingresos financiaban restauración de más edificios en ciclo virtuoso.

Pero Leal insistió que la restauración no podía ser solo para turistas. La población residente debía beneficiarse. Se construyeron o rehabilitaron viviendas para familias. Se crearon escuelas, guarderías, farmacias, consultorios médicos. Se establecieron programas sociales para ancianos y discapacitados. Se priorizó empleo de residentes.

Se desarrolló concepto único: "rehabilitación integral" que combinaba restauración arquitectónica con desarrollo social. No se trataba solo de salvar piedras sino de mejorar vidas. Era socialismo aplicado a patrimonio: usar recursos del turismo para beneficio social de la comunidad.

La transformación fue dramática. Calles que en los 90 eran ruinas, para los 2000s brillaban con fachadas restauradas pintadas en colores coloniales. Plazas llenas de escombros se convirtieron en espacios públicos vibrantes. El barrio que parecía condenado renació como joya urbana.

La comunidad internacional reconoció el logro. Premios de UNESCO, de ICOMOS, de organizaciones patrimoniales mundiales. Leal recibió condecoraciones de múltiples países. La Habana Vieja se convirtió en caso de estudio para otras ciudades históricas.

Gobiernos y organizaciones extranjeras apoyaron con cooperación. España, particularmente, mediante la Agencia Española de Cooperación Internacional, financió múltiples proyectos. Francia, Italia, Bélgica, UNESCO, todos contribuyeron. Pero el grueso del financiamiento vino de los propios ingresos del turismo.

Cuando el Dr. Eusebio Leal falleció en julio de 2020, Cuba perdió uno de sus intelectuales más brillantes y apasionados defensores del patrimonio. Pero su legado permanece visible en cada calle empedrada, cada palacio restaurado, cada plaza renovada de la Habana Vieja. Salvó para la humanidad un tesoro arquitectónico que parecía perdido.

La restauración del Centro Histórico demuestra que incluso en medio de crisis económica devastadora, cuando un pueblo valora su patrimonio y encuentra liderazgo visionario, puede lograr lo que parece imposible: rescatar del colapso siglos de historia materializada en piedra, madera y cal, y hacerlo de manera que beneficie no solo a turistas sino a la comunidad que vive entre esos monumentos.

Hoy, caminar por la Habana Vieja es caminar por historia viva. Las mismas calles donde Diego Velázquez fundó la villa en 1519, donde caminaron gobernadores coloniales, donde se tramaron conspiraciones independentistas. Todo preservado, restaurado, vibrante. Monumento no solo al pasado sino al esfuerzo presente de quienes, contra viento y marea, salvaron ese pasado para el futuro.`
  }
,
  {
    id: 5,
    title: "Trabajo por Cuenta Propia y Cuentapropistas",
    date: "1993-2010s",
    description: "Auge del sector privado dentro del socialismo cubano",
    image: "/eventos/contemporanea-1990-cuentapropistas.jpeg",
    wideImage: "/eventos/wide/contemporanea-1990-cuentapropistas-wide.jpeg",
    fullStory: `En 1993, en medio de la crisis más profunda del Período Especial, el gobierno cubano autorizó el trabajo por cuenta propia en más de 100 oficios, abriendo espacio para que ciudadanos establecieran pequeños negocios privados por primera vez desde los años 60. Esta medida, parte de las reformas económicas de supervivencia, transformaría gradualmente la economía cubana, creando sector privado dinámico de cuentapropistas que para los 2010s emplearía a cientos de miles de personas y generaría servicios esenciales que el Estado no podía proveer. El surgimiento de los cuentapropistas representó uno de los cambios económicos y sociales más significativos de la Cuba contemporánea.

Durante más de treinta años después de la Ofensiva Revolucionaria de 1968, prácticamente todo en Cuba era estatal. No existían negocios privados. Todos trabajaban para el Estado: en empresas estatales, cooperativas, o instituciones públicas. El Estado proveía empleo, salario, servicios. Era sistema de empleo pleno pero también de monopolio estatal absoluto sobre economía.

El colapso del campo socialista y el Período Especial destruyeron este modelo. La economía estatal se contrajo dramáticamente. No había recursos para mantener fábricas operando, para proveer todos los servicios que antes se proveían, para emplear a todos como antes. Simultáneamente, la población necesitaba servicios que el Estado ya no podía ofrecer: reparación de electrodomésticos, zapatos, ropa; transporte; alimentos preparados; múltiples servicios cotidianos.

Surgió sector informal masivo. Personas sin empleo o subempleadas comenzaron a vender productos caseros, reparar cosas, ofrecer servicios de forma ilegal. El "invento"—resolver problemas de manera creativa y a veces al margen de la ley—se generalizó. Existía economía paralela informal que operaba en sombras.

El gobierno comprendió que era mejor legalizar y regular esta actividad económica que dejarla en la ilegalidad. En septiembre de 1993, mediante Decreto-Ley 141, se autorizó el trabajo por cuenta propia en un listado inicial de más de 100 actividades. Los cubanos podían legalmente establecer pequeños negocios privados pagando impuestos y cumpliendo regulaciones.

Las actividades autorizadas incluían: servicios de reparación, transporte privado con taxis, gastronomía con vendedores de alimentos y paladares, servicios personales como peluquería y manicure, artesanía, servicios domésticos, y muchas otras. No se autorizaban actividades profesionales como medicina o abogacía privadas, que permanecían monopolio estatal.

Los requisitos eran relativamente simples: solicitar licencia, pagar cuota mensual de impuestos que variaba según actividad, cumplir regulaciones específicas de cada actividad. Las cuotas fiscales eran fijas independientemente de ingresos reales, sistema tributario simple pero que podía ser regresivo.

La respuesta popular fue masiva. Miles de cubanos solicitaron licencias. Para finales de 1993, había más de 100,000 cuentapropistas registrados. Para finales de los 90, más de 150,000. Para los 2010s, después de ampliaciones sucesivas del listado de actividades autorizadas, el número superaba los 500,000.

Surgieron los paladares, nombre tomado de telenovela brasileña. Eran restaurantes familiares operados en casas privadas. Inicialmente limitados a 12 sillas, los paladares ofrecían comida cubana casera de calidad muy superior a restaurantes estatales. Se convirtieron en atracción turística y favoritos de cubanos con acceso a divisas.

Los taxis privados proliferaron. Los famosos autos americanos clásicos de los años 50, mantenidos con ingenio cubano durante décadas, se convirtieron en taxis particulares operados por cuentapropistas. Complementaron transporte público estatal que era insuficiente. Para turistas, pasear en Chevrolet o Buick del 57 se convirtió en experiencia emblemática de Cuba.

El alquiler de habitaciones a turistas—casas particulares—se convirtió en sector enorme. Familias habilitaban habitaciones en sus casas para hospedar turistas, ofreciendo alternativa económica y auténtica a hoteles estatales. Para los 2010s, decenas de miles de casas particulares operaban en toda Cuba. Plataformas internacionales como Airbnb eventualmente incluirían Cuba.

Los servicios de reparación florecieron. En país donde escaseaban repuestos y productos nuevos, reparar lo existente era esencial. Zapateros, electricistas, plomeros, mecánicos, todos operando como cuentapropistas, proveían servicios vitales que el sistema estatal no podía ofrecer adecuadamente.

La artesanía se desarrolló masivamente. Mercados artesanales en Habana Vieja, Trinidad, y otros destinos turísticos vendían productos hechos a mano: joyas, esculturas de madera, cuadros, artículos de cuero. Generaban ingresos significativos de turismo internacional.

Los cuentapropistas exitosos podían ganar múltiplos del salario estatal promedio. Un paladar próspero en ubicación turística generaba ingresos mensuales que superaban ampliamente el salario de médico o ingeniero. Un taxista con auto clásico bien mantenido ganaba más que profesor universitario. Esto recreó las inversiones de valores meritocráticos que la dolarización había iniciado.

Esta desigualdad generó tensiones sociales profundas. Profesionales altamente calificados con salarios estatales modestos veían cómo personas con menos educación pero negocios exitosos vivían mejor. Miles abandonaron profesiones estatales para convertirse en cuentapropistas. Médicos, ingenieros, maestros dejaban sus profesiones para abrir paladares, conducir taxis, alquilar habitaciones.

El Estado respondió con regulaciones a veces contradictorias. Por un lado, reconocía necesidad del sector privado para economía. Por otro, temía que creciera demasiado amenazando control estatal. Hubo períodos de regulaciones restrictivas seguidos de liberalizaciones. En 2010, bajo presidencia de Raúl Castro, se ampliaron significativamente las actividades autorizadas y se flexibilizaron regulaciones.

Para mediados de los 2010s, el sector cuentapropista era componente vital de economía cubana. Generaba empleo para cientos de miles. Proveía servicios esenciales. Pagaba impuestos significativos al Estado. Pero también planteaba preguntas ideológicas: ¿Cómo conciliar sector privado creciente con socialismo? ¿Cómo evitar que acumulación de riqueza privada recreara clases sociales?

Los debates eran intensos. Sectores ortodoxos del Partido argumentaban que trabajo por cuenta propia era concesión táctica temporal que debía limitarse. Sectores reformistas argumentaban que pequeña empresa privada era compatible con socialismo y debía promoverse. Los propios cuentapropistas navegaban posición ambigua: legales pero a veces vistos con desconfianza, empresarios en sistema oficialmente socialista.

La experiencia de los cuentapropistas demostró varias cosas. Primera, que existe energía empresarial considerable en población cubana cuando se le permite expresarse. Segunda, que pequeña empresa privada puede coexistir con socialismo si se regula adecuadamente. Tercera, que Estado no puede ni debe monopolizar toda actividad económica. Cuarta, que balance entre sector estatal y privado es desafío constante que requiere ajustes continuos.

El impacto social fue complejo. Positivamente, el trabajo por cuenta propia generó empleo, ingresos, servicios necesarios. Negativamente, recreó desigualdades económicas y sociales. Surgió nueva clase de "empresarios" con estilos de vida muy superiores a ciudadano promedio. Algunos cuentapropistas exitosos compraban autos, renovaban casas lujosamente, viajaban al exterior, vivían de manera que recordaba a burguesía pre-revolucionaria.

Sin embargo, diferencias importantes existían con capitalismo clásico. Los cuentapropistas no eran gran burguesía: eran pequeños empresarios con negocios familiares. No podían emplear más que número limitado de trabajadores. No podían acumular capital a gran escala. El Estado mantenía control sobre sectores estratégicos de economía. Era "socialismo con pequeña empresa privada", modelo único que Cuba desarrolló pragmáticamente.

Para los 2020s, después de más de veinticinco años de trabajo por cuenta propia, el sector estaba consolidado como parte permanente del panorama económico cubano. Las reformas de 2021, eliminando lista de actividades prohibidas y estableciendo que todas las actividades eran permitidas excepto lista corta de prohibidas, marcaron liberalización adicional.

Los cuentapropistas representan uno de los fenómenos sociales más interesantes de Cuba contemporánea: son producto de necesidad económica pero también de flexibilidad ideológica; son capitalistas pequeños en sistema socialista; son simultáneamente celebrados como emprendedores dinámicos y vistos con recelo como potencial amenaza al igualitarismo; pagan impuestos al Estado socialista pero operan según lógica de mercado.

El surgimiento del trabajo por cuenta propia demuestra que el socialismo cubano no es sistema rígido e inmutable sino que puede adaptarse a realidades cambiantes. Demuestra que entre capitalismo puro y socialismo puro existen múltiples formas híbridas posibles. Y demuestra que cuando crisis económica es suficientemente profunda, consideraciones pragmáticas de supervivencia prevalecen sobre pureza ideológica.

La experiencia cubana con cuentapropistas ofrece lecciones para otros países: que pequeña empresa privada puede complementar economía socialista; que empleo por cuenta propia alivia presiones sobre empleo estatal; que regulación inteligente puede canalizar energía empresarial hacia beneficio social; pero también que debe vigilarse constantemente para evitar que reproduzca desigualdades extremas incompatibles con justicia social.`
  },
  {
    id: 6,
    title: "ALBA y Alianza con Venezuela",
    date: "2004",
    description: "Cuba y Venezuela fundan la Alternativa Bolivariana para los Pueblos de Nuestra América",
    image: "/eventos/contemporanea-2004-alba-venezuela.jpeg",
    wideImage: "/eventos/wide/contemporanea-2004-alba-venezuela-wide.jpeg",
    fullStory: `El 14 de diciembre de 2004, en La Habana, los presidentes Fidel Castro de Cuba y Hugo Chávez de Venezuela firmaron la declaración fundacional de la Alternativa Bolivariana para los Pueblos de Nuestra América (ALBA), alianza estratégica que transformaría la geopolítica latinoamericana y sacaría a Cuba del aislamiento del Período Especial. La relación Cuba-Venezuela, basada en solidaridad bolivariana donde Cuba aportaba capital humano—médicos, maestros, entrenadores—y Venezuela recursos energéticos y financieros, permitió a Cuba superar definitivamente la crisis de los 90 y demostró viabilidad de integración latinoamericana basada en complementariedad y solidaridad en lugar de competencia capitalista.

Los orígenes de ALBA se remontan al encuentro entre Fidel Castro y Hugo Chávez en diciembre de 1994, cuando Chávez visitó Cuba por primera vez después de salir de prisión tras su fallido golpe de 1992. Aquel encuentro entre el líder revolucionario histórico y el joven oficial bolivariano rebelde inició amistad política que cambiaría América Latina. Fidel vio en Chávez potencial para renovar proyecto de liberación latinoamericana que Bolívar había soñado. Chávez vio en Fidel mentor y ejemplo de resistencia ante imperialismo.

Cuando Chávez ganó las elecciones venezolanas en 1998 e inició la Revolución Bolivariana, Cuba fue uno de primeros países en apoyar el proceso. Las relaciones se profundizaron rápidamente. En octubre de 2000, Cuba y Venezuela firmaron el Convenio Integral de Cooperación que establecía intercambio: Cuba enviaba médicos, maestros, entrenadores deportivos, técnicos; Venezuela proveía petróleo a Cuba a precios preferenciales.

Este convenio fue transformador para ambos países. Cuba, que desde colapso soviético sufría escasez crónica de petróleo, de repente tenía acceso garantizado a hidrocarburos venezolanos a condiciones ventajosas. Venezuela recibió decenas de miles de colaboradores cubanos altamente calificados que implementaron programas sociales masivos beneficiando a millones de venezolanos pobres.

La Misión Barrio Adentro, iniciada en 2003, llevó médicos cubanos a barrios marginales venezolanos donde nunca había habido servicios de salud. Miles de médicos cubanos vivían en las mismas comunidades pobres que atendían, trabajando 24/7 sin distinción de clase o capacidad de pago. Para millones de venezolanos pobres fue primera vez en sus vidas que accedían a atención médica profesional. La gratitud popular hacia médicos cubanos fue inmensa y consolidó apoyo a Chávez entre sectores populares.

La Misión Robinson, programa de alfabetización basado en método cubano "Yo sí puedo", alfabetizó a más de 1.5 millones de venezolanos adultos. En 2005, Venezuela se declaró Territorio Libre de Analfabetismo, replicando hazaña cubana de 1961. Otras misiones educativas llevaron educación secundaria y universitaria a millones excluidos del sistema educativo tradicional.

Para Cuba, el petróleo venezolano fue salvación económica. De recibir menos de 6 millones de toneladas anuales en los peores años del Período Especial, para mediados de los 2000s Cuba recibía más de 10 millones de toneladas anuales de Venezuela. Esto permitió reactivar economía, restablecer transporte público, generar electricidad consistentemente, reiniciar industrias paralizadas.

Además del petróleo, Venezuela proporcionó financiamiento para proyectos de desarrollo cubanos, inversión en infraestructura, créditos favorables. Se estima que la cooperación venezolana representó varios miles de millones de dólares anuales para Cuba, monto mayor que toda la ayuda soviética en los últimos años de la URSS.

El ALBA, fundado formalmente en 2004, expandió esta cooperación bilateral a escala regional. La propuesta era crear alternativa al ALCA (Área de Libre Comercio de las Américas), proyecto neoliberal impulsado por Estados Unidos que buscaba extender libre comercio a toda América Latina bajo términos favorables a corporaciones estadounidenses.

El ALBA proponía integración basada en principios radicalmente diferentes: solidaridad versus competencia, complementariedad versus explotación, cooperación versus dominación. Los países miembros compartirían recursos según capacidades y necesidades, no según lógica de ganancia capitalista. La salud, educación, cultura serían derechos garantizados cooperativamente, no mercancías.

Bolivia se unió al ALBA en 2006 cuando Evo Morales, líder indígena socialista, asumió presidencia. Nicaragua se unió cuando Daniel Ortega regresó al poder en 2007. Ecuador bajo Rafael Correa se unió en 2009. Posteriormente se agregaron varios países caribeños. Para su momento de mayor expansión, ALBA incluía cerca de 80 millones de personas.

El ALBA implementó proyectos concretos de integración. Petrocaribe, iniciativa venezolana que proveía petróleo a condiciones preferenciales a países caribeños. TeleSUR, canal de televisión multilateral que ofrecía perspectiva latinoamericana frente a hegemonía mediática occidental. Banco del ALBA para financiar proyectos de desarrollo. Sistema Unitario de Compensación Regional (SUCRE) como moneda virtual para comercio intra-ALBA evitando uso del dólar.

La relación Cuba-Venezuela dentro de ALBA fue especialmente profunda. Chávez y Fidel desarrollaron amistad personal extraordinaria. Chávez visitaba Cuba frecuentemente, a veces anunciando llegada solo horas antes. Pasaba días conversando con Fidel sobre teoría revolucionaria, estrategia política, historia latinoamericana. Cuando Chávez enfermó de cáncer, recibió tratamiento en Cuba, atendido por médicos cubanos en quienes confiaba absolutamente.

Para Cuba, la alianza con Venezuela representó renacimiento después de década de Período Especial. La economía cubana creció sostenidamente durante los 2000s con tasas de crecimiento del 5-7% anual. Se invirtió en infraestructura que había colapsado en los 90. Se importaron productos que habían escaseado. El nivel de vida mejoró notablemente comparado con lo peor de los 90.

Pero la relación también creó nueva dependencia. Cuba había sustituido dependencia soviética por dependencia venezolana. Cuando Venezuela entró en crisis profunda a partir de 2013—agravada después de muerte de Chávez en marzo de 2013 y colapso de precios petroleros en 2014—Cuba sintió inmediatamente el impacto. Las entregas petroleras venezolanas cayeron dramáticamente, forzando a Cuba nuevamente a racionar electricidad y combustible.

Críticos argumentaron que Cuba había cometido error estratégico atándose tan estrechamente a economía petrolera volátil. Defensores respondieron que sin Venezuela, Cuba no habría sobrevivido los 90 y que solidaridad latinoamericana requería asumir riesgos compartidos.

El ALBA enfrentó críticas desde múltiples ángulos. La derecha latinoamericana y Estados Unidos lo denunciaban como eje anti-democrático liderado por dictadores. La izquierda ortodoxa criticaba que ALBA mantenía capitalismo en países miembros en lugar de avanzar hacia socialismo genuino.

Cuando líderes fundadores salieron de escena—Fidel por edad y enfermedad, Chávez por muerte, Evo derrocado por golpe en 2019—el ALBA perdió dinamismo. Sin Chávez como motor y Venezuela colapsando económicamente, la alianza entró en crisis. Algunos miembros se distanciaron. Proyectos conjuntos languidecieron.

Sin embargo, el legado del ALBA y la relación Cuba-Venezuela permanece significativo. Demostró que integración latinoamericana era posible sin tutela estadounidense. Demostró que cooperación solidaria podía generar beneficios mutuos. Los millones de venezolanos atendidos por médicos cubanos no olvidarán la solidaridad internacionalista cubana.

El ALBA también reposicionó a Cuba en América Latina. Del relativo aislamiento de los 90, Cuba pasó a ser protagonista de proyecto regional ambicioso. La legitimidad internacional de Cuba se fortaleció. Se normalizaron relaciones con múltiples países latinoamericanos.

Para La Habana específicamente, la alianza con Venezuela se manifestó en múltiples formas visibles. Inversión venezolana ayudó a restaurar infraestructura urbana. Delegaciones venezolanas visitaban frecuentemente. Intercambios culturales se multiplicaron. El discurso político enfatizaba hermandad Cuba-Venezuela, "unidos por Martí, Bolívar, el Che y Chávez".

La fundación del ALBA en 2004 marca punto de inflexión en historia contemporánea cubana: el fin definitivo del Período Especial y el inicio de nueva era de relativa prosperidad basada en solidaridad latinoamericana. Aunque esa prosperidad resultaría frágil y dependiente de estabilidad venezolana, representó años de respiro después de década traumática de los 90.

El ALBA fue, en su momento, faro de esperanza para progresistas latinoamericanos que soñaban con continente unido, justo y soberano. Ese sueño, heredero de Bolívar y Martí, renovado por Fidel y Chávez, continúa inspirando a quienes buscan alternativas al capitalismo neoliberal y al imperialismo, recordándonos que la historia no ha terminado y que los pueblos pueden construir su propio destino cuando se unen con determinación y solidaridad.`
  },
  {
    id: 7,
    title: "Boom Turístico de Varadero",
    date: "1990s-2000s",
    description: "La playa más famosa de Cuba se convierte en destino turístico internacional",
    image: "/eventos/contemporanea-1990-boom-turistico-varadero.jpeg",
    wideImage: "/eventos/wide/contemporanea-1990-boom-turistico-varadero-wide.jpeg",
    fullStory: `Durante los años 90 y 2000s, Varadero, la península de 20 kilómetros de playas de arena blanca y aguas turquesas en la costa norte de Matanzas, experimentó una transformación espectacular convirtiéndose en uno de los destinos turísticos más importantes del Caribe. De ser balneario modesto visitado principalmente por cubanos, Varadero se convirtió en zona hotelera de clase mundial con decenas de resorts de lujo operados por cadenas internacionales que atraían millones de turistas anuales, generando divisas cruciales que permitieron a Cuba sobrevivir el Período Especial y establecer el turismo como pilar fundamental de la economía nacional.

Varadero tiene historia larga como destino turístico. Ya en los años 30 y 40, durante la República, familias adineradas construyeron mansiones playeras allí. El millonario Irénée du Pont de Nemours construyó su mansión "Xanadu", hoy convertida en restaurante y campo de golf. Después de la Revolución, Varadero fue nacionalizado y se convirtió en centro vacacional para trabajadores cubanos, con hoteles modestos y precios subsidiados accesibles a la población.

Pero cuando colapsó el campo socialista y Cuba entró en el Período Especial, el gobierno comprendió que el turismo internacional era una de las pocas fuentes viables de divisas. Cuba tenía ventajas naturales evidentes: clima tropical, playas espectaculares, cultura rica, pueblo acogedor, ubicación cercana a mercados emisores norteamericanos y europeos, y seguridad excepcional comparada con otros destinos caribeños. Varadero, con sus 20 kilómetros ininterrumpidos de playa virgen, era joya esperando ser desarrollada.

En 1989 Cuba recibía apenas 340,000 turistas internacionales anuales. La infraestructura turística era limitada y obsoleta. Pero Cuba tomó decisión estratégica: desarrollar turismo masivamente, priorizando Varadero como producto estrella. Se elaboró plan maestro para convertir la península en zona hotelera de alto estándar que compitiera con Cancún y otros destinos caribeños consolidados.

La estrategia requería inversión extranjera masiva que Cuba no tenía. Se aprobó ley de inversión extranjera permitiendo joint ventures entre Estado cubano y cadenas hoteleras internacionales. Las empresas extranjeras aportaban capital, experiencia de gestión, marca internacional, acceso a mercados emisores. Cuba aportaba la tierra, mano de obra calificada, seguridad, y capturaba porcentaje significativo de ingresos.

Cadenas hoteleras españolas fueron pioneras. Meliá, Sol, Barceló, Iberostar, todas establecieron resorts en Varadero durante los 90. Posteriormente llegaron cadenas canadienses, francesas, italianas, alemanas. Para los 2000s, Varadero contaba con más de 50 hoteles de 3, 4 y 5 estrellas con capacidad para decenas de miles de turistas simultáneamente.

La construcción fue intensiva. Durante los 90 y 2000s, Varadero era gigantesco sitio de construcción. Se levantaron complejos hoteleros enormes tipo "todo incluido": edificios de múltiples pisos con cientos de habitaciones, múltiples restaurantes temáticos, piscinas, spas, gimnasios, instalaciones deportivas, entretenimiento nocturno. Todo diseñado para que turistas no necesitaran salir del resort.

La infraestructura de soporte también se desarrolló. Se amplió el aeropuerto internacional Juan Gualberto Gómez para recibir vuelos chárter directos de Canadá, Europa, América Latina. Se mejoró la autopista Habana-Varadero. Se construyeron plantas potabilizadoras y depuradoras para manejar demanda hídrica de decenas de hoteles.

El impacto ambiental fue preocupación constante. Varadero es ecosistema frágil: playas, dunas, manglares, arrecifes coralinos. El desarrollo turístico intensivo amenazaba este equilibrio. Cuba implementó regulaciones ambientales, prohibió construcción en primera línea de playa, exigió estudios de impacto ambiental, estableció límites de altura para edificios.

Los resultados económicos fueron espectaculares. Para finales de los 90, Varadero recibía más de un millón de turistas anuales. Para los 2000s, más de dos millones. Varadero solo generaba más de un tercio del turismo internacional total de Cuba. Los ingresos en divisas se contaban en miles de millones de dólares acumulados, recursos vitales para economía nacional.

Los turistas venían principalmente de Canadá—mercado emisor número uno—seguido por europeos (españoles, italianos, franceses, alemanes, británicos) y latinoamericanos (especialmente argentinos y mexicanos). Los estadounidenses, debido al bloqueo, no podían viajar legalmente a Cuba, privando a Varadero del mercado potencial más grande a solo 90 millas.

La experiencia Varadero era de sol y playa de alta calidad a precios competitivos. El modelo "todo incluido" era especialmente atractivo: un precio fijo cubría hospedaje, todas las comidas, bebidas alcohólicas ilimitadas, entretenimiento, actividades acuáticas. Para familias europeas o canadienses, era vacación caribeña accesible. La calidad del servicio era consistentemente alta gracias a personal cubano bien entrenado, multilingüe, amable.

Varadero ofrecía también experiencias más allá de la playa. Excursiones a La Habana (2 horas en bus), a Cienfuegos y Trinidad (patrimonio UNESCO), a cuevas y cenotes naturales, buceo en arrecifes coralinos, pesca deportiva, golf en Xanadú. Los turistas podían combinar playa con cultura, naturaleza con historia.

El impacto social en la región de Matanzas fue significativo. El turismo generó decenas de miles de empleos directos e indirectos: camareros, cocineros, recepcionistas, mucamas, animadores, guías, choferes, jardineros, constructores, proveedores de alimentos y servicios. Los salarios en turismo, especialmente considerando propinas en divisas, eran muy superiores al promedio nacional.

Esto creó desigualdades. Trabajadores del turismo vivían mejor que médicos o maestros. Surgió migración interna hacia Varadero de cubanos de otras provincias buscando empleos turísticos. La península que antes era tranquila comunidad playera se transformó en zona hiperdesarrollada con población flotante masiva.

También surgieron problemas sociales asociados con turismo masivo. La prostitución turística apareció a pesar de esfuerzos gubernamentales por controlarla. Algunos cubanos veían en turistas extranjeros oportunidad para conseguir divisas, regalos, o incluso vías de emigración mediante matrimonios convenidos.

El modelo "todo incluido" de resort cerrado tenía ventajas y desventajas. Económicamente era eficiente: capturaba gasto turístico completamente, facilitaba gestión, estandarizaba calidad. Pero también aislaba turistas de Cuba real. Muchos visitantes pasaban semana en Varadero sin interactuar significativamente con cubanos fuera del personal de hotel, sin conocer cultura cubana profundamente. Era "burbuja turística" que generaba divisas pero conexión cultural limitada.

El éxito de Varadero estimuló desarrollo de otros polos turísticos: Cayo Coco, Cayo Guillermo, Cayo Santa María en el norte de la isla central; Guardalavaca en Holguín; Playa Santa Lucía en Camagüey. Cada uno replicaba modelo Varadero de resorts todo incluido en cayos prístinos.

El turismo, con Varadero como buque insignia, transformó economía cubana. De sector marginal antes de los 90, se convirtió en principal fuente de divisas, superando incluso al azúcar, tradicionalmente columna vertebral económica cubana. Esta transformación tuvo consecuencias profundas: Cuba dependía ahora de turismo como antes dependía de azúcar, creando nueva vulnerabilidad a choques externos.

La COVID-19 en 2020-2021 demostró esta vulnerabilidad dramáticamente. Cuando el turismo internacional colapsó, Varadero quedó desierto. Hoteles cerrados, playas vacías, trabajadores sin empleo. La economía cubana sufrió contracción severa. Evidenció necesidad de diversificar economía, no depender excesivamente de sector único.

Sin embargo, el boom turístico de Varadero en los 90-2000s fue innegablemente exitoso en sus propios términos. Transformó Varadero de balneario modesto en destino internacional reconocido. Generó ingresos que permitieron a Cuba sobrevivir el Período Especial y luego prosperar relativamente en los 2000s. Empleó a decenas de miles. Posicionó a Cuba como destino turístico competitivo en mercado global.

Varadero se convirtió en símbolo del pragmatismo revolucionario: usar recursos naturales y capital extranjero para financiar socialismo cubano. Era contradicción viviente: turismo capitalista financiando Estado socialista, trabajadores revolucionarios sirviendo turistas burgueses, lujo playero en país que predicaba austeridad.

Pero esa contradicción es esencia misma de Cuba contemporánea: navegando entre ideales socialistas y realidades capitalistas globales, entre pureza revolucionaria y pragmatismo de supervivencia, entre resistencia al imperialismo y necesidad de insertarse en economía mundial. Varadero, con sus playas perfectas donde conviven resorts de lujo y revolucionarios trabajadores, encarna esa tensión productiva que define a Cuba del siglo XXI.

Hoy, cuando millones de turistas caminan por la arena blanca de Varadero, bebiendo mojitos en bares de playa, pocos reflexionan sobre la historia: cómo esas playas salvaron economía cubana en su momento más oscuro, cómo la Revolución tuvo que abrazar turismo masivo para sobrevivir, cómo un país bloqueado durante décadas encontró en sus recursos naturales forma de insertarse en economía global sin renunciar completamente a sus principios. Varadero es, en este sentido, mucho más que playa hermosa: es monumento viviente a la capacidad de adaptación y resistencia del pueblo cubano.`
  }
,
  {
    id: 8,
    title: "Restablecimiento de Relaciones Cuba-Estados Unidos",
    date: "17 de diciembre de 2014",
    description: "Anuncio histórico simultáneo de Obama y Raúl Castro",
    image: "/eventos/contemporanea-2014-restablecimiento-relaciones.jpeg",
    wideImage: "/eventos/wide/contemporanea-2014-restablecimiento-relaciones-wide.jpeg",
    fullStory: `El 17 de diciembre de 2014, a las 12 del mediodía hora de Washington y La Habana, el presidente estadounidense Barack Obama y el presidente cubano Raúl Castro anunciaron simultáneamente en discursos históricos el acuerdo de restablecer relaciones diplomáticas entre ambos países después de más de 54 años de hostilidad. Este anuncio, resultado de 18 meses de negociaciones secretas facilitadas por el Papa Francisco y Canadá, marcó potencialmente el fin de la Guerra Fría en el hemisferio occidental y abrió perspectivas de nueva era en las relaciones Cuba-Estados Unidos. Aunque avances serían posteriormente revertidos durante la administración Trump, el 17D—como se conoce la fecha en Cuba—permanece como momento histórico de esperanza y posibilidad.

Las relaciones Cuba-Estados Unidos habían sido antagónicas desde el triunfo revolucionario de 1959. Estados Unidos rompió relaciones diplomáticas en enero de 1961, invadió Cuba en Playa Girón en abril de 1961, impuso bloqueo económico que se mantuvo durante más de medio siglo, realizó cientos de intentos de asesinato contra líderes cubanos, apoyó actividades terroristas contra la isla, y mantuvo Cuba en su lista de Estados patrocinadores del terrorismo. Cuba, por su parte, se había aliado con la Unión Soviética, exportado revolución a América Latina y África, y mantenido retórica antiimperialista intransigente.

Durante décadas, normalización de relaciones parecía imposible. Cada lado mantenía posiciones irreconciliables. Estados Unidos exigía que Cuba democratizara su sistema político, abriera su economía completamente al capitalismo, compensara propiedades nacionalizadas. Cuba exigía que Estados Unidos levantara el bloqueo, devolviera la base de Guantánamo, cesara hostilidad, respetara soberanía cubana. El conflicto estaba congelado.

Sin embargo, varios factores comenzaron a cambiar ecuación en los 2000s-2010s. Primero, el fracaso evidente de más de medio siglo de política de hostilidad estadounidense: el bloqueo no había derrocado al gobierno cubano, la Revolución había sobrevivido colapso soviético, Cuba mantenía apoyo significativo de su población. Segundo, cambios generacionales en comunidad cubano-americana: mientras la generación histórica del exilio mantenía posiciones duras, generaciones más jóvenes y nuevos emigrados recientes tendían a favorecer normalización. Tercero, intereses económicos estadounidenses veían en Cuba mercado potencial de 11 millones de consumidores y socio comercial cercano. Cuarto, cambio político en América Latina con gobiernos progresistas que apoyaban a Cuba y presionaban por normalización.

El Papa Francisco, primer papa latinoamericano, decidió usar su influencia para mediar. Francisco tenía legitimidad ante ambas partes: Cuba respetaba al Vaticano y tenía buenas relaciones con la Iglesia Católica cubana; Obama, aunque no católico, valoraba influencia moral del Papa. En 2013-2014, el Vaticano facilitó comunicaciones secretas entre Estados Unidos y Cuba.

Canadá, que siempre había mantenido relaciones cordiales con ambos países, también jugó rol crucial facilitando reuniones secretas en Toronto y Ottawa entre delegaciones cubanas y estadounidenses. Las negociaciones fueron de máximo secreto: solo puñado de personas en cada gobierno conocía las conversaciones.

Un factor que catalizó negociaciones fue el caso de Los Cinco: cinco agentes de inteligencia cubanos condenados en Estados Unidos por conspiración y espionaje. Cuba los consideraba héroes que infiltraron grupos terroristas anticastristas en Miami y había hecho de su liberación causa nacional durante años. Estados Unidos, por su parte, tenía prisionero a Alan Gross, contratista estadounidense encarcelado en Cuba por distribuir equipos de comunicación satelital ilegalmente bajo programas de "cambio de régimen" financiados por USAID.

El acuerdo anunciado el 17D incluía múltiples elementos: intercambio de prisioneros—Gross y un agente cubano no identificado por los tres cubanos restantes de Los Cinco que permanecían en prisión estadounidense—, restablecimiento de relaciones diplomáticas y apertura de embajadas, inicio de diálogo sobre múltiples temas bilaterales, revisión de política estadounidense hacia Cuba incluida la presencia de Cuba en lista de Estados patrocinadores del terrorismo, flexibilización de restricciones de viaje para estadounidenses, aumento de límites de remesas, facilitación de telecomunicaciones, y otros cambios administrativos que Obama podía implementar sin aprobación del Congreso.

Crucialmente, el bloqueo NO sería levantado inmediatamente porque su eliminación requería aprobación del Congreso, controlado por republicanos hostiles a la normalización. Obama podía—y después haría—flexibilizar aplicación del bloqueo mediante órdenes ejecutivas, pero no eliminarlo completamente.

Los anuncios simultáneos del 17D fueron momento de televisión histórica. Obama, desde Washington, reconoció que política de aislamiento hacia Cuba había fracasado durante más de medio siglo y era tiempo de un enfoque nuevo. Raúl Castro, desde La Habana, aunque mantuvo defensa del sistema socialista cubano y crítica de política histórica estadounidense, expresó disposición a dialogar respetando diferencias y sin renunciar a principios.

La reacción en Cuba fue de júbilo mezclado con cautela. Miles celebraron en las calles habaneras, especialmente jóvenes que veían perspectivas de mayor apertura, facilidad para viajar, acceso a tecnología, normalización con potencia vecina. Pero también había escepticismo: ¿Realmente Estados Unidos cambiaría después de más de medio siglo de hostilidad? ¿No sería esto estrategia nueva para lograr lo que el bloqueo no había logrado?

En Estados Unidos, la reacción fue dividida predictiblemente por líneas partidarias e ideológicas. Demócratas progresistas y sectores de comunidad cubano-americana favorable a normalización celebraron. Republicanos conservadores y exilio histórico anticastrista denunciaron el acuerdo como "apaciguamiento" y "recompensa a dictadura".

En los meses siguientes, ambos gobiernos implementaron elementos del acuerdo. En mayo de 2015, Estados Unidos sacó a Cuba de la lista de Estados patrocinadores del terrorismo. El 20 de julio de 2015, se reabrieron formalmente las embajadas: la de Cuba en Washington y la de Estados Unidos en La Habana. El secretario de Estado John Kerry visitó La Habana para la ceremonia de izamiento de bandera estadounidense en la embajada, primer secretario de Estado en visitar Cuba desde 1945.

Obama visitó Cuba en marzo de 2016, primer presidente estadounidense en visitar la isla desde Calvin Coolidge en 1928. La visita fue altamente simbólica: Obama recorrió la Habana Vieja, se reunió con Raúl Castro, dio discurso en Gran Teatro de La Habana transmitido en vivo por televisión cubana donde apeló directamente al pueblo cubano. Fue momento extraordinario de diplomacia pública.

El tráfico aéreo entre ambos países se incrementó dramáticamente. Aerolíneas estadounidenses establecieron vuelos regulares a Cuba. Turistas estadounidenses comenzaron a visitar Cuba en números sin precedentes—aunque técnicamente bajo categorías legales como "intercambio pueblo a pueblo", no turismo puro que seguía prohibido. Los cruceros estadounidenses comenzaron a hacer escala en La Habana.

Las inversiones y negocios estadounidenses exploraron oportunidades en Cuba. Empresas tecnológicas como Google y Airbnb establecieron operaciones. Cadenas hoteleras negociaban acuerdos. El comercio, aunque limitado por bloqueo no eliminado, aumentó.

Sin embargo, avances significativos quedaron incompletos. El Congreso estadounidense, controlado por republicanos, bloqueó legislación para levantar el bloqueo. Las negociaciones sobre temas espinosos—Guantánamo, compensación por propiedades nacionalizadas, financiamiento de disidencia cubana—no avanzaron sustancialmente. Cuba no hizo cambios políticos internos significativos que Estados Unidos exigía.

Y entonces, en noviembre de 2016, Donald Trump ganó las elecciones presidenciales estadounidenses. Durante campaña había prometido revertir la "política desastrosa de Obama hacia Cuba". En junio de 2017, desde Miami, Trump anunció reversión parcial: restricciones nuevas sobre viajes estadounidenses, prohibición de negocios con empresas militares cubanas, endurecimiento del bloqueo.

Durante administración Trump (2017-2021), prácticamente todos los avances del "deshielo" fueron revertidos. Se cerró el procesamiento de visas en La Habana, forzando a cubanos a viajar a terceros países para solicitar visas estadounidenses. Se reimplementaron restricciones de viaje. Se añadieron múltiples sanciones económicas. Se volvió a incluir a Cuba en lista de Estados patrocinadores del terrorismo días antes de que Trump dejara el cargo en enero de 2021.

La administración de Joe Biden (2021-presente), aunque prometió revertir las políticas más duras de Trump, ha mantenido en gran medida el status quo, posponiendo normalización por consideraciones políticas internas—Florida como estado clave electoral donde el exilio conservador tiene influencia.

A pesar de la reversión, el 17D de 2014 permanece significativo históricamente. Demostró que normalización Cuba-Estados Unidos era posible si hubiera voluntad política de ambos lados. Demostró que después de más de medio siglo, los dos países podían dialogar civilizadamente respetando diferencias. Abrió puertas—literalmente, en el caso de la embajada—que habían estado cerradas durante generaciones.

Para cubanos que vivieron el 17D, especialmente jóvenes, fue momento de esperanza. Parecía que finalmente la normalidad llegaría: poder viajar libremente a Estados Unidos, tener familiares visitando sin obstáculos enormes, acceso a comercio y tecnología, fin de hostilidad histórica. Aunque esa esperanza fue frustrada por reversión trumpiana, la memoria de que fue posible permanece.

El 17D también simboliza pragmatismo de Raúl Castro. Mientras Fidel habría sido ideológicamente más reticente a negociar con "el imperio", Raúl comprendía que normalización beneficiaba a Cuba económicamente y que el aislamiento ya no servía propósitos útiles en siglo XXI. Bajo Raúl, Cuba ha buscado consistentemente inserción pragmática en economía y política mundial sin renunciar a soberanía o principios socialistas básicos.

La historia del 17D no ha terminado. Las relaciones Cuba-Estados Unidos permanecen anormales, pendientes de resolución. Eventualmente, presión de la realidad—geográfica (90 millas), económica (complementariedad potencial), demográfica (millones de cubanos en ambos lados con vínculos familiares), cultural (influencia mutua)—forzará normalización definitiva. Cuando llegue, los historiadores mirarán al 17D de 2014 como momento crucial cuando dos naciones enemigas dieron primer paso tentativo hacia reconciliación.

El 17D enseña que incluso conflictos que parecen intratables, congelados durante generaciones, pueden descongelarse si líderes tienen visión y coraje para trascender inercia histórica. Enseña que la diplomacia, el diálogo, el compromiso mutuo son posibles incluso entre adversarios ideológicos. Y enseña que el pueblo—tanto cubano como estadounidense—generalmente está adelante de sus gobiernos, menos atrapado en dogmas del pasado, más dispuesto a mirar pragmáticamente hacia el futuro.

Algún día, las banderas que se izaron en las embajadas el 20 de julio de 2015 permanecerán sin amenaza de ser arriadas nuevamente. Algún día, el bloqueo será historia del pasado. Algún día, Cuba y Estados Unidos serán simplemente vecinos, manteniendo relaciones normales basadas en respeto mutuo, beneficio compartido y reconocimiento de que la Revolución Cubana, para bien o para mal, es realidad permanente que Estados Unidos debe aceptar así como Cuba debe aceptar que Estados Unidos seguirá siendo capitalista.

El 17D de 2014 fue anticipo de ese futuro posible, destello de luz de normalidad en más de medio siglo de oscuridad del conflicto, promesa de que la paz, finalmente, puede reemplazar a la guerra fría. Para los habaneros que vivieron ese día, cuando las noticias se difundieron por toda la ciudad generando conversaciones animadas en cada esquina, cuando familias separadas por el Estrecho de Florida durante décadas comenzaron a imaginar reunificaciones posibles, cuando jóvenes soñaron con futuros donde podrían viajar libremente entre La Habana y Miami, el 17D representó momento de esperanza genuina de que el absurdo histórico del conflicto Cuba-Estados Unidos finalmente podría terminar, permitiendo que dos pueblos hermanos separados por política pudieran finalmente abrazarse sin restricciones.`
  }
,
{
  id: 9,
  title: "La Habana Patrimonio Mundial y Turismo Cultural",
  date: "1982-presente",
  description: "La Habana consolida su posición como destino de turismo cultural mundial",
  image: "/eventos/contemporanea-2020-turismo-cultural.jpeg",
  wideImage: "/eventos/wide/contemporanea-2020-turismo-cultural-wide.jpeg",
  fullStory: `Desde que UNESCO declaró la Habana Vieja y su sistema de fortificaciones Patrimonio de la Humanidad en 1982, la capital cubana se ha consolidado como uno de los destinos de turismo cultural más importantes del mundo. Con su extraordinaria arquitectura colonial, sus calles empedradas donde resuena la historia de cinco siglos, sus legendarios autos clásicos americanos, su música vibrante en cada esquina, y su pueblo acogedor, La Habana ofrece experiencia cultural única que atrae a millones de visitantes anualmente. El turismo cultural se ha convertido en motor económico vital para la ciudad mientras simultáneamente plantea desafíos de preservación, autenticidad y beneficio social para los habaneros.

La Habana posee uno de los conjuntos arquitectónicos coloniales más importantes y mejor preservados de América. Fundada el 16 de noviembre de 1519 como San Cristóbal de La Habana, la ciudad fue durante siglos capital y puerto principal del imperio español en el Nuevo Mundo. Ya para el siglo XVII se había convertido en uno de los principales centros de comercio y construcción de barcos en el Caribe. Su Centro Histórico concentra palacios barrocos, iglesias coloniales, fortalezas militares, plazas monumentales, casonas señoriales que testimonian cuatro siglos de historia bajo dominio español.

La declaración de UNESCO en 1982 reconoció este valor excepcional. La Habana Vieja abarca aproximadamente 2.14 km² con 3,370 edificios, de los cuales 900 son de interés histórico y 500 de alto valor patrimonial. El sistema de fortificaciones incluye el Castillo de la Real Fuerza (el más antiguo de América), el Castillo de San Salvador de la Punta, el Castillo de los Tres Reyes del Morro, y la Fortaleza de San Carlos de la Cabaña, construidas entre los siglos XVI y XVIII para defender la ciudad de ataques piratas y potencias enemigas.

La fortunas históricas de La Habana fueron producto de la función excepcional de su bahía como parada obligada en la ruta marítima hacia el Nuevo Mundo, lo que hizo necesaria su protección militar. Este complejo sistema de fortificaciones es el más completo ejemplo de ingeniería militar española en el Caribe, reflejando la importancia estratégica de la ciudad durante la época colonial.

Más allá de la arquitectura monumental, La Habana ofrece experiencia cultural inmersiva incomparable. Los visitantes caminan por las mismas calles empedradas que transitaron Alexander von Humboldt, José Martí, Federico García Lorca, Ernest Hemingway. Se sientan en los mismos bares donde revolucionarios conspiraron contra dictaduras. Escuchan música en vivo —son, salsa, rumba, jazz afrocubano— en plazas y bares que mantienen tradiciones centenarias.

Los legendarios autos clásicos americanos de los años 50 se han convertido en símbolo icónico de La Habana. Chevrolets, Buicks, Cadillacs, Fords, Oldsmobiles, todos pintados en colores brillantes y mantenidos funcionando durante décadas mediante ingenio cubano que sustituye repuestos con piezas fabricadas artesanalmente, circulan por el Malecón y las calles del Centro Histórico como museos rodantes. Para turistas, pasear en estos autos vintage es experiencia quintesencial de Cuba, conexión tangible con época pre-revolucionaria congelada en el tiempo por el bloqueo que impidió importación de vehículos nuevos.

La música es omnipresente y vital en la experiencia habanera. En la Plaza de la Catedral, músicos visten trajes coloniales tocando para turistas. En bares históricos como La Bodeguita del Medio (famoso por sus mojitos y paredes cubiertas de grafitis de visitantes célebres) y El Floridita (donde Hemingway bebía daiquiris y donde su estatua de bronce reposa en el bar), conjuntos musicales interpretan clásicos del son cubano. En la Casa de la Música de Miramar, en el legendario Tropicana, en innumerables venues por toda la ciudad, la música cubana —declarada patrimonio inmaterial de la humanidad— se celebra nocturnamente con intensidad que pocas ciudades del mundo pueden igualar.

La gastronomía habanera ha experimentado renacimiento notable con la proliferación de paladares desde los años 90. Restaurantes privados como La Guarida (en edificio colonial de Concordia, famoso por haber sido locación de la película "Fresa y Chocolate"), San Cristóbal (visitado por Obama en 2016), El Cocinero (en antigua fábrica de aceite convertida en espacio cultural), ofrecen cocina cubana creativa fusionando tradiciones culinarias con técnicas contemporáneas. Estos establecimientos han atraído atención internacional, con críticos gastronómicos comparando favorablemente la escena culinaria habanera con otras capitales latinoamericanas.

El arte urbano ha florecido transformando barrios enteros. El proyecto Fusterlandia en Jaimanitas, creación del artista José Fuster, cubre casas, calles, paradas de autobús con fantásticos mosaicos de cerámica inspirados en Gaudí pero con iconografía cubana distintiva. Galerías de arte contemporáneo exhiben obra de artistas cubanos reconocidos internacionalmente como Wifredo Lam, Carlos Garaicoa, Kcho. La Fábrica de Arte Cubano (FAC), fundada en 2014 por músico X Alfonso en antigua fábrica de aceite, se ha convertido en epicentro de la escena artística joven habanera, espacio multidisciplinario donde convergen artes visuales, música, cine, danza en ambiente vanguardista que desafía estereotipos de Cuba como museo estático del pasado.

Los hoteles históricos restaurados ofrecen alojamiento que combina lujo con autenticidad patrimonial. El Hotel Nacional de Cuba, inaugurado en 1930 con elegancia art déco, donde se hospedaron Frank Sinatra, Ava Gardner, Winston Churchill, y donde la mafia estadounidense celebró su infame reunión de 1946, continúa recibiendo huéspedes ilustres. El Hotel Saratoga, frente al Capitolio, ejemplifica restauración de edificio histórico en hotel boutique de lujo. El Hotel Santa Isabel, en el Palacio del Conde de Santovenia en la Plaza de Armas, permite dormir en palacio colonial del siglo XVIII. El Hotel Ambos Mundos, donde Hemingway escribió inicialmente "Por Quién Doblan las Campanas" en la habitación 511, mantiene la habitación como museo mientras opera como hotel funcional.

Los tours temáticos proliferan atendiendo a intereses diversos. Tours de Hemingway visitan La Bodeguita, El Floridita, Finca Vigía (su casa-museo en las afueras), y Cojímar donde conoció al pescador que inspiró "El Viejo y el Mar". Tours de la Revolución recorren sitios del ataque al Cuartel Moncada, el Palacio Presidencial donde murió José Antonio Echeverría, el Museo de la Revolución. Tours arquitectónicos exploran estilos colonial barroco, neoclásico, art nouveau, art déco, ecléctico, modernista que conviven en la ciudad. Tours musicales visitan estudios de grabación, casas de músicos legendarios, presentaciones de Buena Vista Social Club. Tours fotográficos organizados por fotógrafos profesionales capturan la belleza decadente de edificios coloniales erosionados por salitre marino, contrastes de color, vida callejera vibrante.

La Compañía Turística Habaguanex S.A., creada en 1994 por la Oficina del Historiador, gestiona red de 20 hoteles boutique, 38 restaurantes, 56 cafeterías, múltiples tiendas y museos en La Habana Vieja. Su modelo innovador revierte ingresos del turismo directamente en la restauración continua del patrimonio y programas sociales para residentes del Centro Histórico. Este modelo de autofinanciamiento ha sido estudiado internacionalmente como ejemplo exitoso de uso de turismo cultural para preservación patrimonial sostenible.

El turismo cultural genera beneficios económicos masivos para La Habana. Los más de 1 millón de turistas anuales que recibe la ciudad (previo a COVID-19) gastan en hoteles, restaurantes, museos, tours, artesanía, transporte, entretenimiento, generando empleo directo para decenas de miles de habaneros y empleo indirecto para muchos más. Los ingresos fiscales y las ganancias de empresas estatales turísticas financian servicios públicos, infraestructura, y crucialmente, la restauración continua del patrimonio arquitectónico bajo dirección de la Oficina del Historiador.

Sin embargo, el turismo cultural también plantea desafíos serios que La Habana enfrenta constantemente. La autenticidad se ve amenazada cuando experiencias culturales se "turistifican" excesivamente. Músicos interpretando repetitivamente las mismas canciones turísticas ("Guantanamera", "Chan Chan"), vendedores agresivos de arte y artesanía, jineteros ofreciendo cigarros, ron, compañía femenina, todo puede degradar la experiencia y convertir espacios culturales auténticos en escenarios teatrales superficiales. El desafío constante es mantener autenticidad mientras se satisfacen expectativas turísticas y se genera ingresos necesarios.

La gentrificación es preocupación creciente seria. A medida que La Habana Vieja se restaura y se vuelve más atractiva turísticamente, aumenta presión sobre residentes originales. Aunque la Oficina del Historiador ha implementado programas sociales —construcción de viviendas para realojar familias de edificios a restaurar, escuelas, consultorios médicos, centros para ancianos, todo dentro del Centro Histórico para mantener comunidad residente— inevitablemente algunos residentes han sido desplazados. Edificios restaurados se convierten en hoteles, restaurantes, tiendas, reduciendo espacio residencial. El riesgo es que el Centro Histórico se convierta más en museo que en barrio viviente, más en escenario turístico que en comunidad funcional.

La sobresaturación turística en temporadas altas (diciembre-marzo especialmente) afecta tanto calidad de vida de residentes como calidad de experiencia de visitantes. Plazas principales como Plaza de Armas, Plaza de la Catedral, Plaza Vieja pueden estar abarrotadas de grupos turísticos, las calles congestionadas de cocotaxis y bicitaxis, los precios inflados artificialmente. Residentes enfrentan ruido constante, dificultad para transitar su propio barrio, comercios orientados exclusivamente a turistas en lugar de servir necesidades locales. El balance entre economía turística y habitabilidad es desafío que requiere regulación constante y planificación cuidadosa.

La desigualdad social se agrava dramáticamente. Quienes trabajan en turismo —guías, meseros, bartenders, taxistas, dueños de paladares y casas particulares— ganan múltiplos de salarios estatales mediante propinas en divisas y ingresos de negocios. Un guía turístico privado puede ganar en propinas de un día lo que un médico gana en un mes. Un paladar exitoso genera ingresos mensuales que superan ampliamente salarios de ingenieros, profesores universitarios, científicos. Esta inversión de valores meritocráticos crea resentimiento, incentiva abandono de profesiones vitales para sociedad, y reproduce desigualdades que la Revolución intentó eliminar.

La prostitución turística, aunque reprimida oficialmente por autoridades, persiste como realidad compleja. Algunas mujeres (y hombres) ven en turistas extranjeros oportunidad económica inmediata o potencial vía de emigración mediante relaciones que pueden conducir a matrimonio. Este fenómeno, conocido como "jineteras" cuando involucra mujeres, explota vulnerabilidades económicas, degrada dignidad de personas involucradas, y afecta negativamente percepción internacional de Cuba.

El debate sobre qué tipo de turismo promover es constante entre planificadores urbanos, economistas, y defensores del patrimonio. ¿Turismo masivo de cruceros que desembarcan miles de pasajeros por pocas horas (generando ingresos concentrados pero impacto desproporcionado en infraestructura y experiencia)? ¿Turismo boutique de alto gasto pero bajo volumen que busca experiencias auténticas y está dispuesto a pagar premium? ¿Turismo mochilero económico con presupuesto limitado pero culturalmente más curioso y dispuesto a interactuar genuinamente con locales? Cada modelo tiene ventajas y desventajas económicas, sociales, culturales que deben balancearse cuidadosamente.

La pandemia COVID-19 demostró dramáticamente vulnerabilidad de economía habanera tan dependiente del turismo. Cuando el turismo internacional colapsó en 2020-2021 con cierres de fronteras y restricciones de viaje globales, La Habana se vació traumáticamente. Calles históricamente llenas de turistas quedaron desiertas, bares y restaurantes cerraron, miles perdieron empleos e ingresos, muchos negocios privados no sobrevivieron. La recuperación ha sido gradual y incompleta, evidenciando necesidad de diversificar economía para no depender excesivamente de sector único vulnerable a choques externos impredecibles.

A pesar de todos estos desafíos significativos, el turismo cultural ha indudablemente preservado La Habana de maneras que no habrían sido posibles de otra forma. Sin ingresos masivos del turismo, muchos edificios históricos habrían colapsado por falta de mantenimiento durante el Período Especial y después. La motivación económica de atraer turistas ha impulsado inversión continua en preservación patrimonial que beneficia a todos los habaneros, no solo a turistas. Calles que en los 90 eran ruinas peligrosas ahora están restauradas, iluminadas, seguras. Plazas que eran estacionamientos o terrenos baldíos ahora son espacios públicos hermosos donde familias locales pasean junto con turistas.

La experiencia de visitar La Habana es transformadora para muchos visitantes. La ciudad tiene cualidad mágica única, mezcla intoxicante de belleza arquitectónica, decadencia romántica, vitalidad cultural desbordante, y calor humano genuino. Turistas regresan hablando no solo de monumentos sino de conversaciones improvisadas con habaneros, de músicos callejeros que tocaron solo para ellos, de cómo la ciudad los hizo reflexionar profundamente sobre historia, política, economía, posibilidades alternativas de organizar sociedad. La Habana no es solo destino turístico sino experiencia que cuestiona asunciones y amplía horizontes.

Para habaneros, el turismo es realidad profundamente compleja y ambivalente. Trae recursos económicos necesarios para ciudad y familias, pero también disrupciones en vida cotidiana. Preserva patrimonio colectivo, pero amenaza autenticidad cultural. Genera empleos abundantes, pero crea desigualdades sociales. Es simultáneamente salvación económica y desafío social. Habaneros navegan esta complejidad diariamente, trabajando en turismo mientras intentan mantener identidad y comunidad frente a presiones comerciales.

El futuro del turismo cultural en La Habana dependerá críticamente de encontrar balances sostenibles: entre preservación patrimonial y desarrollo económico, entre necesidades turísticas y habitabilidad para residentes, entre beneficios económicos y costos sociales, entre autenticidad cultural y accesibilidad turística. El objetivo debe ser que turismo sirva a la ciudad y sus residentes primero, no que ciudad sirva exclusivamente a turistas e inversionistas.

La Habana, declarada Patrimonio de la Humanidad, pertenece simbólicamente no solo a cubanos sino a toda la humanidad. UNESCO reconoció que estos edificios coloniales, estas fortificaciones militares, estas plazas donde se escribió historia de América, son herencia compartida que debe preservarse para generaciones futuras globalmente. Pero son los habaneros quienes viven allí cotidianamente, quienes caminan diariamente esas calles empedradas, quienes mantienen viva la cultura que atrae turistas. El turismo debe servir a ellos primero, preservando su ciudad, mejorando sus vidas, asegurando que La Habana del futuro sea tanto patrimonio viviente como museo histórico.

La Habana en 2014 fue elegida como una de las Siete Ciudades Maravilla del Mundo dentro de la iniciativa New7WondersCities, reconocimiento que celebra su diversidad cultural, riqueza histórica, y carácter único entre ciudades del mundo. Este reconocimiento internacional consolidó su posición como destino cultural de primer orden mundial.

Cuando millones de turistas caminan por calles empedradas de La Habana Vieja, admirando palacios barrocos y disfrutando mojitos al son de música cubana en plazas coloniales, están participando en acto de preservación cultural colectiva. Su presencia y sus gastos financian conservación de este tesoro arquitectónico excepcional. Pero también tienen responsabilidad ética de respetar carácter viviente de la ciudad, de interactuar respetuosamente con habaneros, de apreciar no solo piedras antiguas sino vidas contemporáneas que se desarrollan entre ellas, de comprender que detrás de cada fachada restaurada hay familias viviendo, trabajando, amando, luchando.

La Habana como destino de turismo cultural mundial representa éxito notable: ha logrado atraer millones de visitantes, generar recursos significativos, preservar patrimonio excepcional de cinco siglos, y mantener carácter distintivo que la diferencia de cualquier otra ciudad del mundo. Ninguna otra ciudad combina arquitectura colonial española tan bien preservada con revolucion socialista vigente, autos clásicos americanos con restricciones comerciales, música afrocaribeña vibrante con intelectualidad refinada, pobreza material con riqueza cultural. Esta combinación única, producto de historia compleja y circunstancias excepcionales, es lo que hace La Habana irresistiblemente atractiva para viajeros culturalmente curiosos.

El desafío ahora y hacia el futuro es asegurar que este éxito turístico sea sostenible ambientalmente, equitativo socialmente, y beneficioso para todos los habaneros, no solo para élite turística o empresarial. Solo así La Habana podrá continuar siendo lo que ha sido por cinco siglos: ciudad viva, vibrante, profundamente humana, donde historia y modernidad, tradición y cambio, patrimonio y progreso coexisten en tensión creativa y productiva que genera energía cultural única que atrae y transforma a quienes la experimentan.

La historia de La Habana como patrimonio mundial y destino de turismo cultural es historia de supervivencia y adaptación, de aprovechar recursos culturales para enfrentar crisis económicas, de transformar patrimonio arquitectónico en motor económico sin (intentar no) perder alma de la ciudad. Es historia de éxito imperfecto pero real, de desafíos continuos pero también de logros innegables. Es, finalmente, historia que continúa escribiéndose cada día cuando turistas de todo el mundo caminan por mismas calles donde caminaron conquistadores españoles, esclavos africanos, patriotas independentistas, revolucionarios socialistas, todos dejando su huella en piedras y en memoria colectiva de ciudad que se niega a ser solo museo pero abraza ser tesoro viviente de humanidad.`
}

,
  {
  id: 10,
  title: "Hoteles Emblemáticos de La Habana",
  date: "Siglos XIX-XXI",
  description: "Historia de la hotelería habanera desde 1875 hasta la actualidad",
  image: "/eventos/hoteles-emblematicos.jpeg",
  wideImage: "/eventos/wide/hoteles-emblematicos-wide.jpeg",
  isSpecialCard: true, // Marca especial para usar componente personalizado
  fullStory: `Los hoteles emblemáticos de La Habana representan más de 150 años de historia turística y arquitectónica de la capital cubana. Desde el Hotel Inglaterra, el más antiguo de Cuba inaugurado en 1875, hasta el moderno Hotel Habana Libre de 1958, estos establecimientos han sido testigos privilegiados de la historia cubana y han hospedado a personalidades mundiales de la política, el arte, la literatura y el deporte.

El Hotel Nacional de Cuba, inaugurado en 1930 y declarado Monumento Nacional, simboliza el glamour de La Habana republicana y ha recibido a Winston Churchill, Frank Sinatra, Ava Gardner y cientos de figuras ilustres. El Hotel Ambos Mundos, donde Ernest Hemingway escribió parte de "Por quién doblan las campanas" en la habitación 511, es destino obligado para admiradores del escritor.

Otros hoteles como el Saratoga (reconstruido en 2005 como hotel boutique de lujo), el Santa Isabel (palacio colonial del siglo XVIII en la Plaza de Armas), el Sevilla (con su arquitectura mudéjar inspirada en la Alhambra), el Riviera (icono del Movimiento Moderno frente al Malecón), el Presidente (primer rascacielos de La Habana con el escudo cubano), y el Plaza (centenario hotel del Parque Central), conforman un patrimonio hotelero único que combina arquitectura excepcional con historia fascinante.

La hotelería habanera atraviesa actualmente su peor crisis desde 2003, con tasas de ocupación de apenas 18.9% y caída dramática del turismo internacional. Sin embargo, estos hoteles históricos mantienen su esplendor arquitectónico y representan el potencial turístico más valioso de Cuba, testimoniando la época cuando La Habana competía con las grandes capitales del mundo en elegancia y servicios.`
}];

  const periods = [
    {
      id: 1,
      title: "Fundación Colonial",
      years: "1519 - 1898",
      description: "Desde los orígenes de la villa hasta las guerras de independencia",
      image: "/colonial.jpeg",
      color: "#8B4513",
      events: colonialEvents
    },
    {
      id: 2,
      title: "República",
      years: "1902 - 1958",
      description: "La construcción de la nación cubana y sus contradicciones",
      image: "/republica.jpeg",
      color: "#2C5F7C",
      events: republicaEvents
    },
    {
      id: 3,
      title: "Revolución",
      years: "1959 - 1990",
      description: "El triunfo revolucionario y la construcción del socialismo",
      image: "/revolucion.jpeg",
      color: "#C41E3A",
      events: revolucionEvents
    },
    {
      id: 4,
      title: "Habana Contemporánea",
      years: "1990 - Presente",
      description: "Transformación, resistencia y renovación urbana",
      image: "/modernidad.jpeg",
      color: "#1A472A",
      events: contemporaneaEvents
    }
  ];

  const navigateToPeriod = (index) => {
    if (index >= 0 && index < periods.length) {
      setCurrentPeriod(index);
      setExpandedPeriod(null);
      setCurrentEvent(0);
    }
  };

  const handleExplorePeriod = (periodIndex) => {
    setExpandedPeriod(periodIndex);
    setCurrentEvent(0);
  };

  const handleBackToPeriods = () => {
    setExpandedPeriod(null);
    setCurrentEvent(0);
  };

  const navigateToEvent = (index) => {
    const eventsLength = periods[expandedPeriod]?.events.length || 0;
    if (index >= 0 && index < eventsLength) {
      setCurrentEvent(index);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        if (detailedEvent) {
          setDetailedEvent(null);
        } else if (expandedImage) {
          setExpandedImage(null);
        } else if (expandedPeriod !== null) {
          handleBackToPeriods();
        }
      } else if (expandedPeriod !== null && !expandedImage && !detailedEvent) {
        if (e.key === 'ArrowLeft') navigateToEvent(currentEvent - 1);
        if (e.key === 'ArrowRight') navigateToEvent(currentEvent + 1);
      } else if (!expandedImage && !detailedEvent) {
        if (e.key === 'ArrowLeft') navigateToPeriod(currentPeriod - 1);
        if (e.key === 'ArrowRight') navigateToPeriod(currentPeriod + 1);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPeriod, expandedPeriod, currentEvent, expandedImage, detailedEvent]);

  // Manejo de audio por periodo
  useEffect(() => {
    // Configurar loop en todos los audios
    audioRefs.forEach(audio => {
      audio.loop = true;
      audio.volume = 0.3;
    });

    return () => {
      // Limpiar al desmontar
      audioRefs.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    const periodIndex = expandedPeriod !== null ? expandedPeriod : currentPeriod;
    const newAudio = audioRefs[periodIndex];

    if (currentAudio !== newAudio) {
      // Pausar audio anterior
      if (currentAudio) {
        currentAudio.pause();
      }

      // Reproducir nuevo audio
      if (newAudio) {
        newAudio.currentTime = 0;
        newAudio.play().catch(err => console.log('Error reproduciendo audio:', err));
        setCurrentAudio(newAudio);
      }
    }
  }, [currentPeriod, expandedPeriod, audioRefs, currentAudio]);

  return (
    <>
      <div className="timeline-container">
      {/* Header */}
      <header className={`main-header ${expandedPeriod !== null ? 'hidden' : ''}`}>
        <h1 className="site-title">La Habana • Historia Viva</h1>
      </header>

      {/* Vista de períodos principales */}
      {expandedPeriod === null && (
        <>
          <div 
            className="periods-wrapper"
            style={{
              transform: `translateX(-${currentPeriod * 100}vw)`
            }}
          >
            {periods.map((period, index) => (
              <section 
                key={period.id}
                className="period-section"
              >
                <div 
                  className="period-background"
                  style={{
                    backgroundImage: `url(${period.image})`
                  }}
                />
                <div className="period-overlay" />

                <div className="period-container">
                  <div className="period-card">
                    <div className="period-content">
                      <span className="period-number">0{index + 1}</span>
                      
                      <div className="period-thumbnail" onClick={() => setExpandedImage(period.image)}>
                        <img src={period.image} alt={period.title} />
                      </div>
                      
                      <h2 className="period-title">{period.title}</h2>
                      <p className="period-years">{period.years}</p>
                      <p className="period-description">{period.description}</p>
                      <button 
                        className="explore-btn" 
                        style={{ backgroundColor: period.color }}
                        onClick={() => handleExplorePeriod(index)}
                        disabled={period.events.length === 0}
                      >
                        {period.events.length > 0 ? 'Explorar Época' : 'Próximamente'}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="progress-indicators">
            {periods.map((period, index) => (
              <button
                key={period.id}
                onClick={() => navigateToPeriod(index)}
                className={`indicator ${currentPeriod === index ? 'active' : ''}`}
                aria-label={`Ir a ${period.title}`}
              >
                <span className="indicator-bar" style={{ backgroundColor: period.color }} />
              </button>
            ))}
          </div>

          {/* Línea temporal fija */}
          <div className="fixed-timeline">
            <div 
              className="fixed-timeline-line-full"
              style={{
                left: `calc(50% - ${currentPeriod * 30}vw)`,
                width: `${(periods.length - 1) * 30}vw`
              }}
            />
            {periods.map((period, index) => (
              <div 
                key={period.id}
                className="fixed-timeline-point"
                style={{
                  left: `calc(50% + ${(index - currentPeriod) * 30}vw)`,
                  opacity: Math.abs(index - currentPeriod) <= 2 ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${currentPeriod === index ? 1.2 : 0.8})`
                }}
              >
                {currentPeriod === index && (
                  <span className="fixed-timeline-year">{period.years.split(' - ')[0]}</span>
                )}
              </div>
            ))}
          </div>

          <div className="navigation-controls">
            <button
              onClick={() => navigateToPeriod(currentPeriod - 1)}
              disabled={currentPeriod === 0}
              className="nav-btn prev"
              aria-label="Período anterior"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={() => navigateToPeriod(currentPeriod + 1)}
              disabled={currentPeriod === periods.length - 1}
              className="nav-btn next"
              aria-label="Siguiente período"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </>
      )}

      {/* Vista de eventos expandida */}
      {expandedPeriod !== null && periods[expandedPeriod].events.length > 0 && (
        <>
          <button className="back-button" onClick={handleBackToPeriods}>
            <ArrowLeft size={24} />
            <span>Volver a Períodos</span>
          </button>

          <div 
            className="events-wrapper"
            style={{
              transform: `translateX(-${currentEvent * 100}vw)`
            }}
          >
            {periods[expandedPeriod].events.map((event, index) => (
              <section 
                key={event.id}
                className="event-section"
              >
                <div 
                  className="event-background"
                  style={{
                    backgroundImage: `url(${event.image})`
                  }}
                />
                <div className="event-overlay" />

                <div className="event-container">
                  <div className="event-card">
                    <div className="event-content">
                      <span className="event-number" style={{ color: periods[expandedPeriod].color }}>
                        {index + 1}/{periods[expandedPeriod].events.length}
                      </span>
                      
                      <div className="event-thumbnail" onClick={() => setExpandedImage(event.image)}>
                        <img src={event.image} alt={event.title} />
                      </div>
                      
                      <h2 className="event-title">{event.title}</h2>
                      <p className="event-date" style={{ color: periods[expandedPeriod].color }}>
                        {event.date}
                      </p>
                      <p className="event-description">{event.description}</p>
                      <button 
                        className="detail-btn" 
                        style={{ 
                          borderColor: periods[expandedPeriod].color,
                          color: periods[expandedPeriod].color
                        }}
                        onClick={() => {
                          console.log('Evento clickeado:', event.title, 'isSpecialCard:', event.isSpecialCard);
                          setDetailedEvent(event);
                        }}
                      >
                        Ver Historia Completa
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="progress-indicators">
            {periods[expandedPeriod].events.map((event, index) => (
              <button
                key={event.id}
                onClick={() => navigateToEvent(index)}
                className={`indicator ${currentEvent === index ? 'active' : ''}`}
                aria-label={`Ir a ${event.title}`}
              >
                <span className="indicator-bar" style={{ backgroundColor: periods[expandedPeriod].color }} />
              </button>
            ))}
          </div>

          {/* Línea temporal fija */}
          <div className="fixed-timeline">
            <div 
              className="fixed-timeline-line-full"
              style={{
                left: `calc(50% - ${currentEvent * 30}vw)`,
                width: `${(periods[expandedPeriod].events.length - 1) * 30}vw`
              }}
            />
            {periods[expandedPeriod].events.map((event, index) => (
              <div 
                key={event.id}
                className="fixed-timeline-point"
                style={{
                  left: `calc(50% + ${(index - currentEvent) * 30}vw)`,
                  opacity: Math.abs(index - currentEvent) <= 2 ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${currentEvent === index ? 1.2 : 0.8})`
                }}
              >
                {currentEvent === index && (
                  <span className="fixed-timeline-year">{event.date}</span>
                )}
              </div>
            ))}
          </div>

          <div className="navigation-controls">
            <button
              onClick={() => navigateToEvent(currentEvent - 1)}
              disabled={currentEvent === 0}
              className="nav-btn prev"
              aria-label="Evento anterior"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={() => navigateToEvent(currentEvent + 1)}
              disabled={currentEvent === periods[expandedPeriod].events.length - 1}
              className="nav-btn next"
              aria-label="Siguiente evento"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </>
      )}

      {/* Modal de historia completa del evento */}
      {detailedEvent && !detailedEvent.isSpecialCard && detailedEvent.fullStory && (
        <div className="story-modal">
          <div 
            className="story-background"
            style={{
              backgroundImage: `url(${detailedEvent.wideImage || detailedEvent.image})`
            }}
          />
          <div className="story-overlay" />
          
          <div className="story-container">
            <button className="story-close-btn" onClick={() => setDetailedEvent(null)}>
              <X size={32} />
            </button>
            
            <div className="story-content">
              <div className="story-header-image">
                <img 
                  src={detailedEvent.wideImage || detailedEvent.image} 
                  alt={detailedEvent.title}
                  onError={(e) => { e.target.src = detailedEvent.image; }}
                />
                <div className="story-header-overlay">
                  <h1 className="story-header-title">{detailedEvent.title}</h1>
                  <p className="story-header-date">{detailedEvent.date}</p>
                </div>
              </div>
              
              <div className="story-text">
                {detailedEvent.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="story-paragraph">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de imagen expandida */}
      {expandedImage && (
        <div className="image-modal" onClick={() => setExpandedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setExpandedImage(null)}>
              ✕
            </button>
            <img src={expandedImage} alt="Imagen expandida" />
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow: hidden;
        }

        .timeline-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #000;
        }

        .periods-wrapper, .events-wrapper {
          display: flex;
          height: 100vh;
          transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1);
          position: relative;
          z-index: 1;
        }

        .periods-wrapper {
          width: 400vw;
        }

        .events-wrapper {
          width: 1000vw;
        }

        .period-section, .event-section {
          width: 100vw;
          height: 100vh;
          position: relative;
          flex-shrink: 0;
        }

        .period-background, .event-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .period-overlay, .event-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 2;
        }

        .period-container, .event-container {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5rem;
          padding-bottom: 10rem;
        }

        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .main-header.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .site-title {
          font-family: 'Georgia', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #fff;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .period-nav {
          display: flex;
          gap: 1rem;
        }

        .period-tab {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          font-weight: 500;
          letter-spacing: 0.5px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .period-tab:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .period-tab.active {
          background: var(--accent-color);
          color: #fff;
          border-color: var(--accent-color);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3),
                      inset 0 2px 0 rgba(255, 255, 255, 0.3),
                      inset 0 -2px 0 rgba(0, 0, 0, 0.2);
        }

        .back-button {
          position: fixed;
          top: 6rem;
          left: 3rem;
          z-index: 101;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-5px);
        }

        .period-card, .event-card {
          max-width: 550px;
          max-height: 72vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        /* Línea temporal fija */
        .fixed-timeline {
          position: fixed;
          bottom: 3rem;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 90;
          pointer-events: none;
        }

        .fixed-timeline-line-full {
          position: absolute;
          top: 50%;
          height: 6px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
          transform: translateY(-50%);
          transition: left 1.2s cubic-bezier(0.65, 0, 0.35, 1), width 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .fixed-timeline-point {
          position: absolute;
          top: 50%;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #000;
          border: 4px solid #fff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 
                      0 4px 15px rgba(0, 0, 0, 0.8);
          z-index: 2;
          transition: all 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .fixed-timeline-year {
          position: absolute;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          letter-spacing: 1px;
          background: rgba(0, 0, 0, 0.8);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .period-card::-webkit-scrollbar, .event-card::-webkit-scrollbar {
          width: 6px;
        }

        .period-card::-webkit-scrollbar-track, .event-card::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }

        .period-card::-webkit-scrollbar-thumb, .event-card::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .period-card::-webkit-scrollbar-thumb:hover, .event-card::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .period-content, .event-content {
          color: #fff;
        }

        .period-thumbnail, .event-thumbnail {
          width: 100%;
          height: 180px;
          margin: 1rem 0 1.2rem 0;
          border-radius: 12px;
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .period-thumbnail:hover, .event-thumbnail:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .period-thumbnail img, .event-thumbnail img {
          width: 100%;
          height: auto;
          min-height: 100%;
          display: block;
          object-fit: cover;
          cursor: pointer;
        }

        .period-thumbnail::-webkit-scrollbar, .event-thumbnail::-webkit-scrollbar {
          width: 8px;
        }

        .period-thumbnail::-webkit-scrollbar-track, .event-thumbnail::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }

        .period-thumbnail::-webkit-scrollbar-thumb, .event-thumbnail::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .period-thumbnail::-webkit-scrollbar-thumb:hover, .event-thumbnail::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .period-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.1);
          line-height: 1;
          display: block;
          font-family: 'Georgia', serif;
          margin-bottom: 0.5rem;
        }

        .event-number {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          line-height: 1;
          display: block;
          margin-bottom: 0.5rem;
        }

        .period-title, .event-title {
          font-family: 'Georgia', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0.5rem 0 0.7rem 0;
          letter-spacing: 1px;
          line-height: 1.2;
        }

        .period-years, .event-date {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          font-weight: 300;
          letter-spacing: 2px;
        }

        .period-description, .event-description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.3rem;
        }

        .explore-btn, .detail-btn {
          padding: 0.8rem 2rem;
          font-size: 0.9rem;
          color: #fff;
          border: none;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          width: 100%;
        }

        .explore-btn {
          background: #8B4513;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3),
                      inset 0 2px 0 rgba(255, 255, 255, 0.25),
                      inset 0 -2px 4px rgba(0, 0, 0, 0.25);
        }

        .detail-btn {
          background: transparent;
          border: 2px solid;
        }

        .explore-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .explore-btn:hover:not(:disabled), .detail-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4),
                      inset 0 2px 0 rgba(255, 255, 255, 0.3),
                      inset 0 -2px 4px rgba(0, 0, 0, 0.2);
        }

        .detail-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .explore-btn:active:not(:disabled), .detail-btn:active {
          transform: translateY(-1px);
        }

        .explore-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            transparent
          );
          transform: skewX(-25deg);
          transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .explore-btn:hover:not(:disabled)::before {
          left: 150%;
        }

        .explore-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
          pointer-events: none;
        }

        .progress-indicators {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 100;
          max-width: 90vw;
          overflow-x: auto;
          padding: 0.5rem;
        }

        .progress-indicators::-webkit-scrollbar {
          height: 4px;
        }

        .progress-indicators::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .progress-indicators::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .indicator {
          width: 60px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border-radius: 4px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.4);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3),
                      0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .indicator-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 4px;
          box-shadow: 0 0 8px currentColor;
        }

        .indicator.active .indicator-bar {
          width: 100%;
        }

        .navigation-controls {
          position: fixed;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 2rem;
          z-index: 100;
          pointer-events: none;
        }

        .nav-btn {
          pointer-events: all;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2),
                      inset 0 2px 0 rgba(255, 255, 255, 0.15),
                      inset 0 -2px 0 rgba(0, 0, 0, 0.15);
        }

        .nav-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3),
                      inset 0 2px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
        }

        .nav-btn:active:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
        }

        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Modal de historia completa */
        .story-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 250;
          overflow-y: auto;
          animation: fadeIn 0.3s ease;
        }

        .story-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: blur(20px);
          transform: scale(1.1);
          z-index: 1;
        }

        .story-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 2;
        }

        .story-container {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 2rem;
        }

        .story-close-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 20;
          backdrop-filter: blur(10px);
        }

        .story-close-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: rotate(90deg) scale(1.1);
        }

        .story-content {
          max-width: 900px;
          width: 100%;
          margin: 4rem auto;
        }

        .story-header-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .story-header-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-header-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
        }

        .story-header-title {
          font-family: 'Georgia', serif;
          font-size: 2.5rem;
          color: #fff;
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .story-header-date {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 2px;
          font-weight: 300;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .story-text {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .story-paragraph {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .story-paragraph:last-child {
          margin-bottom: 0;
        }

        /* Modal de imagen expandida */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .image-modal-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-modal-content img {
          max-width: 100%;
          max-height: 95vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .image-modal-close {
          position: absolute;
          top: -50px;
          right: 0;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .image-modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .site-title {
            font-size: 1rem;
            letter-spacing: 1px;
          }

          .main-header {
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem 1.5rem;
          }

          .period-nav {
            width: 100%;
            overflow-x: auto;
            justify-content: flex-start;
          }

          .period-tab {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
            white-space: nowrap;
          }

          .back-button {
            top: 3.5rem;
            left: 1rem;
            padding: 0.5rem 0.9rem;
            font-size: 0.8rem;
          }

          .period-container, .event-container {
            padding: 0 1rem;
            padding-bottom: 9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 180px);
          }

          .period-card, .event-card {
            padding: 1.2rem;
            max-height: calc(100vh - 200px);
            width: 100%;
            max-width: 500px;
          }

          .period-thumbnail, .event-thumbnail {
            height: 150px;
            margin: 0.6rem 0 1rem 0;
          }

          .period-number {
            font-size: 2rem;
          }

          .period-title, .event-title {
            font-size: 1.4rem;
          }

          .period-years, .event-date {
            font-size: 1rem;
          }

          .period-description, .event-description {
            font-size: 0.95rem;
          }

          .navigation-controls {
            padding: 0 1rem;
          }

          .nav-btn {
            width: 50px;
            height: 50px;
          }

          .progress-indicators {
            bottom: 1rem;
          }

          .fixed-timeline {
            bottom: 2.5rem;
            height: 70px;
          }

          .fixed-timeline-point {
            width: 20px;
            height: 20px;
            border: 3px solid #fff;
          }

          .fixed-timeline-year {
            font-size: 0.7rem;
            bottom: 30px;
            padding: 0.2rem 0.5rem;
          }

          .indicator {
            width: 40px;
          }

          .story-container {
            padding: 1rem;
          }

          .story-content {
            margin: 6rem auto 2rem;
          }

          .story-close-btn {
            top: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
          }

          .story-header-title {
            font-size: 1.8rem;
          }

          .story-header-date {
            font-size: 1rem;
          }

          .story-text {
            padding: 2rem 1.5rem;
          }

          .story-paragraph {
            font-size: 0.95rem;
            line-height: 1.7;
          }

          .credits {
            font-size: 0.45rem;
            line-height: 1.2;
            padding: 5px 8px;
            top: 8px;
            right: 8px;
            max-width: 140px;
          }

          .credits-institution {
            font-size: 0.5rem;
          }

          .credits-faculty {
            font-size: 0.45rem;
          }

          .credits-label {
            font-size: 0.45rem;
          }

          .credits-creators div {
            font-size: 0.4rem;
          }
        }

        /* Estilos de los créditos */
        .credits {
          position: fixed;
          top: 12px;
          right: 15px;
          background-color: rgba(0, 0, 0, 0.4);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.65rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.75);
          text-align: right;
          z-index: 900;
          pointer-events: none;
          max-width: 220px;
        }

        .credits-institution {
          font-weight: 600;
          margin-bottom: 2px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .credits-faculty {
          font-weight: 500;
          margin-bottom: 6px;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .credits-creators {
          margin-top: 5px;
          padding-top: 5px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .credits-label {
          font-weight: 600;
          margin-bottom: 2px;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .credits-creators div:not(.credits-label) {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.3;
        }
      `}</style>
    </div>

    {/* Créditos en la esquina inferior derecha */}
    {!detailedEvent && (
      <div className="credits">
        <div className="credits-institution">Universidad de La Habana</div>
        <div className="credits-faculty">Facultad de Turismo</div>
        <div className="credits-creators">
          <div className="credits-label">Creadores:</div>
          <div>Hany Pimentel Collado</div>
          <div>Jonathan Daniel Montesinos Rodríguez</div>
          <div>Rony Martínez Tellería</div>
        </div>
      </div>
    )}

    {/* Modal de Hoteles Emblemáticos - Renderizado fuera del timeline-container */}
    {detailedEvent && detailedEvent.isSpecialCard && (
      <HotelesHabanaCard onClose={() => setDetailedEvent(null)} />
    )}
    </>
  );
};

export default HabanaTimeline;
