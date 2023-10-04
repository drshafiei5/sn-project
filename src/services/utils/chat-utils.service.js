export class ChatUtils {
    static chatUrlParams(user, profile) {
        const params = { username: '', id: '' };
        if (user.receiverUsername === profile?.username) {
            params.username = user.senderUsername.toLowerCase();
            params.id = user.senderId;
        } else {
            params.username = user.receiverUsername.toLowerCase();
            params.id = user.receiverId;
        }
        return params;
    }
}