export const japaneseWords = [
  { id: '1', original: '食べる', reading: 'たべる', meaning: 'comer', examples: ['りんごを食べる (comer una manzana)', '朝ごはんを食べる (desayunar)'] },
  { id: '2', original: '飲む', reading: 'のむ', meaning: 'beber', examples: ['水を飲む (beber agua)', 'コーヒーを飲む (beber café)'] },
  { id: '3', original: '行く', reading: 'いく', meaning: 'ir', examples: ['学校に行く (ir a la escuela)', '東京に行く (ir a Tokio)'] },
  { id: '4', original: '来る', reading: 'くる', meaning: 'venir', examples: ['友達が来る (viene un amigo)', '明日来る (viene mañana)'] },
  { id: '5', original: '見る', reading: 'みる', meaning: 'ver', examples: ['映画を見る (ver una película)', '鳥を見る (ver un pájaro)'] },
  { id: '6', original: '聞く', reading: 'きく', meaning: 'oír/escuchar', examples: ['音楽を聞く (escuchar música)', '話を聞く (escuchar una historia)'] },
  { id: '7', original: '話す', reading: 'はなす', meaning: 'hablar', examples: ['日本語を話す (hablar japonés)', '友達と話す (hablar con un amigo)'] },
  { id: '8', original: '読む', reading: 'よむ', meaning: 'leer', examples: ['本を読む (leer un libro)', '新聞を読む (leer el periódico)'] },
  { id: '9', original: '書く', reading: 'かく', meaning: 'escribir', examples: ['手紙を書く (escribir una carta)', '名前を書く (escribir el nombre)'] },
  { id: '10', original: '買う', reading: 'かう', meaning: 'comprar', examples: ['本を買う (comprar un libro)', '野菜を買う (comprar verduras)'] },
  { id: '11', original: '売る', reading: 'うる', meaning: 'vender', examples: ['車を売る (vender un coche)', '古本を売る (vender libros viejos)'] },
  { id: '12', original: '持つ', reading: 'もつ', meaning: 'tener/sostener', examples: ['本を持つ (sostener un libro)', 'お金を持つ (tener dinero)'] },
  { id: '13', original: '待つ', reading: 'まつ', meaning: 'esperar', examples: ['バスを待つ (esperar el autobús)', '友達を待つ (esperar a un amigo)'] },
  { id: '14', original: '作る', reading: 'つくる', meaning: 'hacer/crear', examples: ['料理を作る (cocinar)', 'ケーキを作る (hacer un pastel)'] },
  { id: '15', original: '分かる', reading: 'わかる', meaning: 'entender', examples: ['日本語が分かる (entender japonés)', '意味が分かる (entender el significado)'] },
  { id: '16', original: '知る', reading: 'しる', meaning: 'saber/conocer', examples: ['彼を知る (conocerlo)', '真実を知る (saber la verdad)'] },
  { id: '17', original: '思う', reading: 'おもう', meaning: 'pensar/creer', examples: ['そうと思う (pensar así)', '彼女を思う (pensar en ella)'] },
  { id: '18', original: '使う', reading: 'つかう', meaning: 'usar', examples: ['パソコンを使う (usar la computadora)', 'お金を使う (usar/gastar dinero)'] },
  { id: '19', original: '開ける', reading: 'あける', meaning: 'abrir', examples: ['ドアを開ける (abrir la puerta)', '窓を開ける (abrir la ventana)'] },
  { id: '20', original: '閉める', reading: 'しめる', meaning: 'cerrar', examples: ['ドアを閉める (cerrar la puerta)', '本を閉める (cerrar el libro)'] },
  { id: '21', original: '始める', reading: 'はじめる', meaning: 'empezar', examples: ['仕事を始める (empezar a trabajar)', '勉強を始める (empezar a estudiar)'] },
  { id: '22', original: '終わる', reading: 'おわる', meaning: 'terminar', examples: ['授業が終わる (terminar la clase)', '仕事が終わる (terminar el trabajo)'] },
  { id: '23', original: '入る', reading: 'はいる', meaning: 'entrar', examples: ['部屋に入る (entrar a la habitación)', '大学に入る (entrar a la universidad)'] },
  { id: '24', original: '出る', reading: 'でる', meaning: 'salir', examples: ['家を出る (salir de casa)', '国を出る (salir del país)'] },
  { id: '25', original: '会う', reading: 'あう', meaning: 'encontrarse/conocer', examples: ['友達に会う (encontrarse con un amigo)', '先生に会う (ver al profesor)'] },
];

export function searchJapaneseWords(query: string): typeof japaneseWords {
  const lowerQuery = query.toLowerCase();
  return japaneseWords.filter(word =>
    word.original.toLowerCase().includes(lowerQuery) ||
    word.reading?.toLowerCase().includes(lowerQuery) ||
    word.meaning.toLowerCase().includes(lowerQuery)
  );
}