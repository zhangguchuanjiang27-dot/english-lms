export type DrillQuestion = {
    prompt: string;
    base: string;
    past: string;
    participle: string;
};

// Comprehensive list of junior high school verbs
export const VERB_DRILL_DATA: DrillQuestion[] = [
    // Irregular A-A-A
    { prompt: '切る', base: 'cut', past: 'cut', participle: 'cut' },
    { prompt: '置く', base: 'put', past: 'put', participle: 'put' },
    { prompt: '読む', base: 'read', past: 'read', participle: 'read' },
    { prompt: 'セットする/置く', base: 'set', past: 'set', participle: 'set' },
    { prompt: '打つ/たたく', base: 'hit', past: 'hit', participle: 'hit' },
    { prompt: '傷つける', base: 'hurt', past: 'hurt', participle: 'hurt' },
    { prompt: '～させる/許可する', base: 'let', past: 'let', participle: 'let' },
    { prompt: '閉める', base: 'shut', past: 'shut', participle: 'shut' },

    // Irregular A-B-A
    { prompt: '来る', base: 'come', past: 'came', participle: 'come' },
    { prompt: '～になる', base: 'become', past: 'became', participle: 'become' },
    { prompt: '走る', base: 'run', past: 'ran', participle: 'run' },

    // Irregular A-B-B
    { prompt: '持ってくる', base: 'bring', past: 'brought', participle: 'brought' },
    { prompt: '建てる', base: 'build', past: 'built', participle: 'built' },
    { prompt: '買う', base: 'buy', past: 'bought', participle: 'bought' },
    { prompt: 'つかまえる', base: 'catch', past: 'caught', participle: 'caught' },
    { prompt: '感じる', base: 'feel', past: 'felt', participle: 'felt' },
    { prompt: '見つける', base: 'find', past: 'found', participle: 'found' },
    { prompt: '得る/着く', base: 'get', past: 'got', participle: 'got' },
    { prompt: '持っている/食べる', base: 'have', past: 'had', participle: 'had' },
    { prompt: '聞こえる/耳に入る', base: 'hear', past: 'heard', participle: 'heard' },
    { prompt: '保つ/ずっと～する', base: 'keep', past: 'kept', participle: 'kept' },
    { prompt: '去る/出発する/残す', base: 'leave', past: 'left', participle: 'left' },
    { prompt: '失う/負ける', base: 'lose', past: 'lost', participle: 'lost' },
    { prompt: '作る', base: 'make', past: 'made', participle: 'made' },
    { prompt: '会う', base: 'meet', past: 'met', participle: 'met' },
    { prompt: '支払う', base: 'pay', past: 'paid', participle: 'paid' },
    { prompt: '言う', base: 'say', past: 'said', participle: 'said' },
    { prompt: '売る', base: 'sell', past: 'sold', participle: 'sold' },
    { prompt: '送る', base: 'send', past: 'sent', participle: 'sent' },
    { prompt: '座る', base: 'sit', past: 'sat', participle: 'sat' },
    { prompt: '眠る', base: 'sleep', past: 'slept', participle: 'slept' },
    { prompt: '過ごす/費やす', base: 'spend', past: 'spent', participle: 'spent' },
    { prompt: '立つ', base: 'stand', past: 'stood', participle: 'stood' },
    { prompt: '教える', base: 'teach', past: 'taught', participle: 'taught' },
    { prompt: '話す/伝える', base: 'tell', past: 'told', participle: 'told' },
    { prompt: '考える/思う', base: 'think', past: 'thought', participle: 'thought' },
    { prompt: '理解する', base: 'understand', past: 'understood', participle: 'understood' },
    { prompt: '勝つ', base: 'win', past: 'won', participle: 'won' },
    { prompt: '持つ/開催する', base: 'hold', past: 'held', participle: 'held' },
    { prompt: '意味する', base: 'mean', past: 'meant', participle: 'meant' },
    { prompt: '導く', base: 'lead', past: 'led', participle: 'led' },

    // Irregular A-B-C
    { prompt: '始まる/始める', base: 'begin', past: 'began', participle: 'begun' },
    { prompt: '壊す', base: 'break', past: 'broke', participle: 'broken' },
    { prompt: 'する', base: 'do', past: 'did', participle: 'done' },
    { prompt: '飲む', base: 'drink', past: 'drank', participle: 'drunk' },
    { prompt: '運転する', base: 'drive', past: 'drove', participle: 'driven' },
    { prompt: '食べる', base: 'eat', past: 'ate', participle: 'eaten' },
    { prompt: '落ちる', base: 'fall', past: 'fell', participle: 'fallen' },
    { prompt: '飛ぶ', base: 'fly', past: 'flew', participle: 'flown' },
    { prompt: '（～を）与える', base: 'give', past: 'gave', participle: 'given' },
    { prompt: '行く', base: 'go', past: 'went', participle: 'gone' },
    { prompt: '成長する/栽培する', base: 'grow', past: 'grew', participle: 'grown' },
    { prompt: '知っている', base: 'know', past: 'knew', participle: 'known' },
    { prompt: '乗る', base: 'ride', past: 'rode', participle: 'ridden' },
    { prompt: '見る/見える', base: 'see', past: 'saw', participle: 'seen' },
    { prompt: '見せる/案内する', base: 'show', past: 'showed', participle: 'shown' },
    { prompt: '歌う', base: 'sing', past: 'sang', participle: 'sung' },
    { prompt: '話す', base: 'speak', past: 'spoke', participle: 'spoken' },
    { prompt: '泳ぐ', base: 'swim', past: 'swam', participle: 'swum' },
    { prompt: '取る/持っていく/乗る', base: 'take', past: 'took', participle: 'taken' },
    { prompt: '投げる', base: 'throw', past: 'threw', participle: 'thrown' },
    { prompt: '着ている', base: 'wear', past: 'wore', participle: 'worn' },
    { prompt: '書く', base: 'write', past: 'wrote', participle: 'written' },

    // Regular (-ed)
    { prompt: '尋ねる/頼む', base: 'ask', past: 'asked', participle: 'asked' },
    { prompt: '答える', base: 'answer', past: 'answered', participle: 'answered' },
    { prompt: '呼ぶ/電話する', base: 'call', past: 'called', participle: 'called' },
    { prompt: 'きれいにする/掃除する', base: 'clean', past: 'cleaned', participle: 'cleaned' },
    { prompt: '料理する', base: 'cook', past: 'cooked', participle: 'cooked' },
    { prompt: '楽しむ', base: 'enjoy', past: 'enjoyed', participle: 'enjoyed' },
    { prompt: '終える', base: 'finish', past: 'finished', participle: 'finished' },
    { prompt: '助ける/手伝う', base: 'help', past: 'helped', participle: 'helped' },
    { prompt: '聞く（意識して）', base: 'listen', past: 'listened', participle: 'listened' },
    { prompt: '見る（意識して）', base: 'look', past: 'looked', participle: 'looked' },
    { prompt: '開ける/開く', base: 'open', past: 'opened', participle: 'opened' },
    { prompt: '遊ぶ/（スポーツ・楽器を）する', base: 'play', past: 'played', participle: 'played' },
    { prompt: '滞在する/とどまる', base: 'stay', past: 'stayed', participle: 'stayed' },
    { prompt: '話す/しゃべる', base: 'talk', past: 'talked', participle: 'talked' },
    { prompt: '訪れる', base: 'visit', past: 'visited', participle: 'visited' },
    { prompt: '歩く', base: 'walk', past: 'walked', participle: 'walked' },
    { prompt: '欲しい/～したい(to)', base: 'want', past: 'wanted', participle: 'wanted' },
    { prompt: '洗う', base: 'wash', past: 'washed', participle: 'washed' },
    { prompt: '見る（動いているものを）', base: 'watch', past: 'watched', participle: 'watched' },
    { prompt: '働く/勉強する', base: 'work', past: 'worked', participle: 'worked' },

    // Regular (-d)
    { prompt: '到着する', base: 'arrive', past: 'arrived', participle: 'arrived' },
    { prompt: '閉める/閉じる', base: 'close', past: 'closed', participle: 'closed' },
    { prompt: '決める', base: 'decide', past: 'decided', participle: 'decided' },
    { prompt: '招待する/招く', base: 'invite', past: 'invited', participle: 'invited' },
    { prompt: '好む/好きである', base: 'like', past: 'liked', participle: 'liked' },
    { prompt: '住む/生きる', base: 'live', past: 'lived', participle: 'lived' },
    { prompt: '練習する', base: 'practice', past: 'practiced', participle: 'practiced' },
    { prompt: 'ほほえむ', base: 'smile', past: 'smiled', participle: 'smiled' },
    { prompt: '使う', base: 'use', past: 'used', participle: 'used' },

    // Regular (-ied)
    { prompt: '泣く/叫ぶ', base: 'cry', past: 'cried', participle: 'cried' },
    { prompt: '勉強する', base: 'study', past: 'studied', participle: 'studied' },
    { prompt: '挑戦する/試す', base: 'try', past: 'tried', participle: 'tried' },

    // Regular (Double consonant + -ed)
    { prompt: '落とす', base: 'drop', past: 'dropped', participle: 'dropped' },
    { prompt: '計画する', base: 'plan', past: 'planned', participle: 'planned' },
    { prompt: '止まる/止める', base: 'stop', past: 'stopped', participle: 'stopped' },
];
