import ASelector from "../artifact/Selector.js";

import GameCollectionState from "../state/GameCollectionState.js";

import FetchUtilities from "./FetchUtilities.js";

const createUrl = (username) =>
  `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${username}`;

const parseUserGameIds = (xmlDocument) => {
  const answer = [];

  // This gives the data items.
  const xpath = "items/item";
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const idCell = xmlDocument.evaluate(
      "@objectid",
      thisRow,
      null,
      XPathResult.STRING_TYPE,
      null
    );
    const id = parseInt(idCell.stringValue.trim(), 10);
    answer.push(id);

    thisRow = rows.iterateNext();
  }

  return answer;
};

const BGA_GAME_IDS = [
  432, // 6 nimmt!
  68448, // 7 Wonders
  173346, // 7 Wonders Duel
  305980, // A Fistful of Gold
  6249, // Alhambra
  29934, // Amyitis
  234834, // Apocalypse at the Zoo of Carson City
  8229, // Armadora
  43152, // Assyria
  191925, // Bandido
  105265, // Battle of LITS
  54137, // Battle Sheep
  // Battleships Pencil & Paper
  212436, // Big Time Soccer
  40214, // Bombay
  296167, // Boomerang: Australia
  11733, // Briscola
  192343, // Bubblee Pop
  284229, // Butterfly
  181390, // Buttons
  171499, // Cacao
  41, // Can't Stop
  822, // Carcassonne
  4390, // Carcassonne: Hunters & Gatherers
  18602, // Caylus
  175117, // Celestia
  267378, // Chakra
  214880, // City of the Big Shoulders
  216132, // Clans of Caledonia
  // Color Pop
  5782, // Coloretto
  158899, // Colt Express
  308357, // Con Sonar!
  147151, // Concept
  2719, // Connect Four
  131357, // Coup
  302238, // Crazy Farmers
  2398, // Cribbage
  189201, // Dark Agent
  116975, // Diam's
  194594, // Dice Forge
  252544, // Dice Summoners
  215311, // Downforce
  232219, // Dragon Castle
  185344, // Dragon Keeper: The Dungeon
  156576, // Dragon Line
  66171, // Dragonheart
  138788, // Dungeon Roll
  12995, // Dungeon Twister
  10, // Elfenland
  68425, // Eminent Domain
  88594, // Eruption
  23228, // Evo: The "Game no Name"
  71074, // Expedition: Northwest Passage
  299556, // Exploration: Warzone
  290506, // Finity
  236639, // Flaming Pyramids
  121297, // Fleet
  143484, // Florenza: The Card Game
  172, // For Sale
  65244, // Forbidden Island
  // Four Color Cards
  163920, // Gaia
  140613, // Gear & Piston
  66587, // GOSU
  220276, // Guildes
  10527, // Gyges
  181440, // Hack Trick
  37628, // Haggis
  286062, // Haiclue
  98778, // Hanabi
  106217, // Hawaii
  2655, // Hive
  101723, // Hungarian Tarokk
  154753, // Ice Cold Ice Hockey
  31594, // In the Year of the Dragon
  15512, // Incan Gold
  63888, // Innovation
  54043, // Jaipur
  62809, // Jump Gate
  73761, // K2
  394, // Kahuna
  280107, // Kami
  122515, // Keyflower
  25674, // Khronos
  107529, // Kingdom Builder
  204583, // Kingdomino
  11865, // Koi-Koi
  140535, // Koryo
  112138, // Krosmaster Arena
  146886, // La Granja
  189203, // Le Dernier Peuple
  200785, // Legendary Inventors
  169147, // Letter Tycoon
  140620, // Lewis & Clark
  125618, // Libertalia
  36985, // Logger
  156566, // Lords of Xidit
  42487, // Lost Cities
  129622, // Love Letter
  118247, // Lucky Numbers
  245643, // Luxor
  95527, // Madeira
  252997, // Mapmaker: The Gerrymandering Game
  283948, // Marco Polo II: In the Service of the Khan
  29223, // Marrakech
  287002, // Marram
  99875, // Martian Dice
  23908, // Metromania
  21763, // Mr. Jack
  300305, // Nanga Parbat
  131616, // Nautilus
  13308, // Niagara
  40213, // Nile
  154809, // Nippon
  102148, // Noir: Killer versus Inspector
  194879, // Not Alone
  182274, // NXS Man-o-War
  1116, // Oh Hell!
  // Oh-Seven
  210008, // Off the Rails
  127095, // Origin
  204504, // Outlaws: Last Man Standing
  129050, // P.I.
  20528, // Palace
  73365, // Papayoo
  148205, // Penny Press
  45, // Perudo
  117663, // Piraten kapern
  69779, // Polis: Fight for the Hegemony
  27172, // Ponte del Diavolo
  180974, // Potion Explosion
  // President
  3076, // Puerto Rico
  1419, // Pylos
  286295, // Quantik
  143519, // Quantum
  681, // Quarto
  300700, // Quetzal
  624, // Quoridor
  28143, // Race for the Galaxy
  256589, // Rallyman: GT
  161417, // Red7
  185769, // Remember When
  132531, // Roll for the Galaxy
  127024, // Room 25
  144733, // Russian Railroads
  9220, // Saboteur
  9217, // Saint Petersburg
  251060, // Saint Poker
  194655, // Santorini
  169649, // Sapiens
  108745, // Seasons
  162660, // Secret Moon
  20782, // Siam
  177678, // Signorie
  6819, // Skat
  236248, // Small Islands
  67185, // Sobek
  3347, // Solo
  131199, // Soluna
  592, // Spades
  137269, // Spyrium
  193122, // Stir Fry Eighteen
  34635, // Stone Age
  133473, // Sushi Go!
  150599, // Takara Island
  70919, // Takenoko
  24508, // Taluva
  118048, // Targi
  146278, // Tash-Kalar
  121015, // Tea Time
  229853, // Teotihuacan: City of Gods
  120677, // Terra Mystica
  32484, // The Battle for Hill 218
  85005, // The Boss
  161226, // The Builders: Antiquity
  144553, // The Builders: Middle Ages
  284083, // The Crew: The Quest for Planet Nine
  142615, // The Jelly Monster Lab
  206327, // The King's Guild
  129948, // The Palaces of Carrara
  226254, // The Ruhr: A Story of Coal Trade
  171623, // The Voyages of Marco Polo
  25821, // The Werewolves of Miller's Hollow
  141019, // Thermopyles
  182028, // Through the Ages: A New Story of Civilization
  25613, // Through the Ages: A Story of Civilization
  21790, // Thurn and Taxis
  214910, // Tiki
  148759, // Time Masters
  42215, // Tobago
  258723, // ToeShamBo
  123540, // Tokaido
  105037, // Tournay
  300442, // Trekking the World
  73439, // Troyes
  1403, // Turn the Tide
  126239, // Twin Tin Bots
  126163, // Tzolk'in: The Mayan Calendar
  61487, // Unconditional Surrender! World War 2 in Europe
  211533, // Veggie Garden
  300936, // Via Magica
  281075, // Welcome to New Las Vegas
  132817, // Xanadu
  269146, // Yokai
  196340, // Yokohama
];

const NIC_GAME_IDS = [
  222514, // Batman: Gotham City Chronicles
  124361, // Concordia
  269595, // Copenhagen
  193738, // Great Western Trail
  250458, // Gugong
  252446, // Key Flow
  255692, // New Frontiers
  242302, // Space Base
  229853, // Teotihuacan: City of Gods
  167791, // Terraforming Mars
  247763, // Underwater Cities
];

const GameCollectionFetcher = {};

GameCollectionFetcher.fetchData = (username) =>
  new Promise((resolve) => {
    if (username === "boardGameArena") {
      const gameIds = BGA_GAME_IDS;
      gameIds.sort((a, b) => a - b);
      const user = ASelector.userByName(username);
      resolve(GameCollectionState.create({ userId: user.id, gameIds }));
    } else if (username === "nic") {
      const gameIds = NIC_GAME_IDS;
      gameIds.sort((a, b) => a - b);
      const user = ASelector.userByName(username);
      resolve(GameCollectionState.create({ userId: user.id, gameIds }));
    } else {
      const receiveData = (xmlDocument) => {
        const gameIds = parseUserGameIds(xmlDocument);
        gameIds.sort((a, b) => a - b);
        const user = ASelector.userByName(username);
        resolve(GameCollectionState.create({ userId: user.id, gameIds }));
      };

      const url = createUrl(username);
      const options = {};
      FetchUtilities.fetchRetryXml(url, options, 5).then(receiveData);
    }
  });

export default GameCollectionFetcher;
