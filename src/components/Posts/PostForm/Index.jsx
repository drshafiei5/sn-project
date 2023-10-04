import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../Input';
import Avatar from '../../Avatar';
import video from '../../../assets/images/video.png';
import gif from '../../../assets/images/gif.png';
import photo from '../../../assets/images/photo.png';
import feeling from '../../../assets/images/feeling.png';
import { openModal } from '../../../redux/reducers/modal/modal.reducer';

import './index.scss';

const PostForm = () => {
    const { profile } = useSelector((state) => state.user);
    const { openModals } = useSelector((state) => state.modals);

    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const dispatch = useDispatch();

    const openPostModal = () => {
        dispatch(openModal({ id: 'addPost' }));
    };

    const openImageModal = (event) => {
        event.stopPropagation();
        fileInputRef.current.click();
        dispatch(openModal({ id: 'postFile' }));
    };

    const openVideoModal = () => {
        videoInputRef.current.click();
        dispatch(openModal({ id: 'postVideo' }));
    };

    const openGifModal = () => {
        dispatch(openModal({ id: 'postGif' }));
    };

    const openFeelingsModal = () => {
        dispatch(openModal({ id: 'postFeelings' }));
    };

    return (
        <>
            <div className="post-form" data-testid="post-form">
                <div className="post-form-row">
                    <div className="post-form-header">
                        <h4 className="post-form-title">Create Post</h4>
                    </div>
                    <div className="post-form-body">
                        <div className="post-form-input-body" data-testid="input-body" onClick={openPostModal}>
                            <Avatar
                                name={profile?.username}
                                bgColor={profile?.avatarColor}
                                textColor="#ffffff"
                                size={50}
                                avatarSrc={profile?.profilePicture}
                            />
                            <div className="post-form-input" data-placeholder="Write something here..."></div>
                        </div>
                        <hr />
                        <ul className="post-form-list" data-testid="list-item">
                            <li className="post-form-list-item image-select" onClick={openImageModal}>
                                <Input
                                    name="image"
                                    ref={fileInputRef}
                                    type="file"
                                    className="file-input"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = null;
                                        }
                                    }}
                                    accept="image/*"
                                    handleChange={() => {}}
                                />
                                <img src={photo} alt="" /> Photo
                            </li>
                            <li className="post-form-list-item" onClick={openGifModal}>
                                <img src={gif} alt="" /> Gif
                            </li>
                            <li className="post-form-list-item" onClick={openFeelingsModal}>
                                <img src={feeling} alt="" /> Feeling
                            </li>
                            <li className="post-form-list-item image-select" onClick={openVideoModal}>
                                <Input
                                    name="video"
                                    ref={videoInputRef}
                                    type="file"
                                    className="file-input"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = null;
                                        }
                                    }}
                                    accept="video/*"
                                    handleChange={() => {}}
                                />
                                <img src={video} alt="" width={30} /> Video
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {'addPost' in openModals && <p>addPost</p>}
        </>
    );
};
export default PostForm;
