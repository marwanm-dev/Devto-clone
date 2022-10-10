import { useParams } from 'react-router-dom';
import tw, { theme } from 'twin.macro';
import AuthorDetails from '../../common/AuthorDetails';
import LoadingSpinner from '../../common/LoadingSpinner';
import NotFound from '../../common/NotFound';
import RouteWrapper from '../../common/RouteWrapper';
import { useGetPostQuery } from '../../core/features/posts/postsApiSlice';
import { createPostUrl, getPostParams } from '../../helpers/string';
import useBreakpoint from '../../hooks/useBreakpoint';
import Post from './components/Post';
import Reactions from './components/Reactions';

const PostPage = () => {
    const isLaptop = useBreakpoint(theme`screens.lap.max`.replace('px', ''));
    const { username, postUrl } = useParams();
    const { postTitle, postId } = getPostParams(postUrl);
    const { data: post, isLoading } = useGetPostQuery(
        { url: `${username}/${createPostUrl(postTitle, postId)}` },
        { refetchOnMountOrArgChange: true }
    );

    return (
        <RouteWrapper>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
                (post ? (
                    <Wrapper>
                        <Reactions post={post} toInvalidate={{ type: 'Post' }} />
                        <Post post={post} isLaptop={isLaptop} />
                        {!isLaptop && <AuthorDetails isLaptop={isLaptop} post={post} />}
                    </Wrapper>
                ) : (
                    <NotFound />
                ))}
        </RouteWrapper>
    );
};

const Wrapper = tw.div`flex gap-4`;

export default PostPage;
