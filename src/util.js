export function getRedirectPath({ type, avatar }) {
    // 根据用户信息 获取跳转地址
    // 1.区分type, 是genuis还是boss
    // 2.区分是否完善信息,此处以是否设置用户头像作为标准
    // '/boss'  '/genuis' 'bossinfo' 'genuisinfo'
    let url = type === 'boss' ? './boss' : '/genuis'
    // if (!avatar) {
    //     url += 'info';
    // }
    return url;
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_');
}