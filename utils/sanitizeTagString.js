export const sanitizeTagString = string => `+${string.split(' ').join('+')}`;
// export const blacklistTagString = string => string.split(' ').forEach(word => word);
