export const BASE_XP = 1000;
export const XP_MULTIPLIER = 1.5;

/**
 * Calculates total XP required to REACH a specific level.
 * Level 1: 0 XP
 * Level 2: 1000 XP
 * Level 3: 1000 + 1500 = 2500 XP
 */
export const getXpForLevel = (level: number): number => {
    if (level <= 1) return 0;
    let total = 0;
    for (let i = 1; i < level; i++) {
        total += Math.floor(BASE_XP * Math.pow(XP_MULTIPLIER, i - 1));
    }
    return total;
};

/**
 * Calculates XP required to progress FROM current level to NEXT level.
 */
export const getXpRequiredForNextLevel = (currentLevel: number): number => {
    return Math.floor(BASE_XP * Math.pow(XP_MULTIPLIER, currentLevel - 1));
};

/**
 * Given a total cumulative XP, returns:
 * - current level
 * - XP earned WITHIN that level
 * - XP required to complete that level
 */
export const getLevelInfo = (totalXp: number) => {
    let level = 1;
    let remainingXp = totalXp;

    while (true) {
        const required = getXpRequiredForNextLevel(level);
        if (remainingXp >= required) {
            remainingXp -= required;
            level++;
        } else {
            break;
        }
    }

    return {
        level,
        xpInLevel: remainingXp,
        xpRequired: getXpRequiredForNextLevel(level),
        progress: (remainingXp / getXpRequiredForNextLevel(level)) * 100
    };
};
