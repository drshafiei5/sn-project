import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './indes.scss';

import Button from '../Button';
import Avatar from '../Avatar';
import { setSuggestions } from '../../redux/reducers/suggestions/suggestions.reducer';

const Suggestions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const suggestions = useSelector((state) => state.suggestions);

    const followUser = (user) => {
        const updatedUsers = filter(users, (u) => u._id !== user._id);
        setUsers(updatedUsers);
        dispatch(setSuggestions({ users: updatedUsers }));
    };

    useEffect(() => {
        setUsers(suggestions?.users);
    }, [suggestions]);

    return (
        <div className="suggestions-list-container" data-testid="suggestions-container">
            <div className="suggestions-header">
                <div className="title-text">Suggestions</div>
            </div>
            <hr />
            <div className="suggestions-container">
                <div className="suggestions">
                    {users?.map((user) => (
                        <div data-testid="suggestions-item" className="suggestions-item" key={user?._id}>
                            <Avatar
                                size={40}
                                textColor="#ffffff"
                                name={user?.username}
                                bgColor={user?.avatarColor}
                                avatarSrc={user?.profilePicture}
                            />

                            <div className="title-text">{user?.username}</div>

                            <div className="add-icon">
                                <Button
                                    label="Follow"
                                    className="button follow"
                                    disabled={false}
                                    handleClick={() => followUser(user)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {users?.length > 8 && (
                    <div className="view-more" onClick={() => navigate('/app/social/people')}>
                        View More
                    </div>
                )}
            </div>
        </div>
    );
};

export default Suggestions;
