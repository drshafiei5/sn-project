import { useDispatch } from 'react-redux';
import './index.scss';

import Suggestions from '../../../components/Suggestions';
import useOnceCall from '../../../hooks/useOnceCall';
import { getUserSuggestions } from '../../../redux/api/suggestion';

const Streams = () => {
    const dispatch = useDispatch();

    useOnceCall(() => {
        dispatch(getUserSuggestions());
    });

    return (
        <div className="streams" data-testid="streams">
            <div className="streams-content">
                <div className="streams-post">
                    {/* <PostForm />
                    <Posts allPosts={posts} postsLoading={loading} userFollowing={following} />
                    <div ref={bottomLineRef} style={{ marginBottom: '50px', height: '50px' }}></div> */}
                </div>
                <div className="streams-suggestions">
                    <Suggestions />
                </div>
            </div>
        </div>
    );
};

export default Streams;
