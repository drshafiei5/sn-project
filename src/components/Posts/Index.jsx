/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { orderBy, range } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post/Index';
import PostSkeleton from './PostSkeleton/Index';
import { getPosts } from '../../redux/api/posts';
import useOnceCall from '../../hooks/useOnceCall';

const Posts = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);

    const { profile } = useSelector((state) => state.user);
    const { posts: allPosts, status } = useSelector((state) => state.posts);

    useOnceCall(() => {
        dispatch(getPosts());
    });

    useEffect(() => {
        const orderedPosts = orderBy(allPosts, ['createdAt'], ['desc']);
        setPosts(orderedPosts);
    }, [allPosts]);

    if (status === 'pending') {
        return range(6).map((val) => (
            <div key={val}>
                <PostSkeleton />
            </div>
        ));
    }

    if (status === 'fulfilled') {
        return posts.map((post) => (
            <div key={post?._id} data-testid="posts-item">
                {post?.userId === profile?._id && <Post post={post} showIcons={false} />}
            </div>
        ));
    }

    return <></>;
};

Posts.propTypes = {};

export default React.memo(Posts);
