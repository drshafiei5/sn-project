import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';

import { fontAwesomeIcons, sideBarItems } from '../../services/utils/static.data';
import { useCallback, useEffect, useState } from 'react';
import { ChatUtils } from '../../services/utils/chat-utils.service';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageName, setPageName] = useState('');
    const { profile } = useSelector((state) => state?.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const chatList = [];

    const checkUrl = (name) => {
        return location.pathname.includes(name.toLowerCase());
    };

    const navigateToPage = (name, url) => {
        switch (name) {
            case 'Profile':
                url = `${url}/${profile?.username}?${createSearchParams({ id: profile?._id, uId: profile?.uId })}`;
                break;

            default:
                break;
        }

        if (name === 'Chat') {
            setPageName('Chat');
        } else {
            setPageName('');
            navigate(url);
        }
    };

    const createChatUrlParams = useCallback(
        (url) => {
            if (chatList?.length) {
                const chatUser = chatList[0];
                const params = ChatUtils.chatUrlParams(chatUser, profile);
                return `${url}?${createSearchParams(params)}`;
            } else {
                return url;
            }
        },
        [chatList, profile]
    );

    useEffect(() => {
        if (pageName === 'Chat') {
            const url = createChatUrlParams('/app/social/chat/messages');
            navigate(url);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, pageName]);

    return (
        <div className="app-side-menu">
            <div className="side-menu">
                <ul className="list-unstyled">
                    {sideBarItems.map((data) => (
                        <li key={data.index} onClick={() => navigateToPage(data.name, data.url)}>
                            <div
                                data-testid="sidebar-list"
                                className={`sidebar-link ${checkUrl(data.name) ? 'active' : ''}`}
                            >
                                <div className="menu-icon">{fontAwesomeIcons[data.iconName]}</div>
                                <div className="menu-link">
                                    <span>{`${data.name}`}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Sidebar;
