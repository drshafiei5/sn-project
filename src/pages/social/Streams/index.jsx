import { useDispatch } from 'react-redux';
import './index.scss';

import Posts from '../../../components/Posts';
import useOnceCall from '../../../hooks/useOnceCall';
import Suggestions from '../../../components/Suggestions';
import PostForm from '../../../components/Posts/PostForm/Index';
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
                    <PostForm />
                    <Posts />
                    {/* <div ref={bottomLineRef} style={{ marginBottom: '50px', height: '50px' }}></div> */}
                </div>
                <div className="streams-suggestions">
                    <Suggestions />
                </div>
            </div>
        </div>
    );
};

export default Streams;
