export function parseDate(dateString) {
    const date = new Date(dateString);
    const now = Date.now();

    const diffMinutes = ((now - date) / (1000 * 60))
    if (diffMinutes < 60) {
        return diffMinutes + ' minutes ago';
    }
    if (diffMinutes < (24 * 60)) {
        return (diffMinutes * 60) + ' hours ago';
    }
    if (diffMinutes < (24 * 60 * 365)) {
        return (diffMinutes * 60 * 24) + ' days ago'
    }

    return date.toDateString()
}