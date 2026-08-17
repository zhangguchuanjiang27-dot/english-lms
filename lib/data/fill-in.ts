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
    },
    {
        id: 'be-basic',
        title: 'be動詞の使い分け',
        description: 'am / are / is を、主語に合わせて正しく入れよう',
        rawQuestions: [
            "私は12歳です。 | I [am] twelve years old .",
            "あなたは私のクラスメートです。 | You [are] my classmate .",
            "彼はサッカー選手です。 | He [is] a soccer player .",
            "彼女は忙しいです。 | She [is] busy .",
            "これは私のノートです。 | This [is] my notebook .",
            "あれらは古い写真です。 | Those [are] old pictures .",
            "私たちは同じチームです。 | We [are] on the same team .",
            "彼らは図書館にいます。 | They [are] in the library .",
            "私の父は医者です。 | My father [is] a doctor .",
            "そのドアは開いています。 | The door [is] open ."
        ]
    },
    {
        id: 'negative-basic',
        title: '否定文の作り方',
        description: 'be動詞・一般動詞の否定文で not / do / does を使い分けよう',
        rawQuestions: [
            "私は疲れていません。 | I am [not] tired .",
            "彼は私の先生ではありません。 | He is [not] my teacher .",
            "彼らは家にいません。 | They are [not] at home .",
            "私はコーヒーを飲みません。 | I [do] not drink coffee .",
            "あなたはその答えを知りません。 | You [do] not know the answer .",
            "彼女は肉を食べません。 | She [does] not eat meat .",
            "トムはピアノを弾きません。 | Tom [does] not play the piano .",
            "私たちは日曜日に学校へ行きません。 | We [do] not go to school on Sunday .",
            "その犬は速く走りません。 | The dog [does] not run fast .",
            "私はその映画が好きではありません。 | I [do] not like the movie ."
        ]
    },
    {
        id: 'question-basic',
        title: '疑問文の作り方',
        description: 'Are / Is / Do / Does を文頭に置く基本パターンを練習しよう',
        rawQuestions: [
            "あなたは準備ができていますか。 | [Are] you ready ?",
            "彼はあなたの兄ですか。 | [Is] he your brother ?",
            "これはあなたのかばんですか。 | [Is] this your bag ?",
            "彼らは英語を話しますか。 | [Do] they speak English ?",
            "あなたは毎日勉強しますか。 | [Do] you study every day ?",
            "彼女はテニスが好きですか。 | [Does] she like tennis ?",
            "ケンは朝食を食べますか。 | [Does] Ken eat breakfast ?",
            "あなたのお母さんは車を運転しますか。 | [Does] your mother drive a car ?",
            "私たちはここで待ちますか。 | [Do] we wait here ?",
            "その店は9時に開きますか。 | [Does] the store open at nine ?"
        ]
    },
    {
        id: 'past-basic',
        title: '過去形の基本',
        description: '過去の出来事を表す was / were / 動詞の過去形を入れよう',
        rawQuestions: [
            "私は昨日家にいました。 | I [was] at home yesterday .",
            "彼らは先週忙しかったです。 | They [were] busy last week .",
            "彼女は昨日テニスをしました。 | She [played] tennis yesterday .",
            "私は昨夜テレビを見ました。 | I [watched] TV last night .",
            "トムはその箱を開けました。 | Tom [opened] the box .",
            "私たちは公園まで歩きました。 | We [walked] to the park .",
            "彼は朝食を食べました。 | He [ate] breakfast .",
            "私は新しいペンを買いました。 | I [bought] a new pen .",
            "彼女は手紙を書きました。 | She [wrote] a letter .",
            "彼らはそのニュースを知っていました。 | They [knew] the news ."
        ]
    },
    {
        id: 'modal-basic',
        title: '助動詞 can / must',
        description: '助動詞の後ろは動詞の原形。can / cannot / must を使ってみよう',
        rawQuestions: [
            "私は英語を話すことができます。 | I [can] speak English .",
            "彼女は速く泳ぐことができます。 | She [can] swim fast .",
            "あなたはここでサッカーをしてはいけません。 | You [cannot] play soccer here .",
            "彼はギターを弾くことができません。 | He [cannot] play the guitar .",
            "私たちは今出発しなければなりません。 | We [must] leave now .",
            "あなたは宿題を終えなければなりません。 | You [must] finish your homework .",
            "彼らはこの部屋を使うことができます。 | They [can] use this room .",
            "私はもっと練習しなければなりません。 | I [must] practice more .",
            "メアリーはその質問に答えることができます。 | Mary [can] answer the question .",
            "あなたはこの川で泳いではいけません。 | You [cannot] swim in this river ."
        ]
    },
    {
        id: 'progressive-basic',
        title: '現在進行形',
        description: 'am / are / is + 動詞ing で「今していること」を表そう',
        rawQuestions: [
            "私は今、英語を勉強しています。 | I [am] studying English now .",
            "彼は公園で走っています。 | He [is] running in the park .",
            "彼女は夕食を作っています。 | She [is] cooking dinner .",
            "私たちは音楽を聴いています。 | We [are] listening to music .",
            "彼らはサッカーをしています。 | They [are] playing soccer .",
            "あなたは何を読んでいますか。 | What [are] you reading ?",
            "トムはテレビを見ています。 | Tom [is] watching TV .",
            "その赤ちゃんは泣いています。 | The baby [is] crying .",
            "私は母を手伝っています。 | I [am] helping my mother .",
            "あなたたちは今、昼食を食べていますか。 | [Are] you eating lunch now ?"
        ]
    },
    {
        id: 'future-basic',
        title: '未来表現 will / be going to',
        description: '未来の予定や意思を will / be going to で表そう',
        rawQuestions: [
            "私は明日あなたに電話します。 | I [will] call you tomorrow .",
            "彼女は来週京都を訪れるつもりです。 | She [will] visit Kyoto next week .",
            "私たちは今夜映画を見る予定です。 | We [are] going to watch a movie tonight .",
            "彼は新しい自転車を買うつもりです。 | He [is] going to buy a new bike .",
            "あなたは明日忙しいでしょうか。 | [Will] you be busy tomorrow ?",
            "私は医者になるつもりです。 | I [am] going to be a doctor .",
            "彼らはパーティーに来ないでしょう。 | They [will] not come to the party .",
            "雨が降るでしょう。 | It [will] rain .",
            "私の兄はカナダで勉強する予定です。 | My brother [is] going to study in Canada .",
            "あなたは何をするつもりですか。 | What [are] you going to do ?"
        ]
    },
    {
        id: 'there-basic',
        title: 'There is / There are',
        description: '「〜があります・います」を there 構文で言えるようにしよう',
        rawQuestions: [
            "机の上に本があります。 | There [is] a book on the desk .",
            "公園にはたくさんの子どもたちがいます。 | There [are] many children in the park .",
            "私の町には大きな図書館があります。 | There [is] a big library in my town .",
            "箱の中に3つのリンゴがあります。 | There [are] three apples in the box .",
            "この部屋にはテレビがありません。 | There [is] no TV in this room .",
            "壁にいくつかの写真があります。 | There [are] some pictures on the wall .",
            "近くに駅はありますか。 | [Is] there a station near here ?",
            "そのクラスには30人の生徒がいます。 | There [are] thirty students in the class .",
            "冷蔵庫に水があります。 | There [is] some water in the fridge .",
            "庭には花がありません。 | There [are] no flowers in the garden ."
        ]
    },
    {
        id: 'pronoun-basic',
        title: '代名詞と所有格',
        description: 'he / him / his など、人や物を指す語を正しく選ぼう',
        rawQuestions: [
            "私は彼を知っています。 | I know [him] .",
            "彼女は私の友達です。 | She is [my] friend .",
            "これは彼のペンです。 | This is [his] pen .",
            "私は彼女と一緒に学校へ行きます。 | I go to school with [her] .",
            "彼らは私たちを助けてくれます。 | They help [us] .",
            "これはあなたのかばんですか。 | Is this [your] bag ?",
            "私たちの先生は親切です。 | [Our] teacher is kind .",
            "その犬はしっぽを振っています。 | The dog is wagging [its] tail .",
            "私は彼らの名前を知りません。 | I do not know [their] names .",
            "この本は私のものです。 | This book is [mine] ."
        ]
    },
    {
        id: 'preposition-basic',
        title: '前置詞 in / on / at',
        description: '場所・時間を表す in / on / at を使い分けよう',
        rawQuestions: [
            "私は東京に住んでいます。 | I live [in] Tokyo .",
            "その本は机の上にあります。 | The book is [on] the desk .",
            "私たちは7時に会います。 | We meet [at] seven .",
            "彼女は日曜日にテニスをします。 | She plays tennis [on] Sunday .",
            "私は朝に英語を勉強します。 | I study English [in] the morning .",
            "彼は駅にいます。 | He is [at] the station .",
            "そのポスターは壁にあります。 | The poster is [on] the wall .",
            "私の誕生日は5月です。 | My birthday is [in] May .",
            "私たちは昼食時に話しました。 | We talked [at] lunch .",
            "彼女はバスの中にいます。 | She is [on] the bus ."
        ]
    },
    {
        id: 'comparison-basic',
        title: '比較級・最上級',
        description: 'taller / the tallest / more interesting など比較表現を練習しよう',
        rawQuestions: [
            "私はケンより背が高いです。 | I am [taller] than Ken .",
            "この本はあの本より面白いです。 | This book is [more] interesting than that one .",
            "彼女はクラスで一番速く走ります。 | She runs the [fastest] in her class .",
            "英語は数学より簡単です。 | English is [easier] than math .",
            "この犬は3匹の中で一番大きいです。 | This dog is the [biggest] of the three .",
            "私の町はあなたの町より小さいです。 | My town is [smaller] than your town .",
            "この映画はあの映画より人気があります。 | This movie is [more] popular than that one .",
            "彼は私たちのチームで一番上手です。 | He is the [best] player on our team .",
            "今日は昨日より寒いです。 | Today is [colder] than yesterday .",
            "これはすべての中で一番大切な問題です。 | This is the [most] important question of all ."
        ]
    },
    {
        id: 'infinitive-gerund-basic',
        title: '不定詞・動名詞',
        description: 'to 動詞 / 動詞ing を使って「すること」を表そう',
        rawQuestions: [
            "私は英語を勉強したいです。 | I want [to] study English .",
            "彼女は歌うことが好きです。 | She likes [singing] .",
            "私たちはサッカーをするために公園へ行きました。 | We went to the park [to] play soccer .",
            "彼は本を読むことを楽しみます。 | He enjoys [reading] books .",
            "私は医者になるために一生懸命勉強します。 | I study hard [to] be a doctor .",
            "早起きすることは大切です。 | [Getting] up early is important .",
            "彼女はピアノを弾き始めました。 | She started [playing] the piano .",
            "私は昼食を買うために店へ行きました。 | I went to the store [to] buy lunch .",
            "トムは泳ぐことが得意です。 | Tom is good at [swimming] .",
            "私はあなたに会えてうれしいです。 | I am happy [to] see you ."
        ]
    },
    {
        id: 'conjunction-basic',
        title: '接続詞 when / if / because',
        description: '文と文をつなぐ when / if / because / that を使ってみよう',
        rawQuestions: [
            "私は暇なとき、本を読みます。 | I read books [when] I am free .",
            "もし雨が降ったら、家にいます。 | [If] it rains , I will stay home .",
            "私は疲れていたので早く寝ました。 | I went to bed early [because] I was tired .",
            "彼は彼女が親切だと思っています。 | He thinks [that] she is kind .",
            "あなたが来たら、私はうれしいです。 | I will be happy [if] you come .",
            "彼女は子どものころ、京都に住んでいました。 | She lived in Kyoto [when] she was a child .",
            "私は英語が好きなので毎日勉強します。 | I study English every day [because] I like it .",
            "私は彼が正しいと知っています。 | I know [that] he is right .",
            "もし時間があれば、手伝ってください。 | [If] you have time , please help me .",
            "彼が帰宅したとき、私はテレビを見ていました。 | I was watching TV [when] he came home ."
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
