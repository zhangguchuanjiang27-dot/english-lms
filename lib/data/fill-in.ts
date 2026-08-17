export type FillInQuestion = {
    translation: string;
    sentence: string; // The sentence with [blank] marked
    cleanSentence: string; // The sentence without brackets
    blanks: { word: string; index: number }[]; // Extracted blanks
};

export type FillInLevel = 'jhs1' | 'jhs2' | 'jhs3';

export type FillInCategory = {
    id: string; // e.g. verb-base
    level: FillInLevel;
    title: string; // e.g. 動詞の原形
    description: string; // e.g. 主語に合わせて動詞の形を変えよう
    questions: FillInQuestion[];
};

export const FILL_IN_LEVELS: { id: FillInLevel; name: string; sub: string }[] = [
    { id: 'jhs1', name: '中学1年生', sub: 'Level 1' },
    { id: 'jhs2', name: '中学2年生', sub: 'Level 2' },
    { id: 'jhs3', name: '中学3年生', sub: 'Level 3' },
];

const CATEGORY_LEVELS: Record<string, FillInLevel> = {
    'verb-present': 'jhs1',
    'be-basic': 'jhs1',
    'negative-basic': 'jhs1',
    'question-basic': 'jhs1',
    'modal-basic': 'jhs1',
    'progressive-basic': 'jhs1',
    'there-basic': 'jhs1',
    'pronoun-basic': 'jhs1',
    'preposition-basic': 'jhs1',
    'interrogative-basic': 'jhs1',
    'imperative-basic': 'jhs1',
    'past-basic': 'jhs2',
    'future-basic': 'jhs2',
    'comparison-basic': 'jhs2',
    'infinitive-gerund-basic': 'jhs2',
    'conjunction-basic': 'jhs2',
    'past-progressive-basic': 'jhs2',
    'auxiliary-advanced-basic': 'jhs2',
    'svoo-basic': 'jhs2',
    'passive-basic': 'jhs3',
    'present-perfect-basic': 'jhs3',
    'present-perfect-progressive-basic': 'jhs3',
    'indirect-question-basic': 'jhs3',
    'participle-basic': 'jhs3',
    'relative-pronoun-basic': 'jhs3',
    'subjunctive-basic': 'jhs3',
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
    },
    {
        id: 'interrogative-basic',
        title: '疑問詞',
        description: 'what / who / where / when / how で質問を作ろう',
        rawQuestions: [
            "これは何ですか。 | [What] is this ?",
            "あなたの名前は何ですか。 | [What] is your name ?",
            "あなたはどこに住んでいますか。 | [Where] do you live ?",
            "彼女はいつテニスをしますか。 | [When] does she play tennis ?",
            "あの少年は誰ですか。 | [Who] is that boy ?",
            "あなたはどうやって学校へ行きますか。 | [How] do you go to school ?",
            "あなたはなぜ英語を勉強するのですか。 | [Why] do you study English ?",
            "あなたは何色が好きですか。 | [What] color do you like ?",
            "あなたの誕生日はいつですか。 | [When] is your birthday ?",
            "これは誰の自転車ですか。 | [Whose] bike is this ?"
        ]
    },
    {
        id: 'imperative-basic',
        title: '命令文',
        description: '動詞で始める命令文と、Please / Don’t を使った表現',
        rawQuestions: [
            "窓を開けなさい。 | [Open] the window .",
            "静かにしてください。 | Please [be] quiet .",
            "ここで走ってはいけません。 | [Do] not run here .",
            "この本を読んでください。 | Please [read] this book .",
            "私を手伝ってください。 | Please [help] me .",
            "そのドアを閉めなさい。 | [Close] the door .",
            "心配しないで。 | [Do] not worry .",
            "あなたの名前を書きなさい。 | [Write] your name .",
            "一緒に昼食を食べましょう。 | [Let's] have lunch together .",
            "写真を撮らないでください。 | Please [do] not take pictures ."
        ]
    },
    {
        id: 'past-progressive-basic',
        title: '過去進行形',
        description: 'was / were + 動詞ing で「その時〜していた」を表そう',
        rawQuestions: [
            "私はその時、宿題をしていました。 | I [was] doing my homework then .",
            "彼女は7時に夕食を作っていました。 | She [was] cooking dinner at seven .",
            "彼らは公園でサッカーをしていました。 | They [were] playing soccer in the park .",
            "あなたはその時何をしていましたか。 | What [were] you doing then ?",
            "トムはテレビを見ていました。 | Tom [was] watching TV .",
            "私たちは英語を勉強していました。 | We [were] studying English .",
            "その赤ちゃんは泣いていませんでした。 | The baby [was] not crying .",
            "雨が降っていました。 | It [was] raining .",
            "彼は駅で私を待っていました。 | He [was] waiting for me at the station .",
            "彼女たちは歌を歌っていました。 | They [were] singing a song ."
        ]
    },
    {
        id: 'auxiliary-advanced-basic',
        title: '助動詞 should / may / have to',
        description: 'should / may / have to で助言・可能性・必要を表そう',
        rawQuestions: [
            "あなたは早く寝るべきです。 | You [should] go to bed early .",
            "彼は今日学校に来るかもしれません。 | He [may] come to school today .",
            "私は部屋を掃除しなければなりません。 | I [have] to clean my room .",
            "彼女はその本を読まなければなりません。 | She [has] to read the book .",
            "あなたはそんなに心配するべきではありません。 | You [should] not worry so much .",
            "明日は雨が降るかもしれません。 | It [may] rain tomorrow .",
            "私たちはここで待たなければなりません。 | We [have] to wait here .",
            "彼は医者に行くべきです。 | He [should] see a doctor .",
            "あなたはこの薬を飲まなければなりません。 | You [have] to take this medicine .",
            "彼女はその答えを知っているかもしれません。 | She [may] know the answer ."
        ]
    },
    {
        id: 'svoo-basic',
        title: 'SVOO・第4文型',
        description: 'give / show / tell / buy で「人にものを〜する」を作ろう',
        rawQuestions: [
            "彼は私に本をくれました。 | He [gave] me a book .",
            "母は私に新しいかばんを買ってくれました。 | My mother [bought] me a new bag .",
            "彼女は私たちに写真を見せました。 | She [showed] us a picture .",
            "トムは私に面白い話をしてくれました。 | Tom [told] me an interesting story .",
            "私は彼にメールを送りました。 | I [sent] him an email .",
            "先生は私たちに英語を教えます。 | Our teacher [teaches] us English .",
            "彼女は私に質問をしました。 | She [asked] me a question .",
            "父は私に時計をくれました。 | My father [gave] me a watch .",
            "私は妹にケーキを作りました。 | I [made] my sister a cake .",
            "彼は私に道を教えてくれました。 | He [showed] me the way ."
        ]
    },
    {
        id: 'passive-basic',
        title: '受動態',
        description: 'be動詞 + 過去分詞で「〜される」を表そう',
        rawQuestions: [
            "この本は多くの人に読まれています。 | This book [is] read by many people .",
            "その窓はトムによって壊されました。 | The window [was] broken by Tom .",
            "英語は世界中で話されています。 | English [is] spoken around the world .",
            "この写真は私の父によって撮られました。 | This picture [was] taken by my father .",
            "その部屋は毎日掃除されます。 | The room [is] cleaned every day .",
            "この歌は若い人たちに愛されています。 | This song [is] loved by young people .",
            "その手紙は昨日書かれました。 | The letter [was] written yesterday .",
            "この車は日本で作られました。 | This car [was] made in Japan .",
            "その試合は多くの生徒に見られました。 | The game [was] watched by many students .",
            "これらの花は母によって育てられています。 | These flowers [are] grown by my mother ."
        ]
    },
    {
        id: 'present-perfect-basic',
        title: '現在完了',
        description: 'have / has + 過去分詞で経験・継続・完了を表そう',
        rawQuestions: [
            "私は京都へ行ったことがあります。 | I [have] been to Kyoto .",
            "彼女はその本をもう読み終えました。 | She [has] already read the book .",
            "私たちは3年間ここに住んでいます。 | We [have] lived here for three years .",
            "彼はまだ宿題を終えていません。 | He [has] not finished his homework yet .",
            "あなたは今までに寿司を食べたことがありますか。 | [Have] you ever eaten sushi ?",
            "トムは財布をなくしてしまいました。 | Tom [has] lost his wallet .",
            "私はちょうど昼食を食べたところです。 | I [have] just eaten lunch .",
            "彼らは昨日から忙しいです。 | They [have] been busy since yesterday .",
            "メアリーは一度も外国へ行ったことがありません。 | Mary [has] never been abroad .",
            "あなたはどのくらい英語を勉強していますか。 | How long [have] you studied English ?"
        ]
    },
    {
        id: 'present-perfect-progressive-basic',
        title: '現在完了進行形',
        description: 'have / has been + 動詞ing で「ずっと〜し続けている」',
        rawQuestions: [
            "私は2時間英語を勉強し続けています。 | I [have] been studying English for two hours .",
            "彼女は朝からピアノを練習し続けています。 | She [has] been practicing the piano since morning .",
            "彼らは1時間サッカーをしています。 | They [have] been playing soccer for an hour .",
            "雨が昨日から降り続いています。 | It [has] been raining since yesterday .",
            "トムは長い間ここで待っています。 | Tom [has] been waiting here for a long time .",
            "私たちは午後から部屋を掃除しています。 | We [have] been cleaning the room since afternoon .",
            "彼は30分走り続けています。 | He [has] been running for thirty minutes .",
            "あなたはどのくらいテレビを見ていますか。 | How long [have] you been watching TV ?",
            "彼女は3年間英語を教えています。 | She [has] been teaching English for three years .",
            "私は朝から本を読んでいます。 | I [have] been reading a book since morning ."
        ]
    },
    {
        id: 'indirect-question-basic',
        title: '間接疑問文',
        description: '疑問詞 + 主語 + 動詞 の語順に注意しよう',
        rawQuestions: [
            "私は彼がどこに住んでいるか知っています。 | I know where he [lives] .",
            "あなたは彼女が何を好きか知っていますか。 | Do you know what she [likes] ?",
            "私は彼がいつ来るか知りません。 | I do not know when he [will] come .",
            "彼女はこれが誰の本か知っています。 | She knows whose book this [is] .",
            "私に駅がどこにあるか教えてください。 | Please tell me where the station [is] .",
            "私は彼がなぜ怒っているか分かりません。 | I do not understand why he [is] angry .",
            "あなたは彼が何歳か知っていますか。 | Do you know how old he [is] ?",
            "私は彼女がどうやって学校へ行くか知っています。 | I know how she [goes] to school .",
            "先生は私たちに何をすべきか教えてくれました。 | The teacher told us what we [should] do .",
            "私は彼が誰なのか知りたいです。 | I want to know who he [is] ."
        ]
    },
    {
        id: 'participle-basic',
        title: '分詞',
        description: '現在分詞・過去分詞で名詞を詳しく説明しよう',
        rawQuestions: [
            "あそこで走っている少年はケンです。 | The boy [running] over there is Ken .",
            "英語で書かれた本は難しいです。 | The book [written] in English is difficult .",
            "ピアノを弾いている少女は私の妹です。 | The girl [playing] the piano is my sister .",
            "これは日本で作られた車です。 | This is a car [made] in Japan .",
            "ベンチに座っている男性は私の父です。 | The man [sitting] on the bench is my father .",
            "壊れた窓を見てください。 | Look at the [broken] window .",
            "あそこで歌っている女性は有名です。 | The woman [singing] over there is famous .",
            "トムによって撮られた写真は美しいです。 | The picture [taken] by Tom is beautiful .",
            "川で泳いでいる犬はかわいいです。 | The dog [swimming] in the river is cute .",
            "昨日買われたケーキはおいしかったです。 | The cake [bought] yesterday was delicious ."
        ]
    },
    {
        id: 'relative-pronoun-basic',
        title: '関係代名詞',
        description: 'who / which / that で名詞を後ろから説明しよう',
        rawQuestions: [
            "私は英語を話す友達がいます。 | I have a friend [who] speaks English .",
            "これは京都へ行く電車です。 | This is a train [which] goes to Kyoto .",
            "あそこで立っている女性は私の母です。 | The woman [who] is standing over there is my mother .",
            "私が昨日買った本は面白いです。 | The book [that] I bought yesterday is interesting .",
            "彼は大きな犬を飼っている少年です。 | He is a boy [who] has a big dog .",
            "これは私が探していたペンです。 | This is the pen [that] I was looking for .",
            "机の上にある時計は私のものです。 | The clock [which] is on the desk is mine .",
            "私はケンが書いた手紙を読みました。 | I read the letter [that] Ken wrote .",
            "公園で遊んでいる子どもたちは元気です。 | The children [who] are playing in the park are cheerful .",
            "彼女が作ったケーキはおいしかったです。 | The cake [that] she made was delicious ."
        ]
    },
    {
        id: 'subjunctive-basic',
        title: '仮定法',
        description: 'I wish / If I were ... で現実と違う願いや仮定を表そう',
        rawQuestions: [
            "私は車を持っていたらいいのに。 | I wish I [had] a car .",
            "私が鳥だったらいいのに。 | I wish I [were] a bird .",
            "もっと上手に英語を話せたらいいのに。 | I wish I [could] speak English better .",
            "彼女がここにいればいいのに。 | I wish she [were] here .",
            "もし私があなたなら、一生懸命勉強するでしょう。 | If I [were] you , I would study hard .",
            "もしお金があれば、その本を買えるのに。 | If I [had] money , I could buy the book .",
            "もっと時間があればいいのに。 | I wish I [had] more time .",
            "もし今日晴れていれば、公園へ行くのに。 | If it [were] sunny today , I would go to the park .",
            "もし泳げたら、海へ行くのに。 | If I [could] swim , I would go to the sea .",
            "宿題がなければいいのに。 | I wish I [did] not have homework ."
        ]
    }
];

export const FILL_IN_CATEGORIES: FillInCategory[] = RAW_FILL_IN_DATA.map(category => {
    const level = CATEGORY_LEVELS[category.id];
    const shouldExpandToFiveStages = level === 'jhs1' && category.rawQuestions.length < 50;
    const questions = category.rawQuestions.flatMap(line => {
        const [translation, answerStr] = line.split('|').map(s => s.trim());
        // Sanitize
        const sanitizedAnswer = answerStr.replace(/([.?\!,])/g, ' $1').replace(/\s+/g, ' ').trim();

        const rawTokens = sanitizedAnswer.split(' ').filter(w => w.length > 0);
        const cleanBaseTokens = rawTokens.map(token => token.startsWith('[') && token.endsWith(']') ? token.slice(1, -1) : token);
        const originalBlankIndex = rawTokens.findIndex(token => token.startsWith('[') && token.endsWith(']'));
        const blankIndexes = shouldExpandToFiveStages
            ? getBlankIndexesForVariants(cleanBaseTokens, originalBlankIndex, 5)
            : [originalBlankIndex];

        return blankIndexes.map(blankIndex => {
            const tokens = cleanBaseTokens.map((token, index) => index === blankIndex ? `[${token}]` : token);
            const cleanTokens: string[] = [];
            const blanks: { word: string; index: number }[] = [];

            tokens.forEach((token, index) => {
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
                sentence: tokens.join(' '),
                cleanSentence: cleanTokens.join(' '),
                blanks
            };
        });
    });

    return {
        id: category.id,
        level,
        title: category.title,
        description: category.description,
        questions
    };
});

function getBlankIndexesForVariants(tokens: string[], originalBlankIndex: number, targetCount: number) {
    const punctuation = new Set(['.', '?', '!', ',', ':', ';']);
    const weakWords = new Set(['a', 'an', 'the']);
    const candidates = tokens
        .map((token, index) => ({ token, index }))
        .filter(({ token }) => !punctuation.has(token))
        .sort((a, b) => {
            if (a.index === originalBlankIndex) return -1;
            if (b.index === originalBlankIndex) return 1;

            const aWeak = weakWords.has(a.token.toLowerCase()) ? 1 : 0;
            const bWeak = weakWords.has(b.token.toLowerCase()) ? 1 : 0;
            if (aWeak !== bWeak) return aWeak - bWeak;

            return b.token.length - a.token.length;
        });

    const indexes = candidates.map(candidate => candidate.index);
    if (indexes.length === 0) return [0];

    return Array.from({ length: targetCount }, (_, index) => indexes[index % indexes.length]);
}

export const FILL_IN_CATEGORIES_BY_LEVEL: Record<FillInLevel, FillInCategory[]> = {
    jhs1: FILL_IN_CATEGORIES.filter(category => category.level === 'jhs1'),
    jhs2: FILL_IN_CATEGORIES.filter(category => category.level === 'jhs2'),
    jhs3: FILL_IN_CATEGORIES.filter(category => category.level === 'jhs3'),
};
