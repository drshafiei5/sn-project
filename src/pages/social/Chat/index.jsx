import useOnceCall from '../../../hooks/useOnceCall'
import './index.scss';

const Chat = () => {
    useOnceCall(() => {});

    return (
        <div className="private-chat-wrapper">
            <div className="private-chat-wrapper-content">
                <div className="private-chat-wrapper-content-side">
                    {/* <ChatList /> */}
                </div>
                <div className="private-chat-wrapper-content-conversation">
                    {/* {(selectedChatUser || chatList.length > 0) && <ChatWindow />}
                    {!selectedChatUser && !chatList.length && (
                        <div className="no-chat" data-testid="no-chat">
                            Select or Search for users to chat with
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};
export default Chat;
