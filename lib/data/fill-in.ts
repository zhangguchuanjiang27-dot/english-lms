export type FillInQuestion = {
    translation: string;
    sentence: string; // The sentence with [blank] marked
    cleanSentence: string; // The sentence without brackets
    blanks: { word: string; index: number }[]; // Extracted blanks
};

export type FillInCategory = {
    id: string; // e.g. verb-base
    title: string; // e.g. 動詞の原形
    description: string; // e.g. 主語に合わせて動詞の形を変えよう
    questions: FillInQuestion[];
};

const RAW_FILL_IN_DATA: { id: string, title: string, description: string, rawQuestions: string[] }[] = [
    {
        id: 'verb-present',
        title: '動詞の現在形',
        description: '主語に合わせて動詞の形を変えよう（三単現のsなどに注意！）',
        rawQuestions: [
            "私は学生です。 | I [am] a student .",
            "あなたは優しいです。 | You [are] kind .",
            "彼は私の友達です。 | He [is] my friend .",
            "私は犬が好きです。 | I [like] dogs .",
            "私たちは野球をします。 | We [play] baseball .",
            "私は東京に住んでいます。 | I [live] in Tokyo .",
            "私は毎日学校へ行きます。 | I [go] to school every day .",
            "私は本を持っています。 | I [have] a book .",
            "私は毎朝牛乳を飲みます。 | I [drink] milk every morning .",
            "私はリンゴを食べます。 | I [eat] an apple .",
            "彼女はテニスをします。 | She [plays] tennis .",
            "トムはカナダに住んでいます。 | Tom [lives] in Canada .",
            "彼は車を持っています。 | He [has] a car .",
            "私の母は英語を話します。 | My mother [speaks] English .",
            "ケンは毎日歩きます。 | Ken [walks] every day .",
            "彼女は速く走ります。 | She [runs] fast .",
            "私の父は車を運転します。 | My father [drives] a car .",
            "彼はその本を読みます。 | He [reads] the book .",
            "彼女は手紙を書きます。 | She [writes] a letter .",
            "メアリーはとても上手に歌います。 | Mary [sings] very well .",
            "彼は放課後、英語を勉強します。 | He [studies] English after school .",
            "私の兄は毎晩テレビを見ます。 | My brother [watches] TV every night .",
            "トムは毎日顔を洗います。 | Tom [washes] his face every day .",
            "彼女は夕食を作ります。 | She [cooks] dinner .",
            "私は新しい自転車が欲しいです。 | I [want] a new bike .",
            "私たちは彼を知っています。 | We [know] him .",
            "彼は自分の部屋を掃除します。 | He [cleans] his room .",
            "彼女はいつも私を手伝います。 | She always [helps] me .",
            "私は毎日このペンを使います。 | I [use] this pen every day .",
            "トムは放課後、友達と会います。 | Tom [meets] his friends after school .",
            "私は毎日音楽を聴きます。 | I [listen] to music every day .",
            "彼女は時々、絵を描きます。 | She sometimes [draws] a picture .",
            "彼は新しい靴を買います。 | He [buys] new shoes .",
            "私は彼の名前を覚えています。 | I [remember] his name .",
            "彼は8時に家を出ます。 | He [leaves] home at eight .",
            "彼女はその言葉の意味を理解しています。 | She [understands] the meaning of the word .",
            "私は彼が正しいと思います。 | I [think] that he is right .",
            "トムは私に面白い話をしてくれます。 | Tom [tells] me an interesting story .",
            "彼女はその箱を開けます。 | She [opens] the box .",
            "彼はいつもドアを閉めます。 | He always [closes] the door .",
            "彼は毎年、その山に登ります。 | He [climbs] the mountain every year .",
            "彼女は毎日ピアノを練習します。 | She [practices] the piano every day .",
            "その店は美味しいケーキを売っています。 | The store [sells] delicious cakes .",
            "私は彼にその質問を尋ねます。 | I [ask] him the question .",
            "彼は壁にポスターを貼ります。 | He [puts] a poster on the wall .",
            "彼女はいつも私に微笑みかけます。 | She always [smiles] at me .",
            "トムは新しいコンピュータを必要としています。 | Tom [needs] a new computer .",
            "その電車は正午に到着します。 | The train [arrives] at noon .",
            "彼はいつも私にその写真を送ります。 | He always [sends] me the picture .",
            "彼女は人々と話すことを楽しみます。 | She [enjoys] talking with people ."
        ]
    }
];

export const FILL_IN_CATEGORIES: FillInCategory[] = RAW_FILL_IN_DATA.map(category => {
    const questions = category.rawQuestions.map(line => {
        const [translation, answerStr] = line.split('|').map(s => s.trim());
        // Sanitize
        const sanitizedAnswer = answerStr.replace(/([.?\!,])/g, ' $1').replace(/\s+/g, ' ').trim();

        const rawTokens = sanitizedAnswer.split(' ').filter(w => w.length > 0);

        const cleanTokens: string[] = [];
        const blanks: { word: string; index: number }[] = [];

        rawTokens.forEach((token, index) => {
            if (token.startsWith('[') && token.endsWith(']')) {
                const word = token.slice(1, -1);
                cleanTokens.push(word);
                blanks.push({ word, index });
            } else {
                cleanTokens.push(token);
            }
        });

        return {
            translation,
            sentence: sanitizedAnswer,
            cleanSentence: cleanTokens.join(' '),
            blanks
        };
    });

    return {
        id: category.id,
        title: category.title,
        description: category.description,
        questions
    };
});
